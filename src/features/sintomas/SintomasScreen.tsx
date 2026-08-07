import { useState } from "react";
import type { Crianca } from "../../types";
import { CONSELHOS_SINTOMAS, CATEGORIAS, type CategoriaSintoma } from "../../data/sintomas/sintomasComuns";
import "./SintomasScreen.css";

interface SintomasScreenProps {
  crianca: Crianca;
}

export function SintomasScreen({ crianca }: SintomasScreenProps) {
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaSintoma | "todos">("todos");

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
          veja também Sinais de Alerta. Para calcular doses de paracetamol/ibuprofeno, veja
          Calculadora de Dose no menu.
        </p>
      </header>

      <div className="sintomas-screen__tabs" role="tablist">
        <button
          className={
            "sintomas-screen__tab" + (categoriaAtiva === "todos" ? " sintomas-screen__tab--ativo" : "")
          }
          style={categoriaAtiva === "todos" ? { background: "var(--accent-strong)", borderColor: "var(--accent-strong)" } : undefined}
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
