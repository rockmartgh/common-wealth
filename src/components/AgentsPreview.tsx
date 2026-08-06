import Image from "next/image";
import { agents } from "@/data/agents";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

type AgentsPreviewProps = {
  /** When true, CTAs go to /contact instead of /team anchors */
  ctaToContact?: boolean;
};

export function AgentsPreview({ ctaToContact = false }: AgentsPreviewProps) {
  return (
    <section className="section bg-ivory">
      <div className="site-container">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Meet the Agents</p>
            <h2 className="display mt-4 text-4xl text-charcoal md:text-5xl">
              Guidance With a Personal Standard
            </h2>
            <p className="mt-5 lede">
              Two experienced advisors, one shared commitment: clear counsel and
              careful attention at every stage of the transaction.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-14 md:grid-cols-2 md:gap-0">
          {agents.map((agent, index) => (
            <Reveal key={agent.slug} delay={index * 80}>
              <article
                id={agent.slug}
                className={`flex h-full flex-col md:px-8 lg:px-10 ${
                  index === 0 ? "md:pl-0 md:pr-10 lg:pr-14" : "md:pl-10 lg:pl-14"
                } ${
                  index > 0
                    ? "border-t border-stone pt-12 md:border-l md:border-t-0 md:pt-0"
                    : ""
                }`}
              >
                <div className="img-zoom relative aspect-[5/4] w-full overflow-hidden bg-stone-soft">
                  <Image
                    src={agent.image}
                    alt={agent.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover object-[center_18%]"
                  />
                </div>

                <div className="mt-7 flex flex-1 flex-col">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    {agent.role}
                  </p>
                  <h3 className="display mt-3 text-3xl text-charcoal md:text-4xl">
                    {agent.name}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-olive">
                    {agent.shortBio}
                  </p>

                  <div className="mt-6 space-y-1 text-sm font-medium text-charcoal">
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

                  <div className="mt-7">
                    <Button
                      href={ctaToContact ? "/contact" : `/team#${agent.slug}`}
                      variant="secondary"
                    >
                      {ctaToContact ? "Schedule a Consultation" : agent.cta}
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
