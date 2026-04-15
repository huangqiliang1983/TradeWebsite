import type { Prisma } from "@prisma/client";

import { unstable_cache } from "next/cache";

import { db } from "@/lib/db";
import { PUBLIC_REVALIDATE_SECONDS, publicCacheTags } from "@/lib/cache";
import {
  blogPosts as fallbackBlogPosts,
  getBlogPost,
  getIndustry,
  getProduct,
  homeFaq as fallbackHomeFaq,
  industries as fallbackIndustries,
  products as fallbackProducts,
} from "@/features/marketing/content";
import { siteConfig } from "@/lib/site";

export type MarketingSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type MarketingFaqItem = {
  question: string;
  answer: string;
};

export type PublishedCompanyProfile = {
  companyName: string;
  tagline: string;
  summary: string;
  description: string;
  logoImage: string;
  logoImageAlt: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  seoTitle: string;
  seoDescription: string;
  seoCanonical: string;
};

export type PublishedProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  intro: string;
  heroTitle: string;
  heroImage: string;
  heroImageAlt: string;
  sku: string;
  leadTime: string;
  moq: string;
  sellingPoints: string[];
  specifications: Array<{ label: string; value: string }>;
  faq: MarketingFaqItem[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoCanonical?: string | null;
  updatedAt: string;
};

export type PublishedIndustry = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  heroTitle: string;
  image: string;
  imageAlt: string;
  sections: MarketingSection[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoCanonical?: string | null;
  updatedAt: string;
};

export type PublishedBlogPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  sections: MarketingSection[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoCanonical?: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asStringList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function asSectionList(value: unknown): MarketingSection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((section) => {
      if (!isRecord(section)) {
        return null;
      }

      const heading = asString(section.heading).trim();
      const paragraphs = asStringList(section.paragraphs);
      const bullets = asStringList(section.bullets);

      if (!heading || paragraphs.length === 0) {
        return null;
      }

      return {
        heading,
        paragraphs,
        bullets: bullets.length > 0 ? bullets : undefined,
      };
    })
    .filter(Boolean) as MarketingSection[];
}

function asSpecifications(
  value: Prisma.JsonValue | null,
): Array<{ label: string; value: string }> {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      const label = asString(item.label).trim();
      const currentValue = asString(item.value).trim();

      if (!label || !currentValue) {
        return null;
      }

      return {
        label,
        value: currentValue,
      };
    })
    .filter(
      (item): item is { label: string; value: string } => Boolean(item),
    );
}

function estimateReadingTime(sections: MarketingSection[], excerpt: string) {
  const text = [
    excerpt,
    ...sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
  ]
    .join(" ")
    .trim();

  const wordCount = text ? text.split(/\s+/).length : 0;
  const minutes = Math.max(3, Math.ceil(wordCount / 180));
  return `${minutes} min read`;
}

function formatAddress(parts: Array<string | null | undefined>) {
  return parts.filter((part): part is string => Boolean(part && part.trim())).join(", ");
}

function createFallbackProduct(slug: string): PublishedProduct | null {
  const product = getProduct(slug);

  if (!product) {
    return null;
  }

  return {
    id: `fallback-product-${product.slug}`,
    slug: product.slug,
    name: product.name,
    category: product.category,
    description: product.description,
    intro: product.intro,
    heroTitle: product.heroTitle,
    heroImage: product.image,
    heroImageAlt: product.heroImageAlt,
    sku: product.sku,
    leadTime: product.leadTime,
    moq: product.moq,
    sellingPoints: product.sellingPoints,
    specifications: product.specifications,
    faq: product.faq,
    seoTitle: product.name,
    seoDescription: product.description,
    seoCanonical: `${siteConfig.url}/products/${product.slug}`,
    updatedAt: new Date().toISOString(),
  };
}

function createFallbackIndustry(slug: string): PublishedIndustry | null {
  const industry = getIndustry(slug);

  if (!industry) {
    return null;
  }

  return {
    id: `fallback-industry-${industry.slug}`,
    slug: industry.slug,
    name: industry.name,
    summary: industry.summary,
    heroTitle: industry.heroTitle,
    image: industry.image,
    imageAlt: industry.imageAlt,
    sections: industry.sections,
    seoTitle: industry.name,
    seoDescription: industry.summary,
    seoCanonical: `${siteConfig.url}/industries/${industry.slug}`,
    updatedAt: new Date().toISOString(),
  };
}

function createFallbackBlogPost(slug: string): PublishedBlogPost | null {
  const post = getBlogPost(slug);

  if (!post) {
    return null;
  }

  return {
    id: `fallback-blog-${post.slug}`,
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    category: post.category,
    readingTime: post.readingTime,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    image: post.image,
    imageAlt: post.imageAlt,
    sections: post.sections,
    seoTitle: post.title,
    seoDescription: post.summary,
    seoCanonical: `${siteConfig.url}/blog/${post.slug}`,
  };
}

export const getPublishedCompanyProfile = unstable_cache(
  async (): Promise<PublishedCompanyProfile> => {
    try {
      const company = await db.companyProfile.findFirst({
        where: { publishStatus: "PUBLISHED" },
        orderBy: { updatedAt: "desc" },
      });

      return {
        companyName: company?.companyName ?? siteConfig.companyName,
        tagline:
          company?.tagline ?? "Dependable OEM and export execution for global buyers",
        summary: company?.summary ?? siteConfig.description,
        description: company?.description ?? siteConfig.description,
        logoImage: company?.logoImage ?? "/brand/site-preview.svg",
        logoImageAlt:
          company?.logoImageAlt ?? `${siteConfig.companyName} visual identity`,
        email: company?.email ?? siteConfig.email,
        phone: company?.phone ?? siteConfig.phone,
        whatsapp: company?.whatsapp ?? siteConfig.whatsapp,
        address:
          formatAddress([
            company?.addressLine1,
            company?.addressLine2,
            company?.city,
            company?.state,
            company?.country,
            company?.postalCode,
          ]) || siteConfig.address,
        seoTitle: company?.seoTitle ?? siteConfig.name,
        seoDescription: company?.seoDescription ?? siteConfig.description,
        seoCanonical: company?.seoCanonical ?? siteConfig.url,
      };
    } catch {
      return {
        companyName: siteConfig.companyName,
        tagline: "Dependable OEM and export execution for global buyers",
        summary: siteConfig.description,
        description: siteConfig.description,
        logoImage: "/brand/site-preview.svg",
        logoImageAlt: `${siteConfig.companyName} visual identity`,
        email: siteConfig.email,
        phone: siteConfig.phone,
        whatsapp: siteConfig.whatsapp,
        address: siteConfig.address,
        seoTitle: siteConfig.name,
        seoDescription: siteConfig.description,
        seoCanonical: siteConfig.url,
      };
    }
  },
  ["published-company-profile"],
  {
    tags: [publicCacheTags.site, publicCacheTags.company],
    revalidate: PUBLIC_REVALIDATE_SECONDS,
  },
);

export const getPublishedHomeFaq = unstable_cache(
  async (): Promise<MarketingFaqItem[]> => {
    try {
      const faqs = await db.fAQ.findMany({
        where: {
          publishStatus: "PUBLISHED",
          productId: null,
          industryPageId: null,
          blogPostId: null,
        },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        select: {
          question: true,
          answer: true,
        },
      });

      return faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      }));
    } catch {
      return fallbackHomeFaq;
    }
  },
  ["published-home-faq"],
  {
    tags: [publicCacheTags.home, publicCacheTags.faq],
    revalidate: PUBLIC_REVALIDATE_SECONDS,
  },
);

export const getPublishedProducts = unstable_cache(
  async (): Promise<PublishedProduct[]> => {
    try {
      const products = await db.product.findMany({
        where: { publishStatus: "PUBLISHED" },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "asc" }],
        include: {
          category: {
            select: {
              name: true,
            },
          },
          faqs: {
            where: { publishStatus: "PUBLISHED" },
            orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
            select: {
              question: true,
              answer: true,
            },
          },
        },
      });

      return products.map((product) => ({
        id: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category?.name ?? "General Product",
        description: product.summary ?? product.name,
        intro: product.description ?? product.summary ?? product.name,
        heroTitle: product.heroTitle ?? product.name,
        heroImage: product.heroImage ?? "/brand/product-blueprint.svg",
        heroImageAlt: product.heroImageAlt ?? `${product.name} product image`,
        sku: product.sku ?? "Available on request",
        leadTime: product.leadTime ?? "Quoted per program",
        moq: product.moq ?? "Quoted per program",
        sellingPoints: asStringList(product.sellingPoints),
        specifications: asSpecifications(product.specifications),
        faq: product.faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        })),
        seoTitle: product.seoTitle,
        seoDescription: product.seoDescription,
        seoCanonical: product.seoCanonical,
        updatedAt: product.updatedAt.toISOString(),
      }));
    } catch {
      return fallbackProducts.map((product) => ({
        id: `fallback-product-${product.slug}`,
        slug: product.slug,
        name: product.name,
        category: product.category,
        description: product.description,
        intro: product.intro,
        heroTitle: product.heroTitle,
        heroImage: product.image,
        heroImageAlt: product.heroImageAlt,
        sku: product.sku,
        leadTime: product.leadTime,
        moq: product.moq,
        sellingPoints: product.sellingPoints,
        specifications: product.specifications,
        faq: product.faq,
        seoTitle: product.name,
        seoDescription: product.description,
        seoCanonical: `${siteConfig.url}/products/${product.slug}`,
        updatedAt: new Date().toISOString(),
      }));
    }
  },
  ["published-products"],
  {
    tags: [publicCacheTags.home, publicCacheTags.products],
    revalidate: PUBLIC_REVALIDATE_SECONDS,
  },
);

export async function getPublishedProductBySlug(slug: string) {
  return unstable_cache(
    async (): Promise<PublishedProduct | null> => {
      try {
        const product = await db.product.findFirst({
          where: {
            slug,
            publishStatus: "PUBLISHED",
          },
          include: {
            category: {
              select: {
                name: true,
              },
            },
            faqs: {
              where: { publishStatus: "PUBLISHED" },
              orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
              select: {
                question: true,
                answer: true,
              },
            },
          },
        });

        if (!product) {
          return null;
        }

        return {
          id: product.id,
          slug: product.slug,
          name: product.name,
          category: product.category?.name ?? "General Product",
          description: product.summary ?? product.name,
          intro: product.description ?? product.summary ?? product.name,
          heroTitle: product.heroTitle ?? product.name,
          heroImage: product.heroImage ?? "/brand/product-blueprint.svg",
          heroImageAlt: product.heroImageAlt ?? `${product.name} product image`,
          sku: product.sku ?? "Available on request",
          leadTime: product.leadTime ?? "Quoted per program",
          moq: product.moq ?? "Quoted per program",
          sellingPoints: asStringList(product.sellingPoints),
          specifications: asSpecifications(product.specifications),
          faq: product.faqs.map((faq) => ({
            question: faq.question,
            answer: faq.answer,
          })),
          seoTitle: product.seoTitle,
          seoDescription: product.seoDescription,
          seoCanonical: product.seoCanonical,
          updatedAt: product.updatedAt.toISOString(),
        };
      } catch {
        return createFallbackProduct(slug);
      }
    },
    [`published-product-${slug}`],
    {
      tags: [
        publicCacheTags.products,
        publicCacheTags.product(slug),
        publicCacheTags.faq,
      ],
      revalidate: PUBLIC_REVALIDATE_SECONDS,
    },
  )();
}

export const getPublishedIndustries = unstable_cache(
  async (): Promise<PublishedIndustry[]> => {
    try {
      const industries = await db.industryPage.findMany({
        where: { publishStatus: "PUBLISHED" },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "asc" }],
      });

      return industries.map((industry) => ({
        id: industry.id,
        slug: industry.slug,
        name: industry.title,
        summary: industry.summary ?? industry.title,
        heroTitle: industry.heroTitle ?? industry.title,
        image: industry.heroImage ?? "/brand/operations.svg",
        imageAlt: industry.heroImageAlt ?? `${industry.title} industry illustration`,
        sections: asSectionList(industry.content),
        seoTitle: industry.seoTitle,
        seoDescription: industry.seoDescription,
        seoCanonical: industry.seoCanonical,
        updatedAt: industry.updatedAt.toISOString(),
      }));
    } catch {
      return fallbackIndustries.map((industry) => ({
        id: `fallback-industry-${industry.slug}`,
        slug: industry.slug,
        name: industry.name,
        summary: industry.summary,
        heroTitle: industry.heroTitle,
        image: industry.image,
        imageAlt: industry.imageAlt,
        sections: industry.sections,
        seoTitle: industry.name,
        seoDescription: industry.summary,
        seoCanonical: `${siteConfig.url}/industries/${industry.slug}`,
        updatedAt: new Date().toISOString(),
      }));
    }
  },
  ["published-industries"],
  {
    tags: [publicCacheTags.home, publicCacheTags.industries],
    revalidate: PUBLIC_REVALIDATE_SECONDS,
  },
);

export async function getPublishedIndustryBySlug(slug: string) {
  return unstable_cache(
    async (): Promise<PublishedIndustry | null> => {
      try {
        const industry = await db.industryPage.findFirst({
          where: {
            slug,
            publishStatus: "PUBLISHED",
          },
        });

        if (!industry) {
          return null;
        }

        return {
          id: industry.id,
          slug: industry.slug,
          name: industry.title,
          summary: industry.summary ?? industry.title,
          heroTitle: industry.heroTitle ?? industry.title,
          image: industry.heroImage ?? "/brand/operations.svg",
          imageAlt:
            industry.heroImageAlt ?? `${industry.title} industry illustration`,
          sections: asSectionList(industry.content),
          seoTitle: industry.seoTitle,
          seoDescription: industry.seoDescription,
          seoCanonical: industry.seoCanonical,
          updatedAt: industry.updatedAt.toISOString(),
        };
      } catch {
        return createFallbackIndustry(slug);
      }
    },
    [`published-industry-${slug}`],
    {
      tags: [publicCacheTags.industries, publicCacheTags.industry(slug)],
      revalidate: PUBLIC_REVALIDATE_SECONDS,
    },
  )();
}

export const getPublishedBlogPosts = unstable_cache(
  async (): Promise<PublishedBlogPost[]> => {
    try {
      const posts = await db.blogPost.findMany({
        where: { publishStatus: "PUBLISHED" },
        orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
      });

      return posts.map((post) => {
        const sections = asSectionList(post.content);
        const summary = post.excerpt ?? post.title;
        const publishedAt = post.publishedAt ?? post.updatedAt;

        return {
          id: post.id,
          slug: post.slug,
          title: post.title,
          summary,
          category: "Insights",
          readingTime: estimateReadingTime(sections, summary),
          publishedAt: publishedAt.toISOString().slice(0, 10),
          updatedAt: post.updatedAt.toISOString().slice(0, 10),
          image: post.coverImage ?? "/brand/insight-map.svg",
          imageAlt: post.coverImageAlt ?? `${post.title} article cover image`,
          sections,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          seoCanonical: post.seoCanonical,
        };
      });
    } catch {
      return fallbackBlogPosts.map((post) => ({
        id: `fallback-blog-${post.slug}`,
        slug: post.slug,
        title: post.title,
        summary: post.summary,
        category: post.category,
        readingTime: post.readingTime,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        image: post.image,
        imageAlt: post.imageAlt,
        sections: post.sections,
        seoTitle: post.title,
        seoDescription: post.summary,
        seoCanonical: `${siteConfig.url}/blog/${post.slug}`,
      }));
    }
  },
  ["published-blog-posts"],
  {
    tags: [publicCacheTags.home, publicCacheTags.blog],
    revalidate: PUBLIC_REVALIDATE_SECONDS,
  },
);

export async function getPublishedBlogPostBySlug(slug: string) {
  return unstable_cache(
    async (): Promise<PublishedBlogPost | null> => {
      try {
        const post = await db.blogPost.findFirst({
          where: {
            slug,
            publishStatus: "PUBLISHED",
          },
        });

        if (!post) {
          return null;
        }

        const sections = asSectionList(post.content);
        const summary = post.excerpt ?? post.title;
        const publishedAt = post.publishedAt ?? post.updatedAt;

        return {
          id: post.id,
          slug: post.slug,
          title: post.title,
          summary,
          category: "Insights",
          readingTime: estimateReadingTime(sections, summary),
          publishedAt: publishedAt.toISOString().slice(0, 10),
          updatedAt: post.updatedAt.toISOString().slice(0, 10),
          image: post.coverImage ?? "/brand/insight-map.svg",
          imageAlt: post.coverImageAlt ?? `${post.title} article cover image`,
          sections,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          seoCanonical: post.seoCanonical,
        };
      } catch {
        return createFallbackBlogPost(slug);
      }
    },
    [`published-blog-post-${slug}`],
    {
      tags: [publicCacheTags.blog, publicCacheTags.blogPost(slug)],
      revalidate: PUBLIC_REVALIDATE_SECONDS,
    },
  )();
}

export async function getRedirectForPath(sourcePath: string) {
  try {
    return await unstable_cache(
      async () =>
        db.urlRedirect.findUnique({
          where: { sourcePath },
        }),
      [`url-redirect-${sourcePath}`],
      {
        tags: [publicCacheTags.redirects],
        revalidate: PUBLIC_REVALIDATE_SECONDS,
      },
    )();
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as Error & { code?: string }).code === "P2021"
    ) {
      return null;
    }

    throw error;
  }
}
