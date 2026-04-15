import crypto from "node:crypto";

import type { InquiryType } from "@prisma/client";

import { db } from "@/lib/db";
import { sendInquiryNotification } from "@/lib/email";
import { serverEnv } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  type InquiryFormState,
  createInquiryValues,
} from "@/features/inquiry/types";
import { validateInquiryInput } from "@/features/inquiry/schema";

type RawInquiryRecord = Record<string, FormDataEntryValue | null>;

type SubmitInquiryOptions = {
  rawValues: RawInquiryRecord;
  ipAddress: string;
  requestReferer: string;
  userAgent: string;
};

function getString(rawValues: RawInquiryRecord, key: string) {
  const value = rawValues[key];
  return typeof value === "string" ? value : "";
}

function buildCurrentValues(rawValues: RawInquiryRecord) {
  return createInquiryValues({
    inquiryType: getString(rawValues, "inquiryType") === "QUOTE" ? "QUOTE" : "CONTACT",
    name: getString(rawValues, "name"),
    email: getString(rawValues, "email"),
    company: getString(rawValues, "company"),
    country: getString(rawValues, "country"),
    phone: getString(rawValues, "phone"),
    message: getString(rawValues, "message"),
    sourcePage: getString(rawValues, "sourcePage"),
    sourceProduct: getString(rawValues, "sourceProduct"),
    productSlug: getString(rawValues, "productSlug"),
    utmSource: getString(rawValues, "utmSource"),
    utmMedium: getString(rawValues, "utmMedium"),
    utmCampaign: getString(rawValues, "utmCampaign"),
    utmTerm: getString(rawValues, "utmTerm"),
    utmContent: getString(rawValues, "utmContent"),
    referrer: getString(rawValues, "referrer"),
    website: getString(rawValues, "website"),
    formStartedAt: getString(rawValues, "formStartedAt"),
  });
}

function buildFieldErrors(issues: Array<{ path: PropertyKey[]; message: string }>) {
  return issues.reduce<InquiryFormState["fieldErrors"]>((errors, issue) => {
    const key = issue.path[0];

    if (typeof key === "string" && !(key in errors)) {
      errors[key as keyof InquiryFormState["values"]] = issue.message;
    }

    return errors;
  }, {});
}

function hashValue(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function parsePositiveInt(value: string, fallback: number) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeSourcePage(sourcePage: string, referer: string) {
  if (sourcePage.trim()) {
    return sourcePage.trim().slice(0, 300);
  }

  if (!referer) {
    return "/";
  }

  try {
    const url = new URL(referer);
    return `${url.pathname}${url.search}`.slice(0, 300);
  } catch {
    return "/";
  }
}

export async function submitInquiry({
  rawValues,
  ipAddress,
  requestReferer,
  userAgent,
}: SubmitInquiryOptions): Promise<InquiryFormState> {
  const parsed = validateInquiryInput(rawValues);
  const currentValues = buildCurrentValues(rawValues);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields and try again.",
      values: currentValues,
      fieldErrors: buildFieldErrors(parsed.error.issues),
    };
  }

  const ipHash = hashValue(ipAddress || "unknown");
  const rateLimitMax = parsePositiveInt(serverEnv.INQUIRY_RATE_LIMIT_MAX, 5);
  const rateLimitWindowMs = parsePositiveInt(
    serverEnv.INQUIRY_RATE_LIMIT_WINDOW_MS,
    15 * 60 * 1000,
  );
  const minimumSubmitMs = parsePositiveInt(serverEnv.INQUIRY_MIN_SUBMIT_MS, 1500);
  const startedAt = Number.parseInt(parsed.data.formStartedAt, 10);
  const submittedTooFast =
    !Number.isFinite(startedAt) || Date.now() - startedAt < minimumSubmitMs;

  if (parsed.data.website) {
    return {
      status: "success",
      message: "Thank you. Your request has been received.",
      values: createInquiryValues({ inquiryType: parsed.data.inquiryType }),
      fieldErrors: {},
    };
  }

  if (submittedTooFast) {
    return {
      status: "error",
      message: "Please take a moment to review your information and submit again.",
      values: currentValues,
      fieldErrors: {},
    };
  }

  const rateLimitResult = await checkRateLimit({
    key: `inquiry:${ipHash}:${parsed.data.inquiryType}`,
    limit: rateLimitMax,
    windowMs: rateLimitWindowMs,
  });

  if (!rateLimitResult.allowed) {
    return {
      status: "error",
      message:
        rateLimitResult.reason === "unavailable"
          ? "Submission protection is temporarily unavailable. Please try again shortly."
          : "Too many requests were sent from this connection. Please try again shortly.",
      values: currentValues,
      fieldErrors: {},
    };
  }

  const sourcePage = normalizeSourcePage(parsed.data.sourcePage, requestReferer);
  const product = parsed.data.productSlug
    ? await db.product.findUnique({
        where: { slug: parsed.data.productSlug },
        select: { id: true, slug: true, name: true },
      })
    : null;

  await db.inquiry.create({
    data: {
      inquiryType: parsed.data.inquiryType,
      productId: product?.id,
      sourcePage,
      sourceProduct: parsed.data.sourceProduct || product?.name || null,
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      country: parsed.data.country || null,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
      utmSource: parsed.data.utmSource || null,
      utmMedium: parsed.data.utmMedium || null,
      utmCampaign: parsed.data.utmCampaign || null,
      utmTerm: parsed.data.utmTerm || null,
      utmContent: parsed.data.utmContent || null,
      referrer: requestReferer || null,
      userAgent: userAgent.slice(0, 500) || null,
      ipHash,
      honeypotFilled: false,
    },
  });

  const emailResult = await sendInquiryNotification({
    inquiryType: parsed.data.inquiryType,
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company || "",
    country: parsed.data.country || "",
    phone: parsed.data.phone || "",
    message: parsed.data.message,
    sourcePage,
    sourceProduct: parsed.data.sourceProduct || product?.name || "",
    utmSource: parsed.data.utmSource || "",
    utmMedium: parsed.data.utmMedium || "",
    utmCampaign: parsed.data.utmCampaign || "",
    referrer: requestReferer,
  });

  return {
    status: "success",
    message: emailResult.delivered
      ? "Thanks. Your inquiry was submitted successfully."
      : "Thanks. Your inquiry was submitted successfully and saved for follow-up.",
    values: createInquiryValues({ inquiryType: parsed.data.inquiryType }),
    fieldErrors: {},
    emailDelivered: emailResult.delivered,
  };
}

export function resolveInquiryType(rawValues: RawInquiryRecord): InquiryType {
  return getString(rawValues, "inquiryType") === "QUOTE" ? "QUOTE" : "CONTACT";
}
