import { useMemo, useState } from "react";
import type { Crianca, MedicaoCrescimento, TabelaReferenciaOMS } from "../../types";
import { calcularZScoreEPercentil } from "../../lib/growthCalculations";
import { GrowthChart } from "./GrowthChart";
import "./GrowthCurvesScreen.css";

import wfaFemale from "../../data/who/weight_for_age_female.json";
import wfaMale from "../../data/who/weight_for_age_male.json";
import lhfaFemale from "../../data/who/length_height_for_age_female.json";
import lhfaMale from "../../data/who/length_height_for_age_male.json";
import hcfaFemale from "../../data/who/head_circumference_for_age_female.json";
import hcfaMale from "../../data/who/head_circumference_for_age_male.json";

const TABELAS = {
  F: {
    weight_for_age: wfaFemale as TabelaReferenciaOMS,
    length_height_for_age: lhfaFemale as TabelaReferenciaOMS,
    head_circumference_for_age: hcfaFemale as TabelaReferenciaOMS,
  },
  M: {
    weight_for_age: wfaMale as TabelaReferenciaOMS,
    length_height_for_age: lhfaMale as TabelaReferenciaOMS,
    head_circumference_for_age: hcfaMale as TabelaReferenciaOMS,
  },
};

function idadeEmMeses(dataNascimento: string, dataReferencia: string): number {
  const n = new Date(dataNascimento).getTime();
  const d = new Date(dataReferencia).getTime();
  return (d - n) / (1000 * 60 * 60 * 24 * 30.4375);
}

/**
 * Data de nascimento "efetiva" para efeitos de posicionamento nas curvas:
 * se a criança é prematura e ainda está dentro da janela de correção
 * (<24 meses cronológicos), desloca-se a data de nascimento pelo número
 * de semanas de prematuridade — assim todo o resto do módulo (gráfico,
 * leitura de percentil) usa automaticamente a idade corrigida sem
 * duplicar lógica.
 */
function dataNascimentoEfetiva(crianca: Crianca): string {
  if (!crianca.prematura || !crianca.semanasGestacaoNoNascimento) return crianca.dataNascimento;
  const idadeCronologicaMeses = idadeEmMeses(crianca.dataNascimento, new Date().toISOString());
  if (idadeCronologicaMeses >= 24) return crianca.dataNascimento;
  const semanasPrematuridade = 40 - crianca.semanasGestacaoNoNascimento;
  if (semanasPrematuridade <= 0) return crianca.dataNascimento;
  const d = new Date(crianca.dataNascimento);
  d.setDate(d.getDate() + semanasPrematuridade * 7);
  return d.toISOString().slice(0, 10);
}

interface GrowthCurvesScreenProps {
  crianca: Crianca;
  medicoes: MedicaoCrescimento[];
  onAdicionarMedicao: (m: MedicaoCrescimento) => void;
}

type Indicador = "weight_for_age" | "length_height_for_age" | "head_circumference_for_age";

const ABAS: { id: Indicador; label: string; cor: string; unidade: string }[] = [
  { id: "weight_for_age", label: "Peso", cor: "var(--ind-peso)", unidade: "kg" },
  { id: "length_height_for_age", label: "Comprimento / Altura", cor: "var(--ind-comprimento)", unidade: "cm" },
  { id: "head_circumference_for_age", label: "Perímetro cefálico", cor: "var(--ind-perimetro)", unidade: "cm" },
];

export function GrowthCurvesScreen({ crianca, medicoes, onAdicionarMedicao }: GrowthCurvesScreenProps) {
  const [abaAtiva, setAbaAtiva] = useState<Indicador>("weight_for_age");
  const nascimentoEfetivo = dataNascimentoEfetiva(crianca);

  const [formData, setFormData] = useState(new Date().toISOString().slice(0, 10));
  const [formPeso, setFormPeso] = useState("");
  const [formComprimento, setFormComprimento] = useState("");
  const [formTipoMedicao, setFormTipoMedicao] = useState<"comprimento" | "altura">(
    idadeEmMeses(nascimentoEfetivo, new Date().toISOString()) <= 24 ? "comprimento" : "altura"
  );
  const [formPerimetro, setFormPerimetro] = useState("");

  const tabelaAtiva = TABELAS[crianca.sexo][abaAtiva];

  const medicoesOrdenadas = useMemo(
    () => [...medicoes].sort((a, b) => a.data.localeCompare(b.data)),
    [medicoes]
  );

  const extratores = useMemo<Record<Indicador, (m: MedicaoCrescimento) => number | undefined>>(
    () => ({
      weight_for_age: (m) => m.pesoKg,
      length_height_for_age: (m) => m.comprimentoOuAlturaCm,
      head_circumference_for_age: (m) => m.perimetroCefalicoCm,
    }),
    []
  );

  const ultimaMedicaoComValor = [...medicoesOrdenadas]
    .reverse()
    .find((m) => extratores[abaAtiva](m) !== undefined);

  const leituraAtual = useMemo(() => {
    if (!ultimaMedicaoComValor) return null;
    const valor = extratores[abaAtiva](ultimaMedicaoComValor);
    if (valor === undefined) return null;
    const idade = idadeEmMeses(nascimentoEfetivo, ultimaMedicaoComValor.data);
    return calcularZScoreEPercentil(
      valor,
      tabelaAtiva,
      idade,
      ultimaMedicaoComValor.tipoMedicaoComprimento
    );
  }, [ultimaMedicaoComValor, abaAtiva, tabelaAtiva, nascimentoEfetivo, extratores]);

  function submeter(e: React.FormEvent) {
    e.preventDefault();
    onAdicionarMedicao({
      id: crypto.randomUUID(),
      criancaId: crianca.id,
      data: formData,
      pesoKg: formPeso ? parseFloat(formPeso) : undefined,
      comprimentoOuAlturaCm: formComprimento ? parseFloat(formComprimento) : undefined,
      tipoMedicaoComprimento: formComprimento ? formTipoMedicao : undefined,
      perimetroCefalicoCm: formPerimetro ? parseFloat(formPerimetro) : undefined,
    });
    setFormPeso("");
    setFormComprimento("");
    setFormPerimetro("");
  }

  const forAVisualizacao = abaAtiva === "length_height_for_age" ? formTipoMedicao : undefined;

  return (
    <div className="growth-screen">
      <header className="growth-screen__header">
        <h1>Curvas de Crescimento</h1>
        <p className="growth-screen__subtitle">
          Peso, comprimento/altura e perímetro cefálico de {crianca.nome}, face às curvas de
          referência da OMS (WHO Child Growth Standards, 2006).
        </p>
      </header>

      <div className="growth-screen__tabs" role="tablist">
        {ABAS.map((aba) => (
          <button
            key={aba.id}
            role="tab"
            aria-selected={abaAtiva === aba.id}
            className={"growth-screen__tab" + (abaAtiva === aba.id ? " growth-screen__tab--ativo" : "")}
            style={abaAtiva === aba.id ? { borderColor: aba.cor, color: aba.cor } : undefined}
            onClick={() => setAbaAtiva(aba.id)}
          >
            {aba.label}
          </button>
        ))}
      </div>

      <div className="growth-screen__layout">
        <div className="growth-screen__chart-card">
          {leituraAtual && (
            <div className="growth-screen__readout">
              <span className="growth-screen__readout-value">
                Percentil {Math.round(leituraAtual.percentil)}
              </span>
              <span className="growth-screen__readout-detail">
                z-score {leituraAtual.zScore >= 0 ? "+" : ""}
                {leituraAtual.zScore.toFixed(2)} · mediana esperada à idade atual:{" "}
                {leituraAtual.medianaEsperada.toFixed(1)}
                {ABAS.find((a) => a.id === abaAtiva)?.unidade}
              </span>
              {nascimentoEfetivo !== crianca.dataNascimento && (
                <span className="growth-screen__corrected-badge">
                  A usar idade corrigida (prematuridade)
                </span>
              )}
            </div>
          )}

          {medicoesOrdenadas.length === 0 ? (
            <div className="growth-screen__empty">
              Ainda não há medições registadas. Adicione a primeira medição para ver a posição de{" "}
              {crianca.nome} face à curva de referência.
            </div>
          ) : (
            <GrowthChart
              tabela={tabelaAtiva}
              medicoes={medicoesOrdenadas}
              extrairValor={extratores[abaAtiva]}
              dataNascimento={nascimentoEfetivo}
              tipoMedicaoPreferido={forAVisualizacao}
              corIndicador={ABAS.find((a) => a.id === abaAtiva)!.cor}
            />
          )}

          <p className="growth-screen__disclaimer">
            As bandas mostram os percentis P3–P15–P50–P85–P97 de referência da OMS. Estar fora
            deste intervalo não é, por si só, um diagnóstico — fale com o pediatra na próxima
            consulta, sobretudo se notar mudança de tendência ao longo do tempo.
          </p>
        </div>

        <form className="growth-screen__form" onSubmit={submeter}>
          <h2>Nova medição</h2>

          <label className="growth-screen__field">
            <span>Data</span>
            <input type="date" value={formData} onChange={(e) => setFormData(e.target.value)} required />
          </label>

          <label className="growth-screen__field">
            <span>Peso (kg)</span>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder="ex.: 8.20"
              value={formPeso}
              onChange={(e) => setFormPeso(e.target.value)}
            />
          </label>

          <label className="growth-screen__field">
            <span>
              {formTipoMedicao === "comprimento" ? "Comprimento (deitado, cm)" : "Altura (em pé, cm)"}
            </span>
            <input
              type="number"
              step="0.1"
              inputMode="decimal"
              placeholder="ex.: 68.5"
              value={formComprimento}
              onChange={(e) => setFormComprimento(e.target.value)}
            />
          </label>

          <label className="growth-screen__field growth-screen__field--inline">
            <input
              type="checkbox"
              checked={formTipoMedicao === "altura"}
              onChange={(e) => setFormTipoMedicao(e.target.checked ? "altura" : "comprimento")}
            />
            <span>Medido em pé (recomendado a partir dos 24 meses)</span>
          </label>

          <label className="growth-screen__field">
            <span>Perímetro cefálico (cm)</span>
            <input
              type="number"
              step="0.1"
              inputMode="decimal"
              placeholder="ex.: 44.0"
              value={formPerimetro}
              onChange={(e) => setFormPerimetro(e.target.value)}
            />
          </label>

          <button type="submit" className="growth-screen__submit">
            Guardar medição
          </button>
        </form>
      </div>
    </div>
  );
}
