"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getAdminDictionary } from "@/features/admin/copy";
import type { Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

function isActiveAdminPath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dictionary = getAdminDictionary(locale);
  const adminNavigation = [
    { href: "/admin", label: dictionary.sidebar.dashboard },
    { href: "/admin/company", label: dictionary.sidebar.company },
    { href: "/admin/categories", label: dictionary.sidebar.categories },
    { href: "/admin/products", label: dictionary.sidebar.products },
    { href: "/admin/industries", label: dictionary.sidebar.industries },
    { href: "/admin/blog", label: dictionary.sidebar.blog },
    { href: "/admin/faqs", label: dictionary.sidebar.faqs },
    { href: "/admin/inquiries", label: dictionary.sidebar.inquiries },
  ];

  return (
    <aside className="border-r border-[var(--line)] bg-[var(--foreground)] text-white xl:min-h-screen">
      <div className="border-b border-white/10 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.24em] text-white/60">{dictionary.sidebar.eyebrow}</p>
        <h1 className="mt-3 text-2xl text-white">Remember Everything</h1>
      </div>
      <nav className="flex flex-col gap-2 p-4">
        {adminNavigation.map((item) => {
          const isActive = isActiveAdminPath(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cx(
                "rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-white text-[var(--foreground)] shadow-sm"
                  : "text-white/72 hover:bg-white/10 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
