import Link from "next/link";
import Image from "next/image";

import { StructuredData } from "@/components/StructuredData";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getMarketingDictionary } from "@/features/marketing/copy";
import {
  getPublishedBlogPosts,
  getPublishedCompanyProfile,
  getPublishedHomeFaq,
  getPublishedIndustries,
  getPublishedProducts,
} from "@/features/marketing/public-content";
import { CTAGroup } from "@/features/marketing/components/CTAGroup";
import { FAQList } from "@/features/marketing/components/FAQList";
import { SectionHeading } from "@/features/marketing/components/SectionHeading";
import { localizedMeta, localizedVisualText, pickLocalizedText } from "@/features/marketing/localized-text";
import {
  getLocalizedCompanyStats,
  getLocalizedHomeFaq,
  getLocalizedHomeHighlights,
  localizeBlogPost,
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
    keywords: ["B2B sourcing", "OEM manufacturing", "export website", "Google SEO", "request a quote"],
  });
}

export default async function Home() {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const [company, products, industries, blogPosts, homeFaq] = await Promise.all([
    getPublishedCompanyProfile(locale),
    getPublishedProducts(locale),
    getPublishedIndustries(locale),
    getPublishedBlogPosts(locale),
    getPublishedHomeFaq(locale),
  ]);
  const localizedCompany    = localizeCompany(locale, company);
  const localizedProducts   = products.map((p) => localizeProduct(locale, p));
  const localizedIndustries = industries.map((i) => localizeIndustry(locale, i));
  const localizedBlogPosts  = blogPosts.map((b) => localizeBlogPost(locale, b));
  const localizedFaq        = getLocalizedHomeFaq(locale, homeFaq);
  const featuredProducts    = localizedProducts.slice(0, 3);
  const featuredIndustries  = localizedIndustries.slice(0, 3);
  const featuredPosts       = localizedBlogPosts.slice(0, 3);
  const companyStats        = getLocalizedCompanyStats(locale);
  const homeHighlights      = getLocalizedHomeHighlights(locale);
  const heroVisualTitle     = pickLocalizedText(locale, localizedVisualText.homepageVisualTitle);

  return (
    <>
      {localizedFaq.length > 0 ? <StructuredData data={faqSchema(localizedFaq)} /> : null}

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--charcoal)] text-white">
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 texture-dots opacity-100" />
          <div className="absolute -top-32 right-0 h-[700px] w-[700px] rounded-full bg-[var(--accent-mid)]/20 blur-[140px]" />
          <div className="absolute bottom-0 left-[-10%] h-[400px] w-[600px] rounded-full bg-[var(--gold)]/8 blur-[120px]" />
        </div>
        {/* Gold top stripe */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent" />

        <Container className="relative z-10 py-20 lg:py-28 xl:py-36">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            {/* Left: Copy */}
            <div className="space-y-8 max-w-xl">
              <p className="eyebrow eyebrow-gold">
                <span className="inline-block h-4 w-px bg-[var(--gold)] opacity-70" />
                {localizedCompany.tagline}
              </p>

              <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                {dictionary.home.heroTitle}
              </h1>

              <p className="text-lg leading-relaxed text-slate-300 sm:text-xl">
                {localizedCompany.summary}
              </p>

              {/* CTA row */}
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <Link
                  className={buttonStyles({
                    variant: "gold",
                    size: "xl",
                    className: "shadow-xl shadow-[var(--gold)]/20",
                  })}
                  href={`${withLocalePath(locale, "/contact")}#quote`}
                >
                  {dictionary.cta.requestQuote}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  className={buttonStyles({
                    variant: "secondary",
                    size: "xl",
                    className: "border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/25",
                  })}
                  href={withLocalePath(locale, "/products")}
                >
                  {dictionary.cta.viewProducts}
                </Link>
              </div>

              {/* Trust badges row */}
              {companyStats.length > 0 && (
                <div className="flex flex-wrap gap-6 border-t border-white/10 pt-8">
                  {companyStats.slice(0, 4).map((s) => (
                    <div key={s.label}>
                      <p className="stat-number text-3xl text-white sm:text-4xl">{s.value}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Visual panel */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 rounded-3xl bg-[var(--gold)]/8 blur-2xl" />
              <div className="card-dark relative overflow-hidden rounded-2xl">
                {/* Fake browser chrome */}
                <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[.03] px-5 py-3.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-3 flex-1 rounded bg-white/5 px-3 py-1 text-center text-[10px] text-slate-500">
                    {localizedCompany.companyName}
                  </span>
                </div>
                {/* Image */}
                <div className="relative">
                  <Image
                    src="/brand/operations.svg"
                    alt={heroVisualTitle}
                    width={960}
                    height={720}
                    priority
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 36rem, 100vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/80 via-[var(--charcoal)]/20 to-transparent" />
                  {/* Floating stat pills */}
                  <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-2 p-5">
                    {companyStats.slice(0, 3).map((s) => (
                      <div key={s.label} className="rounded-xl border border-white/10 bg-black/50 p-3 text-center backdrop-blur-sm">
                        <p className="stat-number text-xl text-white">{s.value}</p>
                        <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════ HIGHLIGHTS ════════════════════ */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.whyEyebrow}
            title={dictionary.home.whyTitle}
            description={dictionary.home.whyDescription}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homeHighlights.map((h, idx) => (
              <article key={h.title} className="card group p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
                  <span className="stat-number text-xl text-[var(--accent)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold">{h.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{h.description}</p>
                {/* Accent bar on hover */}
                <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] rounded-full transition-all duration-500 group-hover:w-12" />
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ════════════════════ STATS BANNER ════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--accent)] py-16 text-white lg:py-20">
        <div className="pointer-events-none absolute inset-0 texture-dots opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20" />
        <Container className="relative">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {companyStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="stat-number text-5xl text-white lg:text-6xl">{s.value}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-blue-200">
                  {s.label}
                </p>
                <div className="mx-auto mt-4 h-[2px] w-8 rounded-full bg-[var(--gold-light)]/60" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════ PRODUCTS ════════════════════ */}
      {featuredProducts.length > 0 && (
        <Section className="bg-[var(--background)]">
          <Container>
            <div className="mb-14 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow={dictionary.home.productsEyebrow}
                title={dictionary.home.productsTitle}
                description={dictionary.home.productsDescription}
              />
              <Link
                href={withLocalePath(locale, "/products")}
                className={buttonStyles({ variant: "outline", size: "md", className: "shrink-0" })}
              >
                {dictionary.cta.viewProducts}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <article key={product.slug} className="card group overflow-hidden bg-white">
                  {/* Product image */}
                  <div className="aspect-[4/3] overflow-hidden bg-[var(--surface-raised)] relative">
                    <Image
                      src={product.heroImage}
                      alt={product.heroImageAlt}
                      width={600}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute top-3 left-3 rounded-md bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-7">
                    <h3 className="mb-2 text-xl font-bold leading-snug">
                      <Link
                        href={withLocalePath(locale, `/products/${product.slug}`)}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-[var(--muted)] line-clamp-2">
                      {product.description}
                    </p>

                    {/* Key specs */}
                    <div className="mb-5 space-y-2.5 rounded-xl bg-[var(--background)] p-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted)]">{dictionary.home.moq}</span>
                        <span className="font-semibold text-[var(--foreground)]">{product.moq}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted)]">{dictionary.home.leadTime}</span>
                        <span className="font-semibold text-[var(--foreground)]">{product.leadTime}</span>
                      </div>
                    </div>

                    <Link
                      href={withLocalePath(locale, `/products/${product.slug}`)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition-all hover:gap-3"
                    >
                      {dictionary.products?.openDetail ?? "View Details"}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ════════════════════ INDUSTRIES ════════════════════ */}
      {featuredIndustries.length > 0 && (
        <Section className="bg-white">
          <Container>
            <SectionHeading
              eyebrow={dictionary.home.industryEyebrow}
              title={dictionary.home.industryTitle}
              description={dictionary.home.industryDescription}
              align="center"
            />

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredIndustries.map((industry) => (
                <article key={industry.slug} className="card group relative overflow-hidden p-8">
                  {/* Gold accent corner */}
                  <div className="absolute right-0 top-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-[var(--gold-soft)] transition-all duration-500 group-hover:translate-x-6 group-hover:-translate-y-6" />

                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold-soft)]">
                      <svg className="h-6 w-6 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                      </svg>
                    </div>

                    <h3 className="mb-3 text-xl font-bold">
                      <Link
                        href={withLocalePath(locale, `/industries/${industry.slug}`)}
                        className="hover:text-[var(--gold)] transition-colors"
                      >
                        {industry.name}
                      </Link>
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
                      {industry.summary}
                    </p>
                    <Link
                      href={withLocalePath(locale, `/industries/${industry.slug}`)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition-all hover:gap-3"
                    >
                      {dictionary.industries?.open ?? "Explore"}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ════════════════════ BLOG INSIGHTS ════════════════════ */}
      {featuredPosts.length > 0 && (
        <Section className="bg-[var(--background)]">
          <Container>
            <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow={dictionary.home.insightsEyebrow}
                title={dictionary.home.insightsTitle}
                description={dictionary.home.insightsDescription}
              />
              <Link
                href={withLocalePath(locale, "/blog")}
                className={buttonStyles({ variant: "outline", size: "md", className: "shrink-0" })}
              >
                {(dictionary.home as Record<string, string>)["viewAllPosts"] ?? "All Posts"}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <article key={post.slug} className="card group flex flex-col overflow-hidden bg-white">
                  <div className="flex-1 p-7">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      {post.category && (
                        <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                          {post.category}
                        </span>
                      )}
                      {post.readingTime && (
                        <span className="text-xs text-[var(--muted)]">{post.readingTime}</span>
                      )}
                    </div>
                    <h3 className="mb-3 text-lg font-bold leading-snug">
                      <Link
                        href={withLocalePath(locale, `/blog/${post.slug}`)}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--muted)] line-clamp-3">{post.summary}</p>
                  </div>
                  <div className="border-t border-[var(--line)] px-7 py-4">
                    <Link
                      href={withLocalePath(locale, `/blog/${post.slug}`)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition-all hover:gap-3"
                    >
                      Read more
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ════════════════════ FAQ ════════════════════ */}
      {localizedFaq.length > 0 && (
        <Section className="bg-white">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow={dictionary.home.faqEyebrow}
                  title={dictionary.home.faqTitle}
                  description={dictionary.home.faqDescription}
                />
                <div className="mt-10 hidden lg:block">
                  <CTAGroup locale={locale} />
                </div>
              </div>
              <FAQList items={localizedFaq} />
            </div>
          </Container>
        </Section>
      )}

      {/* ════════════════════ FINAL CTA ════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--charcoal)] py-20 text-white lg:py-28">
        <div className="pointer-events-none absolute inset-0 texture-dots opacity-100" />
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[var(--accent-mid)]/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[var(--gold)]/8 blur-[100px]" />
        {/* Gold top stripe */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <p className="eyebrow eyebrow-gold justify-center">
              <span className="inline-block h-px w-6 bg-[var(--gold)] opacity-70" />
              {dictionary.home.finalEyebrow}
            </p>
            <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {dictionary.home.finalTitle}
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-400">
              {dictionary.home.finalDescription}
            </p>
            <div className="pt-2">
              <CTAGroup locale={locale} tone="dark" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
