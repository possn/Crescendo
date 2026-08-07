import { useMemo, useState } from "react";
import type { Crianca, MedicaoCrescimento } from "../../types";
import { calcularIdade } from "../../lib/correctedAge";
import {
  calcularParacetamol,
  calcularIbuprofeno,
  IDADE_MINIMA_IBUPROFENO_MESES,
  IDADE_ALERTA_FEBRE_MESES,
  PESO_MIN_PLAUSIVEL_KG,
  PESO_MAX_PLAUSIVEL_KG,
} from "../../lib/dosagem";
import "./CalculadoraScreen.css";

interface CalculadoraScreenProps {
  crianca: Crianca;
  medicoes: MedicaoCrescimento[];
}

export function CalculadoraScreen({ crianca, medicoes }: CalculadoraScreenProps) {
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

  return (
    <div className="calculadora-screen">
      <header className="calculadora-screen__header">
        <h1>Calculadora de Dose</h1>
        <p className="calculadora-screen__subtitle">
          Paracetamol e ibuprofeno por peso, para {crianca.nome}. Valores em miligramas — a
          conversão para mL depende da concentração exata do produto, confirme sempre na bula.
        </p>
      </header>

      <section className="calculadora-screen__card">
        <label className="calculadora-screen__peso-field">
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
          <div className="calculadora-screen__aviso-critico">
            <span className="calculadora-screen__aviso-icone" aria-hidden>⚠</span>
            <div>
              <strong>Contacte o pediatra — não use esta calculadora.</strong>
              <p>
                {crianca.nome} tem menos de 3 meses. Nesta idade, qualquer febre é motivo de
                contacto imediato com o pediatra, mesmo que pareça bem-disposto(a) — não é
                situação para tratar em casa sozinho(a).
              </p>
            </div>
          </div>
        )}

        {pesoValido && !alertaFebreJovem && (
          <div className="calculadora-screen__doses">
            {paracetamol && (
              <div className="calculadora-screen__dose-card">
                <span className="calculadora-screen__dose-nome">Paracetamol</span>
                <span className="calculadora-screen__dose-valor">
                  {paracetamol.doseMg.toFixed(0)} mg
                </span>
                <span className="calculadora-screen__dose-detalhe">
                  por dose, a cada {paracetamol.intervaloHorasMin}-{paracetamol.intervaloHorasMax}h
                </span>
                <span className="calculadora-screen__dose-max">
                  Máx. {paracetamol.maxDosesPor24h} doses / 24h (
                  {paracetamol.doseMaximaDiariaMg.toFixed(0)} mg/dia)
                </span>
              </div>
            )}

            {podeIbuprofeno ? (
              ibuprofeno && (
                <div className="calculadora-screen__dose-card">
                  <span className="calculadora-screen__dose-nome">Ibuprofeno</span>
                  <span className="calculadora-screen__dose-valor">
                    {ibuprofeno.doseMg.toFixed(0)} mg
                  </span>
                  <span className="calculadora-screen__dose-detalhe">
                    por dose, a cada {ibuprofeno.intervaloHorasMin}-{ibuprofeno.intervaloHorasMax}h
                  </span>
                  <span className="calculadora-screen__dose-max">
                    Máx. {ibuprofeno.maxDosesPor24h} doses / 24h (
                    {ibuprofeno.doseMaximaDiariaMg.toFixed(0)} mg/dia)
                  </span>
                </div>
              )
            ) : (
              <div className="calculadora-screen__dose-card calculadora-screen__dose-card--bloqueado">
                <span className="calculadora-screen__dose-nome">Ibuprofeno</span>
                <span className="calculadora-screen__dose-bloqueado-texto">
                  Não recomendado antes dos 6 meses. {crianca.nome} tem {idadeMeses.toFixed(1)}{" "}
                  meses.
                </span>
              </div>
            )}
          </div>
        )}

        {pesoInput && !pesoValido && (
          <p className="calculadora-screen__peso-aviso">
            Peso fora do plausível para esta calculadora ({PESO_MIN_PLAUSIVEL_KG}–
            {PESO_MAX_PLAUSIVEL_KG} kg). Verifique o valor.
          </p>
        )}

        <div className="calculadora-screen__disclaimer">
          <p>
            <strong>Estes valores são o cálculo padrão em mg, não uma prescrição.</strong> Confirme
            sempre com a bula do produto (concentrações variam por marca e apresentação) ou com o
            farmacêutico/pediatra antes de administrar. Nunca combine os dois medicamentos ao mesmo
            tempo sem indicação médica. Nunca exceda a dose máxima diária. Nunca use aspirina numa
            criança com doença viral.
          </p>
        </div>
      </section>
    </div>
  );
}
