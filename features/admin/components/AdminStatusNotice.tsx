import { getAdminDictionary } from "@/features/admin/copy";
import type { Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

export function AdminStatusNotice({
  locale = "en",
  status,
  error,
}: {
  locale?: Locale;
  status?: string;
  error?: string;
}) {
  if (!status && !error) {
    return null;
  }

  const isError = Boolean(error);
  const dictionary = getAdminDictionary(locale);
  const message = error
    ? error
    : status === "saved"
      ? dictionary.common.statusSaved
      : status === "deleted"
        ? dictionary.common.statusDeleted
        : dictionary.common.statusDone;

  return (
    <div
      className={cx(
        "rounded-2xl px-4 py-3 text-sm",
        isError ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800",
      )}
    >
      {message}
    </div>
  );
}
