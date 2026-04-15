import Link from "next/link";

import { buttonStyles } from "@/components/ui/Button";
import { getMarketingDictionary } from "@/features/marketing/copy";
import { getPublishedCompanyProfile } from "@/features/marketing/public-content";
import type { Locale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";

type CTAGroupProps = {
  locale?: Locale;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export async function CTAGroup({
  locale = "en",
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CTAGroupProps) {
  const company = await getPublishedCompanyProfile(locale);
  const dictionary = getMarketingDictionary(locale);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link
        className={buttonStyles({ variant: "primary", size: "lg" })}
        href={primaryHref ?? `${withLocalePath(locale, "/contact")}#quote`}
      >
        {primaryLabel ?? dictionary.cta.requestQuote}
      </Link>
      <Link
        className={buttonStyles({ variant: "secondary", size: "lg" })}
        href={secondaryHref ?? withLocalePath(locale, "/contact")}
      >
        {secondaryLabel ?? dictionary.cta.contactUs}
      </Link>
      <Link
        className={buttonStyles({
          variant: "ghost",
          size: "lg",
          className: "justify-start sm:justify-center",
        })}
        href={company.whatsapp}
        target="_blank"
        rel="noreferrer noopener"
      >
        {dictionary.cta.whatsapp}
      </Link>
      <Link
        className={buttonStyles({
          variant: "ghost",
          size: "lg",
          className: "justify-start sm:justify-center",
        })}
        href={`mailto:${company.email}`}
      >
        {dictionary.cta.email}
      </Link>
    </div>
  );
}
