import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { StructuredData } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTAGroup } from "@/features/marketing/components/CTAGroup";
import { FAQList } from "@/features/marketing/components/FAQList";
import { Breadcrumbs } from "@/features/marketing/components/Breadcrumbs";
import { IllustrationPanel } from "@/features/marketing/components/IllustrationPanel";
import { InquiryFormCard } from "@/features/marketing/components/InquiryFormCard";
import { PageHero } from "@/features/marketing/components/PageHero";
import { SectionHeading } from "@/features/marketing/components/SectionHeading";
import { getMarketingDictionary } from "@/features/marketing/copy";
import { getHomeLabel } from "@/features/marketing/localized-text";
import {
  getPublishedProductBySlug,
  getRedirectForPath,
} from "@/features/marketing/public-content";
import { localizeProduct } from "@/features/marketing/translations";
import { withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug, locale);
  const localizedProduct = product ? localizeProduct(locale, product) : null;

  if (!localizedProduct) {
    return buildPageMetadata({
      title: dictionary.productDetail.productNotFound,
      description: dictionary.productDetail.productNotFoundDescription,
      path: "/products",
      locale,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: localizedProduct.seoTitle ?? localizedProduct.name,
    description: localizedProduct.seoDescription ?? localizedProduct.description,
    path: `/products/${localizedProduct.slug}`,
    locale,
    canonicalUrl: locale === "en" ? localizedProduct.seoCanonical ?? undefined : undefined,
    keywords: [localizedProduct.category, localizedProduct.name, "product detail template"],
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const homeHref = withLocalePath(locale, "/");
  const productsHref = withLocalePath(locale, "/products");
  const homeLabel = getHomeLabel(locale);
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug, locale);

  if (!product) {
    const redirectEntry = await getRedirectForPath(`/products/${slug}`);

    if (redirectEntry?.statusCode === 301) {
      permanentRedirect(
        redirectEntry.destinationPath.startsWith("/")
          ? withLocalePath(locale, redirectEntry.destinationPath)
          : redirectEntry.destinationPath,
      );
    }

    notFound();
  }
  const localizedProduct = localizeProduct(locale, product);

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: homeLabel, path: homeHref },
          { name: dictionary.products.eyebrow, path: productsHref },
          { name: localizedProduct.name, path: withLocalePath(locale, `/products/${localizedProduct.slug}`) },
        ])}
      />
      <StructuredData
        data={productSchema({
          name: localizedProduct.name,
          slug: localizedProduct.slug,
          description: localizedProduct.description,
          image: localizedProduct.heroImage,
          category: localizedProduct.category,
          sku: localizedProduct.sku,
          canonicalUrl:
            locale === "en"
              ? localizedProduct.seoCanonical ?? undefined
              : absoluteUrl(withLocalePath(locale, `/products/${localizedProduct.slug}`)),
        })}
      />
      {localizedProduct.faq.length > 0 ? <StructuredData data={faqSchema(localizedProduct.faq)} /> : null}

      <PageHero
        eyebrow={localizedProduct.category}
        title={localizedProduct.heroTitle}
        description={localizedProduct.intro}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: homeLabel, href: homeHref },
              { label: dictionary.products.eyebrow, href: productsHref },
              { label: localizedProduct.name },
            ]}
          />
        }
        actions={<CTAGroup locale={locale} />}
        aside={
          <IllustrationPanel
            src={localizedProduct.heroImage}
            alt={localizedProduct.heroImageAlt}
            title={localizedProduct.name}
            description={dictionary.productDetail.description}
          />
        }
      />

      <Section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow={dictionary.productDetail.sellingEyebrow}
                title={dictionary.productDetail.sellingTitle}
              />
              <div className="mt-8 space-y-4">
                {localizedProduct.sellingPoints.map((point) => (
                  <div key={point} className="flex gap-4 border-t border-slate-100 py-4">
                    <span className="mt-3 h-2 w-2 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    <p className="text-base leading-relaxed text-[var(--muted)]">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--background)] p-6 shadow-sm">
              <p className="eyebrow eyebrow-accent mb-6">
                {dictionary.productDetail.facts}
              </p>
              <dl className="space-y-4">
                <div className="flex justify-between items-center border-t border-[var(--line)] pt-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{dictionary.products.sku}</dt>
                  <dd className="text-sm font-bold text-[var(--foreground)]">{localizedProduct.sku}</dd>
                </div>
                <div className="flex justify-between items-center border-t border-[var(--line)] pt-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{dictionary.products.moq}</dt>
                  <dd className="text-sm font-bold text-[var(--foreground)]">{localizedProduct.moq}</dd>
                </div>
                <div className="flex justify-between items-center border-t border-[var(--line)] pt-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{dictionary.products.leadTime}</dt>
                  <dd className="text-sm font-bold text-[var(--foreground)]">{localizedProduct.leadTime}</dd>
                </div>
              </dl>
              <div className="mt-6 grid gap-3 md:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-xl border border-[var(--line)] bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">{dictionary.productDetail.gallery}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {dictionary.productDetail.galleryDescription}
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--line)] bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">{dictionary.productDetail.video}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {dictionary.productDetail.videoDescription}
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--line)] bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">{dictionary.productDetail.downloads}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {dictionary.productDetail.downloadsDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--background)] py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow={dictionary.productDetail.parametersEyebrow}
            title={dictionary.productDetail.parametersTitle}
          />
          <div className="mt-10 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8 shadow-sm">
            <dl className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {localizedProduct.specifications.map((spec) => (
                <div key={spec.label} className="border-t border-slate-100 pt-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    {spec.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
            {localizedProduct.specifications.length === 0 ? (
              <p className="text-base leading-relaxed text-[var(--muted)]">
                {dictionary.productDetail.emptySpecs}
              </p>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 xl:grid-cols-[0.7fr_1fr_0.95fr]">
            <div>
              <SectionHeading
                eyebrow={dictionary.productDetail.faqEyebrow}
                title={dictionary.productDetail.faqTitle}
              />
              <div className="mt-8">{localizedProduct.faq.length > 0 ? <FAQList items={localizedProduct.faq} /> : <p className="text-base leading-relaxed text-[var(--muted)]">{dictionary.productDetail.emptyFaq}</p>}</div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--background)] p-6 shadow-sm">
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                {dictionary.productDetail.browseText}{" "}
                <Link
                  href={productsHref}
                  className="font-semibold text-[var(--foreground)] underline underline-offset-4 decoration-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  {dictionary.productDetail.browseLink}
                </Link>
                .
              </p>
              <div className="mt-6">
                <CTAGroup locale={locale} />
              </div>
            </div>

            <InquiryFormCard
              locale={locale}
              inquiryType="QUOTE"
              sourcePage={withLocalePath(locale, `/products/${localizedProduct.slug}`)}
              sourceProduct={localizedProduct.name}
              productSlug={localizedProduct.slug}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
