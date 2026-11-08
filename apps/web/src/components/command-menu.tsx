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
  ArrowUpRight,
  AtSign,
  FolderGit2,
  Hash,
  Monitor,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useTheme } from "@/components/theme-provider";
import { useMountEffect } from "@/hooks/use-mount-effect";
import { profile, projects } from "@/lib/content";

const sections = [
  { id: "trabalhos", label: "Trabalhos" },
  { id: "open-source", label: "Open source" },
  { id: "stack", label: "Stack" },
  { id: "contato", label: "Contato" },
] as const;

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

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
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-3 text-muted-foreground"
      >
        <Search />
        <span className="hidden sm:inline">buscar</span>
        <KbdGroup className="hidden sm:inline-flex">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Paleta de comandos"
        description="Navegue pela página ou abra links"
      >
        <Command>
          <CommandInput placeholder="digite um comando…" />
          <CommandList>
            <CommandEmpty>nada encontrado. tente "telyo".</CommandEmpty>
            <CommandGroup heading="ir para">
              {sections.map((section) => (
                <CommandItem key={section.id} onSelect={() => run(() => goTo(section.id))}>
                  <Hash />
                  {section.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="projetos">
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={`${project.name} ${project.kind}`}
                  onSelect={() => run(() => (project.url ? openUrl(project.url) : goTo(project.id)))}
                >
                  <FolderGit2 />
                  {project.name}
                  <CommandShortcut>{project.index}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="links">
              <CommandItem onSelect={() => run(() => openUrl(profile.github))}>
                <ArrowUpRight />
                GitHub
              </CommandItem>
              <CommandItem
                onSelect={() =>
                  run(() => {
                    void navigator.clipboard.writeText(profile.email);
                    toast.success("e-mail copiado", { description: profile.email });
                  })
                }
              >
                <AtSign />
                Copiar e-mail
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="tema">
              <CommandItem onSelect={() => run(() => setTheme("dark"))}>
                <Moon />
                Escuro
              </CommandItem>
              <CommandItem onSelect={() => run(() => setTheme("light"))}>
                <Sun />
                Claro
              </CommandItem>
              <CommandItem onSelect={() => run(() => setTheme("system"))}>
                <Monitor />
                Sistema
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
