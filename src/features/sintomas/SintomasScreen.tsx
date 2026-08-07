import { useMemo, useState } from "react";
import type { Crianca } from "../../types";
import { CONSELHOS_SINTOMAS, CATEGORIAS } from "../../data/sintomas/sintomasComuns";
import { SeccaoColapsavel } from "../../components/SeccaoColapsavel";
import "./SintomasScreen.css";

interface SintomasScreenProps {
  crianca: Crianca;
}

export function SintomasScreen({ crianca }: SintomasScreenProps) {
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
      CATEGORIAS.map((cat) => ({
        cat,
        conselhos: CONSELHOS_SINTOMAS.filter((c) => c.categoria === cat.id),
      })),
    []
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
            <article key={c.id} className="sintomas-screen__card">
              <h2>{c.titulo}</h2>
              <p>{c.texto}</p>
              <span className="sintomas-screen__card-fonte">{c.fonte}</span>
            </article>
          ))}
        </SeccaoColapsavel>
      ))}
    </div>
  );
}
