import Link from "next/link";
import Image from "next/image";

import { StructuredData } from "@/components/StructuredData";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getMarketingDictionary } from "@/features/marketing/copy";
import {
  getPublishedCompanyProfile,
  getPublishedHomeFaq,
  getPublishedIndustries,
  getPublishedProducts,
} from "@/features/marketing/public-content";
import { CTAGroup } from "@/features/marketing/components/CTAGroup";
import { FAQList } from "@/features/marketing/components/FAQList";
import { localizedMeta, localizedVisualText, pickLocalizedText } from "@/features/marketing/localized-text";
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

  return buildPageMetadata({
    title:
      locale === "en"
        ? company.seoTitle || pickLocalizedText(locale, localizedMeta.homeTitle)
        : pickLocalizedText(locale, localizedMeta.homeTitle),
    description:
      company.seoDescription || pickLocalizedText(locale, localizedMeta.homeDescription),
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
  const featuredProducts = localizedProducts.slice(0, 3);
  const featuredIndustries = localizedIndustries.slice(0, 3);
  const companyStats = getLocalizedCompanyStats(locale);
  const homeHighlights = getLocalizedHomeHighlights(locale);
  const heroVisualTitle = pickLocalizedText(locale, localizedVisualText.homepageVisualTitle);

  return (
    <>
      {localizedFaq.length > 0 ? <StructuredData data={faqSchema(localizedFaq)} /> : null}

      {/* 🦾 HERO SECTION: Hardcore Dark Industrial */}
      <Section className="relative flex min-h-[90vh] items-center overflow-hidden bg-black py-0 text-white">
        <div className="texture-grid-dark pointer-events-none absolute inset-0 opacity-15" />
        <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
        
        <Container className="relative py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                {localizedCompany.tagline}
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-[1.1] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-9xl">
                {dictionary.home.heroTitle}
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
                {localizedCompany.summary}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  className={buttonStyles({ variant: "primary", className: "h-14 px-10 text-lg uppercase tracking-wider font-extrabold" })}
                  href={`${withLocalePath(locale, "/contact")}#quote`}
                >
                  {dictionary.cta.requestQuote}
                </Link>
                <Link
                  className={buttonStyles({
                    variant: "secondary",
                    className: "h-14 px-10 text-lg uppercase tracking-wider font-extrabold bg-transparent border-white/20 text-white hover:bg-white hover:text-black",
                  })}
                  href={withLocalePath(locale, "/products")}
                >
                  {dictionary.cta.viewProducts}
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-orange-900 opacity-20 blur-2xl transition duration-1000 group-hover:opacity-40" />
              <div className="relative industrial-border overflow-hidden rounded-xl bg-zinc-900/50 backdrop-blur-xl">
                <div className="flex border-b border-white/10 px-4 py-3 items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-zinc-700" />
                    <div className="h-2 w-2 rounded-full bg-zinc-700" />
                    <div className="h-2 w-2 rounded-full bg-zinc-700" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">System Status: Active</span>
                </div>
                <Image
                  src="/brand/operations.svg"
                  alt={heroVisualTitle}
                  width={960}
                  height={720}
                  priority
                  className="h-auto w-full grayscale contrast-125 opacity-80 transition hover:grayscale-0 hover:opacity-100"
                  sizes="(min-width: 1024px) 36rem, 100vw"
                />
                <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 text-center">
                  {companyStats.slice(0, 3).map((stat) => (
                    <div key={stat.label} className="py-5 px-2 bg-gradient-to-b from-white/5 to-transparent">
                      <p className="text-2xl font-black text-white sm:text-3xl">{stat.value}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 🏭 HIGHLIGHTS SECTION: Industrial Bento */}
      <Section className="bg-zinc-950 border-t border-white/5">
        <Container>
          <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div className="space-y-4">
               <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--accent)]">{dictionary.home.whyEyebrow}</p>
               <h2 className="text-4xl font-black text-white sm:text-5xl lg:text-6xl uppercase">{dictionary.home.whyTitle}</h2>
            </div>
            <p className="text-lg text-zinc-400 max-w-xl">{dictionary.home.whyDescription}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {homeHighlights.map((highlight, index) => (
              <article
                key={highlight.title}
                className="group industrial-border p-10 rounded-xl transition hover:border-[var(--accent)]/50"
              >
                <div className="mb-8 font-black text-6xl text-white/5 group-hover:text-[var(--accent)]/10 transition-colors">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">{highlight.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* 🚀 STATS STRIP */}
      <Section className="bg-[var(--accent)] py-12">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {companyStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left border-l-4 border-black/20 pl-6">
                <p className="text-4xl font-black text-black sm:text-6xl">{stat.value}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-widest text-black/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {featuredProducts.length > 0 ? (
        <Section className="bg-zinc-900">
          <Container>
            <div className="mb-16">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                {dictionary.home.productsEyebrow}
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase text-white sm:text-5xl">
                {dictionary.home.productsTitle}
              </h2>
            </div>
            <div className="grid gap-6">
              {featuredProducts.map((product) => (
                <article
                  key={product.slug}
                  className="group flex flex-col overflow-hidden rounded-xl transition-all hover:border-[var(--accent)] md:flex-row industrial-border"
                >
                  <div className="flex-1 p-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                      {product.category}
                    </span>
                    <h3 className="mt-2 text-3xl font-bold uppercase text-white transition-colors group-hover:text-[var(--accent)]">
                      <Link href={withLocalePath(locale, `/products/${product.slug}`)}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-6 max-w-2xl leading-relaxed text-zinc-400">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex w-full flex-col justify-center space-y-4 border-t border-white/5 bg-black/40 p-8 md:w-72 md:border-l md:border-t-0">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold uppercase text-zinc-500">{dictionary.home.moq}</span>
                      <span className="font-bold text-white">{product.moq}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-bold uppercase text-zinc-500">
                        {dictionary.home.leadTime}
                      </span>
                      <span className="font-bold text-white">{product.leadTime}</span>
                    </div>
                    <Link
                      href={withLocalePath(locale, `/products/${product.slug}`)}
                      className="mt-4 block w-full border border-[var(--accent)] py-3 text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-black"
                    >
                      {dictionary.products.openDetail}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {featuredIndustries.length > 0 ? (
        <Section className="bg-zinc-950">
          <Container>
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-black uppercase text-white sm:text-5xl">
                {dictionary.home.industryTitle}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {featuredIndustries.map((industry) => (
                <article
                  key={industry.slug}
                  className="group relative border-t border-white/10 pt-8 transition-colors hover:border-[var(--accent)]"
                >
                  <h3 className="mb-4 text-2xl font-bold uppercase text-white group-hover:text-[var(--accent)]">
                    <Link href={withLocalePath(locale, `/industries/${industry.slug}`)}>
                      {industry.name}
                    </Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500">{industry.summary}</p>
                  <div className="mt-6 h-1 w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-full" />
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {localizedFaq.length > 0 ? (
        <Section className="bg-[var(--surface)]">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                  {dictionary.home.faqEyebrow}
                </p>
                <h2 className="text-4xl font-black text-[var(--foreground)] sm:text-5xl">
                  {dictionary.home.faqTitle}
                </h2>
                <p className="text-base leading-8 text-[var(--muted)]">
                  {dictionary.home.faqDescription}
                </p>
              </div>
              <FAQList items={localizedFaq} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 📢 FINAL CTA: High Contrast Industrial */}
      <Section className="bg-black py-0">
        <Container className="py-20 lg:py-40">
           <div className="relative industrial-border bg-[var(--accent)] p-12 lg:p-24 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(249,115,22,0.1)]">
              <div className="texture-grid-dark pointer-events-none absolute inset-0 opacity-20" />
              <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
                 <div className="space-y-6">
                    <h2 className="text-5xl font-black text-black leading-none uppercase xl:text-7xl">
                      {dictionary.home.finalTitle}
                    </h2>
                    <p className="text-black/70 text-lg font-bold">
                      {dictionary.home.finalDescription}
                    </p>
                 </div>
                 <div className="flex justify-center lg:justify-end">
                    <CTAGroup locale={locale} tone="dark" />
                 </div>
              </div>
           </div>
        </Container>
      </Section>
    </>
  );
}
