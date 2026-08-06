import { useEffect, useState } from "react";
import "./SplashScreen.css";

interface SplashScreenProps {
  /** Chamado quando a animação termina, para o App poder mostrar o conteúdo real. */
  onTerminar: () => void;
  /** Duração mínima total, em ms — garante o efeito "premium" mesmo se os
   * dados carregarem instantaneamente. */
  duracaoMinimaMs?: number;
}

export function SplashScreen({ onTerminar, duracaoMinimaMs = 2200 }: SplashScreenProps) {
  const [fase, setFase] = useState<"icone" | "texto" | "sair">("icone");

  useEffect(() => {
    const t1 = setTimeout(() => setFase("texto"), 550);
    const t2 = setTimeout(() => setFase("sair"), duracaoMinimaMs - 350);
    const t3 = setTimeout(onTerminar, duracaoMinimaMs);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [duracaoMinimaMs, onTerminar]);

  return (
    <div className={`splash splash--${fase}`}>
      <img src="/icons/icon-192.png" alt="" className="splash__icon" />
      <span className="splash__wordmark">crescendo</span>
    </div>
  );
}
