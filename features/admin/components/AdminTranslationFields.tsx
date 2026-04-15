import { AdminField } from "@/features/admin/components/AdminField";
import {
  adminTranslationLocales,
  type AdminTranslationLocale,
} from "@/features/admin/translations";
import {
  stringifyContentSections,
  stringifyLineList,
  stringifySpecificationLines,
} from "@/features/admin/utils";
import { getTextDirection, i18nConfig } from "@/lib/i18n";

type TranslationRecord = {
  locale: string;
} & Record<string, unknown>;

type TranslationField = {
  name: string;
  label: string;
  kind?: "input" | "textarea" | "lines" | "specifications" | "content";
  sourceName?: string;
  hint?: string;
};

type AdminTranslationFieldsProps = {
  title: string;
  description: string;
  fields: TranslationField[];
  translations?: TranslationRecord[];
};

function getTranslationValue(
  translations: TranslationRecord[] | undefined,
  locale: AdminTranslationLocale,
  field: TranslationField,
) {
  const translation = translations?.find((item) => item.locale === locale);
  const value = translation?.[field.sourceName ?? field.name];

  if (field.kind === "lines") {
    return stringifyLineList(value);
  }

  if (field.kind === "specifications") {
    return stringifySpecificationLines(value);
  }

  if (field.kind === "content") {
    return stringifyContentSections(value);
  }

  return typeof value === "string" ? value : "";
}

function inputName(locale: AdminTranslationLocale, field: TranslationField) {
  return `translation_${locale}_${field.name}`;
}

export function AdminTranslationFields({
  title,
  description,
  fields,
  translations,
}: AdminTranslationFieldsProps) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[var(--foreground)]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{description}</p>
      </div>
      <div className="space-y-3">
        {adminTranslationLocales.map((locale) => (
          <details
            key={locale}
            className="rounded-[1.25rem] border border-[var(--line)] bg-white p-4"
          >
            <summary className="cursor-pointer text-sm font-semibold text-[var(--foreground)]">
              {i18nConfig.localeLabels[locale]}
            </summary>
            <div className="mt-4 space-y-4" dir={getTextDirection(locale)}>
              {fields.map((field) => {
                const value = getTranslationValue(translations, locale, field);
                const name = inputName(locale, field);
                const kind = field.kind ?? "input";

                return (
                  <AdminField key={`${locale}-${name}`} label={field.label} hint={field.hint}>
                    {kind === "input" ? (
                      <input
                        name={name}
                        defaultValue={value}
                        className="min-h-11 rounded-2xl border border-[var(--line)] px-4"
                      />
                    ) : (
                      <textarea
                        name={name}
                        defaultValue={value}
                        className="min-h-24 rounded-2xl border border-[var(--line)] px-4 py-3"
                      />
                    )}
                  </AdminField>
                );
              })}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
