export const profile = {
  name: "Lucas Ferreira",
  handle: "luccasfr",
  email: "lucas.ferreira@jerasoft.inf.br",
  github: "https://github.com/luccasfr",
  jerasoft: "https://www.jerasoft.com.br",
} as const;

/** Link de projeto: `site` mostra o domínio; `code` usa o rótulo traduzido. */
export type ProjectLink = { kind: "site" | "code"; href: string };

export type Project = {
  id: "telyo" | "repo-save-editor";
  index: string;
  name: string;
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "telyo",
    index: "01",
    name: "Telyo",
    links: [{ kind: "site", href: "https://telyo.luccasfr.dev/" }],
  },
  {
    id: "repo-save-editor",
    index: "02",
    name: "R.E.P.O Save Editor",
    links: [
      { kind: "site", href: "https://repo-save-editor.jerasoft.com.br" },
      { kind: "code", href: "https://github.com/luccasfr/repo-save-editor" },
    ],
  },
];

export const openSource = [
  { name: "repo-save-editor", stars: 69, url: "https://github.com/luccasfr/repo-save-editor" },
  { name: "electron-boilerplate", stars: 13, url: "https://github.com/luccasfr/electron-boilerplate" },
  { name: "fastify-boilerplate", stars: 6, url: "https://github.com/luccasfr/fastify-boilerplate" },
] as const;

export function linkHost(href: string) {
  return new URL(href).host.replace(/^www\./, "");
}
