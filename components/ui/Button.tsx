import { cx } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

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
    "inline-flex items-center justify-center rounded-sm border text-center font-black uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-60 disabled:grayscale",
    variant === "primary" &&
      "border-[var(--accent)] bg-[var(--accent)] text-black shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:-translate-y-1 active:translate-y-0 active:shadow-inner",
    variant === "secondary" &&
      "border-white/10 bg-zinc-900 text-white hover:border-white/30 hover:bg-zinc-800 hover:-translate-y-1 active:translate-y-0",
    variant === "outline" &&
      "border-white/20 bg-transparent text-white hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-1 active:translate-y-0",
    variant === "ghost" &&
      "border-transparent bg-transparent text-white hover:bg-white/5",
    size === "sm" && "min-h-10 px-4 text-[10px]",
    size === "md" && "min-h-12 px-6 text-xs",
    size === "lg" && "min-h-14 px-10 text-sm",
    className,
  );
}
