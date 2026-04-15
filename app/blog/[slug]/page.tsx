import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { StructuredData } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTAGroup } from "@/features/marketing/components/CTAGroup";
import { Breadcrumbs } from "@/features/marketing/components/Breadcrumbs";
import { IllustrationPanel } from "@/features/marketing/components/IllustrationPanel";
import { PageHero } from "@/features/marketing/components/PageHero";
import { SectionHeading } from "@/features/marketing/components/SectionHeading";
import { ArticleSections } from "@/features/marketing/components/ArticleSections";
import { getMarketingDictionary } from "@/features/marketing/copy";
import { getHomeLabel } from "@/features/marketing/localized-text";
import {
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
  getRedirectForPath,
} from "@/features/marketing/public-content";
import { localizeBlogPost } from "@/features/marketing/translations";
import { formatLocalizedDate, withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  const localizedPost = post ? localizeBlogPost(locale, post) : null;

  if (!localizedPost) {
    return buildPageMetadata({
      title: dictionary.blogDetail.notFound,
      description: dictionary.blogDetail.notFoundDescription,
      path: "/blog",
      locale,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: localizedPost.seoTitle ?? localizedPost.title,
    description: localizedPost.seoDescription ?? localizedPost.summary,
    path: `/blog/${localizedPost.slug}`,
    locale,
    canonicalUrl: locale === "en" ? localizedPost.seoCanonical ?? undefined : undefined,
    type: "article",
    keywords: [localizedPost.category, localizedPost.title, "B2B SEO article"],
  });
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const homeHref = withLocalePath(locale, "/");
  const blogHref = withLocalePath(locale, "/blog");
  const homeLabel = getHomeLabel(locale);
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPublishedBlogPostBySlug(slug),
    getPublishedBlogPosts(),
  ]);

  if (!post) {
    const redirectEntry = await getRedirectForPath(`/blog/${slug}`);

    if (redirectEntry?.statusCode === 301) {
      permanentRedirect(
        redirectEntry.destinationPath.startsWith("/")
          ? withLocalePath(locale, redirectEntry.destinationPath)
          : redirectEntry.destinationPath,
      );
    }

    notFound();
  }
  const localizedPost = localizeBlogPost(locale, post);

  const relatedPosts = allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => localizeBlogPost(locale, candidate))
    .slice(0, 2);

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: homeLabel, path: homeHref },
          { name: dictionary.blog.eyebrow, path: blogHref },
          { name: localizedPost.title, path: withLocalePath(locale, `/blog/${localizedPost.slug}`) },
        ])}
      />
      <StructuredData
        data={articleSchema({
          title: localizedPost.title,
          slug: localizedPost.slug,
          description: localizedPost.summary,
          image: localizedPost.image,
          publishedAt: localizedPost.publishedAt,
          updatedAt: localizedPost.updatedAt,
          canonicalUrl:
            locale === "en"
              ? localizedPost.seoCanonical ?? undefined
              : absoluteUrl(withLocalePath(locale, `/blog/${localizedPost.slug}`)),
        })}
      />

      <PageHero
        eyebrow={localizedPost.category}
        title={localizedPost.title}
        description={localizedPost.summary}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: homeLabel, href: homeHref },
              { label: dictionary.blog.eyebrow, href: blogHref },
              { label: localizedPost.title },
            ]}
          />
        }
        actions={
          <CTAGroup
            locale={locale}
            secondaryHref={blogHref}
            secondaryLabel={dictionary.cta.backToBlog}
          />
        }
        aside={
          <IllustrationPanel
            src={localizedPost.image}
            alt={localizedPost.imageAlt}
            title={localizedPost.readingTime}
            description={`${dictionary.blogDetail.publishedLabel} ${formatLocalizedDate(locale, localizedPost.publishedAt)}. ${dictionary.blogDetail.updatedLabel} ${formatLocalizedDate(locale, localizedPost.updatedAt)}.`}
          />
        }
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.78fr]">
            <article className="rounded-[2rem] border border-[var(--line)] bg-white p-6 md:p-8">
              <SectionHeading eyebrow={dictionary.blogDetail.articleEyebrow} title={dictionary.blogDetail.articleTitle} />
              <div className="mt-8">
                {localizedPost.sections.length > 0 ? (
                  <ArticleSections sections={localizedPost.sections} />
                ) : (
                  <p className="text-base leading-8 text-[var(--muted)]">
                    {dictionary.blogDetail.emptyArticle}
                  </p>
                )}
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6">
                <SectionHeading
                  eyebrow={dictionary.blogDetail.nextEyebrow}
                  title={dictionary.blogDetail.nextTitle}
                  description={dictionary.blogDetail.nextDescription}
                />
                <div className="mt-6">
                  <CTAGroup locale={locale} />
                </div>
              </div>

              <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6">
                <SectionHeading eyebrow={dictionary.blogDetail.relatedEyebrow} title={dictionary.blogDetail.relatedTitle} />
                <div className="mt-6 space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.slug} className="border-t border-[var(--line)] pt-4">
                      <p className="text-sm text-[var(--muted)]">{relatedPost.category}</p>
                      <h2 className="mt-2 text-xl">
                        <Link
                          href={withLocalePath(locale, `/blog/${relatedPost.slug}`)}
                          className="transition hover:text-[var(--accent)]"
                        >
                          {relatedPost.title}
                        </Link>
                      </h2>
                    </article>
                  ))}
                  {relatedPosts.length === 0 ? (
                    <p className="text-base leading-8 text-[var(--muted)]">
                      {dictionary.blogDetail.emptyRelated}
                    </p>
                  ) : null}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
