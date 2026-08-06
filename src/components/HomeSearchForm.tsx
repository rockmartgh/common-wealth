"use client";

import { useRouter } from "next/navigation";
import { type FormEvent } from "react";
import { Button } from "./Button";

export function HomeSearchForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/properties?category=residential");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="location"
          className="mb-2 block text-sm font-medium text-charcoal"
        >
          Location
        </label>
        <input
          id="location"
          name="location"
          placeholder="City, neighborhood, or ZIP"
          className="field-input"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="price"
          label="Price Range"
          defaultValue=""
          options={[
            { value: "", label: "Select range", disabled: true },
            { value: "400000", label: "Up to $400,000" },
            { value: "600000", label: "Up to $600,000" },
            { value: "900000", label: "Up to $900,000" },
            { value: "any", label: "Any price" },
          ]}
        />
        <SelectField
          id="type"
          label="Property Type"
          defaultValue=""
          options={[
            { value: "", label: "Select type", disabled: true },
            { value: "single", label: "Single Family" },
            { value: "townhome", label: "Townhome" },
            { value: "condo", label: "Condo" },
          ]}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="beds"
          label="Bedrooms"
          defaultValue="any"
          options={[
            { value: "any", label: "Any" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
            { value: "4", label: "4+" },
          ]}
        />
        <SelectField
          id="baths"
          label="Bathrooms"
          defaultValue="any"
          options={[
            { value: "any", label: "Any" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
          ]}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Search Homes
      </Button>
    </form>
  );
}

function SelectField({
  id,
  label,
  defaultValue,
  options,
}: {
  id: string;
  label: string;
  defaultValue: string;
  options: { value: string; label: string; disabled?: boolean }[];
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-charcoal">
        {label}
      </label>
      <div className="select-wrap">
        <select id={id} name={id} className="field-input" defaultValue={defaultValue}>
          {options.map((option) => (
            <option
              key={`${id}-${option.value || "empty"}`}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
