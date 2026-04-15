"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LanguageSwitch } from "@/components/LanguageSwitch";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getMarketingDictionary } from "@/features/marketing/copy";
import type { PublishedCompanyProfile } from "@/features/marketing/public-content";
import { getLocaleFromPathname, withLocalePath } from "@/lib/i18n";
import { cx } from "@/lib/utils";

function getBrandInitials(companyName: string) {
  return companyName
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Header({ company }: { company: PublishedCompanyProfile }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getMarketingDictionary(locale);
  const homeHref = withLocalePath(locale, "/");
  const initials = getBrandInitials(company.companyName) || "B2";
  const hasUploadedLogo = company.logoImage && !company.logoImage.startsWith("/brand/");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl">
      <Container>
        <div className="flex min-h-18 items-center justify-between gap-3 py-3.5">
          <Link
            href={homeHref}
            className="group flex min-w-0 items-center gap-3 text-[var(--foreground)]"
            onClick={() => setIsOpen(false)}
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/20 bg-zinc-900 text-sm font-black uppercase tracking-[0.18em] text-[var(--accent)] transition group-hover:border-[var(--accent)] group-hover:-translate-y-0.5">
              {hasUploadedLogo ? (
                <Image
                  src={company.logoImage}
                  alt={company.logoImageAlt}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              ) : (
                initials
              )}
            </span>
            <span className="block truncate font-heading text-lg leading-none tracking-[-0.04em] sm:text-xl text-white">
              {company.companyName}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-sm border border-white/10 bg-zinc-900/50 p-1 lg:flex" aria-label="Primary">
            {dictionary.navigation.map((item) => {
              const href = withLocalePath(locale, item.href);

              return (
              <Link
                key={href}
                href={href}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  pathname === href
                    ? "bg-[var(--accent)] text-black font-black"
                    : "text-zinc-400 hover:text-white hover:bg-white/5",
                )}
                aria-current={pathname === href ? "page" : undefined}
              >
                {item.label}
              </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitch className="max-w-[44vw] sm:max-w-none" onNavigate={() => setIsOpen(false)} />
            <div className="hidden lg:block">
              <Link
                className={buttonStyles({ variant: "primary", size: "md", className: "font-black uppercase tracking-widest text-xs" })}
                href={`${withLocalePath(locale, "/contact")}#quote`}
              >
                {dictionary.cta.requestQuote}
              </Link>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-zinc-900/70 text-white lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </Container>

      <div
        id="mobile-navigation"
        className={cx(
          "overflow-hidden border-t border-white/10 bg-zinc-950 transition-[max-height] duration-300 lg:hidden",
          isOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <Container className="py-4">
          <nav className="flex flex-col gap-2" aria-label="Mobile primary">
            {dictionary.navigation.map((item) => {
              const href = withLocalePath(locale, item.href);

              return (
              <Link
                key={href}
                href={href}
                className={cx(
                  "rounded-md px-4 py-3 text-sm font-bold uppercase tracking-wider transition",
                  pathname === href
                    ? "bg-[var(--accent)] text-black"
                    : "bg-zinc-900 text-white hover:bg-zinc-800",
                )}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
              );
            })}
            <Link
              className={buttonStyles({ variant: "primary", size: "md", className: "mt-2 font-black uppercase tracking-widest text-xs" })}
              href={`${withLocalePath(locale, "/contact")}#quote`}
              onClick={() => setIsOpen(false)}
            >
              {dictionary.cta.requestQuote}
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
