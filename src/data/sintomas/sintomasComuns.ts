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

export type CategoriaSintoma = "febre" | "vomitos" | "diarreia" | "tosse" | "erupcoes" | "obstipacao" | "otite" | "crupe" | "conjuntivite" | "garganta";

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
      "Paracetamol pode usar-se desde bebé pequeno (confirme a idade mínima exata com o pediatra ou a bula). Ibuprofeno só a partir dos 6 meses — antes disso, os rins ainda são imaturos para o processar com segurança. Nunca aspirina em crianças com doença viral (risco de síndrome de Reye). Alternar rotineiramente entre os dois não tem benefício claramente comprovado e aumenta o risco de erro de dose — a AAP não o recomenda como prática de rotina. A dose certa depende sempre do peso, nunca da idade só por si: siga o rótulo ou a indicação do pediatra. Veja Calculadora de Dose no menu, para uma referência por peso.",
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
    id: "sint-vomitos-retomar-alimentacao",
    categoria: "vomitos",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Depois de parar de vomitar: retomar a alimentação normal, sem pressa mas sem restringir",
    texto:
      "Assim que os vómitos abrandarem (geralmente após algumas horas sem vomitar), pode voltar à alimentação habitual em quantidades pequenas — não há necessidade de dieta especial nem de esperar um dia inteiro. Continuar só líquidos por muito tempo não acelera a recuperação.",
    fonte: "AAP / ESPGHAN Guidelines for Acute Gastroenteritis",
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
    id: "sint-gastroenterite-duracao",
    categoria: "diarreia",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Duração típica, e quando deixa de ser \"só um vírus\"",
    texto:
      "Uma gastroenterite viral típica dura entre 5 a 14 dias, com melhoria gradual — os primeiros 2-3 dias costumam ser os piores. Diarreia com sangue, febre alta persistente, dor abdominal muito intensa e localizada, ou diarreia que dura mais de 2 semanas sem melhorar não é o padrão típico viral e justifica avaliação.",
    fonte: "AAP — Practice Parameter, Acute Gastroenteritis",
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

  // ---- ERUPÇÕES CUTÂNEAS ----
  {
    id: "sint-roseola",
    categoria: "erupcoes",
    idadeMinMeses: 6,
    idadeMaxMeses: 24,
    titulo: "Roséola: a erupção aparece depois da febre passar",
    texto:
      "Padrão característico: 3-5 dias de febre alta (por vezes 39-40°C) numa criança de resto bem-disposta, seguidos do desaparecimento súbito da febre — e só então surge uma erupção rosada no tronco, que se espalha depois para braços e pescoço. É benigna e autolimitada. Mais comum entre os 6 meses e os 2 anos.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sint-mao-pe-boca",
    categoria: "erupcoes",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Doença mão-pé-boca: bolhinhas dolorosas, vigie a hidratação",
    texto:
      "Pequenas bolhas/feridas nas mãos, pés e dentro da boca, com febre ligeira — muito comum em infantários. As feridas na boca podem doer o suficiente para a criança recusar comer e beber; o foco principal é manter a hidratação (alimentos frios e macios ajudam). Resolve-se sozinha em 7-10 dias. Contagiosa — evite infantário enquanto houver bolhas ativas.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sint-eczema",
    categoria: "erupcoes",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Eczema (dermatite atópica): hidratar muito, sempre",
    texto:
      "Pele seca, vermelha e com comichão, tipicamente nas bochechas e couro cabeludo em bebés, e nas dobras (cotovelos, joelhos) em crianças maiores. O que mais ajuda: hidratante sem perfume, em grande quantidade, várias vezes ao dia — logo a seguir ao banho enquanto a pele ainda está húmida (\"soak and seal\"). Banhos curtos, água morna, sabão suave. Cremes com corticoide só com indicação do pediatra, para as crises.",
    fonte: "AAP — HealthyChildren.org, Eczema",
  },

  // ---- OBSTIPAÇÃO INTESTINAL ----
  {
    id: "sint-obstipacao-normal",
    categoria: "obstipacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "A frequência normal varia muito — não é sempre obstipação",
    texto:
      "Um bebé amamentado pode fazer cocó várias vezes ao dia ou só de 5 em 5 dias — ambos podem ser normais, desde que as fezes sejam macias. O sinal de obstipação a sério não é a frequência, é a consistência: fezes duras, tipo bolinhas, com esforço e dor a fazer.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sint-obstipacao-ajuda",
    categoria: "obstipacao",
    idadeMinMeses: 6,
    idadeMaxMeses: 24,
    titulo: "O que ajuda, a partir dos 6 meses",
    texto:
      "Fruta com sorbitol natural — ameixa, pera, maçã — em puré ou pedaços, tem efeito laxante suave. Mais água (pequenas quantidades, já coberto noutro conselho). Evite dar laxantes ou óleo mineral sem orientação do pediatra nesta idade.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sint-obstipacao-alerta",
    categoria: "obstipacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Quando contactar o pediatra",
    texto:
      "Sangue nas fezes ou à volta do ânus (pode ser só uma fissura, mas vale a pena confirmar), obstipação com mais de 2-3 semanas, ou barriga muito inchada e dolorosa.",
    fonte: "AAP Bright Futures",
  },

  // ---- OTITE ----
  {
    id: "sint-otite-sinais",
    categoria: "otite",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Sinais de otite num bebé que ainda não fala",
    texto:
      "Puxar ou esfregar a orelha, choro que piora ao deitar, irritabilidade fora do habitual, por vezes febre. Nenhum destes sinais isolado tem certeza absoluta — só o pediatra com otoscópio confirma.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sint-otite-vigiar",
    categoria: "otite",
    idadeMinMeses: 6,
    idadeMaxMeses: 60,
    titulo: "Nem toda a otite precisa de antibiótico logo",
    texto:
      "A AAP recomenda, para casos ligeiros (dor leve há menos de 48h, sem febre alta) em crianças de 6 meses a 2 anos com otite só de um lado, ou 2+ anos com qualquer otite: pode optar-se por observar 2-3 dias, com controlo da dor, antes de decidir por antibiótico. Não é negligência — é a orientação oficial, porque muitas resolvem sozinhas. A decisão é sempre do pediatra que observa a criança.",
    fonte: "AAP — Diagnosis and Management of Acute Otitis Media (2013)",
  },
  {
    id: "sint-otite-dor",
    categoria: "otite",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Alívio da dor, seja qual for a decisão sobre antibiótico",
    texto:
      "Paracetamol ou ibuprofeno (ver Calculadora de Dose) aliviam a dor da otite independentemente de haver ou não antibiótico — o antibiótico, quando usado, não alivia a dor nas primeiras 24h.",
    fonte: "AAP — Diagnosis and Management of Acute Otitis Media (2013)",
  },

  // ---- CRUPE ----
  {
    id: "sint-crupe-o-que-e",
    categoria: "crupe",
    idadeMinMeses: 6,
    idadeMaxMeses: 60,
    titulo: "Crupe: a tosse que soa a latido de foca",
    texto:
      "Infeção viral que incha a laringe — o sinal característico é uma tosse seca e áspera, tipo latido de foca, por vezes com rouquidão. Costuma piorar à noite. A maioria dos casos é ligeira e trata-se em casa.",
    fonte: "AAP — HealthyChildren.org / American Family Physician",
  },
  {
    id: "sint-crupe-gravidade",
    categoria: "crupe",
    idadeMinMeses: 6,
    idadeMaxMeses: 60,
    titulo: "Os 3 níveis — e qual exige urgência",
    texto:
      "Ligeiro: tosse de latido, sem mais nada — trata-se em casa (ar fresco ou humidificado, líquidos, manter calmo). Moderado: ouve-se um som agudo a inspirar (estridor) só quando a criança chora ou se agita — contacte o pediatra em breve. Grave: estridor mesmo com a criança calma e em repouso, ou a pele a ficar azulada — isto é urgência hospitalar imediata.",
    fonte: "Children's Hospital of Philadelphia / HealthyChildren.org",
  },
  {
    id: "sint-crupe-em-casa",
    categoria: "crupe",
    idadeMinMeses: 6,
    idadeMaxMeses: 60,
    titulo: "Em casa: ar fresco ou humidificado, e manter calmo",
    texto:
      "Ar frio da noite (uma ida à varanda) ou o vapor de uma casa de banho com o chuveiro ligado costumam aliviar em minutos. Chorar e ficar agitado piora o estridor — manter a criança calma, ao colo, é mais eficaz do que parece.",
    fonte: "HealthyChildren.org",
  },

  // ---- CONJUNTIVITE ----
  {
    id: "sint-conjuntivite-viral",
    categoria: "conjuntivite",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Viral é a causa mais comum — não precisa de antibiótico",
    texto:
      "A maioria dos casos de conjuntivite (\"olho vermelho\") em crianças é viral, muitas vezes ligada a uma constipação — olhos vermelhos, lacrimejantes, com comichão. Resolve-se sozinha em 5 a 14 dias, sem tratamento específico. É contagiosa enquanto houver secreção.",
    fonte: "AAP — HealthyChildren.org, Pinkeye (Conjunctivitis)",
  },
  {
    id: "sint-conjuntivite-bacteriana",
    categoria: "conjuntivite",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Bacteriana: secreção espessa tipo pus, olhos \"colados\" de manhã",
    texto:
      "Secreção amarela/esverdeada, espessa, que volta a acumular-se poucos minutos depois de limpa, e pálpebras coladas ao acordar sugerem causa bacteriana — vale a pena avaliação pelo pediatra para decidir se são necessárias gotas antibióticas. Na prática, distinguir viral de bacteriana só pela aparência nem sempre é fiável, mesmo para profissionais.",
    fonte: "AAP / Mayo Clinic",
  },
  {
    id: "sint-conjuntivite-escola",
    categoria: "conjuntivite",
    idadeMinMeses: 12,
    idadeMaxMeses: 60,
    titulo: "Voltar à creche/escola: regras de exclusão mudaram",
    texto:
      "A orientação mais recente da AAP já não recomenda excluir automaticamente uma criança com conjuntivite (sem febre nem mal-estar) da escola — a lógica é semelhante à de uma constipação comum. Se for bacteriana e tratada com gotas, muitas escolas pedem só 24h de antibiótico antes do regresso; confirme a política da instituição.",
    fonte: "AAP — Managing Infectious Diseases in Child Care and Schools",
  },

  // ---- DOR DE GARGANTA ----
  {
    id: "sint-garganta-viral",
    categoria: "garganta",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "A maioria das dores de garganta é viral, não estreptococo",
    texto:
      "A maior parte das dores de garganta em crianças acompanha uma constipação comum — vírus, sem necessidade de teste nem antibiótico. Tosse, nariz a pingar e olhos vermelhos junto com a dor de garganta apontam mais para causa viral do que para estreptococo.",
    fonte: "CDC / AAP",
  },
  {
    id: "sint-garganta-estrepto-sinais",
    categoria: "garganta",
    idadeMinMeses: 36,
    idadeMaxMeses: 60,
    titulo: "Sinais que sugerem estreptococo (\"garganta estreptocócica\")",
    texto:
      "Início súbito de dor forte a engolir, febre, gânglios inchados no pescoço, e placas brancas nas amígdalas — sobretudo sem tosse nem nariz entupido — são os sinais clássicos que levam o pediatra a testar. O diagnóstico final precisa sempre de um teste (zaragatoa), não só da aparência.",
    fonte: "CDC — Group A Streptococcal Pharyngitis",
  },
  {
    id: "sint-garganta-idade",
    categoria: "garganta",
    idadeMinMeses: 0,
    idadeMaxMeses: 36,
    titulo: "Antes dos 3 anos, estreptococo é raro",
    texto:
      "A garganta estreptocócica é pouco comum antes dos 3 anos (mais frequente dos 5 aos 15 anos) — nesta idade, testar por rotina não costuma ser recomendado, sobretudo se houver sinais de constipação viral associados. Um bebé pequeno com dor de garganta pode manifestar-se só por recusar comer ou chorar ao engolir.",
    fonte: "AAP / Seattle Children's",
  },
];

export const CATEGORIAS: { id: CategoriaSintoma; label: string; cor: string }[] = [
  { id: "febre", label: "Febre", cor: "#8f4f28" },
  { id: "vomitos", label: "Vómitos", cor: "#6b5b95" },
  { id: "diarreia", label: "Gastroenterite", cor: "#ad5834" },
  { id: "tosse", label: "Tosse / Constipação", cor: "#5c6e54" },
  { id: "erupcoes", label: "Erupções Cutâneas", cor: "#a15c8e" },
  { id: "obstipacao", label: "Obstipação Intestinal", cor: "#4a7a4a" },
  { id: "otite", label: "Dor de Ouvido / Otite", cor: "#7a5a3d" },
  { id: "crupe", label: "Crupe", cor: "#5a6b8a" },
  { id: "conjuntivite", label: "Conjuntivite", cor: "#3d8a7a" },
  { id: "garganta", label: "Dor de Garganta", cor: "#b3722e" },
];
