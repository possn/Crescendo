import { useState } from "react";
import type { Crianca } from "../../types";
import { desfocarCampoAtivo } from "../../lib/desfocarCampoAtivo";
import "./OnboardingScreen.css";

interface OnboardingScreenProps {
  onConcluir: (c: Crianca) => void;
}

type Passo = "boas-vindas" | "como-funciona" | "formulario";

export function OnboardingScreen({ onConcluir }: OnboardingScreenProps) {
  const [passo, setPasso] = useState<Passo>("boas-vindas");
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState<"F" | "M">("F");
  const [dataNascimento, setDataNascimento] = useState("");
  const [prematura, setPrematura] = useState(false);
  const [semanasGestacao, setSemanasGestacao] = useState(34);

  function submeter(e: React.FormEvent) {
    e.preventDefault();
    if (!nome || !dataNascimento) return;
    desfocarCampoAtivo();
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
          <p className="onboarding__privacy">
            Tudo o que introduzir fica guardado apenas neste dispositivo. Nada é enviado para
            nenhum servidor.
          </p>
          <button className="onboarding__btn" onClick={() => setPasso("como-funciona")}>
            Continuar
          </button>
        </div>
      </div>
    );
  }

  if (passo === "como-funciona") {
    return (
      <div className="onboarding">
        <div className="onboarding__card">
          <h1>Como a Crescendo pode ajudar</h1>

          <div className="onboarding__grupos">
            <div className="onboarding__grupo">
              <span className="onboarding__grupo-titulo">Acompanhamento</span>
              <p>Curvas de crescimento, marcos de desenvolvimento, sinais de alerta.</p>
            </div>
            <div className="onboarding__grupo">
              <span className="onboarding__grupo-titulo">Cuidados diários</span>
              <p>Puericultura, diversificação alimentar, diário visual.</p>
            </div>
            <div className="onboarding__grupo">
              <span className="onboarding__grupo-titulo">Saúde e emergência</span>
              <p>Sintomas comuns, calculadora de dose, primeiros socorros, desengasgamento e SBV.</p>
            </div>
          </div>

          <div className="onboarding__bom-senso">
            <h2>Uma nota importante, antes de continuar</h2>
            <p>
              Esta app — como qualquer app do género — é uma <strong>ferramenta de apoio</strong>,
              nunca um substituto do pediatra do seu filho ou filha, nem do seu próprio bom senso
              como pai ou mãe.
            </p>
            <p>
              Ninguém conhece o seu filho como você. Se algo lhe parecer errado, mesmo que nada
              aqui assinale um problema, <strong>confie no seu instinto</strong> e fale com um
              profissional. O conhecimento que vai ganhando sobre os sinais do seu próprio filho é
              insubstituível — esta app existe para o complementar, nunca para o substituir.
            </p>
          </div>

          <button className="onboarding__btn" onClick={() => setPasso("formulario")}>
            Entendi, continuar
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
