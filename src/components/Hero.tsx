import { images, WA_BOOKING_LINK } from "../data";
import EditableImage from "./EditableImage";
import { Icon } from "./Icons";

export default function Hero({ city }: { city: string }) {
  return (
    <section id="top" className="relative isolate flex min-h-[370px] items-center overflow-hidden bg-forest-deep sm:min-h-[430px] lg:min-h-[500px]">
      <div className="absolute inset-0 z-0 h-full w-full">
        <EditableImage
          id="hero-banner"
          src={images.hero}
          alt="Warm, modern shortlet apartment living room"
          variant="card"
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-deep/90 via-forest-deep/68 to-forest-deep/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/45 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="max-w-[690px]">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.23em] text-cream/70">
            <span className="h-1.5 w-1.5 rounded-full bg-clay-soft" />
            Shortlets, carefully selected
          </p>
          <h1 className="mt-4 font-display text-[50px] font-light leading-[0.92] tracking-[-0.045em] text-cream sm:text-[66px] lg:text-[82px]">
            abuja<span className="italic text-clay-soft">shortlets</span>
          </h1>
          <p className="mt-4 font-display text-[23px] font-light leading-tight text-cream/95 sm:text-[30px]">
            Find a stay that feels like yours in {city}.
          </p>
          <p className="mt-3 max-w-[510px] text-[13px] leading-relaxed text-cream/70 sm:text-[14px]">
            A considered collection of verified apartments, penthouses and duplexes. Honest
            rates, real photos and a direct line to your host.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#listings"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-[12px] font-bold text-forest transition-transform hover:-translate-y-0.5"
            >
              Browse shortlets
              <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </a>
            <a
              href={WA_BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/35 px-5 py-3 text-[12px] font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Talk to a host
            </a>
          </div>

          <p className="mt-5 flex items-center gap-2 text-[10px] font-medium text-cream/55">
            <Icon name="shield" className="h-3.5 w-3.5 text-clay-soft" />
            Every apartment checked by our local team · No booking fees
          </p>
        </div>
      </div>
    </section>
  );
}