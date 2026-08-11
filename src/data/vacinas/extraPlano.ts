/**
 * Vacinas Extra-Plano — não fazem parte do Programa Nacional de Vacinação
 * universal, são prescritas por indicação médica e pagas pelos pais.
 *
 * Nota sobre a Rotavírus: desde 2020 que consta do PNV, mas apenas para
 * grupos de risco definidos por Norma da DGS — para a generalidade das
 * crianças saudáveis, continua a ser uma vacina extra-plano, por decisão
 * dos pais em conjunto com o pediatra.
 *
 * Fontes: Sociedade de Infecciologia Pediátrica / Sociedade Portuguesa de
 * Pediatria (SIP-SPP) — Recomendações sobre Vacinas Extra Programa
 * Nacional de Vacinação; DGS — Programa Nacional de Vacinação.
 */

import type { VacinaExtraPlano } from "../../types";

export const VACINAS_EXTRA_PLANO: VacinaExtraPlano[] = [
  {
    id: "extra-rotavirus",
    nome: "Rotavírus",
    doencasPrevenidas: "Gastroenterite aguda grave por rotavírus (causa mais comum de diarreia grave em crianças pequenas)",
    idadeRecomendada: "1.ª dose entre as 6-15 semanas de vida",
    esquema: "2 doses (Rotarix) ou 3 doses (RotaTeq), por via oral — esquema tem de estar completo antes das 24 ou 32 semanas, consoante a vacina",
    nota: "Já faz parte do PNV, mas só para grupos de risco definidos pela DGS. Para a generalidade das crianças saudáveis, é uma decisão dos pais com o pediatra. A janela de idade é rígida — ao contrário de outras vacinas, não pode ser feita fora de prazo.",
    categoria: "extra-pnv",
  },
  {
    id: "extra-varicela",
    nome: "Varicela (catapora)",
    doencasPrevenidas: "Varicela — e reduz o risco de zona (herpes zoster) mais tarde na vida",
    idadeRecomendada: "A partir dos 12 meses",
    esquema: "2 doses, com pelo menos 4-12 semanas de intervalo (consoante a idade)",
    categoria: "extra-pnv",
  },
  {
    id: "extra-hepatite-a",
    nome: "Hepatite A",
    doencasPrevenidas: "Hepatite A (transmissão fecal-oral, água/alimentos contaminados)",
    idadeRecomendada: "A partir dos 12 meses",
    esquema: "2 doses, com 6 meses de intervalo",
    nota: "Particularmente recomendada antes de viagens a países com saneamento básico limitado.",
    categoria: "extra-pnv",
  },
  {
    id: "extra-febre-amarela",
    nome: "Febre Amarela",
    doencasPrevenidas: "Febre amarela",
    idadeRecomendada: "A partir dos 9 meses, só antes de viagem a zona endémica ou de exigência de certificado internacional",
    esquema: "Dose única (proteção considerada para toda a vida pela OMS desde 2016)",
    nota: "Só administrada em Centros de Vacinação Internacional autorizados. Não é uma vacina de rotina — só faz sentido perante viagem planeada.",
    categoria: "viagem",
  },
  {
    id: "extra-febre-tifoide",
    nome: "Febre Tifóide",
    doencasPrevenidas: "Febre tifóide (Salmonella Typhi, transmissão fecal-oral)",
    idadeRecomendada: "A partir dos 2 anos (vacina injetável) — antes de viagem a zona endémica",
    esquema: "Dose única, reforço a cada 3 anos se exposição continuada",
    nota: "Recomendada para viagens a zonas de risco (subcontinente indiano, partes de África e da América Latina) com estadias prolongadas ou condições de saneamento limitado.",
    categoria: "viagem",
  },
];
