import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  aside,
}: PageHeroProps) {
  return (
    <Section className="texture-grid relative overflow-hidden border-b border-[rgba(23,32,26,0.1)] bg-[var(--surface)] pt-10 md:pt-14">
      <div className="pointer-events-none absolute right-[-8rem] top-[-10rem] h-80 w-80 rounded-full bg-[var(--accent-soft)] opacity-40 blur-3xl" />
      <Container>
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)] lg:items-end">
          <div className="space-y-6">
            {breadcrumbs}
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                {eyebrow}
              </p>
              <h1 className="max-w-3xl text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                {description}
              </p>
            </div>
            {actions}
          </div>
          {aside ? <div className="lg:justify-self-end">{aside}</div> : null}
        </div>
      </Container>
    </Section>
  );
}
