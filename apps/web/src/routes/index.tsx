import { Button, buttonVariants } from "@luccasfr/ui/components/button";
import { cn } from "@luccasfr/ui/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { ScrambleText } from "@/components/scramble-text";
import { useSaoPauloClock } from "@/hooks/use-clock";
import { useI18n } from "@/i18n/locale";
import { linkHost, openSource, profile, projects, type Project } from "@/lib/content";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function copyEmail(message: string) {
  void navigator.clipboard.writeText(profile.email);
  toast.success(message, { description: profile.email });
}

const container = "mx-auto w-full max-w-360 px-4 sm:px-8";
const invertLink =
  "underline decoration-1 underline-offset-4 transition-colors hover:bg-foreground hover:text-background hover:no-underline";

function HomeComponent() {
  return (
    <>
      <main>
        <Hero />
        <WorkIndex />
        <Languages />
        <Stack />
        <OpenSource />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ───────────────────────── hero ───────────────────────── */

function Clock() {
  const time = useSaoPauloClock();
  return <span className="tabular-nums">{time}</span>;
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className={cn(container, "flex min-h-[calc(100svh-3.5rem)] flex-col justify-between gap-12 pt-10 pb-8")}>
      <div className="flex flex-wrap justify-between gap-x-8 gap-y-2 text-xs text-muted-foreground motion-safe:animate-rise">
        <p>{t.hero.role}</p>
        <p>
          {t.hero.city}, <Clock />
        </p>
      </div>

      <h1 className="overflow-hidden font-display text-name font-black tracking-tight uppercase">
        <ScrambleText text="Lucas" autoplay delay={150} className="block" />
        <span className="flex items-end">
          <ScrambleText text="Ferreira" autoplay delay={420} />
          <span
            aria-hidden
            className="mb-[0.06em] ml-[0.08em] inline-block h-[0.72em] w-[0.42em] bg-foreground motion-safe:animate-blink"
          />
        </span>
      </h1>

      <div className="grid gap-8 border-t pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <p className="max-w-[52ch] text-base/relaxed motion-safe:animate-rise motion-safe:[animation-delay:900ms]">
          {t.hero.introBefore}{" "}
          <a href={profile.jerasoft} target="_blank" rel="noreferrer" className={invertLink}>
            JeraSoft
          </a>{" "}
          {t.hero.introAfter}
        </p>
        <div className="flex flex-wrap gap-2 motion-safe:animate-rise motion-safe:[animation-delay:1050ms]">
          <a href="#trabalhos" className={buttonVariants({ size: "lg" })}>
            {t.hero.work}
          </a>
          <a href={`mailto:${profile.email}`} className={buttonVariants({ size: "lg", variant: "outline" })}>
            {t.hero.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            {t.hero.github}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── títulos de seção ───────────────────── */

function SectionTitle({ id, title, count, children }: { id?: string; title: string; count?: string; children?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-end md:justify-between">
      <h2 id={id} className="scroll-mt-20 font-display text-section font-black uppercase">
        <ScrambleText key={title} text={title} replayOnHover />
        {count && <span className="ml-3 align-top font-sans text-sm font-normal text-muted-foreground">({count})</span>}
      </h2>
      {children && <div className="max-w-[44ch] text-xs/relaxed text-muted-foreground">{children}</div>}
    </div>
  );
}

/* ───────────────────────── trabalho ───────────────────────── */

function WorkIndex() {
  const { t } = useI18n();
  return (
    <section className={cn(container, "py-24")}>
      <SectionTitle id="trabalhos" title={t.work.title} count={String(projects.length).padStart(2, "0")}>
        {t.work.intro}
      </SectionTitle>

      <ol className="border-t">
        {projects.map((project) => (
          <WorkRow key={project.id} project={project} />
        ))}
      </ol>
    </section>
  );
}

function WorkRow({ project }: { project: Project }) {
  const { t } = useI18n();
  const copy = t.work.projects[project.id];
  return (
    <li
      id={project.id}
      className="group grid scroll-mt-20 grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-b px-3 py-6 transition-colors focus-within:bg-foreground focus-within:text-background hover:bg-foreground hover:text-background sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,16rem)]"
    >
      <span className="text-xs text-muted-foreground tabular-nums group-hover:text-background group-focus-within:text-background">
        {project.index}
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-3xl font-black uppercase sm:text-5xl">{project.name}</h3>
        <p className="mt-2 text-xs/relaxed text-muted-foreground group-hover:text-background/75 group-focus-within:text-background/75">
          {copy.what}
        </p>
        {project.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                {link.kind === "site" ? linkHost(link.href) : t.work.code}
              </a>
            ))}
          </div>
        )}
      </div>
      <p className="col-start-2 text-xs text-muted-foreground group-hover:text-background/75 group-focus-within:text-background/75 sm:col-start-3 sm:text-right">
        {copy.relation}
      </p>
    </li>
  );
}

/* ───────────────────── faixa de linguagens ───────────────────── */

const languages = ["Delphi", "PHP", "TypeScript", "Python", "Rust"];

function Languages() {
  const { t } = useI18n();
  const items = [...languages, ...languages, ...languages, ...languages];
  return (
    <div aria-label={t.languages} className="group overflow-hidden border-y py-6">
      <div
        aria-hidden
        className="flex w-max gap-12 font-display text-6xl font-black uppercase motion-safe:animate-marquee group-hover:[animation-play-state:paused] sm:text-8xl"
      >
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className={index % 2 === 1 ? "text-transparent [-webkit-text-stroke:1px_var(--color-foreground)]" : ""}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── stack ───────────────────────── */

function Stack() {
  const { t } = useI18n();
  return (
    <section className={cn(container, "py-24")}>
      <SectionTitle id="stack" title={t.stack.title}>
        {t.stack.intro}
      </SectionTitle>
      <div className="border-t">
        {t.stack.rows.map((row) => (
          <div
            key={row.area}
            className="grid gap-1 border-b px-3 py-4 transition-colors hover:bg-foreground hover:text-background sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6"
          >
            <span className="text-xs opacity-60">{row.area}</span>
            <span className="text-sm">{row.items}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── open source ───────────────────────── */

function OpenSource() {
  const { t } = useI18n();
  return (
    <section className={cn(container, "pb-24")}>
      <SectionTitle id="open-source" title={t.openSource.title} count={String(openSource.length).padStart(2, "0")} />
      <ul className="border-t">
        {openSource.map((repo) => (
          <li key={repo.name} className="border-b">
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 px-3 py-4 transition-colors hover:bg-foreground hover:text-background"
            >
              <span className="min-w-0">
                <span className="block text-sm">{repo.name}</span>
                <span className="mt-1 block text-xs opacity-60">{t.openSource.descriptions[repo.name]}</span>
              </span>
              <span className="text-xs tabular-nums">
                {repo.stars} <span className="sr-only">{t.openSource.stars}</span>
                <span aria-hidden>★</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────────────────────── contato ───────────────────────── */

function Contact() {
  const { t } = useI18n();
  return (
    <section className={cn(container, "pb-24")}>
      <SectionTitle id="contato" title={t.contact.title}>
        {t.contact.intro}
      </SectionTitle>
      <a
        href={`mailto:${profile.email}`}
        className="block border px-4 py-8 text-xl break-all transition-colors hover:bg-foreground hover:text-background sm:px-8 sm:py-12 sm:text-4xl lg:text-5xl"
      >
        {profile.email}
      </a>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="lg" variant="outline" onClick={() => copyEmail(t.contact.copied)}>
          {t.contact.copy}
        </Button>
        <a href={profile.github} target="_blank" rel="noreferrer" className={buttonVariants({ size: "lg", variant: "ghost" })}>
          github.com/{profile.handle}
        </a>
      </div>
    </section>
  );
}

/* ───────────────────────── rodapé ───────────────────────── */

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t">
      <div className={cn(container, "flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between")}>
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>{t.footer.madeWith}</p>
        <a href="#top" className="w-fit hover:bg-foreground hover:text-background">
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
