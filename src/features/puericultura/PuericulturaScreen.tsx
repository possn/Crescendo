import { useMemo, useState } from "react";
import type { Crianca, TemaPuericultura } from "../../types";
import { CONSELHOS, TEMAS } from "../../data/puericultura/conselhos";
import "./PuericulturaScreen.css";

interface PuericulturaScreenProps {
  crianca: Crianca;
}

function idadeEmMeses(dataNascimento: string): number {
  const n = new Date(dataNascimento).getTime();
  return (Date.now() - n) / (1000 * 60 * 60 * 24 * 30.4375);
}

export function PuericulturaScreen({ crianca }: PuericulturaScreenProps) {
  const idadeAtual = idadeEmMeses(crianca.dataNascimento);
  const [temaAtivo, setTemaAtivo] = useState<TemaPuericultura | "todos">("todos");
  const [apenasRelevantes, setApenasRelevantes] = useState(true);

  const conselhosFiltrados = useMemo(() => {
    return CONSELHOS.filter((c) => {
      if (temaAtivo !== "todos" && c.tema !== temaAtivo) return false;
      if (apenasRelevantes && (idadeAtual < c.idadeMinMeses || idadeAtual > c.idadeMaxMeses + 1))
        return false;
      return true;
    });
  }, [temaAtivo, apenasRelevantes, idadeAtual]);

  return (
    <div className="puericultura-screen">
      <header className="puericultura-screen__header">
        <h1>Puericultura</h1>
        <p className="puericultura-screen__subtitle">
          Conselhos práticos para os primeiros 24 meses de {crianca.nome}, baseados em orientações
          da AAP e da OMS. Não substitui o pediatra — é apoio para as dúvidas mais frequentes do
          dia a dia.
        </p>
      </header>

      <div className="puericultura-screen__controls">
        <div className="puericultura-screen__tabs" role="tablist">
          <button
            className={
              "puericultura-screen__tab" + (temaAtivo === "todos" ? " puericultura-screen__tab--ativo" : "")
            }
            style={temaAtivo === "todos" ? { background: "var(--accent-strong)", borderColor: "var(--accent-strong)" } : undefined}
            onClick={() => setTemaAtivo("todos")}
          >
            Todos
          </button>
          {TEMAS.map((t) => (
            <button
              key={t.id}
              className={
                "puericultura-screen__tab" + (temaAtivo === t.id ? " puericultura-screen__tab--ativo" : "")
              }
              style={temaAtivo === t.id ? { background: t.cor, borderColor: t.cor } : undefined}
              onClick={() => setTemaAtivo(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <label className="puericultura-screen__toggle">
          <input
            type="checkbox"
            checked={apenasRelevantes}
            onChange={(e) => setApenasRelevantes(e.target.checked)}
          />
          <span>Só mostrar o relevante para a idade atual</span>
        </label>
      </div>

      {conselhosFiltrados.length === 0 ? (
        <div className="puericultura-screen__empty">Sem conselhos para este filtro.</div>
      ) : (
        <div className="puericultura-screen__grid">
          {conselhosFiltrados.map((c) => {
            const tema = TEMAS.find((t) => t.id === c.tema)!;
            return (
              <article key={c.id} className="puericultura-screen__card">
                <span className="puericultura-screen__card-tag" style={{ color: tema.cor }}>
                  {tema.label}
                </span>
                <h2>{c.titulo}</h2>
                <p>{c.texto}</p>
                <span className="puericultura-screen__card-fonte">{c.fonte}</span>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
