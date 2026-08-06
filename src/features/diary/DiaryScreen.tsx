import { useMemo, useRef, useState } from "react";
import type { Crianca, EntradaDiario } from "../../types";
import { MARCOS_CDC } from "../../data/milestones/cdcMilestones";
import "./DiaryScreen.css";

interface DiaryScreenProps {
  crianca: Crianca;
  entradas: EntradaDiario[];
  onAdicionar: (e: EntradaDiario) => void;
  onRemover: (id: string) => void;
  onAtualizarLegenda: (id: string, legenda: string) => void;
  onAssociarMarco: (id: string, marcoId: string | undefined) => void;
}

function idadeEmMesesNaData(dataNascimento: string, data: string): number {
  const n = new Date(dataNascimento).getTime();
  const d = new Date(data).getTime();
  return (d - n) / (1000 * 60 * 60 * 24 * 30.4375);
}

function agruparPorIdade(entradas: EntradaDiario[], dataNascimento: string) {
  const grupos = new Map<number, EntradaDiario[]>();
  for (const e of entradas) {
    const meses = Math.max(0, Math.floor(idadeEmMesesNaData(dataNascimento, e.data)));
    if (!grupos.has(meses)) grupos.set(meses, []);
    grupos.get(meses)!.push(e);
  }
  return Array.from(grupos.entries())
    .sort((a, b) => b[0] - a[0]) // mais recente primeiro
    .map(([meses, items]) => ({
      meses,
      items: items.sort((a, b) => b.data.localeCompare(a.data)),
    }));
}

export function DiaryScreen({
  crianca,
  entradas,
  onAdicionar,
  onRemover,
  onAtualizarLegenda,
  onAssociarMarco,
}: DiaryScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [aVisualizar, setAVisualizar] = useState<EntradaDiario | null>(null);
  const [aCarregar, setACarregar] = useState(false);

  const entradasDaCrianca = useMemo(
    () => entradas.filter((e) => e.criancaId === crianca.id),
    [entradas, crianca.id]
  );
  const grupos = useMemo(
    () => agruparPorIdade(entradasDaCrianca, crianca.dataNascimento),
    [entradasDaCrianca, crianca.dataNascimento]
  );

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setACarregar(true);
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        onAdicionar({
          id: crypto.randomUUID(),
          criancaId: crianca.id,
          data: new Date().toISOString().slice(0, 10),
          tipo: file.type.startsWith("video") ? "video" : "foto",
          dataUrl: reader.result as string,
        });
        setACarregar(false);
      };
      reader.readAsDataURL(file);
    });
  }

  const marcosParaAssociar = (meses: number) =>
    MARCOS_CDC.filter((m) => Math.abs(m.idadeReferenciaMeses - meses) <= 6);

  return (
    <div className="diary-screen">
      <header className="diary-screen__header">
        <h1>Diário Visual</h1>
        <p className="diary-screen__subtitle">
          Fotos e vídeos de {crianca.nome}, organizados por idade. Pode associar qualquer registo a
          um marco de desenvolvimento — útil para mostrar ao pediatra na consulta.
        </p>
      </header>

      <div className="diary-screen__upload">
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          capture="environment"
          onChange={(e) => handleFiles(e.target.files)}
          hidden
        />
        <button
          className="diary-screen__upload-btn"
          onClick={() => inputRef.current?.click()}
          disabled={aCarregar}
        >
          {aCarregar ? "A carregar…" : "+ Adicionar foto ou vídeo"}
        </button>
        <span className="diary-screen__upload-hint">
          No telemóvel, isto abre diretamente a câmara ou a galeria.
        </span>
      </div>

      {grupos.length === 0 ? (
        <div className="diary-screen__empty">
          Ainda não há fotos nem vídeos. Adicione o primeiro registo de {crianca.nome} acima.
        </div>
      ) : (
        grupos.map(({ meses, items }) => (
          <section key={meses} className="diary-screen__group">
            <h2>{meses === 0 ? "Recém-nascido(a)" : `${meses} ${meses === 1 ? "mês" : "meses"}`}</h2>
            <div className="diary-screen__grid">
              {items.map((entrada) => (
                <button
                  key={entrada.id}
                  className="diary-screen__thumb"
                  onClick={() => setAVisualizar(entrada)}
                >
                  {entrada.tipo === "foto" ? (
                    <img src={entrada.dataUrl} alt={entrada.legenda ?? ""} />
                  ) : (
                    <video src={entrada.dataUrl} muted />
                  )}
                  {entrada.tipo === "video" && <span className="diary-screen__play-badge">▶</span>}
                  {entrada.marcoId && <span className="diary-screen__marco-badge">✓ marco</span>}
                </button>
              ))}
            </div>
          </section>
        ))
      )}

      {aVisualizar && (
        <div className="diary-screen__lightbox" onClick={() => setAVisualizar(null)}>
          <div className="diary-screen__lightbox-content" onClick={(e) => e.stopPropagation()}>
            {aVisualizar.tipo === "foto" ? (
              <img src={aVisualizar.dataUrl} alt={aVisualizar.legenda ?? ""} />
            ) : (
              <video src={aVisualizar.dataUrl} controls autoPlay />
            )}

            <label className="diary-screen__field">
              <span>Legenda</span>
              <input
                type="text"
                value={aVisualizar.legenda ?? ""}
                placeholder="ex.: Primeira vez a sentar sem apoio"
                onChange={(e) => onAtualizarLegenda(aVisualizar.id, e.target.value)}
              />
            </label>

            <label className="diary-screen__field">
              <span>Associar a um marco (opcional)</span>
              <select
                value={aVisualizar.marcoId ?? ""}
                onChange={(e) => onAssociarMarco(aVisualizar.id, e.target.value || undefined)}
              >
                <option value="">— nenhum —</option>
                {marcosParaAssociar(
                  Math.floor(idadeEmMesesNaData(crianca.dataNascimento, aVisualizar.data))
                ).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.descricao}
                  </option>
                ))}
              </select>
            </label>

            <div className="diary-screen__lightbox-actions">
              <button
                className="diary-screen__delete"
                onClick={() => {
                  onRemover(aVisualizar.id);
                  setAVisualizar(null);
                }}
              >
                Eliminar
              </button>
              <button className="diary-screen__close" onClick={() => setAVisualizar(null)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
