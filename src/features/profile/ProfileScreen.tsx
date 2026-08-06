import { useState } from "react";
import type { Crianca } from "../../types";
import { calcularIdade } from "../../lib/correctedAge";
import "./ProfileScreen.css";

interface ProfileScreenProps {
  crianca: Crianca;
  onGuardar: (c: Crianca) => void;
}

export function ProfileScreen({ crianca, onGuardar }: ProfileScreenProps) {
  const [form, setForm] = useState<Crianca>(crianca);

  const hoje = new Date().toISOString().slice(0, 10);
  const resultado = calcularIdade(
    form.dataNascimento,
    hoje,
    form.prematura,
    form.semanasGestacaoNoNascimento
  );

  function submeter(e: React.FormEvent) {
    e.preventDefault();
    onGuardar(form);
  }

  return (
    <div className="profile-screen">
      <header className="profile-screen__header">
        <h1>Perfil da Criança</h1>
        <p className="profile-screen__subtitle">
          Estes dados ajustam automaticamente os módulos de Marcos de Desenvolvimento e Curvas de
          Crescimento — não precisa de repetir nada nesses ecrãs.
        </p>
      </header>

      <div className="profile-screen__layout">
        <form className="profile-screen__form" onSubmit={submeter}>
          <label className="profile-screen__field">
            <span>Nome</span>
            <input
              type="text"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
            />
          </label>

          <label className="profile-screen__field">
            <span>Sexo (biológico, usado para as curvas OMS)</span>
            <select
              value={form.sexo}
              onChange={(e) => setForm({ ...form, sexo: e.target.value as "F" | "M" })}
            >
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
            </select>
          </label>

          <label className="profile-screen__field">
            <span>Data de nascimento</span>
            <input
              type="date"
              value={form.dataNascimento}
              onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
              required
            />
          </label>

          <label className="profile-screen__field profile-screen__field--inline">
            <input
              type="checkbox"
              checked={form.prematura}
              onChange={(e) =>
                setForm({
                  ...form,
                  prematura: e.target.checked,
                  semanasGestacaoNoNascimento: e.target.checked
                    ? form.semanasGestacaoNoNascimento ?? 34
                    : undefined,
                })
              }
            />
            <span>Nasceu antes das 37 semanas de gestação (prematura)</span>
          </label>

          {form.prematura && (
            <label className="profile-screen__field">
              <span>Idade gestacional ao nascer (semanas)</span>
              <input
                type="number"
                min={22}
                max={36}
                value={form.semanasGestacaoNoNascimento ?? 34}
                onChange={(e) =>
                  setForm({ ...form, semanasGestacaoNoNascimento: parseInt(e.target.value, 10) })
                }
              />
            </label>
          )}

          <button type="submit" className="profile-screen__submit">
            Guardar
          </button>
        </form>

        <aside className="profile-screen__age-card">
          <h2>Idade atual</h2>
          <div className="profile-screen__age-value">
            {resultado.idadeCronologicaMeses.toFixed(1)} meses
            <span className="profile-screen__age-label">cronológica</span>
          </div>

          {resultado.aplicaCorrecao && (
            <>
              <div className="profile-screen__age-value profile-screen__age-value--corrected">
                {resultado.idadeCorrigidaMeses.toFixed(1)} meses
                <span className="profile-screen__age-label">corrigida (usada nos módulos)</span>
              </div>
              <p className="profile-screen__age-note">
                Nasceu {resultado.semanasPrematuridade.toFixed(0)} semanas antes do termo. Até aos
                24 meses de idade cronológica, é a idade <strong>corrigida</strong> que a app usa
                para posicionar {form.nome || "a criança"} nas curvas de crescimento e nos marcos
                de desenvolvimento — é a prática recomendada pela Academia Americana de Pediatria.
              </p>
              <p className="profile-screen__age-note profile-screen__age-note--warn">
                Exceção: o calendário de vacinação segue sempre a idade cronológica, nunca a
                corrigida.
              </p>
            </>
          )}

          {!resultado.aplicaCorrecao && form.prematura && (
            <p className="profile-screen__age-note">
              A partir dos 24 meses de idade cronológica, deixa de se aplicar correção — a app já
              usa apenas a idade cronológica.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
