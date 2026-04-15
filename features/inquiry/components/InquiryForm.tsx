"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import type { InquiryType } from "@prisma/client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { getMarketingDictionary } from "@/features/marketing/copy";
import { submitInquiryAction } from "@/features/inquiry/actions";
import { validateInquiryInput } from "@/features/inquiry/schema";
import {
  type InquiryFormState,
  createInquiryState,
} from "@/features/inquiry/types";
import type { Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

type InquiryFormProps = {
  locale: Locale;
  inquiryType: InquiryType;
  sourcePage: string;
  sourceProduct?: string;
  productSlug?: string;
  title: string;
  description: string;
  submitLabel: string;
  successTitle: string;
  className?: string;
};

export function InquiryForm({
  locale,
  inquiryType,
  sourcePage,
  sourceProduct = "",
  productSlug = "",
  title,
  description,
  submitLabel,
  successTitle,
  className,
}: InquiryFormProps) {
  const [startedAt] = useState(() => Date.now().toString());
  const initialState = createInquiryState({
    inquiryType,
    sourcePage,
    sourceProduct,
    productSlug,
    formStartedAt: startedAt,
  });
  const [state, formAction] = useActionState<InquiryFormState, FormData>(
    submitInquiryAction,
    initialState,
  );
  const dictionary = getMarketingDictionary(locale);
  const [clientErrors, setClientErrors] = useState<InquiryFormState["fieldErrors"]>({});
  const utmSourceRef = useRef<HTMLInputElement>(null);
  const utmMediumRef = useRef<HTMLInputElement>(null);
  const utmCampaignRef = useRef<HTMLInputElement>(null);
  const utmTermRef = useRef<HTMLInputElement>(null);
  const utmContentRef = useRef<HTMLInputElement>(null);
  const referrerRef = useRef<HTMLInputElement>(null);

  const fieldErrors = { ...state.fieldErrors, ...clientErrors };
  const formKey = JSON.stringify({
    status: state.status,
    values: state.values,
    message: state.message,
  });

  function hydrateTrackingFields() {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);

    if (utmSourceRef.current) {
      utmSourceRef.current.value = params.get("utm_source") ?? "";
    }
    if (utmMediumRef.current) {
      utmMediumRef.current.value = params.get("utm_medium") ?? "";
    }
    if (utmCampaignRef.current) {
      utmCampaignRef.current.value = params.get("utm_campaign") ?? "";
    }
    if (utmTermRef.current) {
      utmTermRef.current.value = params.get("utm_term") ?? "";
    }
    if (utmContentRef.current) {
      utmContentRef.current.value = params.get("utm_content") ?? "";
    }
    if (referrerRef.current) {
      referrerRef.current.value = document.referrer ?? "";
    }
  }

  function handleClientSubmit(event: React.FormEvent<HTMLFormElement>) {
    hydrateTrackingFields();

    const formData = new FormData(event.currentTarget);
    const parsed = validateInquiryInput({
      inquiryType: formData.get("inquiryType"),
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      country: formData.get("country"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      sourcePage: formData.get("sourcePage"),
      sourceProduct: formData.get("sourceProduct"),
      productSlug: formData.get("productSlug"),
      utmSource: formData.get("utmSource"),
      utmMedium: formData.get("utmMedium"),
      utmCampaign: formData.get("utmCampaign"),
      utmTerm: formData.get("utmTerm"),
      utmContent: formData.get("utmContent"),
      referrer: formData.get("referrer"),
      website: formData.get("website"),
      formStartedAt: formData.get("formStartedAt"),
    });

    if (parsed.success) {
      setClientErrors({});
      return;
    }

    event.preventDefault();

    const errors = parsed.error.issues.reduce<InquiryFormState["fieldErrors"]>(
      (result, issue) => {
        const key = issue.path[0];

        if (typeof key === "string" && !(key in result)) {
          result[key as keyof InquiryFormState["values"]] = issue.message;
        }

        return result;
      },
      {},
    );

    setClientErrors(errors);
  }

  return (
    <div
      id={inquiryType === "QUOTE" || sourcePage.endsWith("/contact") ? "quote" : "contact-form"}
      className={cx(
        "soft-panel rounded-[2rem] border border-[rgba(23,32,26,0.1)] bg-[var(--surface)] p-6 sm:p-8",
        className,
      )}
    >
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
          {inquiryType === "QUOTE" ? dictionary.form.quoteEyebrow : dictionary.form.contactEyebrow}
        </p>
        <h2 className="text-2xl">{title}</h2>
        <p className="text-base leading-7 text-[var(--muted)]">{description}</p>
      </div>

      <form
        key={formKey}
        action={formAction}
        className="mt-6 space-y-4"
        onSubmit={handleClientSubmit}
      >
        <input name="inquiryType" type="hidden" value={state.values.inquiryType} />
        <input name="sourcePage" type="hidden" value={state.values.sourcePage || sourcePage} />
        <input
          name="sourceProduct"
          type="hidden"
          value={state.values.sourceProduct || sourceProduct}
        />
        <input
          name="productSlug"
          type="hidden"
          value={state.values.productSlug || productSlug}
        />
        <input name="utmSource" ref={utmSourceRef} type="hidden" defaultValue={state.values.utmSource} />
        <input name="utmMedium" ref={utmMediumRef} type="hidden" defaultValue={state.values.utmMedium} />
        <input
          name="utmCampaign"
          ref={utmCampaignRef}
          type="hidden"
          defaultValue={state.values.utmCampaign}
        />
        <input name="utmTerm" ref={utmTermRef} type="hidden" defaultValue={state.values.utmTerm} />
        <input
          name="utmContent"
          ref={utmContentRef}
          type="hidden"
          defaultValue={state.values.utmContent}
        />
        <input name="referrer" ref={referrerRef} type="hidden" defaultValue={state.values.referrer} />
        <input name="formStartedAt" type="hidden" value={state.values.formStartedAt || startedAt} />

        <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
          <label htmlFor={`${inquiryType.toLowerCase()}-website`}>{dictionary.form.websiteTrap}</label>
          <input
            id={`${inquiryType.toLowerCase()}-website`}
            name="website"
            autoComplete="off"
            tabIndex={-1}
            defaultValue={state.values.website}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="name"
            label={dictionary.form.fullName}
            placeholder={dictionary.form.fullNamePlaceholder}
            defaultValue={state.values.name}
            error={fieldErrors.name}
            required
            autoComplete="name"
          />
          <Input
            name="email"
            label={dictionary.form.businessEmail}
            placeholder={dictionary.form.businessEmailPlaceholder}
            type="email"
            defaultValue={state.values.email}
            error={fieldErrors.email}
            required
            autoComplete="email"
          />
          <Input
            name="company"
            label={dictionary.form.company}
            placeholder={dictionary.form.companyPlaceholder}
            defaultValue={state.values.company}
            error={fieldErrors.company}
            autoComplete="organization"
          />
          <Input
            name="country"
            label={dictionary.form.country}
            placeholder={dictionary.form.countryPlaceholder}
            defaultValue={state.values.country}
            error={fieldErrors.country}
            autoComplete="country-name"
          />
          <Input
            name="phone"
            label={dictionary.form.phone}
            placeholder={dictionary.form.phonePlaceholder}
            defaultValue={state.values.phone}
            error={fieldErrors.phone}
            autoComplete="tel"
          />
          <Input
            label={dictionary.form.productContext}
            defaultValue={state.values.sourceProduct || sourceProduct || dictionary.form.generalInquiry}
            disabled
            hint={dictionary.form.productContextHint}
          />
        </div>

        <Textarea
          name="message"
          label={inquiryType === "QUOTE" ? dictionary.form.quoteMessageLabel : dictionary.form.contactMessageLabel}
          placeholder={
            inquiryType === "QUOTE"
              ? dictionary.form.quoteMessagePlaceholder
              : dictionary.form.contactMessagePlaceholder
          }
          defaultValue={state.values.message}
          error={fieldErrors.message}
          hint={dictionary.form.validationHint}
          required
        />

        <div
          aria-live="polite"
          className={cx(
            "rounded-2xl px-4 py-3 text-sm",
            state.status === "success" && "bg-emerald-50 text-emerald-800",
            state.status === "error" && "bg-red-50 text-red-700",
            state.status === "idle" && "bg-[var(--surface)] text-[var(--muted)]",
          )}
        >
          {state.status === "success"
            ? `${successTitle} ${state.message}`
            : state.message || dictionary.form.defaultMessage}
        </div>

        <SubmitButton label={submitLabel} pendingLabel={dictionary.form.submitting} />
      </form>
    </div>
  );
}

function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-6 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(168,83,43,0.22)] transition hover:-translate-y-0.5 hover:border-[var(--accent-dark)] hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      disabled={pending}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
