import Image from "next/image";
import { Button } from "./Button";

export function FinalCta({
  headline = "Ready to Buy, Sell, or Invest?",
  copy = "Connect with Commonwealth Realty for personalized guidance across Central Florida.",
}: {
  headline?: string;
  copy?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-warm-black">
      <Image
        src="/images/hero/cta-architecture.jpg"
        alt="Architectural detail of a Central Florida residence"
        fill
        sizes="100vw"
        quality={90}
        className="object-cover"
      />
      <div className="media-overlay cta-overlay" />
      <div className="site-container relative section text-center">
        <p className="eyebrow !justify-center !text-gold-soft">Next Step</p>
        <h2 className="display text-on-dark mx-auto mt-5 max-w-3xl text-4xl md:text-5xl">
          {headline}
        </h2>
        <p className="text-on-dark-muted mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg">
          {copy}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" variant="light">
            Contact Us
          </Button>
          <Button href="/properties" variant="ghost">
            Explore Properties
          </Button>
        </div>
      </div>
    </section>
  );
}
