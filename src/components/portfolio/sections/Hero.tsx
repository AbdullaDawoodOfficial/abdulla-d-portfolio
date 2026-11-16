import { ArrowDown, ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";

import { navigateTo } from "../cinematic";
import { CodeComposition } from "../CodeComposition";
import { Container } from "../Container";
import { SocialLinks } from "../SocialLinks";

export function Hero() {
  return (
    <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
      <div className="animate-in fade-in min-w-0 duration-700">
        <div className="flex flex-wrap items-center gap-3">
          {profile.openToWork && (
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground">
              <span className="status-dot size-2 rounded-full bg-success" aria-hidden />
              Open to Work
            </span>
          )}
          <span className="eyebrow">
            {profile.name} — {profile.title}
          </span>
        </div>

        <h1 className="display-1 mt-7 text-foreground">
          Hi, I'm <span className="text-gradient">{profile.firstName}.</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-[1.15rem]">
          {profile.heroDescription}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button variant="hero" size="xl" onClick={() => navigateTo("projects")}>
            View My Work
            <ArrowRight aria-hidden />
          </Button>
          <Button variant="glass" size="xl" onClick={() => navigateTo("contact")}>
            <Mail aria-hidden />
            Contact Me
          </Button>
          <span className="mx-1 hidden h-8 w-px bg-border sm:block" aria-hidden />
          <SocialLinks />
        </div>

        <p className="eyebrow mt-12 hidden items-center gap-2 lg:flex">
          <ArrowDown className="size-3.5" aria-hidden />
          Scroll to explore
        </p>
      </div>

      <div className="min-w-0 pb-10 lg:pb-0">
        <CodeComposition />
      </div>
    </Container>
  );
}
