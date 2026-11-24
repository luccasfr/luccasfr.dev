import { cn } from "@luccasfr/ui/lib/utils";
import { type CSSProperties, useCallback, useRef } from "react";

import { portrait } from "@/lib/portrait";

const GLYPHS = ".:-=+*#%@<>/\\{}[]01";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Uma variante do retrato que se "revela" de cima para baixo: cada linha passa por
 * glifos aleatórios antes de assentar, como o ScrambleText. O texto final já está no DOM
 * (funciona sem JS e com movimento reduzido).
 */
function AsciiArt({ art, delay, className }: { art: string; delay: number; className?: string }) {
  const nodeRef = useRef<HTMLPreElement | null>(null);
  const frameRef = useRef(0);

  const play = useCallback(
    (startDelay: number) => {
      const node = nodeRef.current;
      if (!node || prefersReducedMotion()) return;
      cancelAnimationFrame(frameRef.current);
      const lines = art.split("\n");
      const start = performance.now() + startDelay;
      const perRow = 22;
      const scramble = 260;

      const tick = (now: number) => {
        let done = true;
        const next = lines
          .map((line, row) => {
            const settleAt = start + row * perRow + scramble;
            if (now >= settleAt) return line;
            done = false;
            if (now < start + row * perRow) return line.replace(/\S/g, " ");
            return line.replace(/\S/g, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "#");
          })
          .join("\n");
        node.textContent = next;
        if (!done) frameRef.current = requestAnimationFrame(tick);
      };
      frameRef.current = requestAnimationFrame(tick);
    },
    [art],
  );

  const ref = useCallback(
    (node: HTMLPreElement | null) => {
      nodeRef.current = node;
      if (node) play(delay);
      return () => cancelAnimationFrame(frameRef.current);
    },
    [delay, play],
  );

  return (
    <pre
      ref={ref}
      aria-hidden
      onPointerEnter={() => play(0)}
      className={cn("font-mono leading-none font-semibold tracking-normal select-none [font-kerning:none] [font-variant-ligatures:none]", className)}
    >
      {art}
    </pre>
  );
}

/**
 * Retrato em ASCII gerado por `scripts/portrait.ts`. Duas variantes: caracteres claros
 * sobre preto (tema escuro) e a inversão para o tema claro, para o rosto nunca virar negativo.
 * O tamanho vem do pai via font-size (cada célula tem 0.6em × 1em).
 */
export function AsciiPortrait({ label, delay = 0, className }: { label: string; delay?: number; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{ "--portrait-cols": portrait.cols } as CSSProperties}
      className={cn("text-[length:calc(100cqw/var(--portrait-cols)/0.6)]", className)}
    >
      <AsciiArt art={portrait.light} delay={delay} className="dark:hidden" />
      <AsciiArt art={portrait.dark} delay={delay} className="hidden dark:block" />
    </div>
  );
}
