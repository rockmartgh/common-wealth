import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { HomeSearchForm } from "@/components/HomeSearchForm";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Home Search",
  description:
    "Search Central Florida homes with guidance from Commonwealth Realty—designed for first-time and experienced buyers alike.",
};

export default function HomeSearchPage() {
  const residential = properties.filter(
    (property) => property.category === "residential"
  );

  return (
    <>
      <PageHero
        eyebrow="Home Search"
        title="Search With Clarity. Decide With Confidence."
        description="A focused starting point for buyers—whether you are beginning the process or refining a short list."
        image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Welcoming Central Florida home exterior"
      />

      <section className="section bg-cream">
        <div className="site-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow">Guided Search</p>
              <h2 className="display mt-4 text-4xl">
                Tell Us What You’re Looking For
              </h2>
              <p className="mt-5 lede">
                Use the search tools below to explore available homes, or share
                your criteria and we will help narrow the field.
              </p>
              <div className="mt-8 border border-stone bg-ivory p-6">
                <p className="text-sm leading-relaxed text-olive">
                  Prefer personal assistance? Renee specializes in first-time
                  buyers and can walk you through neighborhoods, budgets, and
                  next steps.
                </p>
                <div className="mt-5">
                  <Button href="/team#renee-reed" variant="secondary">
                    Speak With Renee
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="border border-stone bg-ivory p-6 md:p-8">
              <HomeSearchForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-stone bg-ivory">
        <div className="site-container section">
          <Reveal>
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Current Homes</p>
                <h2 className="display mt-4 text-4xl">Featured Results</h2>
              </div>
              <Button href="/properties" variant="secondary">
                Explore All Properties
              </Button>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {residential.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        headline="Ready for a Private Search?"
        copy="Share your timeline and preferences—we’ll help you move forward with a clear plan."
      />
    </>
  );
}
