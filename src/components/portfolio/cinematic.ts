/**
 * Shared scroll navigation. The cinematic stage registers a resolver that maps a
 * section id to its scroll position on the pinned timeline; without one, sections
 * are normal page blocks and we scroll to the element.
 */

/** Must match the media query in src/styles.css (.stage rules). */
export const CINEMATIC_QUERY =
  "(min-width: 768px) and (min-height: 420px) and (prefers-reduced-motion: no-preference)";

type Resolver = (id: string) => number | null;
let resolver: Resolver | null = null;

export function setSceneResolver(next: Resolver | null) {
  resolver = next;
}

export function navigateTo(id: string, opts: { instant?: boolean } = {}) {
  if (typeof window === "undefined") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = opts.instant || reduce ? "auto" : "smooth";
  const top = resolver?.(id);
  if (top != null) {
    window.scrollTo({ top, behavior });
  } else {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === "home") window.scrollTo({ top: 0, behavior });
    else el.scrollIntoView({ behavior, block: "start" });
  }
  const hash = id === "home" ? window.location.pathname : `#${id}`;
  window.history.replaceState(null, "", hash);
}

/** Cursor-following light for `.spotlight` cards. */
export function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}
