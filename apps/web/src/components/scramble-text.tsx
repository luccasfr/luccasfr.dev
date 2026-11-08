import { cn } from "@luccasfr/ui/lib/utils";
import { useCallback, useRef, type ComponentProps } from "react";

const GLYPHS = "█▓▒░<>/\\{}[]#$%&@*+=01ABCDEFX";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Texto que se "decodifica": cada letra passa por glifos aleatórios antes de assentar.
 * Anima ao montar (autoplay) e de novo ao passar o mouse (replayOnHover).
 * O texto real fica sempre no aria-label e no DOM inicial (funciona sem JS).
 */
export function ScrambleText({
  text,
  autoplay = false,
  replayOnHover = false,
  delay = 0,
  stagger = 45,
  className,
  ...props
}: Omit<ComponentProps<"span">, "children"> & {
  text: string;
  autoplay?: boolean;
  replayOnHover?: boolean;
  delay?: number;
  stagger?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef(0);

  const play = useCallback(
    (startDelay: number) => {
      const node = nodeRef.current;
      if (!node || prefersReducedMotion()) return;
      cancelAnimationFrame(frameRef.current);
      const chars = Array.from(node.children) as HTMLSpanElement[];
      const start = performance.now() + startDelay;

      const tick = (now: number) => {
        let done = true;
        chars.forEach((span, index) => {
          const final = text[index] ?? "";
          if (final === " ") return;
          const settleAt = start + index * stagger + 280;
          if (now < settleAt) {
            done = false;
            if (now >= start - 40) {
              span.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? final;
            }
          } else if (span.textContent !== final) {
            span.textContent = final;
          }
        });
        if (!done) frameRef.current = requestAnimationFrame(tick);
      };
      frameRef.current = requestAnimationFrame(tick);
    },
    [text, stagger],
  );

  const ref = useCallback(
    (node: HTMLSpanElement | null) => {
      nodeRef.current = node;
      if (node && autoplay) play(delay);
      return () => cancelAnimationFrame(frameRef.current);
    },
    [autoplay, delay, play],
  );

  return (
    <span
      ref={ref}
      aria-label={text}
      role="text"
      onPointerEnter={replayOnHover ? () => play(0) : undefined}
      className={cn("inline-block whitespace-pre", className)}
      {...props}
    >
      {Array.from(text).map((char, index) => (
        <span key={index} aria-hidden>
          {char}
        </span>
      ))}
    </span>
  );
}
