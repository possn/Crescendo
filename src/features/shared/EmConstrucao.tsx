interface EmConstrucaoProps {
  titulo: string;
  descricao: string;
}

export function EmConstrucao({ titulo, descricao }: EmConstrucaoProps) {
  return (
    <div style={{ maxWidth: 520 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 8px" }}>
        {titulo}
      </h1>
      <p style={{ color: "var(--ink-muted)", lineHeight: 1.6 }}>{descricao}</p>
      <p style={{ color: "var(--ink-faint)", fontSize: 13, marginTop: 18 }}>
        Este módulo ainda não foi construído — segue-se num próximo passo.
      </p>
    </div>
  );
}
