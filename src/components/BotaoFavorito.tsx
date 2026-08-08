import "./BotaoFavorito.css";

interface BotaoFavoritoProps {
  ativo: boolean;
  onToggle: () => void;
}

export function BotaoFavorito({ ativo, onToggle }: BotaoFavoritoProps) {
  return (
    <button
      className={"botao-favorito" + (ativo ? " botao-favorito--ativo" : "")}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={ativo ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      aria-pressed={ativo}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={ativo ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M12 3.5l2.7 5.9 6.3.7-4.7 4.4 1.2 6.3-5.5-3.1-5.5 3.1 1.2-6.3-4.7-4.4 6.3-.7Z" />
      </svg>
    </button>
  );
}
