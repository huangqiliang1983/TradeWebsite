"use client";

import { startTransition } from "react";

import { useRouter } from "next/navigation";

import { setAdminLocaleAction } from "@/features/admin/auth-actions";
import { getAdminDictionary } from "@/features/admin/copy";
import type { Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

export function AdminLanguageSwitch({ locale }: { locale: Locale }) {
  const router = useRouter();
  const dictionary = getAdminDictionary(locale);

  function setLocale(nextLocale: Locale) {
    startTransition(async () => {
      await setAdminLocaleAction(nextLocale);
      router.refresh();
    });
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-[var(--line)] bg-white p-1 text-sm"
      aria-label={dictionary.topbar.language}
    >
      {(["en", "zh-CN"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          className={cx(
            "rounded-full px-3 py-2 transition",
            locale === option
              ? "bg-[var(--foreground)] text-white"
              : "text-[var(--muted)] hover:text-[var(--foreground)]",
          )}
        >
          {option === "en" ? "EN" : "中文"}
        </button>
      ))}
    </div>
  );
}
