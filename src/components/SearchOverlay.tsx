import { useEffect, useRef, useState } from "react";
import type { AppSection } from "../types";
import { pesquisar } from "../lib/searchIndex";
import "./SearchOverlay.css";

interface SearchOverlayProps {
  aberta: boolean;
  onFechar: () => void;
  onNavegar: (seccao: AppSection) => void;
}

export function SearchOverlay({ aberta, onFechar, onNavegar }: SearchOverlayProps) {
  const [termo, setTermo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (aberta) {
      setTermo("");
      // pequeno atraso para a transição de entrada não interferir com o foco
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [aberta]);

  if (!aberta) return null;

  const resultados = pesquisar(termo);

  function selecionar(seccao: AppSection) {
    onNavegar(seccao);
    onFechar();
  }

  return (
    <div className="search-overlay" role="dialog" aria-label="Pesquisar">
      <div className="search-overlay__topo">
        <div className="search-overlay__input-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            inputMode="search"
            placeholder="Pesquisar em toda a app…"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
          />
        </div>
        <button className="search-overlay__fechar" onClick={onFechar} aria-label="Fechar pesquisa">
          Cancelar
        </button>
      </div>

      <div className="search-overlay__resultados">
        {termo.trim().length < 2 && (
          <p className="search-overlay__dica">
            Escreva pelo menos 2 letras — ex.: "febre", "engasgar", "sono", "vacina"
          </p>
        )}

        {termo.trim().length >= 2 && resultados.length === 0 && (
          <p className="search-overlay__dica">Sem resultados para "{termo}".</p>
        )}

        {resultados.map((r) => (
          <button key={r.id} className="search-overlay__item" onClick={() => selecionar(r.seccao)}>
            <span className="search-overlay__item-tag" style={{ color: r.cor }}>
              {r.seccaoLabel}
              {r.categoriaLabel ? ` · ${r.categoriaLabel}` : ""}
            </span>
            <span className="search-overlay__item-titulo">{r.titulo}</span>
            <span className="search-overlay__item-resumo">{r.resumo}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
