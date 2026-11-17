import type { SVGProps } from "react";

export type IconName =
  | "whatsapp"
  | "arrowUpRight"
  | "arrowRight"
  | "arrowLeft"
  | "star"
  | "bed"
  | "bath"
  | "ruler"
  | "users"
  | "pin"
  | "wifi"
  | "spark"
  | "sparkles"
  | "kitchen"
  | "car"
  | "concierge"
  | "plane"
  | "coffee"
  | "check"
  | "plus"
  | "minus"
  | "chevronDown"
  | "menu"
  | "close"
  | "quote"
  | "calendar"
  | "clock"
  | "instagram"
  | "phone"
  | "mail"
  | "shield"
  | "key"
  | "sun"
  | "search";

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  strokeWidth?: number;
};

const strokePaths: Record<string, React.ReactNode> = {
  arrowUpRight: (
    <>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M20 12H4" />
      <path d="m10 18-6-6 6-6" />
    </>
  ),
  bed: (
    <>
      <path d="M2 20v-8h20v8" />
      <path d="M4 12V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
      <path d="M2 20h20" />
      <path d="M6 12V9h12v3" />
    </>
  ),
  bath: (
    <>
      <path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-3Z" />
      <path d="M6 12V5a2 2 0 0 1 4 0" />
      <path d="M5 20l-1 2" />
      <path d="M19 20l1 2" />
    </>
  ),
  ruler: (
    <>
      <path d="M3 15 15 3l6 6L9 21l-6-6Z" />
      <path d="m7 11 2 2" />
      <path d="m11 7 2 2" />
      <path d="m15 13 2 2" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  wifi: (
    <>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <path d="M12 20h.01" />
    </>
  ),
  spark: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Z" />
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
    </>
  ),
  kitchen: (
    <>
      <path d="M4 3v7a3 3 0 0 0 6 0V3" />
      <path d="M7 3v18" />
      <path d="M17 3c-2 2-2.5 4-2.5 7a2.5 2.5 0 0 0 5 0c0-3-.5-5-2.5-7Z" />
      <path d="M17 12v9" />
    </>
  ),
  car: (
    <>
      <path d="m5 11 2-5h10l2 5" />
      <path d="M3 11h18v6H3z" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M5 17h14" />
    </>
  ),
  concierge: (
    <>
      <path d="M3 18h18" />
      <path d="M5 18a7 7 0 0 1 14 0" />
      <path d="M12 4v3" />
      <path d="M12 11h.01" />
    </>
  ),
  plane: (
    <>
      <path d="M2 12 22 2l-7 20-3-8-10-2Z" />
      <path d="m12 14 4-4" />
    </>
  ),
  coffee: (
    <>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <path d="M6 2v2M10 2v2M14 2v2" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  key: (
    <>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m10.5 12.5 9-9M16 4l4 4M14 6l3 3" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9 6.3 6.3M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </>
  ),
  quote: (
    <path
      d="M9.5 5C6.5 6.6 4.8 9 4.8 12.2c0 3 1.7 4.9 4 4.9 2 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.2-3.3-.3 0-.6 0-.8.1.4-1.7 1.6-3.1 3.3-4L9.5 5Zm9 0c-3 1.6-4.7 4-4.7 7.2 0 3 1.7 4.9 4 4.9 2 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.2-3.3-.3 0-.6 0-.8.1.4-1.7 1.6-3.1 3.3-4L18.5 5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
};

export function Icon({ name, className = "h-5 w-5", strokeWidth = 1.6, ...rest }: Props) {
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...rest}>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.06 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...rest}>
        <path d="m12 2.5 2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.51l-5.88 3.1 1.12-6.55L2.48 9.42l6.58-.96L12 2.5Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {strokePaths[name]}
    </svg>
  );
}
