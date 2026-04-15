import Link from "next/link";

import { db } from "@/lib/db";
import { deleteBlogPostAction, saveBlogPostAction } from "@/features/admin/actions";
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
import { stringifyContentSections } from "@/features/admin/utils";
import { formatLocalizedDate } from "@/lib/i18n";
import { getAdminLocale } from "@/lib/i18n-server";

type BlogPageProps = {
  searchParams: Promise<{ edit?: string; status?: string; error?: string }>;
};

export default async function AdminBlogPage({ searchParams }: BlogPageProps) {
  const locale = await getAdminLocale();
  const dictionary = getAdminDictionary(locale);
  const publishStatusOptions = getAdminPublishStatusOptions(locale);
  const { edit, status, error } = await searchParams;
  const posts = await db.blogPost.findMany({ orderBy: [{ publishedAt: "desc" }, { createdAt: "asc" }] });
  const selected = edit ? posts.find((item) => item.id === edit) ?? null : posts[0] ?? null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dictionary.blogPage.title}
        description={dictionary.blogPage.description}
      />
      <AdminStatusNotice locale={locale} status={status} error={error} />
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <AdminCard title={dictionary.blogPage.listTitle}>
          <AdminTable
            headers={[
              dictionary.common.title,
              dictionary.common.status,
              dictionary.blogPage.publishedDate,
              dictionary.common.edit,
            ]}
          >
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-3">{post.title}</td>
                <td className="px-4 py-3">{getAdminPublishStatusLabel(locale, post.publishStatus)}</td>
                <td className="px-4 py-3">
                  {post.publishedAt ? formatLocalizedDate(locale, post.publishedAt.toISOString()) : dictionary.common.none}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/blog?edit=${post.id}`} className="text-[var(--foreground)] underline underline-offset-4">
                    {dictionary.common.edit}
                  </Link>
                </td>
              </tr>
            ))}
          </AdminTable>
        </AdminCard>
        <AdminCard title={selected ? dictionary.blogPage.editTitle : dictionary.blogPage.newTitle}>
          <form action={saveBlogPostAction} encType="multipart/form-data" className="space-y-4">
            <input type="hidden" name="id" value={selected?.id ?? ""} />
            <input type="hidden" name="redirectPath" value="/admin/blog" />
            <input type="hidden" name="existingCoverImage" value={selected?.coverImage ?? ""} />
            <AdminField label={dictionary.common.title}>
              <input name="title" required defaultValue={selected?.title ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.common.slug}>
              <input name="slug" required defaultValue={selected?.slug ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.blogPage.excerpt}>
              <textarea name="excerpt" defaultValue={selected?.excerpt ?? ""} className="min-h-24 rounded-2xl border border-[var(--line)] px-4 py-3" />
            </AdminField>
            <AdminField label={dictionary.common.publishStatus}>
              <select name="publishStatus" defaultValue={selected?.publishStatus ?? "DRAFT"} className="min-h-11 rounded-2xl border border-[var(--line)] px-4">
                {publishStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label={dictionary.blogPage.publishedDate}>
              <input name="publishedAt" type="date" defaultValue={selected?.publishedAt ? selected.publishedAt.toISOString().slice(0, 10) : ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.blogPage.coverImage}>
              <input name="coverImageFile" type="file" accept=".jpg,.jpeg,.png,.webp" className="min-h-11 rounded-2xl border border-[var(--line)] px-4 py-2" />
            </AdminField>
            <AdminField label={dictionary.blogPage.coverImageAlt}>
              <input name="coverImageAlt" defaultValue={selected?.coverImageAlt ?? ""} className="min-h-11 rounded-2xl border border-[var(--line)] px-4" />
            </AdminField>
            <AdminField label={dictionary.blogPage.content}>
              <textarea name="contentText" defaultValue={stringifyContentSections(selected?.content)} className="min-h-44 rounded-2xl border border-[var(--line)] px-4 py-3" />
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
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 text-sm font-medium text-white">
              {dictionary.blogPage.save}
            </button>
          </form>
          {selected ? (
            <form action={deleteBlogPostAction} className="mt-3">
              <input type="hidden" name="id" value={selected.id} />
              <input type="hidden" name="redirectPath" value="/admin/blog" />
              <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-red-200 bg-red-50 px-5 text-sm font-medium text-red-700">
                {dictionary.blogPage.delete}
              </button>
            </form>
          ) : null}
        </AdminCard>
      </div>
    </div>
  );
}
