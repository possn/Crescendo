import type { ReactNode } from "react";
import "./SeccaoColapsavel.css";

interface SeccaoColapsavelProps {
  titulo: string;
  cor: string;
  contagem: number;
  aberta: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function SeccaoColapsavel({
  titulo,
  cor,
  contagem,
  aberta,
  onToggle,
  children,
}: SeccaoColapsavelProps) {
  return (
    <div className={"seccao-colapsavel" + (aberta ? " seccao-colapsavel--aberta" : "")}>
      <button
        className="seccao-colapsavel__cabecalho"
        onClick={onToggle}
        aria-expanded={aberta}
        style={{ borderLeftColor: cor }}
      >
        <span className="seccao-colapsavel__titulo" style={{ color: cor }}>
          {titulo}
        </span>
        <span className="seccao-colapsavel__contagem">{contagem}</span>
        <svg
          className="seccao-colapsavel__seta"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {aberta && <div className="seccao-colapsavel__conteudo">{children}</div>}
    </div>
  );
}
