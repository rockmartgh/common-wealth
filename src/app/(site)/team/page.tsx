import type { Metadata } from "next";
import { AgentsPreview } from "@/components/AgentsPreview";
import { Button } from "@/components/Button";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet Renee Reed and Anita Boyd—experienced advisors guiding residential and commercial real estate across Central Florida.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Meet the Experts Behind Commonwealth Realty"
        description="Experienced guidance, personal attention, and a commitment to helping every client move forward with confidence."
        image="/images/hero/statement-residence.jpg"
        imageAlt="Refined Central Florida residence exterior"
      />

      <section className="section bg-cream">
        <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="display mt-4 text-4xl text-charcoal md:text-5xl">
              Personal Counsel.
              <span className="block italic">Professional Standards.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-olive">
              <p>
                Commonwealth Realty is built on relationships, not volume. We
                take time to understand goals, constraints, and timing—then
                provide guidance that feels clear, grounded, and specific to
                Central Florida.
              </p>
              <p>
                Whether the path leads through a first home purchase, a luxury
                residential sale, or a commercial opportunity, our role is to
                bring calm structure and careful judgment to every decision.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <AgentsPreview ctaToContact />

      <section className="section bg-cream">
        <div className="site-container grid items-center gap-8 border border-stone bg-ivory p-8 md:grid-cols-[1.2fr_auto] md:p-12">
          <div>
            <p className="eyebrow">Work With Us</p>
            <h2 className="display mt-4 text-3xl text-charcoal md:text-4xl">
              Prefer a direct conversation?
            </h2>
            <p className="mt-4 max-w-xl text-olive">
              Reach out to schedule a consultation with Renee or Anita and take
              the next step with clarity.
            </p>
          </div>
          <Button href="/contact">Schedule a Consultation</Button>
        </div>
      </section>

      <FinalCta
        headline="Let’s Find the Right Fit"
        copy="Connect with the Commonwealth Realty team for guidance tailored to your goals."
      />
    </>
  );
}
