import type { ReactNode } from "react";

import { navigateTo } from "./cinematic";

type Props = {
  to: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  "aria-current"?: "page" | "location" | undefined;
  "aria-label"?: string;
};

/** In-page link that drives the cinematic timeline (or natural scroll). */
export function NavLink({ to, className, children, onNavigate, ...rest }: Props) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.();
        navigateTo(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
