import { CommandMenu } from "./command-menu";
import { ModeToggle } from "./mode-toggle";

const links = [
  { href: "#trabalhos", label: "trabalhos" },
  { href: "#stack", label: "stack" },
  { href: "#contato", label: "contato" },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-1 text-sm font-medium">
          <span className="text-primary">~/</span>
          <span>luccasfr</span>
          <span className="ml-0.5 inline-block h-4 w-2 bg-primary motion-safe:animate-blink" />
        </a>
        <nav className="hidden items-center gap-6 text-xs text-muted-foreground md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-primary">
              <span className="text-primary/60">./</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CommandMenu />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
