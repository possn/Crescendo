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

  // ---- TRAUMATISMO CRANIANO (QUEDAS) ----
  {
    id: "soc-trauma-avaliar",
    categoria: "trauma-craniano",
    titulo: "A maioria das quedas não é grave — mas vigie 24-48h",
    texto:
      "Uma queda da própria altura da criança raramente causa lesão séria. Chorar logo a seguir e depois voltar ao normal é o esperado, não motivo de alarme. Ainda assim, vale a pena vigiar de perto durante 24-48h, porque alguns sinais só aparecem horas depois.",
    fonte: "AAP / Children's Hospital Colorado",
  },
  {
    id: "soc-trauma-quando-urgencia",
    categoria: "trauma-craniano",
    titulo: "Sinais que exigem urgência imediata",
    texto:
      "Perda de consciência (mesmo breve); vómitos repetidos; convulsão; pupilas de tamanho diferente uma da outra; sangue ou líquido a sair do nariz ou ouvido; não conseguir acordar a criança ou muita dificuldade em despertá-la; um afundamento ou inchaço muito grande no crânio; queda de mais de 1 metro (crianças <2 anos) ou 1,5 metros (2+ anos).",
    fonte: "AAP / Children's Hospital Colorado",
  },
  {
    id: "soc-trauma-comportamento",
    categoria: "trauma-craniano",
    titulo: "Mudanças de comportamento também contam",
    texto:
      "Em bebés e crianças pequenas que ainda não sabem descrever dor de cabeça ou tonturas, preste atenção a irritabilidade fora do normal, sonolência excessiva, perda de uma competência já adquirida (ex.: deixar de andar), ou recusa persistente de comer. Não é preciso manter a criança acordada à força — se adormecer e reagir normalmente quando a chama, pode deixar dormir, só verificando periodicamente.",
    fonte: "AAP / Lurie Children's Hospital",
  },

  // ---- PICADAS DE INSETOS ----
  {
    id: "soc-picada-geral",
    categoria: "picadas",
    titulo: "A maioria é só incómoda, não perigosa",
    texto:
      "Vermelhidão, inchaço local e comichão são a reação normal e esperada — mesmo quando a área fica bastante inchada. Compressa fria e, se necessário, anti-histamínico oral (com indicação do pediatra) aliviam o desconforto.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "soc-picada-ferrao",
    categoria: "picadas",
    titulo: "Ferrão de abelha: raspar, não espremer",
    texto:
      "Se o ferrão ficar visível na pele, raspe-o para fora com uma unha ou cartão, de raspão — espremer com pinça ou dedos pode espremer mais veneno para dentro da pele.",
    fonte: "American Red Cross",
  },
  {
    id: "soc-picada-alerta",
    categoria: "picadas",
    titulo: "Quando uma picada pode ser uma emergência",
    texto:
      "Se o inchaço se espalhar para além da zona picada (ex.: da mão para o braço todo), ou surgirem sinais noutras partes do corpo (dificuldade a respirar, inchaço na cara/boca, vómitos, urticária espalhada) — isto pode ser uma reação alérgica grave. Ver secção Reação Alérgica.",
    fonte: "AAP Bright Futures",
  },

  // ---- CORPO ESTRANHO (NARIZ/OUVIDO) ----
  {
    id: "soc-corpo-estranho-nao-fazer",
    categoria: "corpo-estranho",
    titulo: "Não tente tirar com cotonete ou pinça em casa",
    texto:
      "É tentador tentar remover, mas cotonetes e pinças costumam empurrar o objeto ainda mais para dentro, ou magoar o canal. Deixe para o pediatra ou urgência, que têm o instrumento certo.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "soc-corpo-estranho-nariz",
    categoria: "corpo-estranho",
    titulo: "No nariz: pode tentar um assoar suave",
    texto:
      "Se a criança já tiver idade para colaborar, peça para tapar a narina livre e assoar suavemente pela narina com o objeto. Se não resultar à primeira, não insista repetidamente — vá à urgência.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "soc-corpo-estranho-pilha",
    categoria: "corpo-estranho",
    titulo: "Pilha-botão no nariz ou ouvido: urgência imediata",
    texto:
      "Tal como se engolida, uma pilha-botão alojada no nariz ou ouvido pode causar queimaduras químicas graves em poucas horas. Não é para \"ver se sai sozinha\" — urgência hospitalar no próprio dia.",
    fonte: "AAP Bright Futures",
  },

  // ---- HEMORRAGIA NASAL ----
  {
    id: "soc-hemorragia-tecnica",
    categoria: "hemorragia-nasal",
    titulo: "Sentado, inclinado para a frente — nunca para trás",
    texto:
      "Sente a criança, incline a cabeça ligeiramente para a frente (não para trás — isso faz engolir sangue e pode provocar vómito), e aperte firmemente a parte mole do nariz, logo abaixo do osso, continuamente durante 10 minutos, sem soltar para ir verificando.",
    fonte: "American Red Cross",
  },
  {
    id: "soc-hemorragia-depois",
    categoria: "hemorragia-nasal",
    titulo: "Depois: evitar assoar ou mexer no nariz",
    texto:
      "Nas horas seguintes, evite assoar o nariz com força ou mexer nele — pode reiniciar o sangramento antes de cicatrizar bem.",
    fonte: "American Red Cross",
  },
  {
    id: "soc-hemorragia-alerta",
    categoria: "hemorragia-nasal",
    titulo: "Quando procurar avaliação médica",
    texto:
      "Sangramento que não para depois de 20 minutos de pressão contínua e correta; hemorragia depois de uma pancada forte (possível fratura); ou hemorragias muito frequentes sem razão aparente.",
    fonte: "American Red Cross",
  },

  // ---- REAÇÃO ALÉRGICA ----
  {
    id: "soc-alergia-ligeira",
    categoria: "alergia",
    titulo: "Reação ligeira: só na pele, sem mais nada",
    texto:
      "Umas borbulhas ou urticária limitada a uma zona, sem afetar a respiração, boca/garganta, ou o estado geral — costuma resolver-se com anti-histamínico (com indicação do pediatra) e vigilância.",
    fonte: "AAP — HealthyChildren.org, Anaphylaxis",
  },
  {
    id: "soc-alergia-grave-sinais",
    categoria: "alergia",
    titulo: "Reação grave (anafilaxia): sinais em mais do que uma zona do corpo",
    texto:
      "Inchaço dos lábios/língua/garganta, dificuldade a respirar ou pieira, vómitos ou diarreia associados a sintomas de pele, tontura ou desmaio, urticária espalhada pelo corpo todo — sobretudo se aparecerem sinais em duas ou mais destas áreas ao mesmo tempo (não é preciso ter todos).",
    fonte: "AAP — HealthyChildren.org, Anaphylaxis",
  },
  {
    id: "soc-alergia-epinefrina",
    categoria: "alergia",
    titulo: "Se houver caneta de epinefrina prescrita: usar já, não esperar",
    texto:
      "Em caso de anafilaxia, a epinefrina usa-se imediatamente ao primeiro sinal — não se espera para ver se piora. Injeta-se na coxa (parte externa), depois liga-se 112. Se não melhorar em 5 minutos e houver uma segunda dose disponível, pode repetir-se. Deite a criança (ou lado, se vomitar/dificuldade a respirar) e vá para o hospital mesmo que pareça melhorar — os sintomas podem voltar horas depois.",
    fonte: "AAP — HealthyChildren.org, Anaphylaxis",
  },
];

export const CATEGORIAS_SOCORRO: { id: ConselhoSocorro["categoria"]; label: string; cor: string }[] = [
  { id: "convulsoes", label: "Convulsões", cor: "#6b5b95" },
  { id: "feridas", label: "Feridas Pequenas", cor: "#8a6d3b" },
  { id: "queimaduras", label: "Queimaduras", cor: "#ad5834" },
  { id: "trauma-craniano", label: "Traumatismo Craniano", cor: "#7a3d3d" },
  { id: "picadas", label: "Picadas de Insetos", cor: "#5a7a3d" },
  { id: "corpo-estranho", label: "Corpo Estranho", cor: "#8a6a2a" },
  { id: "hemorragia-nasal", label: "Hemorragia Nasal", cor: "#3d5a7a" },
  { id: "alergia", label: "Reação Alérgica", cor: "#8a3d5a" },
];
