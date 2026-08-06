"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { contactInfo, navLinks } from "@/data/navigation";
import { Logo } from "./Logo";
import { Button } from "./Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !isHome || open;
  const linkTone = solid
    ? "text-charcoal hover:text-burgundy"
    : "text-white hover:text-white/85";
  const activeTone = solid ? "text-burgundy" : "text-white";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-colors duration-300 ${
          solid
            ? "border-stone bg-ivory text-charcoal"
            : "border-white/20 bg-black/60 text-white backdrop-blur-md"
        }`}
      >
        <div className="site-container flex h-[var(--utility-h)] items-center justify-between gap-4 text-[0.74rem] font-medium tracking-[0.06em]">
          <span className={solid ? "text-olive" : "text-white"}>
            Central Florida
          </span>
          <div className="flex items-center gap-4 sm:gap-6">
            {contactInfo.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className={`focus-ring hidden sm:inline transition-colors ${
                  solid
                    ? "text-charcoal hover:text-burgundy"
                    : "text-white hover:text-gold-soft"
                }`}
              >
                {phone.value}
              </a>
            ))}
            <a
              href={contactInfo.phones[0].href}
              className={`focus-ring sm:hidden transition-colors ${
                solid
                  ? "text-charcoal hover:text-burgundy"
                  : "text-white hover:text-gold-soft"
              }`}
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b transition-all duration-300 ${
          solid
            ? "border-stone bg-ivory shadow-[0_8px_30px_rgba(29,29,27,0.06)]"
            : "border-white/15 bg-black/50 text-white backdrop-blur-md"
        }`}
      >
        <div className="site-container flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo tone={solid ? "dark" : "light"} />

          <nav
            className="hidden items-center gap-5 xl:gap-6 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`focus-ring relative text-[0.78rem] font-semibold tracking-[0.05em] uppercase transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                    active ? `${activeTone} after:scale-x-100` : linkTone
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href="/contact"
              variant={solid ? "primary" : "light"}
              className="hidden !min-h-0 !px-5 !py-2.5 sm:inline-flex"
            >
              Contact Us
            </Button>

            <button
              type="button"
              className={`focus-ring lg:hidden inline-flex h-11 w-11 items-center justify-center border transition-colors ${
                solid
                  ? "border-stone text-charcoal"
                  : "border-white/80 text-white"
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-px w-full bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-px w-full bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 bottom-0 top-[calc(var(--utility-h)+var(--header-h))] bg-ivory transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="site-container flex h-full flex-col py-8">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`focus-ring border-b border-stone py-4 font-serif text-3xl ${
                    active ? "text-burgundy" : "text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4 border-t border-stone pt-6">
            {contactInfo.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="focus-ring block text-sm font-medium tracking-[0.04em] text-charcoal"
              >
                {phone.value}
              </a>
            ))}
            <Button href="/contact" className="w-full">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
