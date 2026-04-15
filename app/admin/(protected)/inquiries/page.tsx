import { db } from "@/lib/db";
import { AdminCard } from "@/features/admin/components/AdminCard";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { AdminTable } from "@/features/admin/components/AdminTable";
import {
  getAdminDictionary,
  getAdminInquiryTypeLabel,
} from "@/features/admin/copy";
import { formatLocalizedDate } from "@/lib/i18n";
import { getAdminLocale } from "@/lib/i18n-server";

export default async function AdminInquiriesPage() {
  const locale = await getAdminLocale();
  const dictionary = getAdminDictionary(locale);
  const inquiries = await db.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      product: {
        select: { name: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dictionary.inquiriesPage.title}
        description={dictionary.inquiriesPage.description}
      />
      <AdminCard title={dictionary.inquiriesPage.cardTitle}>
        <AdminTable
          headers={[
            dictionary.common.type,
            dictionary.common.name,
            dictionary.common.email,
            dictionary.common.company,
            dictionary.common.source,
            dictionary.common.product,
            dictionary.inquiriesPage.utm,
            dictionary.common.created,
          ]}
        >
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td className="px-4 py-3">
                {getAdminInquiryTypeLabel(locale, inquiry.inquiryType)}
              </td>
              <td className="px-4 py-3">{inquiry.name}</td>
              <td className="px-4 py-3">{inquiry.email}</td>
              <td className="px-4 py-3">{inquiry.company ?? dictionary.common.none}</td>
              <td className="px-4 py-3">{inquiry.sourcePage}</td>
              <td className="px-4 py-3">{inquiry.sourceProduct ?? inquiry.product?.name ?? dictionary.common.none}</td>
              <td className="px-4 py-3">{inquiry.utmSource ?? dictionary.common.none}</td>
              <td className="px-4 py-3">
                {formatLocalizedDate(locale, inquiry.createdAt.toISOString())}
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>
    </div>
  );
}
