import { GraduationCap, MapPin, Target } from "lucide-react";

import { about, profile } from "@/content/profile";

import { trackSpotlight } from "../cinematic";
import { Container, SectionHeading } from "../Container";

export function About() {
  const { education } = about;
  return (
    <Container className="grid [&>*]:min-w-0 gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
      <div>
        <SectionHeading index="01" eyebrow="About" title={about.title} />
        <div className="mt-8 max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-muted-foreground">
          {about.paragraphs.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-end gap-4">
        <article
          onPointerMove={trackSpotlight}
          className="glass spotlight rounded-3xl p-7 transition-colors duration-300 hover:border-border-strong"
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow">Education</span>
            <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-gradient-accent text-primary-foreground shadow-glow">
              <GraduationCap className="size-5" aria-hidden />
            </span>
          </div>
          <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">{education.degree}</h3>
          <p className="mt-2 text-muted-foreground">{education.institution}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="chip font-mono">{education.period}</span>
            <span className="chip">
              <MapPin className="size-3.5" aria-hidden />
              {education.location}
            </span>
          </div>
        </article>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-3xl border border-border p-5">
            <Target className="size-5 text-primary" aria-hidden />
            <p className="mt-4 text-sm font-semibold text-foreground">Core focus</p>
            <p className="mt-1 text-sm text-muted-foreground">Java backend development</p>
          </div>
          <div className="rounded-3xl border border-border p-5">
            <MapPin className="size-5 text-cyan" aria-hidden />
            <p className="mt-4 text-sm font-semibold text-foreground">Based in</p>
            <p className="mt-1 text-sm text-muted-foreground">{profile.location}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
