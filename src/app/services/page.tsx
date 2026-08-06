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
    copy: "Finding your dream home has never been easier. Whether you’re a first-time buyer or a seasoned investor, our dedicated agents provide personalized guidance, market expertise, and strategic negotiation to ensure your purchase is seamless and rewarding.",
    benefits: [
      "Property discovery",
      "Market expertise",
      "Personalized guidance",
      "Strategic negotiation",
      "Transaction support",
    ],
    cta: "Buy a Home",
    href: "/home-search",
    image: "/images/hero/statement-residence.jpg",
    layout: "split" as const,
  },
  {
    id: "sell",
    number: "02",
    title: "Sell a Home",
    copy: "Selling your property doesn’t have to be complicated. Our expert real estate agents help you price strategically, market effectively, and negotiate confidently—ensuring you achieve maximum value with minimal stress. List your property with us and experience the Commonwealth Realty difference.",
    benefits: [
      "Strategic pricing",
      "Effective marketing",
      "Confident negotiation",
      "Maximum value focus",
      "Listing support",
    ],
    cta: "Sell a Home",
    href: "/contact",
    image: "/images/hero/statement-detail.jpg",
    layout: "stacked" as const,
  },
  {
    id: "commercial",
    number: "03",
    title: "Commercial",
    copy: "Looking for the ideal commercial property to elevate your business? Our experienced team connects you with prime office spaces, retail locations, and industrial properties designed to maximize your investment and business success. Trust Commonwealth Realty to deliver strategic solutions tailored to your specific commercial needs.",
    benefits: [
      "Office spaces",
      "Retail locations",
      "Industrial properties",
      "Investment strategy",
      "Business-focused solutions",
    ],
    cta: "Learn More",
    href: "/properties?category=commercial",
    image: "/images/hero/cta-architecture.jpg",
    layout: "editorial" as const,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Services"
        description="Personalized guidance for buying, selling, and commercial real estate throughout Central Florida."
        image="/images/hero/statement-residence.jpg"
        imageAlt="Central Florida residence exterior"
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
