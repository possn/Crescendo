/**
 * Programa Nacional de Vacinação (PNV) — esquema recomendado, 0-5 anos.
 *
 * Fonte: Direção-Geral da Saúde (DGS), esquema vacinal geral em vigor,
 * incluindo as atualizações mais recentes:
 * - Norma n.º 013/2024 (19/12/2024) — pneumocócica conjugada aos 2, 4 e 12 meses
 * - Norma n.º 005/2025 (14/03/2025) — MenACWY aos 12 meses, substitui a MenC;
 *   MenB mantém-se aos 2, 4 e 12 meses
 *
 * IMPORTANTE: o PNV é dinâmico e atualizado pela DGS regularmente. Este
 * calendário reflete o esquema em vigor à data da última revisão deste
 * ficheiro — se tiver dúvidas sobre alterações recentes, confirme sempre
 * em dgs.pt ou com o seu médico/enfermeiro de família. Isto não substitui
 * o boletim de vacinas oficial nem o registo no sistema SI-VACINAS.
 *
 * Fora do âmbito desta app (0-5 anos): o PNV continua depois dos 5 anos
 * com reforços na pré-adolescência (Td, HPV aos 10 anos) e na idade
 * adulta — não incluído aqui de propósito.
 */

import type { DoseVacinaPNV } from "../../types";

export const DOSES_PNV: DoseVacinaPNV[] = [
  // ---- Nascença ----
  {
    id: "bcg-nascenca",
    idadeLabel: "À nascença",
    idadeMesesAprox: 0,
    vacina: "BCG",
    doencasPrevenidas: "Tuberculose (formas graves)",
    doseLabel: "Dose única",
    notaEspecial: "Só para grupos de risco desde 2016 — não é universal. Confirme com o pediatra se se aplica.",
  },

  // ---- 2 meses ----
  {
    id: "hexa-1",
    idadeLabel: "2 meses",
    idadeMesesAprox: 2,
    vacina: "Hexavalente (DTPa-Hib-VIP-VHB)",
    doencasPrevenidas: "Difteria, tétano, tosse convulsa, Haemophilus influenzae b, poliomielite, hepatite B",
    doseLabel: "1ª dose",
  },
  {
    id: "pneumo-1",
    idadeLabel: "2 meses",
    idadeMesesAprox: 2,
    vacina: "Pneumocócica conjugada",
    doencasPrevenidas: "Doença invasiva pneumocócica (meningite, pneumonia, sépsis)",
    doseLabel: "1ª dose",
  },
  {
    id: "menb-1",
    idadeLabel: "2 meses",
    idadeMesesAprox: 2,
    vacina: "MenB",
    doencasPrevenidas: "Doença invasiva meningocócica do serogrupo B",
    doseLabel: "1ª dose",
  },

  // ---- 4 meses ----
  {
    id: "hexa-2",
    idadeLabel: "4 meses",
    idadeMesesAprox: 4,
    vacina: "Hexavalente (DTPa-Hib-VIP-VHB)",
    doencasPrevenidas: "Difteria, tétano, tosse convulsa, Haemophilus influenzae b, poliomielite, hepatite B",
    doseLabel: "2ª dose",
  },
  {
    id: "menb-2",
    idadeLabel: "4 meses",
    idadeMesesAprox: 4,
    vacina: "MenB",
    doencasPrevenidas: "Doença invasiva meningocócica do serogrupo B",
    doseLabel: "2ª dose",
  },

  // ---- 6 meses ----
  {
    id: "hexa-3",
    idadeLabel: "6 meses",
    idadeMesesAprox: 6,
    vacina: "Hexavalente (DTPa-Hib-VIP-VHB)",
    doencasPrevenidas: "Difteria, tétano, tosse convulsa, Haemophilus influenzae b, poliomielite, hepatite B",
    doseLabel: "3ª dose",
  },

  // ---- 12 meses ----
  {
    id: "menb-3",
    idadeLabel: "12 meses",
    idadeMesesAprox: 12,
    vacina: "MenB",
    doencasPrevenidas: "Doença invasiva meningocócica do serogrupo B",
    doseLabel: "3ª dose",
  },
  {
    id: "menacwy",
    idadeLabel: "12 meses",
    idadeMesesAprox: 12,
    vacina: "MenACWY",
    doencasPrevenidas: "Doença invasiva meningocócica dos serogrupos A, C, W e Y",
    doseLabel: "Dose única",
    notaEspecial: "Substituiu a MenC a partir de abril de 2025 (Norma DGS n.º 005/2025).",
  },
  {
    id: "pneumo-2",
    idadeLabel: "12 meses",
    idadeMesesAprox: 12,
    vacina: "Pneumocócica conjugada",
    doencasPrevenidas: "Doença invasiva pneumocócica (meningite, pneumonia, sépsis)",
    doseLabel: "2ª dose",
  },
  {
    id: "vaspr-1",
    idadeLabel: "12 meses",
    idadeMesesAprox: 12,
    vacina: "VASPR",
    doencasPrevenidas: "Sarampo, parotidite epidémica (papeira), rubéola",
    doseLabel: "1ª dose",
  },

  // ---- 18 meses ----
  {
    id: "penta-reforco",
    idadeLabel: "18 meses",
    idadeMesesAprox: 18,
    vacina: "Pentavalente (DTPa-Hib-VIP)",
    doencasPrevenidas: "Difteria, tétano, tosse convulsa, Haemophilus influenzae b, poliomielite",
    doseLabel: "Reforço",
  },

  // ---- 5 anos ----
  {
    id: "vaspr-2",
    idadeLabel: "5 anos",
    idadeMesesAprox: 60,
    vacina: "VASPR",
    doencasPrevenidas: "Sarampo, parotidite epidémica (papeira), rubéola",
    doseLabel: "2ª dose",
  },
  {
    id: "tetra-reforco",
    idadeLabel: "5 anos",
    idadeMesesAprox: 60,
    vacina: "Tetravalente (DTPa-VIP)",
    doencasPrevenidas: "Difteria, tétano, tosse convulsa, poliomielite",
    doseLabel: "Reforço",
  },
];
