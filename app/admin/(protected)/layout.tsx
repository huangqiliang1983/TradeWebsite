import { requireAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { AdminTopbar } from "@/features/admin/components/AdminTopbar";
import { getAdminLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();
  const locale = await getAdminLocale();

  return (
    <div className="min-h-screen xl:grid xl:grid-cols-[260px_minmax(0,1fr)]">
      <AdminSidebar locale={locale} />
      <div className="min-w-0">
        <AdminTopbar email={session.email} locale={locale} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
