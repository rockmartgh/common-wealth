import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Buy, sell, and commercial real estate services from Commonwealth Realty across Central Florida.",
};

const services = [
  {
    id: "buy",
    number: "01",
    title: "Buy a Home",
    copy: "Finding your next home should feel clear and well-supported. Whether you are purchasing for the first time or adding to your portfolio, Commonwealth Realty provides personalized guidance, market insight, and strategic negotiation throughout the process.",
    benefits: [
      "Property discovery",
      "Market guidance",
      "Offer strategy",
      "Negotiation",
      "Transaction support",
    ],
    cta: "Start Your Home Search",
    href: "/home-search",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    layout: "split" as const,
  },
  {
    id: "sell",
    number: "02",
    title: "Sell a Home",
    copy: "Selling your property requires thoughtful positioning, clear communication, and a strong understanding of the market. Commonwealth Realty helps owners prepare, price, market, and negotiate with confidence.",
    benefits: [
      "Pricing strategy",
      "Property preparation",
      "Targeted marketing",
      "Buyer qualification",
      "Negotiation support",
    ],
    cta: "Discuss Selling Your Property",
    href: "/contact",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    layout: "stacked" as const,
  },
  {
    id: "commercial",
    number: "03",
    title: "Commercial Real Estate",
    copy: "Commonwealth Realty helps businesses and investors identify commercial opportunities aligned with their operational needs and long-term objectives.",
    benefits: [
      "Property sourcing",
      "Location evaluation",
      "Investment guidance",
      "Market analysis",
      "Negotiation and transaction support",
    ],
    cta: "Explore Commercial Opportunities",
    href: "/properties?category=commercial",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    layout: "editorial" as const,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Guidance Tailored to the Decision Ahead"
        description="Residential and commercial pathways shaped around clarity, timing, and Central Florida market knowledge."
        image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Architectural exterior detail of a Central Florida home"
      />

      <section className="section bg-cream">
        <div className="site-container space-y-28">
          {services.map((service) => (
            <Reveal key={service.id}>
              <article id={service.id} className="scroll-mt-36">
                {service.layout === "split" ? (
                  <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="img-zoom relative aspect-[5/4]">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <ServiceCopy service={service} />
                  </div>
                ) : null}

                {service.layout === "stacked" ? (
                  <div>
                    <div className="relative mb-10 min-h-[340px] overflow-hidden md:min-h-[420px]">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-warm-black/55 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8 md:p-12">
                        <span className="font-serif text-6xl text-cream/40">
                          {service.number}
                        </span>
                        <h2 className="display mt-2 text-4xl text-cream md:text-5xl">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                      <div>
                        <p className="max-w-2xl text-[1.05rem] leading-relaxed text-olive">
                          {service.copy}
                        </p>
                        <div className="mt-8">
                          <Button href={service.href}>{service.cta}</Button>
                        </div>
                      </div>
                      <BenefitList benefits={service.benefits} />
                    </div>
                  </div>
                ) : null}

                {service.layout === "editorial" ? (
                  <div className="grid gap-10 border border-stone bg-ivory p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                    <div>
                      <span className="font-serif text-6xl text-stone">
                        {service.number}
                      </span>
                      <h2 className="display mt-4 text-4xl md:text-5xl">
                        {service.title}
                      </h2>
                      <p className="mt-6 leading-relaxed text-olive">
                        {service.copy}
                      </p>
                      <div className="mt-8">
                        <Button href={service.href}>{service.cta}</Button>
                      </div>
                    </div>
                    <div className="grid gap-6">
                      <div className="img-zoom relative aspect-[16/10]">
                        <Image
                          src={service.image}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover"
                        />
                      </div>
                      <BenefitList benefits={service.benefits} />
                    </div>
                  </div>
                ) : null}

              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta
        headline="Not Sure Where to Begin?"
        copy="Share your goals and we will help you choose the right path forward."
      />
    </>
  );
}

function ServiceCopy({
  service,
}: {
  service: (typeof services)[number];
}) {
  return (
    <div>
      <span className="font-serif text-6xl text-stone">{service.number}</span>
      <h2 className="display mt-3 text-4xl md:text-5xl">{service.title}</h2>
      <p className="mt-6 text-[1.05rem] leading-relaxed text-olive">
        {service.copy}
      </p>
      <div className="mt-8">
        <BenefitList benefits={service.benefits} />
      </div>
      <div className="mt-9">
        <Button href={service.href}>{service.cta}</Button>
      </div>
    </div>
  );
}

function BenefitList({ benefits }: { benefits: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {benefits.map((benefit) => (
        <li
          key={benefit}
          className="border-l border-gold pl-4 text-sm text-charcoal"
        >
          {benefit}
        </li>
      ))}
    </ul>
  );
}
