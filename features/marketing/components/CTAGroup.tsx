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
  const isAccentPanel = tone === "dark";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link
        className={buttonStyles({
          variant: "primary",
          size: "lg",
          className: isAccentPanel ? "border-black bg-black text-white hover:shadow-none" : "",
        })}
        href={primaryHref ?? `${withLocalePath(locale, "/contact")}#quote`}
      >
        {primaryLabel ?? dictionary.cta.requestQuote}
      </Link>
      <Link
        className={buttonStyles({
          variant: "secondary",
          size: "lg",
          className: isAccentPanel
            ? "border-black/25 bg-transparent text-black hover:border-black hover:bg-black hover:text-white"
            : "",
        })}
        href={secondaryHref ?? withLocalePath(locale, "/contact")}
      >
        {secondaryLabel ?? dictionary.cta.contactUs}
      </Link>
      <Link
        className={buttonStyles({
          variant: "ghost",
          size: "lg",
          className:
            "justify-start text-[10px] font-black uppercase tracking-widest sm:justify-center " +
            (isAccentPanel
              ? "text-black/70 hover:bg-black/10 hover:text-black"
              : "text-[var(--foreground)] hover:bg-[var(--surface-strong)]"),
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
          className:
            "justify-start text-[10px] font-black uppercase tracking-widest sm:justify-center " +
            (isAccentPanel
              ? "text-black/70 hover:bg-black/10 hover:text-black"
              : "text-[var(--foreground)] hover:bg-[var(--surface-strong)]"),
        })}
        href={`mailto:${company.email}`}
      >
        {dictionary.cta.email}
      </Link>
    </div>
  );
}
