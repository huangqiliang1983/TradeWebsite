import { absoluteUrl } from "@/lib/site";

export const i18nConfig = {
  defaultLocale: "en",
  locales: ["en", "zh-CN", "es", "ru", "fr", "ar"],
  localePrefixMap: {
    en: "",
    "zh-CN": "/zh-cn",
    es: "/es",
    ru: "/ru",
    fr: "/fr",
    ar: "/ar",
  },
  localeLabels: {
    en: "EN",
    "zh-CN": "中文",
    es: "ES",
    ru: "RU",
    fr: "FR",
    ar: "AR",
  },
  htmlLangMap: {
    en: "en",
    "zh-CN": "zh-CN",
    es: "es",
    ru: "ru",
    fr: "fr",
    ar: "ar",
  },
  textDirectionMap: {
    en: "ltr",
    "zh-CN": "ltr",
    es: "ltr",
    ru: "ltr",
    fr: "ltr",
    ar: "rtl",
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

  const matchedLocale = i18nConfig.locales.find((locale) => {
    const prefix = i18nConfig.localePrefixMap[locale].toLowerCase();

    return (
      prefix &&
      (normalizedPathname === prefix || normalizedPathname.startsWith(`${prefix}/`))
    );
  });

  if (matchedLocale) {
    return matchedLocale;
  }

  return i18nConfig.defaultLocale;
}

export function stripLocalePrefix(pathname = "/") {
  const normalizedPathname = normalizePathname(pathname);
  const matchedPrefix = i18nConfig.locales
    .map((locale) => i18nConfig.localePrefixMap[locale])
    .filter(Boolean)
    .find((prefix) => normalizedPathname === prefix || normalizedPathname.startsWith(`${prefix}/`));

  if (!matchedPrefix) {
    return normalizedPathname;
  }

  if (normalizedPathname === matchedPrefix) {
    return "/";
  }

  return normalizedPathname.slice(matchedPrefix.length) || "/";
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
      ...Object.fromEntries(
        i18nConfig.locales.map((locale) => [
          locale,
          absoluteUrl(withLocalePath(locale, basePath)),
        ]),
      ),
      "x-default": absoluteUrl(withLocalePath(i18nConfig.defaultLocale, basePath)),
    },
  };
}

export function formatLocalizedDate(locale: Locale, value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(i18nConfig.htmlLangMap[locale], {
    year: "numeric",
    month: locale === "en" ? "short" : "long",
    day: "numeric",
  }).format(date);
}

export function getHtmlLang(locale: Locale) {
  return i18nConfig.htmlLangMap[locale];
}

export function getTextDirection(locale: Locale) {
  return i18nConfig.textDirectionMap[locale];
}

export function isArabicLocale(locale: Locale) {
  return locale === "ar";
}
