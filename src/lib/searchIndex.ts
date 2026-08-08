/**
 * Índice de pesquisa global — junta todo o conteúdo pesquisável da app
 * num único array. Construído a partir dos dados já existentes em cada
 * módulo (não duplica conteúdo, só o referencia).
 */

import type { AppSection } from "../types";
import { CONSELHOS, TEMAS as TEMAS_PUERICULTURA } from "../data/puericultura/conselhos";
import { CONSELHOS_SINTOMAS, CATEGORIAS as CATEGORIAS_SINTOMAS } from "../data/sintomas/sintomasComuns";
import { CONSELHOS_SOCORRO, CATEGORIAS_SOCORRO } from "../data/primeiros-socorros/primeirosSocorros";
import { SINAIS_ALERTA } from "../data/alertas/sinaisAlerta";
import { MARCOS_CDC } from "../data/milestones/cdcMilestones";
import { JANELAS_MOTORAS_OMS } from "../data/milestones/whoMotorWindows";
import { ESTAGIOS, PERIGOS_ENGASGAMENTO } from "../data/diversificacao/diversificacao";
import { DOSES_PNV } from "../data/vacinas/pnv";
import { CONTACTOS } from "../data/contactos/contactos";

export interface ResultadoPesquisa {
  id: string;
  titulo: string;
  resumo: string;
  seccao: AppSection;
  seccaoLabel: string;
  categoriaLabel: string;
  cor: string;
}

const DOMINIO_LABEL: Record<string, string> = {
  socio_emocional: "Socio-emocional",
  linguagem: "Linguagem",
  cognitivo: "Cognitivo",
  motor: "Motor",
};

function construirIndice(): ResultadoPesquisa[] {
  const indice: ResultadoPesquisa[] = [];

  for (const c of CONSELHOS) {
    const tema = TEMAS_PUERICULTURA.find((t) => t.id === c.tema);
    indice.push({
      id: `puericultura-${c.id}`,
      titulo: c.titulo,
      resumo: c.texto,
      seccao: "puericultura",
      seccaoLabel: "Puericultura",
      categoriaLabel: tema?.label ?? "",
      cor: tema?.cor ?? "var(--accent-strong)",
    });
  }

  for (const c of CONSELHOS_SINTOMAS) {
    const cat = CATEGORIAS_SINTOMAS.find((t) => t.id === c.categoria);
    indice.push({
      id: `sintomas-${c.id}`,
      titulo: c.titulo,
      resumo: c.texto,
      seccao: "sintomas",
      seccaoLabel: "Sintomas Comuns",
      categoriaLabel: cat?.label ?? "",
      cor: cat?.cor ?? "var(--accent-strong)",
    });
  }

  for (const c of CONSELHOS_SOCORRO) {
    const cat = CATEGORIAS_SOCORRO.find((t) => t.id === c.categoria);
    indice.push({
      id: `socorros-${c.id}`,
      titulo: c.titulo,
      resumo: c.texto,
      seccao: "socorros",
      seccaoLabel: "Primeiros Socorros",
      categoriaLabel: cat?.label ?? "",
      cor: cat?.cor ?? "var(--accent-strong)",
    });
  }

  for (const s of SINAIS_ALERTA) {
    indice.push({
      id: `alertas-${s.id}`,
      titulo: s.sinal,
      resumo:
        typeof s.idadeReferenciaMeses === "number"
          ? `Sinal de alerta aos ${s.idadeReferenciaMeses} meses`
          : "Sinal de alerta",
      seccao: "alertas",
      seccaoLabel: "Sinais de Alerta",
      categoriaLabel: DOMINIO_LABEL[s.dominio] ?? "",
      cor: "var(--warn-strong)",
    });
  }

  for (const m of MARCOS_CDC) {
    indice.push({
      id: `marcos-${m.id}`,
      titulo: m.descricao,
      resumo: `Marco de desenvolvimento aos ${m.idadeReferenciaMeses} meses`,
      seccao: "marcos",
      seccaoLabel: "Marcos de Desenvolvimento",
      categoriaLabel: DOMINIO_LABEL[m.dominio] ?? "",
      cor: "var(--accent-strong)",
    });
  }

  for (const j of JANELAS_MOTORAS_OMS) {
    indice.push({
      id: `marcos-motor-${j.id}`,
      titulo: j.nome,
      resumo: `Janela motora OMS: ${j.p1Meses}-${j.p99Meses} meses`,
      seccao: "marcos",
      seccaoLabel: "Marcos de Desenvolvimento",
      categoriaLabel: "Motor",
      cor: "var(--accent-strong)",
    });
  }

  for (const e of ESTAGIOS) {
    indice.push({
      id: `diversificacao-${e.id}`,
      titulo: `${e.idadeLabel} — ${e.textura}`,
      resumo: e.exemplos.join(", "),
      seccao: "diversificacao",
      seccaoLabel: "Diversificação Alimentar",
      categoriaLabel: "Estágio",
      cor: "var(--accent-strong)",
    });
  }

  for (const p of PERIGOS_ENGASGAMENTO) {
    indice.push({
      id: `diversificacao-perigo-${p.id}`,
      titulo: p.alimento,
      resumo: p.comoTornarSeguro,
      seccao: "diversificacao",
      seccaoLabel: "Diversificação Alimentar",
      categoriaLabel: "Perigo de engasgamento",
      cor: "var(--warn-strong)",
    });
  }

  for (const d of DOSES_PNV) {
    indice.push({
      id: `vacinas-${d.id}`,
      titulo: `${d.vacina} — ${d.doseLabel}`,
      resumo: `${d.idadeLabel}: previne ${d.doencasPrevenidas}`,
      seccao: "vacinas",
      seccaoLabel: "Vacinas — PNV",
      categoriaLabel: d.idadeLabel,
      cor: "var(--accent-strong)",
    });
  }

  for (const c of CONTACTOS) {
    indice.push({
      id: `contactos-${c.id}`,
      titulo: c.nome,
      resumo: c.descricao,
      seccao: "contactos",
      seccaoLabel: "Contactos Úteis",
      categoriaLabel: c.telefoneExibicao ?? "",
      cor: "var(--accent-strong)",
    });
  }

  // Atalhos diretos para secções sem conteúdo indexável item a item
  indice.push(
    {
      id: "atalho-calculadora",
      titulo: "Calculadora de Dose",
      resumo: "Paracetamol e ibuprofeno por peso",
      seccao: "calculadora",
      seccaoLabel: "Calculadora de Dose",
      categoriaLabel: "Atalho",
      cor: "var(--accent-strong)",
    },
    {
      id: "atalho-sbv",
      titulo: "Desengasgamento e Suporte Básico de Vida",
      resumo: "Fluxograma de engasgamento e SBV pediátrico",
      seccao: "sbv",
      seccaoLabel: "Desengasgamento e SBV",
      categoriaLabel: "Atalho",
      cor: "var(--warn-strong)",
    },
    {
      id: "atalho-consultas",
      titulo: "Consultas de Vigilância",
      resumo: "Registo de consultas e dúvidas para o pediatra, por idade-chave (PNSIJ)",
      seccao: "consultas",
      seccaoLabel: "Consultas de Vigilância",
      categoriaLabel: "Atalho",
      cor: "var(--accent-strong)",
    }
  );

  return indice;
}

export const INDICE_PESQUISA: ResultadoPesquisa[] = construirIndice();

/** Remove acentos para uma comparação mais tolerante ("bebe" encontra "bebé"). */
function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function pesquisar(termo: string, limite = 20): ResultadoPesquisa[] {
  const termoNormalizado = normalizar(termo.trim());
  if (termoNormalizado.length < 2) return [];

  return INDICE_PESQUISA.filter((item) => {
    const alvo = normalizar(`${item.titulo} ${item.resumo} ${item.categoriaLabel}`);
    return alvo.includes(termoNormalizado);
  }).slice(0, limite);
}
