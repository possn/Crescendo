import { useMemo, useRef, useState } from "react";
import type { Crianca, RegistoConsulta, DuvidaConsulta } from "../../types";
import { ETAPAS_CONSULTA } from "../../data/consultas/etapasConsulta";
import { calcularIdade } from "../../lib/correctedAge";
import { SeccaoColapsavel } from "../../components/SeccaoColapsavel";
import "./ConsultasScreen.css";

interface ConsultasScreenProps {
  crianca: Crianca;
  registos: RegistoConsulta[];
  duvidas: DuvidaConsulta[];
  onAdicionarRegisto: (r: RegistoConsulta) => void;
  onRemoverRegisto: (id: string) => void;
  onAdicionarDuvida: (d: DuvidaConsulta) => void;
  onAlternarDuvida: (id: string) => void;
  onRemoverDuvida: (id: string) => void;
}

export function ConsultasScreen({
  crianca,
  registos,
  duvidas,
  onAdicionarRegisto,
  onRemoverRegisto,
  onAdicionarDuvida,
  onAlternarDuvida,
  onRemoverDuvida,
}: ConsultasScreenProps) {
  const idadeMeses = calcularIdade(
    crianca.dataNascimento,
    new Date().toISOString(),
    crianca.prematura,
    crianca.semanasGestacaoNoNascimento
  ).idadeCorrigidaMeses;

  const etapaMaisProxima = useMemo(
    () =>
      ETAPAS_CONSULTA.reduce((maisProxima, atual) =>
        Math.abs(atual.idadeMesesAprox - idadeMeses) < Math.abs(maisProxima.idadeMesesAprox - idadeMeses)
          ? atual
          : maisProxima
      ).id,
    [idadeMeses]
  );
  const [abertas, setAbertas] = useState<Set<string>>(() => new Set([etapaMaisProxima]));
  const [novaDuvida, setNovaDuvida] = useState<Record<string, string>>({});
  const inputFotoRef = useRef<HTMLInputElement>(null);
  const [etapaACarregarFoto, setEtapaACarregarFoto] = useState<string | null>(null);
  const [aCarregar, setACarregar] = useState(false);
  const [aVisualizar, setAVisualizar] = useState<RegistoConsulta | null>(null);

  function alternar(etapaId: string) {
    setAbertas((prev) => {
      const novo = new Set(prev);
      if (novo.has(etapaId)) novo.delete(etapaId);
      else novo.add(etapaId);
      return novo;
    });
  }

  function iniciarUploadFoto(etapaId: string) {
    setEtapaACarregarFoto(etapaId);
    inputFotoRef.current?.click();
  }

  function handleFoto(files: FileList | null) {
    if (!files || files.length === 0 || !etapaACarregarFoto) return;
    setACarregar(true);
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      onAdicionarRegisto({
        id: crypto.randomUUID(),
        criancaId: crianca.id,
        etapaId: etapaACarregarFoto,
        data: new Date().toISOString().slice(0, 10),
        dataUrl: reader.result as string,
      });
      setACarregar(false);
      setEtapaACarregarFoto(null);
    };
    reader.readAsDataURL(file);
  }

  function adicionarDuvida(etapaId: string) {
    const texto = (novaDuvida[etapaId] ?? "").trim();
    if (!texto) return;
    onAdicionarDuvida({
      id: crypto.randomUUID(),
      criancaId: crianca.id,
      etapaId,
      texto,
      respondida: false,
    });
    setNovaDuvida((prev) => ({ ...prev, [etapaId]: "" }));
  }

  return (
    <div className="consultas-screen">
      <header className="consultas-screen__header">
        <h1>Consultas de Vigilância</h1>
        <p className="consultas-screen__subtitle">
          Calendário de idades-chave do Programa Nacional de Saúde Infantil e Juvenil (DGS), para{" "}
          {crianca.nome}. Guarde um registo da observação (ex.: foto do boletim) e vá apontando
          dúvidas para não se esquecer na consulta seguinte.
        </p>
        <p className="consultas-screen__nota">
          As idades não são rígidas — se a consulta acontecer um pouco antes ou depois, use a
          etapa mais próxima.
        </p>
      </header>

      <input
        ref={inputFotoRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={(e) => handleFoto(e.target.files)}
      />

      {ETAPAS_CONSULTA.map((etapa) => {
        const registosDaEtapa = registos.filter((r) => r.etapaId === etapa.id);
        const duvidasDaEtapa = duvidas.filter((d) => d.etapaId === etapa.id);
        const duvidasPorResponder = duvidasDaEtapa.filter((d) => !d.respondida).length;

        return (
          <SeccaoColapsavel
            key={etapa.id}
            titulo={etapa.idadeLabel}
            cor="var(--accent-strong)"
            contagem={registosDaEtapa.length + duvidasDaEtapa.length}
            aberta={abertas.has(etapa.id)}
            onToggle={() => alternar(etapa.id)}
          >
            <div className="consultas-screen__bloco">
              <h3>Registo da consulta</h3>
              {registosDaEtapa.length > 0 && (
                <div className="consultas-screen__fotos">
                  {registosDaEtapa.map((r) => (
                    <button
                      key={r.id}
                      className="consultas-screen__foto-thumb"
                      onClick={() => setAVisualizar(r)}
                    >
                      <img src={r.dataUrl} alt="" />
                    </button>
                  ))}
                </div>
              )}
              <button
                className="consultas-screen__btn-foto"
                onClick={() => iniciarUploadFoto(etapa.id)}
                disabled={aCarregar}
              >
                {aCarregar && etapaACarregarFoto === etapa.id
                  ? "A carregar…"
                  : "+ Adicionar foto (ex.: boletim de saúde)"}
              </button>
            </div>

            <div className="consultas-screen__bloco">
              <h3>
                Dúvidas para esta consulta
                {duvidasPorResponder > 0 && (
                  <span className="consultas-screen__contagem-duvidas">{duvidasPorResponder}</span>
                )}
              </h3>
              {duvidasDaEtapa.map((d) => (
                <div key={d.id} className="consultas-screen__duvida">
                  <label>
                    <input
                      type="checkbox"
                      checked={d.respondida}
                      onChange={() => onAlternarDuvida(d.id)}
                    />
                    <span className={d.respondida ? "consultas-screen__duvida-texto--feita" : ""}>
                      {d.texto}
                    </span>
                  </label>
                  <button
                    className="consultas-screen__duvida-remover"
                    onClick={() => onRemoverDuvida(d.id)}
                    aria-label="Remover"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="consultas-screen__nova-duvida">
                <input
                  type="text"
                  placeholder="Escrever uma dúvida…"
                  value={novaDuvida[etapa.id] ?? ""}
                  onChange={(e) => setNovaDuvida((prev) => ({ ...prev, [etapa.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && adicionarDuvida(etapa.id)}
                />
                <button onClick={() => adicionarDuvida(etapa.id)}>Adicionar</button>
              </div>
            </div>
          </SeccaoColapsavel>
        );
      })}

      {aVisualizar && (
        <div className="consultas-screen__lightbox" onClick={() => setAVisualizar(null)}>
          <img src={aVisualizar.dataUrl} alt="" onClick={(e) => e.stopPropagation()} />
          <button
            className="consultas-screen__lightbox-remover"
            onClick={(e) => {
              e.stopPropagation();
              onRemoverRegisto(aVisualizar.id);
              setAVisualizar(null);
            }}
          >
            Remover foto
          </button>
        </div>
      )}
    </div>
  );
}
