import { z } from "zod";

export const inquiryTypeValues = ["CONTACT", "QUOTE"] as const;

const trimOptional = (value: unknown) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

export const inquirySchema = z.object({
  inquiryType: z.enum(inquiryTypeValues),
  name: z.string().trim().min(2, "Please enter your full name.").max(80),
  email: z
    .string()
    .trim()
    .email("Please enter a valid business email.")
    .max(120),
  company: z.preprocess(
    trimOptional,
    z.string().trim().max(120).optional(),
  ),
  country: z.preprocess(
    trimOptional,
    z.string().trim().max(80).optional(),
  ),
  phone: z.preprocess(
    trimOptional,
    z.string().trim().max(40).optional(),
  ),
  message: z
    .string()
    .trim()
    .min(20, "Please provide a little more project detail.")
    .max(3000),
  sourcePage: z.string().trim().min(1).max(300),
  sourceProduct: z.preprocess(
    trimOptional,
    z.string().trim().max(160).optional(),
  ),
  productSlug: z.preprocess(
    trimOptional,
    z.string().trim().max(160).optional(),
  ),
  utmSource: z.preprocess(trimOptional, z.string().trim().max(120).optional()),
  utmMedium: z.preprocess(trimOptional, z.string().trim().max(120).optional()),
  utmCampaign: z.preprocess(trimOptional, z.string().trim().max(160).optional()),
  utmTerm: z.preprocess(trimOptional, z.string().trim().max(160).optional()),
  utmContent: z.preprocess(trimOptional, z.string().trim().max(160).optional()),
  referrer: z.preprocess(trimOptional, z.string().trim().max(500).optional()),
  website: z.preprocess(trimOptional, z.string().trim().max(200).optional()),
  formStartedAt: z.string().trim().min(1, "Missing form timestamp."),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export function validateInquiryInput(input: Record<string, FormDataEntryValue | null>) {
  return inquirySchema.safeParse({
    inquiryType: input.inquiryType,
    name: input.name,
    email: input.email,
    company: input.company,
    country: input.country,
    phone: input.phone,
    message: input.message,
    sourcePage: input.sourcePage,
    sourceProduct: input.sourceProduct,
    productSlug: input.productSlug,
    utmSource: input.utmSource,
    utmMedium: input.utmMedium,
    utmCampaign: input.utmCampaign,
    utmTerm: input.utmTerm,
    utmContent: input.utmContent,
    referrer: input.referrer,
    website: input.website,
    formStartedAt: input.formStartedAt,
  });
}
