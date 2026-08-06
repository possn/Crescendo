import type { JanelaMotoraOMS } from "../../types";
import "./MotorWindowBar.css";

interface MotorWindowBarProps {
  janela: JanelaMotoraOMS;
  idadeAtualMeses: number;
  escalaMaximaMeses?: number;
}

type Estado = "ainda_nao_esperado" | "dentro_da_janela" | "fora_da_janela";

export function MotorWindowBar({
  janela,
  idadeAtualMeses,
  escalaMaximaMeses = 20,
}: MotorWindowBarProps) {
  const estado: Estado =
    idadeAtualMeses < janela.p1Meses
      ? "ainda_nao_esperado"
      : idadeAtualMeses <= janela.p99Meses
      ? "dentro_da_janela"
      : "fora_da_janela";

  const pct = (meses: number) => (meses / escalaMaximaMeses) * 100;

  const mensagens: Record<Estado, string> = {
    ainda_nao_esperado: `Ainda dentro do esperado não ter alcançado — a janela normal só começa aos ${janela.p1Meses.toFixed(1)}m.`,
    dentro_da_janela: "Dentro da janela de referência da OMS para este marco.",
    fora_da_janela: `Fora da janela de referência (a OMS observou este marco até aos ${janela.p99Meses.toFixed(1)}m em 99% das crianças) — vale a pena falar com o pediatra.`,
  };

  return (
    <div className="motor-window">
      <div className="motor-window__header">
        <span className="motor-window__name">{janela.nome}</span>
        <span className={`motor-window__badge motor-window__badge--${estado}`}>
          {estado === "dentro_da_janela" && "Dentro da janela"}
          {estado === "ainda_nao_esperado" && "Ainda não esperado"}
          {estado === "fora_da_janela" && "Fora da janela"}
        </span>
      </div>

      <div className="motor-window__track">
        <div
          className="motor-window__range"
          style={{
            left: `${pct(janela.p1Meses)}%`,
            width: `${pct(janela.p99Meses - janela.p1Meses)}%`,
          }}
        />
        <div
          className="motor-window__median-tick"
          style={{ left: `${pct(janela.mediaMeses)}%` }}
          title={`Média: ${janela.mediaMeses}m`}
        />
        <div
          className={`motor-window__current motor-window__current--${estado}`}
          style={{ left: `${pct(Math.min(idadeAtualMeses, escalaMaximaMeses))}%` }}
          title={`Idade atual: ${idadeAtualMeses.toFixed(1)}m`}
        />
      </div>

      <div className="motor-window__scale">
        <span>P1: {janela.p1Meses}m</span>
        <span>P99: {janela.p99Meses}m</span>
      </div>

      <p className="motor-window__message">{mensagens[estado]}</p>
    </div>
  );
}
