/**
 * Cálculo de dose de paracetamol e ibuprofeno por peso.
 *
 * Valores-base: paracetamol 15 mg/kg/dose, ibuprofeno 10 mg/kg/dose —
 * consistentes com o "AAP-aligned dosing framework" (paracetamol 15mg/kg
 * a cada 4-6h, máx. ~75mg/kg/dia; ibuprofeno 10mg/kg a cada 6-8h, máx.
 * ~40mg/kg/dia, só a partir dos 6 meses).
 *
 * Isto calcula o valor padrão em miligramas — NÃO converte para mL, porque
 * isso depende da concentração exata do produto (varia por marca e
 * apresentação: gotas, suspensão, comprimidos). Essa conversão fica
 * sempre a cargo da bula ou do farmacêutico/pediatra, de propósito.
 */

export interface ResultadoDose {
  doseMg: number;
  intervaloHorasMin: number;
  intervaloHorasMax: number;
  maxDosesPor24h: number;
  doseMaximaDiariaMg: number;
}

const PARACETAMOL_MG_POR_KG = 15;
const IBUPROFENO_MG_POR_KG = 10;

export function calcularParacetamol(pesoKg: number): ResultadoDose {
  const doseMg = PARACETAMOL_MG_POR_KG * pesoKg;
  const maxDosesPor24h = 5;
  return {
    doseMg,
    intervaloHorasMin: 4,
    intervaloHorasMax: 6,
    maxDosesPor24h,
    doseMaximaDiariaMg: doseMg * maxDosesPor24h,
  };
}

export function calcularIbuprofeno(pesoKg: number): ResultadoDose {
  const doseMg = IBUPROFENO_MG_POR_KG * pesoKg;
  const maxDosesPor24h = 4;
  return {
    doseMg,
    intervaloHorasMin: 6,
    intervaloHorasMax: 8,
    maxDosesPor24h,
    doseMaximaDiariaMg: doseMg * maxDosesPor24h,
  };
}

export const IDADE_MINIMA_IBUPROFENO_MESES = 6;
export const IDADE_ALERTA_FEBRE_MESES = 3;
export const PESO_MIN_PLAUSIVEL_KG = 2;
export const PESO_MAX_PLAUSIVEL_KG = 30;
