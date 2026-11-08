import { useSyncExternalStore } from "react";

import { messages } from "./messages";

export type Locale = "pt-BR" | "en-US";

const STORAGE_KEY = "locale";

/** pt-BR quando o navegador pede pt-BR; qualquer outra língua cai em en-US. */
export function detectLocale(): Locale {
  return navigator.language.toLowerCase() === "pt-br" ? "pt-BR" : "en-US";
}

function readStored(): Locale | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "pt-BR" || value === "en-US" ? value : null;
  } catch {
    return null;
  }
}

let current: Locale = readStored() ?? detectLocale();
const listeners = new Set<() => void>();

/** Reflete o idioma no documento: lang, título e descrição. */
export function applyDocumentLocale(locale: Locale = current) {
  const { meta } = messages[locale];
  document.documentElement.lang = locale;
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
}

export function setLocale(locale: Locale) {
  current = locale;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // armazenamento indisponível: a escolha vale só para esta visita
  }
  applyDocumentLocale(locale);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return current;
}

export function useI18n() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, () => "en-US" as Locale);
  return {
    locale,
    t: messages[locale],
    setLocale,
    toggleLocale: () => setLocale(locale === "pt-BR" ? "en-US" : "pt-BR"),
  };
}
