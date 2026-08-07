import { useMemo, useState } from "react";
import type { Crianca } from "../../types";
import { CONSELHOS, TEMAS } from "../../data/puericultura/conselhos";
import { SeccaoColapsavel } from "../../components/SeccaoColapsavel";
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
  const [apenasRelevantes, setApenasRelevantes] = useState(true);
  const [abertas, setAbertas] = useState<Set<string>>(new Set());

  function alternar(temaId: string) {
    setAbertas((prev) => {
      const novo = new Set(prev);
      if (novo.has(temaId)) novo.delete(temaId);
      else novo.add(temaId);
      return novo;
    });
  }

  const porTema = useMemo(() => {
    return TEMAS.map((tema) => ({
      tema,
      conselhos: CONSELHOS.filter((c) => {
        if (c.tema !== tema.id) return false;
        if (apenasRelevantes && (idadeAtual < c.idadeMinMeses || idadeAtual > c.idadeMaxMeses + 1))
          return false;
        return true;
      }),
    }));
  }, [apenasRelevantes, idadeAtual]);

  return (
    <div className="puericultura-screen">
      <header className="puericultura-screen__header">
        <h1>Puericultura</h1>
        <p className="puericultura-screen__subtitle">
          Conselhos práticos para os primeiros 24 meses de {crianca.nome}, baseados em orientações
          da AAP e da OMS. Não substitui o pediatra — é apoio para as dúvidas mais frequentes do
          dia a dia. Toque num tema para abrir.
        </p>
      </header>

      <label className="puericultura-screen__toggle">
        <input
          type="checkbox"
          checked={apenasRelevantes}
          onChange={(e) => setApenasRelevantes(e.target.checked)}
        />
        <span>Só mostrar o relevante para a idade atual</span>
      </label>

      {porTema.map(({ tema, conselhos }) => {
        if (conselhos.length === 0) return null;
        return (
          <SeccaoColapsavel
            key={tema.id}
            titulo={tema.label}
            cor={tema.cor}
            contagem={conselhos.length}
            aberta={abertas.has(tema.id)}
            onToggle={() => alternar(tema.id)}
          >
            {conselhos.map((c) => (
              <article key={c.id} className="puericultura-screen__card">
                <h2>{c.titulo}</h2>
                <p>{c.texto}</p>
                <span className="puericultura-screen__card-fonte">{c.fonte}</span>
              </article>
            ))}
          </SeccaoColapsavel>
        );
      })}
    </div>
  );
}
