import { useMemo } from "react";
import type { TabelaReferenciaOMS, MedicaoCrescimento } from "../../types";
import { gerarCurvaPercentil, Z_BANDAS_REFERENCIA } from "../../lib/growthCalculations";
import "./GrowthChart.css";

interface GrowthChartProps {
  tabela: TabelaReferenciaOMS;
  medicoes: MedicaoCrescimento[];
  extrairValor: (m: MedicaoCrescimento) => number | undefined;
  dataNascimento: string;
  tipoMedicaoPreferido?: "comprimento" | "altura";
  corIndicador: string;
  idadeMaximaMeses?: number; // por defeito, 24 — os primeiros 2 anos são o foco do MVP
}

const LARGURA = 720;
const ALTURA = 360;
const MARGEM = { top: 20, right: 24, bottom: 36, left: 52 };

export function GrowthChart({
  tabela,
  medicoes,
  extrairValor,
  dataNascimento,
  tipoMedicaoPreferido,
  corIndicador,
  idadeMaximaMeses = 24,
}: GrowthChartProps) {
  const bandas = useMemo(
    () =>
      Z_BANDAS_REFERENCIA.map((b) => ({
        ...b,
        pontos: gerarCurvaPercentil(tabela, b.z, tipoMedicaoPreferido).filter(
          (p) => p.idadeMeses <= idadeMaximaMeses
        ),
      })),
    [tabela, tipoMedicaoPreferido, idadeMaximaMeses]
  );

  const todosValores = bandas.flatMap((b) => b.pontos.map((p) => p.valor));
  const valorMin = Math.min(...todosValores);
  const valorMax = Math.max(...todosValores);
  const pad = (valorMax - valorMin) * 0.08;

  const larguraUtil = LARGURA - MARGEM.left - MARGEM.right;
  const alturaUtil = ALTURA - MARGEM.top - MARGEM.bottom;

  const x = (idadeMeses: number) =>
    MARGEM.left + (idadeMeses / idadeMaximaMeses) * larguraUtil;
  const y = (valor: number) =>
    MARGEM.top +
    alturaUtil -
    ((valor - (valorMin - pad)) / (valorMax - valorMin + 2 * pad)) * alturaUtil;

  // Proteção: um valor extremo (erro de digitação, ex. 128 em vez de 8.20)
  // não deve fazer o ponto "explodir" para fora da caixa do gráfico, já que
  // o SVG usa overflow:visible de propósito para os rótulos P3-P97 não
  // ficarem cortados. Sem isto, um único valor mau desenha uma linha reta
  // até muito acima/abaixo da página inteira.
  const yClampado = (valor: number) => {
    const yBruto = y(valor);
    const folga = alturaUtil * 0.15;
    return Math.min(Math.max(yBruto, MARGEM.top - folga), ALTURA - MARGEM.bottom + folga);
  };

  const linhaSVG = (pontos: { idadeMeses: number; valor: number }[]) =>
    pontos.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.idadeMeses)},${y(p.valor)}`).join(" ");

  // Área entre P3 e P97 (mais opaca perto de P50 — efeito "topográfico")
  const areaEntre = (
    inferior: { idadeMeses: number; valor: number }[],
    superior: { idadeMeses: number; valor: number }[]
  ) => {
    const topo = superior.map((p) => `${x(p.idadeMeses)},${y(p.valor)}`).join(" L");
    const baseInversa = [...inferior]
      .reverse()
      .map((p) => `${x(p.idadeMeses)},${y(p.valor)}`)
      .join(" L");
    return `M${topo} L${baseInversa} Z`;
  };

  const pontosCrianca = medicoes
    .map((m) => ({ data: m.data, valor: extrairValor(m) }))
    .filter((m): m is { data: string; valor: number } => m.valor !== undefined);

  const idadeMesesDeData = (dataISO: string) => {
    const d = new Date(dataISO).getTime();
    const n = new Date(dataNascimento).getTime();
    return (d - n) / (1000 * 60 * 60 * 24 * 30.4375);
  };

  const marcosIdade = Array.from(
    { length: Math.floor(idadeMaximaMeses / 3) + 1 },
    (_, i) => i * 3
  ).filter((m) => m <= idadeMaximaMeses);

  return (
    <svg
      className="growth-chart"
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      role="img"
      aria-label="Gráfico de curva de crescimento com bandas de percentil da OMS"
    >
      {/* Bandas topográficas P3–P97, mais escuras perto da mediana */}
      <path d={areaEntre(bandas[0].pontos, bandas[4].pontos)} className="growth-chart__band growth-chart__band--outer" />
      <path d={areaEntre(bandas[1].pontos, bandas[3].pontos)} className="growth-chart__band growth-chart__band--inner" />

      {/* Eixo X */}
      {marcosIdade.map((m) => (
        <g key={m}>
          <line
            x1={x(m)}
            x2={x(m)}
            y1={MARGEM.top}
            y2={ALTURA - MARGEM.bottom}
            className="growth-chart__gridline"
          />
          <text x={x(m)} y={ALTURA - MARGEM.bottom + 18} className="growth-chart__axis-label" textAnchor="middle">
            {m}m
          </text>
        </g>
      ))}

      {/* Linha da mediana (P50) — referência central */}
      <path d={linhaSVG(bandas[2].pontos)} className="growth-chart__median-line" />

      {/* Labels de percentil no extremo direito */}
      {bandas.map((b) => {
        const ultimo = b.pontos[b.pontos.length - 1];
        if (!ultimo) return null;
        return (
          <text
            key={b.label}
            x={x(ultimo.idadeMeses) + 6}
            y={y(ultimo.valor) + 3}
            className="growth-chart__band-label"
          >
            {b.label}
          </text>
        );
      })}

      {/* Pontos e linha da criança */}
      {pontosCrianca.length > 0 && (
        <>
          <path
            d={pontosCrianca
              .map((p, i) => {
                const idade = idadeMesesDeData(p.data);
                return `${i === 0 ? "M" : "L"}${x(idade)},${yClampado(p.valor)}`;
              })
              .join(" ")}
            className="growth-chart__child-line"
            style={{ stroke: corIndicador }}
            fill="none"
          />
          {pontosCrianca.map((p) => {
            const idade = idadeMesesDeData(p.data);
            return (
              <circle
                key={p.data}
                cx={x(idade)}
                cy={yClampado(p.valor)}
                r={4}
                className="growth-chart__child-point"
                style={{ fill: corIndicador }}
              />
            );
          })}
        </>
      )}
    </svg>
  );
}
