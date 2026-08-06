import type { AppSection, Crianca } from "../types";
import "./Sidebar.css";

interface ItemMenu {
  id: AppSection;
  label: string;
  glyph: string;
}

const ITENS: ItemMenu[] = [
  { id: "inicio", label: "Início", glyph: "home" },
  { id: "marcos", label: "Marcos de Desenvolvimento", glyph: "chart" },
  { id: "crescimento", label: "Curvas de Crescimento", glyph: "ruler" },
  { id: "diario", label: "Diário Visual", glyph: "camera" },
  { id: "puericultura", label: "Puericultura", glyph: "bulb" },
  { id: "alertas", label: "Sinais de Alerta", glyph: "flag" },
];

const ITENS_RODAPE: ItemMenu[] = [
  { id: "perfil", label: "Perfil da Criança", glyph: "user" },
  { id: "definicoes", label: "Definições", glyph: "gear" },
];

function Glyph({ name }: { name: string }) {
  // Ícones em SVG inline — sem dependência de biblioteca de ícones externa.
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M4 11.5 12 4l8 7.5" />
          <path d="M6 10v9h12v-9" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 15c3-4 5 2 8-3s5 1 8-4" />
        </svg>
      );
    case "ruler":
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="8" rx="1.5" />
          <path d="M7 8v3M11 8v3M15 8v3" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7l1.6-2.5h4.8L16 7" />
          <circle cx="12" cy="13.5" r="3.2" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M5 3v18" />
          <path d="M5 4h11l-2.5 3.5L16 11H5" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.4" />
          <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.4-2.3.9a7.6 7.6 0 0 0-1.8-1L15 3.5H9L8.7 6a7.6 7.6 0 0 0-1.8 1l-2.3-.9-2 3.4L4.6 11a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.4 2.3-.9c.5.4 1.1.8 1.8 1l.3 2.5h6l.3-2.5c.7-.2 1.3-.6 1.8-1l2.3.9 2-3.4-2-1.5Z" />
        </svg>
      );
    default:
      return null;
  }
}

interface SidebarProps {
  seccaoAtiva: AppSection;
  onMudarSeccao: (s: AppSection) => void;
  criancas: Crianca[];
  criancaAtivaId: string;
  onMudarCrianca: (id: string) => void;
}

export function Sidebar({
  seccaoAtiva,
  onMudarSeccao,
  criancas,
  criancaAtivaId,
  onMudarCrianca,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img
          src={`${import.meta.env.BASE_URL}icons/icon-192.png`}
          alt=""
          className="sidebar__brand-mark"
        />
        <span className="sidebar__brand-name">Crescendo</span>
      </div>

      {criancas.length > 0 && (
        <div className="sidebar__child-switch">
          <label htmlFor="seletor-crianca" className="sidebar__eyebrow">
            Criança
          </label>
          <select
            id="seletor-crianca"
            value={criancaAtivaId}
            onChange={(e) => onMudarCrianca(e.target.value)}
          >
            {criancas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>
      )}

      <nav className="sidebar__nav" aria-label="Secções principais">
        {ITENS.map((item) => (
          <button
            key={item.id}
            className={
              "sidebar__item" +
              (seccaoAtiva === item.id ? " sidebar__item--ativo" : "")
            }
            onClick={() => onMudarSeccao(item.id)}
            aria-current={seccaoAtiva === item.id ? "page" : undefined}
          >
            <Glyph name={item.glyph} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        {ITENS_RODAPE.map((item) => (
          <button
            key={item.id}
            className={
              "sidebar__item sidebar__item--secundario" +
              (seccaoAtiva === item.id ? " sidebar__item--ativo" : "")
            }
            onClick={() => onMudarSeccao(item.id)}
          >
            <Glyph name={item.glyph} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
