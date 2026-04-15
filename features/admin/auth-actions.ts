"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  clearAdminSession,
  getAdminSession,
  setAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth";
import { serverEnv } from "@/lib/env";
import { createAuditLog } from "@/features/admin/audit";
import { ADMIN_LOCALE_COOKIE, getAdminDictionary } from "@/features/admin/copy";
import type { Locale } from "@/lib/i18n";

export type AdminLoginState = {
  error: string;
  email: string;
};

function mapAdminLoginError(locale: Locale, message: string) {
  const dictionary = getAdminDictionary(locale);

  if (message === "LOGIN_RATE_LIMITED") {
    return dictionary.login.limited;
  }

  if (message === "LOGIN_RATE_LIMIT_UNAVAILABLE") {
    return dictionary.login.unavailable;
  }

  return dictionary.login.incorrect;
}

export async function adminLoginAction(
  _previousState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const locale =
    typeof formData.get("locale") === "string" && formData.get("locale") === "zh-CN"
      ? "zh-CN"
      : "en";
  const email = typeof formData.get("email") === "string" ? String(formData.get("email")) : "";
  const password =
    typeof formData.get("password") === "string" ? String(formData.get("password")) : "";
  const headerMap = await headers();
  const forwardedFor = headerMap.get("x-forwarded-for");
  const realIp = headerMap.get("x-real-ip");
  const ipAddress = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

  const result = await verifyAdminCredentials({
    email,
    password,
    ipAddress,
  });

  if (!result.ok) {
    const safeMessage = mapAdminLoginError(locale, result.message);

    await createAuditLog({
      action: "login_failed",
      entityType: "AdminAuth",
      actorEmail: email.trim().toLowerCase() || "unknown",
      details: {
        reason: result.message,
      },
    });

    return {
      error: safeMessage,
      email,
    };
  }

  await setAdminSession(result.email);
  await createAuditLog({
    action: "login_success",
    entityType: "AdminAuth",
    actorEmail: result.email,
  });
  redirect("/admin");
}

export async function adminLogoutAction() {
  const session = await getAdminSession();
  await createAuditLog({
    action: "logout",
    entityType: "AdminAuth",
    actorEmail: session?.email ?? "admin-session",
  });
  await clearAdminSession();
  redirect("/admin/login");
}

export async function setAdminLocaleAction(locale: Locale) {
  const cookieStore = await cookies();
  const safeLocale = locale === "zh-CN" ? "zh-CN" : "en";

  cookieStore.set(ADMIN_LOCALE_COOKIE, safeLocale, {
    path: "/",
    sameSite: "lax",
    secure: serverEnv.isProduction,
    maxAge: 60 * 60 * 24 * 365,
  });
}
