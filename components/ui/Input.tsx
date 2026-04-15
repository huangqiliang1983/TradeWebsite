import React, { InputHTMLAttributes, useId } from "react";

import { cx } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, hint, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cx(
            "min-h-12 w-full rounded-2xl border bg-white/88 px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--muted)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-[var(--line)] hover:border-[var(--foreground)]/30",
            className,
          )}
          {...props}
        />
        {hint && !error && <span className="text-sm text-[var(--muted)]">{hint}</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
