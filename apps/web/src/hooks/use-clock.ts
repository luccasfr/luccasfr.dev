import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "America/Sao_Paulo",
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  return formatter.format(Date.now());
}

/** Hora atual em São Paulo, atualizada a cada segundo. */
export function useSaoPauloClock() {
  return useSyncExternalStore(subscribe, getSnapshot, () => "--:--:--");
}
