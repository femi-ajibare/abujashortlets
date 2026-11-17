import { apartments, formatNGN, WA_BOOKING_LINK, type City } from "../data";
import { Icon } from "./Icons";

export default function MobileBar({ city }: { city: City }) {
  const inCity = apartments.filter((a) => a.city === city);
  const lowest = inCity.length ? Math.min(...inCity.map((a) => a.price)) : 0;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand/80 bg-paper/95 px-4 pb-[calc(0.65rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[8.5px] font-semibold uppercase tracking-[0.15em] text-forest/45">From</p>
          <p className="font-display text-[17px] leading-tight text-forest">
            {formatNGN(lowest)} <span className="font-sans text-[9px] font-medium text-forest/45">/ night</span>
          </p>
        </div>
        <a
          href={WA_BOOKING_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-[11.5px] font-semibold text-cream active:scale-[0.98]"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          Book on WhatsApp
        </a>
      </div>
    </div>
  );
}
