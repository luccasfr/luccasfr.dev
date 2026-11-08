import { Button } from "@luccasfr/ui/components/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@luccasfr/ui/components/command";
import { Command } from "@luccasfr/ui/components/command";
import { Kbd, KbdGroup } from "@luccasfr/ui/components/kbd";
import {
  ExternalLink,
  AtSign,
  FolderGit2,
  Hash,
  Languages,
  Monitor,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useTheme } from "@/components/theme-provider";
import { useMountEffect } from "@/hooks/use-mount-effect";
import { useI18n } from "@/i18n/locale";
import { profile, projects } from "@/lib/content";

const sections = ["trabalhos", "open-source", "stack", "contato"] as const;

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const { t, locale, setLocale } = useI18n();

  useMountEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const run = (action: () => void) => {
    setOpen(false);
    action();
  };

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const openUrl = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        aria-label={t.header.searchLabel}
        className="gap-3 border-border text-muted-foreground"
      >
        <span className="flex items-center gap-2">
          <Search />
          <span className="hidden sm:inline">{t.header.search}</span>
        </span>
        <KbdGroup className="hidden sm:inline-flex">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={t.palette.title}
        description={t.palette.description}
      >
        <Command>
          <CommandInput placeholder={t.palette.placeholder} />
          <CommandList>
            <CommandEmpty>{t.palette.empty}</CommandEmpty>
            <CommandGroup heading={t.palette.goTo}>
              {sections.map((section) => (
                <CommandItem key={section} onSelect={() => run(() => goTo(section))}>
                  <Hash />
                  {t.palette.sections[section]}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={t.palette.projects}>
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={`${project.name} ${t.work.projects[project.id].what}`}
                  onSelect={() => run(() => goTo(project.id))}
                >
                  <FolderGit2 />
                  {project.name}
                  <CommandShortcut>{project.index}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={t.palette.links}>
              <CommandItem onSelect={() => run(() => openUrl(profile.github))}>
                <ExternalLink />
                GitHub
              </CommandItem>
              <CommandItem
                onSelect={() =>
                  run(() => {
                    void navigator.clipboard.writeText(profile.email);
                    toast.success(t.contact.copied, { description: profile.email });
                  })
                }
              >
                <AtSign />
                {t.palette.copyEmail}
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={t.palette.theme}>
              <CommandItem onSelect={() => run(() => setTheme("dark"))}>
                <Moon />
                {t.theme.dark}
              </CommandItem>
              <CommandItem onSelect={() => run(() => setTheme("light"))}>
                <Sun />
                {t.theme.light}
              </CommandItem>
              <CommandItem onSelect={() => run(() => setTheme("system"))}>
                <Monitor />
                {t.theme.system}
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={t.palette.language}>
              <CommandItem onSelect={() => run(() => setLocale("pt-BR"))} data-checked={locale === "pt-BR"}>
                <Languages />
                Português (Brasil)
              </CommandItem>
              <CommandItem onSelect={() => run(() => setLocale("en-US"))} data-checked={locale === "en-US"}>
                <Languages />
                English
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
