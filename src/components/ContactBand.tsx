import { CONTACT, WA_BOOKING_LINK, WA_BOOKING_LINK_LABEL, WHATSAPP_NUMBER } from "../data";
import { Icon } from "./Icons";

export default function ContactBand() {
  const contact = CONTACT;

  return (
    <section id="contact" className="relative overflow-hidden bg-forest text-cream">
      <div className="pointer-events-none absolute -right-16 -top-16 h-[300px] w-[300px] rounded-full border border-cream/10" />
      <div className="pointer-events-none absolute -right-4 top-6 h-[180px] w-[180px] rounded-full border border-cream/10" />
      <div className="relative mx-auto max-w-[1320px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/55">
              <span className="h-1.5 w-1.5 rounded-full bg-clay-soft" />
              Talk to a host
            </p>
            <h2 className="mt-3 font-display text-[34px] font-light leading-[0.98] tracking-[-0.03em] text-cream sm:text-5xl lg:text-[54px]">
              Tell us your dates.
              <br />
              We'll handle <em className="italic text-clay-soft">the rest.</em>
            </h2>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-cream/65">
              Send a quick message and a host will reply with the available apartments, real
              photos and a clear rate. No forms, no booking fees, no waiting.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={WA_BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-cream px-5 py-3.5 text-[13px] font-semibold text-forest shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)] transition-transform active:scale-[0.98]"
              >
                <Icon name="whatsapp" className="h-[18px] w-[18px]" />
                Chat on WhatsApp
                <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
              </a>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-cream/85 transition-colors hover:text-cream"
              >
                <Icon name="phone" className="h-4 w-4" />
                {contact.phoneDisplay}
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-cream/15 pt-5 text-[10.5px] text-cream/60">
              <li className="inline-flex items-center gap-1.5">
                <Icon name="clock" className="h-3.5 w-3.5 text-clay-soft" />
                {contact.hours}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Icon name="sparkles" className="h-3.5 w-3.5 text-clay-soft" />
                {contact.responseTime}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Icon name="shield" className="h-3.5 w-3.5 text-clay-soft" />
                No booking fees
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-cream/15 bg-cream/[0.05] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/55">
              Direct booking link
            </p>
            <a
              href={WA_BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block rounded-xl bg-forest-deep/55 px-4 py-3.5 text-[14px] font-bold text-cream transition-colors hover:bg-forest-deep/80"
            >
              {WA_BOOKING_LINK_LABEL}
            </a>
            <p className="mt-3 text-[11.5px] leading-relaxed text-cream/55">
              Save the link to your phone for late-night chats. It opens straight to Femi's
              WhatsApp — same booking line as the directory.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="rounded-xl bg-forest-deep/45 px-3 py-2.5 text-cream/85 transition-colors hover:bg-forest-deep/70"
              >
                <span className="block text-[8.5px] uppercase tracking-[0.14em] text-cream/45">Call</span>
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="rounded-xl bg-forest-deep/45 px-3 py-2.5 transition-colors hover:bg-forest-deep/70"
              >
                <span className="block text-[8.5px] uppercase tracking-[0.14em] text-cream/45">Email</span>
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
