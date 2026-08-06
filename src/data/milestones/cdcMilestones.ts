/**
 * Marcos de desenvolvimento — checklists CDC/AAP (revisão de 2022).
 *
 * Fonte: CDC "Learn the Signs. Act Early." — checklists revistos em 2019–2022
 * por um painel de peritos convocado pela AAP a pedido do CDC (Zubler et al.,
 * "Evidence-Informed Milestones for Developmental Surveillance Tools",
 * Pediatrics, Fev. 2022). Estes marcos representam o que **75% ou mais**
 * das crianças fazem até uma certa idade — não a média (P50) nem um
 * "deadline" — precisamente para evitar a leitura rígida que o painel
 * quis corrigir na revisão de 2022.
 *
 * Conteúdo traduzido e adaptado (não é uma tradução literal automática)
 * a partir dos checklists oficiais de 2, 4, 6, 9, 12, 15, 18 e 24 meses —
 * o intervalo priorizado no briefing deste produto (primeiros 2 anos).
 *
 * IMPORTANTE: este ficheiro cobre o essencial para o protótipo. Antes de
 * produção, validar cada item com um pediatra e, se possível, alargar aos
 * checklists de 30, 36, 48 e 60 meses (já disponíveis na mesma fonte CDC).
 */

import type { MarcoDesenvolvimento } from "../../types";

export const MARCOS_CDC: MarcoDesenvolvimento[] = [
  // ---- 2 meses ----
  { id: "2m-se-1", idadeReferenciaMeses: 2, dominio: "socio_emocional", descricao: "Acalma-se quando lhe falam ou pegam ao colo" },
  { id: "2m-se-2", idadeReferenciaMeses: 2, dominio: "socio_emocional", descricao: "Olha para a sua cara" },
  { id: "2m-se-3", idadeReferenciaMeses: 2, dominio: "socio_emocional", descricao: "Parece feliz quando se aproxima" },
  { id: "2m-se-4", idadeReferenciaMeses: 2, dominio: "socio_emocional", descricao: "Sorri quando lhe fala ou sorri" },
  { id: "2m-li-1", idadeReferenciaMeses: 2, dominio: "linguagem", descricao: "Faz sons além de chorar" },
  { id: "2m-li-2", idadeReferenciaMeses: 2, dominio: "linguagem", descricao: "Reage a sons altos" },
  { id: "2m-co-1", idadeReferenciaMeses: 2, dominio: "cognitivo", descricao: "Observa-o(a) quando se move" },
  { id: "2m-co-2", idadeReferenciaMeses: 2, dominio: "cognitivo", descricao: "Olha para um brinquedo durante alguns segundos" },
  { id: "2m-mo-1", idadeReferenciaMeses: 2, dominio: "motor", descricao: "Levanta a cabeça quando está de bruços" },
  { id: "2m-mo-2", idadeReferenciaMeses: 2, dominio: "motor", descricao: "Move os dois braços e as duas pernas" },
  { id: "2m-mo-3", idadeReferenciaMeses: 2, dominio: "motor", descricao: "Abre as mãos brevemente" },

  // ---- 4 meses ----
  { id: "4m-se-1", idadeReferenciaMeses: 4, dominio: "socio_emocional", descricao: "Sorri sozinho(a) para chamar a sua atenção" },
  { id: "4m-se-2", idadeReferenciaMeses: 4, dominio: "socio_emocional", descricao: "Ri-se baixinho quando tenta fazê-lo(a) rir" },
  { id: "4m-se-3", idadeReferenciaMeses: 4, dominio: "socio_emocional", descricao: "Olha para si, mexe-se ou faz sons para manter a sua atenção" },
  { id: "4m-li-1", idadeReferenciaMeses: 4, dominio: "linguagem", descricao: "Faz sons tipo \"oooo\", \"aahh\" (gorjeios)" },
  { id: "4m-li-2", idadeReferenciaMeses: 4, dominio: "linguagem", descricao: "Responde com sons quando lhe fala" },
  { id: "4m-li-3", idadeReferenciaMeses: 4, dominio: "linguagem", descricao: "Vira a cabeça na direção da sua voz" },
  { id: "4m-co-1", idadeReferenciaMeses: 4, dominio: "cognitivo", descricao: "Abre a boca ao ver o peito/biberão quando tem fome" },
  { id: "4m-co-2", idadeReferenciaMeses: 4, dominio: "cognitivo", descricao: "Olha para as próprias mãos com interesse" },
  { id: "4m-mo-1", idadeReferenciaMeses: 4, dominio: "motor", descricao: "Mantém a cabeça firme sem apoio quando é segurado(a)" },
  { id: "4m-mo-2", idadeReferenciaMeses: 4, dominio: "motor", descricao: "Segura um brinquedo quando lho colocam na mão" },
  { id: "4m-mo-3", idadeReferenciaMeses: 4, dominio: "motor", descricao: "Usa o braço para tentar alcançar brinquedos" },
  { id: "4m-mo-4", idadeReferenciaMeses: 4, dominio: "motor", descricao: "Leva as mãos à boca" },
  { id: "4m-mo-5", idadeReferenciaMeses: 4, dominio: "motor", descricao: "Faz apoio nos antebraços/cotovelos quando está de bruços" },

  // ---- 6 meses ----
  { id: "6m-se-1", idadeReferenciaMeses: 6, dominio: "socio_emocional", descricao: "Reconhece pessoas familiares" },
  { id: "6m-se-2", idadeReferenciaMeses: 6, dominio: "socio_emocional", descricao: "Gosta de se olhar ao espelho" },
  { id: "6m-se-3", idadeReferenciaMeses: 6, dominio: "socio_emocional", descricao: "Ri-se" },
  { id: "6m-li-1", idadeReferenciaMeses: 6, dominio: "linguagem", descricao: "Alterna sons consigo, tipo conversa" },
  { id: "6m-li-2", idadeReferenciaMeses: 6, dominio: "linguagem", descricao: "Faz \"piões\" com a língua (frutas com a boca)" },
  { id: "6m-li-3", idadeReferenciaMeses: 6, dominio: "linguagem", descricao: "Faz sons agudos, tipo guinchos" },
  { id: "6m-co-1", idadeReferenciaMeses: 6, dominio: "cognitivo", descricao: "Leva objetos à boca para os explorar" },
  { id: "6m-co-2", idadeReferenciaMeses: 6, dominio: "cognitivo", descricao: "Estica-se para alcançar um brinquedo que quer" },
  { id: "6m-co-3", idadeReferenciaMeses: 6, dominio: "cognitivo", descricao: "Fecha os lábios para mostrar que não quer mais comida" },
  { id: "6m-mo-1", idadeReferenciaMeses: 6, dominio: "motor", descricao: "Rola de barriga para as costas" },
  { id: "6m-mo-2", idadeReferenciaMeses: 6, dominio: "motor", descricao: "Faz apoio em braços esticados quando está de bruços" },
  { id: "6m-mo-3", idadeReferenciaMeses: 6, dominio: "motor", descricao: "Apoia-se nas mãos quando está sentado(a)" },

  // ---- 9 meses ----
  { id: "9m-se-1", idadeReferenciaMeses: 9, dominio: "socio_emocional", descricao: "É tímido(a), agarrado(a) ou receoso(a) com estranhos" },
  { id: "9m-se-2", idadeReferenciaMeses: 9, dominio: "socio_emocional", descricao: "Mostra várias expressões faciais — feliz, triste, zangado(a), surpreendido(a)" },
  { id: "9m-se-3", idadeReferenciaMeses: 9, dominio: "socio_emocional", descricao: "Olha quando lhe chama pelo nome" },
  { id: "9m-se-4", idadeReferenciaMeses: 9, dominio: "socio_emocional", descricao: "Reage quando se ausenta (olha, estica os braços, ou chora)" },
  { id: "9m-se-5", idadeReferenciaMeses: 9, dominio: "socio_emocional", descricao: "Sorri ou ri-se a jogar às escondidinhas" },
  { id: "9m-li-1", idadeReferenciaMeses: 9, dominio: "linguagem", descricao: "Faz sons diferentes, tipo \"mamama\" e \"babababa\"" },
  { id: "9m-li-2", idadeReferenciaMeses: 9, dominio: "linguagem", descricao: "Levanta os braços para ser pego(a) ao colo" },
  { id: "9m-co-1", idadeReferenciaMeses: 9, dominio: "cognitivo", descricao: "Procura objetos quando caem fora da vista" },
  { id: "9m-co-2", idadeReferenciaMeses: 9, dominio: "cognitivo", descricao: "Bate com dois objetos um no outro" },
  { id: "9m-mo-1", idadeReferenciaMeses: 9, dominio: "motor", descricao: "Senta-se sozinho(a)" },
  { id: "9m-mo-2", idadeReferenciaMeses: 9, dominio: "motor", descricao: "Passa objetos de uma mão para a outra" },
  { id: "9m-mo-3", idadeReferenciaMeses: 9, dominio: "motor", descricao: "Usa os dedos para \"apanhar\" comida" },
  { id: "9m-mo-4", idadeReferenciaMeses: 9, dominio: "motor", descricao: "Fica sentado(a) sem apoio" },

  // ---- 12 meses ----
  { id: "12m-se-1", idadeReferenciaMeses: 12, dominio: "socio_emocional", descricao: "Joga consigo, tipo \"palminhas\"" },
  { id: "12m-li-1", idadeReferenciaMeses: 12, dominio: "linguagem", descricao: "Diz \"adeus\" com a mão" },
  { id: "12m-li-2", idadeReferenciaMeses: 12, dominio: "linguagem", descricao: "Chama um dos pais \"mama\", \"papa\" ou outro nome especial" },
  { id: "12m-li-3", idadeReferenciaMeses: 12, dominio: "linguagem", descricao: "Compreende \"não\" (pára brevemente ou reage)" },
  { id: "12m-co-1", idadeReferenciaMeses: 12, dominio: "cognitivo", descricao: "Coloca algo dentro de um recipiente, tipo um bloco num copo" },
  { id: "12m-co-2", idadeReferenciaMeses: 12, dominio: "cognitivo", descricao: "Procura objetos que viu esconder, tipo um brinquedo sob um cobertor" },
  { id: "12m-mo-1", idadeReferenciaMeses: 12, dominio: "motor", descricao: "Puxa-se para ficar de pé" },
  { id: "12m-mo-2", idadeReferenciaMeses: 12, dominio: "motor", descricao: "Anda apoiando-se em móveis" },
  { id: "12m-mo-3", idadeReferenciaMeses: 12, dominio: "motor", descricao: "Bebe por um copo sem tampa, com ajuda" },
  { id: "12m-mo-4", idadeReferenciaMeses: 12, dominio: "motor", descricao: "Apanha objetos pequenos entre o polegar e o indicador" },

  // ---- 15 meses ----
  { id: "15m-se-1", idadeReferenciaMeses: 15, dominio: "socio_emocional", descricao: "Copia outras crianças enquanto brinca" },
  { id: "15m-se-2", idadeReferenciaMeses: 15, dominio: "socio_emocional", descricao: "Mostra-lhe um objeto de que gosta" },
  { id: "15m-se-3", idadeReferenciaMeses: 15, dominio: "socio_emocional", descricao: "Bate palmas quando está entusiasmado(a)" },
  { id: "15m-se-4", idadeReferenciaMeses: 15, dominio: "socio_emocional", descricao: "Abraça um boneco de peluche ou outro brinquedo" },
  { id: "15m-se-5", idadeReferenciaMeses: 15, dominio: "socio_emocional", descricao: "Mostra-lhe afeto (abraços, festinhas ou beijos)" },
  { id: "15m-li-1", idadeReferenciaMeses: 15, dominio: "linguagem", descricao: "Tenta dizer uma ou duas palavras além de \"mama\" ou \"papa\"" },
  { id: "15m-li-2", idadeReferenciaMeses: 15, dominio: "linguagem", descricao: "Olha para um objeto familiar quando o nomeia" },
  { id: "15m-li-3", idadeReferenciaMeses: 15, dominio: "linguagem", descricao: "Segue instruções dadas com gesto e palavras" },
  { id: "15m-li-4", idadeReferenciaMeses: 15, dominio: "linguagem", descricao: "Aponta para pedir algo ou pedir ajuda" },
  { id: "15m-co-1", idadeReferenciaMeses: 15, dominio: "cognitivo", descricao: "Tenta usar objetos da forma correta, tipo telefone, copo ou livro" },
  { id: "15m-co-2", idadeReferenciaMeses: 15, dominio: "cognitivo", descricao: "Empilha pelo menos dois objetos pequenos, tipo blocos" },
  { id: "15m-mo-1", idadeReferenciaMeses: 15, dominio: "motor", descricao: "Dá alguns passos sozinho(a)" },
  { id: "15m-mo-2", idadeReferenciaMeses: 15, dominio: "motor", descricao: "Usa os dedos para comer alguma comida sozinho(a)" },

  // ---- 18 meses ----
  { id: "18m-se-1", idadeReferenciaMeses: 18, dominio: "socio_emocional", descricao: "Afasta-se de si, mas verifica se está por perto" },
  { id: "18m-se-2", idadeReferenciaMeses: 18, dominio: "socio_emocional", descricao: "Aponta para lhe mostrar algo interessante" },
  { id: "18m-se-3", idadeReferenciaMeses: 18, dominio: "socio_emocional", descricao: "Estica as mãos para as lavar" },
  { id: "18m-se-4", idadeReferenciaMeses: 18, dominio: "socio_emocional", descricao: "Olha algumas páginas de um livro consigo" },
  { id: "18m-se-5", idadeReferenciaMeses: 18, dominio: "socio_emocional", descricao: "Ajuda-o(a) a vesti-lo(a), empurrando o braço pela manga ou levantando o pé" },
  { id: "18m-li-1", idadeReferenciaMeses: 18, dominio: "linguagem", descricao: "Tenta dizer três ou mais palavras além de \"mama\" ou \"papa\"" },
  { id: "18m-li-2", idadeReferenciaMeses: 18, dominio: "linguagem", descricao: "Segue instruções de um passo sem gestos" },
  { id: "18m-co-1", idadeReferenciaMeses: 18, dominio: "cognitivo", descricao: "Copia-o(a) a fazer tarefas, tipo varrer com uma vassoura" },
  { id: "18m-co-2", idadeReferenciaMeses: 18, dominio: "cognitivo", descricao: "Brinca com brinquedos de forma simples, tipo empurrar um carrinho" },
  { id: "18m-mo-1", idadeReferenciaMeses: 18, dominio: "motor", descricao: "Anda sem se agarrar a ninguém nem a nada" },
  { id: "18m-mo-2", idadeReferenciaMeses: 18, dominio: "motor", descricao: "Rabisca" },
  { id: "18m-mo-3", idadeReferenciaMeses: 18, dominio: "motor", descricao: "Bebe por um copo sem tampa, podendo entornar" },
  { id: "18m-mo-4", idadeReferenciaMeses: 18, dominio: "motor", descricao: "Come com os dedos sozinho(a)" },
  { id: "18m-mo-5", idadeReferenciaMeses: 18, dominio: "motor", descricao: "Tenta usar uma colher" },
  { id: "18m-mo-6", idadeReferenciaMeses: 18, dominio: "motor", descricao: "Sobe e desce de um sofá ou cadeira sem ajuda" },

  // ---- 24 meses ----
  { id: "24m-se-1", idadeReferenciaMeses: 24, dominio: "socio_emocional", descricao: "Repara quando outros estão magoados ou tristes" },
  { id: "24m-se-2", idadeReferenciaMeses: 24, dominio: "socio_emocional", descricao: "Olha para a sua cara para saber como reagir numa situação nova" },
  { id: "24m-li-1", idadeReferenciaMeses: 24, dominio: "linguagem", descricao: "Aponta para coisas num livro quando lhe pergunta" },
  { id: "24m-li-2", idadeReferenciaMeses: 24, dominio: "linguagem", descricao: "Diz pelo menos duas palavras juntas, tipo \"mais leite\"" },
  { id: "24m-li-3", idadeReferenciaMeses: 24, dominio: "linguagem", descricao: "Aponta para pelo menos duas partes do corpo quando pede" },
  { id: "24m-li-4", idadeReferenciaMeses: 24, dominio: "linguagem", descricao: "Usa mais gestos além de acenar e apontar, tipo mandar um beijo" },
  { id: "24m-co-1", idadeReferenciaMeses: 24, dominio: "cognitivo", descricao: "Segura algo numa mão enquanto usa a outra" },
  { id: "24m-co-2", idadeReferenciaMeses: 24, dominio: "cognitivo", descricao: "Tenta usar botões, manípulos ou interruptores num brinquedo" },
  { id: "24m-co-3", idadeReferenciaMeses: 24, dominio: "cognitivo", descricao: "Brinca com mais do que um brinquedo ao mesmo tempo" },
  { id: "24m-mo-1", idadeReferenciaMeses: 24, dominio: "motor", descricao: "Dá pontapés numa bola" },
  { id: "24m-mo-2", idadeReferenciaMeses: 24, dominio: "motor", descricao: "Corre" },
  { id: "24m-mo-3", idadeReferenciaMeses: 24, dominio: "motor", descricao: "Sobe alguns degraus (a andar, não a gatinhar), com ou sem ajuda" },
  { id: "24m-mo-4", idadeReferenciaMeses: 24, dominio: "motor", descricao: "Come com uma colher" },
];

/** Idades de checklist disponíveis, por ordem. */
export const IDADES_CHECKLIST_MESES = [2, 4, 6, 9, 12, 15, 18, 24] as const;
