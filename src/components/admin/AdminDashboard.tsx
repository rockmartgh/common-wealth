"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice, type Property } from "@/data/properties";

type AdminDashboardProps = {
  email: string;
  properties: Property[];
};

const emptyForm = {
  address: "",
  city: "",
  state: "FL",
  zip: "",
  price: "",
  beds: "",
  baths: "",
  sqft: "",
  type: "Single Family",
  status: "For Sale" as Property["status"],
  category: "residential" as Property["category"],
  agentSlug: "anita-boyd" as Property["agentSlug"],
  description: "",
  features: "",
  featured: false,
};

export function AdminDashboard({ email, properties: initial }: AdminDashboardProps) {
  const router = useRouter();
  const [properties, setProperties] = useState(initial);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const sorted = useMemo(
    () =>
      [...properties].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.address.localeCompare(b.address);
      }),
    [properties]
  );

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function uploadImages(slugHint: string) {
    if (!files?.length) {
      throw new Error("Please choose at least one image.");
    }

    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const body = new FormData();
      body.append("file", file);
      body.append("slug", slugHint);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Image upload failed.");
      }
      urls.push(data.url);
    }
    return urls;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const slugHint = form.address || "property";
      const urls = await uploadImages(slugHint);
      const features = form.features
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const response = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          price: Number(form.price),
          beds: form.beds ? Number(form.beds) : undefined,
          baths: form.baths ? Number(form.baths) : undefined,
          sqft: Number(form.sqft),
          type: form.type,
          status: form.status,
          category: form.category,
          agentSlug: form.agentSlug,
          description: form.description,
          features,
          featured: form.featured,
          image: urls[0],
          gallery: urls,
        }),
      });

      const data = (await response.json()) as {
        property?: Property;
        error?: string;
      };

      if (!response.ok || !data.property) {
        throw new Error(data.error || "Unable to save property.");
      }

      setProperties((current) => {
        const next = form.featured
          ? current.map((item) => ({ ...item, featured: false }))
          : current;
        return [data.property!, ...next];
      });
      setForm(emptyForm);
      setFiles(null);
      setSuccess("Property added.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save property.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(slug: string) {
    if (!window.confirm("Delete this property? This cannot be undone.")) {
      return;
    }

    setDeletingSlug(slug);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `/api/admin/properties?slug=${encodeURIComponent(slug)}`,
        { method: "DELETE" }
      );
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to delete property.");
      }
      setProperties((current) => current.filter((item) => item.slug !== slug));
      setSuccess("Property deleted.");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete property."
      );
    } finally {
      setDeletingSlug(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
      <header className="flex flex-col gap-4 border-b border-stone pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h1 className="display mt-3 text-4xl">Properties</h1>
          <p className="mt-2 text-sm text-olive">Signed in as {email}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn btn-secondary">
            View Site
          </Link>
          <button type="button" className="btn btn-secondary" onClick={logout}>
            Sign Out
          </button>
        </div>
      </header>

      {(error || success) && (
        <div className="mt-6">
          {error ? <p className="text-sm text-burgundy">{error}</p> : null}
          {success ? <p className="text-sm text-olive">{success}</p> : null}
        </div>
      )}

      <section className="mt-10">
        <h2 className="display text-3xl">Current Listings</h2>
        <div className="mt-6 space-y-4">
          {sorted.length === 0 ? (
            <p className="border border-stone bg-ivory p-6 text-olive">
              No properties yet. Add one below.
            </p>
          ) : (
            sorted.map((property) => (
              <article
                key={property.slug}
                className="grid gap-4 border border-stone bg-ivory p-4 sm:grid-cols-[120px_1fr_auto]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-soft">
                  <Image
                    src={property.image}
                    alt={property.address}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold">
                      {property.status}
                    </span>
                    {property.featured ? (
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-burgundy">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl">{property.address}</h3>
                  <p className="text-sm text-olive">
                    {property.city}, {property.state} {property.zip}
                  </p>
                  <p className="mt-2 text-burgundy">{formatPrice(property.price)}</p>
                </div>
                <div className="flex items-start gap-3 sm:flex-col sm:items-end">
                  <Link
                    href={`/properties/${property.slug}`}
                    className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-charcoal hover:text-burgundy"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-burgundy"
                    disabled={deletingSlug === property.slug}
                    onClick={() => onDelete(property.slug)}
                  >
                    {deletingSlug === property.slug ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="mt-14 border border-stone bg-ivory p-6 md:p-8">
        <h2 className="display text-3xl">Add Property</h2>
        <p className="mt-2 text-sm text-olive">
          Upload one or more photos. The first image becomes the primary photo.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
          <Field
            label="Address"
            value={form.address}
            onChange={(value) => setForm((f) => ({ ...f, address: value }))}
            required
          />
          <Field
            label="City"
            value={form.city}
            onChange={(value) => setForm((f) => ({ ...f, city: value }))}
            required
          />
          <Field
            label="State"
            value={form.state}
            onChange={(value) => setForm((f) => ({ ...f, state: value }))}
            required
          />
          <Field
            label="ZIP"
            value={form.zip}
            onChange={(value) => setForm((f) => ({ ...f, zip: value }))}
            required
          />
          <Field
            label="Price"
            type="number"
            value={form.price}
            onChange={(value) => setForm((f) => ({ ...f, price: value }))}
            required
          />
          <Field
            label="Square Feet"
            type="number"
            value={form.sqft}
            onChange={(value) => setForm((f) => ({ ...f, sqft: value }))}
            required
          />
          <Field
            label="Bedrooms"
            type="number"
            value={form.beds}
            onChange={(value) => setForm((f) => ({ ...f, beds: value }))}
          />
          <Field
            label="Bathrooms"
            type="number"
            step="0.5"
            value={form.baths}
            onChange={(value) => setForm((f) => ({ ...f, baths: value }))}
          />
          <Field
            label="Property Type"
            value={form.type}
            onChange={(value) => setForm((f) => ({ ...f, type: value }))}
            required
          />

          <Select
            label="Status"
            value={form.status}
            onChange={(value) =>
              setForm((f) => ({
                ...f,
                status: value as Property["status"],
              }))
            }
            options={[
              "For Sale",
              "Pending",
              "Sold",
              "Commercial",
            ]}
          />
          <Select
            label="Category"
            value={form.category}
            onChange={(value) =>
              setForm((f) => ({
                ...f,
                category: value as Property["category"],
              }))
            }
            options={["residential", "commercial"]}
          />
          <Select
            label="Listing Agent"
            value={form.agentSlug}
            onChange={(value) =>
              setForm((f) => ({
                ...f,
                agentSlug: value as Property["agentSlug"],
              }))
            }
            options={[
              { value: "anita-boyd", label: "Anita Boyd" },
              { value: "renee-reed", label: "Renee Reed" },
            ]}
          />

          <div className="md:col-span-2">
            <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-olive">
              Description
            </label>
            <textarea
              required
              rows={5}
              value={form.description}
              onChange={(event) =>
                setForm((f) => ({ ...f, description: event.target.value }))
              }
              className="field-input min-h-[140px]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-olive">
              Features (one per line)
            </label>
            <textarea
              rows={4}
              value={form.features}
              onChange={(event) =>
                setForm((f) => ({ ...f, features: event.target.value }))
              }
              className="field-input min-h-[120px]"
              placeholder="Quiet cul-de-sac setting"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-olive">
              Photos
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              required
              onChange={(event) => setFiles(event.target.files)}
              className="block w-full text-sm text-olive file:mr-4 file:border file:border-stone file:bg-cream file:px-4 file:py-2 file:text-[0.7rem] file:font-semibold file:uppercase file:tracking-[0.14em] file:text-charcoal"
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-charcoal md:col-span-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                setForm((f) => ({ ...f, featured: event.target.checked }))
              }
            />
            Mark as featured listing
          </label>

          <div className="md:col-span-2">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving…" : "Add Property"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  step?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-olive">
        {label}
      </label>
      <input
        type={type}
        step={step}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<string | { value: string; label: string }>;
}) {
  return (
    <div>
      <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-olive">
        {label}
      </label>
      <div className="select-wrap">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="field-input"
        >
          {options.map((option) => {
            const item =
              typeof option === "string"
                ? { value: option, label: option }
                : option;
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
