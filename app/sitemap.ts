import type { MetadataRoute } from "next";

import {
  getPublishedBlogPosts,
  getPublishedIndustries,
  getPublishedProducts,
} from "@/features/marketing/public-content";
import { i18nConfig, withLocalePath } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/about",
    "/contact",
    "/products",
    "/industries",
    "/blog",
    "/thank-you",
  ];
  const now = new Date();
  const [products, industries, blogPosts] = await Promise.all([
    getPublishedProducts(),
    getPublishedIndustries(),
    getPublishedBlogPosts(),
  ]);

  return [
    ...staticRoutes.flatMap((route) =>
      i18nConfig.locales.map((locale) => ({
        url: absoluteUrl(withLocalePath(locale, route)),
        lastModified: now,
        changeFrequency:
          route === "/" ? ("weekly" as const) : ("monthly" as const),
        priority: route === "/" ? 1 : 0.7,
      })),
    ),
    ...products.flatMap((product) =>
      i18nConfig.locales.map((locale) => ({
        url: absoluteUrl(withLocalePath(locale, `/products/${product.slug}`)),
        lastModified: new Date(product.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ),
    ...industries.flatMap((industry) =>
      i18nConfig.locales.map((locale) => ({
        url: absoluteUrl(withLocalePath(locale, `/industries/${industry.slug}`)),
        lastModified: new Date(industry.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.75,
      })),
    ),
    ...blogPosts.flatMap((post) =>
      i18nConfig.locales.map((locale) => ({
        url: absoluteUrl(withLocalePath(locale, `/blog/${post.slug}`)),
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.72,
      })),
    ),
  ];
}
