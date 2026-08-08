/**
 * Mascote ilustrado (ursinho) que muda de pose consoante a idade da
 * criança — dá calor ao topo do Dashboard sem usar fotos reais/geradas de
 * bebés (evita problemas de direitos de autor e de representação).
 *
 * Ilustração original, em SVG, na paleta de cores já usada no resto da
 * app — não depende de nenhum recurso externo, funciona 100% offline.
 */

interface IlustracaoBebeProps {
  idadeMeses: number;
}

export function IlustracaoBebe({ idadeMeses }: IlustracaoBebeProps) {
  const pelo = "var(--mascote-pelo)";
  const peloClaro = "var(--mascote-pelo-claro)";
  const contorno = "var(--ink)";

  const common = {
    viewBox: "0 0 200 200",
    width: 128,
    height: 128,
    "aria-hidden": true as const,
  };

  // 0-2 meses: a dormir, enrolado
  if (idadeMeses < 2.5) {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="130" rx="55" ry="42" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="70" cy="95" r="34" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="50" cy="70" r="12" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="88" cy="68" r="12" fill={pelo} stroke={contorno} strokeWidth="3" />
        <ellipse cx="60" cy="98" rx="14" ry="10" fill={peloClaro} />
        <path d="M62 96q4 3 8 0" stroke={contorno} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M50 88q4-3 8 0M78 87q4-3 8 0" stroke={contorno} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  // 3-5 meses: deitado de costas, patas para cima
  if (idadeMeses < 5.5) {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="145" rx="48" ry="30" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="100" cy="95" r="38" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="72" cy="64" r="13" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="128" cy="64" r="13" fill={pelo} stroke={contorno} strokeWidth="3" />
        <ellipse cx="100" cy="100" rx="16" ry="12" fill={peloClaro} />
        <circle cx="84" cy="88" r="4.5" fill={contorno} />
        <circle cx="116" cy="88" r="4.5" fill={contorno} />
        <path d="M92 106q8 6 16 0" stroke={contorno} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="55" cy="118" rx="12" ry="9" fill={pelo} stroke={contorno} strokeWidth="2.5" transform="rotate(-30 55 118)" />
        <ellipse cx="145" cy="118" rx="12" ry="9" fill={pelo} stroke={contorno} strokeWidth="2.5" transform="rotate(30 145 118)" />
      </svg>
    );
  }

  // 6-8 meses: sentado
  if (idadeMeses < 8.5) {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="150" rx="50" ry="36" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="100" cy="90" r="40" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="70" cy="58" r="14" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="130" cy="58" r="14" fill={pelo} stroke={contorno} strokeWidth="3" />
        <ellipse cx="100" cy="96" rx="17" ry="13" fill={peloClaro} />
        <circle cx="82" cy="82" r="5" fill={contorno} />
        <circle cx="118" cy="82" r="5" fill={contorno} />
        <path d="M88 102q12 10 24 0" stroke={contorno} strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="60" cy="140" r="13" fill={pelo} stroke={contorno} strokeWidth="2.5" />
        <circle cx="140" cy="140" r="13" fill={pelo} stroke={contorno} strokeWidth="2.5" />
      </svg>
    );
  }

  // 9-11 meses: a gatinhar
  if (idadeMeses < 11.5) {
    return (
      <svg {...common}>
        <ellipse cx="105" cy="130" rx="48" ry="28" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="60" cy="105" r="32" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="40" cy="80" r="11" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="72" cy="76" r="11" fill={pelo} stroke={contorno} strokeWidth="3" />
        <ellipse cx="46" cy="108" rx="14" ry="10" fill={peloClaro} />
        <circle cx="34" cy="98" r="4.5" fill={contorno} />
        <circle cx="58" cy="96" r="4.5" fill={contorno} />
        <path d="M38 114q6 5 12 0" stroke={contorno} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="58" y="145" width="16" height="30" rx="8" fill={pelo} stroke={contorno} strokeWidth="2.5" />
        <rect x="130" y="145" width="16" height="30" rx="8" fill={pelo} stroke={contorno} strokeWidth="2.5" />
        <rect x="75" y="90" width="14" height="45" rx="7" fill={pelo} stroke={contorno} strokeWidth="2.5" transform="rotate(20 82 112)" />
      </svg>
    );
  }

  // 12-23 meses: de pé, a segurar-se
  if (idadeMeses < 23.5) {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="145" rx="34" ry="42" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="100" cy="82" r="38" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="70" cy="52" r="13" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="130" cy="52" r="13" fill={pelo} stroke={contorno} strokeWidth="3" />
        <ellipse cx="100" cy="88" rx="16" ry="12" fill={peloClaro} />
        <circle cx="83" cy="75" r="5" fill={contorno} />
        <circle cx="117" cy="75" r="5" fill={contorno} />
        <path d="M88 94q12 10 24 0" stroke={contorno} strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="72" y="170" width="16" height="24" rx="8" fill={pelo} stroke={contorno} strokeWidth="2.5" />
        <rect x="112" y="170" width="16" height="24" rx="8" fill={pelo} stroke={contorno} strokeWidth="2.5" />
        <ellipse cx="58" cy="130" rx="11" ry="17" fill={pelo} stroke={contorno} strokeWidth="2.5" transform="rotate(-15 58 130)" />
        <ellipse cx="142" cy="130" rx="11" ry="17" fill={pelo} stroke={contorno} strokeWidth="2.5" transform="rotate(15 142 130)" />
      </svg>
    );
  }

  // 24-47 meses: a andar/correr, confiante
  if (idadeMeses < 47.5) {
    return (
      <svg {...common}>
        <ellipse cx="102" cy="130" rx="32" ry="38" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="102" cy="68" r="36" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="74" cy="40" r="12" fill={pelo} stroke={contorno} strokeWidth="3" />
        <circle cx="130" cy="40" r="12" fill={pelo} stroke={contorno} strokeWidth="3" />
        <ellipse cx="102" cy="74" rx="15" ry="11" fill={peloClaro} />
        <circle cx="86" cy="62" r="5" fill={contorno} />
        <circle cx="118" cy="62" r="5" fill={contorno} />
        <path d="M90 80q12 12 24 0" stroke={contorno} strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="76" y="158" width="15" height="28" rx="7.5" fill={pelo} stroke={contorno} strokeWidth="2.5" transform="rotate(-12 84 172)" />
        <rect x="112" y="158" width="15" height="28" rx="7.5" fill={pelo} stroke={contorno} strokeWidth="2.5" transform="rotate(18 120 172)" />
        <ellipse cx="62" cy="110" rx="10" ry="20" fill={pelo} stroke={contorno} strokeWidth="2.5" transform="rotate(-35 62 110)" />
        <ellipse cx="142" cy="105" rx="10" ry="20" fill={pelo} stroke={contorno} strokeWidth="2.5" transform="rotate(50 142 105)" />
      </svg>
    );
  }

  // 48+ meses: criança maior, proporções mais esguias, de braços abertos
  return (
    <svg {...common}>
      <ellipse cx="100" cy="128" rx="30" ry="42" fill={pelo} stroke={contorno} strokeWidth="3" />
      <circle cx="100" cy="58" r="32" fill={pelo} stroke={contorno} strokeWidth="3" />
      <circle cx="75" cy="34" r="11" fill={pelo} stroke={contorno} strokeWidth="3" />
      <circle cx="125" cy="34" r="11" fill={pelo} stroke={contorno} strokeWidth="3" />
      <ellipse cx="100" cy="63" rx="13" ry="10" fill={peloClaro} />
      <circle cx="87" cy="52" r="4.5" fill={contorno} />
      <circle cx="113" cy="52" r="4.5" fill={contorno} />
      <path d="M90 68q10 10 20 0" stroke={contorno} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="78" y="162" width="14" height="32" rx="7" fill={pelo} stroke={contorno} strokeWidth="2.5" />
      <rect x="108" y="162" width="14" height="32" rx="7" fill={pelo} stroke={contorno} strokeWidth="2.5" />
      <ellipse cx="58" cy="100" rx="9" ry="24" fill={pelo} stroke={contorno} strokeWidth="2.5" transform="rotate(-55 58 100)" />
      <ellipse cx="142" cy="100" rx="9" ry="24" fill={pelo} stroke={contorno} strokeWidth="2.5" transform="rotate(55 142 100)" />
    </svg>
  );
}
