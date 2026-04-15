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
        "inline-flex max-w-full flex-nowrap items-center overflow-x-auto rounded-full border border-[var(--line)] bg-white/90 p-1 text-sm",
        className,
      )}
      aria-label={dictionary.languageSwitch.label}
    >
      {i18nConfig.locales.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={buildHref(targetLocale)}
          className={cx(
            "shrink-0 rounded-full px-2.5 py-2 text-xs transition sm:px-3 sm:text-sm",
            locale === targetLocale
              ? "bg-[var(--foreground)] text-white"
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
