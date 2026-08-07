import { useMemo } from "react";
import type {
  AppSection,
  Crianca,
  EntradaDiario,
  MedicaoCrescimento,
  TabelaReferenciaOMS,
  Unidades,
  VacinaAdministrada,
} from "../../types";
import { calcularIdade } from "../../lib/correctedAge";
import { calcularZScoreEPercentil } from "../../lib/growthCalculations";
import { formatarPeso } from "../../lib/units";
import { MARCOS_CDC, IDADES_CHECKLIST_MESES } from "../../data/milestones/cdcMilestones";
import { DOSES_PNV } from "../../data/vacinas/pnv";
import "./DashboardScreen.css";

import wfaFemale from "../../data/who/weight_for_age_female.json";
import wfaMale from "../../data/who/weight_for_age_male.json";

const TABELAS_PESO: Record<"F" | "M", TabelaReferenciaOMS> = {
  F: wfaFemale as TabelaReferenciaOMS,
  M: wfaMale as TabelaReferenciaOMS,
};

interface DashboardScreenProps {
  crianca: Crianca;
  medicoes: MedicaoCrescimento[];
  marcosAlcancados: Set<string>;
  entradasDiario: EntradaDiario[];
  vacinasAdministradas: VacinaAdministrada[];
  unidades: Unidades;
  onNavegar: (seccao: AppSection) => void;
}

function formatarIdade(meses: number): string {
  if (meses < 1) return `${Math.max(0, Math.round(meses * 30.4375))} dias`;
  if (meses < 24) return `${Math.floor(meses)} ${Math.floor(meses) === 1 ? "mês" : "meses"}`;
  const anos = Math.floor(meses / 12);
  const restoMeses = Math.floor(meses % 12);
  return `${anos} ${anos === 1 ? "ano" : "anos"}${restoMeses > 0 ? ` e ${restoMeses} ${restoMeses === 1 ? "mês" : "meses"}` : ""}`;
}

function idadeChecklistMaisProxima(idadeMeses: number): number {
  return IDADES_CHECKLIST_MESES.reduce((maisProxima, atual) =>
    Math.abs(atual - idadeMeses) < Math.abs(maisProxima - idadeMeses) ? atual : maisProxima
  );
}

export function DashboardScreen({
  crianca,
  medicoes,
  marcosAlcancados,
  entradasDiario,
  vacinasAdministradas,
  unidades,
  onNavegar,
}: DashboardScreenProps) {
  const resultadoIdade = calcularIdade(
    crianca.dataNascimento,
    new Date().toISOString(),
    crianca.prematura,
    crianca.semanasGestacaoNoNascimento
  );
  const idadeMeses = resultadoIdade.idadeCorrigidaMeses;

  const ultimaMedicaoPeso = useMemo(
    () =>
      [...medicoes]
        .filter((m) => m.pesoKg !== undefined)
        .sort((a, b) => b.data.localeCompare(a.data))[0],
    [medicoes]
  );

  const leituraPeso = useMemo(() => {
    if (!ultimaMedicaoPeso?.pesoKg) return null;
    const idadeNaMedicao = calcularIdade(
      crianca.dataNascimento,
      ultimaMedicaoPeso.data,
      crianca.prematura,
      crianca.semanasGestacaoNoNascimento
    ).idadeCorrigidaMeses;
    return calcularZScoreEPercentil(
      ultimaMedicaoPeso.pesoKg,
      TABELAS_PESO[crianca.sexo],
      idadeNaMedicao
    );
  }, [ultimaMedicaoPeso, crianca]);

  const idadeChecklist = idadeChecklistMaisProxima(idadeMeses);
  const marcosDaEtapa = useMemo(
    () => MARCOS_CDC.filter((m) => m.idadeReferenciaMeses === idadeChecklist),
    [idadeChecklist]
  );
  const marcosFeitos = marcosDaEtapa.filter((m) => marcosAlcancados.has(m.id)).length;

  const entradasRecentes = useMemo(
    () => [...entradasDiario].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 4),
    [entradasDiario]
  );

  const dosesDevidas = useMemo(
    () => DOSES_PNV.filter((d) => d.idadeMesesAprox <= idadeMeses),
    [idadeMeses]
  );
  const idsRegistados = useMemo(
    () => new Set(vacinasAdministradas.map((v) => v.doseId)),
    [vacinasAdministradas]
  );
  const dosesEmDia = dosesDevidas.filter((d) => idsRegistados.has(d.id)).length;
  const dosesPendentes = dosesDevidas.length - dosesEmDia;

  return (
    <div className="dashboard-screen">
      <header className="dashboard-screen__header">
        <h1>Olá! 👋</h1>
        <p className="dashboard-screen__subtitle">
          {crianca.nome} tem {formatarIdade(idadeMeses)}
          {resultadoIdade.aplicaCorrecao ? " (idade corrigida)" : ""}.
        </p>
      </header>

      <div className="dashboard-screen__grid">
        <button className="dashboard-screen__card" onClick={() => onNavegar("crescimento")}>
          <span className="dashboard-screen__card-tag">Curvas de Crescimento</span>
          {leituraPeso && ultimaMedicaoPeso ? (
            <>
              <span className="dashboard-screen__card-value">
                Percentil {Math.round(leituraPeso.percentil)}
              </span>
              <span className="dashboard-screen__card-detail">
                Peso: {formatarPeso(ultimaMedicaoPeso.pesoKg!, unidades)} em{" "}
                {new Date(ultimaMedicaoPeso.data).toLocaleDateString("pt-PT")}
              </span>
            </>
          ) : (
            <span className="dashboard-screen__card-empty">
              Ainda sem medições — toque para adicionar a primeira.
            </span>
          )}
        </button>

        <button className="dashboard-screen__card" onClick={() => onNavegar("marcos")}>
          <span className="dashboard-screen__card-tag">Marcos de Desenvolvimento</span>
          <span className="dashboard-screen__card-value">
            {marcosFeitos} de {marcosDaEtapa.length}
          </span>
          <span className="dashboard-screen__card-detail">
            marcados na etapa dos {idadeChecklist} meses
          </span>
        </button>

        <button
          className={
            "dashboard-screen__card" + (dosesPendentes > 0 ? " dashboard-screen__card--aviso" : "")
          }
          onClick={() => onNavegar("vacinas")}
        >
          <span className="dashboard-screen__card-tag">Vacinas — PNV</span>
          <span className="dashboard-screen__card-value">
            {dosesEmDia} de {dosesDevidas.length}
          </span>
          <span className="dashboard-screen__card-detail">
            {dosesPendentes > 0
              ? `${dosesPendentes} dose${dosesPendentes > 1 ? "s" : ""} em atraso pela idade atual`
              : "em dia com o calendário"}
          </span>
        </button>

        <button className="dashboard-screen__card" onClick={() => onNavegar("diario")}>
          <span className="dashboard-screen__card-tag">Diário Visual</span>
          {entradasRecentes.length > 0 ? (
            <div className="dashboard-screen__thumbs">
              {entradasRecentes.map((e) => (
                <div key={e.id} className="dashboard-screen__thumb">
                  {e.tipo === "foto" ? (
                    <img src={e.dataUrl} alt="" />
                  ) : (
                    <video src={e.dataUrl} muted />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <span className="dashboard-screen__card-empty">
              Ainda sem fotos — toque para adicionar a primeira.
            </span>
          )}
        </button>

        <button className="dashboard-screen__card" onClick={() => onNavegar("alertas")}>
          <span className="dashboard-screen__card-tag">Sinais de Alerta</span>
          <span className="dashboard-screen__card-detail">
            Ver os sinais relevantes para a etapa atual de {crianca.nome}
          </span>
        </button>
      </div>

      <p className="dashboard-screen__disclaimer">
        Este resumo é um atalho, não uma avaliação — para uma leitura completa, veja cada secção
        no menu lateral.
      </p>
    </div>
  );
}
