import Link from "next/link";

import { StructuredData } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTAGroup } from "@/features/marketing/components/CTAGroup";
import { Breadcrumbs } from "@/features/marketing/components/Breadcrumbs";
import { IllustrationPanel } from "@/features/marketing/components/IllustrationPanel";
import { PageHero } from "@/features/marketing/components/PageHero";
import { SectionHeading } from "@/features/marketing/components/SectionHeading";
import { getMarketingDictionary } from "@/features/marketing/copy";
import {
  getHomeLabel,
  localizedMeta,
  localizedVisualText,
  pickLocalizedText,
} from "@/features/marketing/localized-text";
import { getPublishedBlogPosts } from "@/features/marketing/public-content";
import { localizeBlogPost } from "@/features/marketing/translations";
import { formatLocalizedDate, withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: pickLocalizedText(locale, localizedMeta.blogTitle),
    description: pickLocalizedText(locale, localizedMeta.blogDescription),
    path: "/blog",
    locale,
    keywords: ["B2B blog", "SEO article template", "industrial sourcing insights"],
  });
}

export default async function BlogPage() {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const homeHref = withLocalePath(locale, "/");
  const blogHref = withLocalePath(locale, "/blog");
  const homeLabel = getHomeLabel(locale);
  const blogPosts = (await getPublishedBlogPosts(locale)).map((post) =>
    localizeBlogPost(locale, post),
  );

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: homeLabel, path: homeHref },
          { name: dictionary.blog.eyebrow, path: blogHref },
        ])}
      />

      <PageHero
        eyebrow={dictionary.blog.eyebrow}
        title={dictionary.blog.title}
        description={dictionary.blog.description}
        breadcrumbs={<Breadcrumbs items={[{ label: homeLabel, href: homeHref }, { label: dictionary.blog.eyebrow }]} />}
        actions={
          <CTAGroup
            locale={locale}
            secondaryHref={withLocalePath(locale, "/contact")}
            secondaryLabel={dictionary.cta.talkToSales}
          />
        }
        aside={
          <IllustrationPanel
            src="/brand/insight-map.svg"
            alt={pickLocalizedText(locale, localizedVisualText.blogPlanningAlt)}
            title={dictionary.blog.asideTitle}
            description={dictionary.blog.asideDescription}
          />
        }
      />

      <Section className="bg-white py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow={dictionary.blog.latestEyebrow}
            title={dictionary.blog.latestTitle}
          />
          <div className="mt-12 space-y-5">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="card-base p-6 md:p-8 bg-white"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--muted)]">
                  <span className="rounded-md bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    {post.category}
                  </span>
                  <span>{post.readingTime}</span>
                  <span>{formatLocalizedDate(locale, post.publishedAt)}</span>
                </div>
                <h2 className="mt-4 text-2xl font-bold">
                  <Link href={withLocalePath(locale, `/blog/${post.slug}`)} className="hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
                  {post.summary}
                </p>
                <Link
                  href={withLocalePath(locale, `/blog/${post.slug}`)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:gap-3 transition-all"
                >
                  {dictionary.blog.readArticle}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
            {blogPosts.length === 0 ? (
              <article className="card-base p-8 text-center text-[var(--muted)]">
                {dictionary.blog.empty}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
