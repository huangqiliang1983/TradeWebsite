import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { i18nConfig, type Locale } from "@/lib/i18n";
import {
  getFormString,
  getOptionalString,
  parseLineList,
  parseSpecificationLines,
} from "@/features/admin/utils";

export type AdminTranslationLocale = Exclude<Locale, "en">;

export const adminTranslationLocales = i18nConfig.locales.filter(
  (locale): locale is AdminTranslationLocale => locale !== "en",
);

type TranslationField =
  | "answer"
  | "companyName"
  | "contentText"
  | "coverImageAlt"
  | "description"
  | "excerpt"
  | "heroImageAlt"
  | "heroTitle"
  | "logoImageAlt"
  | "name"
  | "question"
  | "sellingPoints"
  | "seoDescription"
  | "seoTitle"
  | "specifications"
  | "summary"
  | "tagline"
  | "title";

function fieldName(locale: AdminTranslationLocale, field: TranslationField) {
  return `translation_${locale}_${field}`;
}

function translationString(formData: FormData, locale: AdminTranslationLocale, field: TranslationField) {
  return getOptionalString(formData, fieldName(locale, field));
}

function translationLines(formData: FormData, locale: AdminTranslationLocale, field: TranslationField) {
  return parseLineList(getFormString(formData, fieldName(locale, field)));
}

function translationSpecs(formData: FormData, locale: AdminTranslationLocale) {
  return parseSpecificationLines(getFormString(formData, fieldName(locale, "specifications")));
}

function translationSections(formData: FormData, locale: AdminTranslationLocale) {
  const blocks = getFormString(formData, fieldName(locale, "contentText"))
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, index) => ({
    heading: `Section ${index + 1}`,
    paragraphs: block
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
  }));
}

function hasTextValues(values: Array<string | null>) {
  return values.some((value) => Boolean(value));
}

function hasJsonValues(values: Array<Prisma.InputJsonValue | undefined>) {
  return values.some((value) => {
    if (!value) {
      return false;
    }

    return Array.isArray(value) ? value.length > 0 : true;
  });
}

function nonEmptyJson(value: Prisma.InputJsonValue): Prisma.InputJsonValue | undefined {
  return Array.isArray(value) && value.length === 0 ? undefined : value;
}

export async function saveCompanyProfileTranslations(formData: FormData, companyProfileId: string) {
  await Promise.all(
    adminTranslationLocales.map(async (locale) => {
      const data = {
        companyName: translationString(formData, locale, "companyName"),
        tagline: translationString(formData, locale, "tagline"),
        summary: translationString(formData, locale, "summary"),
        description: translationString(formData, locale, "description"),
        logoImageAlt: translationString(formData, locale, "logoImageAlt"),
        seoTitle: translationString(formData, locale, "seoTitle"),
        seoDescription: translationString(formData, locale, "seoDescription"),
      };

      if (!hasTextValues(Object.values(data))) {
        await db.companyProfileTranslation.deleteMany({
          where: { companyProfileId, locale },
        });
        return;
      }

      await db.companyProfileTranslation.upsert({
        where: { companyProfileId_locale: { companyProfileId, locale } },
        update: { ...data, translationStatus: "PUBLISHED" },
        create: { companyProfileId, locale, ...data, translationStatus: "PUBLISHED" },
      });
    }),
  );
}

export async function saveProductCategoryTranslations(formData: FormData, productCategoryId: string) {
  await Promise.all(
    adminTranslationLocales.map(async (locale) => {
      const data = {
        name: translationString(formData, locale, "name"),
        summary: translationString(formData, locale, "summary"),
        description: translationString(formData, locale, "description"),
        seoTitle: translationString(formData, locale, "seoTitle"),
        seoDescription: translationString(formData, locale, "seoDescription"),
      };

      if (!hasTextValues(Object.values(data))) {
        await db.productCategoryTranslation.deleteMany({
          where: { productCategoryId, locale },
        });
        return;
      }

      await db.productCategoryTranslation.upsert({
        where: { productCategoryId_locale: { productCategoryId, locale } },
        update: { ...data, translationStatus: "PUBLISHED" },
        create: { productCategoryId, locale, ...data, translationStatus: "PUBLISHED" },
      });
    }),
  );
}

export async function saveProductTranslations(formData: FormData, productId: string) {
  await Promise.all(
    adminTranslationLocales.map(async (locale) => {
      const sellingPoints = nonEmptyJson(translationLines(formData, locale, "sellingPoints"));
      const specifications = nonEmptyJson(translationSpecs(formData, locale));
      const data = {
        name: translationString(formData, locale, "name"),
        summary: translationString(formData, locale, "summary"),
        description: translationString(formData, locale, "description"),
        heroTitle: translationString(formData, locale, "heroTitle"),
        heroImageAlt: translationString(formData, locale, "heroImageAlt"),
        sellingPoints,
        specifications,
        seoTitle: translationString(formData, locale, "seoTitle"),
        seoDescription: translationString(formData, locale, "seoDescription"),
      };

      if (
        !hasTextValues([
          data.name,
          data.summary,
          data.description,
          data.heroTitle,
          data.heroImageAlt,
          data.seoTitle,
          data.seoDescription,
        ]) &&
        !hasJsonValues([sellingPoints, specifications])
      ) {
        await db.productTranslation.deleteMany({ where: { productId, locale } });
        return;
      }

      await db.productTranslation.upsert({
        where: { productId_locale: { productId, locale } },
        update: { ...data, translationStatus: "PUBLISHED" },
        create: { productId, locale, ...data, translationStatus: "PUBLISHED" },
      });
    }),
  );
}

export async function saveIndustryPageTranslations(formData: FormData, industryPageId: string) {
  await Promise.all(
    adminTranslationLocales.map(async (locale) => {
      const content = nonEmptyJson(translationSections(formData, locale));
      const data = {
        title: translationString(formData, locale, "title"),
        summary: translationString(formData, locale, "summary"),
        description: translationString(formData, locale, "description"),
        heroTitle: translationString(formData, locale, "heroTitle"),
        heroImageAlt: translationString(formData, locale, "heroImageAlt"),
        content,
        seoTitle: translationString(formData, locale, "seoTitle"),
        seoDescription: translationString(formData, locale, "seoDescription"),
      };

      if (
        !hasTextValues([
          data.title,
          data.summary,
          data.description,
          data.heroTitle,
          data.heroImageAlt,
          data.seoTitle,
          data.seoDescription,
        ]) &&
        !hasJsonValues([content])
      ) {
        await db.industryPageTranslation.deleteMany({ where: { industryPageId, locale } });
        return;
      }

      await db.industryPageTranslation.upsert({
        where: { industryPageId_locale: { industryPageId, locale } },
        update: { ...data, translationStatus: "PUBLISHED" },
        create: { industryPageId, locale, ...data, translationStatus: "PUBLISHED" },
      });
    }),
  );
}

export async function saveBlogPostTranslations(formData: FormData, blogPostId: string) {
  await Promise.all(
    adminTranslationLocales.map(async (locale) => {
      const content = nonEmptyJson(translationSections(formData, locale));
      const data = {
        title: translationString(formData, locale, "title"),
        excerpt: translationString(formData, locale, "excerpt"),
        content,
        coverImageAlt: translationString(formData, locale, "coverImageAlt"),
        seoTitle: translationString(formData, locale, "seoTitle"),
        seoDescription: translationString(formData, locale, "seoDescription"),
      };

      if (
        !hasTextValues([
          data.title,
          data.excerpt,
          data.coverImageAlt,
          data.seoTitle,
          data.seoDescription,
        ]) &&
        !hasJsonValues([content])
      ) {
        await db.blogPostTranslation.deleteMany({ where: { blogPostId, locale } });
        return;
      }

      await db.blogPostTranslation.upsert({
        where: { blogPostId_locale: { blogPostId, locale } },
        update: { ...data, translationStatus: "PUBLISHED" },
        create: { blogPostId, locale, ...data, translationStatus: "PUBLISHED" },
      });
    }),
  );
}

export async function saveFaqTranslations(formData: FormData, faqId: string) {
  await Promise.all(
    adminTranslationLocales.map(async (locale) => {
      const data = {
        question: translationString(formData, locale, "question"),
        answer: translationString(formData, locale, "answer"),
        seoTitle: translationString(formData, locale, "seoTitle"),
        seoDescription: translationString(formData, locale, "seoDescription"),
      };

      if (!hasTextValues(Object.values(data))) {
        await db.fAQTranslation.deleteMany({ where: { faqId, locale } });
        return;
      }

      await db.fAQTranslation.upsert({
        where: { faqId_locale: { faqId, locale } },
        update: { ...data, translationStatus: "PUBLISHED" },
        create: { faqId, locale, ...data, translationStatus: "PUBLISHED" },
      });
    }),
  );
}
