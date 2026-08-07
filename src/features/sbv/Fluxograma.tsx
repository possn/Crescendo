import "./Fluxograma.css";

interface NoAcao {
  tipo: "acao";
  texto: string;
}
interface NoDecisao {
  tipo: "decisao";
  texto: string;
  simTexto?: string;
  naoTexto?: string;
}
interface NoFim {
  tipo: "fim-seguro" | "fim-emergencia";
  texto: string;
}

export type NoFluxo = NoAcao | NoDecisao | NoFim;

function Seta() {
  return (
    <div className="fluxo__seta" aria-hidden>
      <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
        <path d="M8 0v16M8 16l-5-5M8 16l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function Fluxograma({ nos }: { nos: NoFluxo[] }) {
  return (
    <div className="fluxo">
      {nos.map((no, i) => (
        <div key={i} className="fluxo__item">
          {no.tipo === "acao" && <div className="fluxo__caixa fluxo__caixa--acao">{no.texto}</div>}

          {no.tipo === "decisao" && (
            <>
              <div className="fluxo__caixa fluxo__caixa--decisao">
                <span className="fluxo__decisao-icone">?</span>
                {no.texto}
              </div>
              {(no.simTexto || no.naoTexto) && (
                <div className="fluxo__ramos">
                  {no.naoTexto && (
                    <span className="fluxo__ramo-label fluxo__ramo-label--nao">NÃO ↓</span>
                  )}
                  {no.simTexto && (
                    <span className="fluxo__ramo-label fluxo__ramo-label--sim">SIM → {no.simTexto}</span>
                  )}
                </div>
              )}
            </>
          )}

          {no.tipo === "fim-seguro" && (
            <div className="fluxo__caixa fluxo__caixa--fim-seguro">✓ {no.texto}</div>
          )}
          {no.tipo === "fim-emergencia" && (
            <div className="fluxo__caixa fluxo__caixa--fim-emergencia">⚠ {no.texto}</div>
          )}

          {i < nos.length - 1 && no.tipo !== "fim-seguro" && no.tipo !== "fim-emergencia" && <Seta />}
        </div>
      ))}
    </div>
  );
}
