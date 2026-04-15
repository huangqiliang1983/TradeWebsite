"use client";

import { useActionState } from "react";

import { adminLoginAction, type AdminLoginState } from "@/features/admin/auth-actions";
import { getAdminDictionary } from "@/features/admin/copy";
import type { Locale } from "@/lib/i18n";

const initialState: AdminLoginState = {
  error: "",
  email: "",
};

export function AdminLoginForm({ locale }: { locale: Locale }) {
  const [state, formAction, pending] = useActionState(adminLoginAction, initialState);
  const dictionary = getAdminDictionary(locale);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[var(--foreground)]">{dictionary.login.email}</span>
        <input
          name="email"
          type="email"
          defaultValue={state.email}
          required
          className="min-h-12 rounded-2xl border border-[var(--line)] px-4 text-base"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[var(--foreground)]">{dictionary.login.password}</span>
        <input
          name="password"
          type="password"
          required
          className="min-h-12 rounded-2xl border border-[var(--line)] px-4 text-base"
        />
      </label>
      <div
        aria-live="polite"
        className={`rounded-2xl px-4 py-3 text-sm ${
          state.error ? "bg-red-50 text-red-700" : "bg-[var(--surface)] text-[var(--muted)]"
        }`}
      >
        {state.error || dictionary.login.helper}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-6 text-sm font-medium text-white transition hover:border-[var(--accent-dark)] hover:bg-[var(--accent-dark)] disabled:opacity-70"
      >
        {pending ? dictionary.login.pending : dictionary.login.submit}
      </button>
    </form>
  );
}
