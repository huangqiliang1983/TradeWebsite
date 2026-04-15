import Link from "next/link";

import { getAdminDictionary } from "@/features/admin/copy";
import type { Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

export function AdminSidebar({
  currentPath,
  locale,
}: {
  currentPath: string;
  locale: Locale;
}) {
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
        {adminNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cx(
              "rounded-2xl px-4 py-3 text-sm font-medium transition",
              currentPath === item.href
                ? "bg-white text-[var(--foreground)]"
                : "text-white/72 hover:bg-white/10 hover:text-white",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
