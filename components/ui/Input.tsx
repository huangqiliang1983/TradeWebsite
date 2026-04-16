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
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-[var(--foreground)]"
          >
            {label}
            {props.required && <span className="ml-0.5 text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cx(
            "min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-light)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
              : "border-[var(--line)] hover:border-slate-300",
            className,
          )}
          {...props}
        />
        {hint && !error && <span className="text-xs text-[var(--muted)]">{hint}</span>}
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
