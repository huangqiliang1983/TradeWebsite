import Link from "next/link";

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

export default async function AdminDashboardPage() {
  const locale = await getAdminLocale();
  const dictionary = getAdminDictionary(locale);
  const [companyCount, categoryCount, productCount, industryCount, blogCount, faqCount, inquiryCount, latestInquiries] =
    await Promise.all([
      db.companyProfile.count(),
      db.productCategory.count(),
      db.product.count(),
      db.industryPage.count(),
      db.blogPost.count(),
      db.fAQ.count(),
      db.inquiry.count(),
      db.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          inquiryType: true,
          name: true,
          email: true,
          sourcePage: true,
          createdAt: true,
        },
      }),
    ]);

  const stats = [
    { label: dictionary.dashboard.stats.company, value: companyCount, href: "/admin/company" },
    { label: dictionary.dashboard.stats.categories, value: categoryCount, href: "/admin/categories" },
    { label: dictionary.dashboard.stats.products, value: productCount, href: "/admin/products" },
    { label: dictionary.dashboard.stats.industries, value: industryCount, href: "/admin/industries" },
    { label: dictionary.dashboard.stats.blog, value: blogCount, href: "/admin/blog" },
    { label: dictionary.dashboard.stats.faqs, value: faqCount, href: "/admin/faqs" },
    { label: dictionary.dashboard.stats.inquiries, value: inquiryCount, href: "/admin/inquiries" },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dictionary.dashboard.title}
        description={dictionary.dashboard.description}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <AdminCard key={stat.label}>
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
              {stat.label}
            </p>
            <p className="mt-3 text-4xl">{stat.value}</p>
            <Link
              href={stat.href}
              className="mt-4 inline-flex text-sm font-medium text-[var(--foreground)] underline underline-offset-4"
            >
              {dictionary.common.manage}
            </Link>
          </AdminCard>
        ))}
      </div>

      <AdminCard
        title={dictionary.dashboard.latestInquiries}
        description={dictionary.dashboard.latestInquiriesDescription}
      >
        <AdminTable
          headers={[
            dictionary.common.type,
            dictionary.common.name,
            dictionary.common.email,
            dictionary.common.source,
            dictionary.common.created,
          ]}
        >
          {latestInquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td className="px-4 py-3">
                {getAdminInquiryTypeLabel(locale, inquiry.inquiryType)}
              </td>
              <td className="px-4 py-3">{inquiry.name}</td>
              <td className="px-4 py-3">{inquiry.email}</td>
              <td className="px-4 py-3">{inquiry.sourcePage}</td>
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
