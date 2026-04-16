import React, { TextareaHTMLAttributes, useId } from "react";

import { cx } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-semibold text-[var(--foreground)]"
          >
            {label}
            {props.required && <span className="ml-0.5 text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cx(
            "min-h-36 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-light)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]",
            error
              ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
              : "border-[var(--line)] hover:border-slate-300",
            className,
          )}
          {...props}
        />
        {hint && !error ? <span className="text-xs text-[var(--muted)]">{hint}</span> : null}
        {error ? <span className="text-xs text-red-600">{error}</span> : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
