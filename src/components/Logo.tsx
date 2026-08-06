import Link from "next/link";

type LogoProps = {
  tone?: "dark" | "light";
  compact?: boolean;
};

export function Logo({ tone = "dark", compact = false }: LogoProps) {
  const color = tone === "light" ? "text-white" : "text-charcoal";

  return (
    <Link
      href="/"
      className={`logo-mark group focus-ring inline-flex flex-col justify-center ${color}`}
      aria-label="Commonwealth Realty Corp Home"
    >
      <span className="font-serif text-[1.5rem] leading-[1.15] tracking-[0.01em]">
        Commonwealth
      </span>
      <span
        className={`mt-1 font-sans text-[0.64rem] font-semibold uppercase tracking-[0.22em] ${
          tone === "light" ? "text-[#B59A5B]" : "text-gold"
        } ${compact ? "hidden sm:inline" : ""}`}
      >
        Realty Corp
      </span>
    </Link>
  );
}
