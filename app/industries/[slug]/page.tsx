import type { Metadata } from "next";
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
  getPublishedIndustryBySlug,
  getRedirectForPath,
} from "@/features/marketing/public-content";
import { localizeIndustry } from "@/features/marketing/translations";
import { withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const { slug } = await params;
  const industry = await getPublishedIndustryBySlug(slug, locale);
  const localizedIndustry = industry ? localizeIndustry(locale, industry) : null;

  if (!localizedIndustry) {
    return buildPageMetadata({
      title: dictionary.industryDetail.notFound,
      description: dictionary.industryDetail.notFoundDescription,
      path: "/industries",
      locale,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: localizedIndustry.seoTitle ?? localizedIndustry.name,
    description: localizedIndustry.seoDescription ?? localizedIndustry.summary,
    path: `/industries/${localizedIndustry.slug}`,
    locale,
    canonicalUrl: locale === "en" ? localizedIndustry.seoCanonical ?? undefined : undefined,
    keywords: [localizedIndustry.name, "industry application", "B2B use case"],
  });
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const homeHref = withLocalePath(locale, "/");
  const industriesHref = withLocalePath(locale, "/industries");
  const homeLabel = getHomeLabel(locale);
  const { slug } = await params;
  const industry = await getPublishedIndustryBySlug(slug, locale);

  if (!industry) {
    const redirectEntry = await getRedirectForPath(`/industries/${slug}`);

    if (redirectEntry?.statusCode === 301) {
      permanentRedirect(
        redirectEntry.destinationPath.startsWith("/")
          ? withLocalePath(locale, redirectEntry.destinationPath)
          : redirectEntry.destinationPath,
      );
    }

    notFound();
  }
  const localizedIndustry = localizeIndustry(locale, industry);

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: homeLabel, path: homeHref },
          { name: dictionary.industries.eyebrow, path: industriesHref },
          {
            name: localizedIndustry.name,
            path: withLocalePath(locale, `/industries/${localizedIndustry.slug}`),
          },
        ])}
      />

      <PageHero
        eyebrow={dictionary.industryDetail.eyebrow}
        title={localizedIndustry.heroTitle}
        description={localizedIndustry.summary}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: homeLabel, href: homeHref },
              { label: dictionary.industries.eyebrow, href: industriesHref },
              { label: localizedIndustry.name },
            ]}
          />
        }
        actions={<CTAGroup locale={locale} />}
        aside={
          <IllustrationPanel
            src={localizedIndustry.image}
            alt={localizedIndustry.imageAlt}
            title={localizedIndustry.name}
            description={dictionary.industryDetail.description}
          />
        }
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow={dictionary.industryDetail.focusEyebrow} title={dictionary.industryDetail.focusTitle} />
              <div className="mt-8 space-y-4">
                {localizedIndustry.sections[0]?.paragraphs.map((challenge) => (
                  <div key={challenge} className="flex gap-4 border-t border-[var(--line)] py-4">
                    <span className="mt-3 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <p className="text-base leading-8 text-[var(--muted)]">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading eyebrow={dictionary.industryDetail.implementationEyebrow} title={dictionary.industryDetail.implementationTitle} />
              <div className="mt-8 space-y-4">
                {(localizedIndustry.sections[1]?.paragraphs ?? localizedIndustry.sections[0]?.bullets ?? []).map((outcome) => (
                  <div key={outcome} className="flex gap-4 border-t border-[var(--line)] py-4">
                    <span className="mt-3 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <p className="text-base leading-8 text-[var(--muted)]">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--surface)]">
        <Container>
          <SectionHeading
            eyebrow={dictionary.industryDetail.detailEyebrow}
            title={dictionary.industryDetail.detailTitle}
          />
          <div className="mt-10 rounded-[2rem] border border-[var(--line)] bg-white p-6 md:p-8">
            {localizedIndustry.sections.length > 0 ? (
              <ArticleSections sections={localizedIndustry.sections} />
            ) : (
              <p className="text-base leading-8 text-[var(--muted)]">
                {dictionary.industryDetail.empty}
              </p>
            )}
          </div>
          <div className="mt-8">
            <CTAGroup locale={locale} />
          </div>
        </Container>
      </Section>
    </>
  );
}
