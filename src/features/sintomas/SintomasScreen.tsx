import { useMemo, useState } from "react";
import type { Crianca, Favorito } from "../../types";
import { CONSELHOS_SINTOMAS, CATEGORIAS } from "../../data/sintomas/sintomasComuns";
import { SeccaoColapsavel } from "../../components/SeccaoColapsavel";
import { BotaoFavorito } from "../../components/BotaoFavorito";
import "./SintomasScreen.css";

interface SintomasScreenProps {
  crianca: Crianca;
  favoritos: Favorito[];
  onAlternarFavorito: (favorito: Omit<Favorito, "id">) => void;
}

export function SintomasScreen({ crianca, favoritos, onAlternarFavorito }: SintomasScreenProps) {
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
          {conselhos.map((c) => {
            const favorito = favoritos.find((f) => f.itemId === c.id);
            return (
              <article key={c.id} className="sintomas-screen__card">
                <div className="sintomas-screen__card-topo">
                  <h2>{c.titulo}</h2>
                  <BotaoFavorito
                    ativo={!!favorito}
                    onToggle={() =>
                      onAlternarFavorito({
                        itemId: c.id,
                        seccao: "sintomas",
                        titulo: c.titulo,
                        categoriaLabel: cat.label,
                        cor: cat.cor,
                      })
                    }
                  />
                </div>
                <p>{c.texto}</p>
                <span className="sintomas-screen__card-fonte">{c.fonte}</span>
              </article>
            );
          })}
        </SeccaoColapsavel>
      ))}
    </div>
  );
}
