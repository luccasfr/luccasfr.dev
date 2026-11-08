import { Button } from "@luccasfr/ui/components/button";

import { useI18n } from "@/i18n/locale";

import { CommandMenu } from "./command-menu";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const { t, toggleLocale } = useI18n();
  const links = [
    { href: "#trabalhos", label: t.header.work },
    { href: "#stack", label: t.header.stack },
    { href: "#contato", label: t.header.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-14 max-w-360 items-center justify-between gap-4 px-4 sm:px-8">
        <a href="#top" className="flex items-center gap-1 text-sm font-medium whitespace-nowrap">
          luccasfr
          <span aria-hidden className="inline-block h-4 w-2 bg-foreground motion-safe:animate-blink" />
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="mr-2 hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <CommandMenu />
          <Button variant="outline" size="icon" onClick={toggleLocale} aria-label={t.header.language}>
            {t.header.languageShort}
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
