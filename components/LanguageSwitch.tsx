"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { getMarketingDictionary } from "@/features/marketing/copy";
import {
  getLocaleFromPathname,
  i18nConfig,
  stripLocalePrefix,
  withLocalePath,
} from "@/lib/i18n";
import { cx } from "@/lib/utils";

type LanguageSwitchProps = {
  className?: string;
  onNavigate?: () => void;
};

export function LanguageSwitch({
  className,
  onNavigate,
}: LanguageSwitchProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getMarketingDictionary(locale);
  const basePath = stripLocalePrefix(pathname);
  const query = searchParams.toString();

  function buildHref(targetLocale: typeof i18nConfig.locales[number]) {
    const targetPath = withLocalePath(targetLocale, basePath);
    return query ? `${targetPath}?${query}` : targetPath;
  }

  return (
    <div
      className={cx(
        "inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5 text-xs",
        className,
      )}
      aria-label={dictionary.languageSwitch.label}
    >
      {i18nConfig.locales.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={buildHref(targetLocale)}
          className={cx(
            "rounded-md px-2 py-1.5 text-xs font-semibold transition-colors",
            locale === targetLocale
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--muted)] hover:text-[var(--foreground)]",
          )}
          hrefLang={i18nConfig.htmlLangMap[targetLocale]}
          onClick={onNavigate}
        >
          {i18nConfig.localeLabels[targetLocale]}
        </Link>
      ))}
    </div>
  );
}
