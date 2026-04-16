import Link from "next/link";

import { StructuredData } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTAGroup } from "@/features/marketing/components/CTAGroup";
import { Breadcrumbs } from "@/features/marketing/components/Breadcrumbs";
import { IllustrationPanel } from "@/features/marketing/components/IllustrationPanel";
import { PageHero } from "@/features/marketing/components/PageHero";
import { SectionHeading } from "@/features/marketing/components/SectionHeading";
import { getMarketingDictionary } from "@/features/marketing/copy";
import {
  getHomeLabel,
  localizedMeta,
  localizedVisualText,
  pickLocalizedText,
} from "@/features/marketing/localized-text";
import { getPublishedProducts } from "@/features/marketing/public-content";
import { localizeProduct } from "@/features/marketing/translations";
import { withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: pickLocalizedText(locale, localizedMeta.productsTitle),
    description: pickLocalizedText(locale, localizedMeta.productsDescription),
    path: "/products",
    locale,
    keywords: ["product catalog", "B2B product page", "OEM product template"],
  });
}

export default async function ProductsPage() {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const homeHref = withLocalePath(locale, "/");
  const productsHref = withLocalePath(locale, "/products");
  const homeLabel = getHomeLabel(locale);
  const products = (await getPublishedProducts(locale)).map((product) =>
    localizeProduct(locale, product),
  );

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: homeLabel, path: homeHref },
          { name: dictionary.products.eyebrow, path: productsHref },
        ])}
      />

      <PageHero
        eyebrow={dictionary.products.eyebrow}
        title={dictionary.products.title}
        description={dictionary.products.description}
        breadcrumbs={
          <Breadcrumbs items={[{ label: homeLabel, href: homeHref }, { label: dictionary.products.eyebrow }]} />
        }
        actions={
          <CTAGroup
            locale={locale}
            secondaryHref={withLocalePath(locale, "/contact")}
            secondaryLabel={dictionary.cta.talkToSales}
          />
        }
        aside={
          <IllustrationPanel
            src="/brand/product-blueprint.svg"
            alt={pickLocalizedText(locale, localizedVisualText.productPlanningAlt)}
            title={dictionary.products.asideTitle}
            description={dictionary.products.asideDescription}
          />
        }
      />

      <Section className="bg-white py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow={dictionary.products.layoutEyebrow}
            title={dictionary.products.layoutTitle}
          />
          <div className="mt-12 space-y-5">
            {products.map((product) => (
              <article
                key={product.slug}
                className="card-base p-6 md:p-8 bg-white"
              >
                <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <span className="inline-block rounded-lg bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                      {product.category}
                    </span>
                    <h2 className="mt-4 text-2xl font-bold">
                      <Link
                        href={withLocalePath(locale, `/products/${product.slug}`)}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {product.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3.5 bg-[var(--background)] rounded-xl">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{dictionary.products.sku}</span>
                      <span className="text-sm font-bold">{product.sku}</span>
                    </div>
                    <div className="flex justify-between items-center p-3.5 bg-[var(--background)] rounded-xl">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{dictionary.products.moq}</span>
                      <span className="text-sm font-bold">{product.moq}</span>
                    </div>
                    <div className="flex justify-between items-center p-3.5 bg-[var(--background)] rounded-xl">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{dictionary.products.leadTime}</span>
                      <span className="text-sm font-bold">{product.leadTime}</span>
                    </div>
                    <Link
                      href={withLocalePath(locale, `/products/${product.slug}`)}
                      className="inline-flex items-center gap-2 pt-2 text-sm font-bold text-[var(--accent)] hover:gap-3 transition-all"
                    >
                      {dictionary.products.openDetail}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            {products.length === 0 ? (
              <article className="card-base p-8 text-center text-[var(--muted)]">
                {dictionary.products.empty}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
