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
    "inline-flex items-center justify-center rounded-full border text-center font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-60",
    variant === "primary" &&
      "border-[var(--accent)] bg-[var(--accent)] text-white hover:border-[var(--accent-dark)] hover:bg-[var(--accent-dark)]",
    variant === "secondary" &&
      "border-[var(--line)] bg-white text-[var(--foreground)] hover:border-[var(--foreground)] hover:bg-[var(--surface)]",
    variant === "outline" &&
      "border-[var(--foreground)] bg-transparent text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white",
    variant === "ghost" &&
      "border-transparent bg-transparent text-[var(--foreground)] hover:bg-black/5",
    size === "sm" && "min-h-10 px-4 text-sm",
    size === "md" && "min-h-11 px-5 text-sm sm:text-base",
    size === "lg" && "min-h-12 px-6 text-sm sm:px-7 sm:text-base",
    className,
  );
}
