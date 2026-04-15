import { serverEnv } from "@/lib/env";

export const siteConfig = {
  name: "Remember Everything",
  companyName: "Remember Everything Industrial Co., Ltd.",
  url:
    serverEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "") ||
    "https://www.remembereverything.com",
  description:
    "Remember Everything helps importers launch dependable OEM programs with faster quoting, traceable production milestones, and export-ready documentation.",
  email: "sales@remembereverything.com",
  phone: "+86 21 5555 0188",
  whatsapp: "https://wa.me/8613800138000",
  address: "Building 8, Pudong Export Hub, Shanghai, China",
  locale: "en_US",
  language: "en",
} as const;

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, siteConfig.url).toString();
}
