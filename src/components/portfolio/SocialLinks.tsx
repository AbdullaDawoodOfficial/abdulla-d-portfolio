import { Github, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="glass" size="icon-pill">
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
          <Github aria-hidden />
        </a>
      </Button>
      <Button asChild variant="glass" size="icon-pill">
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
          <Linkedin aria-hidden />
        </a>
      </Button>
    </div>
  );
}
