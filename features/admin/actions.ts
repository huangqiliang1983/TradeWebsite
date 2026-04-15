"use server";

import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import {
  revalidatePublishedEntity,
  revalidatePublishedSiteShell,
} from "@/lib/cache";
import { requireAdminSession } from "@/lib/auth";
import { createAuditLog } from "@/features/admin/audit";
import {
  assertUniqueSlug,
  clearEntityRedirects,
  syncPublishedRedirect,
} from "@/features/admin/publishing";
import { saveAdminImageUpload } from "@/features/admin/upload";
import {
  getFormString,
  getOptionalString,
  getPublishStatus,
  parseLineList,
  parseSpecificationLines,
} from "@/features/admin/utils";
import {
  saveBlogPostTranslations,
  saveCompanyProfileTranslations,
  saveFaqTranslations,
  saveIndustryPageTranslations,
  saveProductCategoryTranslations,
  saveProductTranslations,
} from "@/features/admin/translations";

function buildRedirect(path: string, params: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
}

function normalizePath(path: string, fallback: string) {
  return path.startsWith("/admin") ? path : fallback;
}

function parseContentSections(rawText: string) {
  const blocks = rawText
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

async function requireAdminWriter() {
  return requireAdminSession();
}

const SAFE_ADMIN_ACTION_ERRORS = new Set([
  "This slug is already in use. Please choose a unique slug.",
  "Only JPG, PNG, and WEBP images are allowed.",
  "The uploaded image is too large.",
  "The uploaded file failed image signature validation.",
]);

function getAdminActionErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && SAFE_ADMIN_ACTION_ERRORS.has(error.message)) {
    return error.message;
  }

  return fallback;
}

async function revalidateFaqTargets({
  productId,
  industryPageId,
  blogPostId,
}: {
  productId?: string | null;
  industryPageId?: string | null;
  blogPostId?: string | null;
}) {
  const [product, industry, blogPost] = await Promise.all([
    productId
      ? db.product.findUnique({
          where: { id: productId },
          select: { slug: true },
        })
      : null,
    industryPageId
      ? db.industryPage.findUnique({
          where: { id: industryPageId },
          select: { slug: true },
        })
      : null,
    blogPostId
      ? db.blogPost.findUnique({
          where: { id: blogPostId },
          select: { slug: true },
        })
      : null,
  ]);

  if (product?.slug) {
    revalidatePublishedEntity({ entityType: "Product", slug: product.slug });
  }

  if (industry?.slug) {
    revalidatePublishedEntity({ entityType: "IndustryPage", slug: industry.slug });
  }

  if (blogPost?.slug) {
    revalidatePublishedEntity({ entityType: "BlogPost", slug: blogPost.slug });
  }
}

export async function saveCompanyProfileAction(formData: FormData) {
  const session = await requireAdminWriter();
  const id = getFormString(formData, "id");
  const redirectPath = normalizePath(getFormString(formData, "redirectPath"), "/admin/company");
  const companyName = getFormString(formData, "companyName");
  const slug = getFormString(formData, "slug");
  const publishStatus = getPublishStatus(formData);
  let savedRecordId = id;

  if (!companyName || !slug) {
    redirect(buildRedirect(redirectPath, { error: "Company name and slug are required." }));
  }

  try {
    await assertUniqueSlug({
      entityType: "CompanyProfile",
      slug,
      currentId: id || null,
    });
    const previous = id
      ? await db.companyProfile.findUnique({
          where: { id },
          select: { slug: true, publishStatus: true, logoImage: true },
        })
      : null;
    const logoImage = await saveAdminImageUpload(formData.get("logoImageFile"), "company");
    const record = await db.companyProfile.upsert({
      where: id ? { id } : { slug },
      update: {
        companyName,
        slug,
        tagline: getOptionalString(formData, "tagline"),
        summary: getOptionalString(formData, "summary"),
        description: getOptionalString(formData, "description"),
        logoImage: logoImage ?? getOptionalString(formData, "existingLogoImage"),
        logoImageAlt: getOptionalString(formData, "logoImageAlt"),
        email: getOptionalString(formData, "email"),
        phone: getOptionalString(formData, "phone"),
        whatsapp: getOptionalString(formData, "whatsapp"),
        addressLine1: getOptionalString(formData, "addressLine1"),
        addressLine2: getOptionalString(formData, "addressLine2"),
        city: getOptionalString(formData, "city"),
        state: getOptionalString(formData, "state"),
        country: getOptionalString(formData, "country"),
        postalCode: getOptionalString(formData, "postalCode"),
        seoTitle: getOptionalString(formData, "seoTitle"),
        seoDescription: getOptionalString(formData, "seoDescription"),
        seoCanonical: getOptionalString(formData, "seoCanonical"),
        publishStatus,
      },
      create: {
        companyName,
        slug,
        tagline: getOptionalString(formData, "tagline"),
        summary: getOptionalString(formData, "summary"),
        description: getOptionalString(formData, "description"),
        logoImage,
        logoImageAlt: getOptionalString(formData, "logoImageAlt"),
        email: getOptionalString(formData, "email"),
        phone: getOptionalString(formData, "phone"),
        whatsapp: getOptionalString(formData, "whatsapp"),
        addressLine1: getOptionalString(formData, "addressLine1"),
        addressLine2: getOptionalString(formData, "addressLine2"),
        city: getOptionalString(formData, "city"),
        state: getOptionalString(formData, "state"),
        country: getOptionalString(formData, "country"),
        postalCode: getOptionalString(formData, "postalCode"),
        seoTitle: getOptionalString(formData, "seoTitle"),
        seoDescription: getOptionalString(formData, "seoDescription"),
        seoCanonical: getOptionalString(formData, "seoCanonical"),
        publishStatus,
      },
    });

    await createAuditLog({
      action: id ? "update" : "create",
      entityType: "CompanyProfile",
      entityId: record.id,
      actorEmail: session.email,
      details: {
        slug: record.slug,
        previousSlug: previous?.slug ?? null,
        publishStatus: record.publishStatus,
        previousPublishStatus: previous?.publishStatus ?? null,
        uploadChanged: Boolean(logoImage),
      },
    });

    await saveCompanyProfileTranslations(formData, record.id);

    revalidatePublishedSiteShell();
    savedRecordId = record.id;
  } catch (error) {
    const message = getAdminActionErrorMessage(
      error,
      "Unable to save company profile. Please try again.",
    );
    redirect(buildRedirect(redirectPath, { error: message }));
  }

  redirect(buildRedirect(redirectPath, { status: "saved", edit: savedRecordId }));
}

export async function saveProductCategoryAction(formData: FormData) {
  const session = await requireAdminWriter();
  const id = getFormString(formData, "id");
  const redirectPath = normalizePath(getFormString(formData, "redirectPath"), "/admin/categories");
  const name = getFormString(formData, "name");
  const slug = getFormString(formData, "slug");
  const publishStatus = getPublishStatus(formData);

  if (!name || !slug) {
    redirect(buildRedirect(redirectPath, { error: "Category name and slug are required." }));
  }

  await assertUniqueSlug({
    entityType: "ProductCategory",
    slug,
    currentId: id || null,
  });
  const previous = id
    ? await db.productCategory.findUnique({
        where: { id },
        select: { slug: true, publishStatus: true },
      })
    : null;
  const record = id
    ? await db.productCategory.update({
        where: { id },
        data: {
          name,
          slug,
          summary: getOptionalString(formData, "summary"),
          description: getOptionalString(formData, "description"),
          sortOrder: Number.parseInt(getFormString(formData, "sortOrder") || "0", 10) || 0,
          seoTitle: getOptionalString(formData, "seoTitle"),
          seoDescription: getOptionalString(formData, "seoDescription"),
          seoCanonical: getOptionalString(formData, "seoCanonical"),
          publishStatus,
        },
      })
    : await db.productCategory.create({
        data: {
          name,
          slug,
          summary: getOptionalString(formData, "summary"),
          description: getOptionalString(formData, "description"),
          sortOrder: Number.parseInt(getFormString(formData, "sortOrder") || "0", 10) || 0,
          seoTitle: getOptionalString(formData, "seoTitle"),
          seoDescription: getOptionalString(formData, "seoDescription"),
          seoCanonical: getOptionalString(formData, "seoCanonical"),
          publishStatus,
        },
      });

  await createAuditLog({
    action: id ? "update" : "create",
    entityType: "ProductCategory",
    entityId: record.id,
    actorEmail: session.email,
    details: {
      slug: record.slug,
      previousSlug: previous?.slug ?? null,
      publishStatus: record.publishStatus,
      previousPublishStatus: previous?.publishStatus ?? null,
    },
  });

  await saveProductCategoryTranslations(formData, record.id);

  revalidatePublishedEntity({
    entityType: "ProductCategory",
    slug: record.slug,
    previousSlug: previous?.slug ?? null,
  });
  redirect(buildRedirect(redirectPath, { status: "saved", edit: record.id }));
}

export async function deleteProductCategoryAction(formData: FormData) {
  const session = await requireAdminWriter();
  const id = getFormString(formData, "id");
  const redirectPath = normalizePath(getFormString(formData, "redirectPath"), "/admin/categories");

  if (!id) {
    redirect(buildRedirect(redirectPath, { error: "Missing category id." }));
  }

  const previous = await db.productCategory.findUnique({
    where: { id },
    select: { slug: true },
  });
  await db.productCategory.delete({ where: { id } });
  await createAuditLog({
    action: "delete",
    entityType: "ProductCategory",
    entityId: id,
    actorEmail: session.email,
  });

  revalidatePublishedEntity({
    entityType: "ProductCategory",
    previousSlug: previous?.slug ?? null,
  });
  redirect(buildRedirect(redirectPath, { status: "deleted" }));
}

export async function saveProductAction(formData: FormData) {
  const session = await requireAdminWriter();
  const id = getFormString(formData, "id");
  const redirectPath = normalizePath(getFormString(formData, "redirectPath"), "/admin/products");
  const name = getFormString(formData, "name");
  const slug = getFormString(formData, "slug");
  const publishStatus = getPublishStatus(formData);
  let savedRecordId = id;

  if (!name || !slug) {
    redirect(buildRedirect(redirectPath, { error: "Product name and slug are required." }));
  }

  try {
    await assertUniqueSlug({
      entityType: "Product",
      slug,
      currentId: id || null,
    });
    const previous = id
      ? await db.product.findUnique({
          where: { id },
          select: { slug: true, publishStatus: true, heroImage: true },
        })
      : null;
    const heroImage = await saveAdminImageUpload(formData.get("heroImageFile"), "products");
    const record = id
      ? await db.product.update({
          where: { id },
          data: {
            categoryId: getOptionalString(formData, "categoryId"),
            name,
            slug,
            sku: getOptionalString(formData, "sku"),
            summary: getOptionalString(formData, "summary"),
            description: getOptionalString(formData, "description"),
            heroTitle: getOptionalString(formData, "heroTitle"),
            heroImage: heroImage ?? getOptionalString(formData, "existingHeroImage"),
            heroImageAlt: getOptionalString(formData, "heroImageAlt"),
            leadTime: getOptionalString(formData, "leadTime"),
            moq: getOptionalString(formData, "moq"),
            sellingPoints: parseLineList(getFormString(formData, "sellingPoints")),
            specifications: parseSpecificationLines(getFormString(formData, "specifications")),
            seoTitle: getOptionalString(formData, "seoTitle"),
            seoDescription: getOptionalString(formData, "seoDescription"),
            seoCanonical: getOptionalString(formData, "seoCanonical"),
            publishStatus,
          },
        })
      : await db.product.create({
          data: {
            categoryId: getOptionalString(formData, "categoryId"),
            name,
            slug,
            sku: getOptionalString(formData, "sku"),
            summary: getOptionalString(formData, "summary"),
            description: getOptionalString(formData, "description"),
            heroTitle: getOptionalString(formData, "heroTitle"),
            heroImage,
            heroImageAlt: getOptionalString(formData, "heroImageAlt"),
            leadTime: getOptionalString(formData, "leadTime"),
            moq: getOptionalString(formData, "moq"),
            sellingPoints: parseLineList(getFormString(formData, "sellingPoints")),
            specifications: parseSpecificationLines(getFormString(formData, "specifications")),
            seoTitle: getOptionalString(formData, "seoTitle"),
            seoDescription: getOptionalString(formData, "seoDescription"),
            seoCanonical: getOptionalString(formData, "seoCanonical"),
            publishStatus,
          },
        });

    await syncPublishedRedirect({
      entityType: "Product",
      entityId: record.id,
      previousSlug: previous?.slug ?? null,
      nextSlug: record.slug,
      previousStatus: previous?.publishStatus ?? null,
      nextStatus: record.publishStatus,
    });

    await createAuditLog({
      action: id ? "update" : "create",
      entityType: "Product",
      entityId: record.id,
      actorEmail: session.email,
      details: {
        slug: record.slug,
        previousSlug: previous?.slug ?? null,
        publishStatus: record.publishStatus,
        previousPublishStatus: previous?.publishStatus ?? null,
        uploadChanged: Boolean(heroImage),
      },
    });

    await saveProductTranslations(formData, record.id);

    revalidatePublishedEntity({
      entityType: "Product",
      slug: record.slug,
      previousSlug: previous?.slug ?? null,
    });
    savedRecordId = record.id;
  } catch (error) {
    const message = getAdminActionErrorMessage(
      error,
      "Unable to save product. Please try again.",
    );
    redirect(buildRedirect(redirectPath, { error: message }));
  }

  redirect(buildRedirect(redirectPath, { status: "saved", edit: savedRecordId }));
}

export async function deleteProductAction(formData: FormData) {
  const session = await requireAdminWriter();
  const id = getFormString(formData, "id");
  const redirectPath = normalizePath(getFormString(formData, "redirectPath"), "/admin/products");

  if (!id) {
    redirect(buildRedirect(redirectPath, { error: "Missing product id." }));
  }

  const previous = await db.product.findUnique({
    where: { id },
    select: { slug: true },
  });
  await clearEntityRedirects({ entityType: "Product", entityId: id });
  await db.product.delete({ where: { id } });
  await createAuditLog({
    action: "delete",
    entityType: "Product",
    entityId: id,
    actorEmail: session.email,
  });

  revalidatePublishedEntity({
    entityType: "Product",
    previousSlug: previous?.slug ?? null,
  });
  redirect(buildRedirect(redirectPath, { status: "deleted" }));
}

export async function saveIndustryPageAction(formData: FormData) {
  const session = await requireAdminWriter();
  const id = getFormString(formData, "id");
  const redirectPath = normalizePath(getFormString(formData, "redirectPath"), "/admin/industries");
  const title = getFormString(formData, "title");
  const slug = getFormString(formData, "slug");
  const publishStatus = getPublishStatus(formData);
  let savedRecordId = id;

  if (!title || !slug) {
    redirect(buildRedirect(redirectPath, { error: "Industry title and slug are required." }));
  }

  try {
    await assertUniqueSlug({
      entityType: "IndustryPage",
      slug,
      currentId: id || null,
    });
    const previous = id
      ? await db.industryPage.findUnique({
          where: { id },
          select: { slug: true, publishStatus: true, heroImage: true },
        })
      : null;
    const heroImage = await saveAdminImageUpload(formData.get("heroImageFile"), "industries");
    const record = id
      ? await db.industryPage.update({
          where: { id },
          data: {
            title,
            slug,
            summary: getOptionalString(formData, "summary"),
            description: getOptionalString(formData, "description"),
            heroTitle: getOptionalString(formData, "heroTitle"),
            heroImage: heroImage ?? getOptionalString(formData, "existingHeroImage"),
            heroImageAlt: getOptionalString(formData, "heroImageAlt"),
            content: parseContentSections(getFormString(formData, "contentText")),
            seoTitle: getOptionalString(formData, "seoTitle"),
            seoDescription: getOptionalString(formData, "seoDescription"),
            seoCanonical: getOptionalString(formData, "seoCanonical"),
            publishStatus,
          },
        })
      : await db.industryPage.create({
          data: {
            title,
            slug,
            summary: getOptionalString(formData, "summary"),
            description: getOptionalString(formData, "description"),
            heroTitle: getOptionalString(formData, "heroTitle"),
            heroImage,
            heroImageAlt: getOptionalString(formData, "heroImageAlt"),
            content: parseContentSections(getFormString(formData, "contentText")),
            seoTitle: getOptionalString(formData, "seoTitle"),
            seoDescription: getOptionalString(formData, "seoDescription"),
            seoCanonical: getOptionalString(formData, "seoCanonical"),
            publishStatus,
          },
        });

    await syncPublishedRedirect({
      entityType: "IndustryPage",
      entityId: record.id,
      previousSlug: previous?.slug ?? null,
      nextSlug: record.slug,
      previousStatus: previous?.publishStatus ?? null,
      nextStatus: record.publishStatus,
    });

    await createAuditLog({
      action: id ? "update" : "create",
      entityType: "IndustryPage",
      entityId: record.id,
      actorEmail: session.email,
      details: {
        slug: record.slug,
        previousSlug: previous?.slug ?? null,
        publishStatus: record.publishStatus,
        previousPublishStatus: previous?.publishStatus ?? null,
        uploadChanged: Boolean(heroImage),
      },
    });

    await saveIndustryPageTranslations(formData, record.id);

    revalidatePublishedEntity({
      entityType: "IndustryPage",
      slug: record.slug,
      previousSlug: previous?.slug ?? null,
    });
    savedRecordId = record.id;
  } catch (error) {
    const message = getAdminActionErrorMessage(
      error,
      "Unable to save industry page. Please try again.",
    );
    redirect(buildRedirect(redirectPath, { error: message }));
  }

  redirect(buildRedirect(redirectPath, { status: "saved", edit: savedRecordId }));
}

export async function deleteIndustryPageAction(formData: FormData) {
  const session = await requireAdminWriter();
  const id = getFormString(formData, "id");
  const redirectPath = normalizePath(getFormString(formData, "redirectPath"), "/admin/industries");

  if (!id) {
    redirect(buildRedirect(redirectPath, { error: "Missing industry page id." }));
  }

  const previous = await db.industryPage.findUnique({
    where: { id },
    select: { slug: true },
  });
  await clearEntityRedirects({ entityType: "IndustryPage", entityId: id });
  await db.industryPage.delete({ where: { id } });
  await createAuditLog({
    action: "delete",
    entityType: "IndustryPage",
    entityId: id,
    actorEmail: session.email,
  });

  revalidatePublishedEntity({
    entityType: "IndustryPage",
    previousSlug: previous?.slug ?? null,
  });
  redirect(buildRedirect(redirectPath, { status: "deleted" }));
}

export async function saveBlogPostAction(formData: FormData) {
  const session = await requireAdminWriter();
  const id = getFormString(formData, "id");
  const redirectPath = normalizePath(getFormString(formData, "redirectPath"), "/admin/blog");
  const title = getFormString(formData, "title");
  const slug = getFormString(formData, "slug");
  const publishStatus = getPublishStatus(formData);
  let savedRecordId = id;

  if (!title || !slug) {
    redirect(buildRedirect(redirectPath, { error: "Blog title and slug are required." }));
  }

  try {
    await assertUniqueSlug({
      entityType: "BlogPost",
      slug,
      currentId: id || null,
    });
    const previous = id
      ? await db.blogPost.findUnique({
          where: { id },
          select: { slug: true, publishStatus: true, coverImage: true },
        })
      : null;
    const coverImage = await saveAdminImageUpload(formData.get("coverImageFile"), "blog");
    const publishedAtValue = getOptionalString(formData, "publishedAt");
    const record = id
      ? await db.blogPost.update({
          where: { id },
          data: {
            title,
            slug,
            excerpt: getOptionalString(formData, "excerpt"),
            content: parseContentSections(getFormString(formData, "contentText")),
            coverImage: coverImage ?? getOptionalString(formData, "existingCoverImage"),
            coverImageAlt: getOptionalString(formData, "coverImageAlt"),
            publishedAt: publishedAtValue ? new Date(publishedAtValue) : null,
            seoTitle: getOptionalString(formData, "seoTitle"),
            seoDescription: getOptionalString(formData, "seoDescription"),
            seoCanonical: getOptionalString(formData, "seoCanonical"),
            publishStatus,
          },
        })
      : await db.blogPost.create({
          data: {
            title,
            slug,
            excerpt: getOptionalString(formData, "excerpt"),
            content: parseContentSections(getFormString(formData, "contentText")),
            coverImage,
            coverImageAlt: getOptionalString(formData, "coverImageAlt"),
            publishedAt: publishedAtValue ? new Date(publishedAtValue) : null,
            seoTitle: getOptionalString(formData, "seoTitle"),
            seoDescription: getOptionalString(formData, "seoDescription"),
            seoCanonical: getOptionalString(formData, "seoCanonical"),
            publishStatus,
          },
        });

    await syncPublishedRedirect({
      entityType: "BlogPost",
      entityId: record.id,
      previousSlug: previous?.slug ?? null,
      nextSlug: record.slug,
      previousStatus: previous?.publishStatus ?? null,
      nextStatus: record.publishStatus,
    });

    await createAuditLog({
      action: id ? "update" : "create",
      entityType: "BlogPost",
      entityId: record.id,
      actorEmail: session.email,
      details: {
        slug: record.slug,
        previousSlug: previous?.slug ?? null,
        publishStatus: record.publishStatus,
        previousPublishStatus: previous?.publishStatus ?? null,
        uploadChanged: Boolean(coverImage),
      },
    });

    await saveBlogPostTranslations(formData, record.id);

    revalidatePublishedEntity({
      entityType: "BlogPost",
      slug: record.slug,
      previousSlug: previous?.slug ?? null,
    });
    savedRecordId = record.id;
  } catch (error) {
    const message = getAdminActionErrorMessage(
      error,
      "Unable to save blog post. Please try again.",
    );
    redirect(buildRedirect(redirectPath, { error: message }));
  }

  redirect(buildRedirect(redirectPath, { status: "saved", edit: savedRecordId }));
}

export async function deleteBlogPostAction(formData: FormData) {
  const session = await requireAdminWriter();
  const id = getFormString(formData, "id");
  const redirectPath = normalizePath(getFormString(formData, "redirectPath"), "/admin/blog");

  if (!id) {
    redirect(buildRedirect(redirectPath, { error: "Missing blog post id." }));
  }

  const previous = await db.blogPost.findUnique({
    where: { id },
    select: { slug: true },
  });
  await clearEntityRedirects({ entityType: "BlogPost", entityId: id });
  await db.blogPost.delete({ where: { id } });
  await createAuditLog({
    action: "delete",
    entityType: "BlogPost",
    entityId: id,
    actorEmail: session.email,
  });

  revalidatePublishedEntity({
    entityType: "BlogPost",
    previousSlug: previous?.slug ?? null,
  });
  redirect(buildRedirect(redirectPath, { status: "deleted" }));
}

export async function saveFaqAction(formData: FormData) {
  const session = await requireAdminWriter();
  const id = getFormString(formData, "id");
  const redirectPath = normalizePath(getFormString(formData, "redirectPath"), "/admin/faqs");
  const question = getFormString(formData, "question");
  const answer = getFormString(formData, "answer");
  const publishStatus = getPublishStatus(formData);

  if (!question || !answer) {
    redirect(buildRedirect(redirectPath, { error: "Question and answer are required." }));
  }

  const previous = id
    ? await db.fAQ.findUnique({
        where: { id },
        select: {
          publishStatus: true,
          productId: true,
          industryPageId: true,
          blogPostId: true,
        },
      })
    : null;
  const record = id
    ? await db.fAQ.update({
        where: { id },
        data: {
          question,
          answer,
          slug: getOptionalString(formData, "slug"),
          sortOrder: Number.parseInt(getFormString(formData, "sortOrder") || "0", 10) || 0,
          seoTitle: getOptionalString(formData, "seoTitle"),
          seoDescription: getOptionalString(formData, "seoDescription"),
          publishStatus,
          productId: getOptionalString(formData, "productId"),
          industryPageId: getOptionalString(formData, "industryPageId"),
          blogPostId: getOptionalString(formData, "blogPostId"),
        },
      })
    : await db.fAQ.create({
        data: {
          question,
          answer,
          slug: getOptionalString(formData, "slug"),
          sortOrder: Number.parseInt(getFormString(formData, "sortOrder") || "0", 10) || 0,
          seoTitle: getOptionalString(formData, "seoTitle"),
          seoDescription: getOptionalString(formData, "seoDescription"),
          publishStatus,
          productId: getOptionalString(formData, "productId"),
          industryPageId: getOptionalString(formData, "industryPageId"),
          blogPostId: getOptionalString(formData, "blogPostId"),
        },
      });

  await createAuditLog({
    action: id ? "update" : "create",
    entityType: "FAQ",
    entityId: record.id,
    actorEmail: session.email,
    details: {
      publishStatus: record.publishStatus,
      previousPublishStatus: previous?.publishStatus ?? null,
      productId: record.productId,
      industryPageId: record.industryPageId,
      blogPostId: record.blogPostId,
    },
  });

  await saveFaqTranslations(formData, record.id);

  await revalidateFaqTargets({
    productId: record.productId,
    industryPageId: record.industryPageId,
    blogPostId: record.blogPostId,
  });
  await revalidateFaqTargets({
    productId: previous?.productId ?? null,
    industryPageId: previous?.industryPageId ?? null,
    blogPostId: previous?.blogPostId ?? null,
  });
  revalidatePublishedEntity({ entityType: "FAQ" });
  redirect(buildRedirect(redirectPath, { status: "saved", edit: record.id }));
}

export async function deleteFaqAction(formData: FormData) {
  const session = await requireAdminWriter();
  const id = getFormString(formData, "id");
  const redirectPath = normalizePath(getFormString(formData, "redirectPath"), "/admin/faqs");

  if (!id) {
    redirect(buildRedirect(redirectPath, { error: "Missing FAQ id." }));
  }

  const previous = await db.fAQ.findUnique({
    where: { id },
    select: {
      productId: true,
      industryPageId: true,
      blogPostId: true,
    },
  });
  await db.fAQ.delete({ where: { id } });
  await createAuditLog({
    action: "delete",
    entityType: "FAQ",
    entityId: id,
    actorEmail: session.email,
  });

  await revalidateFaqTargets({
    productId: previous?.productId ?? null,
    industryPageId: previous?.industryPageId ?? null,
    blogPostId: previous?.blogPostId ?? null,
  });
  revalidatePublishedEntity({ entityType: "FAQ" });
  redirect(buildRedirect(redirectPath, { status: "deleted" }));
}
