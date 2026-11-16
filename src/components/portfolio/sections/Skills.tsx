import { Database, Layout, Server, Wrench, type LucideIcon } from "lucide-react";

import { skillGroups, type SkillGroup } from "@/content/profile";

import { trackSpotlight } from "../cinematic";
import { Container, SectionHeading } from "../Container";

const ICONS: Record<SkillGroup["key"], LucideIcon> = {
  backend: Server,
  frontend: Layout,
  database: Database,
  tools: Wrench,
};

export function Skills() {
  return (
    <Container>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading index="02" eyebrow="Technical Skills" title="The stack I build with." />
        <p className="max-w-sm text-muted-foreground">
          Backend-first, with a practical eye for the interfaces people use.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => {
          const Icon = ICONS[group.key];
          return (
            <article
              key={group.key}
              onPointerMove={trackSpotlight}
              className="glass spotlight group flex flex-col rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-border-strong bg-surface-strong text-foreground transition-colors duration-500 group-hover:border-primary/50 group-hover:text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-mono text-xs text-subtle-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-lg font-bold tracking-tight text-foreground">{group.title}</h3>
              <p className="mt-1 font-mono text-xs text-subtle-foreground">
                {group.items.length} {group.items.length === 1 ? "skill" : "skills"}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="chip hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Container>
  );
}
