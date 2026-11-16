import { ArrowUpRight, Github, Linkedin, Mail, MapPin, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contact, profile } from "@/content/profile";

import { Container } from "../Container";

type Row = { icon: LucideIcon; label: string; value: string; href?: string; external?: boolean };

export function Contact() {
  const rows: Row[] = [
    { icon: Mail, label: "Email", value: profile.links.email, href: `mailto:${profile.links.email}` },
    { icon: Linkedin, label: "LinkedIn", value: "View profile", href: profile.links.linkedin, external: true },
    { icon: Github, label: "GitHub", value: "View profile", href: profile.links.github, external: true },
    { icon: MapPin, label: "Location", value: profile.location },
  ];

  return (
    <Container className="flex h-full flex-col">
      <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-gradient font-semibold">05</span>
            <span className="hairline h-px w-10" aria-hidden />
            Contact
          </p>
          <h2 className="display-1 mt-6 text-balance text-foreground lg:text-[clamp(3rem,min(5.4vw,9vh),5.25rem)]">
            {contact.headlineLead} <span className="text-gradient">{contact.headlineAccent}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{contact.text}</p>
          <div className="mt-9">
            <Button asChild variant="hero" size="xl">
              <a href={`mailto:${profile.links.email}`}>
                <Mail aria-hidden />
                Get in touch
              </a>
            </Button>
          </div>
        </div>

        <ul className="glass divide-y divide-border rounded-3xl p-2">
          {rows.map(({ icon: Icon, label, value, href, external }) => {
            const inner = (
              <>
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface-strong text-foreground transition-colors duration-300 group-hover:border-primary/50 group-hover:text-primary">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="eyebrow block">{label}</span>
                  <span className="mt-1 block truncate font-semibold text-foreground">{value}</span>
                </span>
                {href && (
                  <ArrowUpRight
                    className="size-4 shrink-0 text-subtle-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden
                  />
                )}
              </>
            );
            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-2xl p-4 transition-colors duration-300 hover:bg-surface-strong"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="group flex items-center gap-4 p-4">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-sm text-subtle-foreground">
        <p>
          © {new Date().getFullYear()} {profile.name} All rights reserved.
        </p>
        <p className="font-mono text-xs">{profile.title} · {profile.location}</p>
      </footer>
    </Container>
  );
}
