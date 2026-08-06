"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { type Property } from "@/data/properties";

type PropertyFiltersProps = {
  properties: Property[];
  initialCategory?: string;
};

export function PropertyFilters({
  properties,
  initialCategory = "all",
}: PropertyFiltersProps) {
  const [category, setCategory] = useState(initialCategory);
  const [status, setStatus] = useState("all");
  const [beds, setBeds] = useState("all");
  const [maxPrice, setMaxPrice] = useState("all");

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      if (category !== "all" && property.category !== category) return false;
      if (status !== "all" && property.status !== status) return false;
      if (beds !== "all" && (property.beds ?? 0) < Number(beds)) return false;
      if (maxPrice !== "all" && property.price > Number(maxPrice)) return false;
      return true;
    });
  }, [properties, category, status, beds, maxPrice]);

  return (
    <div>
      <div className="grid gap-4 border border-stone bg-ivory p-5 md:grid-cols-4 md:p-6">
        <FilterSelect
          label="Category"
          value={category}
          onChange={setCategory}
          options={[
            { value: "all", label: "All Properties" },
            { value: "residential", label: "Residential" },
            { value: "commercial", label: "Commercial" },
          ]}
        />
        <FilterSelect
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            { value: "all", label: "Any Status" },
            { value: "For Sale", label: "For Sale" },
            { value: "Pending", label: "Pending" },
            { value: "Sold", label: "Sold" },
          ]}
        />
        <FilterSelect
          label="Bedrooms"
          value={beds}
          onChange={setBeds}
          options={[
            { value: "all", label: "Any" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
            { value: "4", label: "4+" },
            { value: "5", label: "5+" },
          ]}
        />
        <FilterSelect
          label="Price Range"
          value={maxPrice}
          onChange={setMaxPrice}
          options={[
            { value: "all", label: "Any Price" },
            { value: "400000", label: "Up to $400k" },
            { value: "600000", label: "Up to $600k" },
            { value: "900000", label: "Up to $900k" },
            { value: "1500000", label: "Up to $1.5M" },
          ]}
        />
      </div>

      <p className="mt-8 text-sm text-olive">
        Showing {filtered.length}{" "}
        {filtered.length === 1 ? "property" : "properties"}
      </p>

      {filtered.length ? (
        <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-stone bg-ivory p-10 text-center">
          <p className="font-serif text-2xl">No matching properties</p>
          <p className="mt-3 text-olive">
            Adjust your filters or contact the team for a private search.
          </p>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
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
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
