import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Property } from "@/data/properties";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group border border-stone/80 bg-cream transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]">
      <Link href={`/properties/${property.slug}`} className="focus-ring block">
        <div className="img-zoom relative aspect-[4/3]">
          <Image
            src={property.image}
            alt={`${property.address}, ${property.city}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 bg-cream/95 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-charcoal">
            {property.status}
          </span>
        </div>

        <div className="p-6">
          <p className="font-serif text-2xl text-burgundy">{formatPrice(property.price)}</p>
          <h3 className="mt-2 text-lg font-medium text-charcoal">
            {property.address}
          </h3>
          <p className="mt-1 text-sm text-olive">
            {property.city}, {property.state} {property.zip}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-stone pt-4 text-xs uppercase tracking-[0.12em] text-olive">
            {property.beds != null ? <span>{property.beds} Beds</span> : null}
            {property.baths != null ? <span>{property.baths} Baths</span> : null}
            <span>{property.sqft.toLocaleString()} Sq Ft</span>
          </div>

          <span className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors group-hover:text-burgundy">
            View Details
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
