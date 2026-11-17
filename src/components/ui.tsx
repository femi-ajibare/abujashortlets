import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { WA_BOOKING_LINK } from "../data";
import { Icon } from "./Icons";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <a
      href="#top"
      className="group inline-flex items-center gap-2.5"
      aria-label="Abujashortlets — back to top"
    >
      <span
        className={cn(
          "relative grid h-10 w-10 place-items-center rounded-[14px] transition-colors",
          light ? "bg-cream text-forest" : "bg-forest text-cream",
        )}
      >
        <span className="font-display text-[22px] leading-none">a</span>
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-clay" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[22px] leading-none tracking-[-0.025em] transition-colors sm:text-[24px]",
            light ? "text-cream" : "text-forest",
          )}
        >
          abuja<span className="italic text-clay">shortlets</span>
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 text-[7.5px] font-semibold uppercase tracking-[0.24em]",
              light ? "text-cream/60" : "text-forest/55",
            )}
          >
            Serviced residences · Abuja
          </span>
        )}
      </span>
    </a>
  );
}

type WaProps = {
  children?: ReactNode;
  className?: string;
  variant?: "forest" | "cream" | "outline" | "clay";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
};

export function WhatsAppButton({
  children = "Chat on WhatsApp",
  className,
  variant = "forest",
  size = "md",
  arrow = false,
}: WaProps) {
  const variants = {
    forest: "bg-forest text-cream hover:bg-forest-deep shadow-[0_10px_30px_-16px_rgba(18,39,31,0.9)]",
    cream: "bg-cream text-forest hover:bg-paper shadow-[0_10px_30px_-18px_rgba(18,39,31,0.6)]",
    outline: "border border-forest/25 bg-transparent text-forest hover:border-forest hover:bg-forest hover:text-cream",
    clay: "bg-clay text-paper hover:bg-[#8f4526] shadow-[0_10px_30px_-16px_rgba(185,95,60,0.9)]",
  };
  const sizes = {
    sm: "px-4 py-2.5 text-[12px]",
    md: "px-5 py-3.5 text-[13px]",
    lg: "px-6 py-4 text-sm",
  };

  return (
    <a
      href={WA_BOOKING_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[0.01em] transition-all duration-300 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      <Icon name="whatsapp" className={size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"} />
      <span>{children}</span>
      {arrow && (
        <Icon
          name="arrowUpRight"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}

export function Eyebrow({
  children,
  light = false,
  className,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.24em]",
        light ? "text-cream/65" : "text-forest/55",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", light ? "bg-clay-soft" : "bg-clay")} />
      {children}
    </p>
  );
}

export function Stars({ className, count = 5 }: { className?: string; count?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-clay", className)} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" className="h-3.5 w-3.5" />
      ))}
    </span>
  );
}
