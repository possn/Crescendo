/**
 * Conselhos de puericultura — 0 a 24 meses.
 *
 * Fontes principais:
 * - AAP "Safe Sleep" / Task Force on SIDS (recomendações de sono seguro)
 * - WHO/AAP: aleitamento exclusivo até aos 6 meses, diversificação a partir
 *   dos 6 meses com continuação do aleitamento até aos 2 anos ou mais
 * - NIAID Addendum Guidelines for the Prevention of Peanut Allergy (2017) +
 *   AAP Clinical Report 2019: introdução precoce de alergénios comuns
 *   (amendoim, ovo) entre os 4-6 meses reduz o risco de alergia alimentar —
 *   reversão da orientação antiga de atrasar a introdução
 * - AAP Bright Futures: segurança doméstica por fase motora, tempo de ecrã
 *
 * Este conteúdo é informativo geral, não substitui orientação individual
 * do pediatra da criança. Antes de publicação real, requer revisão por
 * pediatra distinto do autor (ver ROADMAP.md).
 */

import type { ConselhoPuericultura } from "../../types";

export const CONSELHOS: ConselhoPuericultura[] = [
  // ---- SONO ----
  {
    id: "sono-costas",
    tema: "sono",
    idadeMinMeses: 0,
    idadeMaxMeses: 12,
    titulo: "Sempre de costas para dormir",
    texto:
      "Deitar sempre o bebé de costas, para todas as sestas e à noite, até 1 ano. É a medida individual mais eficaz contra a síndrome de morte súbita do lactente (SMSL). Quando já se vira sozinho para a barriga, não é preciso voltar a virá-lo.",
    fonte: "AAP Task Force on SIDS — Safe Sleep",
  },
  {
    id: "sono-superficie",
    tema: "sono",
    idadeMinMeses: 0,
    idadeMaxMeses: 12,
    titulo: "Superfície firme, berço vazio",
    texto:
      "Colchão firme e plano, lençol ajustado, sem almofadas, edredões, protetores de grades, peluches ou posicionadores dentro do berço até 1 ano. Reduz o risco de asfixia e SMSL.",
    fonte: "AAP Task Force on SIDS — Safe Sleep",
  },
  {
    id: "sono-quarto-partilhado",
    tema: "sono",
    idadeMinMeses: 0,
    idadeMaxMeses: 12,
    titulo: "Mesmo quarto, cama diferente",
    texto:
      "Partilhar o quarto com o bebé (não a cama) reduz o risco de SMSL em até 50%. A AAP recomenda pelo menos até aos 6 meses, idealmente até 1 ano.",
    fonte: "AAP Task Force on SIDS — Safe Sleep",
  },
  {
    id: "sono-regressoes",
    tema: "sono",
    idadeMinMeses: 3,
    idadeMaxMeses: 24,
    titulo: "As \"regressões\" de sono são normais",
    texto:
      "Por volta dos 4 meses, 8-10 meses e 18 meses, é comum o sono piorar temporariamente — coincide com saltos de desenvolvimento, não com um problema. Costuma estabilizar sozinho em 2-6 semanas.",
    fonte: "AAP Bright Futures",
  },

  // ---- ALIMENTAÇÃO ----
  {
    id: "alim-aleitamento",
    tema: "alimentacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 6,
    titulo: "Aleitamento exclusivo até aos 6 meses",
    texto:
      "A OMS e a AAP recomendam aleitamento materno exclusivo nos primeiros 6 meses, sem necessidade de água, chás ou outros líquidos. Quando o aleitamento não é possível ou não é escolhido, fórmula infantil é uma alternativa nutricionalmente adequada.",
    fonte: "WHO / AAP",
  },
  {
    id: "alim-diversificacao",
    tema: "alimentacao",
    idadeMinMeses: 6,
    idadeMaxMeses: 24,
    titulo: "Diversificação por volta dos 6 meses",
    texto:
      "Sinais de prontidão: senta-se com apoio, controla bem a cabeça, mostra interesse pela comida. O aleitamento (ou fórmula) continua a ser a base da alimentação até perto de 1 ano, com os sólidos a complementar, não substituir.",
    fonte: "WHO / AAP",
  },
  {
    id: "alim-alergenios",
    tema: "alimentacao",
    idadeMinMeses: 4,
    idadeMaxMeses: 11,
    titulo: "Não atrasar o amendoim e o ovo",
    texto:
      "A evidência atual (estudo LEAP, guidelines NIAID 2017) mostra o oposto do que se pensava há uma década: introduzir amendoim e ovo cedo, entre os 4-6 meses, dentro do padrão de outros sólidos, reduz o risco de alergia alimentar. Em crianças com eczema grave ou alergia ao ovo já confirmada, falar primeiro com o pediatra sobre a melhor forma de introduzir.",
    fonte: "NIAID Addendum Guidelines (2017) / AAP Clinical Report (2019)",
  },
  {
    id: "alim-mel",
    tema: "alimentacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 12,
    titulo: "Nada de mel antes de 1 ano",
    texto:
      "O mel pode conter esporos de Clostridium botulinum, inofensivos para crianças maiores e adultos, mas que podem causar botulismo infantil antes de 1 ano.",
    fonte: "AAP Bright Futures",
  },

  // ---- SEGURANÇA ----
  {
    id: "seg-casa-motora",
    tema: "seguranca",
    idadeMinMeses: 5,
    idadeMaxMeses: 18,
    titulo: "Rever a casa a cada nova fase motora",
    texto:
      "Assim que a criança começa a gatinhar ou a puxar-se para ficar de pé, vale a pena olhar para a casa ao nível dela: fixar móveis altos à parede, tapar tomadas, afastar cordões e objetos pequenos (menos de 3,5cm é risco de engasgamento).",
    fonte: "AAP Bright Futures",
  },
  {
    id: "seg-quimicos",
    tema: "seguranca",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Medicamentos e produtos de limpeza trancados",
    texto:
      "Guardar sempre fora de alcance e à vista, idealmente trancados — a intoxicação acidental é uma das causas mais comuns de urgência pediátrica nesta faixa etária.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "seg-cadeira-auto",
    tema: "seguranca",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Cadeira auto voltada para trás o máximo tempo possível",
    texto:
      "Manter a cadeira voltada para trás até ao limite de peso/altura definido pelo fabricante, não apenas até 1 ano — é significativamente mais protetora em caso de colisão.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "seg-agua",
    tema: "seguranca",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Nunca sozinho na água, nem por segundos",
    texto:
      "Um bebé pode afogar-se em poucos centímetros de água e em silêncio. Banho e piscina exigem supervisão direta, sempre, sem exceção para \"só um instante\".",
    fonte: "AAP Bright Futures",
  },

  // ---- ESTIMULAÇÃO ----
  {
    id: "est-barriga-baixo",
    tema: "estimulacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 6,
    titulo: "Tempo de barriga para baixo, várias vezes ao dia",
    texto:
      "Desde os primeiros dias, sob supervisão e acordado. Fortalece o pescoço e os ombros e ajuda os marcos motores seguintes (rolar, sentar).",
    fonte: "AAP Bright Futures",
  },
  {
    id: "est-leitura",
    tema: "estimulacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Ler em voz alta desde cedo",
    texto:
      "Não importa que o bebé \"não perceba\" — ouvir linguagem rica e ver as páginas apoia o desenvolvimento da linguagem muito antes das primeiras palavras.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "est-ecras",
    tema: "estimulacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Evitar ecrãs antes dos 18-24 meses",
    texto:
      "Exceção: chamadas de vídeo com familiares. Fora isso, a AAP recomenda evitar ecrãs nesta fase — o tempo de brincar livre e interação direta tem mais valor para o desenvolvimento.",
    fonte: "AAP — Media and Young Minds",
  },
  {
    id: "est-brincar-livre",
    tema: "estimulacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Brincar livre é suficiente",
    texto:
      "Não é preciso material didático nem programas estruturados. Caixas, colheres de pau, empilhar e desempilhar objetos do dia a dia estimulam tanto quanto brinquedos \"educativos\".",
    fonte: "AAP Bright Futures",
  },
];

export const TEMAS: { id: ConselhoPuericultura["tema"]; label: string; cor: string }[] = [
  { id: "sono", label: "Sono", cor: "#6b5b95" },
  { id: "alimentacao", label: "Alimentação", cor: "#ad5834" },
  { id: "seguranca", label: "Segurança", cor: "#8a6d3b" },
  { id: "estimulacao", label: "Estimulação", cor: "#5c6e54" },
];
