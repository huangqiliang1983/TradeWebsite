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
  const company = localizeCompany(locale, await getPublishedCompanyProfile(locale));
  const homeHref = withLocalePath(locale, "/");
  const contactHref = withLocalePath(locale, "/contact");
  const homeLabel = getHomeLabel(locale);
  const channels = [
    {
      title: dictionary.contact.email,
      value: company.email,
      href: `mailto:${company.email}`,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      title: dictionary.contact.whatsapp,
      value: company.whatsapp.replace("https://wa.me/", "+"),
      href: company.whatsapp,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      title: dictionary.contact.phone,
      value: company.phone,
      href: `tel:${company.phone.replace(/[^+\d]/g, "")}`,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
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

      <Section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-10">
              <SectionHeading
                eyebrow={dictionary.contact.reachEyebrow}
                title={dictionary.contact.reachTitle}
                description={dictionary.contact.reachDescription}
              />
              <div className="space-y-4">
                {channels.map((channel) => (
                  <article
                    key={channel.title}
                    className="card-base p-6 bg-[var(--background)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="icon-box icon-box-accent flex-shrink-0">
                        {channel.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--accent)] mb-1">
                          {channel.title}
                        </p>
                        <Link
                          href={channel.href}
                          className={buttonStyles({
                            variant: "ghost",
                            size: "md",
                            className: "h-auto justify-start px-0 py-0 text-lg font-semibold text-[var(--foreground)] hover:text-[var(--accent)]",
                          })}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
                        >
                          {channel.value}
                        </Link>
                      </div>
                    </div>
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
