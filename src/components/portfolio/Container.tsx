import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-14", className)}>{children}</div>;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  className,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="eyebrow flex items-center gap-3">
        <span className="text-gradient font-semibold">{index}</span>
        <span className="hairline h-px w-10" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="display-2 mt-5 text-balance text-foreground">{title}</h2>
    </div>
  );
}
