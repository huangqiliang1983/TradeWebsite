import { AdminLanguageSwitch } from "@/components/AdminLanguageSwitch";
import { adminLogoutAction } from "@/features/admin/auth-actions";
import { getAdminDictionary } from "@/features/admin/copy";
import type { Locale } from "@/lib/i18n";

export function AdminTopbar({
  email,
  locale,
}: {
  email: string;
  locale: Locale;
}) {
  const dictionary = getAdminDictionary(locale);

  return (
    <header className="border-b border-[var(--line)] bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
            {dictionary.topbar.eyebrow}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {dictionary.topbar.signedInAs} {email}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <AdminLanguageSwitch locale={locale} />
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--line)] px-5 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--foreground)] hover:bg-[var(--surface)]"
            >
              {dictionary.topbar.signOut}
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
