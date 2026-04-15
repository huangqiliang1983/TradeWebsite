import Link from "next/link";

import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="flex flex-1 items-center">
      <Container>
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-[var(--line)] bg-white p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--accent)]">
            404
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl">
            The page you requested was not found.
          </h1>
          <p className="mt-6 text-base leading-8 text-[var(--muted)] sm:text-lg">
            Use the main navigation to continue exploring products, industry pages, or blog content.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className={buttonStyles({ variant: "primary", size: "lg" })} href="/">
              Back Home
            </Link>
            <Link className={buttonStyles({ variant: "secondary", size: "lg" })} href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
