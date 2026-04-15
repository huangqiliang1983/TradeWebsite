import type { FAQItem } from "@/features/marketing/content";

type FAQListProps = {
  items: FAQItem[];
};

export function FAQList({ items }: FAQListProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)]">
      {items.map((item) => (
        <details
          key={item.question}
          className="group border-b border-[var(--line)] p-6 transition-colors last:border-b-0 open:bg-[var(--surface-strong)]"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold text-[var(--foreground)]">
            <span>{item.question}</span>
            <span className="mt-1 text-2xl font-black leading-none text-[var(--accent)] transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-5 text-base leading-8 text-[var(--muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
