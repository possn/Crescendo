import type { AppSection, Crianca } from "../types";
import "./Sidebar.css";

interface ItemMenu {
  id: AppSection;
  label: string;
  glyph: string;
}

interface GrupoMenu {
  titulo: string;
  itens: ItemMenu[];
}

const GRUPOS: GrupoMenu[] = [
  {
    titulo: "Acompanhamento",
    itens: [
      { id: "inicio", label: "Início", glyph: "home" },
      { id: "marcos", label: "Marcos de Desenvolvimento", glyph: "chart" },
      { id: "vacinas", label: "Vacinas — PNV", glyph: "shield" },
      { id: "alertas", label: "Sinais de Alerta", glyph: "flag" },
      { id: "crescimento", label: "Curvas de Crescimento", glyph: "ruler" },
    ],
  },
  {
    titulo: "Cuidados Diários",
    itens: [
      { id: "puericultura", label: "Puericultura", glyph: "bulb" },
      { id: "diversificacao", label: "Diversificação Alimentar", glyph: "spoon" },
      { id: "diario", label: "Diário Visual", glyph: "camera" },
    ],
  },
  {
    titulo: "Saúde e Emergência",
    itens: [
      { id: "sintomas", label: "Sintomas Comuns", glyph: "pulse" },
      { id: "calculadora", label: "Calculadora de Dose", glyph: "calc" },
      { id: "socorros", label: "Primeiros Socorros", glyph: "cross" },
      { id: "sbv", label: "Desengasgamento e SBV", glyph: "heart" },
    ],
  },
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
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "spoon":
      return (
        <svg {...common}>
          <path d="M7 3c-2 0-3.2 1.8-3.2 4s1.2 4.2 3.2 4.2 3.2-2 3.2-4.2S9 3 7 3Z" />
          <path d="M7 11.2V21M17 3v18M14 3v7a3 3 0 0 0 6 0V3" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <path d="M3 12h4l2 6 4-14 2 8h6" />
        </svg>
      );
    case "calc":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01M16 17h.01" />
        </svg>
      );
    case "cross":
      return (
        <svg {...common}>
          <path d="M12 3v7M12 14v7M3 12h7M14 12h7" strokeLinecap="round" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.4-9.5-8.8C1 8 2.5 5 5.8 5c1.9 0 3.2 1 4.2 2.3C11 6 12.3 5 14.2 5c3.3 0 4.8 3 3.3 6.2C15 15.6 12 20 12 20Z" />
          <path d="M6 12h2.5l1.5-2.5L11.5 14 13 11h4.5" />
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
  aberta: boolean;
  onFechar: () => void;
  onAbrirPesquisa: () => void;
}

export function Sidebar({
  seccaoAtiva,
  onMudarSeccao,
  criancas,
  criancaAtivaId,
  onMudarCrianca,
  aberta,
  onFechar,
  onAbrirPesquisa,
}: SidebarProps) {
  function selecionar(s: AppSection) {
    onMudarSeccao(s);
    onFechar(); // em telemóvel, escolher uma secção fecha o menu sozinho
  }

  return (
    <>
      {aberta && <div className="sidebar__backdrop" onClick={onFechar} aria-hidden />}
      <aside className={"sidebar" + (aberta ? " sidebar--aberta" : "")}>
      <button className="sidebar__fechar" onClick={onFechar} aria-label="Fechar menu">
        ✕
      </button>
      <div className="sidebar__brand">
        <img
          src={`${import.meta.env.BASE_URL}icons/icon-192.png`}
          alt=""
          className="sidebar__brand-mark"
        />
        <span className="sidebar__brand-name">Crescendo</span>
      </div>

      <button className="sidebar__pesquisa" onClick={onAbrirPesquisa}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span>Pesquisar…</span>
      </button>

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
        {GRUPOS.map((grupo) => (
          <div key={grupo.titulo} className="sidebar__grupo">
            <span className="sidebar__grupo-titulo">{grupo.titulo}</span>
            {grupo.itens.map((item) => (
              <button
                key={item.id}
                className={
                  "sidebar__item" +
                  (seccaoAtiva === item.id ? " sidebar__item--ativo" : "")
                }
                onClick={() => selecionar(item.id)}
                aria-current={seccaoAtiva === item.id ? "page" : undefined}
              >
                <Glyph name={item.glyph} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
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
            onClick={() => selecionar(item.id)}
          >
            <Glyph name={item.glyph} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
    </>
  );
}
