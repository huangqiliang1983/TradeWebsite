import type { FAQItem } from "@/features/marketing/content";

type FAQListProps = {
  items: FAQItem[];
};

export function FAQList({ items }: FAQListProps) {
  return (
    <div className="divide-y divide-[var(--line)] rounded-[2rem] border border-[var(--line)] bg-[rgba(255,249,239,0.72)]">
      {items.map((item) => (
        <details
          key={item.question}
          className="group p-5 open:bg-white/70 sm:p-6"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold text-[var(--foreground)]">
            <span>{item.question}</span>
            <span className="mt-1 text-[var(--accent)] transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
