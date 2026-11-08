import { useEffect, type EffectCallback } from "react";

/** Único ponto autorizado de efeito: roda uma vez ao montar (assinaturas de eventos globais). */
export function useMountEffect(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}
