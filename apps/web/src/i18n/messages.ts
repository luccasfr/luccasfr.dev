import type { Locale } from "./locale";

const ptBR = {
  meta: {
    title: "Lucas Ferreira, engenheiro full-stack",
    description:
      "Lucas Ferreira (luccasfr): engenheiro full-stack e sócio da JeraSoft. Delphi, PHP, TypeScript, Python e Rust.",
  },
  header: {
    work: "trabalho",
    stack: "stack",
    contact: "contato",
    search: "buscar",
    searchLabel: "Buscar no site",
    language: "Switch to English",
    languageShort: "EN",
  },
  theme: {
    toggle: "Alternar tema",
    dark: "Escuro",
    light: "Claro",
    system: "Sistema",
  },
  hero: {
    portraitAlt: "Retrato de Lucas Ferreira desenhado em caracteres ASCII",
    role: "engenheiro full-stack",
    city: "são paulo",
    introBefore: "Escrevo software que precisa rodar todo dia, do Delphi ao Rust. Sou sócio da",
    introAfter: "e construo produtos meus no tempo que sobra.",
    work: "ver trabalho",
    email: "e-mail",
    github: "github",
  },
  work: {
    title: "Trabalho",
    intro: "Produto próprio e open source.",
    projects: {
      telyo: {
        what: "Salas privadas para jogar e assistir junto, com transmissão de tela.",
        relation: "Produto próprio, em beta fechado",
      },
      "repo-save-editor": {
        what: "Editor web de saves do jogo R.E.P.O.",
        relation: "Open source, 69 estrelas",
      },
      "acbrlib-forge": {
        what: "Compila e testa a ACBrLib ConsoleMT para várias plataformas a partir de revisões do SVN oficial do ACBr.",
        relation: "Open source, licença MIT",
      },
    },
    code: "código no GitHub",
  },
  languages: "Linguagens: Delphi, PHP, TypeScript, Python e Rust",
  stack: {
    title: "Stack",
    intro: "O que uso no dia a dia. Do legado em Delphi e Firebird ao desktop em Tauri.",
    rows: [
      { area: "linguagens", items: "TypeScript, Rust, Delphi, PHP, Python, SQL" },
      { area: "front-end", items: "React 19, Next.js, TanStack Router, Tailwind, shadcn/ui" },
      { area: "back-end e dados", items: "Bun, Fastify, tRPC, Zod, Drizzle, Prisma, PostgreSQL, Firebird" },
      { area: "desktop e mobile", items: "Tauri 2, Electron, Delphi FMX e VCL, React Native" },
    ],
  },
  openSource: {
    title: "Aberto",
    descriptions: {
      "repo-save-editor": "Editor de saves do R.E.P.O",
      "electron-boilerplate": "Electron com rotas por arquivo, Tailwind e shadcn/ui",
      "fastify-boilerplate": "API com Fastify, Zod e Prisma, documentada sozinha",
    },
    stars: "estrelas",
  },
  contact: {
    title: "Contato",
    intro: "Produto novo, migração de legado ou integração. Escreve que eu respondo.",
    copy: "copiar endereço",
    copied: "e-mail copiado",
  },
  footer: {
    madeWith: "feito com bun, vite, tanstack router, tailwind e shadcn/ui",
    backToTop: "voltar ao topo",
  },
  palette: {
    title: "Paleta de comandos",
    description: "Navegue pela página ou abra links",
    placeholder: "Ir para, abrir, copiar…",
    empty: "Nada encontrado. Tente “telyo”.",
    goTo: "Ir para",
    projects: "Projetos",
    links: "Links",
    copyEmail: "Copiar e-mail",
    theme: "Tema",
    language: "Idioma",
    sections: {
      trabalhos: "trabalho",
      "open-source": "aberto",
      stack: "stack",
      contato: "contato",
    },
  },
};

export type Messages = typeof ptBR;

const enUS: Messages = {
  meta: {
    title: "Lucas Ferreira, full-stack engineer",
    description:
      "Lucas Ferreira (luccasfr): full-stack engineer and partner at JeraSoft. Delphi, PHP, TypeScript, Python and Rust.",
  },
  header: {
    work: "work",
    stack: "stack",
    contact: "contact",
    search: "search",
    searchLabel: "Search the site",
    language: "Mudar para português",
    languageShort: "PT",
  },
  theme: {
    toggle: "Toggle theme",
    dark: "Dark",
    light: "Light",
    system: "System",
  },
  hero: {
    portraitAlt: "Portrait of Lucas Ferreira drawn in ASCII characters",
    role: "full-stack engineer",
    city: "são paulo",
    introBefore: "I write software that has to run every day, from Delphi to Rust. I'm a partner at",
    introAfter: "and I build my own products with the time that's left.",
    work: "see work",
    email: "email",
    github: "github",
  },
  work: {
    title: "Work",
    intro: "My own product and open source.",
    projects: {
      telyo: {
        what: "Private rooms to play and watch together, with screen sharing.",
        relation: "My own product, in closed beta",
      },
      "repo-save-editor": {
        what: "Web editor for R.E.P.O game saves.",
        relation: "Open source, 69 stars",
      },
      "acbrlib-forge": {
        what: "Builds and tests ACBrLib ConsoleMT for multiple platforms from official ACBr SVN revisions.",
        relation: "Open source, MIT license",
      },
    },
    code: "code on GitHub",
  },
  languages: "Languages: Delphi, PHP, TypeScript, Python and Rust",
  stack: {
    title: "Stack",
    intro: "What I use day to day. From legacy Delphi and Firebird to desktop apps in Tauri.",
    rows: [
      { area: "languages", items: "TypeScript, Rust, Delphi, PHP, Python, SQL" },
      { area: "front-end", items: "React 19, Next.js, TanStack Router, Tailwind, shadcn/ui" },
      { area: "back-end and data", items: "Bun, Fastify, tRPC, Zod, Drizzle, Prisma, PostgreSQL, Firebird" },
      { area: "desktop and mobile", items: "Tauri 2, Electron, Delphi FMX and VCL, React Native" },
    ],
  },
  openSource: {
    title: "Open",
    descriptions: {
      "repo-save-editor": "Save editor for R.E.P.O",
      "electron-boilerplate": "Electron with file-based routing, Tailwind and shadcn/ui",
      "fastify-boilerplate": "API with Fastify, Zod and Prisma, self-documenting",
    },
    stars: "stars",
  },
  contact: {
    title: "Contact",
    intro: "A new product, a legacy migration or an integration. Write and I'll answer.",
    copy: "copy address",
    copied: "email copied",
  },
  footer: {
    madeWith: "made with bun, vite, tanstack router, tailwind and shadcn/ui",
    backToTop: "back to top",
  },
  palette: {
    title: "Command palette",
    description: "Move around the page or open links",
    placeholder: "Go to, open, copy…",
    empty: "Nothing found. Try “telyo”.",
    goTo: "Go to",
    projects: "Projects",
    links: "Links",
    copyEmail: "Copy email",
    theme: "Theme",
    language: "Language",
    sections: {
      trabalhos: "work",
      "open-source": "open",
      stack: "stack",
      contato: "contact",
    },
  },
};

export const messages: Record<Locale, Messages> = {
  "pt-BR": ptBR,
  "en-US": enUS,
};
