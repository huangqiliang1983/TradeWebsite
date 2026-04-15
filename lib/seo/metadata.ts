import type { Metadata } from "next";

import { buildLanguageAlternates } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";
import { absoluteUrl, siteConfig } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  locale?: Locale;
  canonicalUrl?: string;
  keywords?: string[];
  type?: "website" | "article";
  imagePath?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  locale = "en",
  canonicalUrl,
  keywords = [],
  type = "website",
  imagePath = "/brand/site-preview.svg",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const localizedPath = withLocalePath(locale, path);
  const pageUrl = canonicalUrl ?? absoluteUrl(localizedPath);
  const fullTitle = `${title} | ${siteConfig.name}`;
  const alternates = buildLanguageAlternates(path);
  alternates.canonical = pageUrl;

  return {
    title,
    description,
    keywords,
    alternates,
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: locale === "zh-CN" ? "zh_CN" : siteConfig.locale,
      type,
      images: [
        {
          url: absoluteUrl(imagePath),
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(imagePath)],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
