import Link from "next/link";

import { db } from "@/lib/db";
import {
  deleteIndustryPageAction,
  saveIndustryPageAction,
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
import { stringifyContentSections } from "@/features/admin/utils";
import { getAdminLocale } from "@/lib/i18n-server";

type IndustriesPageProps = {
  searchParams: Promise<{ edit?: string; status?: string; error?: string }>;
};

export default async function AdminIndustriesPage({
  searchParams,
}: IndustriesPageProps) {
  const locale = await getAdminLocale();
  const dictionary = getAdminDictionary(locale);
  const publishStatusOptions = getAdminPublishStatusOptions(locale);
  const { edit, status, error } = await searchParams;
  const industries = await db.industryPage.findMany({
    orderBy: { createdAt: "asc" },
    include: { translations: { orderBy: { locale: "asc" } } },
  });
  const selected = edit ? industries.find((item) => item.id === edit) ?? null : industries[0] ?? null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dictionary.industriesPage.title}
        description={dictionary.industriesPage.description}
      />
      <AdminStatusNotice locale={locale} status={status} error={error} />
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <AdminCard title={dictionary.industriesPage.listTitle}>
          <AdminTable
            headers={[
              dictionary.common.title,
              dictionary.common.slug,
              dictionary.common.status,
              dictionary.common.edit,
            ]}
          >
            {industries.map((industry) => (
              <tr key={industry.id}>
                <td className="px-4 py-3">{industry.title}</td>
                <td className="px-4 py-3">{industry.slug}</td>
                <td className="px-4 py-3">{getAdminPublishStatusLabel(locale, industry.publishStatus)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/industries?edit=${industry.id}`} className="text-[var(--foreground)] underline underline-offset-4">
                    {dictionary.common.edit}
                  </Link>
                </td>
              </tr>
            ))}
          </AdminTable>
        </AdminCard>
        <AdminCard title={selected ? dictionary.industriesPage.editTitle : dictionary.industriesPage.newTitle}>
          <form action={saveIndustryPageAction} encType="multipart/form-data" className="space-y-4">
            <input type="hidden" name="id" value={selected?.id ?? ""} />
            <input type="hidden" name="redirectPath" value="/admin/industries" />
            <input type="hidden" name="existingHeroImage" value={selected?.heroImage ?? ""} />
            <AdminField label={dictionary.common.title}>
              <input name="title" required defaultValue={selected?.title ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.slug}>
              <input name="slug" required defaultValue={selected?.slug ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.industriesPage.heroTitle}>
              <input name="heroTitle" defaultValue={selected?.heroTitle ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.publishStatus}>
              <select name="publishStatus" defaultValue={selected?.publishStatus ?? "DRAFT"} className="min-h-11 rounded-2xl border border-[var(--line)] px-4">
                {publishStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label={dictionary.common.summary}>
              <textarea name="summary" defaultValue={selected?.summary ?? ""} className="min-h-24 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <AdminField label={dictionary.common.descriptionField}>
              <textarea name="description" defaultValue={selected?.description ?? ""} className="min-h-28 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <AdminField label={dictionary.industriesPage.heroImage}>
              <input name="heroImageFile" type="file" accept=".jpg,.jpeg,.png,.webp" className="min-h-11 rounded-2xl border border-[var(--line)] px-4 py-2" />
            </AdminField>
            <AdminField label={dictionary.common.imageAlt}>
              <input name="heroImageAlt" defaultValue={selected?.heroImageAlt ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.industriesPage.content} hint={dictionary.industriesPage.contentHint}>
              <textarea name="contentText" defaultValue={stringifyContentSections(selected?.content)} className="min-h-40 rounded-2xl border border-[var(--line)] px-4 py-3" />
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
                { name: "title", label: dictionary.common.title },
                { name: "heroTitle", label: dictionary.industriesPage.heroTitle },
                { name: "summary", label: dictionary.common.summary, kind: "textarea" },
                { name: "description", label: dictionary.common.descriptionField, kind: "textarea" },
                { name: "heroImageAlt", label: dictionary.common.imageAlt },
                {
                  name: "contentText",
                  sourceName: "content",
                  label: dictionary.industriesPage.content,
                  kind: "content",
                  hint: dictionary.industriesPage.contentHint,
                },
                { name: "seoTitle", label: dictionary.common.seoTitle },
                { name: "seoDescription", label: dictionary.common.seoDescription, kind: "textarea" },
              ]}
            />
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 text-sm font-medium text-white">
              {dictionary.industriesPage.save}
            </button>
          </form>
          {selected ? (
            <form action={deleteIndustryPageAction} className="mt-3">
              <input type="hidden" name="id" value={selected.id} />
              <input type="hidden" name="redirectPath" value="/admin/industries" />
              <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-red-200 bg-red-50 px-5 text-sm font-medium text-red-700">
                {dictionary.industriesPage.delete}
              </button>
            </form>
          ) : null}
        </AdminCard>
      </div>
    </div>
  );
}
