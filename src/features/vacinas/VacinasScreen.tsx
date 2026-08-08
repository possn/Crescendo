import { useMemo, useState } from "react";
import type { Crianca, VacinaAdministrada } from "../../types";
import { DOSES_PNV } from "../../data/vacinas/pnv";
import { calcularIdade } from "../../lib/correctedAge";
import { SeccaoColapsavel } from "../../components/SeccaoColapsavel";
import "./VacinasScreen.css";

interface VacinasScreenProps {
  crianca: Crianca;
  vacinasAdministradas: VacinaAdministrada[];
  onRegistar: (doseId: string, data: string) => void;
  onRemover: (id: string) => void;
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

export function VacinasScreen({ crianca, vacinasAdministradas, onRegistar, onRemover }: VacinasScreenProps) {
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

  return (
    <div className="vacinas-screen">
      <header className="vacinas-screen__header">
        <h1>Vacinas — PNV</h1>
        <p className="vacinas-screen__subtitle">
          Programa Nacional de Vacinação (DGS) para {crianca.nome}, 0 aos 5 anos. Marque as doses
          já administradas e a data — fica guardado só neste dispositivo.
        </p>
        <div className="vacinas-screen__progresso">
          <div className="vacinas-screen__progresso-barra">
            <div
              className="vacinas-screen__progresso-fill"
              style={{ width: `${(totalRegistadas / totalDoses) * 100}%` }}
            />
          </div>
          <span>{totalRegistadas} de {totalDoses} doses registadas</span>
        </div>
      </header>

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
        O PNV é dinâmico e atualizado periodicamente pela DGS. Este calendário reflete o esquema
        em vigor à data da última revisão — em caso de dúvida, confirme sempre em dgs.pt ou com o
        seu médico/enfermeiro de família. Isto não substitui o boletim de vacinas oficial nem o
        registo no sistema SI-VACINAS.
      </p>
    </div>
  );
}
