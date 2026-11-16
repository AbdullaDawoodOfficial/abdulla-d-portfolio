import { Briefcase, CalendarDays } from "lucide-react";

import { experience } from "@/content/profile";

import { trackSpotlight } from "../cinematic";
import { Container, SectionHeading } from "../Container";

export function Experience() {
  return (
    <Container className="grid [&>*]:min-w-0 gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
      <div>
        <SectionHeading index="04" eyebrow="Experience" title="Learning by building." />
        <p className="mt-6 max-w-sm text-muted-foreground">
          Hands-on internship and project-based learning in web development.
        </p>
      </div>

      <ol className="relative space-y-6 pl-10">
        <span className="absolute bottom-3 left-[11px] top-3 w-px bg-gradient-to-b from-primary via-border-strong to-transparent" aria-hidden />
        {experience.map((item) => (
          <li key={item.organization} className="relative">
            <span
              className="absolute -left-10 top-6 flex size-[23px] items-center justify-center rounded-full border border-primary/50 bg-background"
              aria-hidden
            >
              <span className="size-2 rounded-full bg-gradient-accent" />
            </span>
            <article
              onPointerMove={trackSpotlight}
              className="glass spotlight rounded-3xl p-6 transition-all duration-500 hover:border-border-strong lg:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Briefcase className="size-4" aria-hidden />
                  {item.organization}
                </p>
                {item.period && (
                  <p className="chip font-mono">
                    <CalendarDays className="size-3.5" aria-hidden />
                    {item.period}
                  </p>
                )}
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">{item.role}</h3>
              <ul className="mt-3 space-y-1.5 text-muted-foreground">
                {item.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-[0.6rem] h-px w-3 shrink-0 bg-border-strong" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Container>
  );
}
