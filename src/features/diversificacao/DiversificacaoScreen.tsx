import { useState } from "react";
import type { Crianca } from "../../types";
import {
  SINAIS_PRONTIDAO,
  ESTAGIOS,
  ALIMENTOS_A_EVITAR,
  RESUMO_ALIMENTOS,
  NOTA_ALERGENIOS,
  NOTA_VITAMINA_D,
  PERIGOS_ENGASGAMENTO,
} from "../../data/diversificacao/diversificacao";
import { SeccaoColapsavel } from "../../components/SeccaoColapsavel";
import "./DiversificacaoScreen.css";

interface DiversificacaoScreenProps {
  crianca: Crianca;
}

export function DiversificacaoScreen({ crianca }: DiversificacaoScreenProps) {
  const [abertas, setAbertas] = useState<Set<string>>(new Set([ESTAGIOS[0].id]));

  function alternar(id: string) {
    setAbertas((prev) => {
      const novo = new Set(prev);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });
  }

  return (
    <div className="diversificacao-screen">
      <header className="diversificacao-screen__header">
        <h1>Diversificação Alimentar</h1>
        <p className="diversificacao-screen__subtitle">
          Guia prático para {crianca.nome}, dos 4 aos 12+ meses — o que introduzir, quando, e como
          evitar os perigos mais comuns.
        </p>
        <p className="diversificacao-screen__texto">
          A OMS recomenda o início da diversificação alimentar por volta dos 6 meses; a ESPGHAN
          admite uma janela entre as 17 semanas completas (4 meses) e os 6 meses, sobretudo para
          permitir a introdução atempada de alergénios. Este guia segue a janela ESPGHAN — nunca
          antes das 17 semanas completas.
        </p>
      </header>

      <section className="diversificacao-screen__card">
        <h2>Quando está o bebé pronto?</h2>
        <ul className="diversificacao-screen__lista-simples">
          {SINAIS_PRONTIDAO.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="diversificacao-screen__fonte">ESPGHAN Committee on Nutrition 2017 (JPGN 64:119-132)</p>
      </section>

      <section className="diversificacao-screen__card">
        <h2>Puré ou BLW? As duas são válidas</h2>
        <p className="diversificacao-screen__texto">
          Nem a ESPGHAN nem a OMS recomendam uma abordagem sobre a outra. O ensaio mais rigoroso
          até hoje (BLISS, Universidade de Otago) não encontrou diferença significativa no risco
          de engasgamento, no crescimento, nem na ingestão nutricional entre bebés alimentados por
          puré à colher e bebés em <em>baby-led weaning</em>. Muitas famílias combinam as duas — o
          que importa mais é a segurança dos alimentos oferecidos, não o método em si.
        </p>
        <p className="diversificacao-screen__fonte">AAP Clinical Report (2024) / Ensaio BLISS, Universidade de Otago</p>
      </section>

      <section className="diversificacao-screen__estagios">
        <h2>Progressão por idade</h2>
        {ESTAGIOS.map((e) => (
          <SeccaoColapsavel
            key={e.id}
            titulo={`${e.idadeLabel} · ${e.titulo}`}
            cor="var(--ind-peso)"
            contagem={e.pontos.length}
            aberta={abertas.has(e.id)}
            onToggle={() => alternar(e.id)}
          >
            <ul className="diversificacao-screen__pontos">
              {e.pontos.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            {e.evidencia && <p className="diversificacao-screen__evidencia">Evidência: {e.evidencia}</p>}
            {e.avisoAlergia && (
              <div className="diversificacao-screen__aviso-alergia">
                <h4>⚠ Dica para os pais — alergénios</h4>
                <ul>
                  {e.avisoAlergia.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
            {e.dicas && (
              <div className="diversificacao-screen__dicas">
                <h4>■ Dica para os pais</h4>
                <ul>
                  {e.dicas.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </SeccaoColapsavel>
        ))}
      </section>

      <section className="diversificacao-screen__card">
        <h2>{NOTA_ALERGENIOS.titulo}</h2>
        <ul className="diversificacao-screen__pontos">
          {NOTA_ALERGENIOS.pontos.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="diversificacao-screen__card">
        <h2>Alimentos a evitar até aos 12 meses (ou mais)</h2>
        <div className="diversificacao-screen__tabela-evitar">
          {ALIMENTOS_A_EVITAR.map((a) => (
            <div key={a.id} className="diversificacao-screen__evitar-linha">
              <span className="diversificacao-screen__evitar-alimento">{a.alimento}</span>
              <span className="diversificacao-screen__evitar-razao">{a.razao}</span>
              <span className="diversificacao-screen__evitar-data">{a.apartirDe}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="diversificacao-screen__card">
        <h2>Resumo: o que introduzir e quando</h2>
        <div className="diversificacao-screen__tabela-resumo-wrap">
          <table className="diversificacao-screen__tabela-resumo">
            <thead>
              <tr>
                <th>Alimento</th>
                <th>4-6m</th>
                <th>6m</th>
                <th>7-8m</th>
                <th>9-12m</th>
              </tr>
            </thead>
            <tbody>
              {RESUMO_ALIMENTOS.map((r) => (
                <tr key={r.id}>
                  <td>{r.alimento}</td>
                  <td>{r.m4a6 ? "✓" : r.notaEspecial ?? "—"}</td>
                  <td>{r.m6 ? "✓" : r.notaEspecial ?? "—"}</td>
                  <td>{r.m7a8 ? "✓" : r.notaEspecial ?? "—"}</td>
                  <td>{r.m9a12 ? "✓" : r.notaEspecial ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="diversificacao-screen__card">
        <h2>{NOTA_VITAMINA_D.titulo}</h2>
        <ul className="diversificacao-screen__pontos">
          {NOTA_VITAMINA_D.pontos.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="diversificacao-screen__perigos">
        <h2>Segurança: perigos de engasgamento, alimento a alimento</h2>
        <p className="diversificacao-screen__texto">
          Estes riscos não desaparecem depois dos 12 meses — mantêm-se relevantes bem para lá dos
          2 anos.
        </p>
        <div className="diversificacao-screen__perigos-lista">
          {PERIGOS_ENGASGAMENTO.map((p) => (
            <div key={p.id} className="diversificacao-screen__perigo-item">
              <span className="diversificacao-screen__perigo-alimento">{p.alimento}</span>
              <span className="diversificacao-screen__perigo-risco">{p.risco}</span>
              <span className="diversificacao-screen__perigo-solucao">✓ {p.comoTornarSeguro}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="diversificacao-screen__disclaimer">
        Fontes: ESPGHAN Committee on Nutrition 2017 (JPGN 64:119-132); WHO Complementary Feeding
        Guideline 2023; LEAP Study (NEJM 2015); EAT Study (NEJM 2016); ESPGHAN/WHO Multisociety
        Response 2024 (JPGN 79:181-188); FDA/EPA Advice About Eating Fish 2021; EFSA Scientific
        Opinion on Mercury in Food. Isto não substitui avaliação individual do pediatra, sobretudo
        se houver historial familiar de alergias ou preocupações específicas.
      </p>
    </div>
  );
}
