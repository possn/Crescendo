import { useState } from "react";
import type { Crianca } from "../../types";
import "./OnboardingScreen.css";

interface OnboardingScreenProps {
  onConcluir: (c: Crianca) => void;
}

export function OnboardingScreen({ onConcluir }: OnboardingScreenProps) {
  const [passo, setPasso] = useState<"boas-vindas" | "formulario">("boas-vindas");
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState<"F" | "M">("F");
  const [dataNascimento, setDataNascimento] = useState("");
  const [prematura, setPrematura] = useState(false);
  const [semanasGestacao, setSemanasGestacao] = useState(34);

  function submeter(e: React.FormEvent) {
    e.preventDefault();
    if (!nome || !dataNascimento) return;
    onConcluir({
      id: crypto.randomUUID(),
      nome,
      sexo,
      dataNascimento,
      prematura,
      semanasGestacaoNoNascimento: prematura ? semanasGestacao : undefined,
    });
  }

  if (passo === "boas-vindas") {
    return (
      <div className="onboarding">
        <div className="onboarding__card">
          <img src={`${import.meta.env.BASE_URL}icons/icon-192.png`} alt="" className="onboarding__icon" />
          <h1>Bem-vindo(a) à Crescendo</h1>
          <p>
            Acompanhamento do desenvolvimento e do crescimento infantil (0–5 anos), com base em
            dados oficiais da OMS e do CDC/AAP.
          </p>
          <p className="onboarding__disclaimer">
            Esta app não substitui uma avaliação formal por um profissional de saúde — é um apoio
            para as dúvidas mais frequentes do dia a dia, nunca um substituto do pediatra.
          </p>
          <p className="onboarding__privacy">
            Tudo o que introduzir fica guardado apenas neste dispositivo. Nada é enviado para
            nenhum servidor.
          </p>
          <button className="onboarding__btn" onClick={() => setPasso("formulario")}>
            Começar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding">
      <div className="onboarding__card">
        <h1>Vamos criar o primeiro perfil</h1>
        <p className="onboarding__subtitle">
          Só o essencial para começar — pode completar mais dados depois, em Perfil da Criança.
        </p>

        <form className="onboarding__form" onSubmit={submeter}>
          <label className="onboarding__field">
            <span>Nome</span>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome da criança"
              required
              autoFocus
            />
          </label>

          <label className="onboarding__field">
            <span>Sexo biológico (usado para as curvas de crescimento da OMS)</span>
            <select value={sexo} onChange={(e) => setSexo(e.target.value as "F" | "M")}>
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
            </select>
          </label>

          <label className="onboarding__field">
            <span>Data de nascimento</span>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </label>

          <label className="onboarding__field onboarding__field--inline">
            <input
              type="checkbox"
              checked={prematura}
              onChange={(e) => setPrematura(e.target.checked)}
            />
            <span>Nasceu antes das 37 semanas de gestação</span>
          </label>

          {prematura && (
            <label className="onboarding__field">
              <span>Idade gestacional ao nascer (semanas)</span>
              <input
                type="number"
                min={22}
                max={36}
                value={semanasGestacao}
                onChange={(e) => setSemanasGestacao(parseInt(e.target.value, 10))}
              />
            </label>
          )}

          <button type="submit" className="onboarding__btn">
            Concluir
          </button>
        </form>
      </div>
    </div>
  );
}
