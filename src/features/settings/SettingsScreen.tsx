import { useState } from "react";
import { exportarTudo, apagarTudo } from "../../lib/persistence";
import type { Crianca, Preferencias, Unidades, Tema } from "../../types";
import "./SettingsScreen.css";

interface SettingsScreenProps {
  onDadosApagados: () => void;
  criancas: Crianca[];
  criancaAtivaId: string;
  onMudarCrianca: (id: string) => void;
  onAdicionarCrianca: (c: Crianca) => void;
  onApagarCrianca: (id: string) => void;
  preferencias: Preferencias;
  onAtualizarPreferencias: (p: Preferencias) => void;
}

export function SettingsScreen({
  onDadosApagados,
  criancas,
  criancaAtivaId,
  onMudarCrianca,
  onAdicionarCrianca,
  onApagarCrianca,
  preferencias,
  onAtualizarPreferencias,
}: SettingsScreenProps) {
  const [confirmacaoApagar, setConfirmacaoApagar] = useState(false);
  const [aExportar, setAExportar] = useState(false);
  const [aAdicionarCrianca, setAAdicionarCrianca] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoSexo, setNovoSexo] = useState<"F" | "M">("F");
  const [novaData, setNovaData] = useState("");
  const [estadoNotificacao, setEstadoNotificacao] = useState<NotificationPermission | "indisponivel">(
    typeof Notification === "undefined" ? "indisponivel" : Notification.permission
  );

  async function exportar() {
    setAExportar(true);
    try {
      const dados = await exportarTudo();
      const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `crescendo-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setAExportar(false);
    }
  }

  async function apagar() {
    await apagarTudo();
    setConfirmacaoApagar(false);
    onDadosApagados();
  }

  function submeterNovaCrianca(e: React.FormEvent) {
    e.preventDefault();
    if (!novoNome || !novaData) return;
    onAdicionarCrianca({
      id: crypto.randomUUID(),
      nome: novoNome,
      sexo: novoSexo,
      dataNascimento: novaData,
      prematura: false,
    });
    setNovoNome("");
    setNovaData("");
    setAAdicionarCrianca(false);
  }

  async function pedirPermissaoNotificacoes() {
    if (typeof Notification === "undefined") return;
    const resultado = await Notification.requestPermission();
    setEstadoNotificacao(resultado);
    if (resultado === "granted") {
      onAtualizarPreferencias({ ...preferencias, notificacoesAtivas: true });
    }
  }

  function atualizarUnidades(unidades: Unidades) {
    onAtualizarPreferencias({ ...preferencias, unidades });
  }

  function atualizarTema(tema: Tema) {
    onAtualizarPreferencias({ ...preferencias, tema });
  }

  return (
    <div className="settings-screen">
      <header className="settings-screen__header">
        <h1>Definições</h1>
      </header>

      <section className="settings-screen__card">
        <h2>Privacidade</h2>
        <p>
          Todos os dados desta app — perfis, medições, marcos, fotos e vídeos — ficam guardados{" "}
          <strong>apenas neste dispositivo</strong>, no armazenamento local do browser. Nada é
          enviado para nenhum servidor. Não existe conta, não existe sincronização, não existe
          acesso remoto.
        </p>
        <p className="settings-screen__note">
          Isto significa também que, se desinstalar a app, limpar os dados do browser, ou trocar
          de telemóvel, os dados não vão consigo automaticamente — use "Exportar os meus dados"
          abaixo antes disso.
        </p>
      </section>

      <section className="settings-screen__card">
        <h2>Filhos</h2>
        <ul className="settings-screen__children">
          {criancas.map((c) => (
            <li key={c.id}>
              <label className="settings-screen__child-row">
                <input
                  type="radio"
                  name="crianca-ativa"
                  checked={c.id === criancaAtivaId}
                  onChange={() => onMudarCrianca(c.id)}
                />
                <span>{c.nome}</span>
              </label>
              {criancas.length > 1 && (
                <button
                  className="settings-screen__child-remove"
                  onClick={() => onApagarCrianca(c.id)}
                  aria-label={`Remover ${c.nome}`}
                >
                  Remover
                </button>
              )}
            </li>
          ))}
        </ul>

        {!aAdicionarCrianca ? (
          <button className="settings-screen__btn" onClick={() => setAAdicionarCrianca(true)}>
            + Adicionar filho
          </button>
        ) : (
          <form className="settings-screen__child-form" onSubmit={submeterNovaCrianca}>
            <input
              type="text"
              placeholder="Nome"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              required
            />
            <select value={novoSexo} onChange={(e) => setNovoSexo(e.target.value as "F" | "M")}>
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
            </select>
            <input
              type="date"
              value={novaData}
              onChange={(e) => setNovaData(e.target.value)}
              required
            />
            <div className="settings-screen__child-form-actions">
              <button type="submit" className="settings-screen__btn">
                Guardar
              </button>
              <button
                type="button"
                className="settings-screen__btn-cancel"
                onClick={() => setAAdicionarCrianca(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="settings-screen__card">
        <h2>Unidades</h2>
        <p>Aplica-se às Curvas de Crescimento — peso, comprimento/altura e perímetro cefálico.</p>
        <div className="settings-screen__toggle-group">
          <button
            className={
              "settings-screen__toggle-option" +
              (preferencias.unidades === "metrico" ? " settings-screen__toggle-option--ativo" : "")
            }
            onClick={() => atualizarUnidades("metrico")}
          >
            Métrico (kg, cm)
          </button>
          <button
            className={
              "settings-screen__toggle-option" +
              (preferencias.unidades === "imperial" ? " settings-screen__toggle-option--ativo" : "")
            }
            onClick={() => atualizarUnidades("imperial")}
          >
            Imperial (lb, in)
          </button>
        </div>
      </section>

      <section className="settings-screen__card">
        <h2>Aparência</h2>
        <div className="settings-screen__toggle-group">
          {(["sistema", "claro", "escuro"] as Tema[]).map((t) => (
            <button
              key={t}
              className={
                "settings-screen__toggle-option" +
                (preferencias.tema === t ? " settings-screen__toggle-option--ativo" : "")
              }
              onClick={() => atualizarTema(t)}
            >
              {t === "sistema" ? "Automático" : t === "claro" ? "Claro" : "Escuro"}
            </button>
          ))}
        </div>
      </section>

      <section className="settings-screen__card">
        <h2>Notificações</h2>
        <p>
          Aviso local se não houver medições novas há mais de 60 dias — só aparece com a app
          aberta ou recentemente usada.
        </p>
        <p className="settings-screen__note">
          Como esta app não tem servidor (é uma escolha deliberada de privacidade), não consegue
          enviar notificações verdadeiramente em segundo plano, tipo as de uma app da App Store —
          isso exigiria um servidor a comunicar consigo, o que iria contra o princípio de tudo
          ficar só no seu dispositivo.
        </p>
        {estadoNotificacao === "indisponivel" && (
          <p className="settings-screen__note">Notificações não estão disponíveis neste browser.</p>
        )}
        {estadoNotificacao === "granted" && (
          <label className="settings-screen__child-row">
            <input
              type="checkbox"
              checked={preferencias.notificacoesAtivas}
              onChange={(e) =>
                onAtualizarPreferencias({ ...preferencias, notificacoesAtivas: e.target.checked })
              }
            />
            <span>Ativar aviso de medições em atraso</span>
          </label>
        )}
        {estadoNotificacao === "default" && (
          <button className="settings-screen__btn" onClick={pedirPermissaoNotificacoes}>
            Permitir notificações
          </button>
        )}
        {estadoNotificacao === "denied" && (
          <p className="settings-screen__note">
            Notificações bloqueadas nas definições do browser — ative manualmente lá se quiser
            usar isto.
          </p>
        )}
      </section>

      <section className="settings-screen__card">
        <h2>Exportar os meus dados</h2>
        <p>Descarrega tudo num único ficheiro (JSON) que pode guardar ou levar ao pediatra.</p>
        <button className="settings-screen__btn" onClick={exportar} disabled={aExportar}>
          {aExportar ? "A preparar…" : "Exportar os meus dados"}
        </button>
      </section>

      <section className="settings-screen__card settings-screen__card--danger">
        <h2>Apagar todos os dados</h2>
        <p>
          Remove permanentemente tudo o que está guardado neste dispositivo — perfis, medições,
          marcos e diário visual. Não há forma de desfazer isto depois de confirmar.
        </p>
        {!confirmacaoApagar ? (
          <button className="settings-screen__btn-danger" onClick={() => setConfirmacaoApagar(true)}>
            Apagar todos os dados
          </button>
        ) : (
          <div className="settings-screen__confirm">
            <p>
              <strong>Tem a certeza?</strong> Esta ação é permanente e não pode ser desfeita.
            </p>
            <div className="settings-screen__confirm-actions">
              <button className="settings-screen__btn-danger" onClick={apagar}>
                Sim, apagar tudo
              </button>
              <button className="settings-screen__btn-cancel" onClick={() => setConfirmacaoApagar(false)}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
