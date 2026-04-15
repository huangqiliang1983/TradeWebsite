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
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cx(
            "min-h-36 w-full rounded-2xl border bg-white/88 px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--muted)] transition focus:outline-none focus:ring-2 hover:border-[var(--foreground)]/30",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-[var(--line)] focus:ring-[var(--accent)]",
            className,
          )}
          {...props}
        />
        {hint && !error ? <span className="text-sm text-[var(--muted)]">{hint}</span> : null}
        {error ? <span className="text-sm text-red-600">{error}</span> : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
