import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { navItems, profile, type SectionId } from "@/content/profile";
import { cn } from "@/lib/utils";

import { NavLink } from "./NavLink";
import { ResumeButton } from "./ResumeButton";

export function Navbar({ active }: { active: SectionId }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border pl-5 pr-2 transition-all duration-500",
          scrolled || open ? "glass shadow-window" : "border-transparent",
        )}
      >
        <NavLink
          to="home"
          className="text-[0.95rem] font-extrabold tracking-[0.2em] text-foreground"
          aria-label={`${profile.name} — home`}
          onNavigate={() => setOpen(false)}
        >
          {profile.logo}
          <span className="text-gradient">.</span>
        </NavLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <NavLink
                  to={item.id}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                    isActive
                      ? "bg-surface-strong text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ResumeButton variant="hero" size="pill" className="hidden sm:inline-flex" />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-strong lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="shadow-window animate-in fade-in slide-in-from-top-2 mx-auto mt-2 border border-border-strong bg-popover/95 backdrop-blur-xl max-w-7xl rounded-3xl p-3 duration-300 lg:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li key={item.id}>
                <NavLink
                  to={item.id}
                  onNavigate={() => setOpen(false)}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors",
                    active === item.id
                      ? "bg-surface-strong text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  <span className="font-mono text-xs text-subtle-foreground">0{i}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-border p-2 pt-4 sm:hidden">
            <ResumeButton variant="hero" size="xl" className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
