/**
 * Etapas de consulta — calendário de idades-chave do Programa Nacional de
 * Saúde Infantil e Juvenil (PNSIJ), DGS, em vigor desde junho de 2013.
 *
 * As idades não são rígidas — se a consulta acontecer um pouco antes ou
 * depois da idade-chave, não há problema; a app usa a etapa mais próxima
 * como referência para organizar o registo, não como data exata a cumprir.
 */

import type { EtapaConsulta } from "../../types";

export const ETAPAS_CONSULTA: EtapaConsulta[] = [
  { id: "10d", idadeLabel: "10 dias", idadeMesesAprox: 0.33 },
  { id: "1m", idadeLabel: "1 mês", idadeMesesAprox: 1 },
  { id: "2m", idadeLabel: "2 meses", idadeMesesAprox: 2 },
  { id: "4m", idadeLabel: "4 meses", idadeMesesAprox: 4 },
  { id: "6m", idadeLabel: "6 meses", idadeMesesAprox: 6 },
  { id: "9m", idadeLabel: "9 meses", idadeMesesAprox: 9 },
  { id: "12m", idadeLabel: "12 meses", idadeMesesAprox: 12 },
  { id: "15m", idadeLabel: "15 meses", idadeMesesAprox: 15 },
  { id: "18m", idadeLabel: "18 meses", idadeMesesAprox: 18 },
  { id: "24m", idadeLabel: "24 meses", idadeMesesAprox: 24 },
  { id: "3a", idadeLabel: "3 anos", idadeMesesAprox: 36 },
  { id: "4a", idadeLabel: "4 anos", idadeMesesAprox: 48 },
  { id: "5a", idadeLabel: "5 anos (exame global de saúde)", idadeMesesAprox: 60 },
  { id: "6-7a", idadeLabel: "6-7 anos (exame de saúde pré-escolar)", idadeMesesAprox: 78 },
];
