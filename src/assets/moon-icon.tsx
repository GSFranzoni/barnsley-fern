import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg">;

export function MoonIcon(props: IconProps) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" {...props}>
      <path d="M20.64 15.64A9 9 0 0 1 8.36 3.36 9 9 0 1 0 20.64 15.64Z" />
    </svg>
  );
}
