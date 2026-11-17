import { useMemo, useState } from "react";
import {
  apartments,
  BEDROOM_OPTIONS,
  CATEGORIES,
  formatNGN,
  NEIGHBOURHOODS_BY_CITY,
  POPULAR_AMENITIES,
  PRICE_RANGES,
  WA_BOOKING_LINK,
  type Apartment,
  type City,
} from "../data";
import { cn } from "../utils/cn";
import EditableImage from "./EditableImage";
import { Icon } from "./Icons";

type SortKey = "recommended" | "price-asc" | "price-desc" | "guests-desc";

const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "guests-desc", label: "Most guests" },
];

function sortListings(list: Apartment[], sort: SortKey) {
  const result = [...list];
  if (sort === "price-asc") return result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return result.sort((a, b) => b.price - a.price);
  if (sort === "guests-desc") return result.sort((a, b) => b.guests - a.guests);
  return result.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

function PropertyCard({ apartment }: { apartment: Apartment }) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-[17px] border border-sand/80 bg-paper transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-28px_rgba(18,39,31,0.48)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <EditableImage
          id={`apartment-${apartment.id}`}
          src={apartment.img}
          alt={apartment.name}
          variant="card"
          imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent" />
        {apartment.featured && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-clay px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white">
            Featured stay
          </span>
        )}
        <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-forest backdrop-blur">
          <Icon name="check" className="h-3 w-3 text-wa" strokeWidth={2.6} />
          Vetted & verified
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-forest-deep/70 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-cream backdrop-blur">
          {apartment.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.15em] text-clay">
          <Icon name="pin" className="h-3 w-3" />
          {apartment.area} <span className="text-forest/35">/</span> {apartment.city === "abuja" ? "Abuja" : "Lagos"}
        </p>
        <h3 className="mt-2 font-display text-[19px] leading-[1.16] text-forest">
          {apartment.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[11.5px] leading-relaxed text-forest/60">{apartment.blurb}</p>

        <div className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1.5 border-t border-sand/70 pt-3 text-[10.5px] text-forest/65">
          <span className="inline-flex items-center gap-1.5"><Icon name="bed" className="h-3.5 w-3.5 text-forest/40" />{apartment.bedrooms === 0 ? "Studio" : `${apartment.bedrooms} bed`}</span>
          <span className="inline-flex items-center gap-1.5"><Icon name="bath" className="h-3.5 w-3.5 text-forest/40" />{apartment.bathrooms} bath</span>
          <span className="inline-flex items-center gap-1.5"><Icon name="users" className="h-3.5 w-3.5 text-forest/40" />{apartment.guests} guests</span>
          <span className="inline-flex items-center gap-1.5"><Icon name="ruler" className="h-3.5 w-3.5 text-forest/40" />{apartment.sqm} m²</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {apartment.amenities.slice(0, 4).map((amenity) => (
            <span key={amenity} className="rounded-full border border-sand bg-cream/70 px-2.5 py-1 text-[9px] font-medium text-forest/65">
              {amenity}
            </span>
          ))}
          {apartment.amenities.length > 4 && (
            <span className="rounded-full border border-sand bg-cream/70 px-2.5 py-1 text-[9px] font-medium text-forest/50">
              +{apartment.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
          <div>
            <p className="font-display text-[22px] leading-none text-forest">
              {formatNGN(apartment.price)}
              <span className="ml-1 font-sans text-[9.5px] font-medium text-forest/45">/ night</span>
            </p>
            <p className="mt-1 text-[9px] text-forest/45">Bills included · check dates with host</p>
          </div>
          <a
            href={WA_BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-2.5 text-[10.5px] font-bold text-cream transition-colors hover:bg-forest-deep"
          >
            <Icon name="whatsapp" className="h-3.5 w-3.5" />
            Book on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Listings({ city }: { city: City }) {
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("all");
  const [bedrooms, setBedrooms] = useState<number | "all">("all");
  const [category, setCategory] = useState<"all" | Apartment["category"]>("all");
  const [priceIndex, setPriceIndex] = useState(0);
  const [amenity, setAmenity] = useState("all");
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");

  const inCity = useMemo(() => apartments.filter((apt) => apt.city === city), [city]);
  const areas = NEIGHBOURHOODS_BY_CITY[city];
  const selectedPrice = PRICE_RANGES[priceIndex];

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return inCity.filter((apt) => {
      if (area !== "all" && apt.area !== area) return false;
      if (bedrooms !== "all") {
        if (bedrooms === 5 ? apt.bedrooms < 5 : apt.bedrooms !== bedrooms) return false;
      }
      if (category !== "all" && apt.category !== category) return false;
      if (amenity !== "all" && !apt.amenities.includes(amenity)) return false;
      if (apt.price < selectedPrice.min || apt.price > selectedPrice.max) return false;
      if (query) {
        const haystack = `${apt.name} ${apt.area} ${apt.blurb} ${apt.amenities.join(" ")}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [inCity, area, bedrooms, category, amenity, selectedPrice, search]);

  const sorted = useMemo(() => sortListings(filtered, sort), [filtered, sort]);
  const [expandedArea, setExpandedArea] = useState<string | null>(null);
  const groupedByArea = useMemo(() => {
    const grouped = new Map<string, Apartment[]>();
    sorted.forEach((apt) => {
      const items = grouped.get(apt.area) ?? [];
      items.push(apt);
      grouped.set(apt.area, items);
    });
    return Array.from(grouped.entries()).sort((a, b) => {
      const aOrder = areas.indexOf(a[0]);
      const bOrder = areas.indexOf(b[0]);
      return (aOrder < 0 ? 999 : aOrder) - (bOrder < 0 ? 999 : bOrder);
    });
  }, [sorted, areas]);
  const activeFilters = Number(area !== "all") + Number(bedrooms !== "all") + Number(category !== "all") + Number(priceIndex !== 0) + Number(amenity !== "all") + Number(search.length > 0);

  const resetFilters = () => {
    setSearch("");
    setArea("all");
    setBedrooms("all");
    setCategory("all");
    setPriceIndex(0);
    setAmenity("all");
  };

  return (
    <section id="listings" className="scroll-mt-24 bg-cream py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[9.5px] font-bold uppercase tracking-[0.2em] text-clay">
              <span className="h-1.5 w-1.5 rounded-full bg-clay" />
              The collection · {city === "abuja" ? "Abuja" : "Lagos"}
            </p>
            <h2 className="mt-2 font-display text-[32px] font-light leading-tight tracking-[-0.025em] text-forest sm:text-[40px]">
              Find your shortlet.
            </h2>
            <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-forest/60 sm:text-[13px]">
              Every listing has been checked by our local team. Filter by area, price and the details that matter to you.
            </p>
          </div>
          <p className="text-[11px] text-forest/55">
            <span className="font-bold text-forest">{apartments.filter((apt) => apt.city === city).length}</span> verified stays in {city === "abuja" ? "Abuja" : "Lagos"}
          </p>
        </div>

        <div className="mt-6 rounded-[20px] border border-sand/80 bg-paper p-3 shadow-[0_16px_40px_-32px_rgba(18,39,31,0.5)] sm:p-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.1fr_0.9fr_1fr_1.2fr_auto]">
            <label className="rounded-xl bg-cream/70 px-3.5 py-2.5">
              <span className="block text-[8.5px] font-bold uppercase tracking-[0.17em] text-forest/45">Search</span>
              <span className="mt-1.5 flex items-center gap-2">
                <Icon name="sparkles" className="h-3.5 w-3.5 shrink-0 text-clay" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Pool, balcony, Maitama…"
                  className="w-full min-w-0 bg-transparent text-[11.5px] font-semibold text-forest outline-none placeholder:text-forest/35"
                  aria-label="Search properties"
                />
              </span>
            </label>
            <label className="rounded-xl bg-cream/70 px-3.5 py-2.5">
              <span className="block text-[8.5px] font-bold uppercase tracking-[0.17em] text-forest/45">Area</span>
              <span className="mt-1.5 flex items-center gap-2">
                <Icon name="pin" className="h-3.5 w-3.5 shrink-0 text-clay" />
                <select value={area} onChange={(event) => setArea(event.target.value)} className="w-full appearance-none bg-transparent text-[11.5px] font-semibold text-forest outline-none" aria-label="Filter by area">
                  <option value="all">All areas</option>
                  {areas.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <Icon name="chevronDown" className="h-3 w-3 shrink-0 text-forest/40" />
              </span>
            </label>
            <label className="rounded-xl bg-cream/70 px-3.5 py-2.5">
              <span className="block text-[8.5px] font-bold uppercase tracking-[0.17em] text-forest/45">Bedrooms</span>
              <span className="mt-1.5 flex items-center gap-2">
                <Icon name="bed" className="h-3.5 w-3.5 shrink-0 text-clay" />
                <select value={bedrooms === "all" ? "all" : String(bedrooms)} onChange={(event) => setBedrooms(event.target.value === "all" ? "all" : Number(event.target.value))} className="w-full appearance-none bg-transparent text-[11.5px] font-semibold text-forest outline-none" aria-label="Filter by bedrooms">
                  <option value="all">Any</option>
                  {BEDROOM_OPTIONS.map((number) => <option key={number} value={number}>{number === 5 ? "5+" : number} bed{number === 1 ? "" : "s"}</option>)}
                </select>
                <Icon name="chevronDown" className="h-3 w-3 shrink-0 text-forest/40" />
              </span>
            </label>
            <label className="rounded-xl bg-cream/70 px-3.5 py-2.5">
              <span className="block text-[8.5px] font-bold uppercase tracking-[0.17em] text-forest/45">Stay type</span>
              <span className="mt-1.5 flex items-center gap-2">
                <Icon name="key" className="h-3.5 w-3.5 shrink-0 text-clay" />
                <select value={category} onChange={(event) => setCategory(event.target.value as typeof category)} className="w-full appearance-none bg-transparent text-[11.5px] font-semibold text-forest outline-none" aria-label="Filter by stay type">
                  <option value="all">All stays</option>
                  {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <Icon name="chevronDown" className="h-3 w-3 shrink-0 text-forest/40" />
              </span>
            </label>
            <label className="rounded-xl bg-cream/70 px-3.5 py-2.5">
              <span className="block text-[8.5px] font-bold uppercase tracking-[0.17em] text-forest/45">Nightly price</span>
              <span className="mt-1.5 flex items-center gap-2">
                <span className="font-display text-[13px] leading-none text-clay">₦</span>
                <select value={priceIndex} onChange={(event) => setPriceIndex(Number(event.target.value))} className="w-full appearance-none bg-transparent text-[11.5px] font-semibold text-forest outline-none" aria-label="Filter by price">
                  {PRICE_RANGES.map((range, index) => <option key={range.label} value={index}>{range.label}</option>)}
                </select>
                <Icon name="chevronDown" className="h-3 w-3 shrink-0 text-forest/40" />
              </span>
            </label>
            <button
              type="button"
              onClick={() => setAmenitiesOpen((open) => !open)}
              aria-expanded={amenitiesOpen}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-[11px] font-bold transition-colors",
                amenitiesOpen || amenity !== "all" ? "border-forest bg-forest text-cream" : "border-forest/15 bg-white text-forest hover:bg-cream",
              )}
            >
              <Icon name="sparkles" className="h-3.5 w-3.5" />
              Amenities
              {amenity !== "all" && <span className="grid h-4 w-4 place-items-center rounded-full bg-clay text-[8px] text-white">1</span>}
            </button>
          </div>

          {amenitiesOpen && (
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-sand/70 pt-3">
              <button
                type="button"
                onClick={() => setAmenity("all")}
                aria-pressed={amenity === "all"}
                className={cn("rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors", amenity === "all" ? "bg-forest text-cream" : "border border-sand bg-cream text-forest/65")}
              >All amenities</button>
              {POPULAR_AMENITIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setAmenity(amenity === item ? "all" : item)}
                  aria-pressed={amenity === item}
                  className={cn("rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors", amenity === item ? "bg-forest text-cream" : "border border-sand bg-cream text-forest/65 hover:border-forest/40")}
                >{item}</button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-sand/80 pb-3">
          <p className="text-[11px] text-forest/60">
            <strong className="text-forest">{sorted.length}</strong> stays found
            {activeFilters > 0 && <>
              <span className="mx-1.5 text-forest/30">·</span>
              <button type="button" onClick={resetFilters} className="font-semibold text-clay underline underline-offset-2">Clear filters</button>
            </>}
          </p>
          <label className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-forest/45">
            Sort by
            <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="rounded-full border border-sand bg-paper px-3 py-1.5 text-[11px] font-semibold normal-case tracking-normal text-forest outline-none" aria-label="Sort stays">
              {SORT_OPTIONS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
        </div>

        {sorted.length === 0 ? (
          <div className="mt-7 rounded-2xl border border-dashed border-sand bg-paper px-6 py-10 text-center">
            <Icon name="search" className="mx-auto h-6 w-6 text-clay" />
            <h3 className="mt-3 font-display text-2xl text-forest">No stays match those filters.</h3>
            <p className="mt-1 text-[12px] text-forest/55">Try another area or ask our host to find a fit.</p>
            <button type="button" onClick={resetFilters} className="mt-4 rounded-full bg-forest px-4 py-2.5 text-[11px] font-bold text-cream">Clear filters</button>
          </div>
        ) : (
          <div id="areas" className="mt-6 space-y-9 lg:space-y-12">
            {groupedByArea.map(([areaName, areaListings]) => {
              const expanded = expandedArea === areaName || area === areaName;
              const visible = expanded ? areaListings : areaListings.slice(0, 4);
              const startingAt = Math.min(...areaListings.map((apt) => apt.price));
              return (
                <section key={areaName} id={`area-${slug(areaName)}`} className="scroll-mt-28 border-t border-sand/80 pt-4">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <button
                        type="button"
                        onClick={() => setExpandedArea(expandedArea === areaName ? null : areaName)}
                        aria-expanded={expanded}
                        className="group inline-flex items-center gap-2 text-left"
                      >
                        <h3 className="font-display text-[24px] leading-tight text-forest sm:text-[28px]">{areaName}</h3>
                        <span className={cn("grid h-7 w-7 place-items-center rounded-full border border-sand text-forest/50 transition-all group-hover:border-forest group-hover:text-forest", expanded && "rotate-45 border-forest bg-forest text-cream group-hover:text-cream")}>
                          <Icon name="plus" className="h-3 w-3" />
                        </span>
                      </button>
                      <p className="mt-1 text-[10.5px] text-forest/55">
                        {areaListings.length} verified {areaListings.length === 1 ? "apartment" : "apartments"} · from {formatNGN(startingAt)} / night
                      </p>
                    </div>
                    {areaListings.length > 4 && !expanded && (
                      <button
                        type="button"
                        onClick={() => setExpandedArea(areaName)}
                        className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-forest hover:text-clay"
                      >
                        View all {areaListings.length} in {areaName}
                        <Icon name="arrowRight" className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {visible.map((apt) => <PropertyCard key={apt.id} apartment={apt} />)}
                  </div>
                  {expanded && areaListings.length > 4 && area === "all" && (
                    <button
                      type="button"
                      onClick={() => setExpandedArea(null)}
                      className="mt-3 text-[10.5px] font-semibold text-forest/60 underline underline-offset-2 hover:text-forest"
                    >
                      Show fewer in {areaName}
                    </button>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}