import { AdminLoginForm } from "@/features/admin/components/AdminLoginForm";
import { getAdminDictionary } from "@/features/admin/copy";
import { getAdminLocale } from "@/lib/i18n-server";

export default async function AdminLoginPage() {
  const locale = await getAdminLocale();
  const dictionary = getAdminDictionary(locale);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-[var(--line)] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
          {dictionary.login.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl">{dictionary.login.title}</h1>
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">
          {dictionary.login.description}
        </p>
        <div className="mt-8">
          <AdminLoginForm locale={locale} />
        </div>
      </div>
    </main>
  );
}
