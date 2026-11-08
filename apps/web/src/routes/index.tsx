import { Avatar, AvatarFallback, AvatarImage } from "@luccasfr/ui/components/avatar";
import { Badge } from "@luccasfr/ui/components/badge";
import { Button, buttonVariants } from "@luccasfr/ui/components/button";
import { Card, CardContent, CardFooter, CardHeader } from "@luccasfr/ui/components/card";
import { Separator } from "@luccasfr/ui/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@luccasfr/ui/components/tabs";
import { cn } from "@luccasfr/ui/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Code2, Copy, GitBranch, MapPin, Star } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { toast } from "sonner";

import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { marquee, openSource, profile, projects, stack, type Project } from "@/lib/content";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function copyEmail() {
  void navigator.clipboard.writeText(profile.email);
  toast.success("e-mail copiado", { description: profile.email });
}

function HomeComponent() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Work />
      <OpenSource />
      <Stack />
      <Contact />
    </main>
  );
}

/* ───────────────────────────── hero ───────────────────────────── */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)] bg-size-[56px_56px]"
      />
      <div
        aria-hidden
        className="absolute -top-48 left-1/2 -z-10 size-160 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-transparent via-primary/6 to-transparent motion-safe:animate-scan"
      />

      <div className="mx-auto grid max-w-6xl gap-14 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:pb-28">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground motion-safe:animate-rise">
            <span className="text-primary">lucas@jerasoft</span>
            <span>:~$ </span>
            <span className="text-foreground">whoami</span>
          </p>

          <h1 className="mt-6 font-heading text-5xl leading-[0.92] font-bold tracking-tighter sm:text-7xl lg:text-8xl motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
            Lucas
            <br />
            Ferreira<span className="text-primary motion-safe:animate-flicker">.</span>
          </h1>

          <p className="mt-6 flex items-center text-sm text-primary sm:text-base">
            <span className="inline-block overflow-hidden whitespace-nowrap [--type-w:28ch] motion-safe:animate-type motion-safe:[animation-delay:600ms]">
              {"> "}
              {profile.role}
            </span>
            <span className="ml-1 inline-block h-5 w-2.5 bg-primary motion-safe:animate-blink" />
          </p>

          <p className="mt-6 max-w-xl text-sm/relaxed text-muted-foreground motion-safe:animate-rise motion-safe:[animation-delay:300ms]">
            Construo software que precisa funcionar todo dia: de ERPs em Delphi e Firebird a apps
            desktop em Tauri e Rust, APIs em Fastify e interfaces em React. Sócio da{" "}
            <a
              href="https://www.jerasoft.com.br"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline decoration-primary/50 underline-offset-4 hover:decoration-primary"
            >
              JeraSoft
            </a>
            .
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2 motion-safe:animate-rise motion-safe:[animation-delay:420ms]">
            <a href="#trabalhos" className={buttonVariants({ size: "lg" })}>
              ver trabalhos
              <ArrowDown data-icon="inline-end" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              github.com/{profile.handle}
              <ArrowUpRight data-icon="inline-end" />
            </a>
            <Button size="lg" variant="ghost" onClick={copyEmail}>
              <Copy data-icon="inline-start" />
              copiar e-mail
            </Button>
          </div>
        </div>

        <ProfileTerminal />
      </div>
    </section>
  );
}

function ProfileTerminal() {
  const lines: Array<[string, ReactNode]> = [
    ["nome", `"${profile.name}"`],
    ["cargo", `"${profile.role}"`],
    ["empresa", `"${profile.company} (sócio)"`],
    ["local", `"${profile.location}"`],
    ["linguagens", `[${profile.languages.map((language) => `"${language}"`).join(", ")}]`],
    ["foco", `"produto, ERP, desktop e web"`],
  ];

  return (
    <Card className="min-w-0 py-0 shadow-2xl shadow-primary/5 motion-safe:animate-rise motion-safe:[animation-delay:500ms]">
      <CardHeader className="flex items-center gap-2 border-b py-3">
        <span className="size-2.5 rounded-full bg-destructive/70" />
        <span className="size-2.5 rounded-full bg-chart-3/70" />
        <span className="size-2.5 rounded-full bg-primary/70" />
        <span className="ml-2 text-xs text-muted-foreground">~/.profile</span>
      </CardHeader>
      <CardContent className="pb-5 text-xs/relaxed">
        <div className="flex items-center gap-3">
          <Avatar size="lg" className="rounded-none after:rounded-none">
            <AvatarImage src={profile.avatar} alt={profile.name} className="rounded-none" />
            <AvatarFallback className="rounded-none">LF</AvatarFallback>
          </Avatar>
          <p className="text-muted-foreground">
            <span className="text-primary">$</span> cat ~/.profile
          </p>
        </div>
        <pre className="mt-4 overflow-x-auto font-mono whitespace-pre-wrap">
          <span className="text-muted-foreground">{"{"}</span>
          {lines.map(([key, value], index) => (
            <span
              key={key}
              className="block pl-4 motion-safe:animate-rise motion-safe:[animation-delay:calc(700ms+var(--i)*110ms)]"
              style={{ "--i": index } as CSSProperties}
            >
              <span className="text-chart-2">"{key}"</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-primary">{value}</span>
              <span className="text-muted-foreground">{index < lines.length - 1 ? "," : ""}</span>
            </span>
          ))}
          <span className="text-muted-foreground">{"}"}</span>
        </pre>
        <p className="mt-3 text-muted-foreground">
          <span className="text-primary">$</span>{" "}
          <span className="inline-block h-3.5 w-2 translate-y-0.5 bg-foreground motion-safe:animate-blink" />
        </p>
      </CardContent>
    </Card>
  );
}

/* ──────────────────────────── marquee ─────────────────────────── */

function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="group overflow-hidden border-y bg-card/40 py-4">
      <div className="flex w-max gap-10 text-sm text-muted-foreground motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10">
            <span className="transition-colors hover:text-primary">{item}</span>
            <span aria-hidden className="text-primary/40">
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────── seções ──────────────────────────── */

function SectionTitle({ command, title, children }: { command: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="mb-10 flex flex-col gap-4 sm:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs text-muted-foreground">
          <span className="text-primary">$</span> {command}
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tighter sm:text-5xl">{title}</h2>
      </div>
      {children && <div className="max-w-sm text-xs/relaxed text-muted-foreground">{children}</div>}
    </Reveal>
  );
}

function Work() {
  const [featured, ...rest] = projects;
  return (
    <section id="trabalhos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionTitle command="ls -la ~/trabalhos" title="Coisas que eu fiz">
        Produto próprio, empresa da qual sou sócio, cliente e open source. Tudo em produção.
      </SectionTitle>

      {featured && <FeaturedProject project={featured} />}

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {rest.map((project, index) => (
          <Reveal key={project.id} className={cn(index === 1 && "delay-100", index === 2 && "delay-200")}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal>
      <SpotlightCard id={project.id} className="scroll-mt-20 py-0">
        <div className="grid lg:grid-cols-[1fr_1.35fr]">
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <ProjectMeta project={project} />
            <h3 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl">{project.name}</h3>
            <p className="text-sm/relaxed text-muted-foreground">{project.summary}</p>
            {project.highlights && (
              <ul className="flex flex-col gap-2 text-xs/relaxed">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="text-primary">→</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
            <StackBadges stack={project.stack} />
          </div>

          <div className="relative overflow-hidden border-t bg-muted/30 p-4 perspective-distance-[1400px] sm:p-8 lg:border-t-0 lg:border-l">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklch,var(--color-primary)_18%,transparent),transparent_60%)]"
            />
            <img
              src="/telyo.png"
              alt="Tela inicial do Telyo com salas, clipes recentes e plugins"
              loading="lazy"
              className="relative w-full ring-1 ring-foreground/10 shadow-2xl shadow-black/40 transition-transform duration-700 ease-out motion-safe:rotate-x-4 motion-safe:-rotate-y-8 motion-safe:group-hover/spot:rotate-0 motion-safe:group-hover/spot:scale-[1.02]"
            />
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const host = project.url ? new URL(project.url).host.replace(/^www\./, "") : undefined;
  return (
    <SpotlightCard id={project.id} className="h-full scroll-mt-20">
      <CardHeader>
        <ProjectMeta project={project} />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <h3 className="font-heading text-2xl font-bold tracking-tighter">{project.name}</h3>

        {project.quote && host && (
          <div className="ring-1 ring-foreground/10">
            <div className="flex items-center gap-1.5 border-b bg-muted/50 px-3 py-2">
              <span className="size-1.5 rounded-full bg-muted-foreground/40" />
              <span className="size-1.5 rounded-full bg-muted-foreground/40" />
              <span className="size-1.5 rounded-full bg-muted-foreground/40" />
              <span className="ml-2 truncate text-xs text-muted-foreground">https://{host}</span>
            </div>
            <p className="p-4 font-heading text-sm/snug font-semibold tracking-tight text-balance transition-colors group-hover/spot:text-primary">
              “{project.quote}”
            </p>
          </div>
        )}

        <p className="text-xs/relaxed text-muted-foreground">{project.summary}</p>
        <div className="mt-auto">
          <StackBadges stack={project.stack} />
        </div>
      </CardContent>
      <CardFooter className="flex-wrap gap-2 bg-muted/20">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            {host}
            <ArrowUpRight data-icon="inline-end" />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "sm", variant: "ghost" })}
          >
            <GitBranch data-icon="inline-start" />
            código
          </a>
        )}
      </CardFooter>
    </SpotlightCard>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      <span className="text-primary">{project.index}</span>
      <span>{project.kind}</span>
      {project.badge && (
        <Badge variant="outline" className="border-primary/40 text-primary">
          {project.badge}
        </Badge>
      )}
      {project.stars !== undefined && (
        <Badge variant="secondary">
          <Star />
          {project.stars}
        </Badge>
      )}
    </div>
  );
}

function StackBadges({ stack }: { stack?: string[] }) {
  if (!stack) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((item) => (
        <Badge key={item} variant="outline" className="text-muted-foreground">
          {item}
        </Badge>
      ))}
    </div>
  );
}

/* ────────────────────────── open source ───────────────────────── */

function OpenSource() {
  return (
    <section id="open-source" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 sm:px-6">
      <SectionTitle command="git log --author=luccasfr --public" title="Open source" />
      <Reveal>
        <Card className="py-0">
          {openSource.map((repo, index) => (
            <div key={repo.name}>
              {index > 0 && <Separator />}
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/40"
              >
                <GitBranch className="size-4 text-primary" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium transition-colors group-hover:text-primary">
                    {repo.name}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{repo.description}</span>
                </span>
                <span className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="size-3.5" />
                    {repo.stars}
                  </span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </span>
              </a>
            </div>
          ))}
        </Card>
      </Reveal>
    </section>
  );
}

/* ───────────────────────────── stack ──────────────────────────── */

const stackTabs = [
  { value: "linguagens", label: "linguagens" },
  { value: "frontend", label: "frontend" },
  { value: "backend", label: "backend" },
  { value: "desktop", label: "desktop" },
] as const;

function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 sm:px-6">
      <SectionTitle command="cat stack.json | jq" title="Ferramentas do dia a dia">
        Do legado em Delphi ao Rust no desktop. Uso o que resolve o problema e mantém a operação de pé.
      </SectionTitle>
      <Reveal>
        <Tabs defaultValue="linguagens">
          <TabsList variant="line" className="flex-wrap">
            {stackTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {stackTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              <Card className="py-0">
                <pre className="overflow-x-auto p-5 font-mono text-xs/relaxed sm:p-6 sm:text-sm/relaxed">
                  <span className="text-muted-foreground">{"{"}</span>
                  {"\n"}
                  <span className="pl-4 text-chart-2">"{tab.value}"</span>
                  <span className="text-muted-foreground">: [</span>
                  {stack[tab.value].map((item, index) => (
                    <span key={item} className="block pl-8 motion-safe:animate-rise motion-safe:[animation-delay:calc(var(--i)*60ms)]"
                      style={{ "--i": index } as CSSProperties}>
                      <span className="text-primary">"{item}"</span>
                      <span className="text-muted-foreground">{index < stack[tab.value].length - 1 ? "," : ""}</span>
                    </span>
                  ))}
                  <span className="pl-4 text-muted-foreground">]</span>
                  {"\n"}
                  <span className="text-muted-foreground">{"}"}</span>
                </pre>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </Reveal>
    </section>
  );
}

/* ──────────────────────────── contato ─────────────────────────── */

function Contact() {
  return (
    <section id="contato" className="scroll-mt-20 border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal>
          <p className="text-xs text-muted-foreground">
            <span className="text-primary">$</span> echo $PROXIMO_PROJETO
          </p>
          <h2 className="mt-4 max-w-4xl font-heading text-4xl leading-[0.95] font-bold tracking-tighter text-balance sm:text-6xl lg:text-7xl">
            Tem um sistema que precisa <span className="text-primary">funcionar</span>?
          </h2>
          <p className="mt-6 max-w-xl text-sm/relaxed text-muted-foreground">
            Produto novo, migração de legado, integração ou aquele app interno que ninguém quer encarar.
            Me chama.
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            <a href={`mailto:${profile.email}`} className={buttonVariants({ size: "lg" })}>
              {profile.email}
              <ArrowUpRight data-icon="inline-end" />
            </a>
            <Button size="lg" variant="outline" onClick={copyEmail}>
              <Copy data-icon="inline-start" />
              copiar
            </Button>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg", variant: "ghost" })}
            >
              github
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </div>
        </Reveal>
      </div>

      <Separator />
      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          online
          <span className="text-primary/50">/</span>
          <MapPin className="size-3.5" />
          {profile.location}
        </p>
        <p className="flex flex-wrap items-center gap-2">
          © {new Date().getFullYear()} {profile.name}
          <span className="text-primary/50">/</span>
          <Code2 className="size-3.5" />
          Bun · Vite · TanStack Router · Tailwind · shadcn/ui
        </p>
      </footer>
    </section>
  );
}
