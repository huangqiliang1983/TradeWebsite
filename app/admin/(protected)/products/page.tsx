import Link from "next/link";

import { db } from "@/lib/db";
import {
  deleteProductAction,
  saveProductAction,
} from "@/features/admin/actions";
import { AdminCard } from "@/features/admin/components/AdminCard";
import { AdminField } from "@/features/admin/components/AdminField";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { AdminStatusNotice } from "@/features/admin/components/AdminStatusNotice";
import { AdminTable } from "@/features/admin/components/AdminTable";
import { AdminTranslationFields } from "@/features/admin/components/AdminTranslationFields";
import {
  getAdminDictionary,
  getAdminPublishStatusLabel,
  getAdminPublishStatusOptions,
} from "@/features/admin/copy";
import {
  stringifyLineList,
  stringifySpecificationLines,
} from "@/features/admin/utils";
import { getAdminLocale } from "@/lib/i18n-server";

type ProductsPageProps = {
  searchParams: Promise<{ edit?: string; status?: string; error?: string }>;
};

export default async function AdminProductsPage({ searchParams }: ProductsPageProps) {
  const locale = await getAdminLocale();
  const dictionary = getAdminDictionary(locale);
  const publishStatusOptions = getAdminPublishStatusOptions(locale);
  const { edit, status, error } = await searchParams;
  const [products, categories] = await Promise.all([
    db.product.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        category: true,
        translations: { orderBy: { locale: "asc" } },
      },
    }),
    db.productCategory.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
  ]);
  const selected = edit ? products.find((item) => item.id === edit) ?? null : products[0] ?? null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dictionary.productsPage.title}
        description={dictionary.productsPage.description}
      />
      <AdminStatusNotice locale={locale} status={status} error={error} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard title={dictionary.productsPage.listTitle}>
          <AdminTable
            headers={[
              dictionary.common.name,
              dictionary.common.category,
              dictionary.common.status,
              dictionary.common.slug,
              dictionary.common.edit,
            ]}
          >
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.category?.name ?? dictionary.common.uncategorized}</td>
                <td className="px-4 py-3">{getAdminPublishStatusLabel(locale, product.publishStatus)}</td>
                <td className="px-4 py-3">{product.slug}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/products?edit=${product.id}`} className="text-[var(--foreground)] underline underline-offset-4">
                    {dictionary.common.edit}
                  </Link>
                </td>
              </tr>
            ))}
          </AdminTable>
        </AdminCard>

        <AdminCard title={selected ? dictionary.productsPage.editTitle : dictionary.productsPage.newTitle}>
          <form action={saveProductAction} encType="multipart/form-data" className="space-y-4">
            <input type="hidden" name="id" value={selected?.id ?? ""} />
            <input type="hidden" name="redirectPath" value="/admin/products" />
            <input type="hidden" name="existingHeroImage" value={selected?.heroImage ?? ""} />
            <AdminField label={dictionary.common.name}>
              <input name="name" required defaultValue={selected?.name ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.slug}>
              <input name="slug" required defaultValue={selected?.slug ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.category}>
              <select name="categoryId" defaultValue={selected?.categoryId ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4">
                <option value="">{dictionary.common.uncategorized}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label={dictionary.common.publishStatus}>
              <select name="publishStatus" defaultValue={selected?.publishStatus ?? "DRAFT"} className="min-h-11 rounded-2xl border border-[var(--line)] px-4">
                {publishStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label={dictionary.productsPage.sku}>
              <input name="sku" defaultValue={selected?.sku ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.productsPage.moq}>
              <input name="moq" defaultValue={selected?.moq ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.productsPage.leadTime}>
              <input name="leadTime" defaultValue={selected?.leadTime ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.productsPage.heroTitle}>
              <input name="heroTitle" defaultValue={selected?.heroTitle ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.summary}>
              <textarea name="summary" defaultValue={selected?.summary ?? ""} className="min-h-24 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <AdminField label={dictionary.common.descriptionField}>
              <textarea name="description" defaultValue={selected?.description ?? ""} className="min-h-28 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <AdminField label={dictionary.productsPage.productImage}>
              <input name="heroImageFile" type="file" accept=".jpg,.jpeg,.png,.webp" className="min-h-11 rounded-2xl border border-[var(--line)] px-4 py-2" />
            </AdminField>
            <AdminField label={dictionary.common.imageAlt}>
              <input name="heroImageAlt" defaultValue={selected?.heroImageAlt ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.productsPage.sellingPoints} hint={dictionary.productsPage.sellingPointsHint}>
              <textarea name="sellingPoints" defaultValue={stringifyLineList(selected?.sellingPoints)} className="min-h-28 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <AdminField label={dictionary.productsPage.specifications} hint={dictionary.productsPage.specificationsHint}>
              <textarea name="specifications" defaultValue={stringifySpecificationLines(selected?.specifications)} className="min-h-28 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <AdminField label={dictionary.common.seoTitle}>
              <input name="seoTitle" defaultValue={selected?.seoTitle ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.seoCanonical}>
              <input name="seoCanonical" defaultValue={selected?.seoCanonical ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.seoDescription}>
              <textarea name="seoDescription" defaultValue={selected?.seoDescription ?? ""} className="min-h-24 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <AdminTranslationFields
              title={dictionary.common.translations}
              description={dictionary.common.translationsDescription}
              translations={selected?.translations}
              fields={[
                { name: "name", label: dictionary.common.name },
                { name: "heroTitle", label: dictionary.productsPage.heroTitle },
                { name: "summary", label: dictionary.common.summary, kind: "textarea" },
                { name: "description", label: dictionary.common.descriptionField, kind: "textarea" },
                { name: "heroImageAlt", label: dictionary.common.imageAlt },
                {
                  name: "sellingPoints",
                  label: dictionary.productsPage.sellingPoints,
                  kind: "lines",
                  hint: dictionary.productsPage.sellingPointsHint,
                },
                {
                  name: "specifications",
                  label: dictionary.productsPage.specifications,
                  kind: "specifications",
                  hint: dictionary.productsPage.specificationsHint,
                },
                { name: "seoTitle", label: dictionary.common.seoTitle },
                { name: "seoDescription", label: dictionary.common.seoDescription, kind: "textarea" },
              ]}
            />
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 text-sm font-medium text-white">
              {dictionary.productsPage.save}
            </button>
          </form>
          {selected ? (
            <form action={deleteProductAction} className="mt-3">
              <input type="hidden" name="id" value={selected.id} />
              <input type="hidden" name="redirectPath" value="/admin/products" />
              <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-red-200 bg-red-50 px-5 text-sm font-medium text-red-700">
                {dictionary.productsPage.delete}
              </button>
            </form>
          ) : null}
        </AdminCard>
      </div>
    </div>
  );
}
