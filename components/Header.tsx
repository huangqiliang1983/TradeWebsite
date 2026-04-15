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
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(248,244,237,0.9)] backdrop-blur">
      <Container>
        <div className="flex min-h-18 items-center justify-between gap-4 py-4">
          <Link
            href={homeHref}
            className="flex items-center gap-3 text-[var(--foreground)]"
            onClick={() => setIsOpen(false)}
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--accent)] bg-[var(--accent)] text-sm font-semibold uppercase tracking-[0.18em] text-white">
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
            <span className="block font-heading text-lg leading-none tracking-[0.12em]">
              {company.companyName}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {dictionary.navigation.map((item) => {
              const href = withLocalePath(locale, item.href);

              return (
              <Link
                key={href}
                href={href}
                className={cx(
                  "text-sm font-medium transition",
                  pathname === href
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]",
                )}
                aria-current={pathname === href ? "page" : undefined}
              >
                {item.label}
              </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitch className="shrink-0" onNavigate={() => setIsOpen(false)} />
            <div className="hidden lg:block">
              <Link
                className={buttonStyles({ variant: "primary", size: "md" })}
                href={`${withLocalePath(locale, "/contact")}#quote`}
              >
                {dictionary.cta.requestQuote}
              </Link>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--foreground)] lg:hidden"
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
          "overflow-hidden border-t border-[var(--line)] bg-[var(--background)] transition-[max-height] duration-300 lg:hidden",
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
                  "rounded-2xl px-4 py-3 text-sm font-medium transition",
                  pathname === href
                    ? "bg-[var(--foreground)] text-white"
                    : "bg-white text-[var(--foreground)] hover:bg-[var(--surface)]",
                )}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
              );
            })}
            <Link
              className={buttonStyles({ variant: "primary", size: "md", className: "mt-2" })}
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
