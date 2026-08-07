/**
 * Primeiros Socorros — convulsões, feridas pequenas, queimaduras.
 *
 * Fonte principal para convulsão febril: INEM (Instituto Nacional de
 * Emergência Médica de Portugal), série "Gestos que Salvam" — orientação
 * oficial portuguesa, não uma tradução de fonte americana.
 * Feridas e queimaduras: AAP Bright Futures / American Red Cross.
 *
 * IMPORTANTE: revisão clínica obrigatória antes de qualquer publicação
 * real. Isto é apoio informativo, nunca substitui formação certificada
 * (INEM, Cruz Vermelha Portuguesa) nem uma emergência real — em caso de
 * dúvida, ligar sempre 112.
 */

import type { ConselhoSocorro } from "../../types";

export const CONSELHOS_SOCORRO: ConselhoSocorro[] = [
  // ---- CONVULSÕES ----
  {
    id: "soc-convulsao-o-que-e",
    categoria: "convulsoes",
    titulo: "Convulsão febril: mais comum do que parece",
    texto:
      "Ocorre entre os 6 meses e os 5 anos, tipicamente no início de um episódio de febre, coincidindo com a subida da temperatura. A primeira vez assusta muito, mas a grande maioria é breve e sem consequências.",
    fonte: "INEM — Gestos que Salvam",
  },
  {
    id: "soc-convulsao-durante",
    categoria: "convulsoes",
    titulo: "Durante a convulsão: proteger, nunca conter",
    texto:
      "Não segure a criança nem tente parar os movimentos. Afaste objetos duros ou pontiagudos, e coloque algo macio (almofada, casaco) à volta para evitar que se magoe. Nunca coloque nada na boca — nem dedos, nem panos, nem colheres.",
    fonte: "INEM — Gestos que Salvam",
  },
  {
    id: "soc-convulsao-arrefecer",
    categoria: "convulsoes",
    titulo: "Depois: retirar roupa em excesso, nunca esponjar com água",
    texto:
      "Retire roupa a mais e reduza a temperatura do ambiente (abra uma janela, se possível, sem deixar a criança arrefecer demais). Não tente arrefecer esfregando uma esponja molhada — não ajuda e pode ser desconfortável.",
    fonte: "INEM — Gestos que Salvam",
  },
  {
    id: "soc-convulsao-112",
    categoria: "convulsoes",
    titulo: "Ligue 112 — e coloque em Posição Lateral de Segurança assim que parar",
    texto:
      "Assim que a convulsão terminar, coloque a criança de lado (Posição Lateral de Segurança), e vá verificando e anotando o estado de consciência, a respiração e a cor. Isto ajuda a informar quem responder à chamada.",
    fonte: "INEM — Gestos que Salvam",
  },
  {
    id: "soc-convulsao-quando",
    categoria: "convulsoes",
    titulo: "Quando é sempre motivo de emergência",
    texto:
      "Convulsão com duração superior a 5 minutos; primeira convulsão febril; dificuldade em respirar depois de parar; ou a criança não recupera a consciência normal — nestes casos, é sempre 112, sem hesitar.",
    fonte: "INEM / AAP Bright Futures",
  },

  // ---- FERIDAS PEQUENAS ----
  {
    id: "soc-ferida-limpar",
    categoria: "feridas",
    titulo: "Lavar primeiro, sempre",
    texto:
      "Água corrente e sabão neutro, alguns minutos, antes de mais nada. Remove sujidade e reduz o risco de infeção mais do que qualquer desinfetante aplicado sobre uma ferida suja.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "soc-ferida-sangramento",
    categoria: "feridas",
    titulo: "Sangramento: pressão direta e constante",
    texto:
      "Pano ou compressa limpa, pressão firme e contínua (não ir levantando para ver se já parou) durante uns minutos seguidos. A maioria das feridas pequenas para de sangrar com pressão simples.",
    fonte: "American Red Cross",
  },
  {
    id: "soc-ferida-quando-pontos",
    categoria: "feridas",
    titulo: "Quando pode precisar de pontos",
    texto:
      "Ferida funda, com bordos afastados, na cara, ou que não para de sangrar depois de 10 minutos de pressão direta — nestes casos, vale a pena ir à urgência, mesmo que pareça pequena.",
    fonte: "AAP Bright Futures",
  },

  // ---- QUEIMADURAS ----
  {
    id: "soc-queimadura-arrefecer",
    categoria: "queimaduras",
    titulo: "Água corrente fresca, 20 minutos",
    texto:
      "Assim que possível, água corrente à temperatura ambiente (não gelada) sobre a queimadura, durante uns 20 minutos. É o que realmente reduz o dano — quanto mais cedo, melhor.",
    fonte: "American Red Cross / AAP",
  },
  {
    id: "soc-queimadura-evitar",
    categoria: "queimaduras",
    titulo: "Nunca gelo, manteiga ou pasta de dentes",
    texto:
      "São remédios caseiros comuns mas que pioram a lesão — o gelo pode causar mais dano ao tecido já queimado, e manteiga/pasta de dentes retêm calor e aumentam risco de infeção.",
    fonte: "American Red Cross / AAP",
  },
  {
    id: "soc-queimadura-roupa",
    categoria: "queimaduras",
    titulo: "Retirar roupa e jóias perto da área, exceto se colada à pele",
    texto:
      "Antes de inchar. Se a roupa estiver agarrada à queimadura, não puxe — corte à volta e deixe esse pedaço, é a urgência que trata disso.",
    fonte: "American Red Cross",
  },
  {
    id: "soc-queimadura-quando",
    categoria: "queimaduras",
    titulo: "Quando é sempre urgência",
    texto:
      "Queimaduras na cara, mãos, genitais ou articulações; maiores do que a palma da mão da criança; com bolhas grandes; ou de origem elétrica ou química — nestes casos, urgência sempre, mesmo depois de arrefecer.",
    fonte: "AAP Bright Futures",
  },
];

export const CATEGORIAS_SOCORRO: { id: ConselhoSocorro["categoria"]; label: string; cor: string }[] = [
  { id: "convulsoes", label: "Convulsões", cor: "#6b5b95" },
  { id: "feridas", label: "Feridas Pequenas", cor: "#8a6d3b" },
  { id: "queimaduras", label: "Queimaduras", cor: "#ad5834" },
];
