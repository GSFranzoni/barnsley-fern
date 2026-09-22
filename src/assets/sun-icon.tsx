import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg">;

export function SunIcon(props: IconProps) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
