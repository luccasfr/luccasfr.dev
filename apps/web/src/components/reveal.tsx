import { cn } from "@luccasfr/ui/lib/utils";
import { useCallback, type ComponentProps } from "react";

/** Revela o conteúdo quando entra na viewport (IntersectionObserver via ref callback). */
export function Reveal({ className, ...props }: ComponentProps<"div">) {
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.dataset.visible = "";
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-safe:not-data-visible:translate-y-6 motion-safe:not-data-visible:opacity-0 motion-safe:not-data-visible:blur-sm",
        className,
      )}
      {...props}
    />
  );
}
