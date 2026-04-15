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
  const industries = (await getPublishedIndustries()).map((industry) =>
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

      <Section>
        <Container>
          <SectionHeading
            eyebrow={dictionary.industries.listEyebrow}
            title={dictionary.industries.listTitle}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => (
              <article
                key={industry.slug}
                className="rounded-[2rem] border border-[var(--line)] bg-white p-6"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
                  {industry.name}
                </p>
                <h2 className="mt-3 text-2xl">{industry.heroTitle}</h2>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                  {industry.summary}
                </p>
                <Link
                  href={withLocalePath(locale, `/industries/${industry.slug}`)}
                  className="mt-6 inline-flex text-base font-medium text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
                >
                  {dictionary.industries.open}
                </Link>
              </article>
            ))}
            {industries.length === 0 ? (
              <article className="rounded-[2rem] border border-dashed border-[var(--line)] bg-white p-6 text-base leading-8 text-[var(--muted)] md:col-span-2 xl:col-span-3">
                {dictionary.industries.empty}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
