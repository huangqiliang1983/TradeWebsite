import Link from "next/link";

import { db } from "@/lib/db";
import { deleteFaqAction, saveFaqAction } from "@/features/admin/actions";
import { AdminCard } from "@/features/admin/components/AdminCard";
import { AdminField } from "@/features/admin/components/AdminField";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { AdminStatusNotice } from "@/features/admin/components/AdminStatusNotice";
import { AdminTable } from "@/features/admin/components/AdminTable";
import {
  getAdminDictionary,
  getAdminPublishStatusLabel,
  getAdminPublishStatusOptions,
} from "@/features/admin/copy";
import { getAdminLocale } from "@/lib/i18n-server";

type FaqPageProps = {
  searchParams: Promise<{ edit?: string; status?: string; error?: string }>;
};

export default async function AdminFaqPage({ searchParams }: FaqPageProps) {
  const locale = await getAdminLocale();
  const dictionary = getAdminDictionary(locale);
  const publishStatusOptions = getAdminPublishStatusOptions(locale);
  const { edit, status, error } = await searchParams;
  const [faqs, products, industries, posts] = await Promise.all([
    db.fAQ.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: {
        product: true,
        industryPage: true,
        blogPost: true,
      },
    }),
    db.product.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    db.industryPage.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } }),
    db.blogPost.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } }),
  ]);
  const selected = edit ? faqs.find((item) => item.id === edit) ?? null : faqs[0] ?? null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dictionary.faqPage.title}
        description={dictionary.faqPage.description}
      />
      <AdminStatusNotice locale={locale} status={status} error={error} />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard title={dictionary.faqPage.listTitle}>
          <AdminTable
            headers={[
              dictionary.common.question,
              dictionary.faqPage.linkedTo,
              dictionary.common.status,
              dictionary.common.edit,
            ]}
          >
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td className="px-4 py-3">{faq.question}</td>
                <td className="px-4 py-3">
                  {faq.product?.name || faq.industryPage?.title || faq.blogPost?.title || dictionary.common.none}
                </td>
                <td className="px-4 py-3">{getAdminPublishStatusLabel(locale, faq.publishStatus)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/faqs?edit=${faq.id}`} className="text-[var(--foreground)] underline underline-offset-4">
                    {dictionary.common.edit}
                  </Link>
                </td>
              </tr>
            ))}
          </AdminTable>
        </AdminCard>
        <AdminCard title={selected ? dictionary.faqPage.editTitle : dictionary.faqPage.newTitle}>
          <form action={saveFaqAction} className="space-y-4">
            <input type="hidden" name="id" value={selected?.id ?? ""} />
            <input type="hidden" name="redirectPath" value="/admin/faqs" />
            <AdminField label={dictionary.common.question}>
              <input name="question" required defaultValue={selected?.question ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.answer}>
              <textarea name="answer" required defaultValue={selected?.answer ?? ""} className="min-h-28 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <AdminField label={dictionary.common.slug}>
              <input name="slug" defaultValue={selected?.slug ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
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
            <AdminField label={dictionary.common.product}>
              <select name="productId" defaultValue={selected?.productId ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4">
                <option value="">{dictionary.common.none}</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label={dictionary.faqPage.industryPage}>
              <select name="industryPageId" defaultValue={selected?.industryPageId ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4">
                <option value="">{dictionary.common.none}</option>
                {industries.map((industry) => (
                  <option key={industry.id} value={industry.id}>{industry.title}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label={dictionary.faqPage.blogPost}>
              <select name="blogPostId" defaultValue={selected?.blogPostId ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4">
                <option value="">{dictionary.common.none}</option>
                {posts.map((post) => (
                  <option key={post.id} value={post.id}>{post.title}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label={dictionary.common.seoTitle}>
              <input name="seoTitle" defaultValue={selected?.seoTitle ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.seoDescription}>
              <textarea name="seoDescription" defaultValue={selected?.seoDescription ?? ""} className="min-h-24 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 text-sm font-medium text-white">
              {dictionary.faqPage.save}
            </button>
          </form>
          {selected ? (
            <form action={deleteFaqAction} className="mt-3">
              <input type="hidden" name="id" value={selected.id} />
              <input type="hidden" name="redirectPath" value="/admin/faqs" />
              <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-red-200 bg-red-50 px-5 text-sm font-medium text-red-700">
                {dictionary.faqPage.delete}
              </button>
            </form>
          ) : null}
        </AdminCard>
      </div>
    </div>
  );
}
