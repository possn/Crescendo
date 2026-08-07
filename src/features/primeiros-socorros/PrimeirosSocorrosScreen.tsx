import { useState } from "react";
import type { Crianca, CategoriaSocorro } from "../../types";
import { CONSELHOS_SOCORRO, CATEGORIAS_SOCORRO } from "../../data/primeiros-socorros/primeirosSocorros";
import "./PrimeirosSocorrosScreen.css";

interface PrimeirosSocorrosScreenProps {
  crianca: Crianca;
}

export function PrimeirosSocorrosScreen({ crianca }: PrimeirosSocorrosScreenProps) {
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaSocorro | "todos">("todos");

  const conselhosFiltrados = CONSELHOS_SOCORRO.filter(
    (c) => categoriaAtiva === "todos" || c.categoria === categoriaAtiva
  );

  return (
    <div className="socorros-screen">
      <header className="socorros-screen__header">
        <h1>Primeiros Socorros</h1>
        <p className="socorros-screen__subtitle">
          Convulsões, feridas pequenas e queimaduras — apoio prático para {crianca.nome}.
        </p>
        <div className="socorros-screen__aviso-112">
          Em qualquer emergência real, ligue <strong>112</strong> primeiro. Isto é apoio
          informativo, não substitui formação certificada (INEM, Cruz Vermelha Portuguesa) nem
          avaliação médica.
        </div>
      </header>

      <div className="socorros-screen__tabs" role="tablist">
        <button
          className={
            "socorros-screen__tab" + (categoriaAtiva === "todos" ? " socorros-screen__tab--ativo" : "")
          }
          style={categoriaAtiva === "todos" ? { background: "var(--accent-strong)", borderColor: "var(--accent-strong)" } : undefined}
          onClick={() => setCategoriaAtiva("todos")}
        >
          Todos
        </button>
        {CATEGORIAS_SOCORRO.map((cat) => (
          <button
            key={cat.id}
            className={
              "socorros-screen__tab" + (categoriaAtiva === cat.id ? " socorros-screen__tab--ativo" : "")
            }
            style={categoriaAtiva === cat.id ? { background: cat.cor, borderColor: cat.cor } : undefined}
            onClick={() => setCategoriaAtiva(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="socorros-screen__grid">
        {conselhosFiltrados.map((c) => {
          const cat = CATEGORIAS_SOCORRO.find((x) => x.id === c.categoria)!;
          return (
            <article key={c.id} className="socorros-screen__card">
              <span className="socorros-screen__card-tag" style={{ color: cat.cor }}>
                {cat.label}
              </span>
              <h2>{c.titulo}</h2>
              <p>{c.texto}</p>
              <span className="socorros-screen__card-fonte">{c.fonte}</span>
            </article>
          );
        })}
      </div>
    </div>
  );
}
