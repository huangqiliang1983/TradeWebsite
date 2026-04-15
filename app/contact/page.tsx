import Link from "next/link";

import { StructuredData } from "@/components/StructuredData";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTAGroup } from "@/features/marketing/components/CTAGroup";
import { Breadcrumbs } from "@/features/marketing/components/Breadcrumbs";
import { IllustrationPanel } from "@/features/marketing/components/IllustrationPanel";
import { InquiryFormCard } from "@/features/marketing/components/InquiryFormCard";
import { PageHero } from "@/features/marketing/components/PageHero";
import { SectionHeading } from "@/features/marketing/components/SectionHeading";
import { getMarketingDictionary } from "@/features/marketing/copy";
import {
  getHomeLabel,
  localizedMeta,
  localizedVisualText,
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

  return buildPageMetadata({
    title: pickLocalizedText(locale, localizedMeta.contactTitle),
    description: pickLocalizedText(locale, localizedMeta.contactDescription),
    path: "/contact",
    locale,
    keywords: ["contact supplier", "request a quote", "B2B inquiry page"],
  });
}

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const company = localizeCompany(locale, await getPublishedCompanyProfile());
  const homeHref = withLocalePath(locale, "/");
  const contactHref = withLocalePath(locale, "/contact");
  const homeLabel = getHomeLabel(locale);
  const channels = [
    {
      title: dictionary.contact.email,
      value: company.email,
      href: `mailto:${company.email}`,
    },
    {
      title: dictionary.contact.whatsapp,
      value: company.whatsapp.replace("https://wa.me/", "+"),
      href: company.whatsapp,
    },
    {
      title: dictionary.contact.phone,
      value: company.phone,
      href: `tel:${company.phone.replace(/[^+\d]/g, "")}`,
    },
  ];

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: homeLabel, path: homeHref },
          { name: dictionary.contact.eyebrow, path: contactHref },
        ])}
      />

      <PageHero
        eyebrow={dictionary.contact.eyebrow}
        title={dictionary.contact.title}
        description={dictionary.contact.description}
        breadcrumbs={<Breadcrumbs items={[{ label: homeLabel, href: homeHref }, { label: dictionary.contact.eyebrow }]} />}
        actions={<CTAGroup locale={locale} />}
        aside={
          <IllustrationPanel
            src="/brand/product-blueprint.svg"
            alt={pickLocalizedText(locale, localizedVisualText.quoteWorkflowAlt)}
            title={dictionary.contact.asideTitle}
            description={dictionary.contact.asideDescription}
          />
        }
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-8">
              <SectionHeading
                eyebrow={dictionary.contact.reachEyebrow}
                title={dictionary.contact.reachTitle}
                description={dictionary.contact.reachDescription}
              />
              <div className="space-y-4">
                {channels.map((channel) => (
                  <article
                    key={channel.title}
                    className="rounded-[2rem] border border-[var(--line)] bg-white p-6"
                  >
                    <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
                      {channel.title}
                    </p>
                    <Link
                      href={channel.href}
                      className={buttonStyles({
                        variant: "ghost",
                        size: "md",
                        className: "mt-3 h-auto justify-start px-0 py-0 text-lg font-medium",
                      })}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    >
                      {channel.value}
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            <InquiryFormCard locale={locale} inquiryType="CONTACT" sourcePage={contactHref} />
          </div>
        </Container>
      </Section>
    </>
  );
}
