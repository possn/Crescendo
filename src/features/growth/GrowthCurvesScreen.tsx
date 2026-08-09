import { useMemo, useRef, useState } from "react";
import type { Crianca, MedicaoCrescimento, TabelaReferenciaOMS, Unidades } from "../../types";
import { calcularZScoreEPercentil } from "../../lib/growthCalculations";
import {
  formatarPeso,
  formatarComprimento,
  rotuloPeso,
  rotuloComprimento,
  paraKg,
  paraCm,
  kgParaExibir,
  cmParaExibir,
} from "../../lib/units";
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
  onEditarMedicao: (m: MedicaoCrescimento) => void;
  onRemoverMedicao: (id: string) => void;
  unidades: Unidades;
}

type Indicador = "weight_for_age" | "length_height_for_age" | "head_circumference_for_age";

const ABAS: { id: Indicador; label: string; cor: string }[] = [
  { id: "weight_for_age", label: "Peso", cor: "var(--ind-peso)" },
  { id: "length_height_for_age", label: "Comprimento / Altura", cor: "var(--ind-comprimento)" },
  { id: "head_circumference_for_age", label: "Perímetro cefálico", cor: "var(--ind-perimetro)" },
];

// Limites de plausibilidade (0-5 anos), em métrico — só para apanhar erros
// óbvios de digitação (ex.: "820" em vez de "8.20"), não são limites
// clínicos. Gera um aviso, não bloqueia — o utilizador pode confirmar na
// mesma se o valor for mesmo esse.
const LIMITES_KG: [number, number] = [1.5, 35];
const LIMITES_CM: [number, number] = [30, 130];
const LIMITES_PC_CM: [number, number] = [25, 58];

export function GrowthCurvesScreen({
  crianca,
  medicoes,
  onAdicionarMedicao,
  onEditarMedicao,
  onRemoverMedicao,
  unidades,
}: GrowthCurvesScreenProps) {
  const [abaAtiva, setAbaAtiva] = useState<Indicador>("weight_for_age");
  const nascimentoEfetivo = dataNascimentoEfetiva(crianca);

  // Escala do gráfico: acompanha a idade da criança (ou a medição mais
  // antiga registada, se for maior), em vez de ficar sempre fixa nos 24m.
  const idadeMaximaMeses = useMemo(() => {
    const idadeAtual = idadeEmMeses(nascimentoEfetivo, new Date().toISOString());
    const idadeMaisVelhaRegistada = medicoes.reduce(
      (max, m) => Math.max(max, idadeEmMeses(nascimentoEfetivo, m.data)),
      0
    );
    const referencia = Math.max(idadeAtual, idadeMaisVelhaRegistada);
    if (referencia <= 24) return 24;
    if (referencia <= 36) return 36;
    if (referencia <= 48) return 48;
    return 60;
  }, [nascimentoEfetivo, medicoes]);

  const [modoData, setModoData] = useState<"data" | "idade">("data");
  const [formData, setFormData] = useState(new Date().toISOString().slice(0, 10));
  const [formIdadeMeses, setFormIdadeMeses] = useState("");
  const [formPeso, setFormPeso] = useState("");
  const [formComprimento, setFormComprimento] = useState("");
  const [formTipoMedicao, setFormTipoMedicao] = useState<"comprimento" | "altura">(
    idadeEmMeses(nascimentoEfetivo, new Date().toISOString()) <= 24 ? "comprimento" : "altura"
  );
  const [formPerimetro, setFormPerimetro] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);
  const [dadosPendentes, setDadosPendentes] = useState<MedicaoCrescimento | null>(null);
  const [idEmEdicao, setIdEmEdicao] = useState<string | null>(null);
  const topoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function iniciarEdicao(m: MedicaoCrescimento) {
    setIdEmEdicao(m.id);
    setModoData("data");
    setFormData(m.data);
    setFormIdadeMeses("");
    setFormPeso(m.pesoKg !== undefined ? String(kgParaExibir(m.pesoKg, unidades)) : "");
    setFormComprimento(
      m.comprimentoOuAlturaCm !== undefined ? String(cmParaExibir(m.comprimentoOuAlturaCm, unidades)) : ""
    );
    setFormTipoMedicao(m.tipoMedicaoComprimento ?? "comprimento");
    setFormPerimetro(
      m.perimetroCefalicoCm !== undefined ? String(cmParaExibir(m.perimetroCefalicoCm, unidades)) : ""
    );
    setAviso(null);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function cancelarEdicao() {
    setIdEmEdicao(null);
    setFormPeso("");
    setFormComprimento("");
    setFormPerimetro("");
    setFormIdadeMeses("");
    setFormData(new Date().toISOString().slice(0, 10));
    setAviso(null);
  }

  function irParaResultado() {
    // Depois de guardar, o utilizador está normalmente scrolled para baixo
    // (onde está o formulário) — sem isto, o percentil/gráfico atualizado
    // fica escondido acima, fora de vista, e parece que "não aparece".
    topoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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

  function dataAPartirDaIdade(idadeMeses: number): string {
    const d = new Date(nascimentoEfetivo);
    const diasTotais = idadeMeses * 30.4375;
    d.setDate(d.getDate() + Math.round(diasTotais));
    return d.toISOString().slice(0, 10);
  }

  function submeter(e: React.FormEvent) {
    e.preventDefault();
    setAviso(null);

    const dataFinal =
      modoData === "idade" && formIdadeMeses
        ? dataAPartirDaIdade(parseFloat(formIdadeMeses))
        : formData;

    const pesoKg = formPeso ? paraKg(parseFloat(formPeso), unidades) : undefined;
    const comprimentoCm = formComprimento ? paraCm(parseFloat(formComprimento), unidades) : undefined;
    const perimetroCm = formPerimetro ? paraCm(parseFloat(formPerimetro), unidades) : undefined;

    // Aviso de plausibilidade — não bloqueia, só confirma. É isto que teria
    // apanhado o erro que gerou "percentil 100 / z-score +25".
    const foraDosLimites: string[] = [];
    if (pesoKg !== undefined && (pesoKg < LIMITES_KG[0] || pesoKg > LIMITES_KG[1])) {
      foraDosLimites.push(`peso (${formatarPeso(pesoKg, unidades)})`);
    }
    if (
      comprimentoCm !== undefined &&
      (comprimentoCm < LIMITES_CM[0] || comprimentoCm > LIMITES_CM[1])
    ) {
      foraDosLimites.push(`comprimento/altura (${formatarComprimento(comprimentoCm, unidades)})`);
    }
    if (
      perimetroCm !== undefined &&
      (perimetroCm < LIMITES_PC_CM[0] || perimetroCm > LIMITES_PC_CM[1])
    ) {
      foraDosLimites.push(`perímetro cefálico (${formatarComprimento(perimetroCm, unidades)})`);
    }
    if (foraDosLimites.length > 0) {
      setAviso(
        `Isto parece fora do plausível para 0-5 anos: ${foraDosLimites.join(", ")}. Verifique se não trocou a unidade ou um dígito. Pode confirmar mesmo assim se tiver a certeza.`
      );
      setDadosPendentes({
        id: idEmEdicao ?? crypto.randomUUID(),
        criancaId: crianca.id,
        data: dataFinal,
        pesoKg,
        comprimentoOuAlturaCm: comprimentoCm,
        tipoMedicaoComprimento: formComprimento ? formTipoMedicao : undefined,
        perimetroCefalicoCm: perimetroCm,
      });
      return;
    }

    const medicao: MedicaoCrescimento = {
      id: idEmEdicao ?? crypto.randomUUID(),
      criancaId: crianca.id,
      data: dataFinal,
      pesoKg,
      comprimentoOuAlturaCm: comprimentoCm,
      tipoMedicaoComprimento: formComprimento ? formTipoMedicao : undefined,
      perimetroCefalicoCm: perimetroCm,
    };
    if (idEmEdicao) {
      onEditarMedicao(medicao);
    } else {
      onAdicionarMedicao(medicao);
    }
    setIdEmEdicao(null);
    setFormPeso("");
    setFormComprimento("");
    setFormPerimetro("");
    setFormIdadeMeses("");
    irParaResultado();
  }

  function confirmarMesmoAssim() {
    if (!dadosPendentes) return;
    if (idEmEdicao) {
      onEditarMedicao(dadosPendentes);
    } else {
      onAdicionarMedicao(dadosPendentes);
    }
    setIdEmEdicao(null);
    setDadosPendentes(null);
    setAviso(null);
    setFormPeso("");
    setFormComprimento("");
    setFormPerimetro("");
    setFormIdadeMeses("");
    irParaResultado();
  }

  const forAVisualizacao = abaAtiva === "length_height_for_age" ? formTipoMedicao : undefined;

  return (
    <div className="growth-screen">
      <div ref={topoRef} />
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
                {abaAtiva === "weight_for_age"
                  ? formatarPeso(leituraAtual.medianaEsperada, unidades)
                  : formatarComprimento(leituraAtual.medianaEsperada, unidades)}
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
              idadeMaximaMeses={idadeMaximaMeses}
            />
          )}

          <p className="growth-screen__disclaimer">
            As bandas mostram os percentis P3–P15–P50–P85–P97 de referência da OMS. Estar fora
            deste intervalo não é, por si só, um diagnóstico — fale com o pediatra na próxima
            consulta, sobretudo se notar mudança de tendência ao longo do tempo.
          </p>
        </div>

        <form className="growth-screen__form" onSubmit={submeter} ref={formRef}>
          <div className="growth-screen__form-titulo">
            <h2>{idEmEdicao ? "Editar medição" : "Nova medição"}</h2>
            {idEmEdicao && (
              <button type="button" className="growth-screen__cancelar-edicao" onClick={cancelarEdicao}>
                Cancelar
              </button>
            )}
          </div>

          <div className="growth-screen__mode-toggle">
            <button
              type="button"
              className={"growth-screen__mode-btn" + (modoData === "data" ? " growth-screen__mode-btn--ativo" : "")}
              onClick={() => setModoData("data")}
            >
              Por data
            </button>
            <button
              type="button"
              className={"growth-screen__mode-btn" + (modoData === "idade" ? " growth-screen__mode-btn--ativo" : "")}
              onClick={() => setModoData("idade")}
            >
              Por idade
            </button>
          </div>

          {modoData === "data" ? (
            <label className="growth-screen__field">
              <span>Data</span>
              <input type="date" value={formData} onChange={(e) => setFormData(e.target.value)} required />
            </label>
          ) : (
            <label className="growth-screen__field">
              <span>Idade (meses)</span>
              <input
                type="number"
                step="0.1"
                min="0"
                max="60"
                inputMode="decimal"
                placeholder="ex.: 9"
                value={formIdadeMeses}
                onChange={(e) => setFormIdadeMeses(e.target.value)}
                required
              />
            </label>
          )}

          <label className="growth-screen__field">
            <span>{rotuloPeso(unidades)}</span>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder={unidades === "imperial" ? "ex.: 18.08" : "ex.: 8.20"}
              value={formPeso}
              onChange={(e) => setFormPeso(e.target.value)}
            />
          </label>

          <label className="growth-screen__field">
            <span>{rotuloComprimento(unidades, formTipoMedicao)}</span>
            <input
              type="number"
              step="0.1"
              inputMode="decimal"
              placeholder={unidades === "imperial" ? "ex.: 27.0" : "ex.: 68.5"}
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
            <span>{unidades === "imperial" ? "Perímetro cefálico (in)" : "Perímetro cefálico (cm)"}</span>
            <input
              type="number"
              step="0.1"
              inputMode="decimal"
              placeholder={unidades === "imperial" ? "ex.: 17.3" : "ex.: 44.0"}
              value={formPerimetro}
              onChange={(e) => setFormPerimetro(e.target.value)}
            />
          </label>

          {aviso && (
            <div className="growth-screen__aviso">
              <p>{aviso}</p>
              <button type="button" className="growth-screen__aviso-btn" onClick={confirmarMesmoAssim}>
                Guardar mesmo assim
              </button>
            </div>
          )}

          <button type="submit" className="growth-screen__submit">
            {idEmEdicao ? "Guardar alterações" : "Guardar medição"}
          </button>
        </form>
      </div>

      {medicoesOrdenadas.length > 0 && (
        <div className="growth-screen__lista">
          <h2>Medições registadas</h2>
          <ul>
            {[...medicoesOrdenadas].reverse().map((m) => {
              const idadeM = idadeEmMeses(nascimentoEfetivo, m.data);
              return (
                <li key={m.id}>
                  <span className="growth-screen__lista-idade">{idadeM.toFixed(1)}m</span>
                  <span className="growth-screen__lista-data">
                    {new Date(m.data).toLocaleDateString("pt-PT")}
                  </span>
                  <span className="growth-screen__lista-valores">
                    {m.pesoKg !== undefined && formatarPeso(m.pesoKg, unidades)}
                    {m.comprimentoOuAlturaCm !== undefined &&
                      ` · ${formatarComprimento(m.comprimentoOuAlturaCm, unidades)}`}
                    {m.perimetroCefalicoCm !== undefined &&
                      ` · PC ${formatarComprimento(m.perimetroCefalicoCm, unidades)}`}
                  </span>
                  <div className="growth-screen__lista-acoes">
                    <button
                      className="growth-screen__lista-editar"
                      onClick={() => iniciarEdicao(m)}
                      aria-label="Editar esta medição"
                    >
                      Editar
                    </button>
                    <button
                      className="growth-screen__lista-apagar"
                      onClick={() => onRemoverMedicao(m.id)}
                      aria-label="Apagar esta medição"
                    >
                      Apagar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
