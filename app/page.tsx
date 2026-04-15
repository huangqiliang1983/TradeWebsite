import Link from "next/link";

import { StructuredData } from "@/components/StructuredData";
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
import { IllustrationPanel } from "@/features/marketing/components/IllustrationPanel";
import { SectionHeading } from "@/features/marketing/components/SectionHeading";
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
  const company = localizeCompany(locale, await getPublishedCompanyProfile());

  return buildPageMetadata({
    title:
      locale === "zh-CN"
        ? "企业外贸官网模板与询盘转化方案"
        : company.seoTitle || "Global OEM Manufacturing and Export Solutions",
    description:
      locale === "zh-CN"
        ? company.seoDescription ||
          "面向 Google SEO、产品展示与询盘转化的企业外贸官网模板。"
        : company.seoDescription ||
          "Launch a dependable B2B sourcing website with product visibility, SEO-ready content, and direct request-a-quote paths.",
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
    getPublishedCompanyProfile(),
    getPublishedProducts(),
    getPublishedIndustries(),
    getPublishedBlogPosts(),
    getPublishedHomeFaq(),
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

  return (
    <>
      {localizedFaq.length > 0 ? <StructuredData data={faqSchema(localizedFaq)} /> : null}

      <Section className="overflow-hidden border-b border-[var(--line)] bg-[var(--surface)] pt-12 md:pt-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-end">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--accent)]">
                {localizedCompany.tagline}
              </p>
              <h1 className="max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-7xl">
                {dictionary.home.heroTitle}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                {localizedCompany.summary}
              </p>
              <CTAGroup
                locale={locale}
                primaryHref={`${withLocalePath(locale, "/contact")}#quote`}
                secondaryHref={withLocalePath(locale, "/products")}
                secondaryLabel={dictionary.cta.viewProducts}
              />
            </div>

            <IllustrationPanel
              src={localizedCompany.logoImage}
              alt={localizedCompany.logoImageAlt}
              title={locale === "zh-CN" ? "适合运营与外贸转化的首页结构" : "Operations-ready homepage"}
              description={localizedCompany.description}
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.whyEyebrow}
            title={dictionary.home.whyTitle}
            description={dictionary.home.whyDescription}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {homeHighlights.map((highlight) => (
              <article
                key={highlight.title}
                className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.04)]"
              >
                <h2 className="text-2xl">{highlight.title}</h2>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--foreground)] text-white">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {companyStats.map((stat) => (
              <div key={stat.label} className="border-t border-white/12 pt-5">
                <p className="text-4xl text-white sm:text-5xl">{stat.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/60">
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
          <div className="mt-10 space-y-4">
            {featuredProducts.map((product) => (
              <article
                key={product.slug}
                className="grid gap-4 rounded-[2rem] border border-[var(--line)] bg-white p-6 md:grid-cols-[1.2fr_0.8fr] md:items-start"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
                    {product.category}
                  </p>
                  <h2 className="mt-2 text-3xl">
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
                <div className="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2 md:grid-cols-1">
                  <p>{dictionary.home.moq}: {product.moq}</p>
                  <p>{dictionary.home.leadTime}: {product.leadTime}</p>
                  <p>{dictionary.home.sku}: {product.sku}</p>
                  <Link
                    href={withLocalePath(locale, `/products/${product.slug}`)}
                    className="font-medium text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
                  >
                    {dictionary.home.viewProductTemplate}
                  </Link>
                </div>
              </article>
            ))}
            {featuredProducts.length === 0 ? (
              <article className="rounded-[2rem] border border-dashed border-[var(--line)] bg-white p-6 text-base leading-8 text-[var(--muted)]">
                {dictionary.home.emptyProducts}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--surface)]">
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.industryEyebrow}
            title={dictionary.home.industryTitle}
            description={dictionary.home.industryDescription}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredIndustries.map((industry) => (
              <article key={industry.slug} className="border-t border-[var(--line)] pt-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
                  {dictionary.home.industryLabel}
                </p>
                <h2 className="mt-3 text-2xl">
                  <Link
                    href={withLocalePath(locale, `/industries/${industry.slug}`)}
                    className="transition hover:text-[var(--accent)]"
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
              <article className="border-t border-[var(--line)] pt-5 text-base leading-8 text-[var(--muted)]">
                {dictionary.home.emptyIndustries}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.insightsEyebrow}
            title={dictionary.home.insightsTitle}
            description={dictionary.home.insightsDescription}
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <article key={post.slug} className="space-y-4 border-t border-[var(--line)] pt-5">
                <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                  <span>{post.category}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-2xl">
                  <Link
                    href={withLocalePath(locale, `/blog/${post.slug}`)}
                    className="transition hover:text-[var(--accent)]"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-base leading-8 text-[var(--muted)]">{post.summary}</p>
              </article>
            ))}
            {featuredPosts.length === 0 ? (
              <article className="space-y-4 border-t border-[var(--line)] pt-5 text-base leading-8 text-[var(--muted)]">
                {dictionary.home.emptyPosts}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--surface)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow={dictionary.home.faqEyebrow}
              title={dictionary.home.faqTitle}
              description={dictionary.home.faqDescription}
            />
            <FAQList items={localizedFaq} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-[2.5rem] border border-[var(--line)] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:p-12">
            <SectionHeading
              eyebrow={dictionary.home.finalEyebrow}
              title={dictionary.home.finalTitle}
              description={dictionary.home.finalDescription}
            />
            <div className="mt-6">
              <CTAGroup locale={locale} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
