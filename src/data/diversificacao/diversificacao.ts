/**
 * Diversificação Alimentar — guia por idade + segurança alimentar.
 *
 * Fontes: AAP Bright Futures, AAP Clinical Report on Complementary
 * Feeding (2024), WHO, e o ensaio BLISS (Baby-Led Introduction to
 * SolidS, Universidade de Otago) para a comparação puré vs. BLW.
 *
 * Nem a AAP nem a OMS recomendam uma abordagem sobre a outra — isso é
 * refletido deliberadamente no texto abaixo, sem tomar partido.
 *
 * IMPORTANTE: revisão clínica obrigatória antes de qualquer publicação
 * real (ver ROADMAP.md).
 */

import type { EstagioAlimentar, PerigoEngasgamento } from "../../types";

export const ESTAGIOS: EstagioAlimentar[] = [
  {
    id: "estagio-6m",
    idadeLabel: "Por volta dos 6 meses",
    idadeMinMeses: 6,
    idadeMaxMeses: 7,
    textura: "Puré liso, ou pedaços macios do tamanho de um dedo (se optar por BLW)",
    exemplos: ["Cenoura cozida", "Batata-doce", "Maçã cozida", "Papa de cereais fortificada com ferro", "Frango desfiado bem cozido"],
    nota: "Prioridade ao ferro desde o início — as reservas do bebé começam a esgotar-se por esta altura.",
  },
  {
    id: "estagio-7-8m",
    idadeLabel: "7-8 meses",
    idadeMinMeses: 7,
    idadeMaxMeses: 8,
    textura: "Puré mais grosso, com pequenos grumos; pedaços macios maiores",
    exemplos: ["Feijão bem cozido e amassado", "Ovo mexido", "Iogurte natural", "Peixe sem espinhas", "Massa bem cozida"],
    nota: "Bom momento para introduzir alergénios comuns (amendoim em creme, ovo) se ainda não o fez.",
  },
  {
    id: "estagio-9-11m",
    idadeLabel: "9-11 meses",
    idadeMinMeses: 9,
    idadeMaxMeses: 11,
    textura: "Pedaços pequenos e macios que a criança consegue gerir com a mão",
    exemplos: ["Frutas em pedaços macios", "Legumes cozidos em pedaços", "Torradas", "Queijo em pedaços pequenos", "Carne desfiada"],
    nota: "Encoraje a usar a colher sozinha, mesmo que a maior parte caia — faz parte do processo.",
  },
  {
    id: "estagio-12-24m",
    idadeLabel: "12-24 meses",
    idadeMinMeses: 12,
    idadeMaxMeses: 24,
    textura: "Muito perto da comida da família, em pedaços apropriados",
    exemplos: ["A maioria dos pratos da família (com sal e açúcar reduzidos)", "Fruta variada", "Cereais integrais", "Leguminosas inteiras bem cozidas"],
    nota: "Continue a evitar mel (só depois de 1 ano), e mantenha o cuidado com os perigos de engasgamento abaixo — não desaparecem aos 12 meses.",
  },
];

export const PERIGOS_ENGASGAMENTO: PerigoEngasgamento[] = [
  { id: "peri-uvas", alimento: "Uvas e tomate-cereja", risco: "Forma e tamanho encaixam perfeitamente na via aérea", comoTornarSeguro: "Cortar sempre em quartos, ao longo (não em rodelas)" },
  { id: "peri-frutos-secos", alimento: "Frutos secos e sementes inteiros", risco: "Duros, pequenos, difíceis de mastigar bem antes dos 4 anos", comoTornarSeguro: "Só em creme/pasta (ex.: manteiga de amendoim), nunca inteiros antes dos 4 anos" },
  { id: "peri-salsichas", alimento: "Salsichas e afins", risco: "Forma cilíndrica clássica de obstrução total", comoTornarSeguro: "Cortar ao longo e depois em pedaços pequenos, nunca em rodelas" },
  { id: "peri-pipocas", alimento: "Pipocas", risco: "Formato irregular, difícil de controlar na boca", comoTornarSeguro: "Evitar antes dos 4 anos" },
  { id: "peri-cru-duro", alimento: "Vegetais crus e duros (cenoura, maçã inteiras)", risco: "Pedaços duros que não amolecem com a mastigação", comoTornarSeguro: "Cozinhar até amolecer, ou ralar fino / cortar em palitos finos" },
  { id: "peri-manteiga-amendoim", alimento: "Manteiga de amendoim em colherada", risco: "Colada ao céu da boca, difícil de engolir em bloco", comoTornarSeguro: "Espalhar fino numa torrada, nunca dar à colher" },
  { id: "peri-queijo", alimento: "Queijo em cubos grandes", risco: "Denso e difícil de partir com os dentes de leite", comoTornarSeguro: "Cortar em tiras finas ou pedaços pequenos" },
  { id: "peri-rebuçados", alimento: "Rebuçados e gomas duras", risco: "Não se dissolvem nem amolecem", comoTornarSeguro: "Evitar antes dos 4 anos" },
];
