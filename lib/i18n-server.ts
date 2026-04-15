import { cookies, headers } from "next/headers";

import { ADMIN_LOCALE_COOKIE } from "@/features/admin/copy";
import { getLocaleFromPathname } from "@/lib/i18n";

export async function getRequestLocale() {
  const headerStore = await headers();
  const pathname = headerStore.get("x-current-path") ?? "/";
  return getLocaleFromPathname(pathname);
}

export async function getAdminLocale() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(ADMIN_LOCALE_COOKIE)?.value;

  return locale === "zh-CN" ? "zh-CN" : "en";
}
