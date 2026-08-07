import { useMemo, useState } from "react";
import type { Crianca, MedicaoCrescimento } from "../../types";
import { CONSELHOS_SINTOMAS, CATEGORIAS, type CategoriaSintoma } from "../../data/sintomas/sintomasComuns";
import { calcularIdade } from "../../lib/correctedAge";
import {
  calcularParacetamol,
  calcularIbuprofeno,
  IDADE_MINIMA_IBUPROFENO_MESES,
  IDADE_ALERTA_FEBRE_MESES,
  PESO_MIN_PLAUSIVEL_KG,
  PESO_MAX_PLAUSIVEL_KG,
} from "../../lib/dosagem";
import "./SintomasScreen.css";

interface SintomasScreenProps {
  crianca: Crianca;
  medicoes: MedicaoCrescimento[];
}

export function SintomasScreen({ crianca, medicoes }: SintomasScreenProps) {
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaSintoma | "todos">("todos");

  const ultimoPeso = useMemo(
    () =>
      [...medicoes]
        .filter((m) => m.pesoKg !== undefined)
        .sort((a, b) => b.data.localeCompare(a.data))[0]?.pesoKg,
    [medicoes]
  );

  const [pesoInput, setPesoInput] = useState(ultimoPeso ? String(ultimoPeso) : "");
  const peso = parseFloat(pesoInput.replace(",", "."));
  const pesoValido = !isNaN(peso) && peso >= PESO_MIN_PLAUSIVEL_KG && peso <= PESO_MAX_PLAUSIVEL_KG;

  const idadeMeses = calcularIdade(
    crianca.dataNascimento,
    new Date().toISOString(),
    crianca.prematura,
    crianca.semanasGestacaoNoNascimento
  ).idadeCorrigidaMeses;

  const podeIbuprofeno = idadeMeses >= IDADE_MINIMA_IBUPROFENO_MESES;
  const alertaFebreJovem = idadeMeses < IDADE_ALERTA_FEBRE_MESES;

  const paracetamol = pesoValido ? calcularParacetamol(peso) : null;
  const ibuprofeno = pesoValido && podeIbuprofeno ? calcularIbuprofeno(peso) : null;

  const conselhosFiltrados = CONSELHOS_SINTOMAS.filter(
    (c) => categoriaAtiva === "todos" || c.categoria === categoriaAtiva
  );

  return (
    <div className="sintomas-screen">
      <header className="sintomas-screen__header">
        <h1>Sintomas Comuns</h1>
        <p className="sintomas-screen__subtitle">
          Febre, vómitos, gastroenterite e tosse/constipação — apoio prático para {crianca.nome}.
          Isto não substitui uma avaliação médica; para os sinais que justificam contacto urgente,
          veja também Sinais de Alerta.
        </p>
      </header>

      <section className="sintomas-screen__calc">
        <h2>Calculadora de dose — paracetamol e ibuprofeno</h2>
        <p className="sintomas-screen__calc-intro">
          Valores em miligramas, calculados pelo peso. A conversão para mL depende da concentração
          exata do produto — confirme sempre na bula.
        </p>

        <label className="sintomas-screen__peso-field">
          <span>Peso atual (kg)</span>
          <input
            type="number"
            step="0.1"
            inputMode="decimal"
            value={pesoInput}
            onChange={(e) => setPesoInput(e.target.value)}
            placeholder="ex.: 12.5"
          />
        </label>

        {alertaFebreJovem && (
          <div className="sintomas-screen__aviso-critico">
            {crianca.nome} tem menos de 3 meses — qualquer febre é motivo de contacto imediato com
            o pediatra. Esta calculadora não é para uso em bebés tão pequenos sem orientação médica
            direta.
          </div>
        )}

        {pesoValido && !alertaFebreJovem && (
          <div className="sintomas-screen__doses">
            {paracetamol && (
              <div className="sintomas-screen__dose-card">
                <span className="sintomas-screen__dose-nome">Paracetamol</span>
                <span className="sintomas-screen__dose-valor">{paracetamol.doseMg.toFixed(0)} mg</span>
                <span className="sintomas-screen__dose-detalhe">
                  por dose, a cada {paracetamol.intervaloHorasMin}-{paracetamol.intervaloHorasMax}h
                </span>
                <span className="sintomas-screen__dose-max">
                  Máx. {paracetamol.maxDosesPor24h} doses / 24h (
                  {paracetamol.doseMaximaDiariaMg.toFixed(0)} mg/dia)
                </span>
              </div>
            )}

            {podeIbuprofeno ? (
              ibuprofeno && (
                <div className="sintomas-screen__dose-card">
                  <span className="sintomas-screen__dose-nome">Ibuprofeno</span>
                  <span className="sintomas-screen__dose-valor">{ibuprofeno.doseMg.toFixed(0)} mg</span>
                  <span className="sintomas-screen__dose-detalhe">
                    por dose, a cada {ibuprofeno.intervaloHorasMin}-{ibuprofeno.intervaloHorasMax}h
                  </span>
                  <span className="sintomas-screen__dose-max">
                    Máx. {ibuprofeno.maxDosesPor24h} doses / 24h (
                    {ibuprofeno.doseMaximaDiariaMg.toFixed(0)} mg/dia)
                  </span>
                </div>
              )
            ) : (
              <div className="sintomas-screen__dose-card sintomas-screen__dose-card--bloqueado">
                <span className="sintomas-screen__dose-nome">Ibuprofeno</span>
                <span className="sintomas-screen__dose-bloqueado-texto">
                  Não recomendado antes dos 6 meses. {crianca.nome} tem {idadeMeses.toFixed(1)}{" "}
                  meses.
                </span>
              </div>
            )}
          </div>
        )}

        {pesoInput && !pesoValido && (
          <p className="sintomas-screen__peso-aviso">
            Peso fora do plausível para esta calculadora ({PESO_MIN_PLAUSIVEL_KG}–
            {PESO_MAX_PLAUSIVEL_KG} kg). Verifique o valor.
          </p>
        )}

        <div className="sintomas-screen__disclaimer-calc">
          <p>
            <strong>Estes valores são o cálculo padrão em mg, não uma prescrição.</strong> Confirme
            sempre com a bula do produto (concentrações variam por marca e apresentação) ou com o
            farmacêutico/pediatra antes de administrar. Nunca combine os dois medicamentos ao mesmo
            tempo sem indicação médica. Nunca exceda a dose máxima diária. Nunca use aspirina numa
            criança com doença viral.
          </p>
        </div>
      </section>

      <div className="sintomas-screen__tabs" role="tablist">
        <button
          className={
            "sintomas-screen__tab" + (categoriaAtiva === "todos" ? " sintomas-screen__tab--ativo" : "")
          }
          onClick={() => setCategoriaAtiva("todos")}
        >
          Todos
        </button>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.id}
            className={
              "sintomas-screen__tab" + (categoriaAtiva === cat.id ? " sintomas-screen__tab--ativo" : "")
            }
            style={categoriaAtiva === cat.id ? { background: cat.cor, borderColor: cat.cor } : undefined}
            onClick={() => setCategoriaAtiva(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="sintomas-screen__grid">
        {conselhosFiltrados.map((c) => {
          const cat = CATEGORIAS.find((x) => x.id === c.categoria)!;
          return (
            <article key={c.id} className="sintomas-screen__card">
              <span className="sintomas-screen__card-tag" style={{ color: cat.cor }}>
                {cat.label}
              </span>
              <h2>{c.titulo}</h2>
              <p>{c.texto}</p>
              <span className="sintomas-screen__card-fonte">{c.fonte}</span>
            </article>
          );
        })}
      </div>
    </div>
  );
}
