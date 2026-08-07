/**
 * Contactos Úteis — números de emergência e recursos, verificados em
 * fontes oficiais (gov.pt, SNS, APSI) antes de incluir.
 *
 * IMPORTANTE: números de telefone de serviços públicos podem mudar.
 * Confirme periodicamente em gov.pt/cidadaos-europeus.../contactos-de-
 * -emergencia-em-portugal se tiver dúvidas.
 */

import type { ContactoUtil } from "../../types";

export const CONTACTOS: ContactoUtil[] = [
  // ---- Emergência ----
  {
    id: "112",
    categoria: "emergencia",
    nome: "112 — Emergência Nacional",
    descricao: "Para qualquer situação que coloque claramente a vida em risco. Não hesite em ligar.",
    telefone: "112",
    telefoneExibicao: "112",
    horario: "24 horas, todos os dias",
  },
  {
    id: "ciav",
    categoria: "emergencia",
    nome: "CIAV — Centro de Informação Antivenenos",
    descricao: "Intoxicações e ingestões acidentais — produtos de limpeza, medicamentos, plantas, etc.",
    telefone: "800250250",
    telefoneExibicao: "800 250 250",
    horario: "24 horas, todos os dias — chamada gratuita",
  },
  {
    id: "sns24",
    categoria: "emergencia",
    nome: "SNS 24 — Linha Saúde 24",
    descricao: "Triagem e aconselhamento para dúvidas de saúde não urgentes — evita deslocações desnecessárias às urgências.",
    telefone: "808242424",
    telefoneExibicao: "808 24 24 24",
    site: "https://www.sns24.gov.pt",
    horario: "Contacto clínico: 24h. Contacto administrativo: 8h-22h",
  },

  // ---- Apoio à Criança ----
  {
    id: "linha-apoio-crianca",
    categoria: "apoio-crianca",
    nome: "Linha de Apoio à Criança (IAC)",
    descricao: "Serviço de apoio a crianças e famílias — questões que afetam diretamente a criança.",
    telefone: "116111",
    telefoneExibicao: "116 111",
    horario: "24 horas, todos os dias — chamada gratuita",
  },
  {
    id: "linha-crianca-desaparecida",
    categoria: "apoio-crianca",
    nome: "Linha Criança Desaparecida",
    descricao: "Número europeu único para desaparecimento de crianças, em articulação com as autoridades.",
    telefone: "116000",
    telefoneExibicao: "116 000",
    horario: "24 horas, todos os dias — chamada gratuita",
  },

  // ---- Recursos e Organizações ----
  {
    id: "apsi",
    categoria: "recursos",
    nome: "APSI — Associação para a Promoção da Segurança Infantil",
    descricao: "Referência em Portugal sobre segurança infantil — cadeiras-auto, quedas, afogamento, prevenção de acidentes em casa.",
    telefone: "218844100",
    telefoneExibicao: "218 844 100",
    site: "https://www.apsi.org.pt",
  },
  {
    id: "dgs-pnv",
    categoria: "recursos",
    nome: "DGS — Programa Nacional de Vacinação",
    descricao: "Fonte oficial do calendário vacinal, sempre a mais atualizada em caso de dúvida.",
    site: "https://www.dgs.pt/paginas-de-sistema/saude-de-a-a-z/programa-nacional-de-vacinacao.aspx",
  },
  {
    id: "spp-crianca-familia",
    categoria: "recursos",
    nome: "Sociedade Portuguesa de Pediatria — Criança e Família",
    descricao: "Informação pediátrica em português, escrita por pediatras portugueses.",
    site: "https://criancaefamilia.spp.pt",
  },
];

export const CATEGORIAS_CONTACTO: { id: ContactoUtil["categoria"]; label: string; cor: string }[] = [
  { id: "emergencia", label: "Emergência", cor: "#8f4f28" },
  { id: "apoio-crianca", label: "Apoio à Criança", cor: "#6b5b95" },
  { id: "recursos", label: "Recursos e Organizações", cor: "#5c6e54" },
];
