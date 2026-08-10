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

  // ---- ESTIMULAÇÃO — BRINCADEIRA POR IDADE (terceira ronda) ----
  {
    id: "est-brinquedo-nao-e-obrigatorio",
    tema: "estimulacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Nenhum brinquedo é obrigatório para nenhum marco",
    texto:
      "Vale a pena dizer isto antes de mais nada: nenhum brinquedo específico é necessário para a criança atingir o marco seguinte, e não existe nenhuma aplicação que \"ensine a ler\" sozinha. Os pais continuam a ser o melhor estímulo que existe — os objetos abaixo são apoio, não substituição.",
    fonte: "AAP — HealthyChildren.org, Toy Buying Tips",
  },
  {
    id: "est-0-2m-contraste",
    tema: "estimulacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 2,
    titulo: "0-2 meses: imagens a preto e branco, alto contraste",
    texto:
      "Nesta idade a visão ainda está a desenvolver-se — padrões a preto e branco ou de cores muito contrastantes (não pastel) são mais fáceis de focar do que cores suaves. Um móbile simples por cima do berço, fora do alcance, também ajuda a treinar o seguimento visual.",
    fonte: "American Red Cross / AAP",
  },
  {
    id: "est-2-4m-chocalho",
    tema: "estimulacao",
    idadeMinMeses: 2,
    idadeMaxMeses: 4,
    titulo: "2-4 meses: chocalhos e espelho de bebé",
    texto:
      "Por volta dos 4 meses começa a trazer as mãos para o centro do corpo e a coordenar o olhar com o movimento — um chocalho leve (fácil de agarrar) e um espelho próprio para bebé (inquebrável) ajudam a treinar essa coordenação, além de estimular o interesse social pela própria imagem.",
    fonte: "UnityPoint Health — Early Childhood Development Toys by Age",
  },
  {
    id: "est-4-6m-textura",
    tema: "estimulacao",
    idadeMinMeses: 4,
    idadeMaxMeses: 6,
    titulo: "4-6 meses: texturas, mordedores, tapete de atividades",
    texto:
      "Tudo vai à boca nesta fase — é assim que exploram o mundo, não é um problema a corrigir. Objetos de texturas diferentes (macio, áspero, com relevo) e mordedores próprios (sem BPA) dão-lhe informação sensorial variada, em segurança.",
    fonte: "American Red Cross — Toys and Games for Child Development",
  },
  {
    id: "est-6-9m-causa-efeito",
    tema: "estimulacao",
    idadeMinMeses: 6,
    idadeMaxMeses: 9,
    titulo: "6-9 meses: esconde-esconde e brinquedos de causa-efeito",
    texto:
      "É a idade em que começa a perceber que um objeto continua a existir mesmo escondido (permanência do objeto) — jogos simples de esconder e mostrar, ou brinquedos que reagem a uma ação (aperta e faz som), reforçam essa descoberta e a noção de que as suas ações têm efeito no mundo.",
    fonte: "HSS — Child Development Toys by Age",
  },
  {
    id: "est-9-12m-empilhar",
    tema: "estimulacao",
    idadeMinMeses: 9,
    idadeMaxMeses: 12,
    titulo: "9-12 meses: copos para empilhar, livros de pano/cartão",
    texto:
      "Empilhar e encaixar copos treina a preensão fina e a noção de tamanho relativo. Livros simples e resistentes (pano ou cartão grosso), com imagens de rostos ou animais, aproveitam o interesse crescente por imagens e ajudam a construir vocabulário — mesmo que ainda não fale.",
    fonte: "UnityPoint Health / AAP Bright Futures",
  },
  {
    id: "est-12-18m-empurrar",
    tema: "estimulacao",
    idadeMinMeses: 12,
    idadeMaxMeses: 18,
    titulo: "12-18 meses: brinquedos para empurrar, blocos grandes",
    texto:
      "Quem está a começar a andar beneficia de brinquedos para empurrar (dão apoio e incentivam a caminhar mais), e blocos grandes e leves para empilhar e derrubar — a repetição de construir/derrubar é, por si só, uma forma de aprendizagem nesta idade.",
    fonte: "American Red Cross — Toys and Games for Child Development",
  },
  {
    id: "est-18-24m-lapis-encaixe",
    tema: "estimulacao",
    idadeMinMeses: 18,
    idadeMaxMeses: 24,
    titulo: "18-24 meses: lápis de cera, puzzles de encaixe simples",
    texto:
      "Lápis de cera grossos (mais fáceis de agarrar) começam a treinar a pega em pinça, essencial mais tarde para escrever. Puzzles com 2-4 peças grandes, de encaixe simples, desenvolvem resolução de problemas e coordenação olho-mão.",
    fonte: "AAP Bright Futures / Thoughtful Parent",
  },
  {
    id: "est-2-3a-faz-de-conta",
    tema: "estimulacao",
    idadeMinMeses: 24,
    idadeMaxMeses: 36,
    titulo: "2-3 anos: jogo do faz-de-conta, triciclo",
    texto:
      "Brincar aos \"faz-de-conta\" (cozinhar, cuidar de um boneco) desenvolve linguagem e competências sociais — não precisa de brinquedos realistas, objetos genéricos servem tão bem ou melhor. Um triciclo ou bicicleta de equilíbrio (sem pedais) desenvolve coordenação motora grossa.",
    fonte: "Red Cross / HSS",
  },
  {
    id: "est-3-4a-tesoura-desenho",
    tema: "estimulacao",
    idadeMinMeses: 36,
    idadeMaxMeses: 48,
    titulo: "3-4 anos: tesoura de pontas redondas, materiais de desenho",
    texto:
      "Cortar com tesoura de pontas redondas (sempre com supervisão) e desenhar com lápis de cor ou marcadores treinam motricidade fina de forma mais exigente. Jogos de tabuleiro muito simples (com regras curtas, tipo \"tirar à sorte e avançar\") introduzem a noção de esperar a vez.",
    fonte: "Red Cross — Toys and Games for Child Development",
  },
  {
    id: "est-4-5a-construcao-tabuleiro",
    tema: "estimulacao",
    idadeMinMeses: 48,
    idadeMaxMeses: 60,
    titulo: "4-5 anos: construção, jogos de tabuleiro com regras, bicicleta",
    texto:
      "Peças de construção mais pequenas e detalhadas apoiam o pensamento espacial. Jogos de tabuleiro com regras um pouco mais elaboradas ensinam a seguir instruções e a lidar com perder. Uma bicicleta (com ou sem estabilizadores) continua a desenvolver equilíbrio e coordenação motora grossa.",
    fonte: "HSS / Thoughtful Parent — Developmental Toys by Age",
  },
  {
    id: "est-ecras-limite",
    tema: "estimulacao",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Ecrãs: evitar antes dos 2 anos, limitar depois",
    texto:
      "A AAP recomenda evitar ecrãs (incluindo vídeo-chamadas com familiares à parte) antes dos 2 anos, e limitar a menos de 1 hora/dia dos 2 aos 5 anos, sempre que possível em conjunto com um adulto. Aplicações \"educativas\" costumam treinar só memorização (letras, formas) — não substituem brincadeira ativa.",
    fonte: "AAP — HealthyChildren.org, Healthy Digital Media Use Habits",
  },

  // ---- CHORO E CONFORTO ----
  {
    id: "conf-colicas-o-que-e",
    tema: "conforto",
    idadeMinMeses: 0,
    idadeMaxMeses: 5,
    titulo: "Cólicas: o que são, e quando passam",
    texto:
      "Definição clássica (\"regra dos 3\"): choro superior a 3h/dia, mais de 3 dias/semana, durante mais de 3 semanas, num bebé de resto saudável e a ganhar peso bem. Começam por volta das 2 semanas, atingem o pico às 6 semanas, e resolvem-se sozinhas até aos 3-5 meses — não é causado por nada que os pais tenham feito, e não está relacionado com o tipo de leite.",
    fonte: "AAP / American Family Physician — \"Infantile Colic\"",
  },
  {
    id: "conf-colicas-diagnostico-exclusao",
    tema: "conforto",
    idadeMinMeses: 0,
    idadeMaxMeses: 5,
    titulo: "Cólicas é um diagnóstico de exclusão",
    texto:
      "Antes de assumir que \"é só cólicas\", vale a pena o pediatra observar o bebé — para excluir outras causas de choro (refluxo, alergia, infeção). Se o choro for muito diferente do habitual, ou vier acompanhado de febre, vómitos ou pouco ganho de peso, não é só cólicas.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "conf-quando-nao-aguenta-mais",
    tema: "conforto",
    idadeMinMeses: 0,
    idadeMaxMeses: 5,
    titulo: "Quando já não aguenta mais o choro: pouse o bebé em segurança",
    texto:
      "Se sentir a frustração a aumentar e ninguém o conseguir substituir, é seguro pousar o bebé de costas no berço (sem nada à volta), sair da sala, e respirar alguns minutos. Nunca abane um bebé — mesmo alguns segundos de abanão violento podem causar lesão cerebral grave e permanente (síndrome do bebé abanado). Pedir ajuda a alguém não é falhar, é a decisão certa.",
    fonte: "\"Period of PURPLE Crying\" — National Center on Shaken Baby Syndrome / AAP",
  },

  // ---- HIGIENE E CUIDADOS ----
  {
    id: "hig-cordao-cuidados",
    tema: "higiene",
    idadeMinMeses: 0,
    idadeMaxMeses: 1,
    titulo: "Cordão umbilical: cuidado seco, sem álcool",
    texto:
      "A recomendação atual é \"dry cord care\" — não aplicar álcool nem produtos, deixar secar ao ar. Banhos só de esponja (não mergulhar o bebé) até o coto cair sozinho, normalmente entre 1 a 3 semanas. Dobre a fralda abaixo do coto para não o tapar. Nunca puxe, mesmo que esteja quase a cair sozinho.",
    fonte: "AAP — HealthyChildren.org, Umbilical Cord Care",
  },
  {
    id: "hig-cordao-alerta",
    tema: "higiene",
    idadeMinMeses: 0,
    idadeMaxMeses: 1,
    titulo: "Cordão umbilical: sinais de alerta",
    texto:
      "Vermelhidão a espalhar-se pela pele à volta, pus, cheiro desagradável, ou o coto ainda preso depois das 3 semanas — nestes casos, contacte o pediatra. Umas gotas de sangue quando cai é normal; sangramento ativo e persistente não é.",
    fonte: "AAP — HealthyChildren.org, Umbilical Cord Care",
  },
  {
    id: "hig-banho-frequencia",
    tema: "higiene",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Banho: não precisa de ser todos os dias",
    texto:
      "Nos primeiros meses, 2-3 banhos por semana chegam — banhos a mais podem ressecar a pele sensível do bebé. Água morna (não quente), poucos minutos, sabão neutro só onde é preciso.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "hig-dermatite-fraldas",
    tema: "higiene",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Dermatite das fraldas: trocar cedo, deixar arejar",
    texto:
      "A melhor prevenção é trocar a fralda assim que está suja, limpar bem e deixar secar ao ar uns minutos antes de fechar nova fralda. Uma camada fina de pomada de barreira (óxido de zinco) ajuda se já houver vermelhidão. Se não melhorar em 2-3 dias, tiver bolhas, ou parecer muito dorida, vale a pena mostrar ao pediatra — pode ser uma infeção fúngica que precisa de outro tratamento.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "hig-desfralde-quando",
    tema: "higiene",
    idadeMinMeses: 18,
    idadeMaxMeses: 36,
    titulo: "Desfralde: sinais de prontidão, não uma idade fixa",
    texto:
      "Não há uma idade certa — a maioria está pronta entre os 18 e os 30 meses, mas a variação normal é grande. Sinais de prontidão: fica seco(a) por 2h seguidas, percebe quando está a fazer, consegue seguir instruções simples, mostra interesse na sanita. Começar antes destes sinais tende a demorar mais, não menos.",
    fonte: "AAP Bright Futures",
  },

  // ---- VIDA EM FAMÍLIA ----
  {
    id: "fam-chegada-irmao",
    tema: "familia",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Chegada de um irmão: ciúme é normal, prepare com antecedência",
    texto:
      "Envolver a criança mais velha na preparação (escolher roupa do bebé, \"ajudar\"), manter rotinas dela o mais estável possível, e reservar tempo a sós com ela nas primeiras semanas ajuda bastante. Regressões temporárias (voltar a pedir chucha, fazer chichi na cama) são reação normal, não motivo de castigo.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "fam-vestuario-temperatura",
    tema: "familia",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Vestuário: uma camada a mais do que o adulto, não duas",
    texto:
      "Erro comum é agasalhar a mais. Regra prática: vestir o bebé com uma camada a mais do que a pessoa adulta sentiria necessidade para a mesma temperatura. Sobreaquecimento está associado a maior risco de SMSL — a nuca do bebé deve estar morna ao toque, não a suar.",
    fonte: "AAP Task Force on SIDS — Safe Sleep",
  },
  {
    id: "fam-viagem-aviao",
    tema: "familia",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Viagem de avião: mamar ou chupar ajuda nos ouvidos",
    texto:
      "A mudança de pressão na descolagem e na aterragem pode incomodar os ouvidos do bebé — mamar, dar biberão ou chucha nesses dois momentos específicos ajuda a equalizar a pressão através da deglutição.",
    fonte: "AAP Bright Futures",
  },

  // ---- CHORO E CONFORTO (segunda ronda) ----
  {
    id: "conf-hora-bruxa",
    tema: "conforto",
    idadeMinMeses: 0,
    idadeMaxMeses: 4,
    titulo: "\"Hora da bruxa\": choro concentrado ao fim da tarde",
    texto:
      "Muitos bebés têm um período previsível de choro e agitação a meio/fim da tarde, sem causa identificável — cansaço acumulado do dia é a explicação mais aceite. Tende a atenuar-se por volta dos 3-4 meses, ao mesmo tempo que as cólicas.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "conf-tecnicas-acalmar",
    tema: "conforto",
    idadeMinMeses: 0,
    idadeMaxMeses: 4,
    titulo: "Técnicas que costumam ajudar a acalmar",
    texto:
      "Enfaixar bem (braços contidos), embalar ou balançar suavemente, sons \"sh\" constantes ou ruído branco, colocar de lado ou de barriga para baixo só ao colo (nunca para dormir), e permitir sucção (peito, biberão ou chucha) — combinações destas técnicas imitam o ambiente uterino e ajudam muitos bebés a acalmar.",
    fonte: "Dr. Harvey Karp — \"The Happiest Baby on the Block\" (popularizado, sem ensaio clínico robusto, mas amplamente recomendado)",
  },
  {
    id: "conf-quando-preocupar",
    tema: "conforto",
    idadeMinMeses: 0,
    idadeMaxMeses: 4,
    titulo: "Quando o choro deixa de ser \"só cólicas\"",
    texto:
      "Febre, vómitos persistentes, sangue nas fezes, recusa alimentar prolongada, choro agudo diferente do habitual, ou um bebé que não consegue ser consolado de forma nenhuma por longos períodos — nestes casos, vale a pena contactar o pediatra, mesmo que pareça \"só mais um episódio de cólicas\".",
    fonte: "AAP Bright Futures",
  },

  // ---- HIGIENE E CUIDADOS (segunda ronda) ----
  {
    id: "hig-corte-unhas",
    tema: "higiene",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Cortar as unhas: melhor a dormir ou depois do banho",
    texto:
      "As unhas dos bebés crescem depressa e são afiadas o suficiente para arranhar a cara deles próprios. É mais fácil e seguro cortar com o bebé a dormir ou logo após o banho (unhas mais moles), usando tesoura de pontas redondas ou corta-unhas de bebé.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "hig-pele-eczema",
    tema: "higiene",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Pele seca e eczema são comuns — hidratar todos os dias",
    texto:
      "Pele seca ou com manchas ásperas (eczema/dermatite atópica) é frequente em bebés e crianças pequenas. Hidratante sem perfume aplicado diariamente, banhos mais curtos e mornos (não quentes), e evitar produtos perfumados ajudam a maioria dos casos. Se persistir ou piorar muito, vale a pena avaliação do pediatra.",
    fonte: "AAP — HealthyChildren.org, Eczema and Atopic Dermatitis",
  },
  {
    id: "hig-primeira-escovagem",
    tema: "higiene",
    idadeMinMeses: 0,
    idadeMaxMeses: 24,
    titulo: "Escovar os dentes assim que sair o primeiro",
    texto:
      "Logo que surge o primeiro dente, deve começar a ser escovado 2x por dia com escova macia de criança e uma quantidade mínima de pasta fluoretada (\"grão de arroz\" até aos 3 anos, \"ervilha\" depois). Antes dos dentes saírem, limpar as gengivas com uma gaze húmida já ajuda a criar o hábito.",
    fonte: "AAP / American Academy of Pediatric Dentistry",
  },
  {
    id: "hig-protetor-solar",
    tema: "higiene",
    idadeMinMeses: 6,
    idadeMaxMeses: 60,
    titulo: "Protetor solar a partir dos 6 meses; antes disso, sombra e roupa",
    texto:
      "Antes dos 6 meses, a recomendação é evitar exposição solar direta — usar sombra, chapéu e roupa que cubra em vez de protetor solar. A partir dos 6 meses, protetor solar (FPS 30+, de largo espectro) nas zonas expostas, reaplicado a cada 2 horas.",
    fonte: "AAP Bright Futures",
  },

  // ---- VIDA EM FAMÍLIA (segunda ronda) ----
  {
    id: "fam-volta-trabalho",
    tema: "familia",
    idadeMinMeses: 2,
    idadeMaxMeses: 24,
    titulo: "Volta ao trabalho / início da creche: um período de adaptação é normal",
    texto:
      "É comum a criança (e os pais) levarem 1-2 semanas a adaptar-se a uma nova rotina de creche ou ama — choro na despedida, sono mais instável, ou regressão temporária de comportamentos são esperados e tendem a passar. Uma despedida breve e consistente costuma funcionar melhor do que prolongar a saída.",
    fonte: "AAP Bright Futures",
  },
  {
    id: "fam-modelagem-ecras",
    tema: "familia",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "O tempo de ecrã dos pais também conta",
    texto:
      "Crianças pequenas aprendem por imitação — reduzir o telemóvel durante refeições e brincadeira não é só para a criança, é modelar o comportamento que se quer ensinar. Não precisa de ser perfeito, mas vale a pena ter consciência disto.",
    fonte: "AAP — HealthyChildren.org, Healthy Digital Media Use Habits",
  },
  {
    id: "fam-viagens-carro",
    tema: "familia",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Viagens de carro longas: paragens regulares",
    texto:
      "Em viagens superiores a 2 horas, planeie paragens a cada 1,5-2h para retirar o bebé da cadeira — passar muito tempo seguido na cadeira-auto (posição semi-reclinada) pode comprimir a via aérea em bebés pequenos, sobretudo prematuros.",
    fonte: "AAP — Car Safety Seats: A Guide for Families",
  },

  // ---- ALIMENTAÇÃO (terceira ronda) ----
  {
    id: "alim-leite-vaca-1ano",
    tema: "alimentacao",
    idadeMinMeses: 9,
    idadeMaxMeses: 24,
    titulo: "Leite de vaca inteiro só a partir dos 12 meses",
    texto:
      "Antes de 1 ano, o leite de vaca tem pouco ferro e pode até interferir na sua absorção, além de sobrecarregar os rins do bebé com sódio e proteína em excesso. Depois de 1 ano, o leite de vaca inteiro (não meio-gordo) é adequado como parte de uma dieta equilibrada, até aos 2 anos.",
    fonte: "AAP — Committee on Nutrition / Bright Futures",
  },
  {
    id: "alim-apetite-variavel",
    tema: "alimentacao",
    idadeMinMeses: 12,
    idadeMaxMeses: 60,
    titulo: "Comer pouco numa refeição e muito na seguinte é normal",
    texto:
      "O apetite de crianças pequenas varia bastante de refeição para refeição e de dia para dia, ligado ao ritmo de crescimento mais irregular depois do 1º ano. Olhar para o padrão ao longo de uma semana, não para uma refeição isolada, dá uma imagem mais realista.",
    fonte: "AAP Bright Futures",
  },

  // ---- SEGURANÇA (terceira ronda) ----
  {
    id: "seg-imanes-pequenos",
    tema: "seguranca",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Ímanes pequenos (e de alta potência): risco sério se engolidos",
    texto:
      "Ímanes pequenos e fortes (brinquedos de construção magnética, alguns brinquedos ou peças soltas de casa) podem causar lesões intestinais graves se mais do que um for engolido — atraem-se através das paredes do intestino. Guarde fora do alcance e procure ajuda médica imediata se suspeitar de ingestão.",
    fonte: "AAP — HealthyChildren.org, Magnet Safety",
  },
  {
    id: "seg-piscinas-afogamento",
    tema: "seguranca",
    idadeMinMeses: 0,
    idadeMaxMeses: 60,
    titulo: "Afogamento é silencioso — supervisão ativa e constante junto de água",
    texto:
      "Ao contrário do que se vê nos filmes, afogamento não costuma ter gritos nem chapinhar visível — pode acontecer em segundos e em silêncio. Perto de piscinas, banheiras ou água (mesmo pouca), mantenha sempre um adulto a supervisionar ativamente, sem distrações do telemóvel.",
    fonte: "AAP — HealthyChildren.org, Water Safety",
  },
];

export const TEMAS: { id: ConselhoPuericultura["tema"]; label: string; cor: string }[] = [
  { id: "sono", label: "Sono", cor: "#6b5b95" },
  { id: "alimentacao", label: "Alimentação", cor: "#ad5834" },
  { id: "seguranca", label: "Segurança", cor: "#8a6d3b" },
  { id: "estimulacao", label: "Estimulação", cor: "#5c6e54" },
  { id: "conforto", label: "Choro e Conforto", cor: "#4a6b7a" },
  { id: "higiene", label: "Higiene e Cuidados", cor: "#3d7a6b" },
  { id: "familia", label: "Vida em Família", cor: "#8a4a6b" },
];
