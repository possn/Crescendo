/**
 * Conversão de unidades — só para exibição/entrada.
 *
 * Internamente, a app guarda e calcula tudo sempre em kg/cm (é o que as
 * tabelas LMS da OMS usam). A conversão para lb/in acontece só na fronteira
 * da UI, nunca nos dados guardados nem nos cálculos de z-score/percentil —
 * assim não há risco de arredondamentos acumulados a afetar o percentil.
 */

import type { Unidades } from "../types";

export const KG_PARA_LB = 2.2046226;
export const CM_PARA_IN = 0.3937008;

export function formatarPeso(kg: number, unidades: Unidades, casasDecimais = 1): string {
  if (unidades === "imperial") {
    return `${(kg * KG_PARA_LB).toFixed(casasDecimais)} lb`;
  }
  return `${kg.toFixed(casasDecimais)} kg`;
}

export function formatarComprimento(cm: number, unidades: Unidades, casasDecimais = 1): string {
  if (unidades === "imperial") {
    return `${(cm * CM_PARA_IN).toFixed(casasDecimais)} in`;
  }
  return `${cm.toFixed(casasDecimais)} cm`;
}

export function rotuloPeso(unidades: Unidades): string {
  return unidades === "imperial" ? "Peso (lb)" : "Peso (kg)";
}

export function rotuloComprimento(unidades: Unidades, tipo: "comprimento" | "altura"): string {
  const base = tipo === "comprimento" ? "Comprimento (deitado" : "Altura (em pé";
  return unidades === "imperial" ? `${base}, in)` : `${base}, cm)`;
}

/** Converte um valor introduzido pelo utilizador (na unidade ativa) para kg, para guardar. */
export function paraKg(valor: number, unidades: Unidades): number {
  return unidades === "imperial" ? valor / KG_PARA_LB : valor;
}

/** Converte um valor introduzido pelo utilizador (na unidade ativa) para cm, para guardar. */
export function paraCm(valor: number, unidades: Unidades): number {
  return unidades === "imperial" ? valor / CM_PARA_IN : valor;
}

/** Para mostrar um valor guardado (sempre em kg) no input, na unidade ativa. */
export function kgParaExibir(kg: number, unidades: Unidades): number {
  return unidades === "imperial" ? Math.round(kg * KG_PARA_LB * 100) / 100 : kg;
}

/** Para mostrar um valor guardado (sempre em cm) no input, na unidade ativa. */
export function cmParaExibir(cm: number, unidades: Unidades): number {
  return unidades === "imperial" ? Math.round(cm * CM_PARA_IN * 100) / 100 : cm;
}
