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
  const initials = getBrandInitials(company.companyName) || "MFG";
  const hasUploadedLogo = company.logoImage && !company.logoImage.startsWith("/brand/");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/96 shadow-[0_1px_8px_rgba(13,17,23,.06)] backdrop-blur-md">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link
            href={homeHref}
            className="group flex min-w-0 items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--accent)] text-xs font-black uppercase tracking-wider text-white shadow-md shadow-[var(--accent)]/25 transition-all group-hover:shadow-lg group-hover:shadow-[var(--accent)]/35 group-hover:-translate-y-px">
              {hasUploadedLogo ? (
                <Image
                  src={company.logoImage}
                  alt={company.logoImageAlt}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              ) : (
                initials
              )}
            </span>
            <span className="block truncate text-[17px] font-bold tracking-tight text-[var(--foreground)]">
              {company.companyName}
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {dictionary.navigation.map((item) => {
              const href = withLocalePath(locale, item.href);
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cx(
                    "relative rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-[var(--gold)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2.5">
            <LanguageSwitch className="hidden sm:inline-flex" onNavigate={() => setIsOpen(false)} />

            <div className="hidden lg:block">
              <Link
                className={buttonStyles({ variant: "gold", size: "md" })}
                href={`${withLocalePath(locale, "/contact")}#quote`}
              >
                {dictionary.cta.requestQuote}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Hamburger */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--foreground)] transition-colors lg:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* ── Mobile Menu ── */}
      {isOpen && (
        <div id="mobile-nav" className="border-t border-[var(--line)] bg-white lg:hidden">
          <Container>
            <nav className="flex flex-col py-4 gap-1" aria-label="Mobile">
              {dictionary.navigation.map((item) => {
                const href = withLocalePath(locale, item.href);
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cx(
                      "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                      isActive
                        ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "text-[var(--muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--foreground)]",
                    )}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-4 flex flex-col gap-3 border-t border-[var(--line)] pt-4 px-4">
                <LanguageSwitch onNavigate={() => setIsOpen(false)} />
                <Link
                  className={buttonStyles({ variant: "gold", size: "md", className: "w-full justify-center" })}
                  href={`${withLocalePath(locale, "/contact")}#quote`}
                  onClick={() => setIsOpen(false)}
                >
                  {dictionary.cta.requestQuote}
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
