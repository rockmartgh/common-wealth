import type { AgentSocial } from "@/data/agents";

export function AgentSocialLinks({
  social,
  name,
  tone = "dark",
}: {
  social: AgentSocial;
  name: string;
  tone?: "dark" | "light";
}) {
  const color =
    tone === "light"
      ? "border-white/25 text-ivory hover:border-gold-soft hover:text-gold-soft"
      : "border-stone text-charcoal hover:border-burgundy hover:text-burgundy";

  return (
    <div className="flex items-center gap-3">
      <a
        href={social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} on Facebook`}
        className={`focus-ring inline-flex h-10 w-10 items-center justify-center border transition-colors ${color}`}
      >
        <FacebookIcon />
      </a>
      <a
        href={social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} on Instagram`}
        className={`focus-ring inline-flex h-10 w-10 items-center justify-center border transition-colors ${color}`}
      >
        <InstagramIcon />
      </a>
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.6l.4-3H14V9z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}
