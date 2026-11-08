export const profile = {
  name: "Lucas Ferreira",
  handle: "luccasfr",
  role: "Senior Full-Stack Engineer",
  company: "JeraSoft",
  location: "Brasil",
  email: "lucas.ferreira@jerasoft.inf.br",
  github: "https://github.com/luccasfr",
  avatar: "https://github.com/luccasfr.png?size=160",
  languages: ["Delphi", "PHP", "TypeScript", "Python", "Rust"],
} as const;

export type Project = {
  id: string;
  index: string;
  name: string;
  kind: string;
  badge?: string;
  summary: string;
  highlights?: string[];
  quote?: string;
  stack?: string[];
  stars?: number;
  url?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "telyo",
    index: "01",
    name: "Telyo",
    kind: "App desktop · produto próprio",
    badge: "beta fechado",
    summary:
      "Salas privadas para jogar e assistir junto. Transmissão de tela, chat, clipes com replay e plugins, com login pelo Discord, whitelist e permissões por sala.",
    highlights: [
      "Desktop em Tauri 2 + Rust, com auto-update assinado",
      "API Fastify 5 + tRPC 11, Drizzle e PostgreSQL",
      "Mídia em LiveKit SFU próprio, uma assinatura de vídeo por vez",
    ],
    stack: ["Tauri 2", "Rust", "React 19", "Fastify 5", "tRPC 11", "Drizzle", "PostgreSQL", "LiveKit"],
  },
  {
    id: "jerasoft",
    index: "02",
    name: "JeraSoft",
    kind: "Institucional + área do cliente",
    badge: "sócio",
    summary:
      "Sou sócio da JeraSoft e construí o site institucional e a área do cliente. Software empresarial que conecta gestão, atendimento e canais: Store & Service e Jera Ofício.",
    quote: "Tecnologia para operações que precisam funcionar todos os dias.",
    url: "https://www.jerasoft.com.br",
  },
  {
    id: "gabriela",
    index: "03",
    name: "Gabriela Alves",
    kind: "Site profissional · psicologia",
    summary:
      "Site para a prática clínica de uma psicóloga: atendimento on-line, TCC e conteúdo das redes, com tipografia editorial e um tom de acolhimento.",
    quote: "Psicoterapia com presença, clareza e cuidado clínico.",
    url: "https://gabrielaalves.psc.br",
  },
  {
    id: "repo-save-editor",
    index: "04",
    name: "R.E.P.O Save Editor",
    kind: "Ferramenta open source",
    summary:
      "Editor web de saves do jogo R.E.P.O: stats de jogador, moedas, upgrades e configurações de time. A criptografia do save foi portada de Python para Node.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind 4", "next-intl", "shadcn/ui"],
    stars: 69,
    url: "https://repo-save-editor.vercel.app",
    repo: "https://github.com/luccasfr/repo-save-editor",
  },
];

export const openSource = [
  {
    name: "electron-boilerplate",
    description: "Boilerplate Electron com router baseado em arquivos, Tailwind e shadcn/ui.",
    stars: 13,
    url: "https://github.com/luccasfr/electron-boilerplate",
  },
  {
    name: "fastify-boilerplate",
    description: "Template de API com Fastify, Zod e Prisma, validação integrada e docs automáticas.",
    stars: 6,
    url: "https://github.com/luccasfr/fastify-boilerplate",
  },
  {
    name: "repo-save-editor",
    description: "Editor web de saves do R.E.P.O, com i18n e criptografia portada para Node.",
    stars: 69,
    url: "https://github.com/luccasfr/repo-save-editor",
  },
] as const;

export const stack = {
  linguagens: ["TypeScript", "Rust", "Delphi", "PHP", "Python", "SQL"],
  frontend: ["React 19", "Next.js", "TanStack Router", "Vite", "Tailwind CSS 4", "shadcn/ui"],
  backend: ["Bun", "Fastify", "tRPC", "Zod", "Drizzle", "Prisma", "PostgreSQL", "Firebird"],
  desktop: ["Tauri 2", "Electron", "Delphi FMX/VCL", "React Native", "LiveKit"],
} as const;

export const marquee = [
  "Delphi",
  "TypeScript",
  "Rust",
  "PHP",
  "Python",
  "React",
  "Tauri",
  "Fastify",
  "Bun",
  "tRPC",
  "PostgreSQL",
  "Firebird",
  "LiveKit",
  "Next.js",
  "React Native",
  "Tailwind",
  "shadcn/ui",
  "Turborepo",
];
