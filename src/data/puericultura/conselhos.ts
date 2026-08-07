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

  // ---- SONO (adicionais) ----
  {
    id: "sono-fasquia",
    tema: "sono",
    idadeMinMeses: 0,
    idadeMaxMeses: 6,
    titulo: "Parar de enfaixar quando começa a rolar",
    texto:
      "Enfaixar (swaddle) pode ajudar a acalmar nas primeiras semanas, mas deve parar assim que a criança mostrar sinais de conseguir rolar sozinha — enfaixada, não consegue usar os braços para se reposicionar se ficar de barriga para baixo.",
    fonte: "AAP Task Force on SIDS — Safe Sleep",
  },
  {
    id: "sono-fumo",
    tema: "sono",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Evitar fumo (mesmo de terceiros)",
    texto:
      "A exposição a fumo de tabaco, mesmo indireta, está associada a maior risco de SMSL e de doenças respiratórias. Vale a pena manter o ambiente da criança livre de fumo, incluindo no carro e em casa de terceiros.",
    fonte: "AAP Task Force on SIDS — Safe Sleep",
  },

  // ---- ALIMENTAÇÃO (adicionais) ----
  {
    id: "alim-texturas",
    tema: "alimentacao",
    idadeMinMeses: 6,
    idadeMaxMeses: 12,
    titulo: "Progredir texturas com o tempo",
    texto:
      "De puré liso para pedaços pequenos e depois para \"finger foods\" que a criança segura sozinha — por volta dos 9 meses, a maioria já consegue gerir pedaços macios com a mão. Baby-led weaning (começar logo com pedaços macios) é também uma abordagem válida, não obrigatória.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "alim-engasgamento",
    tema: "alimentacao",
    idadeMinMeses: 6,
    idadeMaxMeses: 24,
    titulo: "Cuidado extra com uvas, frutos secos e afins",
    texto:
      "Uvas inteiras, frutos secos, pipocas, cenoura crua em pedaços e salsichas são das causas mais comuns de engasgamento grave nesta idade — cortar sempre em pedaços pequenos e finos (ou evitar inteiros) até bem depois dos 2 anos.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "alim-febre-jovem",
    tema: "alimentacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 3,
    titulo: "Febre antes dos 3 meses é sempre urgente",
    texto:
      "Num bebé com menos de 3 meses, qualquer febre (≥38°C retal) justifica contacto médico no próprio dia, mesmo que pareça bem-disposto — o sistema imunitário ainda é muito imaturo para se assumir que é \"só uma virose\".",
    fonte: "AAP Bright Futures",
  },

  // ---- SEGURANÇA (adicionais) ----
  {
    id: "seg-carro-calor",
    tema: "seguranca",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Nunca sozinho no carro, nem \"só um minuto\"",
    texto:
      "A temperatura dentro de um carro pode subir muito rapidamente mesmo com tempo ameno lá fora. Golpe de calor em crianças deixadas no carro continua a acontecer todos os anos, quase sempre por engano ou distração — um truque simples é deixar algo pessoal (telemóvel, carteira) no banco de trás.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "seg-objeto-conforto",
    tema: "seguranca",
    idadeMinMeses: 0,
    idadeMaxMeses: 12,
    titulo: "Peluches e \"paninhos\" de conforto só depois de 1 ano",
    texto:
      "Ligado à regra do berço vazio: objetos macios de conforto só devem entrar no berço depois de 1 ano, pela mesma razão dos protetores e almofadas — risco de asfixia.",
    fonte: "AAP Task Force on SIDS — Safe Sleep",
  },
  {
    id: "seg-sol",
    tema: "seguranca",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Sol: sombra e roupa antes dos 6 meses, protetor depois",
    texto:
      "Antes dos 6 meses, a proteção principal é sombra, chapéu e roupa — a pele ainda é muito fina para protetor solar em grande área. Depois dos 6 meses, pode usar-se protetor solar em zonas expostas.",
    fonte: "AAP Bright Futures",
  },

  // ---- ESTIMULAÇÃO (adicionais) ----
  {
    id: "est-dentes",
    tema: "estimulacao",
    idadeMinMeses: 4,
    idadeMaxMeses: 24,
    titulo: "Primeiro dente, primeira escovagem",
    texto:
      "Assim que sai o primeiro dente, começar a escovar duas vezes ao dia com uma quantidade de pasta fluoretada do tamanho de um grão de arroz. A primeira visita ao dentista é recomendada por volta do 1º aniversário.",
    fonte: "AAP — Oral Health",
  },
  {
    id: "est-denticao-alivio",
    tema: "estimulacao",
    idadeMinMeses: 4,
    idadeMaxMeses: 18,
    titulo: "Dentição: alívio simples, sem geles nem colares",
    texto:
      "Um mordedor frio (não congelado) ou massajar a gengiva com o dedo limpo costuma bastar. A FDA desaconselha géis de dentição com benzocaína (risco raro mas grave), e os colares de âmbar não têm eficácia comprovada e são risco de estrangulamento/engasgamento.",
    fonte: "FDA / AAP",
  },
  {
    id: "est-birras",
    tema: "estimulacao",
    idadeMinMeses: 12,
    idadeMaxMeses: 24,
    titulo: "As birras fazem parte do desenvolvimento normal",
    texto:
      "Entre 1 e 2 anos, a linguagem ainda não acompanha as emoções — a birra é muitas vezes a única forma de expressar frustração. Manter-se calmo, validar o sentimento (\"estás zangado\") e manter limites simples ajuda mais do que castigar.",
    fonte: "AAP Bright Futures",
  },

  // ---- SONO (segunda ronda) ----
  {
    id: "sono-rotina",
    tema: "sono",
    idadeMinMeses: 2,
    idadeMaxMeses: 24,
    titulo: "Uma rotina de deitar consistente ajuda mais do que parece",
    texto:
      "Uma sequência curta e previsível — banho, história, música calma, luz baixa — sinaliza ao cérebro que é hora de dormir. Estudos mostram que rotinas consistentes de deitar estão associadas a adormecer mais depressa e a acordar menos vezes durante a noite.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sono-sestas",
    tema: "sono",
    idadeMinMeses: 4,
    idadeMaxMeses: 18,
    titulo: "Quantas sestas são normais, por idade",
    texto:
      "Aproximadamente: 3-4 sestas até aos 6 meses, 2 sestas dos 6 aos 12-15 meses, 1 sesta dos 15-18 meses até perto dos 3-4 anos. É uma referência geral — a variação individual é grande, e não há problema em desviar-se um pouco disto.",
    fonte: "AAP Bright Futures",
  },

  // ---- ALIMENTAÇÃO (segunda ronda) ----
  {
    id: "alim-vitamina-d",
    tema: "alimentacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 12,
    titulo: "Vitamina D em suplemento, se há aleitamento",
    texto:
      "O leite materno tem pouca vitamina D. A AAP recomenda 400 UI/dia de suplemento, começando nos primeiros dias de vida, para bebés amamentados (exclusiva ou parcialmente), até estarem a tomar pelo menos 1L/dia de fórmula ou leite fortificados. Bebés só com fórmula geralmente não precisam de suplemento extra, se tomarem a quantidade recomendada.",
    fonte: "AAP — Prevention of Rickets and Vitamin D Deficiency",
  },
  {
    id: "alim-ferro",
    tema: "alimentacao",
    idadeMinMeses: 6,
    idadeMaxMeses: 12,
    titulo: "Ferro: as reservas do bebé esgotam-se por volta dos 6 meses",
    texto:
      "É por isso que a diversificação alimentar por volta dos 6 meses é importante para o ferro, não só para experimentar sabores. Carnes, cereais fortificados com ferro e leguminosas são boas fontes. Bebés exclusivamente amamentados além dos 6 meses sem fontes de ferro na dieta têm mais risco de défice.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "alim-agua",
    tema: "alimentacao",
    idadeMinMeses: 6,
    idadeMaxMeses: 12,
    titulo: "Água em pequenas quantidades, a partir dos 6 meses",
    texto:
      "Antes dos 6 meses não é preciso (nem recomendado) dar água — o leite chega. A partir dos 6 meses, pequenas quantidades ao lado das refeições são seguras. Quantidades grandes continuam desaconselhadas nesta idade, para não substituir leite ou comida.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "alim-sumo",
    tema: "alimentacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 12,
    titulo: "Sumo de fruta: evitar antes de 1 ano",
    texto:
      "Mesmo 100% natural, o sumo não tem a fibra da fruta inteira e contribui para excesso de açúcar sem benefício nutricional extra. Depois de 1 ano, se for dado, a AAP recomenda limitar a quantidade e preferir sempre a fruta inteira.",
    fonte: "AAP — Bright Futures / Fruit Juice Policy",
  },
  {
    id: "alim-seletividade",
    tema: "alimentacao",
    idadeMinMeses: 9,
    idadeMaxMeses: 24,
    titulo: "Recusar alimentos novos é normal, não é birra",
    texto:
      "É comum uma criança precisar de ver ou provar um alimento novo entre 8 e 15 vezes antes de o aceitar. Continuar a oferecer, sem forçar nem fazer disso um drama, costuma funcionar melhor do que desistir ao terceiro \"não\".",
    fonte: "AAP Bright Futures",
  },

  // ---- SEGURANÇA (segunda ronda) ----
  {
    id: "seg-pilhas-imanes",
    tema: "seguranca",
    idadeMinMeses: 6,
    idadeMaxMeses: 24,
    titulo: "Pilhas-botão e ímanes pequenos: perigo sério",
    texto:
      "Uma pilha-botão engolida pode causar queimaduras internas graves em poucas horas — é uma emergência médica imediata, não \"esperar para ver\". Vale a pena verificar se comandos, balanças ou brinquedos com pilhas-botão em casa têm o compartimento bem fechado.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "seg-intoxicacoes-contacto",
    tema: "seguranca",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Guarde o contacto do Centro de Informação Antivenenos",
    texto:
      "Em Portugal: 800 250 250 (linha gratuita, 24h). Vale a pena guardar já nos contactos do telemóvel, antes de precisar — não é o momento de andar à procura em cima da hora.",
    fonte: "INEM / Centro de Informação Antivenenos",
  },
  {
    id: "seg-detetores",
    tema: "seguranca",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Detetores de fumo e de monóxido de carbono em casa",
    texto:
      "Detalhe fácil de esquecer, mas com impacto real de segurança para toda a casa, não só para a criança — verificar que existem e que as pilhas funcionam.",
    fonte: "AAP Bright Futures",
  },

  // ---- ESTIMULAÇÃO (segunda ronda) ----
  {
    id: "est-bilinguismo",
    tema: "estimulacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Crescer com duas línguas não atrasa a fala",
    texto:
      "É um receio comum, mas sem base na evidência: crianças em casas bilingues podem misturar palavras das duas línguas por uns tempos, o que é normal e esperado — não é sinal de confusão nem de atraso de linguagem.",
    fonte: "AAP / American Speech-Language-Hearing Association",
  },

  // ---- SINTOMAS COMUNS (febre, vómitos, diarreia, tosse/constipação) ----
  // Nota: idadeMaxMeses fica em 60 (não 24) de propósito nestes itens —
  // ao contrário dos outros temas, isto continua a ser relevante depois
  // dos 2 anos, e o âmbito da app vai até aos 5.
  {
    id: "sint-febre-conceito",
    tema: "sintomas",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Febre é um sintoma, não a doença",
    texto:
      "Febre é a resposta do corpo a combater uma infeção — não é, por si só, perigosa. O objetivo de tratar não é fazer o número descer a todo o custo, é o conforto da criança. Uma criança com febre mas bem-disposta, a brincar e a beber líquidos, preocupa muito menos do que uma criança com temperatura normal mas muito prostrada.",
    fonte: "AAP — \"Fever and Antipyretic Use in Children\" (Sullivan & Farrar)",
  },
  {
    id: "sint-febre-quando-tratar",
    tema: "sintomas",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Sempre motivo de contacto imediato, independentemente de mais nada",
    texto:
      "Qualquer febre antes dos 3 meses; febre ≥ 40°C a qualquer idade; ou febre que persiste mais de 3 dias seguidos — nestes três casos, contacte o pediatra no próprio dia, mesmo que a criança pareça bem-disposta.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sint-febre-medicacao",
    tema: "sintomas",
    idadeMinMeses: 2,
    idadeMaxMeses: 60,
    titulo: "Antipiréticos: qual, a partir de quando, e o que evitar",
    texto:
      "Paracetamol pode usar-se desde bebé pequeno (confirme a idade mínima exata com o pediatra ou a bula). Ibuprofeno só a partir dos 6 meses — antes disso, os rins ainda são imaturos para o processar com segurança. Nunca aspirina em crianças com doença viral (risco de síndrome de Reye). Alternar rotineiramente entre os dois não tem benefício claramente comprovado e aumenta o risco de erro de dose — a AAP não o recomenda como prática de rotina. A dose certa depende sempre do peso, nunca da idade só por si: siga o rótulo ou a indicação do pediatra.",
    fonte: "AAP Bright Futures / FDA",
  },
  {
    id: "sint-vomitos-hidratacao",
    tema: "sintomas",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Vómitos: a prioridade é a hidratação, não parar de vomitar",
    texto:
      "Ofereça líquidos em quantidades pequenas e frequentes (alguns mL de cada vez, não um copo inteiro), de preferência solução de reidratação oral. Continue o aleitamento normalmente. Dar muito líquido de uma vez tende a provocar novo vómito.",
    fonte: "AAP / ESPGHAN Guidelines for Acute Gastroenteritis",
  },
  {
    id: "sint-vomitos-alerta",
    tema: "sintomas",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Vómitos que justificam avaliação urgente",
    texto:
      "Vómito com sangue ou verde (bílis); vómito muito forte, em jato, num bebé pequeno; recusa persistente de líquidos; ou sinais de desidratação (ver abaixo) — nestes casos, procure avaliação médica sem esperar.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sint-diarreia-alimentacao",
    tema: "sintomas",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Diarreia: manter a alimentação normal, sem dieta restritiva",
    texto:
      "Ao contrário do que ainda se ouve muito, a AAP não recomenda a dieta BRAT (banana, arroz, maçã, torrada) nem restringir lacticínios — manter a alimentação habitual (incluindo aleitamento ou fórmula à concentração normal) ajuda a recuperar mais depressa do que restringir. Se houver sinais de desidratação ligeira a moderada, junte solução de reidratação oral.",
    fonte: "AAP — Practice Parameter, Acute Gastroenteritis",
  },
  {
    id: "sint-desidratacao-sinais",
    tema: "sintomas",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Sinais de desidratação a vigiar",
    texto:
      "Menos fraldas molhadas do que o habitual, boca seca, ausência de lágrimas ao chorar, moleirinha (fontanela) afundada num bebé pequeno, ou muita prostração — qualquer um destes justifica contacto com o pediatra.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "sint-constipacao-geral",
    tema: "sintomas",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Constipação comum: não há medicamento que a encurte",
    texto:
      "A maioria das constipações resolve sozinha em 7-10 dias. O que realmente ajuda: lavagem nasal com soro fisiológico (e aspirador nasal em bebés pequenos), humidificador no quarto, e muitos líquidos. Nenhum xarope encurta uma constipação — o benefício real é só de conforto, quando existe.",
    fonte: "FDA / AAP",
  },
  {
    id: "sint-xaropes-idade",
    tema: "sintomas",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Xaropes de tosse e constipação: evitar antes dos 4 anos",
    texto:
      "A FDA e a AAP desaconselham xaropes de tosse/constipação de venda livre antes dos 4 anos — não têm benefício comprovado nesta idade e têm risco real de efeitos secundários, sobretudo por conterem vários princípios ativos ao mesmo tempo (fácil exceder a dose sem dar por isso). Dos 4 aos 6 anos, só com indicação do pediatra.",
    fonte: "FDA / AAP",
  },
  {
    id: "sint-mel-tosse",
    tema: "sintomas",
    idadeMinMeses: 12,
    idadeMaxMeses: 60,
    titulo: "Mel para a tosse noturna, só depois de 1 ano",
    texto:
      "Depois do primeiro aniversário (nunca antes, pelo risco de botulismo infantil), uma colher de chá de mel antes de deitar tem evidência real a ajudar a tosse noturna — em alguns estudos, tão bem ou melhor do que xaropes comuns.",
    fonte: "AAP / WHO",
  },
];

export const TEMAS: { id: ConselhoPuericultura["tema"]; label: string; cor: string }[] = [
  { id: "sono", label: "Sono", cor: "#6b5b95" },
  { id: "alimentacao", label: "Alimentação", cor: "#ad5834" },
  { id: "seguranca", label: "Segurança", cor: "#8a6d3b" },
  { id: "estimulacao", label: "Estimulação", cor: "#5c6e54" },
  { id: "sintomas", label: "Sintomas Comuns", cor: "#8f4f28" },
];
