import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { contactInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Commonwealth Realty for residential and commercial real estate guidance across Central Florida.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Contact Details"
        description="Whether you are buying, selling, or exploring a commercial opportunity, our team is ready to provide clear and personalized guidance."
        image="/images/hero/statement-detail.jpg"
        imageAlt="Quiet residential street with mature landscaping"
      />

      <section className="section bg-cream">
        <div className="site-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <div className="border border-stone bg-ivory p-6 md:p-10">
              <p className="eyebrow">Contact Details</p>
              <h2 className="display mt-4 text-3xl text-charcoal md:text-4xl">
                Get in Touch
              </h2>
              <p className="mt-4 mb-8 text-olive">
                Share a few details and a member of the Commonwealth Realty team
                will follow up promptly.
              </p>
              <ContactForm variant="details" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="lg:pt-2">
              <p className="eyebrow">Direct Contact</p>
              <h2 className="display mt-4 text-3xl text-charcoal md:text-4xl">
                How to Reach Us
              </h2>

              <div className="mt-10 space-y-8">
                <div>
                  <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    Email
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {contactInfo.emails.map((email) => (
                      <li key={email.href}>
                        <a
                          href={email.href}
                          className="focus-ring text-lg text-charcoal transition-colors hover:text-burgundy"
                        >
                          {email.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    Phone Number
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {contactInfo.phones.map((phone) => (
                      <li key={phone.href}>
                        <a
                          href={phone.href}
                          className="focus-ring text-lg text-charcoal transition-colors hover:text-burgundy"
                        >
                          {phone.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    Location
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-charcoal">
                    {contactInfo.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
