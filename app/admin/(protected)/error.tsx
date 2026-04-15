"use client";

import { useMemo } from "react";

import { AdminCard } from "@/features/admin/components/AdminCard";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { ADMIN_LOCALE_COOKIE, getAdminDictionary } from "@/features/admin/copy";

export default function AdminProtectedError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useMemo(() => {
    if (typeof document === "undefined") {
      return "en" as const;
    }

    const value = document.cookie
      .split("; ")
      .find((item) => item.startsWith(`${ADMIN_LOCALE_COOKIE}=`))
      ?.split("=")[1];

    return decodeURIComponent(value ?? "") === "zh-CN" ? ("zh-CN" as const) : ("en" as const);
  }, []);
  const dictionary = getAdminDictionary(locale);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dictionary.error.title}
        description={dictionary.error.description}
      />

      <AdminCard title={dictionary.error.retry}>
        <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
          {locale === "zh-CN"
            ? "这类问题通常会在本地数据库或开发服务启动完成后恢复。请刷新页面，或稍后再试。"
            : "This is usually recoverable after the local database or development server finishes starting. Refresh the page or try again in a moment."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 text-sm font-medium text-white"
        >
          {dictionary.error.retry}
        </button>
      </AdminCard>
    </div>
  );
}
