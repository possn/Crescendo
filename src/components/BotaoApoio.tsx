import "./BotaoApoio.css";

interface BotaoApoioProps {
  variante?: "card" | "rodape";
}

const URL_APOIO = "https://buymeacoffee.com/possn";

export function BotaoApoio({ variante = "card" }: BotaoApoioProps) {
  return (
    <a
      href={URL_APOIO}
      target="_blank"
      rel="noopener noreferrer"
      className={`botao-apoio botao-apoio--${variante}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
        <path d="M6 1v3M10 1v3M14 1v3" />
      </svg>
      <span>Ofereça-me um café</span>
    </a>
  );
}
