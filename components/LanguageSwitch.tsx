"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { getMarketingDictionary } from "@/features/marketing/copy";
import {
  getLocaleFromPathname,
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

  function buildHref(targetLocale: "en" | "zh-CN") {
    const targetPath = withLocalePath(targetLocale, basePath);
    return query ? `${targetPath}?${query}` : targetPath;
  }

  return (
    <div
      className={cx(
        "inline-flex items-center rounded-full border border-[var(--line)] bg-white/90 p-1 text-sm",
        className,
      )}
      aria-label={dictionary.languageSwitch.label}
    >
      <Link
        href={buildHref("en")}
        className={cx(
          "rounded-full px-3 py-2 transition",
          locale === "en"
            ? "bg-[var(--foreground)] text-white"
            : "text-[var(--muted)] hover:text-[var(--foreground)]",
        )}
        onClick={onNavigate}
      >
        {dictionary.languageSwitch.english}
      </Link>
      <Link
        href={buildHref("zh-CN")}
        className={cx(
          "rounded-full px-3 py-2 transition",
          locale === "zh-CN"
            ? "bg-[var(--foreground)] text-white"
            : "text-[var(--muted)] hover:text-[var(--foreground)]",
        )}
        onClick={onNavigate}
      >
        {dictionary.languageSwitch.chinese}
      </Link>
    </div>
  );
}
