import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

/** Paw — the Pet QR mascot mark */
export function PawIcon({ strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <circle cx="6" cy="10" r="1.6" />
      <circle cx="9.5" cy="6.6" r="1.6" />
      <circle cx="14.5" cy="6.6" r="1.6" />
      <circle cx="18" cy="10" r="1.6" />
      <path d="M8 16c0-2.2 1.8-3.6 4-3.6s4 1.4 4 3.6c0 1.9-1.9 3-4 3s-4-1.1-4-3z" />
    </svg>
  );
}

/** QR code glyph */
export function QrIcon({ strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <rect x="3" y="3" width="7" height="7" rx="1.6" />
      <rect x="14" y="3" width="7" height="7" rx="1.6" />
      <rect x="3" y="14" width="7" height="7" rx="1.6" />
      <path d="M14 14h3M21 14v3M14 21v-4" />
    </svg>
  );
}

/** Full QR with the dotted lower-right pattern (used in the scan reticle) */
export function QrFullIcon({ strokeWidth = 1.6, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <rect x="3" y="3" width="7" height="7" rx="1.6" />
      <rect x="14" y="3" width="7" height="7" rx="1.6" />
      <rect x="3" y="14" width="7" height="7" rx="1.6" />
      <path d="M14 14h3M21 14v3M14 21v-4M14 18h3M18 21h3M21 21v.01" />
    </svg>
  );
}

export function ChevronLeftIcon({ strokeWidth = 2.2, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ArrowRightIcon({ strokeWidth = 2.2, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CameraIcon({ strokeWidth = 1.8, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <path d="M3 8.5a2 2 0 0 1 2-2h1.5L8 4.5h8L17.5 6.5H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="12.5" r="3.6" />
    </svg>
  );
}

export function PlusIcon({ strokeWidth = 2.6, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <path d="M12 6v12M6 12h12" />
    </svg>
  );
}

export function CheckIcon({ strokeWidth = 2.6, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <path d="M4.5 12.5l5 5L20 7" />
    </svg>
  );
}

export function CheckSmallIcon({ strokeWidth = 2.4, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <path d="M5 12l4 4L19 6" />
    </svg>
  );
}

export function MapPinIcon({ strokeWidth = 2.2, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function LockIcon({ strokeWidth = 2.2, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <rect x="4" y="10" width="16" height="11" rx="3" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function AlertIcon({ strokeWidth = 2.2, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 16.5v.01" />
    </svg>
  );
}

export function BellIcon({ strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function HomeIcon({ strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9h12v-9" />
    </svg>
  );
}

export function UserIcon({ strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={strokeWidth}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

/** Solid map pin (filled) used as the map marker */
export function MapPinSolidIcon({ size = 40, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#E5484D"
      stroke="#fff"
      strokeWidth={1.6}
      {...props}
    >
      <path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.6" fill="#fff" stroke="none" />
    </svg>
  );
}
