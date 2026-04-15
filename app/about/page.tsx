import { StructuredData } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/features/marketing/components/Breadcrumbs";
import { CTAGroup } from "@/features/marketing/components/CTAGroup";
import { IllustrationPanel } from "@/features/marketing/components/IllustrationPanel";
import { PageHero } from "@/features/marketing/components/PageHero";
import { SectionHeading } from "@/features/marketing/components/SectionHeading";
import { getMarketingDictionary } from "@/features/marketing/copy";
import {
  aboutLocalizedLists,
  getHomeLabel,
  localizedMeta,
  pickLocalizedText,
} from "@/features/marketing/localized-text";
import { getPublishedCompanyProfile } from "@/features/marketing/public-content";
import { localizeCompany } from "@/features/marketing/translations";
import { withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const company = localizeCompany(locale, await getPublishedCompanyProfile(locale));

  return buildPageMetadata({
    title:
      locale === "zh-CN"
        ? `关于 ${company.companyName}`
        : locale === "es"
          ? `Nosotros | ${company.companyName}`
          : locale === "fr"
            ? `A propos | ${company.companyName}`
            : locale === "ru"
              ? `О нас | ${company.companyName}`
              : locale === "ar"
                ? `من نحن | ${company.companyName}`
                : `About ${company.companyName}`,
    description:
      company.summary || pickLocalizedText(locale, localizedMeta.aboutDescription),
    path: "/about",
    locale,
    keywords: ["about export supplier", "OEM manufacturing team", "B2B sourcing company"],
  });
}

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const company = localizeCompany(locale, await getPublishedCompanyProfile(locale));
  const homeHref = withLocalePath(locale, "/");
  const aboutHref = withLocalePath(locale, "/about");
  const homeLabel = getHomeLabel(locale);
  const milestones = aboutLocalizedLists.milestones[locale];
  const principles = aboutLocalizedLists.principles[locale];

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: homeLabel, path: homeHref },
          { name: dictionary.about.eyebrow, path: aboutHref },
        ])}
      />

      <PageHero
        eyebrow={dictionary.about.eyebrow}
        title={dictionary.about.title}
        description={company.description}
        breadcrumbs={<Breadcrumbs items={[{ label: homeLabel, href: homeHref }, { label: dictionary.about.eyebrow }]} />}
        actions={<CTAGroup locale={locale} />}
        aside={
          <IllustrationPanel
            src={company.logoImage}
            alt={company.logoImageAlt}
            title={dictionary.about.heroAsideTitle}
            description={company.summary}
          />
        }
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <SectionHeading
              eyebrow={dictionary.about.whatEyebrow}
              title={`${dictionary.about.whatTitle} ${company.companyName}.`}
              description={dictionary.about.whatDescription}
            />
            <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
              <p>
                {company.companyName} {dictionary.about.introOne}
              </p>
              <p>
                {company.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--surface)]">
        <Container>
          <SectionHeading
            eyebrow={dictionary.about.projectEyebrow}
            title={dictionary.about.projectTitle}
            description={dictionary.about.projectDescription}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {milestones.map((item, index) => (
              <article
                key={item}
                className="rounded-[2rem] border border-[var(--line)] bg-white p-6"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
                  {dictionary.about.stage} {index + 1}
                </p>
                <h2 className="mt-3 text-2xl">{item}</h2>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={dictionary.about.principlesEyebrow}
            title={dictionary.about.principlesTitle}
          />
          <div className="mt-8 space-y-4">
            {principles.map((principle) => (
              <div key={principle} className="flex gap-4 border-t border-[var(--line)] py-4">
                <span className="mt-3 h-2 w-2 rounded-full bg-[var(--accent)]" />
                <p className="text-base leading-8 text-[var(--muted)]">{principle}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
