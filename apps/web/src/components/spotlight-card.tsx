import { Card } from "@luccasfr/ui/components/card";
import { cn } from "@luccasfr/ui/lib/utils";
import type { ComponentProps, PointerEvent } from "react";

function trackPointer(event: PointerEvent<HTMLDivElement>) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  // Valores dinâmicos em runtime: expostos como variáveis CSS e consumidos por classes Tailwind.
  target.style.setProperty("--x", `${event.clientX - rect.left}px`);
  target.style.setProperty("--y", `${event.clientY - rect.top}px`);
}

/** Card com brilho que segue o ponteiro. */
export function SpotlightCard({ className, children, ...props }: ComponentProps<typeof Card>) {
  return (
    <Card
      onPointerMove={trackPointer}
      className={cn(
        "group/spot relative isolate transition-[box-shadow,translate] duration-300 hover:ring-primary/40 motion-safe:hover:-translate-y-0.5",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(480px_circle_at_var(--x,50%)_var(--y,0%),color-mix(in_oklch,var(--color-primary)_13%,transparent),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      />
      {children}
    </Card>
  );
}
