import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { PropertyFilters } from "@/components/PropertyFilters";
import { Reveal } from "@/components/Reveal";
import {
  formatPrice,
  getFeaturedProperty,
  properties,
} from "@/data/properties";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse residential and commercial properties represented by Commonwealth Realty throughout Central Florida.",
};

type PropertiesPageProps = {
  searchParams?: Promise<{ category?: string }>;
};

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = searchParams ? await searchParams : {};
  const initialCategory =
    params.category === "commercial" || params.category === "residential"
      ? params.category
      : "all";
  const featured = getFeaturedProperty();

  return (
    <>
      <PageHero
        eyebrow="Properties"
        title="Selected Residences & Commercial Opportunities"
        description="A curated view of current listings—presented with clarity, space, and the details that matter."
        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Featured Central Florida residence exterior"
      />

      <section className="section bg-cream">
        <div className="site-container">
          <Reveal>
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Featured</p>
                <h2 className="display mt-4 text-4xl">Highlighted Listing</h2>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="mb-16 grid overflow-hidden border border-stone bg-ivory lg:grid-cols-[1.3fr_1fr]">
              <div className="img-zoom relative min-h-[300px] lg:min-h-[480px]">
                <Image
                  src={featured.image}
                  alt={`${featured.address} in ${featured.city}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <span className="inline-flex w-fit border border-gold/40 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  {featured.status}
                </span>
                <h3 className="display mt-4 text-3xl text-charcoal">
                  {featured.address}
                </h3>
                <p className="mt-2 text-olive">
                  {featured.city}, {featured.state} {featured.zip}
                </p>
                <p className="mt-5 font-serif text-4xl text-burgundy">
                  {formatPrice(featured.price)}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.12em] text-olive">
                  <span>{featured.beds} Beds</span>
                  <span>{featured.baths} Baths</span>
                  <span>{featured.sqft.toLocaleString()} Sq Ft</span>
                </div>
                <div className="mt-8">
                  <Button href={`/properties/${featured.slug}`}>
                    View Property Details
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mb-8">
              <p className="eyebrow">Browse</p>
              <h2 className="display mt-4 text-4xl">All Current Listings</h2>
            </div>
          </Reveal>

          <PropertyFilters
            properties={properties}
            initialCategory={initialCategory}
          />
        </div>
      </section>

      <FinalCta
        headline="Looking for Something Specific?"
        copy="Tell us what you need and we will help identify the right opportunities."
      />
    </>
  );
}
