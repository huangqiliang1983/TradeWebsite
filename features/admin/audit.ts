import type { Prisma } from "@prisma/client";

import crypto from "node:crypto";

import { headers } from "next/headers";

import { db } from "@/lib/db";

function getClientIp(headerMap: Headers) {
  const forwardedFor = headerMap.get("x-forwarded-for");
  const realIp = headerMap.get("x-real-ip");

  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
}

export async function createAuditLog({
  action,
  entityType,
  entityId,
  actorEmail,
  details,
}: {
  action: string;
  entityType: string;
  entityId?: string | null;
  actorEmail: string;
  details?: Record<string, unknown>;
}) {
  const headerMap = await headers();
  const ipHash = crypto
    .createHash("sha256")
    .update(getClientIp(headerMap))
    .digest("hex");

  await db.auditLog.create({
    data: {
      action,
      entityType,
      entityId: entityId ?? null,
      actorEmail,
      ipHash,
      details: (details ?? undefined) as Prisma.InputJsonValue | undefined,
    },
  });
}
