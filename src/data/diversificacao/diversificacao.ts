/**
 * Diversificação Alimentar — guia por idade + segurança alimentar.
 *
 * Estrutura e conteúdo clínico revistos por Pedro Sampaio Nunes (pediatra),
 * com base em:
 * - ESPGHAN Committee on Nutrition 2017 (JPGN 64:119-132)
 * - WHO Complementary Feeding Guideline 2023
 * - LEAP Study (NEJM 2015) / EAT Study (NEJM 2016)
 * - ESPGHAN/WHO Multisociety Response 2024 (JPGN 79:181-188)
 * - FDA/EPA Advice About Eating Fish (2021) / EFSA Scientific Opinion on
 *   Mercury in Food
 *
 * Nota sobre a janela de início: a OMS recomenda o início da diversificação
 * por volta dos 6 meses; a ESPGHAN admite uma janela entre as 17 semanas
 * completas (4 meses) e os 6 meses, sobretudo para permitir a introdução
 * atempada de alergénios. Este guia segue a janela ESPGHAN — nunca antes
 * das 17 semanas completas.
 */

import type { EstagioAlimentar, PerigoEngasgamento, AlimentoEvitar, ResumoAlimento } from "../../types";

export const SINAIS_PRONTIDAO: string[] = [
  "Consegue sentar-se com apoio e manter a cabeça estável",
  "Mostra interesse pela comida dos adultos (olha, estica o braço)",
  "O reflexo de extrusão (empurrar a comida com a língua) diminuiu",
  "Não iniciar antes dos 4 meses nem adiar além dos 6 meses completos",
];

export const ESTAGIOS: EstagioAlimentar[] = [
  {
    id: "estagio-4-6m",
    idadeLabel: "4-6 meses",
    idadeMinMeses: 4,
    idadeMaxMeses: 6,
    titulo: "Primeiros sabores",
    pontos: [
      "Começar pelo almoço: sopa de legumes passada (batata + cenoura + cebola + fio de azeite, sem sal)",
      "Servir à colher, 1-2 conchas; o bebé vai rejeitar — é normal, insista com calma",
      "Introduzir um legume novo a cada 3-4 dias (não remova os anteriores)",
      "Legumes seguros desde o início: abóbora, cenoura, alho-francês, courgette, brócolos, nabo, alho, aipo",
      "Adiar tomate, espinafres e nabiças para após os 6 meses (nitratos e acidez)",
      "Feijão, grão e leguminosas: aguardar os 8-9 meses",
      "Fruta à sobremesa: pêra, maçã ou banana — crua ralada, cozida ou assada; sem açúcar",
      "Uma semana depois da sopa: papa sem glúten ao lanche (150-200 ml, à colher)",
      "Continuar o leite materno ou fórmula como alimento principal",
    ],
    evidencia: "ESPGHAN 2017 recomenda iniciar a diversificação entre os 4-6 meses; não antes das 17 semanas (4 meses).",
    dicas: [
      "Se rejeitar a sopa 3-5 dias, substitua a batata por batata-doce (mais doce = mais aceite)",
      "Se continuar a rejeitar, junte coentros frescos — o aroma ajuda muitos bebés",
      "Nunca adicionar sal, açúcar ou mel aos alimentos do bebé",
      "Temperatura: morna, nunca quente; teste no pulso",
    ],
  },
  {
    id: "estagio-6m",
    idadeLabel: "6 meses",
    idadeMinMeses: 6,
    idadeMaxMeses: 6,
    titulo: "Proteína e alergénios",
    pontos: [
      "Introduzir carne na sopa do almoço (~30-40 g): começar pelas carnes brancas (frango, peru, coelho)",
      "Depois carnes vermelhas (vaca, borrego); evitar enchidos e carnes processadas",
      "Porco: pode ser introduzido a partir dos 6 meses em pequenas quantidades (carnes magras)",
      "Alergénios: introduzir AGORA — ovo inteiro cozido (gema e clara), peixe branco, trigo (glúten), leite de vaca em preparações culinárias",
      "Não atrasar estes alergénios — evidência robusta de que a introdução precoce reduz alergia (ESPGHAN 2017, LEAP/EAT)",
      "Marisco/crustáceos: não introduzir já — sem evidência de ensaios controlados; aguardar textura adequada (9-12 meses)",
      "Papas com glúten já permitidas a partir dos 6 meses",
      "Alternar papa com iogurte natural próprio para a idade (sem açúcar)",
      "Fórmula: pode manter-se a fórmula 1.ª idade ou transitar para fórmula de transição (2.ª idade) — a troca não é clinicamente obrigatória",
      "Todas as frutas permitidas (incluindo morango e frutos vermelhos) — a restrição antiga não tem suporte científico atual",
      "Duas refeições de sopa por dia; só o almoço com carne",
    ],
    evidencia:
      "ESPGHAN 2017 — não adiar alergénios; introdução após os 4 meses. LEAP 2015/EAT 2016: introdução precoce de amendoim e ovo reduz risco de alergia em 70-80%. O EAT Study introduziu ovo inteiro (não só a gema) desde os ~4 meses.",
    avisoAlergia: [
      "Ovo inteiro: cozido (~10 min), bem esmagado (gema e clara), 2x/semana; observe 20-30 min após a 1.ª vez",
      "Peixe branco: pescada, linguado, solha — sem espinhas, ~30-40 g, 2-3x/semana",
      "Amendoim: pasta de amendoim diluída (1/4 colher de chá) pode ser introduzida agora em bebés de baixo risco",
      "Sinais ligeiros (urticária localizada, vómito isolado): manter vigilância, contactar o pediatra se agravar",
      "Sinais de alarme/anafilaxia — dificuldade respiratória ou estridor, edema da língua ou garganta, prostração/hipotonia, palidez ou cianose: parar de imediato e ligar 112",
    ],
  },
  {
    id: "estagio-6-7m",
    idadeLabel: "6-7 meses",
    idadeMinMeses: 6,
    idadeMaxMeses: 7,
    titulo: "Texturas e variedade",
    pontos: [
      "Duas sopas por dia; só o almoço com carne",
      "Introduzir peixe branco na sopa do jantar (2-3x/semana, alternando com carne)",
      "Bacalhau: aguardar os 10-12 meses (teor de sal mesmo após demolha)",
      "Pão simples como snack; se optar por bolacha tipo Maria, escolher opções com baixo teor de açúcar — a maioria das bolachas comerciais contém açúcar, apesar do nome sugerir simplicidade",
      "Iogurte natural para bebé ou iogurte natural simples sem aditivos",
      "Começar a reduzir a passagem da sopa — deixar pequenos pedaços moles para estimular a mastigação",
      "Água: oferecer pequenas quantidades em copo de treino às refeições",
    ],
    dicas: [
      "Quantidade de carne/peixe: ~40 g por sopa (equivale a uma almôndega pequena)",
      "Bebé com dentes a nascer? Ofereça palitos de cenoura cozida para morder",
      "Não forçar — a autorregulação da ingestão deve ser respeitada (Responsive Feeding)",
    ],
  },
  {
    id: "estagio-8-9m",
    idadeLabel: "8-9 meses",
    idadeMinMeses: 8,
    idadeMaxMeses: 9,
    titulo: "Texturas moles e finger foods",
    pontos: [
      "As duas sopas com carne ou peixe",
      "Leguminosas: feijão, lentilhas, grão — cozidos e bem esmagados (~2x/semana)",
      "Massa, arroz e outros cereais: cozidos al dente e oferecidos em pedaços pequenos",
      "Finger foods macios: pedaços de banana, abacate, batata-doce cozida, frango desfiado",
      "Pão com manteiga ou pasta de fruta sem açúcar",
      "Iogurte natural normal (sem ser específico para bebé) já permitido",
      "Evitar mel até aos 12 meses (risco de botulismo infantil)",
      "Evitar leite de vaca como bebida principal até aos 12 meses",
    ],
    dicas: [
      "Finger foods: corte em pedaços do tamanho de uma uva partida ao meio — nunca uvas ou cherry inteiras",
      "O bebé vai fazer barulho, sujar e explorar — é aprendizagem, não birra",
      "Se o bebé engasga frequentemente: reveja o tamanho dos pedaços e considere BLW supervisionado",
    ],
  },
  {
    id: "estagio-9-12m",
    idadeLabel: "9-12 meses",
    idadeMinMeses: 9,
    idadeMaxMeses: 12,
    titulo: "Transição para a mesa familiar",
    pontos: [
      "Oferecer da comida da família — desde que sem sal excessivo e sem picante",
      "Sopa + prato pequeno: à medida que a quantidade no prato aumenta, a sopa torna-se só de legumes",
      "Peixe: incluir sardinha, cavala e salmão (ricos em ómega-3); introduzir bacalhau demolhado",
      "Marisco/crustáceos: pode introduzir-se agora, sempre bem cozinhado, picado e sem carapaça/espinhas",
      "3 refeições principais + 2 snacks (ex.: fruta + iogurte)",
      "Leite materno ou fórmula: manter até aos 12 meses; depois transitar para leite gordo de vaca",
      "Água: bebida principal; sumos de fruta não são necessários",
      "Evitar açúcar adicionado, sal e alimentos ultraprocessados",
      "Textura: maioria dos alimentos em pedaços — preparar para textura familiar aos 12 meses",
    ],
    evidencia: "OMS 2023 e ESPGHAN 2017 recomendam transição progressiva para dieta familiar antes dos 12 meses.",
    dicas: [
      "Aos 12 meses o bebé deve partilhar (versão sem sal) a refeição da família — este é o objetivo",
      "Rejeição de alimentos é normal — pode precisar de 10-15 exposições antes de aceitar um sabor novo",
      "Não use comida como recompensa nem castigo — afeta a relação futura com a alimentação",
    ],
  },
];

export const ALIMENTOS_A_EVITAR: AlimentoEvitar[] = [
  { id: "evitar-mel", alimento: "Mel", razao: "Risco de botulismo infantil", apartirDe: "12 meses" },
  {
    id: "evitar-leite-vaca",
    alimento: "Leite de vaca (bebida)",
    razao: "Ferro insuficiente, excesso de proteína",
    apartirDe: "12 meses",
  },
  { id: "evitar-sal", alimento: "Sal adicionado", razao: "Sobrecarga renal", apartirDe: "Sempre moderado" },
  {
    id: "evitar-acucar",
    alimento: "Açúcar adicionado",
    razao: "Cáries, preferências palatais",
    apartirDe: "Evitar sempre (idealmente até aos 2 anos)",
  },
  {
    id: "evitar-frutos-secos",
    alimento: "Frutos secos/oleaginosas inteiras",
    razao: "Risco de aspiração",
    apartirDe: "5 anos inteiros — em pasta/moídos, desde os 6 meses como alergénio",
  },
  {
    id: "evitar-marisco",
    alimento: "Marisco/crustáceos inteiros",
    razao: "Risco de aspiração/textura",
    apartirDe: "9-12 meses, bem cozinhado e picado",
  },
  { id: "evitar-uvas", alimento: "Uvas / cereja inteiras", razao: "Risco de asfixia", apartirDe: "Sempre cortar (mesmo depois dos 12 meses)" },
  {
    id: "evitar-atum",
    alimento: "Atum / peixe-espada",
    razao: "Mercúrio",
    apartirDe: "Limitar sempre na idade pediátrica (atum ≤1-2 porções/mês; evitar peixe-espada e tubarão)",
  },
  {
    id: "evitar-ultraprocessados",
    alimento: "Alimentos ultraprocessados",
    razao: "Excesso de sal, gordura trans, aditivos",
    apartirDe: "Evitar sempre",
  },
];

export const RESUMO_ALIMENTOS: ResumoAlimento[] = [
  { id: "res-sopa", alimento: "Sopa de legumes", m4a6: true, m6: true, m7a8: true, m9a12: true },
  { id: "res-fruta", alimento: "Fruta (pêra, maçã, banana)", m4a6: true, m6: true, m7a8: true, m9a12: true },
  { id: "res-papa-sg", alimento: "Papa sem glúten", m4a6: true, m6: true, m7a8: true, m9a12: true },
  { id: "res-frango", alimento: "Frango / peru / coelho", m4a6: false, m6: true, m7a8: true, m9a12: true },
  { id: "res-vaca", alimento: "Vaca / borrego", m4a6: false, m6: true, m7a8: true, m9a12: true },
  { id: "res-ovo", alimento: "Ovo cozido (inteiro: gema + clara)", m4a6: false, m6: true, m7a8: true, m9a12: true },
  { id: "res-peixe-branco", alimento: "Peixe branco", m4a6: false, m6: true, m7a8: true, m9a12: true },
  { id: "res-papa-cg", alimento: "Papa com glúten", m4a6: false, m6: true, m7a8: true, m9a12: true },
  { id: "res-iogurte-bebe", alimento: "Iogurte (bebé)", m4a6: false, m6: true, m7a8: true, m9a12: true },
  { id: "res-leguminosas", alimento: "Leguminosas", m4a6: false, m6: false, m7a8: true, m9a12: true },
  { id: "res-finger", alimento: "Finger foods moles", m4a6: false, m6: false, m7a8: true, m9a12: true },
  { id: "res-iogurte-normal", alimento: "Iogurte normal", m4a6: false, m6: false, m7a8: true, m9a12: true },
  { id: "res-peixe-gordo", alimento: "Peixe gordo (sardinha)", m4a6: false, m6: false, m7a8: false, m9a12: true },
  {
    id: "res-marisco",
    alimento: "Marisco (bem cozinhado, picado)",
    m4a6: false,
    m6: false,
    m7a8: false,
    m9a12: true,
  },
  { id: "res-bacalhau", alimento: "Bacalhau", m4a6: false, m6: false, m7a8: false, m9a12: true },
  {
    id: "res-comida-familia",
    alimento: "Comida familiar (sem sal)",
    m4a6: false,
    m6: false,
    m7a8: false,
    m9a12: true,
  },
  {
    id: "res-leite-vaca-bebida",
    alimento: "Leite de vaca (bebida)",
    m4a6: false,
    m6: false,
    m7a8: false,
    m9a12: false,
    notaEspecial: "12m+",
  },
  { id: "res-mel", alimento: "Mel", m4a6: false, m6: false, m7a8: false, m9a12: false, notaEspecial: "12m+" },
];

export const NOTA_ALERGENIOS = {
  titulo: "Alergénios: não adie a introdução, mas respeite a evidência para cada um",
  pontos: [
    "Ovo, leite, trigo, amendoim, sésamo e peixe branco: evidência de ensaios controlados (LEAP, EAT) suporta a introdução a partir dos 4-6 meses, um de cada vez, com 3-4 dias de intervalo — a introdução precoce REDUZ o risco de alergia, não aumenta (ESPGHAN 2017)",
    "Marisco e frutos de casca rija inteiros: sem ensaios controlados específicos que sustentem introdução precoce — marisco bem cozinhado a partir dos 9-12 meses; frutos secos só em pasta/moídos desde os 6 meses, nunca inteiros antes dos 5 anos (asfixia)",
    "Exceção: bebés com eczema grave ou alergia ao ovo — discutir com o pediatra antes de introduzir amendoim (ponderar avaliação/teste cutâneo prévio, protocolo LEAP para alto risco)",
    "Se histórico familiar de alergia: não é motivo para atrasar; manter vigilância reforçada na 1.ª exposição",
  ],
};

export const NOTA_VITAMINA_D = {
  titulo: "Vitamina D — suplementação obrigatória",
  pontos: [
    "400 UI/dia desde o nascimento até aos 12 meses (todos os bebés, incluindo os amamentados)",
    "Se fórmula adaptada: verificar se já tem vitamina D — geralmente <400 UI/dia até ~500 ml/dia",
    "Manter até pelo menos 12 meses; reavalie com o pediatra para além dessa idade",
  ],
};

export const PERIGOS_ENGASGAMENTO: PerigoEngasgamento[] = [
  { id: "peri-uvas", alimento: "Uvas e tomate-cereja", risco: "Forma e tamanho encaixam perfeitamente na via aérea", comoTornarSeguro: "Cortar sempre em quartos, ao longo (não em rodelas)" },
  { id: "peri-frutos-secos", alimento: "Frutos secos e sementes inteiros", risco: "Duros, pequenos, difíceis de mastigar bem antes dos 5 anos", comoTornarSeguro: "Só em creme/pasta (ex.: manteiga de amendoim), nunca inteiros antes dos 5 anos" },
  { id: "peri-salsichas", alimento: "Salsichas e afins", risco: "Forma cilíndrica clássica de obstrução total", comoTornarSeguro: "Cortar ao longo e depois em pedaços pequenos, nunca em rodelas" },
  { id: "peri-pipocas", alimento: "Pipocas", risco: "Formato irregular, difícil de controlar na boca", comoTornarSeguro: "Evitar antes dos 4 anos" },
  { id: "peri-cru-duro", alimento: "Vegetais crus e duros (cenoura, maçã inteiras)", risco: "Pedaços duros que não amolecem com a mastigação", comoTornarSeguro: "Cozinhar até amolecer, ou ralar fino / cortar em palitos finos" },
  { id: "peri-manteiga-amendoim", alimento: "Manteiga de amendoim em colherada", risco: "Colada ao céu da boca, difícil de engolir em bloco", comoTornarSeguro: "Espalhar fino numa torrada, nunca dar à colher" },
  { id: "peri-queijo", alimento: "Queijo em cubos grandes", risco: "Denso e difícil de partir com os dentes de leite", comoTornarSeguro: "Cortar em tiras finas ou pedaços pequenos" },
  { id: "peri-rebuçados", alimento: "Rebuçados e gomas duras", risco: "Não se dissolvem nem amolecem", comoTornarSeguro: "Evitar antes dos 4 anos" },
];
