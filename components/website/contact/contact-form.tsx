"use client";

import { Icon } from "@iconify/react";
import { ContactCountrySelect } from "@/components/website/contact/contact-country-select";
import { ContactSearchableSelect } from "@/components/website/contact/contact-searchable-select";
import {
  ContactFormField,
  ContactUnderlineInput,
  ContactUnderlineTextarea,
} from "@/components/website/contact/contact-form-field";
import { PrimarySubmitButton } from "@/components/website/primary-button";
import { ApiClientError, apiClient } from "@/lib/api/client";
import { pickLocalizedField } from "@/lib/i18n/content";
import { getContactPageContent } from "@/lib/i18n/contact-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { createContactEnquirySchema } from "@/lib/validations/content";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type ContactService = {
  id: string;
  nameEn: string;
  nameAr: string;
};

type FormState = {
  name: string;
  email: string;
  phoneNumber: string;
  company: string;
  serviceId: string;
  country: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm = (): FormState => ({
  name: "",
  email: "",
  phoneNumber: "",
  company: "",
  serviceId: "",
  country: "",
  message: "",
});

export function ContactForm({
  locale,
  services,
}: {
  locale: SupportedLocale;
  services: ContactService[];
}) {
  const content = getContactPageContent(locale);
  const { form } = content;

  const [values, setValues] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const serviceOptions = useMemo(
    () =>
      services.map((service) => ({
        id: service.id,
        name: pickLocalizedField(service, "name", locale),
      })),
    [services, locale],
  );

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validateClient(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) nextErrors.name = form.errors.required;
    if (!values.email.trim()) nextErrors.email = form.errors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = form.errors.invalidEmail;
    }

    if (!values.phoneNumber.trim()) nextErrors.phoneNumber = form.errors.required;
    else if (!isValidPhoneNumber(values.phoneNumber.trim())) {
      nextErrors.phoneNumber = form.errors.invalidPhone;
    }

    if (!values.serviceId) nextErrors.serviceId = form.errors.selectService;
    if (!values.country.trim()) nextErrors.country = form.errors.selectCountry;
    if (!values.message.trim()) nextErrors.message = form.errors.required;

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phoneNumber: values.phoneNumber.trim(),
      company: values.company.trim() || null,
      serviceId: values.serviceId,
      country: values.country.trim(),
      message: values.message.trim(),
    };

    const parsed = createContactEnquirySchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !fieldErrors[field as keyof FormState]) {
          fieldErrors[field as keyof FormState] =
            field === "email"
              ? form.errors.invalidEmail
              : field === "phoneNumber"
                ? form.errors.invalidPhone
                : form.errors.required;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);

    try {
      await apiClient<{ id: string }>("/api/contact-enquiries", {
        method: "POST",
        body: parsed.data,
      });
      toast.success(form.success);
      setValues(emptyForm());
      setErrors({});
    } catch (error) {
      if (error instanceof ApiClientError && error.code === "VALIDATION_ERROR") {
        toast.error(form.errors.submitFailed);
      } else {
        toast.error(form.errors.submitFailed);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2
        id="contact-form-heading"
        className="website-heading text-[1.75rem] font-bold text-website-text sm:text-[2rem] lg:text-[2.125rem]"
      >
        {form.heading}
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6 sm:mt-8" noValidate>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
          <ContactFormField
            label={form.fullName}
            htmlFor="contact-name"
            required
            error={errors.name}
          >
            <ContactUnderlineInput
              id="contact-name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder={form.placeholders.fullName}
              aria-invalid={Boolean(errors.name)}
            />
          </ContactFormField>

          <ContactFormField
            label={form.email}
            htmlFor="contact-email"
            required
            error={errors.email}
          >
            <ContactUnderlineInput
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder={form.placeholders.email}
              aria-invalid={Boolean(errors.email)}
            />
          </ContactFormField>

          <ContactFormField
            label={form.phone}
            htmlFor="contact-phone"
            required
            error={errors.phoneNumber}
          >
            <ContactUnderlineInput
              id="contact-phone"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.phoneNumber}
              onChange={(event) => updateField("phoneNumber", event.target.value)}
              placeholder={form.placeholders.phone}
              aria-invalid={Boolean(errors.phoneNumber)}
            />
          </ContactFormField>

          <ContactFormField label={form.company} htmlFor="contact-company">
            <ContactUnderlineInput
              id="contact-company"
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(event) => updateField("company", event.target.value)}
              placeholder={form.placeholders.company}
            />
          </ContactFormField>

          <ContactFormField
            label={form.enquiryType}
            htmlFor="contact-service"
            required
            error={errors.serviceId}
          >
            <ContactSearchableSelect
              value={values.serviceId}
              onChange={(serviceId) => updateField("serviceId", serviceId)}
              options={serviceOptions.map((service) => ({
                value: service.id,
                label: service.name,
              }))}
              label={form.enquiryType}
              placeholder={form.placeholders.select}
              searchPlaceholder={form.placeholders.serviceSearch}
              error={errors.serviceId}
              required
            />
          </ContactFormField>

          <ContactFormField
            label={form.country}
            htmlFor="contact-country"
            required
            error={errors.country}
          >
            <ContactCountrySelect
              locale={locale}
              value={values.country}
              onChange={(country) => updateField("country", country)}
              label={form.country}
              placeholder={form.placeholders.select}
              searchPlaceholder={form.placeholders.countrySearch}
              error={errors.country}
              required
            />
          </ContactFormField>
        </div>

        <ContactFormField
          label={form.message}
          htmlFor="contact-message"
          required
          error={errors.message}
        >
          <ContactUnderlineTextarea
            id="contact-message"
            name="message"
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder={form.placeholders.message}
            aria-invalid={Boolean(errors.message)}
          />
        </ContactFormField>

        <PrimarySubmitButton disabled={submitting} aria-busy={submitting}>
          {form.submit}
          <Icon icon="lucide:arrow-right" className="size-4 rtl:rotate-180" aria-hidden />
        </PrimarySubmitButton>
      </form>
    </div>
  );
}
