"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "./Button";

type ContactFormProps = {
  compact?: boolean;
  propertyAddress?: string;
  /** Matches the Contact Us page field set */
  variant?: "inquiry" | "details";
};

const interests = [
  "Buying a Home",
  "Selling a Home",
  "Commercial Real Estate",
  "General Question",
] as const;

export function ContactForm({
  compact = false,
  propertyAddress,
  variant = "inquiry",
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const baseId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload =
      variant === "details"
        ? {
            variant,
            firstName: String(data.get("firstName") ?? ""),
            secondName: String(data.get("secondName") ?? ""),
            email: String(data.get("email") ?? ""),
            phone: String(data.get("phone") ?? ""),
            message: String(data.get("message") ?? ""),
          }
        : {
            variant,
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
            phone: String(data.get("phone") ?? ""),
            interest: String(data.get("interest") ?? ""),
            message: String(data.get("message") ?? ""),
            propertyAddress: propertyAddress ?? "",
          };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message.");
      }

      setSubmitted(true);
      form.reset();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send your message."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-stone bg-cream p-8">
        <p className="eyebrow">Thank You</p>
        <h3 className="display mt-4 text-3xl text-charcoal">
          We received your message.
        </h3>
        <p className="mt-4 text-olive">
          A member of the Commonwealth Realty team will be in touch shortly.
        </p>
      </div>
    );
  }

  if (variant === "details") {
    return (
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="First Name"
            id={`${baseId}-first-name`}
            name="firstName"
            required
            autoComplete="given-name"
            disabled={submitting}
          />
          <Field
            label="Second Name"
            id={`${baseId}-second-name`}
            name="secondName"
            required
            autoComplete="family-name"
            disabled={submitting}
          />
        </div>

        <Field
          label="Phone Number"
          id={`${baseId}-phone`}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          disabled={submitting}
        />

        <Field
          label="Email"
          id={`${baseId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={submitting}
        />

        <div>
          <label
            htmlFor={`${baseId}-message`}
            className="mb-2 block text-sm font-medium text-charcoal"
          >
            Message
          </label>
          <textarea
            id={`${baseId}-message`}
            name="message"
            rows={5}
            required
            className="field-input"
            disabled={submitting}
          />
        </div>

        {error ? <p className="text-sm text-burgundy">{error}</p> : null}

        <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Sending…" : "Submit"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {propertyAddress ? (
        <p className="border border-stone bg-cream px-4 py-3 text-sm text-olive">
          Inquiring about:{" "}
          <span className="font-medium text-charcoal">{propertyAddress}</span>
        </p>
      ) : null}

      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field
          label="Name"
          id={`${baseId}-name`}
          name="name"
          required
          autoComplete="name"
          disabled={submitting}
        />
        <Field
          label="Email"
          id={`${baseId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={submitting}
        />
      </div>

      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field
          label="Phone"
          id={`${baseId}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          disabled={submitting}
        />
        <div>
          <label
            htmlFor={`${baseId}-interest`}
            className="mb-2 block text-sm font-medium text-charcoal"
          >
            I’m Interested In
          </label>
          <div className="select-wrap">
            <select
              id={`${baseId}-interest`}
              name="interest"
              required
              defaultValue=""
              className="field-input"
              disabled={submitting}
            >
              <option value="" disabled>
                Select an option
              </option>
              {interests.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor={`${baseId}-message`}
          className="mb-2 block text-sm font-medium text-charcoal"
        >
          Message
        </label>
        <textarea
          id={`${baseId}-message`}
          name="message"
          rows={compact ? 4 : 5}
          required
          className="field-input"
          disabled={submitting}
        />
      </div>

      {error ? <p className="text-sm text-burgundy">{error}</p> : null}

      <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}

function Field({
  label,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-charcoal">
        {label}
      </label>
      <input id={id} className="field-input" {...props} />
    </div>
  );
}
