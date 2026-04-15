import { db } from "@/lib/db";
import { saveCompanyProfileAction } from "@/features/admin/actions";
import { AdminCard } from "@/features/admin/components/AdminCard";
import { AdminField } from "@/features/admin/components/AdminField";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { AdminStatusNotice } from "@/features/admin/components/AdminStatusNotice";
import { getAdminDictionary, getAdminPublishStatusOptions } from "@/features/admin/copy";
import { getAdminLocale } from "@/lib/i18n-server";

type CompanyPageProps = {
  searchParams: Promise<{ status?: string; error?: string }>;
};

export default async function AdminCompanyPage({ searchParams }: CompanyPageProps) {
  const locale = await getAdminLocale();
  const dictionary = getAdminDictionary(locale);
  const publishStatusOptions = getAdminPublishStatusOptions(locale);
  const [{ status, error }, company] = await Promise.all([
    searchParams,
    db.companyProfile.findFirst({ orderBy: { createdAt: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dictionary.companyPage.title}
        description={dictionary.companyPage.description}
      />
      <AdminStatusNotice locale={locale} status={status} error={error} />

      <AdminCard title={dictionary.companyPage.cardTitle}>
        <form action={saveCompanyProfileAction} encType="multipart/form-data" className="grid gap-4 lg:grid-cols-2">
          <input type="hidden" name="id" value={company?.id ?? ""} />
          <input type="hidden" name="redirectPath" value="/admin/company" />
          <input type="hidden" name="existingLogoImage" value={company?.logoImage ?? ""} />

          <AdminField label={dictionary.companyPage.companyName}>
            <input name="companyName" required defaultValue={company?.companyName ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.common.slug}>
            <input name="slug" required defaultValue={company?.slug ?? "company-profile"} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.companyPage.tagline}>
            <input name="tagline" defaultValue={company?.tagline ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.common.publishStatus}>
            <select name="publishStatus" defaultValue={company?.publishStatus ?? "DRAFT"} className="min-h-11 rounded-2xl border border-[var(--line)] px-4">
              {publishStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </AdminField>
          <div className="lg:col-span-2">
            <AdminField label={dictionary.common.summary}>
              <textarea name="summary" defaultValue={company?.summary ?? ""} className="min-h-24 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
          </div>
          <div className="lg:col-span-2">
            <AdminField label={dictionary.common.descriptionField}>
              <textarea name="description" defaultValue={company?.description ?? ""} className="min-h-32 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
          </div>
          <AdminField label={dictionary.companyPage.companyImage} hint={dictionary.companyPage.companyImageHint}>
            <input name="logoImageFile" type="file" accept=".jpg,.jpeg,.png,.webp" className="min-h-11 rounded-2xl border border-[var(--line)] px-4 py-2" />
          </AdminField>
          <AdminField label={dictionary.common.imageAlt}>
            <input name="logoImageAlt" defaultValue={company?.logoImageAlt ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.common.email}>
            <input name="email" type="email" defaultValue={company?.email ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.common.phone}>
            <input name="phone" defaultValue={company?.phone ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.companyPage.whatsapp}>
            <input name="whatsapp" defaultValue={company?.whatsapp ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.companyPage.addressLine1}>
            <input name="addressLine1" defaultValue={company?.addressLine1 ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.companyPage.addressLine2}>
            <input name="addressLine2" defaultValue={company?.addressLine2 ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.companyPage.city}>
            <input name="city" defaultValue={company?.city ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.companyPage.state}>
            <input name="state" defaultValue={company?.state ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.companyPage.country}>
            <input name="country" defaultValue={company?.country ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.companyPage.postalCode}>
            <input name="postalCode" defaultValue={company?.postalCode ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.common.seoTitle}>
            <input name="seoTitle" defaultValue={company?.seoTitle ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <AdminField label={dictionary.common.seoCanonical}>
            <input name="seoCanonical" defaultValue={company?.seoCanonical ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
          </AdminField>
          <div className="lg:col-span-2">
            <AdminField label={dictionary.common.seoDescription}>
              <textarea name="seoDescription" defaultValue={company?.seoDescription ?? ""} className="min-h-24 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
          </div>
          <div className="lg:col-span-2">
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 text-sm font-medium text-white">
              {dictionary.companyPage.save}
            </button>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
