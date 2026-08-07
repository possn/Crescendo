import type { Crianca } from "../../types";
import { ESTAGIOS, PERIGOS_ENGASGAMENTO } from "../../data/diversificacao/diversificacao";
import "./DiversificacaoScreen.css";

interface DiversificacaoScreenProps {
  crianca: Crianca;
}

export function DiversificacaoScreen({ crianca }: DiversificacaoScreenProps) {
  return (
    <div className="diversificacao-screen">
      <header className="diversificacao-screen__header">
        <h1>Diversificação Alimentar</h1>
        <p className="diversificacao-screen__subtitle">
          Guia prático para {crianca.nome}, dos 6 aos 24 meses — o que introduzir, quando, e como
          evitar os perigos mais comuns.
        </p>
      </header>

      <section className="diversificacao-screen__card">
        <h2>Sinais de que está pronto(a)</h2>
        <ul className="diversificacao-screen__lista-simples">
          <li>Senta-se com pouco ou nenhum apoio</li>
          <li>Controla bem a cabeça</li>
          <li>Mostra interesse ativo pela comida (olha, tenta agarrar)</li>
          <li>Perdeu o reflexo de extrusão (já não empurra a comida para fora com a língua)</li>
        </ul>
        <p className="diversificacao-screen__fonte">AAP Bright Futures / AAP Clinical Report on Complementary Feeding (2024)</p>
      </section>

      <section className="diversificacao-screen__card">
        <h2>Puré ou BLW? As duas são válidas</h2>
        <p className="diversificacao-screen__texto">
          Nem a AAP nem a OMS recomendam uma abordagem sobre a outra. O ensaio mais rigoroso até
          hoje (BLISS, Universidade de Otago) não encontrou diferença significativa no risco de
          engasgamento, no crescimento, nem na ingestão nutricional entre bebés alimentados por
          puré à colher e bebés em <em>baby-led weaning</em> (auto-alimentação desde o início).
          Muitas famílias combinam as duas. A escolha é sua — o que importa mais é a segurança dos
          alimentos oferecidos (ver tabela abaixo), não o método em si.
        </p>
        <p className="diversificacao-screen__fonte">AAP Clinical Report (2024) / Ensaio BLISS, Universidade de Otago</p>
      </section>

      <section className="diversificacao-screen__estagios">
        <h2>Progressão por idade</h2>
        <div className="diversificacao-screen__estagios-grid">
          {ESTAGIOS.map((e) => (
            <article key={e.id} className="diversificacao-screen__estagio-card">
              <span className="diversificacao-screen__estagio-idade">{e.idadeLabel}</span>
              <h3>{e.textura}</h3>
              <ul>
                {e.exemplos.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
              <p className="diversificacao-screen__estagio-nota">{e.nota}</p>
            </article>
          ))}
        </div>
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
        Para ferro, vitamina D, água, sumo e seletividade alimentar, veja também os conselhos de
        Alimentação em Puericultura. Isto não substitui avaliação individual do pediatra,
        sobretudo se houver historial familiar de alergias ou preocupações específicas.
      </p>
    </div>
  );
}
