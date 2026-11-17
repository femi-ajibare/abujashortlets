import { Icon } from "./Icons";
import type { IconName } from "./Icons";

const POINTS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shield",
    title: "Vetted & verified",
    body: "Every apartment is physically inspected and re-photographed by our team.",
  },
  {
    icon: "whatsapp",
    title: "Direct on WhatsApp",
    body: "No middleman. Speak to the host that handles your booking, not a call centre.",
  },
  {
    icon: "concierge",
    title: "Curated inventory",
    body: "We don't list everything. Only apartments we would happily stay in ourselves.",
  },
  {
    icon: "key",
    title: "Self check-in",
    body: "Smart-lock entry on most homes — arrive any time after 2pm, no waiting.",
  },
];

export default function WhyUs() {
  return (
    <section id="about" className="border-y border-sand/70 bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/55">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            Why guests book with us
          </p>
          <h2 className="mt-3 font-display text-[30px] font-light leading-[1.05] tracking-[-0.025em] text-forest sm:text-4xl lg:text-[40px]">
            A shortlet agency
            <br className="hidden sm:block" /> that does the <em className="italic text-clay">work</em> for you.
          </h2>
          <p className="mt-4 max-w-md text-[12.5px] leading-relaxed text-forest/65 sm:text-[13px]">
            We help visitors, teams and families find a well-kept place to stay in Abuja and
            Lagos. Each home is reviewed by our local team, with a clear nightly rate and a
            direct booking path to the host.
          </p>
          </div>
          <ul className="grid gap-x-6 sm:grid-cols-2">
          {POINTS.map((point) => (
            <li key={point.title} className="border-t border-sand/80 py-4">
              <div className="flex items-center gap-2">
                <Icon name={point.icon} className="h-4 w-4 text-clay" />
                <h3 className="text-[12px] font-bold text-forest">{point.title}</h3>
              </div>
              <p className="mt-1.5 pl-6 text-[11px] leading-relaxed text-forest/60">{point.body}</p>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
