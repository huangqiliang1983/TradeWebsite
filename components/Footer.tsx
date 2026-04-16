import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { getMarketingDictionary } from "@/features/marketing/copy";
import type { PublishedCompanyProfile } from "@/features/marketing/public-content";
import { getPublishedProducts } from "@/features/marketing/public-content";
import { localizeProduct } from "@/features/marketing/translations";
import type { Locale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

function getBrandInitials(name: string) {
  return name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export async function Footer({
  company,
  locale,
}: {
  company: PublishedCompanyProfile;
  locale: Locale;
}) {
  const dictionary = getMarketingDictionary(locale);
  const products = (await getPublishedProducts(locale))
    .slice(0, 4)
    .map((p) => localizeProduct(locale, p));

  const nav = {
    products: products.map((p) => ({
      label: p.name,
      href: withLocalePath(locale, `/products/${p.slug}`),
    })),
    company: [
      { label: dictionary.footer.about,        href: withLocalePath(locale, "/about") },
      { label: dictionary.footer.applications, href: withLocalePath(locale, "/industries") },
      { label: dictionary.footer.insights,     href: withLocalePath(locale, "/blog") },
      { label: dictionary.footer.contact,      href: withLocalePath(locale, "/contact") },
    ],
    conversion: [
      { label: dictionary.cta.requestQuote,    href: `${withLocalePath(locale, "/contact")}#quote` },
      { label: dictionary.footer.emailSales,   href: `mailto:${company.email}` },
      { label: dictionary.cta.whatsapp,        href: company.whatsapp },
      { label: dictionary.footer.thankYou,     href: withLocalePath(locale, "/thank-you") },
    ],
  };

  return (
    <footer className="bg-[var(--charcoal)] text-white">
      {/* ── Gold top stripe ── */}
      <div className="h-[3px] bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent" />

      <Container className="py-16 lg:py-20">
        {/* ── Main grid ── */}
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr]">

          {/* Brand column */}
          <div className="space-y-7">
            <Link
              href={withLocalePath(locale, "/")}
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-xs font-black uppercase tracking-wider text-white shadow-md shadow-black/25 transition-all group-hover:shadow-lg group-hover:-translate-y-px">
                {getBrandInitials(company.companyName)}
              </span>
              <span className="text-lg font-bold tracking-tight">{company.companyName}</span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              {company.summary}
            </p>

            {/* Contact block */}
            <ul className="space-y-3 text-sm text-slate-400">
              {company.address && (
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="hover:text-white transition-colors">{company.address}</span>
                </li>
              )}
              {company.phone && (
                <li className="flex items-center gap-3">
                  <svg className="h-4 w-4 shrink-0 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <a href={`tel:${company.phone}`} className="hover:text-white transition-colors">{company.phone}</a>
                </li>
              )}
              {company.email && (
                <li className="flex items-center gap-3">
                  <svg className="h-4 w-4 shrink-0 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">{company.email}</a>
                </li>
              )}
            </ul>
          </div>

          {/* Nav columns */}
          {nav.products.length > 0 && (
            <FooterGroup title={dictionary.footer.products} items={nav.products} />
          )}
          <FooterGroup title={dictionary.footer.company}     items={nav.company} />
          <FooterGroup title={dictionary.footer.conversions} items={nav.conversion} />
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()}&nbsp;
            <span className="font-medium text-slate-400">
              {company.companyName || siteConfig.companyName}
            </span>
            .&nbsp;{dictionary.footer.copyright}
          </p>
          <span className="divider-gold hidden sm:block" />
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
      <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[.16em] text-[var(--gold)]">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
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
