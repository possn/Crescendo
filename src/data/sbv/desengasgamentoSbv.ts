/**
 * Desengasgamento e Suporte Básico de Vida (SBV) pediátrico.
 *
 * Fonte: "2025 American Heart Association and American Academy of
 * Pediatrics Guidelines for Cardiopulmonary Resuscitation and Emergency
 * Cardiovascular Care" (Circulation, outubro de 2025) — a revisão mais
 * recente, com mudanças reais face ao que se ensinava antes:
 *
 * - Engasgamento: deixou de ser só compressões abdominais. Agora alterna-se
 *   sempre pancadas nas costas com compressões (torácicas no bebé,
 *   abdominais na criança), 5 + 5, repetidamente.
 * - SBV no bebé: a técnica dos "dois dedos" foi eliminada das
 *   recomendações — usa-se "dois polegares a abraçar" (2 reanimadores) ou
 *   "base de uma mão" (1 reanimador).
 *
 * ATENÇÃO — isto é informação de apoio, não formação. Texto sozinho não
 * ensina a fazer isto bem; a forma correta de aprender é um curso
 * certificado com manequim (INEM, Cruz Vermelha Portuguesa). O objetivo
 * aqui é conhecer a sequência, não substituir esse treino.
 */

import type { PassoSBV } from "../../types";

export const PASSOS_ENGASGAMENTO_BEBE: PassoSBV[] = [
  {
    id: "beb-1",
    numero: 1,
    titulo: "Confirmar que é mesmo engasgamento grave",
    texto:
      "Se o bebé consegue tossir com força, chorar ou fazer sons, deixe-o tossir — a tosse é o mecanismo mais eficaz. Só atue se não conseguir chorar, tossir ou respirar.",
  },
  {
    id: "beb-2",
    numero: 2,
    titulo: "5 pancadas nas costas",
    texto:
      "Segure o bebé virado para baixo, ao longo do seu antebraço, cabeça mais baixa do que o tronco, apoiando bem a cabeça e o queixo. Com a base da mão, dê 5 pancadas firmes entre as omoplatas.",
  },
  {
    id: "beb-3",
    numero: 3,
    titulo: "5 compressões torácicas",
    texto:
      "Se não desengasgar, vire o bebé para cima, ao longo do outro antebraço, cabeça ainda mais baixa que o tronco. Dois dedos (ou base de uma mão) no centro do peito, logo abaixo da linha dos mamilos — 5 compressões firmes para baixo.",
  },
  {
    id: "beb-4",
    numero: 4,
    titulo: "Alternar até desengasgar",
    texto:
      "Continue a alternar 5 pancadas nas costas + 5 compressões torácicas. Nunca faça compressões abdominais (manobra de Heimlich) num bebé — risco real de lesão interna.",
  },
  {
    id: "beb-5",
    numero: 5,
    titulo: "Se ficar inconsciente: ligue 112 e comece SBV",
    texto:
      "Se o bebé perder a consciência a qualquer momento, ligue 112 imediatamente (ou peça a alguém para ligar) e comece suporte básico de vida — ver secção própria abaixo.",
  },
];

export const PASSOS_ENGASGAMENTO_CRIANCA: PassoSBV[] = [
  {
    id: "cri-1",
    numero: 1,
    titulo: "Confirmar que é mesmo engasgamento grave",
    texto:
      "Se a criança consegue tossir com força, falar ou chorar, deixe-a tossir. Só atue se não conseguir respirar, tossir ou fazer nenhum som.",
  },
  {
    id: "cri-2",
    numero: 2,
    titulo: "5 pancadas nas costas",
    texto:
      "Incline a criança para a frente, apoiando o peito com uma mão. Com a base da outra mão, dê 5 pancadas firmes entre as omoplatas.",
  },
  {
    id: "cri-3",
    numero: 3,
    titulo: "5 compressões abdominais (manobra de Heimlich)",
    texto:
      "Se não desengasgar, coloque-se atrás da criança, os braços à volta da cintura. Feche o punho, coloque-o acima do umbigo, agarre com a outra mão, e faça 5 compressões firmes para dentro e para cima.",
  },
  {
    id: "cri-4",
    numero: 4,
    titulo: "Alternar até desengasgar",
    texto:
      "Continue a alternar 5 pancadas nas costas + 5 compressões abdominais, até o objeto sair ou a criança ficar inconsciente.",
  },
  {
    id: "cri-5",
    numero: 5,
    titulo: "Se ficar inconsciente: ligue 112 e comece SBV",
    texto:
      "Se a criança perder a consciência a qualquer momento, ligue 112 imediatamente (ou peça a alguém para ligar) e comece suporte básico de vida — ver secção própria abaixo.",
  },
];

export const PASSOS_SBV_BEBE: PassoSBV[] = [
  {
    id: "sbv-beb-1",
    numero: 1,
    titulo: "Verificar resposta e respiração",
    texto:
      "Estimule (bata suavemente na sola do pé) e chame. Sem resposta e sem respiração normal (ou só \"gasping\"): comece SBV.",
  },
  {
    id: "sbv-beb-2",
    numero: 2,
    titulo: "Ligue 112 — ou peça a alguém para ligar",
    texto:
      "Se estiver sozinho(a) e tiver telemóvel com alta-voz, ligue enquanto começa as compressões. Não adie o início das compressões para ligar primeiro, se estiver mesmo sozinho(a).",
  },
  {
    id: "sbv-beb-3",
    numero: 3,
    titulo: "30 compressões torácicas",
    texto:
      "Sozinho(a): base de uma mão no centro do peito, logo abaixo da linha dos mamilos. Com 2 reanimadores: os dois polegares lado a lado no mesmo local, as mãos a abraçar o tórax. Cerca de 4cm de profundidade (1/3 do tórax), ritmo de 100-120/min, deixando o peito recuperar totalmente entre compressões.",
  },
  {
    id: "sbv-beb-4",
    numero: 4,
    titulo: "2 insuflações",
    texto:
      "Incline a cabeça com cuidado (posição neutra, sem hiperestender o pescoço), sele a boca e o nariz do bebé com a sua boca, e dê 2 insuflações suaves — o suficiente para ver o peito subir.",
  },
  {
    id: "sbv-beb-5",
    numero: 5,
    titulo: "Continue 30:2 (ou 15:2 com 2 reanimadores)",
    texto:
      "Um(a) só reanimador(a): 30 compressões para 2 insuflações. Dois reanimadores: 15 compressões para 2 insuflações. Continue até o bebé reagir, chegar ajuda, ou não conseguir mais.",
  },
];

export const PASSOS_SBV_CRIANCA: PassoSBV[] = [
  {
    id: "sbv-cri-1",
    numero: 1,
    titulo: "Verificar resposta e respiração",
    texto:
      "Estimule e chame em voz alta. Sem resposta e sem respiração normal: comece SBV.",
  },
  {
    id: "sbv-cri-2",
    numero: 2,
    titulo: "Ligue 112 — ou peça a alguém para ligar",
    texto:
      "Se estiver sozinho(a) e tiver telemóvel com alta-voz, ligue enquanto começa as compressões.",
  },
  {
    id: "sbv-cri-3",
    numero: 3,
    titulo: "30 compressões torácicas",
    texto:
      "Base de uma mão (ou as duas mãos sobrepostas, se a criança for maior) no centro do peito. Cerca de 5cm de profundidade (1/3 do tórax), ritmo de 100-120/min, deixando o peito recuperar totalmente entre compressões.",
  },
  {
    id: "sbv-cri-4",
    numero: 4,
    titulo: "2 insuflações",
    texto:
      "Incline a cabeça, levante o queixo, sele a boca da criança com a sua (tapando o nariz), e dê 2 insuflações suaves — o suficiente para ver o peito subir.",
  },
  {
    id: "sbv-cri-5",
    numero: 5,
    titulo: "Continue 30:2 (ou 15:2 com 2 reanimadores)",
    texto:
      "Um(a) só reanimador(a): 30 compressões para 2 insuflações. Dois reanimadores: 15 compressões para 2 insuflações. Continue até a criança reagir, chegar ajuda, ou não conseguir mais.",
  },
];
