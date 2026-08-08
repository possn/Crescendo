// Tipos de domínio partilhados pela app.
// Mantidos deliberadamente simples no MVP — sem dependências externas.

export type Sexo = "F" | "M";

export interface Crianca {
  id: string;
  nome: string;
  sexo: Sexo;
  dataNascimento: string; // ISO date (YYYY-MM-DD)
  prematura: boolean;
  semanasGestacaoNoNascimento?: number; // usado para calcular idade corrigida
}

export type IndicadorCrescimento =
  | "weight_for_age"
  | "length_height_for_age"
  | "head_circumference_for_age";

export interface PontoReferenciaLMS {
  idadeMeses: number;
  L: number;
  M: number;
  S: number;
  tipoMedicao?: "comprimento" | "altura"; // só relevante para length_height_for_age
}

export interface TabelaReferenciaOMS {
  indicador: IndicadorCrescimento;
  sexo: Sexo;
  unidade: "kg" | "cm";
  fonte: string;
  nota?: string;
  pontos: PontoReferenciaLMS[];
}

export interface MedicaoCrescimento {
  id: string;
  criancaId: string;
  data: string; // ISO date
  pesoKg?: number;
  comprimentoOuAlturaCm?: number;
  tipoMedicaoComprimento?: "comprimento" | "altura";
  perimetroCefalicoCm?: number;
}

export type AppSection =
  | "inicio"
  | "perfil"
  | "marcos"
  | "vacinas"
  | "consultas"
  | "crescimento"
  | "diario"
  | "puericultura"
  | "diversificacao"
  | "sintomas"
  | "calculadora"
  | "socorros"
  | "sbv"
  | "contactos"
  | "alertas"
  | "definicoes";

// --- Marcos de Desenvolvimento ---------------------------------------

export type DominioDesenvolvimento =
  | "socio_emocional"
  | "linguagem"
  | "cognitivo"
  | "motor";

export interface MarcoDesenvolvimento {
  id: string;
  idadeReferenciaMeses: number; // idade do checklist CDC/AAP a que este marco pertence (2,4,6,9,12,15,18,24…)
  dominio: DominioDesenvolvimento;
  descricao: string;
}

/**
 * Janela de percentil (P1–P99) para um marco motor grosso específico,
 * segundo o WHO Motor Development Study (Windows of Achievement, 2006).
 * Mais precisa do que o checklist CDC/AAP porque é uma verdadeira
 * distribuição de percentis, não um único ponto de corte etário.
 */
export interface JanelaMotoraOMS {
  id: string;
  nome: string;
  p1Meses: number;
  p99Meses: number;
  mediaMeses: number;
  desvioPadraoMeses: number;
}

export interface RegistoMarco {
  criancaId: string;
  marcoId: string;
  alcancadoEm?: string; // ISO date, opcional
}

// --- Diário Visual ------------------------------------------------------

export interface EntradaDiario {
  id: string;
  criancaId: string;
  data: string; // ISO date
  tipo: "foto" | "video";
  dataUrl: string; // base64 — protótipo local-first, sem backend
  legenda?: string;
  marcoId?: string; // ligação opcional a um marco do Módulo 3
}

// --- Puericultura --------------------------------------------------------

export type TemaPuericultura = "sono" | "alimentacao" | "seguranca" | "estimulacao" | "conforto" | "higiene" | "familia";

export interface ConselhoPuericultura {
  id: string;
  tema: TemaPuericultura;
  idadeMinMeses: number;
  idadeMaxMeses: number;
  titulo: string;
  texto: string;
  fonte: string;
}

// --- Sinais de Alerta ------------------------------------------------------

export interface SinalAlerta {
  id: string;
  dominio: DominioDesenvolvimento;
  idadeReferenciaMeses: number | "qualquer_idade";
  sinal: string;
}

// --- Primeiros Socorros -----------------------------------------------

export type CategoriaSocorro = "convulsoes" | "feridas" | "queimaduras" | "trauma-craniano" | "picadas" | "corpo-estranho" | "hemorragia-nasal" | "alergia";

export interface ConselhoSocorro {
  id: string;
  categoria: CategoriaSocorro;
  titulo: string;
  texto: string;
  fonte: string;
}

// --- Desengasgamento e SBV --------------------------------------------

export interface PassoSBV {
  id: string;
  numero: number;
  titulo: string;
  texto: string;
}

// --- Diversificação Alimentar --------------------------------------------

export interface EstagioAlimentar {
  id: string;
  idadeLabel: string;
  idadeMinMeses: number;
  idadeMaxMeses: number;
  textura: string;
  exemplos: string[];
  nota: string;
}

export interface PerigoEngasgamento {
  id: string;
  alimento: string;
  risco: string;
  comoTornarSeguro: string;
}

// --- Vacinas (PNV) ---------------------------------------------------

export interface DoseVacinaPNV {
  id: string;
  idadeLabel: string;
  idadeMesesAprox: number;
  vacina: string;
  doencasPrevenidas: string;
  doseLabel: string;
  notaEspecial?: string;
}

export interface VacinaAdministrada {
  id: string;
  criancaId: string;
  doseId: string;
  dataAdministracao: string;
}

// --- Contactos Úteis ----------------------------------------------------

export type CategoriaContacto = "emergencia" | "apoio-crianca" | "recursos";

export interface ContactoUtil {
  id: string;
  categoria: CategoriaContacto;
  nome: string;
  descricao: string;
  telefone?: string;
  telefoneExibicao?: string;
  site?: string;
  horario?: string;
}

// --- Consultas de Vigilância --------------------------------------------

export interface EtapaConsulta {
  id: string;
  idadeLabel: string;
  idadeMesesAprox: number;
}

export interface RegistoConsulta {
  id: string;
  criancaId: string;
  etapaId: string;
  data: string;
  dataUrl: string;
}

export interface DuvidaConsulta {
  id: string;
  criancaId: string;
  etapaId: string;
  texto: string;
  respondida: boolean;
}

// --- Preferências ---------------------------------------------------------

export type Unidades = "metrico" | "imperial";
export type Tema = "claro" | "escuro" | "sistema";

export interface Preferencias {
  unidades: Unidades;
  tema: Tema;
  notificacoesAtivas: boolean;
}
