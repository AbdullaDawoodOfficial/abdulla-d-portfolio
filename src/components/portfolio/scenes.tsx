import type { Scene } from "./CinematicStage";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";

export const scenes: Scene[] = [
  { id: "home", label: "Introduction", content: <Hero /> },
  { id: "about", label: "About", content: <About /> },
  { id: "skills", label: "Technical skills", content: <Skills /> },
  { id: "projects", label: "Projects", content: <Projects /> },
  { id: "experience", label: "Experience", content: <Experience /> },
  { id: "contact", label: "Contact", content: <Contact /> },
];
