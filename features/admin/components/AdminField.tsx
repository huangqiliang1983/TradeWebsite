import type { ReactNode } from "react";

type AdminFieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

export function AdminField({ label, hint, children }: AdminFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[var(--foreground)]">{label}</span>
      {children}
      {hint ? <span className="text-xs text-[var(--muted)]">{hint}</span> : null}
    </label>
  );
}
