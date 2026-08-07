import type { JanelaMotoraOMS } from "../../types";
import "./MotorWindowBar.css";

interface MotorWindowBarProps {
  janela: JanelaMotoraOMS;
  idadeAtualMeses: number;
}

type Estado = "ainda_nao_esperado" | "dentro_da_janela" | "fora_da_janela";

const LARGURA = 320;
const ALTURA = 90;
const MARGEM_BASE = 22;

function gaussianaPDF(x: number, media: number, sd: number): number {
  return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - media) / sd) ** 2);
}

export function MotorWindowBar({ janela, idadeAtualMeses }: MotorWindowBarProps) {
  const estado: Estado =
    idadeAtualMeses < janela.p1Meses
      ? "ainda_nao_esperado"
      : idadeAtualMeses <= janela.p99Meses
      ? "dentro_da_janela"
      : "fora_da_janela";

  const mensagens: Record<Estado, string> = {
    ainda_nao_esperado: `Típico à volta dos ${janela.mediaMeses.toFixed(1)}m — ainda dentro do esperado não ter alcançado.`,
    dentro_da_janela: `Dentro do intervalo normal (mediana: ${janela.mediaMeses.toFixed(1)}m).`,
    fora_da_janela: `Fora do intervalo observado em 99% das crianças (até ${janela.p99Meses.toFixed(1)}m) — vale a pena falar com o pediatra.`,
  };

  // Domínio do gráfico: media ± ~3.2 desvios-padrão, garantindo que P1 e
  // P99 (valores reais publicados, não recalculados) cabem confortavelmente.
  const dominioMin = Math.min(janela.p1Meses, janela.mediaMeses - 3.2 * janela.desvioPadraoMeses) - 0.4;
  const dominioMax = Math.max(janela.p99Meses, janela.mediaMeses + 3.2 * janela.desvioPadraoMeses) + 0.4;
  const larguraUtil = LARGURA - 8;
  const x = (meses: number) => 4 + ((meses - dominioMin) / (dominioMax - dominioMin)) * larguraUtil;

  const picoDensidade = gaussianaPDF(janela.mediaMeses, janela.mediaMeses, janela.desvioPadraoMeses);
  const alturaUtil = ALTURA - MARGEM_BASE - 6;
  const y = (meses: number) => {
    const densidade = gaussianaPDF(meses, janela.mediaMeses, janela.desvioPadraoMeses);
    return ALTURA - MARGEM_BASE - (densidade / picoDensidade) * alturaUtil;
  };

  const nPontos = 48;
  const pontos = Array.from({ length: nPontos + 1 }, (_, i) => {
    const meses = dominioMin + (i / nPontos) * (dominioMax - dominioMin);
    return { meses, cx: x(meses), cy: y(meses) };
  });

  const linhaCurva = pontos.map((p, i) => `${i === 0 ? "M" : "L"}${p.cx},${p.cy}`).join(" ");
  const areaCurva = `${linhaCurva} L${x(dominioMax)},${ALTURA - MARGEM_BASE} L${x(dominioMin)},${ALTURA - MARGEM_BASE} Z`;

  const idadeClampada = Math.min(Math.max(idadeAtualMeses, dominioMin), dominioMax);

  return (
    <div className="motor-window">
      <div className="motor-window__header">
        <span className="motor-window__name">{janela.nome}</span>
        <span className={`motor-window__badge motor-window__badge--${estado}`}>
          {estado === "dentro_da_janela" && "Dentro do esperado"}
          {estado === "ainda_nao_esperado" && "Ainda não esperado"}
          {estado === "fora_da_janela" && "Fora do intervalo"}
        </span>
      </div>

      <svg
        className="motor-window__curva"
        viewBox={`0 0 ${LARGURA} ${ALTURA}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Curva de distribuição para ${janela.nome}, mediana ${janela.mediaMeses} meses`}
      >
        {/* área sob a curva — a "maioria das crianças" */}
        <path d={areaCurva} className="motor-window__area" />
        {/* a curva em si */}
        <path d={linhaCurva} className="motor-window__linha" fill="none" />
        {/* linha de base */}
        <line
          x1={4}
          y1={ALTURA - MARGEM_BASE}
          x2={LARGURA - 4}
          y2={ALTURA - MARGEM_BASE}
          className="motor-window__base"
        />
        {/* mediana — destacada */}
        <line
          x1={x(janela.mediaMeses)}
          y1={ALTURA - MARGEM_BASE}
          x2={x(janela.mediaMeses)}
          y2={y(janela.mediaMeses)}
          className="motor-window__linha-mediana"
        />
        {/* idade atual da criança */}
        <line
          x1={x(idadeClampada)}
          y1={ALTURA - MARGEM_BASE + 6}
          x2={x(idadeClampada)}
          y2={4}
          className={`motor-window__linha-atual motor-window__linha-atual--${estado}`}
        />
        <circle
          cx={x(idadeClampada)}
          cy={4}
          r={4}
          className={`motor-window__ponto-atual motor-window__ponto-atual--${estado}`}
        />
      </svg>

      <div className="motor-window__legendas">
        <span className="motor-window__legenda-mediana">
          Idade típica: {janela.mediaMeses.toFixed(1)}m
        </span>
        <span className="motor-window__legenda-extremos">
          Extremos raros (1%): {janela.p1Meses.toFixed(1)}–{janela.p99Meses.toFixed(1)}m
        </span>
      </div>

      <p className="motor-window__message">{mensagens[estado]}</p>
    </div>
  );
}
