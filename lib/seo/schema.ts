import { absoluteUrl, siteConfig } from "@/lib/site";

type OrganizationOverrides = {
  companyName?: string;
  logoImage?: string;
  email?: string;
  phone?: string;
  address?: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type ProductSchemaInput = {
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  sku: string;
  canonicalUrl?: string;
};

type ArticleSchemaInput = {
  title: string;
  slug: string;
  description: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  canonicalUrl?: string;
};

export function organizationSchema(overrides?: OrganizationOverrides) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: overrides?.companyName ?? siteConfig.companyName,
    url: siteConfig.url,
    logo: absoluteUrl(overrides?.logoImage ?? "/brand/site-preview.svg"),
    email: overrides?.email ?? siteConfig.email,
    telephone: overrides?.phone ?? siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: overrides?.address ?? siteConfig.address,
      addressLocality: "Shanghai",
      addressCountry: "CN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: overrides?.email ?? siteConfig.email,
        telephone: overrides?.phone ?? siteConfig.phone,
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function productSchema(product: ProductSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    category: product.category,
    description: product.description,
    image: absoluteUrl(product.image),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.companyName,
    },
    url: product.canonicalUrl ?? absoluteUrl(`/products/${product.slug}`),
  };
}

export function articleSchema(article: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: absoluteUrl(article.image),
    mainEntityOfPage:
      article.canonicalUrl ?? absoluteUrl(`/blog/${article.slug}`),
    author: {
      "@type": "Organization",
      name: siteConfig.companyName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.companyName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/site-preview.svg"),
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
  };
}
