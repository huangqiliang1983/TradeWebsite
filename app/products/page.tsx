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

      <Section>
        <Container>
          <SectionHeading
            eyebrow={dictionary.products.layoutEyebrow}
            title={dictionary.products.layoutTitle}
          />
          <div className="mt-10 space-y-5">
            {products.map((product) => (
              <article
                key={product.slug}
                className="rounded-[2rem] border border-[var(--line)] bg-white p-6 md:p-8"
              >
                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
                      {product.category}
                    </p>
                    <h2 className="mt-3 text-3xl">
                      <Link
                        href={withLocalePath(locale, `/products/${product.slug}`)}
                        className="transition hover:text-[var(--accent)]"
                      >
                        {product.name}
                      </Link>
                    </h2>
                    <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                      {product.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm leading-7 text-[var(--muted)]">
                    <p>{dictionary.products.sku}: {product.sku}</p>
                    <p>{dictionary.products.moq}: {product.moq}</p>
                    <p>{dictionary.products.leadTime}: {product.leadTime}</p>
                    <Link
                      href={withLocalePath(locale, `/products/${product.slug}`)}
                      className="inline-flex pt-3 text-base font-medium text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
                    >
                      {dictionary.products.openDetail}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            {products.length === 0 ? (
              <article className="rounded-[2rem] border border-dashed border-[var(--line)] bg-white p-6 text-base leading-8 text-[var(--muted)]">
                {dictionary.products.empty}
              </article>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
