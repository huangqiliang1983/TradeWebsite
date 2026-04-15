-- CreateEnum
CREATE TYPE "TranslationStatus" AS ENUM ('DRAFT', 'MACHINE_TRANSLATED', 'REVIEWED', 'PUBLISHED');

-- CreateTable
CREATE TABLE "CompanyProfileTranslation" (
    "id" TEXT NOT NULL,
    "companyProfileId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "companyName" TEXT,
    "tagline" TEXT,
    "summary" TEXT,
    "description" TEXT,
    "logoImageAlt" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "translationStatus" "TranslationStatus" NOT NULL DEFAULT 'MACHINE_TRANSLATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyProfileTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategoryTranslation" (
    "id" TEXT NOT NULL,
    "productCategoryId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT,
    "summary" TEXT,
    "description" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "translationStatus" "TranslationStatus" NOT NULL DEFAULT 'MACHINE_TRANSLATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTranslation" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT,
    "summary" TEXT,
    "description" TEXT,
    "heroTitle" TEXT,
    "heroImageAlt" TEXT,
    "sellingPoints" JSONB,
    "specifications" JSONB,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "translationStatus" "TranslationStatus" NOT NULL DEFAULT 'MACHINE_TRANSLATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndustryPageTranslation" (
    "id" TEXT NOT NULL,
    "industryPageId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT,
    "summary" TEXT,
    "description" TEXT,
    "heroTitle" TEXT,
    "heroImageAlt" TEXT,
    "content" JSONB,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "translationStatus" "TranslationStatus" NOT NULL DEFAULT 'MACHINE_TRANSLATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndustryPageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPostTranslation" (
    "id" TEXT NOT NULL,
    "blogPostId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT,
    "excerpt" TEXT,
    "content" JSONB,
    "coverImageAlt" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "translationStatus" "TranslationStatus" NOT NULL DEFAULT 'MACHINE_TRANSLATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPostTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQTranslation" (
    "id" TEXT NOT NULL,
    "faqId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "question" TEXT,
    "answer" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "translationStatus" "TranslationStatus" NOT NULL DEFAULT 'MACHINE_TRANSLATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfileTranslation_companyProfileId_locale_key" ON "CompanyProfileTranslation"("companyProfileId", "locale");
CREATE INDEX "CompanyProfileTranslation_locale_translationStatus_idx" ON "CompanyProfileTranslation"("locale", "translationStatus");

CREATE UNIQUE INDEX "ProductCategoryTranslation_productCategoryId_locale_key" ON "ProductCategoryTranslation"("productCategoryId", "locale");
CREATE INDEX "ProductCategoryTranslation_locale_translationStatus_idx" ON "ProductCategoryTranslation"("locale", "translationStatus");

CREATE UNIQUE INDEX "ProductTranslation_productId_locale_key" ON "ProductTranslation"("productId", "locale");
CREATE INDEX "ProductTranslation_locale_translationStatus_idx" ON "ProductTranslation"("locale", "translationStatus");

CREATE UNIQUE INDEX "IndustryPageTranslation_industryPageId_locale_key" ON "IndustryPageTranslation"("industryPageId", "locale");
CREATE INDEX "IndustryPageTranslation_locale_translationStatus_idx" ON "IndustryPageTranslation"("locale", "translationStatus");

CREATE UNIQUE INDEX "BlogPostTranslation_blogPostId_locale_key" ON "BlogPostTranslation"("blogPostId", "locale");
CREATE INDEX "BlogPostTranslation_locale_translationStatus_idx" ON "BlogPostTranslation"("locale", "translationStatus");

CREATE UNIQUE INDEX "FAQTranslation_faqId_locale_key" ON "FAQTranslation"("faqId", "locale");
CREATE INDEX "FAQTranslation_locale_translationStatus_idx" ON "FAQTranslation"("locale", "translationStatus");

-- AddForeignKey
ALTER TABLE "CompanyProfileTranslation" ADD CONSTRAINT "CompanyProfileTranslation_companyProfileId_fkey" FOREIGN KEY ("companyProfileId") REFERENCES "CompanyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProductCategoryTranslation" ADD CONSTRAINT "ProductCategoryTranslation_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProductTranslation" ADD CONSTRAINT "ProductTranslation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "IndustryPageTranslation" ADD CONSTRAINT "IndustryPageTranslation_industryPageId_fkey" FOREIGN KEY ("industryPageId") REFERENCES "IndustryPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BlogPostTranslation" ADD CONSTRAINT "BlogPostTranslation_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FAQTranslation" ADD CONSTRAINT "FAQTranslation_faqId_fkey" FOREIGN KEY ("faqId") REFERENCES "FAQ"("id") ON DELETE CASCADE ON UPDATE CASCADE;
