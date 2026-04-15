import Link from "next/link";

import { db } from "@/lib/db";
import {
  deleteProductCategoryAction,
  saveProductCategoryAction,
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
import { getAdminLocale } from "@/lib/i18n-server";

type CategoriesPageProps = {
  searchParams: Promise<{ edit?: string; status?: string; error?: string }>;
};

export default async function AdminCategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const locale = await getAdminLocale();
  const dictionary = getAdminDictionary(locale);
  const publishStatusOptions = getAdminPublishStatusOptions(locale);
  const { edit, status, error } = await searchParams;
  const categories = await db.productCategory.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: { translations: { orderBy: { locale: "asc" } } },
  });
  const selected = edit
    ? categories.find((item) => item.id === edit) ?? null
    : categories[0] ?? null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dictionary.categoriesPage.title}
        description={dictionary.categoriesPage.description}
      />
      <AdminStatusNotice locale={locale} status={status} error={error} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard title={dictionary.categoriesPage.listTitle}>
          <AdminTable headers={[dictionary.common.name, dictionary.common.slug, dictionary.common.status, dictionary.categoriesPage.sort, dictionary.common.edit]}>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-3">{category.name}</td>
                <td className="px-4 py-3">{category.slug}</td>
                <td className="px-4 py-3">{getAdminPublishStatusLabel(locale, category.publishStatus)}</td>
                <td className="px-4 py-3">{category.sortOrder}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/categories?edit=${category.id}`}
                    className="text-[var(--foreground)] underline underline-offset-4"
                  >
                    {dictionary.common.edit}
                  </Link>
                </td>
              </tr>
            ))}
          </AdminTable>
        </AdminCard>

        <AdminCard title={selected ? dictionary.categoriesPage.editTitle : dictionary.categoriesPage.newTitle}>
          <form action={saveProductCategoryAction} className="space-y-4">
            <input type="hidden" name="id" value={selected?.id ?? ""} />
            <input type="hidden" name="redirectPath" value="/admin/categories" />
            <AdminField label={dictionary.common.name}>
              <input name="name" required defaultValue={selected?.name ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.slug}>
              <input name="slug" required defaultValue={selected?.slug ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.summary}>
              <textarea name="summary" defaultValue={selected?.summary ?? ""} className="min-h-24 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <AdminField label={dictionary.common.descriptionField}>
              <textarea name="description" defaultValue={selected?.description ?? ""} className="min-h-28 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <AdminField label={dictionary.common.sortOrder}>
              <input name="sortOrder" type="number" defaultValue={selected?.sortOrder ?? 0} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.publishStatus}>
              <select name="publishStatus" defaultValue={selected?.publishStatus ?? "DRAFT"} className="min-h-11 rounded-2xl border border-[var(--line)] px-4">
                {publishStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
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
                { name: "summary", label: dictionary.common.summary, kind: "textarea" },
                { name: "description", label: dictionary.common.descriptionField, kind: "textarea" },
                { name: "seoTitle", label: dictionary.common.seoTitle },
                { name: "seoDescription", label: dictionary.common.seoDescription, kind: "textarea" },
              ]}
            />
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 text-sm font-medium text-white">
              {dictionary.categoriesPage.save}
            </button>
          </form>
          {selected ? (
            <form action={deleteProductCategoryAction} className="mt-3">
              <input type="hidden" name="id" value={selected.id} />
              <input type="hidden" name="redirectPath" value="/admin/categories" />
              <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-red-200 bg-red-50 px-5 text-sm font-medium text-red-700">
                {dictionary.categoriesPage.delete}
              </button>
            </form>
          ) : null}
        </AdminCard>
      </div>
    </div>
  );
}
