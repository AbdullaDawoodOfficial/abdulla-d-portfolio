import { Download } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { profile } from "@/content/profile";

import { openResume } from "./actions";

export function ResumeButton({ variant = "glass", size = "pill", className }: Pick<ButtonProps, "variant" | "size" | "className">) {
  const href = profile.links.resume;
  if (href) {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <a href={href} download target="_blank" rel="noopener noreferrer">
          <Download aria-hidden />
          Resume
        </a>
      </Button>
    );
  }
  return (
    <Button variant={variant} size={size} className={className} onClick={openResume}>
      <Download aria-hidden />
      Resume
    </Button>
  );
}
