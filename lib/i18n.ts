import { absoluteUrl } from "@/lib/site";

export const i18nConfig = {
  defaultLocale: "en",
  locales: ["en", "zh-CN"],
  localePrefixMap: {
    en: "",
    "zh-CN": "/zh-cn",
  },
} as const;

export type Locale = (typeof i18nConfig.locales)[number];

function ensureLeadingSlash(pathname: string) {
  if (!pathname) {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function trimTrailingSlash(pathname: string) {
  return pathname !== "/" ? pathname.replace(/\/+$/, "") || "/" : pathname;
}

export function normalizePathname(pathname = "/") {
  return trimTrailingSlash(ensureLeadingSlash(pathname));
}

export function getLocaleFromPathname(pathname = "/"): Locale {
  const normalizedPathname = normalizePathname(pathname).toLowerCase();

  if (
    normalizedPathname === i18nConfig.localePrefixMap["zh-CN"] ||
    normalizedPathname.startsWith(`${i18nConfig.localePrefixMap["zh-CN"]}/`)
  ) {
    return "zh-CN";
  }

  return i18nConfig.defaultLocale;
}

export function stripLocalePrefix(pathname = "/") {
  const normalizedPathname = normalizePathname(pathname);
  const zhPrefix = i18nConfig.localePrefixMap["zh-CN"];

  if (normalizedPathname === zhPrefix) {
    return "/";
  }

  if (normalizedPathname.startsWith(`${zhPrefix}/`)) {
    return normalizedPathname.slice(zhPrefix.length) || "/";
  }

  return normalizedPathname;
}

export function withLocalePath(locale: Locale, pathname = "/") {
  const normalizedPathname = stripLocalePrefix(pathname);
  const prefix = i18nConfig.localePrefixMap[locale];

  if (!prefix) {
    return normalizedPathname;
  }

  return normalizedPathname === "/" ? prefix : `${prefix}${normalizedPathname}`;
}

export function buildLanguageAlternates(pathname: string) {
  const basePath = stripLocalePrefix(pathname);

  return {
    canonical: absoluteUrl(withLocalePath(i18nConfig.defaultLocale, basePath)),
    languages: {
      en: absoluteUrl(withLocalePath("en", basePath)),
      "zh-CN": absoluteUrl(withLocalePath("zh-CN", basePath)),
      "x-default": absoluteUrl(withLocalePath(i18nConfig.defaultLocale, basePath)),
    },
  };
}

export function formatLocalizedDate(locale: Locale, value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale === "zh-CN" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: locale === "zh-CN" ? "long" : "short",
    day: "numeric",
  }).format(date);
}
