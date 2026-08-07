/**
 * Sinais de alerta — quando vale a pena contactar o pediatra sem esperar
 * pela próxima consulta de rotina.
 *
 * Fonte: CDC "Learn the Signs. Act Early." — lista de sinais de
 * preocupação por domínio, cruzada com os checklists CDC/AAP 2022 já
 * usados no Módulo 3. Os valores motores usam os mesmos P99 do WHO Motor
 * Development Study já presentes em whoMotorWindows.ts — propositadamente,
 * para nunca mostrar um número diferente do que a app já usa noutro sítio.
 *
 * Regras de conteúdo (ver Secção 0 da spec original):
 * - Nunca a palavra "diagnóstico" ou "atraso" sem qualificação
 * - Nunca gerar um score de risco agregado
 * - Perder uma competência já adquirida (regressão), a qualquer idade,
 *   é tratado como o sinal mais consistentemente urgente na literatura —
 *   por isso tem destaque próprio, separado da lista por domínio
 *
 * IMPORTANTE: este conteúdo requer revisão por um pediatra distinto do
 * autor antes de qualquer publicação real (ver ROADMAP.md).
 */

import type { SinalAlerta } from "../../types";

export const SINAIS_ALERTA: SinalAlerta[] = [
  // ---- 2 meses ----
  { id: "se-2m-1", dominio: "socio_emocional", idadeReferenciaMeses: 2, sinal: "Não olha para as pessoas nem as segue com o olhar" },
  { id: "co-2m-1", dominio: "cognitivo", idadeReferenciaMeses: 2, sinal: "Não reage a sons altos" },
  { id: "mo-2m-1", dominio: "motor", idadeReferenciaMeses: 2, sinal: "Não consegue levantar a cabeça quando está de bruços" },
  { id: "mo-2m-2", dominio: "motor", idadeReferenciaMeses: 2, sinal: "Braços ou pernas muito moles ou muito rígidos" },

  // ---- 4 meses ----
  { id: "se-4m-1", dominio: "socio_emocional", idadeReferenciaMeses: 4, sinal: "Não sorri a pessoas familiares" },
  { id: "li-4m-1", dominio: "linguagem", idadeReferenciaMeses: 4, sinal: "Não faz sons tipo \"oooo\" ou \"aahh\"" },
  { id: "co-4m-1", dominio: "cognitivo", idadeReferenciaMeses: 4, sinal: "Não segue objetos em movimento com os olhos" },
  { id: "mo-4m-1", dominio: "motor", idadeReferenciaMeses: 4, sinal: "Não consegue manter a cabeça firme quando é segurado(a) sentado(a)" },
  { id: "mo-4m-2", dominio: "motor", idadeReferenciaMeses: 4, sinal: "Não leva as mãos à boca" },

  // ---- 6 meses ----
  { id: "se-1", dominio: "socio_emocional", idadeReferenciaMeses: 6, sinal: "Não sorri nem demonstra alegria ao interagir com quem cuida dele/a" },
  { id: "se-2", dominio: "socio_emocional", idadeReferenciaMeses: 9, sinal: "Não reage nem parece reconhecer pessoas familiares" },
  { id: "se-3", dominio: "socio_emocional", idadeReferenciaMeses: 12, sinal: "Não olha na direção para onde alguém aponta" },
  { id: "se-4", dominio: "socio_emocional", idadeReferenciaMeses: 18, sinal: "Não mostra interesse em brincar perto de outras crianças" },
  { id: "se-5", dominio: "socio_emocional", idadeReferenciaMeses: 24, sinal: "Extrema dificuldade em ser consolado(a), a maior parte do tempo" },

  // ---- Linguagem / Comunicação ----
  { id: "li-1", dominio: "linguagem", idadeReferenciaMeses: 6, sinal: "Não faz sons nem balbucia" },
  { id: "li-2", dominio: "linguagem", idadeReferenciaMeses: 9, sinal: "Não reage ao ouvir o próprio nome" },
  { id: "li-3", dominio: "linguagem", idadeReferenciaMeses: 12, sinal: "Não usa gestos simples, tipo acenar adeus ou apontar" },
  { id: "li-4", dominio: "linguagem", idadeReferenciaMeses: 16, sinal: "Ainda não diz nenhuma palavra com significado" },
  { id: "li-5", dominio: "linguagem", idadeReferenciaMeses: 24, sinal: "Não junta duas palavras (ex.: \"mais água\")" },

  // ---- Cognitivo ----
  { id: "co-1", dominio: "cognitivo", idadeReferenciaMeses: 9, sinal: "Não procura um objeto que viu esconder" },
  { id: "co-2", dominio: "cognitivo", idadeReferenciaMeses: 18, sinal: "Não imita ações simples de outras pessoas" },
  { id: "co-3", dominio: "cognitivo", idadeReferenciaMeses: 24, sinal: "Não sabe para que servem objetos comuns (escova, colher, telefone)" },

  // ---- Motor (alinhado com os P99 do WHO Motor Development Study) ----
  { id: "mo-1", dominio: "motor", idadeReferenciaMeses: 9, sinal: "Ainda não se senta sem apoio (janela OMS até aos 9,2 meses)" },
  { id: "mo-2", dominio: "motor", idadeReferenciaMeses: 12, sinal: "Corpo muito mole ou muito rígido ao ser pegado ao colo" },
  { id: "mo-3", dominio: "motor", idadeReferenciaMeses: 18, sinal: "Ainda não anda sem apoio (janela OMS até aos 17,6 meses)" },
  { id: "mo-4", dominio: "motor", idadeReferenciaMeses: 24, sinal: "Não consegue subir escadas nem correr" },
];

/**
 * Perder uma competência já adquirida — a qualquer idade — é considerado
 * na literatura o sinal mais consistentemente associado a necessidade de
 * avaliação atempada, independentemente do domínio ou da idade em que
 * acontece.
 */
export const NOTA_REGRESSAO =
  "Se o seu filho ou filha deixar de fazer algo que já fazia antes — seja falar, andar, sorrir socialmente ou qualquer outra competência — isso vale sempre a pena falar com o pediatra em breve, independentemente da idade. É diferente de simplesmente ainda não ter atingido um marco.";
