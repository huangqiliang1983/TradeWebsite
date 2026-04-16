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
        "rounded-2xl border border-[var(--line)] bg-white p-6 sm:p-8 shadow-sm",
        className,
      )}
    >
      <div className="space-y-3 pb-6 border-b border-slate-100">
        <p className="eyebrow eyebrow-accent">
          {inquiryType === "QUOTE" ? dictionary.form.quoteEyebrow : dictionary.form.contactEyebrow}
        </p>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm leading-relaxed text-[var(--muted)]">{description}</p>
      </div>

      <form
        key={formKey}
        action={formAction}
        className="mt-6 space-y-5"
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
            "rounded-xl px-4 py-3 text-sm",
            state.status === "success" && "bg-emerald-50 text-emerald-800 border border-emerald-200",
            state.status === "error" && "bg-red-50 text-red-700 border border-red-200",
            state.status === "idle" && "bg-slate-50 text-[var(--muted)] border border-slate-200",
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
      className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--accent)] px-8 text-sm font-bold text-white shadow-md shadow-blue-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-dark)] hover:shadow-lg hover:shadow-blue-900/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
      disabled={pending}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
