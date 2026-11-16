import { ArrowUpRight, FolderGit2, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/content/profile";

import { trackSpotlight } from "../cinematic";
import { Container, SectionHeading } from "../Container";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      onPointerMove={trackSpotlight}
      className="glass spotlight group flex flex-col rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 font-mono text-[0.7rem] text-subtle-foreground">
          <FolderGit2 className="size-3.5" aria-hidden />
          ~/projects/{project.slug}
        </p>
        <span className="flex items-center gap-2 font-mono text-xs text-subtle-foreground">
          0{index + 1}
          <ArrowUpRight
            className="size-4 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden
          />
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground lg:text-2xl">{project.title}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{project.category}</p>

      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{project.description}</p>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
        {project.tech.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-mono text-xs text-subtle-foreground">Tech stack details coming soon</p>
        )}

        <div className="flex shrink-0 gap-2">
          {project.repo ? (
            <Button asChild variant="glass" size="pill">
              <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}>
                <Github aria-hidden />
                GitHub
              </a>
            </Button>
          ) : (
            <Button variant="quiet" size="pill" disabled title="Repository link coming soon">
              <Github aria-hidden />
              Repo soon
            </Button>
          )}
          {project.demo && (
            <Button asChild variant="hero" size="pill">
              <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>
                Live Demo
                <ArrowUpRight aria-hidden />
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Container>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading index="03" eyebrow="Projects" title="Selected work." />
        <p className="max-w-sm text-muted-foreground">
          Backend systems, web platforms and applied machine learning.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Container>
  );
}
