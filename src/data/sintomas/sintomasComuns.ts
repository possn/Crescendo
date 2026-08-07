/**
 * Sintomas Comuns — febre, vómitos, gastroenterite, tosse/constipação.
 *
 * Módulo próprio, separado da Puericultura por pedido explícito: isto é
 * sobre doença aguda, não sobre rotina/prevenção. Conteúdo idêntico ao que
 * esteve brevemente dentro da Puericultura — só a organização mudou.
 *
 * Fontes: AAP Bright Futures, AAP "Fever and Antipyretic Use in Children"
 * (Sullivan & Farrar), AAP Practice Parameter on Acute Gastroenteritis,
 * FDA (xaropes de tosse/constipação, aspirina/Reye), WHO (mel para tosse).
 *
 * IMPORTANTE: revisão clínica obrigatória antes de qualquer publicação
 * real (ver ROADMAP.md) — sintomas agudos são a categoria de conteúdo
 * mais sensível da app.
 */

export type CategoriaSintoma = "febre" | "vomitos" | "diarreia" | "tosse";

export interface ConselhoSintoma {
  id: string;
  categoria: CategoriaSintoma;
  idadeMinMeses: number;
  idadeMaxMeses: number;
  titulo: string;
  texto: string;
  fonte: string;
}

export const CONSELHOS_SINTOMAS: ConselhoSintoma[] = [
  {
    id: "sint-febre-conceito",
    categoria: "febre",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Febre é um sintoma, não a doença",
    texto:
      "Febre é a resposta do corpo a combater uma infeção — não é, por si só, perigosa. O objetivo de tratar não é fazer o número descer a todo o custo, é o conforto da criança. Uma criança com febre mas bem-disposta, a brincar e a beber líquidos, preocupa muito menos do que uma criança com temperatura normal mas muito prostrada.",
    fonte: "AAP — \"Fever and Antipyretic Use in Children\" (Sullivan & Farrar)",
  },
  {
    id: "sint-febre-quando-tratar",
    categoria: "febre",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Sempre motivo de contacto imediato, independentemente de mais nada",
    texto:
      "Qualquer febre antes dos 3 meses; febre ≥ 40°C a qualquer idade; ou febre que persiste mais de 3 dias seguidos — nestes três casos, contacte o pediatra no próprio dia, mesmo que a criança pareça bem-disposta.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sint-febre-medicacao",
    categoria: "febre",
    idadeMinMeses: 2,
    idadeMaxMeses: 60,
    titulo: "Antipiréticos: qual, a partir de quando, e o que evitar",
    texto:
      "Paracetamol pode usar-se desde bebé pequeno (confirme a idade mínima exata com o pediatra ou a bula). Ibuprofeno só a partir dos 6 meses — antes disso, os rins ainda são imaturos para o processar com segurança. Nunca aspirina em crianças com doença viral (risco de síndrome de Reye). Alternar rotineiramente entre os dois não tem benefício claramente comprovado e aumenta o risco de erro de dose — a AAP não o recomenda como prática de rotina. A dose certa depende sempre do peso, nunca da idade só por si: siga o rótulo ou a indicação do pediatra. Há uma calculadora de referência mais abaixo nesta página.",
    fonte: "AAP Bright Futures / FDA",
  },
  {
    id: "sint-vomitos-hidratacao",
    categoria: "vomitos",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Vómitos: a prioridade é a hidratação, não parar de vomitar",
    texto:
      "Ofereça líquidos em quantidades pequenas e frequentes (alguns mL de cada vez, não um copo inteiro), de preferência solução de reidratação oral. Continue o aleitamento normalmente. Dar muito líquido de uma vez tende a provocar novo vómito.",
    fonte: "AAP / ESPGHAN Guidelines for Acute Gastroenteritis",
  },
  {
    id: "sint-vomitos-alerta",
    categoria: "vomitos",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Vómitos que justificam avaliação urgente",
    texto:
      "Vómito com sangue ou verde (bílis); vómito muito forte, em jato, num bebé pequeno; recusa persistente de líquidos; ou sinais de desidratação (ver Gastroenterite) — nestes casos, procure avaliação médica sem esperar.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sint-diarreia-alimentacao",
    categoria: "diarreia",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Diarreia: manter a alimentação normal, sem dieta restritiva",
    texto:
      "Ao contrário do que ainda se ouve muito, a AAP não recomenda a dieta BRAT (banana, arroz, maçã, torrada) nem restringir lacticínios — manter a alimentação habitual (incluindo aleitamento ou fórmula à concentração normal) ajuda a recuperar mais depressa do que restringir. Se houver sinais de desidratação ligeira a moderada, junte solução de reidratação oral.",
    fonte: "AAP — Practice Parameter, Acute Gastroenteritis",
  },
  {
    id: "sint-desidratacao-sinais",
    categoria: "diarreia",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Sinais de desidratação a vigiar",
    texto:
      "Menos fraldas molhadas do que o habitual, boca seca, ausência de lágrimas ao chorar, moleirinha (fontanela) afundada num bebé pequeno, ou muita prostração — qualquer um destes justifica contacto com o pediatra.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sint-constipacao-geral",
    categoria: "tosse",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Constipação comum: não há medicamento que a encurte",
    texto:
      "A maioria das constipações resolve sozinha em 7-10 dias. O que realmente ajuda: lavagem nasal com soro fisiológico (e aspirador nasal em bebés pequenos), humidificador no quarto, e muitos líquidos. Nenhum xarope encurta uma constipação — o benefício real é só de conforto, quando existe.",
    fonte: "FDA / AAP",
  },
  {
    id: "sint-xaropes-idade",
    categoria: "tosse",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Xaropes de tosse e constipação: evitar antes dos 4 anos",
    texto:
      "A FDA e a AAP desaconselham xaropes de tosse/constipação de venda livre antes dos 4 anos — não têm benefício comprovado nesta idade e têm risco real de efeitos secundários, sobretudo por conterem vários princípios ativos ao mesmo tempo (fácil exceder a dose sem dar por isso). Dos 4 aos 6 anos, só com indicação do pediatra.",
    fonte: "FDA / AAP",
  },
  {
    id: "sint-mel-tosse",
    categoria: "tosse",
    idadeMinMeses: 12,
    idadeMaxMeses: 60,
    titulo: "Mel para a tosse noturna, só depois de 1 ano",
    texto:
      "Depois do primeiro aniversário (nunca antes, pelo risco de botulismo infantil), uma colher de chá de mel antes de deitar tem evidência real a ajudar a tosse noturna — em alguns estudos, tão bem ou melhor do que xaropes comuns.",
    fonte: "AAP / WHO",
  },
];

export const CATEGORIAS: { id: CategoriaSintoma; label: string; cor: string }[] = [
  { id: "febre", label: "Febre", cor: "#8f4f28" },
  { id: "vomitos", label: "Vómitos", cor: "#6b5b95" },
  { id: "diarreia", label: "Gastroenterite", cor: "#ad5834" },
  { id: "tosse", label: "Tosse / Constipação", cor: "#5c6e54" },
];
