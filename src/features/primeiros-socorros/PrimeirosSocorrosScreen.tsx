import { useMemo, useState } from "react";
import type { Crianca } from "../../types";
import { CONSELHOS_SOCORRO, CATEGORIAS_SOCORRO } from "../../data/primeiros-socorros/primeirosSocorros";
import { SeccaoColapsavel } from "../../components/SeccaoColapsavel";
import "./PrimeirosSocorrosScreen.css";

interface PrimeirosSocorrosScreenProps {
  crianca: Crianca;
}

export function PrimeirosSocorrosScreen({ crianca }: PrimeirosSocorrosScreenProps) {
  const [abertas, setAbertas] = useState<Set<string>>(new Set());

  function alternar(categoriaId: string) {
    setAbertas((prev) => {
      const novo = new Set(prev);
      if (novo.has(categoriaId)) novo.delete(categoriaId);
      else novo.add(categoriaId);
      return novo;
    });
  }

  const porCategoria = useMemo(
    () =>
      CATEGORIAS_SOCORRO.map((cat) => ({
        cat,
        conselhos: CONSELHOS_SOCORRO.filter((c) => c.categoria === cat.id),
      })),
    []
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

      {porCategoria.map(({ cat, conselhos }) => (
        <SeccaoColapsavel
          key={cat.id}
          titulo={cat.label}
          cor={cat.cor}
          contagem={conselhos.length}
          aberta={abertas.has(cat.id)}
          onToggle={() => alternar(cat.id)}
        >
          {conselhos.map((c) => (
            <article key={c.id} className="socorros-screen__card">
              <h2>{c.titulo}</h2>
              <p>{c.texto}</p>
              <span className="socorros-screen__card-fonte">{c.fonte}</span>
            </article>
          ))}
        </SeccaoColapsavel>
      ))}
    </div>
  );
}
