import type { InquiryType } from "@prisma/client";

export type InquiryFormValues = {
  inquiryType: InquiryType;
  name: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  message: string;
  sourcePage: string;
  sourceProduct: string;
  productSlug: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  referrer: string;
  website: string;
  formStartedAt: string;
};

export type InquiryFormState = {
  status: "idle" | "success" | "error";
  message: string;
  values: InquiryFormValues;
  fieldErrors: Partial<Record<keyof InquiryFormValues, string>>;
  emailDelivered?: boolean;
};

export function createInquiryValues(
  values?: Partial<InquiryFormValues>,
): InquiryFormValues {
  return {
    inquiryType: values?.inquiryType ?? "CONTACT",
    name: values?.name ?? "",
    email: values?.email ?? "",
    company: values?.company ?? "",
    country: values?.country ?? "",
    phone: values?.phone ?? "",
    message: values?.message ?? "",
    sourcePage: values?.sourcePage ?? "",
    sourceProduct: values?.sourceProduct ?? "",
    productSlug: values?.productSlug ?? "",
    utmSource: values?.utmSource ?? "",
    utmMedium: values?.utmMedium ?? "",
    utmCampaign: values?.utmCampaign ?? "",
    utmTerm: values?.utmTerm ?? "",
    utmContent: values?.utmContent ?? "",
    referrer: values?.referrer ?? "",
    website: values?.website ?? "",
    formStartedAt: values?.formStartedAt ?? "",
  };
}

export function createInquiryState(
  values?: Partial<InquiryFormValues>,
): InquiryFormState {
  return {
    status: "idle",
    message: "",
    values: createInquiryValues(values),
    fieldErrors: {},
  };
}
