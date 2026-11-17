import { useEffect, useState } from "react";
import { CITIES, CONTACT, navLinks, type City, WA_BOOKING_LINK, WHATSAPP_NUMBER } from "../data";
import { cn } from "../utils/cn";
import { Icon } from "./Icons";
import { Logo } from "./ui";

type HeaderProps = {
  city: City;
  onCityChange: (city: City) => void;
};

export default function Header({ city, onCityChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const selectCity = (next: City) => {
    onCityChange(next);
    setCityMenuOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="bg-forest-deep text-cream">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-2 sm:px-8 lg:px-12">
          <p className="flex min-w-0 items-center gap-2 text-[10px] font-medium tracking-[0.06em] sm:text-[10.5px]">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay-soft opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay-soft" />
            </span>
            <span className="truncate">Verified stays. Straightforward booking. No platform fees.</span>
          </p>
          <a
            href={WA_BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-1.5 text-[10.5px] font-semibold text-cream transition-opacity hover:opacity-70 sm:inline-flex"
          >
            WhatsApp our host
            <Icon name="arrowUpRight" className="h-3 w-3" />
          </a>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-sand/70 bg-cream/95 shadow-[0_8px_30px_-24px_rgba(18,39,31,0.55)] backdrop-blur-md"
            : "border-transparent bg-cream",
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="group relative text-[12px] font-semibold text-forest/70 transition-colors hover:text-forest"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-clay transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setCityMenuOpen((open) => !open)}
                aria-expanded={cityMenuOpen}
                aria-label="Choose city"
                className="inline-flex items-center gap-2 rounded-full border border-forest/20 px-3.5 py-2 text-[11.5px] font-semibold text-forest transition-colors hover:bg-paper"
              >
                <Icon name="pin" className="h-3.5 w-3.5 text-clay" />
                {CITIES.find((item) => item.id === city)?.label}
                <Icon name="chevronDown" className="h-3 w-3 text-forest/50" />
              </button>
              {cityMenuOpen && (
                <div className="animate-pop absolute right-0 top-full z-50 mt-2 w-40 rounded-2xl border border-sand bg-paper p-1 shadow-xl">
                  {CITIES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectCity(item.id)}
                      aria-pressed={city === item.id}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[12px] font-semibold transition-colors",
                        city === item.id ? "bg-forest text-cream" : "text-forest/70 hover:bg-cream",
                      )}
                    >
                      {item.label}
                      {city === item.id && <Icon name="check" className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="hidden items-center gap-2 text-[11px] font-semibold text-forest/70 transition-colors hover:text-forest xl:inline-flex"
            >
              <Icon name="phone" className="h-3.5 w-3.5" />
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={WA_BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-[11.5px] font-bold text-cream transition-colors hover:bg-forest-deep sm:inline-flex"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Book on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-forest/20 text-forest lg:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden border-t border-sand/70 bg-cream transition-[max-height,opacity] duration-300 lg:hidden",
            menuOpen ? "max-h-[560px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
          )}
        >
          <div className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8">
            <div className="flex items-center gap-2 pb-3">
              {CITIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectCity(item.id)}
                  aria-pressed={city === item.id}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[11px] font-semibold",
                    city === item.id ? "bg-forest text-cream" : "border border-sand text-forest/70",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <nav aria-label="Mobile navigation" className="grid grid-cols-2 gap-x-5">
              {navLinks.map((link) => (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-sand/70 py-3 text-[13px] font-semibold text-forest"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href={WA_BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-[12px] font-bold text-cream"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Book on WhatsApp
            </a>
          </div>
        </div>
      </header>
    </>
  );
}