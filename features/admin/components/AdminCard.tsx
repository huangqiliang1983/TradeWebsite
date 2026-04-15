import type { ReactNode } from "react";

type AdminCardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function AdminCard({ title, description, children }: AdminCardProps) {
  return (
    <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.05)]">
      {title ? <h2 className="text-2xl">{title}</h2> : null}
      {description ? (
        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{description}</p>
      ) : null}
      <div className={title || description ? "mt-6" : ""}>{children}</div>
    </section>
  );
}
