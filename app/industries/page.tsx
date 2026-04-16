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
import { getPublishedIndustries } from "@/features/marketing/public-content";
import { localizeIndustry } from "@/features/marketing/translations";
import { withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: pickLocalizedText(locale, localizedMeta.industriesTitle),
    description: pickLocalizedText(locale, localizedMeta.industriesDescription),
    path: "/industries",
    locale,
    keywords: ["industry application page", "B2B use case page", "SEO industry template"],
  });
}

export default async function IndustriesPage() {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const homeHref = withLocalePath(locale, "/");
  const industriesHref = withLocalePath(locale, "/industries");
  const homeLabel = getHomeLabel(locale);
  const industries = (await getPublishedIndustries(locale)).map((industry) =>
    localizeIndustry(locale, industry),
  );

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: homeLabel, path: homeHref },
          { name: dictionary.industries.eyebrow, path: industriesHref },
        ])}
      />

      <PageHero
        eyebrow={dictionary.industries.eyebrow}
        title={dictionary.industries.title}
        description={dictionary.industries.description}
        breadcrumbs={
          <Breadcrumbs items={[{ label: homeLabel, href: homeHref }, { label: dictionary.industries.eyebrow }]} />
        }
        actions={
          <CTAGroup
            locale={locale}
            secondaryHref={withLocalePath(locale, "/contact")}
            secondaryLabel={dictionary.cta.discussUseCase}
          />
        }
        aside={
          <IllustrationPanel
            src="/brand/operations.svg"
            alt={pickLocalizedText(locale, localizedVisualText.industryPlansAlt)}
            title={dictionary.industries.asideTitle}
            description={dictionary.industries.asideDescription}
          />
        }
      />

      <Section className="bg-white py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow={dictionary.industries.listEyebrow}
            title={dictionary.industries.listTitle}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => (
              <article
                key={industry.slug}
                className="card-base p-8 bg-white"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold-soft)] text-[var(--gold)]">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--accent)] mb-2">
                  {industry.name}
                </p>
                <h2 className="text-xl font-bold leading-snug">{industry.heroTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {industry.summary}
                </p>
                <Link
                  href={withLocalePath(locale, `/industries/${industry.slug}`)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:gap-3 transition-all"
                >
                  {dictionary.industries.open}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
            {industries.length === 0 ? (
              <article className="card-base p-8 text-center text-[var(--muted)] md:col-span-2 xl:col-span-3">
                {dictionary.industries.empty}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
