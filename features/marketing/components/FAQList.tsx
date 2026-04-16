import type { FAQItem } from "@/features/marketing/content";

type FAQListProps = {
  items: FAQItem[];
  theme?: "light" | "dark";
};

export function FAQList({ items, theme = "light" }: FAQListProps) {
  const isDark = theme === "dark";
  return (
    <div className={`divide-y overflow-hidden rounded-2xl border ${
      isDark
        ? "divide-white/8 border-white/10 bg-white/[.04]"
        : "divide-[var(--line)] border-[var(--line)] bg-white shadow-sm"
    }`}>
      {items.map((item) => (
        <details
          key={item.question}
          className={`group p-6 transition-colors sm:p-7 ${
            isDark
              ? "hover:bg-white/[.04] open:bg-white/[.06]"
              : "hover:bg-slate-50/60 open:bg-[var(--accent-soft)]/40"
          }`}
        >
          <summary className={`flex cursor-pointer list-none items-start justify-between gap-6 text-base font-semibold leading-snug ${
            isDark ? "text-white" : "text-[var(--foreground)]"
          }`}>
            <span>{item.question}</span>
            <span className={`mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-lg font-black leading-none transition-transform duration-200 group-open:rotate-45 ${
              isDark
                ? "bg-white/10 text-[var(--gold)]"
                : "bg-[var(--accent-soft)] text-[var(--accent)]"
            }`}>
              +
            </span>
          </summary>
          <p className={`mt-4 text-sm leading-relaxed ${
            isDark ? "text-slate-400" : "text-[var(--muted)]"
          }`}>
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
