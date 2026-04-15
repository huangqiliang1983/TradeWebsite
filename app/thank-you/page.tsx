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
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-[var(--line)] bg-white p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--accent)]">
            {dictionary.thankYou.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl">
            {dictionary.thankYou.title}
          </h1>
          <p className="mt-6 text-base leading-8 text-[var(--muted)] sm:text-lg">
            {dictionary.thankYou.description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
