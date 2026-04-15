"use server";

import { headers } from "next/headers";

import { submitInquiry } from "@/features/inquiry/service";
import { type InquiryFormState } from "@/features/inquiry/types";

function getClientIp(headerMap: Headers) {
  const forwardedFor = headerMap.get("x-forwarded-for");
  const realIp = headerMap.get("x-real-ip");

  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
}

function flattenFormData(formData: FormData) {
  return {
    inquiryType: formData.get("inquiryType"),
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    country: formData.get("country"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    sourcePage: formData.get("sourcePage"),
    sourceProduct: formData.get("sourceProduct"),
    productSlug: formData.get("productSlug"),
    utmSource: formData.get("utmSource"),
    utmMedium: formData.get("utmMedium"),
    utmCampaign: formData.get("utmCampaign"),
    utmTerm: formData.get("utmTerm"),
    utmContent: formData.get("utmContent"),
    referrer: formData.get("referrer"),
    website: formData.get("website"),
    formStartedAt: formData.get("formStartedAt"),
  } satisfies Record<string, FormDataEntryValue | null>;
}

export async function submitInquiryAction(
  _previousState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const requestHeaders = await headers();

  return submitInquiry({
    rawValues: flattenFormData(formData),
    ipAddress: getClientIp(requestHeaders),
    requestReferer: requestHeaders.get("referer") ?? "",
    userAgent: requestHeaders.get("user-agent") ?? "",
  });
}
