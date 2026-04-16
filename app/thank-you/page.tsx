import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buttonStyles } from "@/components/ui/Button";
import { getMarketingDictionary } from "@/features/marketing/copy";
import { localizedMeta, pickLocalizedText } from "@/features/marketing/localized-text";
import { withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);

  return buildPageMetadata({
    title: dictionary.thankYou.eyebrow,
    description: pickLocalizedText(locale, localizedMeta.thankYouDescription),
    path: "/thank-you",
    locale,
    keywords: ["thank you page", "inquiry confirmation", "request a quote"],
  });
}

export default async function ThankYouPage() {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);

  return (
    <Section className="flex flex-1 items-center">
      <Container>
        <div className="mx-auto max-w-2xl text-center py-16">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50">
            <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="eyebrow eyebrow-accent justify-center mb-4">
            {dictionary.thankYou.eyebrow}
          </p>
          <h1 className="text-4xl font-black sm:text-5xl">
            {dictionary.thankYou.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            {dictionary.thankYou.description}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className={buttonStyles({ variant: "primary", size: "lg" })} href={withLocalePath(locale, "/products")}>
              {dictionary.cta.viewProducts}
            </Link>
            <Link className={buttonStyles({ variant: "secondary", size: "lg" })} href={withLocalePath(locale, "/contact")}>
              {dictionary.cta.contactUs}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
