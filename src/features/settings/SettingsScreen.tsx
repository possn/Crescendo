import { useState } from "react";
import { exportarTudo, apagarTudo } from "../../lib/persistence";
import "./SettingsScreen.css";

interface SettingsScreenProps {
  onDadosApagados: () => void;
}

export function SettingsScreen({ onDadosApagados }: SettingsScreenProps) {
  const [confirmacaoApagar, setConfirmacaoApagar] = useState(false);
  const [aExportar, setAExportar] = useState(false);

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
