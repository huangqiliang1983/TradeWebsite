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
    <footer className="relative overflow-hidden border-t border-white/5 bg-black text-white">
      <div className="texture-grid-dark pointer-events-none absolute inset-0 opacity-20" />
      <Container className="relative py-16 lg:py-24">
        <div className="grid gap-16 md:grid-cols-2 xl:grid-cols-[1.5fr_0.75fr_0.75fr_0.75fr]">
          <div className="space-y-8">
            <Link href={withLocalePath(locale, "/")} className="inline-flex items-center gap-3">
               <span className="h-10 w-10 flex items-center justify-center rounded-md border border-white/20 bg-zinc-900 text-sm font-black text-[var(--accent)] uppercase tracking-tighter">
                  {company.companyName.slice(0, 2)}
               </span>
               <span className="font-heading text-xl font-black uppercase tracking-tight">{company.companyName}</span>
            </Link>
            <p className="max-w-md text-base leading-8 text-zinc-500">
              {company.summary}
            </p>
            <div className="space-y-4 border-l-2 border-[var(--accent)]/30 pl-6 text-sm text-zinc-400 font-medium">
              <p className="hover:text-white transition-colors capitalize">{company.address}</p>
              <p className="hover:text-white transition-colors">{company.phone}</p>
              <p className="hover:text-white transition-colors">{company.email}</p>
            </div>
          </div>

          <FooterGroup title={dictionary.footer.products} items={footerNavigation.products} />
          <FooterGroup title={dictionary.footer.company} items={footerNavigation.company} />
          <FooterGroup title={dictionary.footer.conversions} items={footerNavigation.conversion} />
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 text-xs font-bold uppercase tracking-widest text-zinc-600 md:flex-row">
          <p>
            © {new Date().getFullYear()} {company.companyName || siteConfig.companyName}.
          </p>
          <p>{dictionary.footer.copyright}</p>
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
      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)]">
        {title}
      </h3>
      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm font-bold text-zinc-400 transition hover:text-white hover:translate-x-1 inline-block"
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
