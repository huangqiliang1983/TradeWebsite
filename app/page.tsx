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
  const [company, products, industries, blogPosts, homeFaq] = await Promise.all([
    getPublishedCompanyProfile(locale),
    getPublishedProducts(locale),
    getPublishedIndustries(locale),
    getPublishedBlogPosts(locale),
    getPublishedHomeFaq(locale),
  ]);
  const localizedCompany = localizeCompany(locale, company);
  const localizedProducts = products.map((product) => localizeProduct(locale, product));
  const localizedIndustries = industries.map((industry) => localizeIndustry(locale, industry));
  const localizedBlogPosts = blogPosts.map((post) => localizeBlogPost(locale, post));
  const localizedFaq = getLocalizedHomeFaq(locale, homeFaq);
  const featuredProducts = localizedProducts.slice(0, 3);
  const featuredIndustries = localizedIndustries.slice(0, 3);
  const featuredPosts = localizedBlogPosts.slice(0, 3);
  const companyStats = getLocalizedCompanyStats(locale);
  const homeHighlights = getLocalizedHomeHighlights(locale);
  const heroVisualTitle = pickLocalizedText(locale, localizedVisualText.homepageVisualTitle);

  return (
    <>
      {localizedFaq.length > 0 ? <StructuredData data={faqSchema(localizedFaq)} /> : null}

      <Section className="relative overflow-hidden border-b border-[rgba(255,255,255,0.08)] bg-[var(--charcoal)] py-0 text-white">
        <div className="texture-grid-dark pointer-events-none absolute inset-0 opacity-20" />
        <Container className="relative grid min-h-[calc(100svh-76px)] gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
          <div className="max-w-4xl space-y-7">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                {localizedCompany.tagline}
            </p>
            <h1 className="text-5xl leading-[0.96] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                {dictionary.home.heroTitle}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                {localizedCompany.summary}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                className={buttonStyles({ variant: "primary", size: "lg" })}
                href={`${withLocalePath(locale, "/contact")}#quote`}
              >
                {dictionary.cta.requestQuote}
              </Link>
              <Link
                className={buttonStyles({
                  variant: "secondary",
                  size: "lg",
                  className: "bg-white text-[var(--foreground)]",
                })}
                href={withLocalePath(locale, "/products")}
              >
                {dictionary.cta.viewProducts}
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-start rounded-full px-2 text-sm font-semibold text-white/76 transition hover:text-white sm:justify-center sm:px-5 sm:text-base"
                href={localizedCompany.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
              >
                {dictionary.cta.whatsapp}
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-start rounded-full px-2 text-sm font-semibold text-white/76 transition hover:text-white sm:justify-center sm:px-5 sm:text-base"
                href={`mailto:${localizedCompany.email}`}
              >
                {dictionary.cta.email}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="soft-panel relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="border-b border-white/10 px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                  Export Floor
                </p>
                <h2 className="mt-2 font-heading text-2xl text-white">{heroVisualTitle}</h2>
              </div>
              <Image
                src="/brand/operations.svg"
                alt={heroVisualTitle}
                width={960}
                height={720}
                priority
                className="h-auto w-full"
                sizes="(min-width: 1024px) 36rem, 100vw"
              />
              <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 text-center">
                {companyStats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="bg-white/5 px-3 py-5 transition hover:bg-white/10">
                    <p className="font-heading text-2xl text-white sm:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--surface-strong)]">
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.whyEyebrow}
            title={dictionary.home.whyTitle}
            description={dictionary.home.whyDescription}
          />
          <div className="mt-12 grid gap-0 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] md:grid-cols-3">
            {homeHighlights.map((highlight, index) => (
              <article
                key={highlight.title}
                className="border-b border-[var(--line)] p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-10"
              >
                <p className="font-heading text-4xl text-[var(--accent)]">
                  0{index + 1}
                </p>
                <h2 className="mt-5 text-xl font-semibold text-[var(--foreground)] sm:text-2xl">{highlight.title}</h2>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative border-y border-[var(--line)] bg-[var(--charcoal)] text-white">
        <div className="texture-grid-dark pointer-events-none absolute inset-0 opacity-20" />
        <Container className="relative">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {companyStats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-[var(--accent)] pl-6">
                <p className="font-heading text-5xl text-white sm:text-6xl">{stat.value}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.productsEyebrow}
            title={dictionary.home.productsTitle}
            description={dictionary.home.productsDescription}
          />
          <div className="mt-12 space-y-6">
            {featuredProducts.map((product) => (
              <article
                key={product.slug}
                className="group grid gap-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all hover:-translate-y-1 hover:shadow-lg md:grid-cols-[1fr_240px] md:items-start md:p-8"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    {product.category}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
                    <Link
                      href={withLocalePath(locale, `/products/${product.slug}`)}
                      className="transition hover:text-[var(--accent)]"
                    >
                      {product.name}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">
                    {product.description}
                  </p>
                </div>
                <div className="grid gap-3 rounded-xl bg-[var(--background)] p-5 text-sm text-[var(--muted)] border border-[var(--line)] sm:grid-cols-2 md:grid-cols-1">
                  <p><strong className="text-[var(--foreground)]">{dictionary.home.moq}:</strong> {product.moq}</p>
                  <p><strong className="text-[var(--foreground)]">{dictionary.home.leadTime}:</strong> {product.leadTime}</p>
                  <p><strong className="text-[var(--foreground)]">{dictionary.home.sku}:</strong> {product.sku}</p>
                  <Link
                    href={withLocalePath(locale, `/products/${product.slug}`)}
                    className="mt-2 inline-block font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4 transition group-hover:text-[var(--accent)]"
                  >
                    {dictionary.home.viewProductTemplate}
                  </Link>
                </div>
              </article>
            ))}
            {featuredProducts.length === 0 ? (
              <article className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-6 text-base leading-8 text-[var(--muted)]">
                {dictionary.home.emptyProducts}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="texture-grid border-t border-[var(--line)] bg-[var(--background)]">
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.industryEyebrow}
            title={dictionary.home.industryTitle}
            description={dictionary.home.industryDescription}
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {featuredIndustries.map((industry) => (
              <article key={industry.slug} className="group rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 transition-shadow hover:shadow-md">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {dictionary.home.industryLabel}
                </p>
                <h2 className="mt-4 text-2xl font-bold text-[var(--foreground)]">
                  <Link
                    href={withLocalePath(locale, `/industries/${industry.slug}`)}
                    className="transition group-hover:text-[var(--accent)]"
                  >
                    {industry.name}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                  {industry.summary}
                </p>
              </article>
            ))}
            {featuredIndustries.length === 0 ? (
              <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 text-base leading-8 text-[var(--muted)]">
                {dictionary.home.emptyIndustries}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--surface)]">
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.insightsEyebrow}
            title={dictionary.home.insightsTitle}
            description={dictionary.home.insightsDescription}
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <article key={post.slug} className="group space-y-4">
                <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                  <span className="font-semibold text-[var(--accent)]">{post.category}</span>
                  <span>&bull;</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                  <Link
                    href={withLocalePath(locale, `/blog/${post.slug}`)}
                    className="transition group-hover:text-[var(--accent)]"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-base leading-8 text-[var(--muted)]">{post.summary}</p>
              </article>
            ))}
            {featuredPosts.length === 0 ? (
              <article className="space-y-4 text-base leading-8 text-[var(--muted)]">
                {dictionary.home.emptyPosts}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--line)] bg-[var(--surface-strong)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              eyebrow={dictionary.home.faqEyebrow}
              title={dictionary.home.faqTitle}
              description={dictionary.home.faqDescription}
            />
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
              <FAQList items={localizedFaq} />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="soft-panel relative overflow-hidden rounded-2xl border border-[var(--charcoal)] bg-[var(--charcoal)] p-8 text-white md:p-14 lg:p-20">
            <div className="texture-grid-dark pointer-events-none absolute inset-0 opacity-20" />
            <div className="relative max-w-3xl space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                {dictionary.home.finalEyebrow}
              </p>
              <h2 className="font-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                {dictionary.home.finalTitle}
              </h2>
              <p className="text-base leading-8 text-white/70 sm:text-lg">
                {dictionary.home.finalDescription}
              </p>
              <div className="pt-4">
                <CTAGroup locale={locale} tone="dark" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
