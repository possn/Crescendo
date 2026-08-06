/**
 * Motor de cálculo estatístico das curvas de crescimento.
 *
 * Baseado no método LMS usado pela WHO Child Growth Standards (2006):
 * para cada indicador (peso, comprimento/altura, perímetro cefálico),
 * cada idade tem três parâmetros L, M, S que descrevem uma distribuição
 * Box-Cox-normal. A partir deles calculamos o z-score de uma medida
 * observada e, do z-score, o percentil correspondente.
 *
 * Fórmula (idêntica à usada pelos CDC growth charts):
 *   Se L ≠ 0:  Z = ( (X/M)^L − 1 ) / (L × S)
 *   Se L = 0:  Z = ln(X/M) / S
 *
 * Referência: WHO Child Growth Standards, Multicentre Growth Reference
 * Study Group (2006). Dados oficiais LMS por indicador/sexo.
 */

import type { PontoReferenciaLMS, TabelaReferenciaOMS } from "../types";

/** Função erro (erf) — aproximação de Abramowitz & Stegun 7.1.26, precisão ~1.5e-7. */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * ax);
  const y =
    1.0 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);

  return sign * y;
}

/** Converte um z-score na sua percentagem correspondente na distribuição normal padrão (0–100). */
export function zScoreParaPercentil(z: number): number {
  const phi = 0.5 * (1 + erf(z / Math.SQRT2));
  return phi * 100;
}

/**
 * Interpola linearmente os parâmetros L, M, S de uma tabela de referência
 * para uma idade exata (em meses) que pode não coincidir com um ponto tabelado.
 *
 * Para o indicador comprimento/altura, `tipoMedicaoPreferido` desambigua o
 * ponto de fronteira aos 24 meses, onde a OMS fornece duas séries distintas
 * (comprimento deitado vs. altura em pé — a medição em pé dá, em média,
 * ~0.7cm menos à mesma idade).
 */
export function interpolarPontoLMS(
  tabela: TabelaReferenciaOMS,
  idadeMeses: number,
  tipoMedicaoPreferido?: "comprimento" | "altura"
): PontoReferenciaLMS {
  let pontos = tabela.pontos;

  if (tabela.indicador === "length_height_for_age" && tipoMedicaoPreferido) {
    pontos = pontos.filter(
      (p) => !p.tipoMedicao || p.tipoMedicao === tipoMedicaoPreferido
    );
  }

  const idadeClamped = Math.min(
    Math.max(idadeMeses, pontos[0].idadeMeses),
    pontos[pontos.length - 1].idadeMeses
  );

  // Encontrar os dois pontos tabelados que envolvem a idade pedida.
  let inferior = pontos[0];
  let superior = pontos[pontos.length - 1];
  for (let i = 0; i < pontos.length - 1; i++) {
    if (
      pontos[i].idadeMeses <= idadeClamped &&
      pontos[i + 1].idadeMeses >= idadeClamped
    ) {
      inferior = pontos[i];
      superior = pontos[i + 1];
      break;
    }
  }

  if (inferior.idadeMeses === superior.idadeMeses) {
    return inferior;
  }

  const fracao =
    (idadeClamped - inferior.idadeMeses) /
    (superior.idadeMeses - inferior.idadeMeses);

  const lerp = (a: number, b: number) => a + (b - a) * fracao;

  return {
    idadeMeses: idadeClamped,
    L: lerp(inferior.L, superior.L),
    M: lerp(inferior.M, superior.M),
    S: lerp(inferior.S, superior.S),
    tipoMedicao: tipoMedicaoPreferido,
  };
}

export interface ResultadoMedicao {
  zScore: number;
  percentil: number; // 0–100
  medianaEsperada: number; // valor M à idade da criança, na unidade do indicador
}

/**
 * Calcula o z-score e percentil de uma medida observada (peso, comprimento/
 * altura, ou perímetro cefálico) face à tabela de referência da OMS.
 */
export function calcularZScoreEPercentil(
  valorObservado: number,
  tabela: TabelaReferenciaOMS,
  idadeMeses: number,
  tipoMedicaoPreferido?: "comprimento" | "altura"
): ResultadoMedicao {
  const { L, M, S } = interpolarPontoLMS(
    tabela,
    idadeMeses,
    tipoMedicaoPreferido
  );

  const z =
    Math.abs(L) < 1e-9
      ? Math.log(valorObservado / M) / S
      : (Math.pow(valorObservado / M, L) - 1) / (L * S);

  return {
    zScore: z,
    percentil: zScoreParaPercentil(z),
    medianaEsperada: M,
  };
}

/**
 * Gera os pontos de uma banda de percentil (ex.: P3, P15, P50, P85, P97)
 * ao longo de todas as idades tabeladas, para desenhar como curva de fundo
 * no gráfico. Inverte a fórmula LMS: dado um z-score fixo, calcula o valor
 * correspondente a cada idade.
 */
export function gerarCurvaPercentil(
  tabela: TabelaReferenciaOMS,
  zAlvo: number,
  tipoMedicaoPreferido?: "comprimento" | "altura"
): { idadeMeses: number; valor: number }[] {
  let pontos = tabela.pontos;
  if (tabela.indicador === "length_height_for_age" && tipoMedicaoPreferido) {
    pontos = pontos.filter(
      (p) => !p.tipoMedicao || p.tipoMedicao === tipoMedicaoPreferido
    );
  }

  return pontos.map((p) => {
    const valor =
      Math.abs(p.L) < 1e-9
        ? p.M * Math.exp(p.S * zAlvo)
        : p.M * Math.pow(1 + p.L * p.S * zAlvo, 1 / p.L);
    return { idadeMeses: p.idadeMeses, valor };
  });
}

/** Bandas de referência standard mostradas no gráfico (percentis clássicos do boletim de saúde infantil). */
export const Z_BANDAS_REFERENCIA = [
  { z: -2, label: "P3" },
  { z: -1, label: "P15" },
  { z: 0, label: "P50" },
  { z: 1, label: "P85" },
  { z: 2, label: "P97" },
] as const;
