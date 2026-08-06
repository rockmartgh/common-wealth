import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
  align?: "left" | "center";
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  align = "left",
}: PageHeroProps) {
  return (
    <section className="relative min-h-[58vh] overflow-hidden bg-warm-black">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="media-overlay page-hero-overlay" />
      <div
        className={`site-container relative flex min-h-[58vh] flex-col justify-end pb-16 pt-40 ${
          align === "center" ? "items-center text-center" : "items-start"
        }`}
      >
        <p className="eyebrow !text-gold-soft">{eyebrow}</p>
        <h1 className="display text-on-dark mt-5 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p
            className={`text-on-dark-muted mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
