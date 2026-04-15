import type { FAQItem } from "@/features/marketing/content";

type FAQListProps = {
  items: FAQItem[];
};

export function FAQList({ items }: FAQListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="rounded-3xl border border-[var(--line)] bg-white p-5 open:border-[var(--accent)]/40"
        >
          <summary className="cursor-pointer list-none pr-8 text-lg font-medium text-[var(--foreground)]">
            {item.question}
          </summary>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
