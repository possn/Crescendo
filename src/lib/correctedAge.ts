/**
 * Idade corrigida para prematuridade.
 *
 * Fórmula standard (AAP — "Age Terminology During the Perinatal Period",
 * Pediatrics, reafirmado; consistente com HealthyChildren.org/AAP e
 * literatura clínica sobre crescimento pré-termo):
 *
 *   idade corrigida = idade cronológica − (40 semanas − idade gestacional ao nascer)
 *
 * Aplica-se a bebés nascidos antes das 37 semanas de gestação, e a
 * prática corrente da AAP é usar a idade corrigida para marcos de
 * desenvolvimento e percentis de crescimento até aos **24 meses de idade
 * cronológica** — depois disso, deixa de se corrigir. (Casos de
 * prematuridade extrema ou complicações neonatais graves podem justificar
 * um período mais longo — decisão clínica do pediatra, fora do alcance
 * desta calculadora automática.)
 *
 * Nota importante: a idade corrigida NUNCA se usa para o calendário de
 * vacinação — as vacinas seguem sempre a idade cronológica.
 */

export interface ResultadoIdade {
  idadeCronologicaMeses: number;
  idadeCorrigidaMeses: number;
  aplicaCorrecao: boolean; // false se não for prematura, ou se já passou os 24 meses cronológicos
  semanasPrematuridade: number;
}

const MESES_POR_DIA = 1 / 30.4375;

export function calcularIdade(
  dataNascimento: string,
  dataReferenciaISO: string,
  prematura: boolean,
  semanasGestacaoNoNascimento?: number
): ResultadoIdade {
  const nascimento = new Date(dataNascimento).getTime();
  const referencia = new Date(dataReferenciaISO).getTime();
  const dias = (referencia - nascimento) / (1000 * 60 * 60 * 24);
  const idadeCronologicaMeses = dias * MESES_POR_DIA;

  if (!prematura || !semanasGestacaoNoNascimento || semanasGestacaoNoNascimento >= 37) {
    return {
      idadeCronologicaMeses,
      idadeCorrigidaMeses: idadeCronologicaMeses,
      aplicaCorrecao: false,
      semanasPrematuridade: 0,
    };
  }

  const semanasPrematuridade = 40 - semanasGestacaoNoNascimento;
  const aplicaCorrecao = idadeCronologicaMeses < 24;

  const idadeCorrigidaMeses = aplicaCorrecao
    ? idadeCronologicaMeses - semanasPrematuridade / 4.348
    : idadeCronologicaMeses;

  return {
    idadeCronologicaMeses,
    idadeCorrigidaMeses: Math.max(0, idadeCorrigidaMeses),
    aplicaCorrecao,
    semanasPrematuridade,
  };
}
