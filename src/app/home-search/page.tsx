import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Home Search",
  description:
    "Home search is coming soon from Commonwealth Realty. Contact the team for a private Central Florida property search.",
};

export default function HomeSearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Home Search"
        title="Search With Clarity. Decide With Confidence."
        description="A focused starting point for buyers—whether you are beginning the process or refining a short list."
        image="/images/hero/statement-residence.jpg"
        imageAlt="Welcoming Central Florida home exterior"
      />

      <section className="section bg-cream">
        <div className="site-container">
          <Reveal>
            <div className="border border-stone bg-ivory px-8 py-16 text-center md:px-12 md:py-20">
              <p className="eyebrow">Coming Soon</p>
              <h2 className="display mt-4 text-3xl md:text-4xl">
                Home search is on the way
              </h2>
              <p className="mx-auto mt-5 max-w-xl leading-relaxed text-olive">
                We’re finishing a clearer search experience for Central Florida
                buyers. In the meantime, browse current listings or reach out
                for a private search tailored to your goals.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <Link
                  href="/properties"
                  className="focus-ring group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-charcoal"
                >
                  View Properties
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="focus-ring group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-charcoal"
                >
                  Contact the Team
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta
        headline="Ready for a Private Search?"
        copy="Share your timeline and preferences—we’ll help you move forward with a clear plan."
      />
    </>
  );
}
