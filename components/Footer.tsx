import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { getMarketingDictionary } from "@/features/marketing/copy";
import type { PublishedCompanyProfile } from "@/features/marketing/public-content";
import { getPublishedProducts } from "@/features/marketing/public-content";
import { localizeProduct } from "@/features/marketing/translations";
import type { Locale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export async function Footer({
  company,
  locale,
}: {
  company: PublishedCompanyProfile;
  locale: Locale;
}) {
  const dictionary = getMarketingDictionary(locale);
  const products = (await getPublishedProducts(locale))
    .slice(0, 3)
    .map((product) => localizeProduct(locale, product));
  const footerNavigation = {
    products: products.map((product) => ({
      label: product.name,
      href: withLocalePath(locale, `/products/${product.slug}`),
    })),
    company: [
      { label: dictionary.footer.about, href: withLocalePath(locale, "/about") },
      { label: dictionary.footer.applications, href: withLocalePath(locale, "/industries") },
      { label: dictionary.footer.insights, href: withLocalePath(locale, "/blog") },
      { label: dictionary.footer.contact, href: withLocalePath(locale, "/contact") },
    ],
    conversion: [
      { label: dictionary.cta.requestQuote, href: `${withLocalePath(locale, "/contact")}#quote` },
      { label: dictionary.footer.emailSales, href: `mailto:${company.email}` },
      { label: dictionary.cta.whatsapp, href: company.whatsapp },
      { label: dictionary.footer.thankYou, href: withLocalePath(locale, "/thank-you") },
    ],
  };

  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[var(--charcoal)] text-white">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.35fr_0.75fr_0.75fr_0.75fr]">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-soft)]">
              {dictionary.footer.eyebrow}
            </p>
            <h2 className="max-w-lg text-3xl leading-tight text-white sm:text-4xl">
              {dictionary.footer.title}
            </h2>
            <p className="max-w-lg text-base leading-8 text-white/72">
              {company.summary}
            </p>
            <div className="space-y-2 border-l border-white/12 pl-4 text-sm text-white/72">
              <p>{company.address}</p>
              <p>{company.phone}</p>
              <p>{company.email}</p>
            </div>
          </div>

          <FooterGroup title={dictionary.footer.products} items={footerNavigation.products} />
          <FooterGroup title={dictionary.footer.company} items={footerNavigation.company} />
          <FooterGroup title={dictionary.footer.conversions} items={footerNavigation.conversion} />
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/56">
          <p>
            © {new Date().getFullYear()} {company.companyName || siteConfig.companyName}. {dictionary.footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterGroup({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/54">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm text-white/72">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="transition hover:text-[var(--accent-soft)]"
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
