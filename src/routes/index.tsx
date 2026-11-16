import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CinematicStage } from "@/components/portfolio/CinematicStage";
import { Navbar } from "@/components/portfolio/Navbar";
import { scenes } from "@/components/portfolio/scenes";
import type { SectionId } from "@/content/profile";

const TITLE = "Abdulla D";
const DESCRIPTION =
  "Portfolio of Abdulla D., a Java & Web Developer building reliable backend applications with Spring Boot and responsive web experiences.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  const [active, setActive] = useState<SectionId>("home");

  return (
    <>
      <div className="site-bg" aria-hidden />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar active={active} />
      <main id="main">
        <CinematicStage scenes={scenes} onActiveChange={setActive} />
      </main>
    </>
  );
}
