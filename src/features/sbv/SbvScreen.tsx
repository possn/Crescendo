import { useState } from "react";
import type { Crianca, PassoSBV } from "../../types";
import { calcularIdade } from "../../lib/correctedAge";
import {
  PASSOS_ENGASGAMENTO_BEBE,
  PASSOS_ENGASGAMENTO_CRIANCA,
  PASSOS_SBV_BEBE,
  PASSOS_SBV_CRIANCA,
} from "../../data/sbv/desengasgamentoSbv";
import { Fluxograma, type NoFluxo } from "./Fluxograma";
import "./SbvScreen.css";

interface SbvScreenProps {
  crianca: Crianca;
}

function ListaPassos({ passos }: { passos: PassoSBV[] }) {
  return (
    <ol className="sbv-screen__passos">
      {passos.map((p) => (
        <li key={p.id} className="sbv-screen__passo">
          <span className="sbv-screen__passo-numero">{p.numero}</span>
          <div className="sbv-screen__passo-conteudo">
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function fluxoEngasgamento(faixa: "bebe" | "crianca"): NoFluxo[] {
  const compressao =
    faixa === "bebe" ? "5 compressões torácicas (2 dedos, abaixo da linha dos mamilos)" : "5 compressões abdominais (manobra de Heimlich)";
  return [
    {
      tipo: "decisao",
      texto: "Consegue tossir, chorar ou fazer sons?",
      simTexto: "Incentive a tossir — não intervenha",
    },
    { tipo: "acao", texto: "5 pancadas nas costas" },
    { tipo: "acao", texto: compressao },
    {
      tipo: "decisao",
      texto: "Desengasgou?",
      simTexto: "Vigie e procure avaliação médica",
      naoTexto: "continue os ciclos 5+5",
    },
    {
      tipo: "decisao",
      texto: "Ficou inconsciente a qualquer momento?",
      naoTexto: "continue os ciclos 5+5",
    },
    { tipo: "fim-emergencia", texto: "Ligue 112 e comece SBV imediatamente" },
  ];
}

function fluxoSbv(faixa: "bebe" | "crianca"): NoFluxo[] {
  return [
    {
      tipo: "decisao",
      texto: "Responde a estímulos e respira normalmente?",
      simTexto: "Não precisa de SBV — vigie",
    },
    { tipo: "acao", texto: "Ligue 112 (ou peça a alguém para ligar)" },
    {
      tipo: "acao",
      texto:
        faixa === "bebe"
          ? "30 compressões torácicas — base de 1 mão ou 2 polegares, ~4cm, 100-120/min"
          : "30 compressões torácicas — base de 1 mão, ~5cm, 100-120/min",
    },
    { tipo: "acao", texto: "2 insuflações — o suficiente para ver o peito subir" },
    { tipo: "fim-emergencia", texto: "Continue 30:2 (ou 15:2 com 2 reanimadores) até ajuda chegar" },
  ];
}

export function SbvScreen({ crianca }: SbvScreenProps) {
  const idadeMeses = calcularIdade(
    crianca.dataNascimento,
    new Date().toISOString(),
    crianca.prematura,
    crianca.semanasGestacaoNoNascimento
  ).idadeCorrigidaMeses;

  const [faixa, setFaixa] = useState<"bebe" | "crianca">(idadeMeses < 12 ? "bebe" : "crianca");

  const passosEngasgamento = faixa === "bebe" ? PASSOS_ENGASGAMENTO_BEBE : PASSOS_ENGASGAMENTO_CRIANCA;
  const passosSbv = faixa === "bebe" ? PASSOS_SBV_BEBE : PASSOS_SBV_CRIANCA;

  return (
    <div className="sbv-screen">
      <header className="sbv-screen__header">
        <h1>Desengasgamento e Suporte Básico de Vida</h1>
        <div className="sbv-screen__aviso-critico">
          <strong>Isto não substitui formação certificada com manequim.</strong> Um curso de SBV
          pediátrico (INEM, Cruz Vermelha Portuguesa) treina os gestos até se tornarem automáticos
          — o que texto sozinho não consegue fazer. Use isto para conhecer a sequência, não como
          preparação única para uma emergência real. Em qualquer emergência, ligue{" "}
          <strong>112</strong> imediatamente.
        </div>
      </header>

      <div className="sbv-screen__faixa-toggle">
        <button
          className={
            "sbv-screen__faixa-btn" + (faixa === "bebe" ? " sbv-screen__faixa-btn--ativo" : "")
          }
          onClick={() => setFaixa("bebe")}
        >
          Bebé (menos de 1 ano)
        </button>
        <button
          className={
            "sbv-screen__faixa-btn" + (faixa === "crianca" ? " sbv-screen__faixa-btn--ativo" : "")
          }
          onClick={() => setFaixa("crianca")}
        >
          Criança (1 a 5 anos)
        </button>
      </div>
      <p className="sbv-screen__faixa-nota">
        Selecionado automaticamente pela idade de {crianca.nome} — pode mudar se for para outra
        criança.
      </p>

      <section className="sbv-screen__seccao">
        <h2>Engasgamento</h2>
        <Fluxograma nos={fluxoEngasgamento(faixa)} />
        <details className="sbv-screen__detalhe">
          <summary>Ver passos detalhados</summary>
          <ListaPassos passos={passosEngasgamento} />
        </details>
      </section>

      <section className="sbv-screen__seccao">
        <h2>Suporte Básico de Vida — se ficar inconsciente</h2>
        <Fluxograma nos={fluxoSbv(faixa)} />
        <details className="sbv-screen__detalhe">
          <summary>Ver passos detalhados</summary>
          <ListaPassos passos={passosSbv} />
        </details>
      </section>

      <p className="sbv-screen__fonte">
        Fonte: 2025 American Heart Association / American Academy of Pediatrics Guidelines for
        CPR and Emergency Cardiovascular Care (outubro de 2025) — a revisão mais recente. Se
        aprendeu SBV antes desta data, alguns detalhes (a técnica de dois dedos no bebé, por
        exemplo) podem ter mudado.
      </p>
    </div>
  );
}
