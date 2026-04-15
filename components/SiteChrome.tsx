"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteChrome({
  children,
  footer,
  header,
  skipLink,
}: {
  children: ReactNode;
  footer: ReactNode;
  header: ReactNode;
  skipLink: ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminPath) {
    return <>{children}</>;
  }

  return (
    <>
      {skipLink}
      {header}
      <main id="main-content" className="flex min-h-[60vh] flex-1 flex-col">
        {children}
      </main>
      {footer}
    </>
  );
}
