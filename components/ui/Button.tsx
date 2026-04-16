import { cx } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg" | "xl";

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cx(
    // Base
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",

    // Variants
    variant === "primary" &&
      "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20 hover:bg-[var(--accent-mid)] hover:-translate-y-px hover:shadow-lg hover:shadow-[var(--accent)]/25 focus-visible:ring-[var(--accent)]",
    variant === "gold" &&
      "bg-[var(--gold)] text-white shadow-md shadow-[var(--gold)]/25 hover:bg-[var(--gold-dark)] hover:-translate-y-px hover:shadow-lg hover:shadow-[var(--gold)]/30 focus-visible:ring-[var(--gold)]",
    variant === "secondary" &&
      "border border-[var(--line)] bg-white text-[var(--foreground)] shadow-sm shadow-black/[.04] hover:border-[rgba(15,42,82,.2)] hover:bg-[var(--surface-raised)] hover:-translate-y-px focus-visible:ring-[var(--accent)]",
    variant === "outline" &&
      "border border-[var(--accent)] bg-transparent text-[var(--accent)] hover:bg-[var(--accent-soft)] hover:-translate-y-px focus-visible:ring-[var(--accent)]",
    variant === "ghost" &&
      "bg-transparent text-[var(--muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--foreground)] focus-visible:ring-[var(--accent)]",

    // Sizes
    size === "sm"  && "h-9  px-4   text-xs",
    size === "md"  && "h-11 px-5   text-sm",
    size === "lg"  && "h-12 px-7   text-sm",
    size === "xl"  && "h-14 px-9   text-base",

    className,
  );
}
