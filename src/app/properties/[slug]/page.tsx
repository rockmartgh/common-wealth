import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { agents } from "@/data/agents";
import {
  formatPrice,
  getPropertyBySlug,
  properties,
} from "@/data/properties";

type PropertyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property" };
  return {
    title: `${property.address}, ${property.city}`,
    description: property.description.slice(0, 150),
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const agent = agents.find((item) => item.slug === property.agentSlug)!;
  const similar = properties
    .filter(
      (item) =>
        item.slug !== property.slug && item.category === property.category
    )
    .slice(0, 3);

  return (
    <>
      <section className="bg-warm-black pt-[calc(var(--utility-h)+var(--header-h))]">
        <div className="site-container py-8">
          <Link
            href="/properties"
            className="focus-ring inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:text-gold-soft"
          >
            ← Back to Properties
          </Link>
        </div>
        <div className="relative min-h-[58vh] overflow-hidden">
          <Image
            src={property.gallery[0]}
            alt={`${property.address} primary view`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-transparent to-warm-black/20" />
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <div>
              <span className="inline-flex border border-gold/40 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">
                {property.status}
              </span>
              <h1 className="display mt-5 text-4xl md:text-5xl">
                {property.address}
              </h1>
              <p className="mt-3 text-lg text-olive">
                {property.city}, {property.state} {property.zip}
              </p>
              <p className="mt-6 font-serif text-5xl text-burgundy">
                {formatPrice(property.price)}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-stone py-6 sm:grid-cols-4">
                {property.beds != null ? (
                  <Fact label="Bedrooms" value={String(property.beds)} />
                ) : null}
                {property.baths != null ? (
                  <Fact label="Bathrooms" value={String(property.baths)} />
                ) : null}
                <Fact
                  label="Square Feet"
                  value={property.sqft.toLocaleString()}
                />
                <Fact label="Type" value={property.type} />
              </div>

              <div className="mt-10">
                <h2 className="display text-3xl">About This Property</h2>
                <p className="mt-5 max-w-2xl leading-relaxed text-olive">
                  {property.description}
                </p>
              </div>

              <div className="mt-10">
                <h2 className="display text-3xl">Features</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {property.features.map((feature) => (
                    <li
                      key={feature}
                      className="border-l border-gold pl-4 text-sm text-charcoal"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {property.gallery.slice(1).map((image, index) => (
                  <div
                    key={image}
                    className="img-zoom relative aspect-[4/3]"
                  >
                    <Image
                      src={image}
                      alt={`${property.address} gallery image ${index + 2}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-12 border border-stone bg-ivory p-6 md:p-8">
                <p className="eyebrow">Location</p>
                <h2 className="display mt-4 text-3xl">
                  {property.city}, Central Florida
                </h2>
                <p className="mt-4 max-w-xl text-olive">
                  Situated within the greater Central Florida market, this
                  property offers access to established neighborhoods, daily
                  conveniences, and regional connections.
                </p>
                <div className="mt-6 flex h-48 items-end border border-stone bg-[linear-gradient(135deg,#E7E1D8_0%,#D9D4CB_45%,#F7F3EC_100%)] p-6">
                  <p className="text-sm tracking-[0.06em] text-charcoal/70">
                    Map placeholder · {property.address}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <aside className="space-y-6 lg:sticky lg:top-36 lg:self-start">
              <div className="border border-stone bg-ivory p-6">
                <p className="eyebrow">Listing Advisor</p>
                <h2 className="display mt-4 text-3xl">{agent.name}</h2>
                <p className="mt-2 text-sm text-olive">{agent.role}</p>
                <div className="mt-5 space-y-2 text-sm">
                  <a
                    href={agent.phoneHref}
                    className="focus-ring block hover:text-burgundy"
                  >
                    {agent.phone}
                  </a>
                  <a
                    href={agent.emailHref}
                    className="focus-ring block hover:text-burgundy"
                  >
                    {agent.email}
                  </a>
                </div>
                <div className="mt-6">
                  <Button href={`/team#${agent.slug}`} variant="secondary">
                    {agent.cta}
                  </Button>
                </div>
              </div>

              <div className="border border-stone bg-cream p-6">
                <h2 className="display text-2xl">Inquire About This Property</h2>
                <div className="mt-6">
                  <ContactForm
                    compact
                    propertyAddress={`${property.address}, ${property.city}`}
                  />
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {similar.length ? (
        <section className="border-t border-stone bg-ivory">
          <div className="site-container section">
            <Reveal>
              <p className="eyebrow">Continue Exploring</p>
              <h2 className="display mt-4 text-4xl">Similar Properties</h2>
            </Reveal>
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {similar.map((item) => (
                <PropertyCard key={item.slug} property={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-serif text-2xl">{value}</p>
      <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-olive">
        {label}
      </p>
    </div>
  );
}
