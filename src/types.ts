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
  | "crescimento"
  | "diario"
  | "puericultura"
  | "alertas"
  | "definicoes";
