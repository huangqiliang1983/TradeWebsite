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
  tone?: "light" | "dark";
};

export async function CTAGroup({
  locale = "en",
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  tone = "light",
}: CTAGroupProps) {
  const company = await getPublishedCompanyProfile(locale);
  const dictionary = getMarketingDictionary(locale);
  const isDark = tone === "dark";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link
        className={buttonStyles({
          variant: isDark ? "gold" : "gold",
          size: "lg",
        })}
        href={primaryHref ?? `${withLocalePath(locale, "/contact")}#quote`}
      >
        {primaryLabel ?? dictionary.cta.requestQuote}
      </Link>
      <Link
        className={buttonStyles({
          variant: "secondary",
          size: "lg",
          className: isDark
            ? "border-white/15 bg-white/5 text-white hover:border-white/25 hover:bg-white/10"
            : "",
        })}
        href={secondaryHref ?? withLocalePath(locale, "/contact")}
      >
        {secondaryLabel ?? dictionary.cta.contactUs}
      </Link>
      <Link
        className={buttonStyles({
          variant: "ghost",
          size: "md",
          className:
            "justify-start text-xs font-medium sm:justify-center " +
            (isDark ? "text-slate-400 hover:bg-white/8 hover:text-white" : ""),
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
          size: "md",
          className:
            "justify-start text-xs font-medium sm:justify-center " +
            (isDark ? "text-slate-400 hover:bg-white/8 hover:text-white" : ""),
        })}
        href={`mailto:${company.email}`}
      >
        {dictionary.cta.email}
      </Link>
    </div>
  );
}
