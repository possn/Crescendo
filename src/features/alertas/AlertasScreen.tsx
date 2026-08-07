import { useMemo, useState } from "react";
import type { Crianca, DominioDesenvolvimento } from "../../types";
import { SINAIS_ALERTA, NOTA_REGRESSAO } from "../../data/alertas/sinaisAlerta";
import "./AlertasScreen.css";

interface AlertasScreenProps {
  crianca: Crianca;
}

const DOMINIOS: { id: DominioDesenvolvimento; label: string; cor: string }[] = [
  { id: "socio_emocional", label: "Socio-emocional", cor: "#c99a3a" },
  { id: "linguagem", label: "Linguagem / Comunicação", cor: "#8a6d3b" },
  { id: "cognitivo", label: "Cognitivo", cor: "#6b5b95" },
  { id: "motor", label: "Motor", cor: "#5c6e54" },
];

function idadeEmMeses(dataNascimento: string): number {
  const n = new Date(dataNascimento).getTime();
  return (Date.now() - n) / (1000 * 60 * 60 * 24 * 30.4375);
}

const IDADES_DISPONIVEIS = Array.from(
  new Set(
    SINAIS_ALERTA.map((s) => s.idadeReferenciaMeses).filter(
      (i): i is number => typeof i === "number"
    )
  )
).sort((a, b) => a - b);

function idadeMaisProxima(idadeMeses: number): number {
  return IDADES_DISPONIVEIS.reduce((maisProxima, atual) =>
    Math.abs(atual - idadeMeses) < Math.abs(maisProxima - idadeMeses) ? atual : maisProxima
  );
}

export function AlertasScreen({ crianca }: AlertasScreenProps) {
  const idadeAtual = idadeEmMeses(crianca.dataNascimento);
  const [idadeSelecionada, setIdadeSelecionada] = useState(idadeMaisProxima(idadeAtual));

  const sinaisDaEtapa = useMemo(
    () => SINAIS_ALERTA.filter((s) => s.idadeReferenciaMeses === idadeSelecionada),
    [idadeSelecionada]
  );

  return (
    <div className="alertas-screen">
      <header className="alertas-screen__header">
        <h1>Sinais de Alerta</h1>
        <p className="alertas-screen__subtitle">
          Esta lista não é uma ferramenta de diagnóstico nem um rastreio validado — é um apoio para
          saber quando vale a pena falar com o pediatra de {crianca.nome} antes da próxima consulta
          de rotina, em vez de esperar. Escolha uma etapa para ver os sinais dessa idade.
        </p>
      </header>

      <div className="alertas-screen__regressao">
        <h2>Uma nota mais importante do que qualquer lista abaixo</h2>
        <p>{NOTA_REGRESSAO}</p>
      </div>

      <div className="alertas-screen__age-picker" role="tablist" aria-label="Escolher etapa por idade">
        {IDADES_DISPONIVEIS.map((idade) => (
          <button
            key={idade}
            role="tab"
            aria-selected={idadeSelecionada === idade}
            className={
              "alertas-screen__age-tab" +
              (idadeSelecionada === idade ? " alertas-screen__age-tab--ativo" : "") +
              (idade === idadeMaisProxima(idadeAtual) ? " alertas-screen__age-tab--sugerido" : "")
            }
            onClick={() => setIdadeSelecionada(idade)}
          >
            {idade}m
          </button>
        ))}
      </div>

      {DOMINIOS.map((dominio) => {
        const sinais = sinaisDaEtapa.filter((s) => s.dominio === dominio.id);
        if (sinais.length === 0) return null;
        return (
          <section key={dominio.id} className="alertas-screen__domain">
            <h2 style={{ color: dominio.cor }}>{dominio.label}</h2>
            <ul>
              {sinais.map((s) => (
                <li key={s.id}>{s.sinal}</li>
              ))}
            </ul>
          </section>
        );
      })}

      {sinaisDaEtapa.length === 0 && (
        <div className="alertas-screen__empty">Sem sinais específicos catalogados para esta etapa.</div>
      )}

      <div className="alertas-screen__cta">
        <p>
          Se algum destes pontos lhe soa familiar, ou se tiver qualquer outra dúvida sobre o
          desenvolvimento do seu filho ou filha, <strong>fale com o pediatra</strong> — não precisa
          de esperar pela próxima consulta agendada.
        </p>
      </div>
    </div>
  );
}
