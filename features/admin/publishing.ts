"use server";

import { db } from "@/lib/db";

type SlugEntity =
  | "CompanyProfile"
  | "ProductCategory"
  | "Product"
  | "IndustryPage"
  | "BlogPost";

type RedirectEntity = "Product" | "IndustryPage" | "BlogPost";

function isMissingRedirectTableError(error: unknown) {
  return (
    error instanceof Error &&
    ("code" in error
      ? (error as Error & { code?: string }).code === "P2021"
      : false)
  );
}

function getEntityPublicPath(
  entityType: RedirectEntity,
  slug: string,
) {
  switch (entityType) {
    case "Product":
      return `/products/${slug}`;
    case "IndustryPage":
      return `/industries/${slug}`;
    case "BlogPost":
      return `/blog/${slug}`;
  }
}

export async function assertUniqueSlug({
  entityType,
  slug,
  currentId,
}: {
  entityType: SlugEntity;
  slug: string;
  currentId?: string | null;
}) {
  const existing =
    entityType === "CompanyProfile"
      ? await db.companyProfile.findUnique({
          where: { slug },
          select: { id: true },
        })
      : entityType === "ProductCategory"
        ? await db.productCategory.findUnique({
            where: { slug },
            select: { id: true },
          })
        : entityType === "Product"
          ? await db.product.findUnique({
              where: { slug },
              select: { id: true },
            })
          : entityType === "IndustryPage"
            ? await db.industryPage.findUnique({
                where: { slug },
                select: { id: true },
              })
            : await db.blogPost.findUnique({
                where: { slug },
                select: { id: true },
              });

  if (existing && existing.id !== currentId) {
    throw new Error("This slug is already in use. Please choose a unique slug.");
  }
}

export async function syncPublishedRedirect({
  entityType,
  entityId,
  previousSlug,
  nextSlug,
  previousStatus,
  nextStatus,
}: {
  entityType: RedirectEntity;
  entityId: string;
  previousSlug?: string | null;
  nextSlug: string;
  previousStatus?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | null;
  nextStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}) {
  const currentPath = getEntityPublicPath(entityType, nextSlug);

  if (nextStatus !== "PUBLISHED") {
    try {
      await db.urlRedirect.deleteMany({
        where: {
          entityType,
          entityId,
        },
      });
    } catch (error) {
      if (!isMissingRedirectTableError(error)) {
        throw error;
      }
    }
    return;
  }

  try {
    await db.urlRedirect.updateMany({
      where: {
        entityType,
        entityId,
      },
      data: {
        destinationPath: currentPath,
        statusCode: 301,
      },
    });

    if (
      previousSlug &&
      previousSlug !== nextSlug &&
      previousStatus === "PUBLISHED"
    ) {
      await db.urlRedirect.upsert({
        where: {
          sourcePath: getEntityPublicPath(entityType, previousSlug),
        },
        update: {
          destinationPath: currentPath,
          statusCode: 301,
          entityType,
          entityId,
        },
        create: {
          sourcePath: getEntityPublicPath(entityType, previousSlug),
          destinationPath: currentPath,
          statusCode: 301,
          entityType,
          entityId,
        },
      });
    }
  } catch (error) {
    if (!isMissingRedirectTableError(error)) {
      throw error;
    }
  }
}

export async function clearEntityRedirects({
  entityType,
  entityId,
}: {
  entityType: RedirectEntity;
  entityId: string;
}) {
  try {
    await db.urlRedirect.deleteMany({
      where: {
        entityType,
        entityId,
      },
    });
  } catch (error) {
    if (!isMissingRedirectTableError(error)) {
      throw error;
    }
  }
}
