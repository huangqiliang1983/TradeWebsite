import { PrismaClient } from "@prisma/client";

import { blogPosts, homeFaq, industries, products } from "@/features/marketing/content";
import { siteConfig } from "@/lib/site";

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.companyProfile.upsert({
    where: { slug: "default-company" },
    update: {
      companyName: siteConfig.companyName,
      tagline: "Dependable OEM and export execution for global buyers",
      summary: siteConfig.description,
      description: siteConfig.description,
      logoImage: "/brand/site-preview.svg",
      logoImageAlt: `${siteConfig.companyName} company profile image`,
      email: siteConfig.email,
      phone: siteConfig.phone,
      whatsapp: siteConfig.whatsapp,
      addressLine1: siteConfig.address,
      city: "Shanghai",
      country: "China",
      seoTitle: siteConfig.name,
      seoDescription: siteConfig.description,
      seoCanonical: siteConfig.url,
      publishStatus: "PUBLISHED",
    },
    create: {
      companyName: siteConfig.companyName,
      slug: "default-company",
      tagline: "Dependable OEM and export execution for global buyers",
      summary: siteConfig.description,
      description: siteConfig.description,
      logoImage: "/brand/site-preview.svg",
      logoImageAlt: `${siteConfig.companyName} company profile image`,
      email: siteConfig.email,
      phone: siteConfig.phone,
      whatsapp: siteConfig.whatsapp,
      addressLine1: siteConfig.address,
      city: "Shanghai",
      country: "China",
      seoTitle: siteConfig.name,
      seoDescription: siteConfig.description,
      seoCanonical: siteConfig.url,
      publishStatus: "PUBLISHED",
    },
  });

  const categoryMap = new Map<string, string>();

  for (const categoryName of [...new Set(products.map((product) => product.category))]) {
    const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const category = await prisma.productCategory.upsert({
      where: { slug },
      update: {
        name: categoryName,
        summary: `${categoryName} solutions for export-ready B2B programs.`,
        seoTitle: categoryName,
        seoDescription: `${categoryName} category content for B2B buyers and search visibility.`,
        publishStatus: "PUBLISHED",
      },
      create: {
        name: categoryName,
        slug,
        summary: `${categoryName} solutions for export-ready B2B programs.`,
        seoTitle: categoryName,
        seoDescription: `${categoryName} category content for B2B buyers and search visibility.`,
        publishStatus: "PUBLISHED",
      },
    });

    categoryMap.set(categoryName, category.id);
  }

  for (const product of products) {
    const record = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        categoryId: categoryMap.get(product.category) ?? null,
        name: product.name,
        sku: product.sku,
        summary: product.description,
        description: product.intro,
        heroTitle: product.heroTitle,
        heroImage: product.image,
        heroImageAlt: product.heroImageAlt,
        leadTime: product.leadTime,
        moq: product.moq,
        sellingPoints: product.sellingPoints,
        specifications: product.specifications,
        seoTitle: product.name,
        seoDescription: product.description,
        seoCanonical: `${siteConfig.url}/products/${product.slug}`,
        publishStatus: "PUBLISHED",
      },
      create: {
        categoryId: categoryMap.get(product.category) ?? null,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        summary: product.description,
        description: product.intro,
        heroTitle: product.heroTitle,
        heroImage: product.image,
        heroImageAlt: product.heroImageAlt,
        leadTime: product.leadTime,
        moq: product.moq,
        sellingPoints: product.sellingPoints,
        specifications: product.specifications,
        seoTitle: product.name,
        seoDescription: product.description,
        seoCanonical: `${siteConfig.url}/products/${product.slug}`,
        publishStatus: "PUBLISHED",
      },
    });

    for (const [index, faq] of product.faq.entries()) {
      await prisma.fAQ.upsert({
        where: {
          id: `${record.id}-${index}`.slice(0, 36),
        },
        update: {
          question: faq.question,
          answer: faq.answer,
          sortOrder: index,
          publishStatus: "PUBLISHED",
          productId: record.id,
        },
        create: {
          id: `${record.id}-${index}`.slice(0, 36),
          question: faq.question,
          answer: faq.answer,
          sortOrder: index,
          publishStatus: "PUBLISHED",
          productId: record.id,
        },
      });
    }
  }

  for (const industry of industries) {
    await prisma.industryPage.upsert({
      where: { slug: industry.slug },
      update: {
        title: industry.name,
        summary: industry.summary,
        description: industry.summary,
        heroTitle: industry.heroTitle,
        heroImage: industry.image,
        heroImageAlt: industry.imageAlt,
        content: industry.sections,
        seoTitle: industry.name,
        seoDescription: industry.summary,
        seoCanonical: `${siteConfig.url}/industries/${industry.slug}`,
        publishStatus: "PUBLISHED",
      },
      create: {
        title: industry.name,
        slug: industry.slug,
        summary: industry.summary,
        description: industry.summary,
        heroTitle: industry.heroTitle,
        heroImage: industry.image,
        heroImageAlt: industry.imageAlt,
        content: industry.sections,
        seoTitle: industry.name,
        seoDescription: industry.summary,
        seoCanonical: `${siteConfig.url}/industries/${industry.slug}`,
        publishStatus: "PUBLISHED",
      },
    });
  }

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.summary,
        content: post.sections,
        coverImage: post.image,
        coverImageAlt: post.imageAlt,
        publishedAt: new Date(post.publishedAt),
        seoTitle: post.title,
        seoDescription: post.summary,
        seoCanonical: `${siteConfig.url}/blog/${post.slug}`,
        publishStatus: "PUBLISHED",
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.summary,
        content: post.sections,
        coverImage: post.image,
        coverImageAlt: post.imageAlt,
        publishedAt: new Date(post.publishedAt),
        seoTitle: post.title,
        seoDescription: post.summary,
        seoCanonical: `${siteConfig.url}/blog/${post.slug}`,
        publishStatus: "PUBLISHED",
      },
    });
  }

  for (const [index, faq] of homeFaq.entries()) {
    await prisma.fAQ.upsert({
      where: {
        id: `home-faq-${index}`.slice(0, 36),
      },
      update: {
        question: faq.question,
        answer: faq.answer,
        sortOrder: 100 + index,
        publishStatus: "PUBLISHED",
      },
      create: {
        id: `home-faq-${index}`.slice(0, 36),
        question: faq.question,
        answer: faq.answer,
        sortOrder: 100 + index,
        publishStatus: "PUBLISHED",
      },
    });
  }

  console.log(`Seeded company profile ${company.companyName}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
