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
    <Section className="relative overflow-hidden bg-[var(--charcoal)] pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[var(--accent)]/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[var(--gold)]/6 blur-[80px]" />
        <div className="absolute inset-0 texture-grid opacity-30" />
      </div>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)] lg:items-end">
          <div className="space-y-6">
            {breadcrumbs}
            <div className="space-y-4">
              <p className="eyebrow eyebrow-gold">
                {eyebrow}
              </p>
              <h1 className="max-w-3xl text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
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
