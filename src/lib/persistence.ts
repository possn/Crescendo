/**
 * Persistência local — e só local.
 *
 * Tudo o que a app guarda (perfis de crianças, medições de crescimento,
 * marcos alcançados, fotos e vídeos do diário) fica no IndexedDB do
 * próprio dispositivo, através da biblioteca `idb-keyval` (usa a mesma
 * IndexedDB API nativa do browser — não há SDK de nenhum serviço externo
 * aqui, não há chamada de rede nenhuma neste ficheiro).
 *
 * Porquê IndexedDB e não localStorage: o Diário Visual guarda fotos e
 * vídeos como base64, que facilmente ultrapassam os ~5-10MB de quota do
 * localStorage. O IndexedDB não tem esse limite prático.
 *
 * Nada daqui nunca é enviado para fora do dispositivo. Se a app vier a
 * ganhar sincronização multi-dispositivo no futuro, isso tem de ser uma
 * decisão explícita e visível para o utilizador — nunca um efeito
 * colateral silencioso desta camada.
 */

import { get, set, del, keys } from "idb-keyval";
import type { Crianca, MedicaoCrescimento, EntradaDiario, Preferencias, VacinaAdministrada } from "../types";

const CHAVE_CRIANCAS = "crescendo:criancas";
const CHAVE_MEDICOES = "crescendo:medicoes";
const CHAVE_MARCOS_ALCANCADOS = "crescendo:marcos-alcancados"; // array de "criancaId::marcoId"
const CHAVE_DIARIO = "crescendo:diario";
const CHAVE_PREFERENCIAS = "crescendo:preferencias";
const CHAVE_VACINAS = "crescendo:vacinas-administradas";

export const PREFERENCIAS_OMISSAO: Preferencias = {
  unidades: "metrico",
  tema: "sistema",
  notificacoesAtivas: false,
};

export async function carregarCriancas(): Promise<Crianca[] | undefined> {
  return get(CHAVE_CRIANCAS);
}
export async function guardarCriancas(v: Crianca[]): Promise<void> {
  await set(CHAVE_CRIANCAS, v);
}

export async function carregarMedicoes(): Promise<MedicaoCrescimento[] | undefined> {
  return get(CHAVE_MEDICOES);
}
export async function guardarMedicoes(v: MedicaoCrescimento[]): Promise<void> {
  await set(CHAVE_MEDICOES, v);
}

export async function carregarMarcosAlcancados(): Promise<Set<string>> {
  const arr = await get<string[]>(CHAVE_MARCOS_ALCANCADOS);
  return new Set(arr ?? []);
}
export async function guardarMarcosAlcancados(v: Set<string>): Promise<void> {
  await set(CHAVE_MARCOS_ALCANCADOS, Array.from(v));
}

export async function carregarDiario(): Promise<EntradaDiario[] | undefined> {
  return get(CHAVE_DIARIO);
}
export async function guardarDiario(v: EntradaDiario[]): Promise<void> {
  await set(CHAVE_DIARIO, v);
}

export async function carregarVacinas(): Promise<VacinaAdministrada[] | undefined> {
  return get(CHAVE_VACINAS);
}
export async function guardarVacinas(v: VacinaAdministrada[]): Promise<void> {
  await set(CHAVE_VACINAS, v);
}

export async function carregarPreferencias(): Promise<Preferencias> {
  const p = await get<Partial<Preferencias>>(CHAVE_PREFERENCIAS);
  return { ...PREFERENCIAS_OMISSAO, ...p };
}
export async function guardarPreferencias(v: Preferencias): Promise<void> {
  await set(CHAVE_PREFERENCIAS, v);
}

/** Exporta tudo num único objeto — usado pelo botão "Exportar os meus dados". */
export async function exportarTudo() {
  const [criancas, medicoes, marcosAlcancados, diario, preferencias, vacinas] = await Promise.all([
    carregarCriancas(),
    carregarMedicoes(),
    carregarMarcosAlcancados(),
    carregarDiario(),
    carregarPreferencias(),
    carregarVacinas(),
  ]);
  return {
    exportadoEm: new Date().toISOString(),
    criancas: criancas ?? [],
    medicoesCrescimento: medicoes ?? [],
    marcosAlcancados: Array.from(marcosAlcancados),
    diarioVisual: diario ?? [],
    preferencias,
    vacinasAdministradas: vacinas ?? [],
  };
}

/** Apaga tudo — usado pelo botão "Apagar todos os dados". Irreversível. */
export async function apagarTudo(): Promise<void> {
  const todasAsChaves = await keys();
  await Promise.all(
    todasAsChaves
      .filter((k) => typeof k === "string" && k.startsWith("crescendo:"))
      .map((k) => del(k))
  );
}
