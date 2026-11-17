import { CONTACT, WA_BOOKING_LINK, WHATSAPP_NUMBER } from "../data";
import { Icon } from "./Icons";
import { Logo } from "./ui";

export default function Footer() {
  const contact = CONTACT;

  return (
    <footer className="bg-forest-deep pb-10 pt-12 text-cream">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 border-b border-cream/10 pb-8 lg:flex-row lg:items-end">
          <Logo light />
          <a
            href={WA_BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2.5 rounded-full bg-cream px-5 py-3 text-[12.5px] font-semibold text-forest"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Book direct on WhatsApp
            <Icon name="arrowUpRight" className="h-3 w-3" />
          </a>
        </div>

        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-cream/40">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-[11.5px] text-cream/65">
              <li className="inline-flex items-start gap-2">
                <Icon name="pin" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay-soft" />
                {contact.address}
              </li>
              <li>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-2 transition-colors hover:text-cream">
                  <Icon name="phone" className="h-3.5 w-3.5 text-clay-soft" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={WA_BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-cream"
                >
                  <Icon name="whatsapp" className="h-3.5 w-3.5 text-clay-soft" />
                  WhatsApp a host
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-cream"
                >
                  <Icon name="mail" className="h-3.5 w-3.5 text-clay-soft" />
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-cream/40">
              Cities
            </p>
            <ul className="mt-4 space-y-2.5 text-[11.5px] text-cream/65">
              <li>
                <a href="#listings" className="transition-colors hover:text-cream">
                  Abuja shortlets
                </a>
              </li>
              <li>
                <a href="#listings" className="transition-colors hover:text-cream">
                  Lagos shortlets
                </a>
              </li>
              <li className="inline-flex items-center gap-1.5 text-cream/45">
                <Icon name="instagram" className="h-3.5 w-3.5" />
                {contact.instagram}
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-cream/40">
              Quick links
            </p>
            <ul className="mt-4 space-y-2.5 text-[11.5px] text-cream/65">
              <li><a href="#listings" className="transition-colors hover:text-cream">Apartments</a></li>
              <li><a href="#listings" className="transition-colors hover:text-cream">Penthouses</a></li>
              <li><a href="#listings" className="transition-colors hover:text-cream">Duplexes</a></li>
              <li><a href="#listings" className="transition-colors hover:text-cream">Studios</a></li>
              <li><a href="#about" className="transition-colors hover:text-cream">About</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-cream/40">
              Trust
            </p>
            <ul className="mt-4 space-y-2.5 text-[11.5px] text-cream/65">
              <li className="inline-flex items-center gap-1.5">
                <Icon name="shield" className="h-3.5 w-3.5 text-clay-soft" />
                Every listing physically verified
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Icon name="key" className="h-3.5 w-3.5 text-clay-soft" />
                Self check-in on most homes
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Icon name="clock" className="h-3.5 w-3.5 text-clay-soft" />
                {contact.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-cream/10 pt-5 sm:flex-row sm:items-center">
          <p className="text-[9.5px] text-cream/40">
            © {new Date().getFullYear()} Abujashortlets. Verified shortlets in Abuja & Lagos.
          </p>
          <p className="text-[9.5px] text-cream/40">
            Pay securely by card, bank transfer or USSD once your stay is confirmed.
          </p>
        </div>
      </div>
    </footer>
  );
}
