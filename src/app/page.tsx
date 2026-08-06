import Image from "next/image";
import Link from "next/link";
import { AgentsPreview } from "@/components/AgentsPreview";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { contactInfo } from "@/data/navigation";
import { formatPrice, getFeaturedProperty } from "@/data/properties";

const specialties = [
  "Luxury residential properties",
  "Commercial real estate",
  "First-time homebuyers",
  "Strategic property sales",
  "Personalized guidance",
  "Trusted transactions",
];

const stats = [
  { value: "100+", label: "Residential Transactions" },
  { value: "85+", label: "Commercial Transactions" },
  { value: "99+", label: "Luxury Homes" },
];

const services = [
  {
    id: "buy",
    title: "Buy a Home",
    copy: "Finding your dream home has never been easier. Whether you’re a first-time buyer or a seasoned investor, our dedicated agents provide personalized guidance, market expertise, and strategic negotiation.",
    cta: "Buy a Home",
    href: "/home-search",
    image: "/images/hero/statement-residence.jpg",
  },
  {
    id: "sell",
    title: "Sell a Home",
    copy: "Selling your property doesn’t have to be complicated. Our expert agents help you price strategically, market effectively, and negotiate confidently—so you achieve maximum value with minimal stress.",
    cta: "Sell a Home",
    href: "/contact",
    image: "/images/hero/statement-detail.jpg",
  },
  {
    id: "commercial",
    title: "Commercial",
    copy: "Looking for the ideal commercial property to elevate your business? We connect you with prime office spaces, retail locations, and industrial properties tailored to your goals.",
    cta: "Learn More",
    href: "/services#commercial",
    image: "/images/hero/cta-architecture.jpg",
  },
];

export default function HomePage() {
  const featured = getFeaturedProperty();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden bg-warm-black">
        <Image
          src="/images/hero/lake-eola.jpg"
          alt="Downtown Orlando skyline overlooking Lake Eola"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="media-overlay hero-overlay" />

        <div className="site-container relative flex min-h-[100svh] flex-col justify-end pb-20 pt-44 md:justify-center md:pb-24">
          <div className="max-w-2xl">
            <p className="eyebrow !text-gold-soft">Central Florida Real Estate</p>
            <p className="text-on-dark mt-5 font-serif text-2xl tracking-[0.02em] sm:text-3xl">
              Commonwealth Realty
            </p>
            <h1 className="display text-on-dark mt-4 text-[2.75rem] sm:text-5xl md:text-6xl">
              Find the Right Property.
              <span className="mt-2 block italic">
                Move Forward With Confidence.
              </span>
            </h1>
            <p className="text-on-dark-muted mt-6 max-w-lg text-base leading-relaxed sm:text-lg">
              Commonwealth Realty provides thoughtful residential and commercial
              real estate guidance throughout Central Florida.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/properties" variant="light">
                Explore Properties
              </Button>
              <Button href="/team" variant="ghost">
                Meet the Team
              </Button>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/home-search"
              className="focus-ring group inline-flex items-center gap-3 text-sm font-medium tracking-[0.06em] !text-white"
              style={{ color: "#ffffff" }}
            >
              <span className="h-px w-10 bg-gold transition-all duration-300 group-hover:w-14" />
              Begin a guided home search
            </Link>
            <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.16em] text-[#ebe4d8]">
              <span className="inline-block h-8 w-px bg-gold" />
              Scroll
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section bg-cream">
        <div className="site-container grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="img-zoom relative aspect-[4/5] max-w-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"
                  alt="Sunlit residential interior with refined finishes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 right-0 hidden w-[48%] border border-stone bg-cream p-3 shadow-[var(--shadow-soft)] sm:block lg:-right-8">
                <div className="img-zoom relative aspect-[5/4]">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80"
                    alt="Architectural detail of a Florida home exterior"
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <p className="eyebrow">About Commonwealth Realty</p>
              <h2 className="display mt-5 text-4xl md:text-5xl">
                Your Gateway to Exceptional Living
              </h2>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-olive">
                At Commonwealth Realty, we combine local market knowledge,
                personalized service, and careful attention to detail to guide
                clients through residential and commercial real estate decisions.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-olive">
                Whether you are purchasing your first home, selling a property,
                exploring a luxury residence, or evaluating a commercial
                opportunity, our team provides clear and dependable guidance at
                every stage.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {specialties.map((item) => (
                  <li
                    key={item}
                    className="border-l border-gold/70 pl-4 text-sm text-charcoal"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <Button href="/team">Get to Know Us</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Statistics */}
      <section className="border-y border-stone bg-stone-soft">
        <div className="site-container py-16 md:py-20">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-3 md:gap-0">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center md:px-8 ${
                    index > 0 ? "md:border-l md:border-stone" : ""
                  }`}
                >
                  <p className="font-serif text-5xl text-burgundy md:text-6xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-olive">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Property */}
      <section className="section bg-cream">
        <div className="site-container">
          <Reveal>
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Featured Listing</p>
                <h2 className="display mt-4 text-4xl md:text-5xl">
                  A Closer Look at Longwood
                </h2>
              </div>
              <Link
                href="/properties"
                className="focus-ring group inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-charcoal"
              >
                View All Properties
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="grid overflow-hidden border border-stone bg-ivory lg:grid-cols-[1.35fr_1fr]">
              <div className="img-zoom relative min-h-[320px] lg:min-h-[560px]">
                <Image
                  src={featured.image}
                  alt={`${featured.address} in ${featured.city}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="inline-flex w-fit border border-gold/50 bg-cream px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold">
                  {featured.status}
                </span>
                <h3 className="display mt-5 text-3xl text-charcoal md:text-4xl">
                  {featured.address}
                </h3>
                <p className="mt-2 text-olive">
                  {featured.city}, {featured.state} {featured.zip}
                </p>
                <p className="mt-6 font-serif text-4xl text-burgundy">
                  {formatPrice(featured.price)}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4 border-y border-stone py-5 text-center">
                  <div>
                    <p className="font-serif text-2xl">{featured.beds}</p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-olive">
                      Beds
                    </p>
                  </div>
                  <div className="border-x border-stone">
                    <p className="font-serif text-2xl">{featured.baths}</p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-olive">
                      Baths
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl">
                      {featured.sqft.toLocaleString()}
                    </p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-olive">
                      Sq Ft
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-olive">
                  {featured.description.slice(0, 180)}…
                </p>

                <div className="mt-8">
                  <Button href={`/properties/${featured.slug}`}>
                    View Property
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-ivory">
        <div className="site-container">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">How We Help</p>
              <h2 className="display mt-4 text-4xl md:text-5xl">
                Clear Pathways for Every Decision
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 space-y-8">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 60}>
                <article
                  className={`grid overflow-hidden border border-stone bg-cream lg:grid-cols-2 ${
                    index === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="img-zoom relative min-h-[260px] lg:min-h-[340px]">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <span className="font-serif text-5xl text-stone">
                      0{index + 1}
                    </span>
                    <h3 className="display mt-4 text-3xl md:text-4xl">
                      {service.title}
                    </h3>
                    <p className="mt-5 max-w-md leading-relaxed text-olive">
                      {service.copy}
                    </p>
                    <div className="mt-8">
                      <Button href={service.href} variant="secondary">
                        {service.cta}
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="relative min-h-[52vh] overflow-hidden bg-warm-black">
        <Image
          src="/images/hero/statement-residence.jpg"
          alt="Refined Central Florida residence exterior"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
        <div className="media-overlay statement-overlay" />
        <div className="site-container relative flex min-h-[52vh] flex-col items-start justify-center py-20">
          <Reveal>
            <h2 className="display text-on-dark max-w-3xl text-4xl md:text-6xl">
              Distinctive Properties.
              <span className="mt-2 block italic">Exceptional Experiences.</span>
            </h2>
            <p className="text-on-dark-muted mt-6 max-w-md text-base leading-relaxed md:text-lg">
              Thoughtfully selected residential and commercial opportunities
              throughout Central Florida.
            </p>
          </Reveal>
        </div>
      </section>

      <AgentsPreview />

      {/* Testimonial */}
      <section className="border-y border-stone bg-cream">
        <div className="site-container section !py-20 md:!py-24">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow !justify-center">Client Voices</p>
              <h2 className="display mt-5 text-4xl md:text-5xl">
                Trusted Guidance.
                <span className="block italic">Lasting Relationships.</span>
              </h2>
              <blockquote className="mt-10">
                <p className="font-serif text-2xl leading-relaxed text-charcoal md:text-3xl">
                  “Commonwealth made our first purchase feel clear and
                  manageable. Every conversation was patient, practical, and
                  focused on what mattered to us.”
                </p>
                <footer className="mt-8 text-sm tracking-[0.04em] text-olive">
                  <cite className="not-italic font-medium text-charcoal">
                    The Morales Family
                  </cite>
                  <span className="mx-2 text-stone">·</span>
                  First-Time Purchase
                  <span className="mx-2 text-stone">·</span>
                  Altamonte Springs
                </footer>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="section bg-cream">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="display mt-4 text-4xl md:text-5xl">
                Let’s Start the Conversation
              </h2>
              <p className="mt-5 lede">
                Tell us what you are looking for, and a member of the
                Commonwealth Realty team will be in touch.
              </p>

              <div className="mt-10 space-y-6 border-t border-stone pt-8">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    Phone
                  </p>
                  <div className="mt-3 space-y-2">
                    {contactInfo.phones.map((phone) => (
                      <a
                        key={phone.href}
                        href={phone.href}
                        className="focus-ring block text-lg hover:text-burgundy"
                      >
                        {phone.value}
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    Email
                  </p>
                  <div className="mt-3 space-y-2">
                    {contactInfo.emails.map((email) => (
                      <a
                        key={email.href}
                        href={email.href}
                        className="focus-ring block hover:text-burgundy"
                      >
                        {email.value}
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    Service Area
                  </p>
                  <p className="mt-3 text-lg">{contactInfo.location}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-stone bg-ivory p-6 md:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
