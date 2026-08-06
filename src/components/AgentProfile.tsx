import Image from "next/image";
import { type Agent } from "@/data/agents";
import { AgentSocialLinks } from "./AgentSocialLinks";
import { Button } from "./Button";

type AgentProfileProps = {
  agent: Agent;
  reverse?: boolean;
  detailed?: boolean;
};

export function AgentProfile({
  agent,
  reverse = false,
  detailed = false,
}: AgentProfileProps) {
  return (
    <article
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="img-zoom relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden bg-stone-soft lg:mx-0 lg:max-w-none">
        <Image
          src={agent.image}
          alt={agent.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-[center_15%]"
        />
      </div>

      <div>
        <p className="eyebrow">{agent.role}</p>
        <h2 className="display mt-4 text-4xl text-charcoal md:text-5xl">
          {agent.name}
        </h2>
        <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-olive">
          {detailed ? agent.fullBio : agent.shortBio}
        </p>

        {detailed ? (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {agent.expertise.map((item) => (
              <li
                key={item}
                className="border-l border-gold pl-4 text-sm text-charcoal"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 space-y-2 text-sm font-medium text-charcoal">
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

        <div className="mt-5">
          <AgentSocialLinks social={agent.social} name={agent.name} />
        </div>

        <div className="mt-8">
          <Button href={detailed ? "/contact" : `/team#${agent.slug}`}>
            {detailed ? "Schedule a Consultation" : agent.cta}
          </Button>
        </div>
      </div>
    </article>
  );
}
