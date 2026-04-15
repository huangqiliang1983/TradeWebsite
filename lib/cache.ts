import { revalidatePath, revalidateTag } from "next/cache";

export const PUBLIC_REVALIDATE_SECONDS = 60 * 60;

export const publicCacheTags = {
  site: "public:site",
  company: "public:company",
  home: "public:home",
  products: "public:products",
  product: (slug: string) => `public:product:${slug}`,
  industries: "public:industries",
  industry: (slug: string) => `public:industry:${slug}`,
  blog: "public:blog",
  blogPost: (slug: string) => `public:blog:${slug}`,
  faq: "public:faq",
  redirects: "public:redirects",
  sitemap: "public:sitemap",
} as const;

export type PublicEntityType =
  | "CompanyProfile"
  | "Product"
  | "IndustryPage"
  | "BlogPost"
  | "ProductCategory"
  | "FAQ";

export function getEntityPublicPath(
  entityType: PublicEntityType,
  slug?: string | null,
) {
  if (!slug) {
    return null;
  }

  switch (entityType) {
    case "Product":
      return `/products/${slug}`;
    case "IndustryPage":
      return `/industries/${slug}`;
    case "BlogPost":
      return `/blog/${slug}`;
    default:
      return null;
  }
}

function revalidatePage(path: string) {
  revalidatePath(path, "page");
}

function revalidateTagNow(tag: string) {
  revalidateTag(tag, "max");
}

export function revalidatePublishedSiteShell() {
  [
    publicCacheTags.site,
    publicCacheTags.company,
    publicCacheTags.home,
    publicCacheTags.faq,
    publicCacheTags.sitemap,
  ].forEach((tag) => revalidateTagNow(tag));

  ["/", "/about", "/contact", "/thank-you", "/sitemap.xml"].forEach((path) =>
    revalidatePage(path),
  );
}

export function revalidatePublishedEntity({
  entityType,
  slug,
  previousSlug,
}: {
  entityType: PublicEntityType;
  slug?: string | null;
  previousSlug?: string | null;
}) {
  const currentPath = getEntityPublicPath(entityType, slug);
  const previousPath = getEntityPublicPath(entityType, previousSlug);

  revalidateTagNow(publicCacheTags.sitemap);
  revalidateTagNow(publicCacheTags.redirects);

  if (entityType === "Product") {
    revalidateTagNow(publicCacheTags.products);
    if (slug) {
      revalidateTagNow(publicCacheTags.product(slug));
    }
    if (previousSlug) {
      revalidateTagNow(publicCacheTags.product(previousSlug));
    }
    revalidatePage("/products");
    revalidatePage("/");
  }

  if (entityType === "IndustryPage") {
    revalidateTagNow(publicCacheTags.industries);
    if (slug) {
      revalidateTagNow(publicCacheTags.industry(slug));
    }
    if (previousSlug) {
      revalidateTagNow(publicCacheTags.industry(previousSlug));
    }
    revalidatePage("/industries");
    revalidatePage("/");
  }

  if (entityType === "BlogPost") {
    revalidateTagNow(publicCacheTags.blog);
    if (slug) {
      revalidateTagNow(publicCacheTags.blogPost(slug));
    }
    if (previousSlug) {
      revalidateTagNow(publicCacheTags.blogPost(previousSlug));
    }
    revalidatePage("/blog");
    revalidatePage("/");
  }

  if (entityType === "ProductCategory") {
    revalidateTagNow(publicCacheTags.products);
    revalidatePage("/products");
  }

  if (entityType === "FAQ") {
    revalidateTagNow(publicCacheTags.faq);
    revalidatePage("/");
  }

  if (entityType === "CompanyProfile") {
    revalidatePublishedSiteShell();
  }

  if (currentPath) {
    revalidatePage(currentPath);
  }

  if (previousPath) {
    revalidatePage(previousPath);
  }

  revalidatePage("/sitemap.xml");
}
