import Link from "next/link";
import Image from "next/image";

import { StructuredData } from "@/components/StructuredData";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getMarketingDictionary } from "@/features/marketing/copy";
import {
  getPublishedCompanyProfile,
  getPublishedHomeFaq,
  getPublishedIndustries,
  getPublishedProducts,
} from "@/features/marketing/public-content";
import { CTAGroup } from "@/features/marketing/components/CTAGroup";
import { FAQList } from "@/features/marketing/components/FAQList";
import { localizedMeta, pickLocalizedText } from "@/features/marketing/localized-text";
import {
  getLocalizedCompanyStats,
  getLocalizedHomeFaq,
  getLocalizedHomeHighlights,
  localizeCompany,
  localizeIndustry,
  localizeProduct,
} from "@/features/marketing/translations";
import { withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const company = localizeCompany(locale, await getPublishedCompanyProfile(locale));
  // Note: Fallback localizedMeta handled inline to avoid import errors dynamically

  return buildPageMetadata({
    title:
      locale === "en"
        ? company.seoTitle || pickLocalizedText(locale, localizedMeta.homeTitle)
        : pickLocalizedText(locale, localizedMeta.homeTitle),
    description: company.seoDescription || pickLocalizedText(locale, localizedMeta.homeDescription),
    path: "/",
    locale,
    canonicalUrl: locale === "en" ? company.seoCanonical : undefined,
    keywords: [
      "B2B sourcing",
      "OEM manufacturing",
      "export website",
      "Google SEO",
      "request a quote",
    ],
  });
}

export default async function Home() {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const [company, products, industries, homeFaq] = await Promise.all([
    getPublishedCompanyProfile(locale),
    getPublishedProducts(locale),
    getPublishedIndustries(locale),
    getPublishedHomeFaq(locale),
  ]);
  const localizedCompany = localizeCompany(locale, company);
  const localizedProducts = products.map((product) => localizeProduct(locale, product));
  const localizedIndustries = industries.map((industry) => localizeIndustry(locale, industry));
  const localizedFaq = getLocalizedHomeFaq(locale, homeFaq);
  const featuredProducts = localizedProducts.slice(0, 4); // Take 4 for a 2x2 grid
  const featuredIndustries = localizedIndustries.slice(0, 3);
  const companyStats = getLocalizedCompanyStats(locale);
  const homeHighlights = getLocalizedHomeHighlights(locale);

  return (
    <>
      {localizedFaq.length > 0 ? <StructuredData data={faqSchema(localizedFaq)} /> : null}

      {/* 🚀 1. HERO SECTION: Dramatic Dark Mode with Glassmorphism */}
      <section className="relative overflow-hidden bg-zinc-950 pt-12 pb-24 lg:pt-24 lg:pb-32">
        {/* Glowing Top Radial Background */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--accent)]/30 via-zinc-950/0 to-transparent opacity-80" />
        
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="max-w-2xl space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-[var(--accent-soft)] backdrop-blur-md">
                {localizedCompany.tagline}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                {dictionary.home.heroTitle}
              </h1>
              <p className="mx-auto text-lg leading-relaxed text-zinc-400 sm:text-xl lg:mx-0">
                {localizedCompany.summary}
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  className={buttonStyles({ variant: "primary", size: "lg", className: "w-full sm:w-auto text-base px-8 h-14" })}
                  href={`${withLocalePath(locale, "/contact")}#quote`}
                >
                  {dictionary.cta.requestQuote}
                </Link>
                <Link
                  className={buttonStyles({
                    variant: "secondary",
                    size: "lg",
                    className: "w-full sm:w-auto text-base px-8 h-14 bg-white/5 border-white/10 text-white hover:bg-white hover:text-black",
                  })}
                  href={withLocalePath(locale, "/products")}
                >
                  {dictionary.cta.viewProducts}
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative block overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/50 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-4">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-zinc-950">
                  <Image
                    src="/brand/operations.svg"
                    alt="Operations"
                    width={960}
                    height={720}
                    priority
                    className="h-auto w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105 hover:opacity-100"
                    sizes="(min-width: 1024px) 36rem, 100vw"
                  />
                  {/* Floating Stat Card on Desktop */}
                  <div className="absolute bottom-4 left-4 hidden rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md md:block">
                    <p className="text-sm tracking-wider text-zinc-400 uppercase">{companyStats[0]?.label}</p>
                    <p className="mt-1 text-3xl font-bold text-white max-w-[12rem]">{companyStats[0]?.value}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 📊 2. BENTO BOX: Highlights (Fully Responsive) */}
      <section className="bg-zinc-50 py-20 lg:py-28">
        <Container>
          <div className="mb-12 text-center lg:mb-16 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{dictionary.home.whyTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 lg:mx-0">{dictionary.home.whyDescription}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeHighlights.map((highlight, index) => {
              // Bento Logic: Make the first item span 2 columns on tablet/desktop, and second item dark mode.
              const isLarge = index === 0;
              const isDark = index === 1;

              return (
                <div
                  key={highlight.title}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${
                    isLarge ? "sm:col-span-2 lg:col-span-2" : ""
                  } ${
                    isDark 
                      ? "bg-zinc-950 text-white shadow-2xl hover:shadow-[var(--accent)]/20" 
                      : "bg-white border border-zinc-200 text-zinc-900 shadow-sm"
                  }`}
                >
                  <div>
                    <span 
                      className={`inline-flex items-center justify-center rounded-xl p-3 text-2xl font-black ${
                        isDark ? "bg-white/10 text-[var(--accent)]" : "bg-zinc-100 text-[var(--accent)]"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <h3 className={`mt-6 text-2xl font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>
                      {highlight.title}
                    </h3>
                    <p className={`mt-4 text-base leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                      {highlight.description}
                    </p>
                  </div>
                  {/* Decorative background blur inside the card */}
                  {isLarge && (
                     <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl transition-transform group-hover:scale-125" />
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 🚀 3. PRODUCTS: Dynamic Masonry / Card Grid */}
      <section className="border-t border-zinc-200 bg-white py-20 lg:py-28">
        <Container>
          <div className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row md:mb-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{dictionary.home.productsTitle}</h2>
              <p className="mt-4 text-lg text-zinc-600">{dictionary.home.productsDescription}</p>
            </div>
            <Link
              href={withLocalePath(locale, "/products")}
              className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              All Products
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {featuredProducts.map((product) => (
              <article
                key={product.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8 transition hover:border-[var(--accent)]/50 hover:bg-white hover:shadow-2xl"
              >
                <div>
                  <div className="mb-4 inline-block rounded-lg bg-[var(--accent)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                    <Link href={withLocalePath(locale, `/products/${product.slug}`)} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-zinc-600 line-clamp-3">
                    {product.description}
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
                  <div>
                    <span className="block font-semibold text-zinc-900">{dictionary.home.moq}</span>
                    {product.moq}
                  </div>
                  <div>
                    <span className="block font-semibold text-zinc-900">{dictionary.home.leadTime}</span>
                    {product.leadTime}
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-8 sm:hidden">
            <Link
              href={withLocalePath(locale, "/products")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-4 font-semibold text-zinc-900 transition hover:bg-zinc-50"
            >
              All Products <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* 🚀 4. STATS FLOATING BANNER */}
      <section className="relative bg-[var(--accent)] py-16 text-white sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {companyStats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-5xl font-extrabold sm:text-6xl">{stat.value}</p>
                <p className="mt-3 text-sm font-medium uppercase tracking-widest text-white/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 🚀 5. INDUSTRIES */}
      <section className="bg-zinc-50 py-20 lg:py-28">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{dictionary.home.industryTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">{dictionary.home.industryDescription}</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredIndustries.map((industry) => (
              <article key={industry.slug} className="group overflow-hidden rounded-[2rem] border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-zinc-900">
                    <Link href={withLocalePath(locale, `/industries/${industry.slug}`)}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {industry.name}
                    </Link>
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-zinc-600">
                    {industry.summary}
                  </p>
                </div>
                <div className="bg-zinc-50 px-8 py-4 transition group-hover:bg-[var(--accent)]/5">
                  <span className="text-sm font-semibold text-[var(--accent)]">Explore &rarr;</span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 🚀 6. FINAL CTA & FAQ - COMBINED AND DRAMATIC */}
      <section className="bg-zinc-950 py-20 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-10 text-center lg:text-left">
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {dictionary.home.finalTitle}
              </h2>
              <p className="text-lg leading-relaxed text-zinc-400">
                {dictionary.home.finalDescription}
              </p>
              <CTAGroup locale={locale} tone="dark" />
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-10 lg:p-12">
              <h3 className="mb-8 text-2xl font-bold text-white">{dictionary.home.faqTitle}</h3>
              <div className="bg-zinc-900 rounded-3xl p-6 ring-1 ring-white/10">  
                <FAQList items={localizedFaq} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
