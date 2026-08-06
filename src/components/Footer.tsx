import Link from "next/link";
import { contactInfo, navLinks, serviceLinks } from "@/data/navigation";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="overflow-visible bg-warm-black text-ivory">
      <div className="site-container pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-10">
          <div className="max-w-sm overflow-visible">
            <Logo tone="light" />
            <p className="mt-6 text-[0.98rem] leading-relaxed text-[#d8d1c4]">
              Personalized residential and commercial real estate guidance
              throughout Central Florida.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-gold-soft">
              Navigation
            </h2>
            <ul className="mt-5 space-y-3 font-sans text-sm text-[#d8d1c4]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring transition-colors hover:text-ivory"
                  >
                    {link.label === "Contact Us" ? "Contact" : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-gold-soft">
              Services
            </h2>
            <ul className="mt-5 space-y-3 font-sans text-sm text-[#d8d1c4]">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-gold-soft">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 font-sans text-sm text-[#d8d1c4]">
              {contactInfo.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="focus-ring transition-colors hover:text-ivory"
                  >
                    {phone.value}
                  </a>
                </li>
              ))}
              {contactInfo.emails.map((email) => (
                <li key={email.href}>
                  <a
                    href={email.href}
                    className="focus-ring break-all transition-colors hover:text-ivory"
                  >
                    {email.value}
                  </a>
                </li>
              ))}
              <li className="pt-1 text-ivory">{contactInfo.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 font-sans text-xs tracking-[0.05em] text-[#b7b09f] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Commonwealth Realty Corp</p>
          <p>Established guidance for Central Florida real estate</p>
        </div>
      </div>
    </footer>
  );
}
