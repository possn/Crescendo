/**
 * Ilustração de um brinquedo representativo da idade da criança, no topo
 * do Dashboard — liga diretamente aos conselhos de Estimulação por idade
 * (Puericultura). Ilustração original em SVG, sem fotos/recursos
 * externos — funciona 100% offline e adapta-se ao modo escuro através
 * das variáveis CSS já usadas no resto da app.
 */

interface IlustracaoIdadeProps {
  idadeMeses: number;
}

const contorno = "var(--ink)";

export function IlustracaoIdade({ idadeMeses }: IlustracaoIdadeProps) {
  const common = {
    viewBox: "0 0 200 200",
    width: 128,
    height: 128,
    "aria-hidden": true as const,
  };

  // 0-2 meses: chocalho de argola
  if (idadeMeses < 2.5) {
    return (
      <svg {...common}>
        <circle cx="100" cy="80" r="46" fill="var(--accent-soft)" stroke={contorno} strokeWidth="3" />
        <circle cx="100" cy="80" r="24" fill="none" stroke={contorno} strokeWidth="3" />
        <circle cx="76" cy="60" r="6" fill="var(--ind-perimetro)" />
        <circle cx="124" cy="60" r="6" fill="var(--ind-peso)" />
        <circle cx="76" cy="100" r="6" fill="var(--ind-comprimento)" />
        <circle cx="124" cy="100" r="6" fill="var(--accent-strong)" />
        <rect x="92" y="122" width="16" height="52" rx="8" fill="var(--mascote-pelo)" stroke={contorno} strokeWidth="3" />
      </svg>
    );
  }

  // 3-5 meses: anel de dentição
  if (idadeMeses < 5.5) {
    return (
      <svg {...common}>
        <circle cx="100" cy="100" r="58" fill="none" stroke={contorno} strokeWidth="14" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="var(--accent)" strokeWidth="8" />
        <circle cx="70" cy="55" r="7" fill="var(--ind-perimetro)" stroke={contorno} strokeWidth="2.5" />
        <circle cx="130" cy="55" r="7" fill="var(--ind-peso)" stroke={contorno} strokeWidth="2.5" />
        <circle cx="55" cy="100" r="7" fill="var(--ind-comprimento)" stroke={contorno} strokeWidth="2.5" />
      </svg>
    );
  }

  // 6-8 meses: copos para empilhar
  if (idadeMeses < 8.5) {
    return (
      <svg {...common}>
        <path d="M60 150 L72 108 h56 l12 42 Z" fill="var(--ind-perimetro)" stroke={contorno} strokeWidth="3" strokeLinejoin="round" />
        <path d="M68 108 L78 74 h44 l10 34 Z" fill="var(--accent)" stroke={contorno} strokeWidth="3" strokeLinejoin="round" />
        <path d="M76 74 L84 48 h32 l8 26 Z" fill="var(--ind-peso)" stroke={contorno} strokeWidth="3" strokeLinejoin="round" />
      </svg>
    );
  }

  // 9-11 meses: pirâmide de argolas
  if (idadeMeses < 11.5) {
    return (
      <svg {...common}>
        <rect x="94" y="40" width="12" height="120" rx="6" fill="var(--mascote-pelo)" stroke={contorno} strokeWidth="2.5" />
        <ellipse cx="100" cy="162" rx="46" ry="12" fill="var(--ind-comprimento)" stroke={contorno} strokeWidth="3" />
        <ellipse cx="100" cy="140" rx="40" ry="11" fill="var(--ind-perimetro)" stroke={contorno} strokeWidth="3" />
        <ellipse cx="100" cy="119" rx="33" ry="10" fill="var(--ind-peso)" stroke={contorno} strokeWidth="3" />
        <ellipse cx="100" cy="100" rx="25" ry="9" fill="var(--accent)" stroke={contorno} strokeWidth="3" />
      </svg>
    );
  }

  // 12-23 meses: blocos de construção
  if (idadeMeses < 23.5) {
    return (
      <svg {...common}>
        <rect x="52" y="110" width="44" height="44" rx="6" fill="var(--ind-peso)" stroke={contorno} strokeWidth="3" />
        <rect x="104" y="110" width="44" height="44" rx="6" fill="var(--accent)" stroke={contorno} strokeWidth="3" />
        <rect x="78" y="58" width="44" height="44" rx="6" fill="var(--ind-perimetro)" stroke={contorno} strokeWidth="3" />
        <circle cx="74" cy="132" r="6" fill={contorno} opacity="0.15" />
        <circle cx="126" cy="132" r="6" fill={contorno} opacity="0.15" />
      </svg>
    );
  }

  // 24-47 meses: triciclo
  if (idadeMeses < 47.5) {
    return (
      <svg {...common}>
        <circle cx="128" cy="128" r="34" fill="none" stroke={contorno} strokeWidth="6" />
        <circle cx="52" cy="160" r="15" fill="none" stroke={contorno} strokeWidth="5" />
        <circle cx="86" cy="160" r="15" fill="none" stroke={contorno} strokeWidth="5" />
        <path
          d="M128 128 L69 160 M128 128 L82 106 L69 160 M82 106 L82 74 M68 74 h28 M82 106 L116 106"
          stroke="var(--accent-strong)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="128" cy="128" r="5" fill="var(--ind-peso)" />
        <rect x="92" y="94" width="20" height="12" rx="4" fill="var(--ind-peso)" stroke={contorno} strokeWidth="2.5" />
      </svg>
    );
  }

  // 48+ meses: bicicleta
  return (
    <svg {...common}>
      <circle cx="56" cy="140" r="32" fill="none" stroke={contorno} strokeWidth="6" />
      <circle cx="144" cy="140" r="32" fill="none" stroke={contorno} strokeWidth="6" />
      <path
        d="M56 140 L92 84 L144 140 M92 84 L110 84 M56 140 L110 84 M92 84 L80 54 h20"
        stroke="var(--accent-strong)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="56" cy="140" r="5" fill={contorno} />
      <circle cx="144" cy="140" r="5" fill={contorno} />
      <path d="M100 54 v-8 M92 46 h16" stroke="var(--ind-peso)" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
