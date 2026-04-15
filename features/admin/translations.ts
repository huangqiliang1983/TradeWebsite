import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { serverEnv } from "@/lib/env";
import { i18nConfig, type Locale } from "@/lib/i18n";

type TranslatableEntityType =
  | "CompanyProfile"
  | "ProductCategory"
  | "Product"
  | "IndustryPage"
  | "BlogPost"
  | "FAQ";

type TranslationPayload = Record<string, Prisma.JsonValue | string | null | undefined>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getTargetLocales() {
  const sourceLocale = serverEnv.TRANSLATION_SOURCE_LOCALE;

  return i18nConfig.locales.filter((locale) => locale !== sourceLocale);
}

function removeEmptyFields(payload: TranslationPayload) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => {
      if (typeof value === "string") {
        return value.trim().length > 0;
      }

      return value !== null && value !== undefined;
    }),
  );
}

function extractResponseText(data: unknown) {
  if (typeof data !== "object" || data === null) {
    return "";
  }

  if ("output_text" in data && typeof data.output_text === "string") {
    return data.output_text;
  }

  const output = "output" in data ? data.output : null;

  if (!Array.isArray(output)) {
    return "";
  }

  return output
    .flatMap((item) => {
      if (typeof item !== "object" || item === null || !("content" in item)) {
        return [];
      }

      const content = item.content;

      if (!Array.isArray(content)) {
        return [];
      }

      return content
        .map((part) => {
          if (typeof part !== "object" || part === null) {
            return "";
          }

          if ("text" in part && typeof part.text === "string") {
            return part.text;
          }

          return "";
        })
        .filter(Boolean);
    })
    .join("\n");
}

async function translatePayload(payload: TranslationPayload, targetLocale: Locale) {
  const sanitizedPayload = removeEmptyFields(payload);

  if (!serverEnv.OPENAI_API_KEY || Object.keys(sanitizedPayload).length === 0) {
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serverEnv.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: serverEnv.OPENAI_TRANSLATION_MODEL,
      instructions:
        "Translate the provided JSON values for a B2B export website. Keep the exact JSON keys and structure. Preserve brand names, SKUs, URLs, emails, phone numbers, numbers, units, HTML-free plain text, and technical model names. Return only valid JSON.",
      input: JSON.stringify({
        targetLocale,
        sourceLocale: serverEnv.TRANSLATION_SOURCE_LOCALE,
        content: sanitizedPayload,
      }),
      text: {
        format: {
          type: "json_object",
        },
      },
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const outputText = extractResponseText(data);

  if (!outputText) {
    return null;
  }

  try {
    const parsed = JSON.parse(outputText) as unknown;

    if (isRecord(parsed) && isRecord(parsed.content)) {
      return parsed.content as TranslationPayload;
    }

    return isRecord(parsed) ? (parsed as TranslationPayload) : null;
  } catch {
    return null;
  }
}

async function translateForLocales(payload: TranslationPayload) {
  const entries: Array<{ locale: Locale; data: TranslationPayload }> = [];

  for (const locale of getTargetLocales()) {
    const translated = await translatePayload(payload, locale);

    if (translated) {
      entries.push({ locale, data: translated });
    }
  }

  return entries;
}

function asJson(value: TranslationPayload[string]): Prisma.InputJsonValue | undefined {
  if (value === null || value === undefined || typeof value === "string") {
    return undefined;
  }

  return value as Prisma.InputJsonValue;
}

function asText(value: TranslationPayload[string]) {
  return typeof value === "string" ? value : undefined;
}

async function translateCompanyProfile(id: string) {
  const record = await db.companyProfile.findUnique({ where: { id } });

  if (!record) {
    return 0;
  }

  const translations = await translateForLocales({
    companyName: record.companyName,
    tagline: record.tagline,
    summary: record.summary,
    description: record.description,
    logoImageAlt: record.logoImageAlt,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
  });

  await Promise.all(
    translations.map(({ locale, data }) =>
      db.companyProfileTranslation.upsert({
        where: { companyProfileId_locale: { companyProfileId: id, locale } },
        update: {
          companyName: asText(data.companyName),
          tagline: asText(data.tagline),
          summary: asText(data.summary),
          description: asText(data.description),
          logoImageAlt: asText(data.logoImageAlt),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
        create: {
          companyProfileId: id,
          locale,
          companyName: asText(data.companyName),
          tagline: asText(data.tagline),
          summary: asText(data.summary),
          description: asText(data.description),
          logoImageAlt: asText(data.logoImageAlt),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
      }),
    ),
  );

  return translations.length;
}

async function translateProductCategory(id: string) {
  const record = await db.productCategory.findUnique({ where: { id } });

  if (!record) {
    return 0;
  }

  const translations = await translateForLocales({
    name: record.name,
    summary: record.summary,
    description: record.description,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
  });

  await Promise.all(
    translations.map(({ locale, data }) =>
      db.productCategoryTranslation.upsert({
        where: { productCategoryId_locale: { productCategoryId: id, locale } },
        update: {
          name: asText(data.name),
          summary: asText(data.summary),
          description: asText(data.description),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
        create: {
          productCategoryId: id,
          locale,
          name: asText(data.name),
          summary: asText(data.summary),
          description: asText(data.description),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
      }),
    ),
  );

  return translations.length;
}

async function translateProduct(id: string) {
  const record = await db.product.findUnique({ where: { id } });

  if (!record) {
    return 0;
  }

  const translations = await translateForLocales({
    name: record.name,
    summary: record.summary,
    description: record.description,
    heroTitle: record.heroTitle,
    heroImageAlt: record.heroImageAlt,
    sellingPoints: record.sellingPoints,
    specifications: record.specifications,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
  });

  await Promise.all(
    translations.map(({ locale, data }) =>
      db.productTranslation.upsert({
        where: { productId_locale: { productId: id, locale } },
        update: {
          name: asText(data.name),
          summary: asText(data.summary),
          description: asText(data.description),
          heroTitle: asText(data.heroTitle),
          heroImageAlt: asText(data.heroImageAlt),
          sellingPoints: asJson(data.sellingPoints),
          specifications: asJson(data.specifications),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
        create: {
          productId: id,
          locale,
          name: asText(data.name),
          summary: asText(data.summary),
          description: asText(data.description),
          heroTitle: asText(data.heroTitle),
          heroImageAlt: asText(data.heroImageAlt),
          sellingPoints: asJson(data.sellingPoints),
          specifications: asJson(data.specifications),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
      }),
    ),
  );

  return translations.length;
}

async function translateIndustryPage(id: string) {
  const record = await db.industryPage.findUnique({ where: { id } });

  if (!record) {
    return 0;
  }

  const translations = await translateForLocales({
    title: record.title,
    summary: record.summary,
    description: record.description,
    heroTitle: record.heroTitle,
    heroImageAlt: record.heroImageAlt,
    content: record.content,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
  });

  await Promise.all(
    translations.map(({ locale, data }) =>
      db.industryPageTranslation.upsert({
        where: { industryPageId_locale: { industryPageId: id, locale } },
        update: {
          title: asText(data.title),
          summary: asText(data.summary),
          description: asText(data.description),
          heroTitle: asText(data.heroTitle),
          heroImageAlt: asText(data.heroImageAlt),
          content: asJson(data.content),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
        create: {
          industryPageId: id,
          locale,
          title: asText(data.title),
          summary: asText(data.summary),
          description: asText(data.description),
          heroTitle: asText(data.heroTitle),
          heroImageAlt: asText(data.heroImageAlt),
          content: asJson(data.content),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
      }),
    ),
  );

  return translations.length;
}

async function translateBlogPost(id: string) {
  const record = await db.blogPost.findUnique({ where: { id } });

  if (!record) {
    return 0;
  }

  const translations = await translateForLocales({
    title: record.title,
    excerpt: record.excerpt,
    content: record.content,
    coverImageAlt: record.coverImageAlt,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
  });

  await Promise.all(
    translations.map(({ locale, data }) =>
      db.blogPostTranslation.upsert({
        where: { blogPostId_locale: { blogPostId: id, locale } },
        update: {
          title: asText(data.title),
          excerpt: asText(data.excerpt),
          content: asJson(data.content),
          coverImageAlt: asText(data.coverImageAlt),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
        create: {
          blogPostId: id,
          locale,
          title: asText(data.title),
          excerpt: asText(data.excerpt),
          content: asJson(data.content),
          coverImageAlt: asText(data.coverImageAlt),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
      }),
    ),
  );

  return translations.length;
}

async function translateFaq(id: string) {
  const record = await db.fAQ.findUnique({ where: { id } });

  if (!record) {
    return 0;
  }

  const translations = await translateForLocales({
    question: record.question,
    answer: record.answer,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
  });

  await Promise.all(
    translations.map(({ locale, data }) =>
      db.fAQTranslation.upsert({
        where: { faqId_locale: { faqId: id, locale } },
        update: {
          question: asText(data.question),
          answer: asText(data.answer),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
        create: {
          faqId: id,
          locale,
          question: asText(data.question),
          answer: asText(data.answer),
          seoTitle: asText(data.seoTitle),
          seoDescription: asText(data.seoDescription),
          translationStatus: "MACHINE_TRANSLATED",
        },
      }),
    ),
  );

  return translations.length;
}

export async function generateEntityTranslations({
  entityType,
  entityId,
}: {
  entityType: TranslatableEntityType;
  entityId: string;
}) {
  if (serverEnv.AUTO_TRANSLATE_ON_SAVE !== "true" || !serverEnv.OPENAI_API_KEY) {
    return { generated: 0, skipped: true };
  }

  const generated = await (async () => {
    switch (entityType) {
      case "CompanyProfile":
        return translateCompanyProfile(entityId);
      case "ProductCategory":
        return translateProductCategory(entityId);
      case "Product":
        return translateProduct(entityId);
      case "IndustryPage":
        return translateIndustryPage(entityId);
      case "BlogPost":
        return translateBlogPost(entityId);
      case "FAQ":
        return translateFaq(entityId);
    }
  })();

  return { generated, skipped: false };
}
