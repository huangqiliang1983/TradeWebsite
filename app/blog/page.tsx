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
  const blogPosts = (await getPublishedBlogPosts()).map((post) =>
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

      <Section>
        <Container>
          <SectionHeading
            eyebrow={dictionary.blog.latestEyebrow}
            title={dictionary.blog.latestTitle}
          />
          <div className="mt-10 space-y-5">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-[2rem] border border-[var(--line)] bg-white p-6 md:p-8"
              >
                <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                  <span>{post.category}</span>
                  <span>{post.readingTime}</span>
                  <span>{formatLocalizedDate(locale, post.publishedAt)}</span>
                </div>
                <h2 className="mt-4 text-3xl">
                  <Link href={withLocalePath(locale, `/blog/${post.slug}`)} className="transition hover:text-[var(--accent)]">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
                  {post.summary}
                </p>
                <Link
                  href={withLocalePath(locale, `/blog/${post.slug}`)}
                  className="mt-6 inline-flex text-base font-medium text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
                >
                  {dictionary.blog.readArticle}
                </Link>
              </article>
            ))}
            {blogPosts.length === 0 ? (
              <article className="rounded-[2rem] border border-dashed border-[var(--line)] bg-white p-6 text-base leading-8 text-[var(--muted)]">
                {dictionary.blog.empty}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
