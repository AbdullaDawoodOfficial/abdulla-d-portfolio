import { toast } from "sonner";

import { profile } from "@/content/profile";

export function openResume() {
  if (profile.links.resume) {
    window.open(profile.links.resume, "_blank", "noopener,noreferrer");
    return;
  }
  toast("Resume coming soon", {
    description: "The downloadable resume hasn't been added yet.",
  });
}
