import type { Metadata } from "next";
import "./globals.css";

import { Analytics } from "@/components/Analytics";
import { StructuredData } from "@/components/StructuredData";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPublishedCompanyProfile } from "@/features/marketing/public-content";
import { localizeCompany } from "@/features/marketing/translations";
import { serverEnv } from "@/lib/env";
import { buildLanguageAlternates } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const company = localizeCompany(locale, await getPublishedCompanyProfile());

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: company.seoTitle || siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: company.seoDescription || siteConfig.description,
    alternates: buildLanguageAlternates("/"),
    verification: {
      google: serverEnv.GOOGLE_SITE_VERIFICATION || undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const company = localizeCompany(locale, await getPublishedCompanyProfile());

  return (
    <html lang={locale === "zh-CN" ? "zh-CN" : "en"} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        {serverEnv.NEXT_PUBLIC_GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${serverEnv.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <StructuredData
          data={organizationSchema({
            companyName: company.companyName,
            logoImage: company.logoImage,
            email: company.email,
            phone: company.phone,
            address: company.address,
          })}
        />
        <StructuredData data={websiteSchema()} />
        <Analytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--foreground)] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header company={company} />
        <main id="main-content" className="flex min-h-[60vh] flex-1 flex-col">
          {children}
        </main>
        <Footer company={company} locale={locale} />
      </body>
    </html>
  );
}
