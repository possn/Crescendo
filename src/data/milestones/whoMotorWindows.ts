/**
 * Janelas de percentil (P1–P99) para os 6 marcos motores grossos do
 * WHO Motor Development Study.
 *
 * Fonte: WHO Multicentre Growth Reference Study Group. "WHO Motor
 * Development Study: Windows of achievement for six gross motor
 * development milestones." Acta Paediatrica Supplement 2006;450:86-95.
 *
 * Estudo longitudinal com 816 crianças (Gana, Índia, Noruega, Omã, EUA),
 * avaliadas mensalmente no 1º ano e bimensalmente no 2º. As janelas são
 * limitadas pelo P1 e P99 (sem demarcações internas) — ou seja, a própria
 * OMS optou por representar variação normal como um intervalo largo, não
 * como uma idade única. Isto é o oposto de uma leitura rígida de marcos:
 * mesmo o extremo tardio (P99) ainda está dentro da normalidade estudada.
 *
 * Nota: a OMS não encontrou diferenças significativas e consistentes
 * entre rapazes e raparigas nestes marcos — por isso, ao contrário das
 * curvas de crescimento, estas janelas não são segmentadas por sexo.
 */

import type { JanelaMotoraOMS } from "../../types";

export const JANELAS_MOTORAS_OMS: JanelaMotoraOMS[] = [
  {
    id: "sentar-sem-apoio",
    nome: "Senta-se sem apoio",
    p1Meses: 3.8,
    p99Meses: 9.2,
    mediaMeses: 6.0,
    desvioPadraoMeses: 1.1,
  },
  {
    id: "ficar-pe-com-apoio",
    nome: "Fica de pé com apoio",
    p1Meses: 4.8,
    p99Meses: 11.4,
    mediaMeses: 7.6,
    desvioPadraoMeses: 1.4,
  },
  {
    id: "gatinhar",
    nome: "Gatinha (mãos e joelhos)",
    p1Meses: 5.2,
    p99Meses: 13.5,
    mediaMeses: 8.5,
    desvioPadraoMeses: 1.7,
  },
  {
    id: "andar-com-apoio",
    nome: "Anda com apoio",
    p1Meses: 5.9,
    p99Meses: 13.7,
    mediaMeses: 9.2,
    desvioPadraoMeses: 1.5,
  },
  {
    id: "ficar-pe-sem-apoio",
    nome: "Fica de pé sem apoio",
    p1Meses: 6.9,
    p99Meses: 16.9,
    mediaMeses: 11.0,
    desvioPadraoMeses: 1.9,
  },
  {
    id: "andar-sem-apoio",
    nome: "Anda sem apoio",
    p1Meses: 8.2,
    p99Meses: 17.6,
    mediaMeses: 12.1,
    desvioPadraoMeses: 1.8,
  },
];

/**
 * Nota clínica da OMS: cerca de 90% das crianças atingem cinco destes
 * marcos numa sequência comum, mas 4.3% nunca chegam a gatinhar de mãos e
 * joelhos antes de andar — ou seja, saltar o gatinhar, por si só, não é
 * um sinal de alerta.
 */
export const NOTA_SEQUENCIA_OMS =
  "Cerca de 90% das crianças seguem esta sequência, mas cerca de 4% nunca gatinham de mãos e joelhos antes de andar — isso, por si só, não é motivo de preocupação.";
