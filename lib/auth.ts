import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { serverEnv } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";

export const ADMIN_SESSION_COOKIE = "remember_admin_session";
const ADMIN_SESSION_DURATION_MS = 1000 * 60 * 60 * 12;

type AdminSessionPayload = {
  email: string;
  exp: number;
};

function getAdminSecret() {
  if (serverEnv.ADMIN_SESSION_SECRET) {
    return serverEnv.ADMIN_SESSION_SECRET;
  }

  if (!serverEnv.isProduction) {
    return "local-admin-session-secret";
  }

  throw new Error("ADMIN_SESSION_SECRET is required in production.");
}

function getAdminEmail() {
  if (serverEnv.ADMIN_EMAIL) {
    return serverEnv.ADMIN_EMAIL;
  }

  if (!serverEnv.isProduction) {
    return "admin@remembereverything.local";
  }

  throw new Error("ADMIN_EMAIL is required in production.");
}

function getAdminPassword() {
  if (serverEnv.ADMIN_PASSWORD) {
    return serverEnv.ADMIN_PASSWORD;
  }

  if (!serverEnv.isProduction) {
    return "RememberEverything-Admin-2026!";
  }

  throw new Error("ADMIN_PASSWORD is required in production.");
}

async function constantTimeEqualStrings(left: string, right: string) {
  const leftDigest = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(left)),
  );
  const rightDigest = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(right)),
  );

  if (leftDigest.length !== rightDigest.length) {
    return false;
  }

  let mismatch = 0;

  for (let index = 0; index < leftDigest.length; index += 1) {
    mismatch |= leftDigest[index] ^ rightDigest[index];
  }

  return mismatch === 0;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

async function createHmacSignature(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getAdminSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );

  return Buffer.from(signature).toString("base64url");
}

async function verifyHmacSignature(value: string, signature: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getAdminSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );

  return crypto.subtle.verify(
    "HMAC",
    key,
    Buffer.from(signature, "base64url"),
    new TextEncoder().encode(value),
  );
}

export async function createAdminSessionToken(email: string) {
  const payload: AdminSessionPayload = {
    email,
    exp: Date.now() + ADMIN_SESSION_DURATION_MS,
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = await createHmacSignature(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const isValid = await verifyHmacSignature(encodedPayload, signature);

  if (!isValid) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as AdminSessionPayload;

    if (!payload.email || payload.exp <= Date.now()) {
      return null;
    }

    if (payload.email !== getAdminEmail()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function setAdminSession(email: string) {
  const cookieStore = await cookies();
  const token = await createAdminSessionToken(email);

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: serverEnv.isProduction,
    path: "/",
    maxAge: ADMIN_SESSION_DURATION_MS / 1000,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function verifyAdminCredentials({
  email,
  password,
  ipAddress,
}: {
  email: string;
  password: string;
  ipAddress: string;
}) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  const rateLimitResult = await checkRateLimit({
    key: `admin-login:${ipAddress}:${normalizedEmail}`,
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimitResult.allowed) {
    return {
      ok: false as const,
      message:
        rateLimitResult.reason === "unavailable"
          ? "LOGIN_RATE_LIMIT_UNAVAILABLE"
          : "LOGIN_RATE_LIMITED",
    };
  }

  const expectedEmail = getAdminEmail().trim().toLowerCase();
  const expectedPassword = getAdminPassword();

  const emailMatches = normalizedEmail === expectedEmail;
  const passwordMatches = await constantTimeEqualStrings(
    normalizedPassword,
    expectedPassword,
  );

  if (!emailMatches || !passwordMatches) {
    return {
      ok: false as const,
      message: "LOGIN_INVALID_CREDENTIALS",
    };
  }

  return {
    ok: true as const,
    email: expectedEmail,
  };
}
