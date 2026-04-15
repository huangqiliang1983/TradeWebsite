import React from "react";

import { cx } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Section({ children, className = "", ...props }: SectionProps) {
  return (
    <section className={cx("py-14 md:py-20 lg:py-24", className)} {...props}>
      {children}
    </section>
  );
}
