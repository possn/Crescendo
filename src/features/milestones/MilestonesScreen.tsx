import { useMemo, useState } from "react";
import type { Crianca, DominioDesenvolvimento } from "../../types";
import { MARCOS_CDC, IDADES_CHECKLIST_MESES } from "../../data/milestones/cdcMilestones";
import { JANELAS_MOTORAS_OMS, NOTA_SEQUENCIA_OMS } from "../../data/milestones/whoMotorWindows";
import { calcularIdade } from "../../lib/correctedAge";
import { MotorWindowBar } from "./MotorWindowBar";
import "./MilestonesScreen.css";

interface MilestonesScreenProps {
  crianca: Crianca;
  marcosAlcancados: Set<string>;
  onAlternarMarco: (marcoId: string) => void;
}

const DOMINIOS: { id: DominioDesenvolvimento; label: string; cor: string }[] = [
  { id: "socio_emocional", label: "Socio-emocional", cor: "#c99a3a" },
  { id: "linguagem", label: "Linguagem / Comunicação", cor: "#8a6d3b" },
  { id: "cognitivo", label: "Cognitivo", cor: "#6b5b95" },
  { id: "motor", label: "Motor", cor: "#5c6e54" },
];

function idadeChecklistMaisProxima(idadeMeses: number): number {
  return IDADES_CHECKLIST_MESES.reduce((maisProxima, atual) =>
    Math.abs(atual - idadeMeses) < Math.abs(maisProxima - idadeMeses) ? atual : maisProxima
  );
}

export function MilestonesScreen({ crianca, marcosAlcancados, onAlternarMarco }: MilestonesScreenProps) {
  const resultadoIdade = calcularIdade(
    crianca.dataNascimento,
    new Date().toISOString(),
    crianca.prematura,
    crianca.semanasGestacaoNoNascimento
  );
  const idadeAtual = resultadoIdade.idadeCorrigidaMeses;
  const [idadeChecklist, setIdadeChecklist] = useState(idadeChecklistMaisProxima(idadeAtual));
  const [mostrarTodosMotores, setMostrarTodosMotores] = useState(false);

  const marcosDoChecklist = useMemo(
    () => MARCOS_CDC.filter((m) => m.idadeReferenciaMeses === idadeChecklist),
    [idadeChecklist]
  );

  // Só mostra janelas motoras cuja idade de início (P1) já está próxima ou
  // passada — evita mostrar uma barra quase vazia para um marco a meses de
  // distância, o que lia mal e não ajudava em nada.
  const janelasRelevantes = useMemo(
    () =>
      mostrarTodosMotores
        ? JANELAS_MOTORAS_OMS
        : JANELAS_MOTORAS_OMS.filter((j) => idadeAtual >= j.p1Meses - 2),
    [idadeAtual, mostrarTodosMotores]
  );

  return (
    <div className="milestones-screen">
      <header className="milestones-screen__header">
        <h1>Marcos de Desenvolvimento</h1>
        <p className="milestones-screen__subtitle">
          {crianca.nome} tem cerca de {idadeAtual.toFixed(1)} meses
          {resultadoIdade.aplicaCorrecao ? " (idade corrigida para prematuridade)" : ""}. Os
          marcos abaixo mostram o que <strong>75% ou mais</strong> das crianças fazem até uma
          certa idade (CDC/AAP, 2022) — não uma média nem um prazo rígido. Faltar um marco
          isolado não é, por si só, motivo de alarme.
        </p>
      </header>

      <div className="milestones-screen__age-picker" role="tablist" aria-label="Escolher checklist por idade">
        {IDADES_CHECKLIST_MESES.map((idade) => (
          <button
            key={idade}
            role="tab"
            aria-selected={idadeChecklist === idade}
            className={
              "milestones-screen__age-tab" +
              (idadeChecklist === idade ? " milestones-screen__age-tab--ativo" : "") +
              (idade === idadeChecklistMaisProxima(idadeAtual) ? " milestones-screen__age-tab--sugerido" : "")
            }
            onClick={() => setIdadeChecklist(idade)}
          >
            {idade}m
          </button>
        ))}
      </div>

      <div className="milestones-screen__grid">
        {DOMINIOS.map((dominio) => {
          const marcos = marcosDoChecklist.filter((m) => m.dominio === dominio.id);
          if (marcos.length === 0) return null;
          return (
            <section key={dominio.id} className="milestones-screen__domain-card">
              <h2 style={{ color: dominio.cor }}>{dominio.label}</h2>
              <ul className="milestones-screen__list">
                {marcos.map((marco) => {
                  const alcancado = marcosAlcancados.has(marco.id);
                  return (
                    <li key={marco.id}>
                      <label className="milestones-screen__item">
                        <input
                          type="checkbox"
                          checked={alcancado}
                          onChange={() => onAlternarMarco(marco.id)}
                        />
                        <span>{marco.descricao}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="milestones-screen__who-section">
        <h2>Marcos motores — janelas de percentil da OMS</h2>
        <p className="milestones-screen__who-intro">
          Estes 6 marcos vêm de um estudo diferente (WHO Motor Development Study, 2006), com uma
          janela real de percentil P1–P99 por marco. A curva mostra a distribuição — a maioria das
          crianças agrupa-se à volta da mediana (linha tracejada), os extremos são raros.
        </p>

        {janelasRelevantes.length > 0 ? (
          janelasRelevantes.map((janela) => (
            <MotorWindowBar key={janela.id} janela={janela} idadeAtualMeses={idadeAtual} />
          ))
        ) : (
          <p className="milestones-screen__who-vazio">
            Ainda é cedo para qualquer um destes marcos — a primeira janela relevante começa por
            volta dos {(JANELAS_MOTORAS_OMS[0].p1Meses - 2).toFixed(1)} meses.
          </p>
        )}

        <label className="milestones-screen__who-toggle">
          <input
            type="checkbox"
            checked={mostrarTodosMotores}
            onChange={(e) => setMostrarTodosMotores(e.target.checked)}
          />
          <span>Mostrar todos os 6 marcos, incluindo os ainda muito distantes</span>
        </label>

        <p className="milestones-screen__who-note">{NOTA_SEQUENCIA_OMS}</p>
      </section>

      <p className="milestones-screen__disclaimer">
        Esta lista é uma ferramenta de vigilância parental, não um instrumento de diagnóstico nem
        um rastreio validado. Se tiver dúvidas sobre o desenvolvimento do seu filho, fale com o
        pediatra — não espere pela próxima consulta se algo o preocupar.
      </p>
    </div>
  );
}
