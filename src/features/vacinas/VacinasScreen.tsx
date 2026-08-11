import { useMemo, useState } from "react";
import type { Crianca, VacinaAdministrada, VacinaExtraAdministrada } from "../../types";
import { DOSES_PNV } from "../../data/vacinas/pnv";
import { VACINAS_EXTRA_PLANO } from "../../data/vacinas/extraPlano";
import { calcularIdade } from "../../lib/correctedAge";
import { SeccaoColapsavel } from "../../components/SeccaoColapsavel";
import "./VacinasScreen.css";

interface VacinasScreenProps {
  crianca: Crianca;
  vacinasAdministradas: VacinaAdministrada[];
  onRegistar: (doseId: string, data: string) => void;
  onRemover: (id: string) => void;
  vacinasExtraAdministradas: VacinaExtraAdministrada[];
  onRegistarExtra: (vacinaId: string, data: string, nomePersonalizado?: string) => void;
  onRemoverExtra: (id: string) => void;
}

// Agrupa mantendo a ordem cronológica já definida em DOSES_PNV.
function agruparPorIdade() {
  const grupos: { idadeLabel: string; idadeMesesAprox: number; doses: typeof DOSES_PNV }[] = [];
  for (const dose of DOSES_PNV) {
    let grupo = grupos.find((g) => g.idadeLabel === dose.idadeLabel);
    if (!grupo) {
      grupo = { idadeLabel: dose.idadeLabel, idadeMesesAprox: dose.idadeMesesAprox, doses: [] };
      grupos.push(grupo);
    }
    grupo.doses.push(dose);
  }
  return grupos;
}

const GRUPOS = agruparPorIdade();

export function VacinasScreen({
  crianca,
  vacinasAdministradas,
  onRegistar,
  onRemover,
  vacinasExtraAdministradas,
  onRegistarExtra,
  onRemoverExtra,
}: VacinasScreenProps) {
  const [aba, setAba] = useState<"pnv" | "extra">("pnv");

  const idadeMeses = calcularIdade(
    crianca.dataNascimento,
    new Date().toISOString(),
    crianca.prematura,
    crianca.semanasGestacaoNoNascimento
  ).idadeCorrigidaMeses;

  const grupoMaisProximo = useMemo(
    () =>
      GRUPOS.reduce((maisProximo, atual) =>
        Math.abs(atual.idadeMesesAprox - idadeMeses) < Math.abs(maisProximo.idadeMesesAprox - idadeMeses)
          ? atual
          : maisProximo
      ).idadeLabel,
    [idadeMeses]
  );
  const [abertas, setAbertas] = useState<Set<string>>(() => new Set([grupoMaisProximo]));

  function alternar(idadeLabel: string) {
    setAbertas((prev) => {
      const novo = new Set(prev);
      if (novo.has(idadeLabel)) novo.delete(idadeLabel);
      else novo.add(idadeLabel);
      return novo;
    });
  }

  const [abertasExtra, setAbertasExtra] = useState<Set<string>>(() => new Set(["extra-pnv", "viagem"]));
  function alternarExtra(id: string) {
    setAbertasExtra((prev) => {
      const novo = new Set(prev);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });
  }

  const [dataEmEdicao, setDataEmEdicao] = useState<string | null>(null);
  const [dataInput, setDataInput] = useState(new Date().toISOString().slice(0, 10));

  const registoPorDose = useMemo(() => {
    const mapa = new Map<string, VacinaAdministrada>();
    for (const v of vacinasAdministradas) mapa.set(v.doseId, v);
    return mapa;
  }, [vacinasAdministradas]);

  const totalDoses = DOSES_PNV.length;
  const totalRegistadas = vacinasAdministradas.length;

  function iniciarRegisto(doseId: string) {
    setDataEmEdicao(doseId);
    setDataInput(new Date().toISOString().slice(0, 10));
  }

  function confirmarRegisto(doseId: string) {
    onRegistar(doseId, dataInput);
    setDataEmEdicao(null);
  }

  // ---- Extra-Plano ----
  const [extraEmEdicao, setExtraEmEdicao] = useState<string | null>(null);
  const [extraDataInput, setExtraDataInput] = useState(new Date().toISOString().slice(0, 10));
  const [outraNome, setOutraNome] = useState("");

  function iniciarRegistoExtra(vacinaId: string) {
    setExtraEmEdicao(vacinaId);
    setExtraDataInput(new Date().toISOString().slice(0, 10));
  }

  function confirmarRegistoExtra(vacinaId: string) {
    onRegistarExtra(vacinaId, extraDataInput);
    setExtraEmEdicao(null);
  }

  function confirmarOutra() {
    if (!outraNome.trim()) return;
    onRegistarExtra("outras", extraDataInput, outraNome.trim());
    setExtraEmEdicao(null);
    setOutraNome("");
  }

  const extraPnv = VACINAS_EXTRA_PLANO.filter((v) => v.categoria === "extra-pnv");
  const extraViagem = VACINAS_EXTRA_PLANO.filter((v) => v.categoria === "viagem");
  const outrasRegistadas = vacinasExtraAdministradas.filter((v) => v.vacinaId === "outras");

  function registosDeVacina(vacinaId: string) {
    return vacinasExtraAdministradas.filter((v) => v.vacinaId === vacinaId);
  }

  return (
    <div className="vacinas-screen">
      <header className="vacinas-screen__header">
        <h1>Vacinas</h1>
        <p className="vacinas-screen__subtitle">
          Registo de vacinação de {crianca.nome} — fica guardado só neste dispositivo.
        </p>
        <div className="vacinas-screen__abas">
          <button
            className={"vacinas-screen__aba" + (aba === "pnv" ? " vacinas-screen__aba--ativa" : "")}
            onClick={() => setAba("pnv")}
          >
            PNV
          </button>
          <button
            className={"vacinas-screen__aba" + (aba === "extra" ? " vacinas-screen__aba--ativa" : "")}
            onClick={() => setAba("extra")}
          >
            Extra-Plano
          </button>
        </div>
      </header>

      {aba === "pnv" && (
        <>
          <div className="vacinas-screen__progresso">
            <div className="vacinas-screen__progresso-barra">
              <div
                className="vacinas-screen__progresso-fill"
                style={{ width: `${(totalRegistadas / totalDoses) * 100}%` }}
              />
            </div>
            <span>{totalRegistadas} de {totalDoses} doses registadas</span>
          </div>

          {GRUPOS.map((grupo) => {
            const emAtraso = idadeMeses > grupo.idadeMesesAprox + 1;
            const registadasDoGrupo = grupo.doses.filter((d) => registoPorDose.has(d.id)).length;
            const corGrupo =
              emAtraso && registadasDoGrupo < grupo.doses.length ? "var(--warn-strong)" : "var(--accent-strong)";
            return (
              <SeccaoColapsavel
                key={grupo.idadeLabel}
                titulo={grupo.idadeLabel}
                cor={corGrupo}
                contagem={grupo.doses.length}
                aberta={abertas.has(grupo.idadeLabel)}
                onToggle={() => alternar(grupo.idadeLabel)}
              >
                <div className="vacinas-screen__doses">
                  {grupo.doses.map((dose) => {
                    const registo = registoPorDose.get(dose.id);
                    const feito = !!registo;
                    const atrasada = !feito && emAtraso;
                    return (
                      <div
                        key={dose.id}
                        className={
                          "vacinas-screen__dose" +
                          (feito ? " vacinas-screen__dose--feito" : "") +
                          (atrasada ? " vacinas-screen__dose--atrasada" : "")
                        }
                      >
                        <div className="vacinas-screen__dose-info">
                          <span className="vacinas-screen__dose-nome">
                            {dose.vacina} <span className="vacinas-screen__dose-label">· {dose.doseLabel}</span>
                          </span>
                          <span className="vacinas-screen__dose-doencas">{dose.doencasPrevenidas}</span>
                          {dose.notaEspecial && (
                            <span className="vacinas-screen__dose-nota">{dose.notaEspecial}</span>
                          )}
                          {feito && registo && (
                            <span className="vacinas-screen__dose-data">
                              ✓ Administrada em {new Date(registo.dataAdministracao).toLocaleDateString("pt-PT")}
                            </span>
                          )}
                          {atrasada && !feito && (
                            <span className="vacinas-screen__dose-aviso">Idade recomendada já passou</span>
                          )}
                        </div>

                        {feito && registo ? (
                          <button
                            className="vacinas-screen__dose-desfazer"
                            onClick={() => onRemover(registo.id)}
                          >
                            Desfazer
                          </button>
                        ) : dataEmEdicao === dose.id ? (
                          <div className="vacinas-screen__dose-editor">
                            <input
                              type="date"
                              value={dataInput}
                              onChange={(e) => setDataInput(e.target.value)}
                            />
                            <button onClick={() => confirmarRegisto(dose.id)}>Guardar</button>
                          </div>
                        ) : (
                          <button
                            className="vacinas-screen__dose-marcar"
                            onClick={() => iniciarRegisto(dose.id)}
                          >
                            Marcar como feita
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </SeccaoColapsavel>
            );
          })}

          <p className="vacinas-screen__disclaimer">
            O PNV é dinâmico e atualizado periodicamente pela DGS. Este calendário reflete o
            esquema em vigor à data da última revisão — em caso de dúvida, confirme sempre em
            dgs.pt ou com o seu médico/enfermeiro de família. Isto não substitui o boletim de
            vacinas oficial nem o registo no sistema SI-VACINAS.
          </p>
        </>
      )}

      {aba === "extra" && (
        <>
          <p className="vacinas-screen__extra-intro">
            Vacinas fora do Programa Nacional de Vacinação — prescritas por indicação médica,
            pagas pelos pais, decididas em conjunto com o pediatra.
          </p>

          <SeccaoColapsavel titulo="Vacinas Extra-PNV" cor="var(--ind-perimetro)" contagem={extraPnv.length} aberta={abertasExtra.has("extra-pnv")} onToggle={() => alternarExtra("extra-pnv")}>
            <div className="vacinas-screen__doses">
              {extraPnv.map((v) => (
                <div key={v.id} className="vacinas-screen__extra-item">
                  <span className="vacinas-screen__dose-nome">{v.nome}</span>
                  <span className="vacinas-screen__dose-doencas">{v.doencasPrevenidas}</span>
                  <span className="vacinas-screen__extra-detalhe">
                    <strong>Idade recomendada:</strong> {v.idadeRecomendada}
                  </span>
                  <span className="vacinas-screen__extra-detalhe">
                    <strong>Esquema:</strong> {v.esquema}
                  </span>
                  {v.nota && <span className="vacinas-screen__dose-nota">{v.nota}</span>}

                  {registosDeVacina(v.id).map((r) => (
                    <div key={r.id} className="vacinas-screen__extra-registo">
                      <span>✓ {new Date(r.dataAdministracao).toLocaleDateString("pt-PT")}</span>
                      <button onClick={() => onRemoverExtra(r.id)}>Desfazer</button>
                    </div>
                  ))}

                  {extraEmEdicao === v.id ? (
                    <div className="vacinas-screen__dose-editor">
                      <input
                        type="date"
                        value={extraDataInput}
                        onChange={(e) => setExtraDataInput(e.target.value)}
                      />
                      <button onClick={() => confirmarRegistoExtra(v.id)}>Guardar</button>
                    </div>
                  ) : (
                    <button className="vacinas-screen__dose-marcar" onClick={() => iniciarRegistoExtra(v.id)}>
                      + Registar dose
                    </button>
                  )}
                </div>
              ))}
            </div>
          </SeccaoColapsavel>

          <SeccaoColapsavel titulo="Vacinas de Viagem" cor="var(--ind-comprimento)" contagem={extraViagem.length} aberta={abertasExtra.has("viagem")} onToggle={() => alternarExtra("viagem")}>
            <div className="vacinas-screen__doses">
              {extraViagem.map((v) => (
                <div key={v.id} className="vacinas-screen__extra-item">
                  <span className="vacinas-screen__dose-nome">{v.nome}</span>
                  <span className="vacinas-screen__dose-doencas">{v.doencasPrevenidas}</span>
                  <span className="vacinas-screen__extra-detalhe">
                    <strong>Idade recomendada:</strong> {v.idadeRecomendada}
                  </span>
                  <span className="vacinas-screen__extra-detalhe">
                    <strong>Esquema:</strong> {v.esquema}
                  </span>
                  {v.nota && <span className="vacinas-screen__dose-nota">{v.nota}</span>}

                  {registosDeVacina(v.id).map((r) => (
                    <div key={r.id} className="vacinas-screen__extra-registo">
                      <span>✓ {new Date(r.dataAdministracao).toLocaleDateString("pt-PT")}</span>
                      <button onClick={() => onRemoverExtra(r.id)}>Desfazer</button>
                    </div>
                  ))}

                  {extraEmEdicao === v.id ? (
                    <div className="vacinas-screen__dose-editor">
                      <input
                        type="date"
                        value={extraDataInput}
                        onChange={(e) => setExtraDataInput(e.target.value)}
                      />
                      <button onClick={() => confirmarRegistoExtra(v.id)}>Guardar</button>
                    </div>
                  ) : (
                    <button className="vacinas-screen__dose-marcar" onClick={() => iniciarRegistoExtra(v.id)}>
                      + Registar dose
                    </button>
                  )}
                </div>
              ))}
            </div>
          </SeccaoColapsavel>

          <section className="vacinas-screen__outras">
            <h3>Outras</h3>
            <p className="vacinas-screen__extra-detalhe">
              Para vacinas menos comuns não listadas acima (ex.: encefalite japonesa, cólera,
              meningocócica B fora do PNV para adultos, etc.)
            </p>
            {outrasRegistadas.map((r) => (
              <div key={r.id} className="vacinas-screen__extra-registo">
                <span>
                  ✓ {r.nomePersonalizado} — {new Date(r.dataAdministracao).toLocaleDateString("pt-PT")}
                </span>
                <button onClick={() => onRemoverExtra(r.id)}>Desfazer</button>
              </div>
            ))}
            {extraEmEdicao === "outras" ? (
              <div className="vacinas-screen__outra-form">
                <input
                  type="text"
                  placeholder="Nome da vacina"
                  value={outraNome}
                  onChange={(e) => setOutraNome(e.target.value)}
                />
                <input
                  type="date"
                  value={extraDataInput}
                  onChange={(e) => setExtraDataInput(e.target.value)}
                />
                <button onClick={confirmarOutra}>Guardar</button>
              </div>
            ) : (
              <button className="vacinas-screen__dose-marcar" onClick={() => iniciarRegistoExtra("outras")}>
                + Adicionar outra vacina
              </button>
            )}
          </section>

          <p className="vacinas-screen__disclaimer">
            Estas vacinas exigem sempre prescrição e indicação médica — fale com o pediatra sobre
            quais fazem sentido para {crianca.nome}. Fonte: SIP-SPP — Recomendações sobre Vacinas
            Extra Programa Nacional de Vacinação.
          </p>
        </>
      )}
    </div>
  );
}
