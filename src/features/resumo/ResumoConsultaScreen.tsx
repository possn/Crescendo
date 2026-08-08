import { useMemo } from "react";
import type {
  Crianca,
  MedicaoCrescimento,
  TabelaReferenciaOMS,
  VacinaAdministrada,
  DuvidaConsulta,
} from "../../types";
import { calcularIdade } from "../../lib/correctedAge";
import { calcularZScoreEPercentil } from "../../lib/growthCalculations";
import { MARCOS_CDC, IDADES_CHECKLIST_MESES } from "../../data/milestones/cdcMilestones";
import { DOSES_PNV } from "../../data/vacinas/pnv";
import { ETAPAS_CONSULTA } from "../../data/consultas/etapasConsulta";
import "./ResumoConsultaScreen.css";

import wfaFemale from "../../data/who/weight_for_age_female.json";
import wfaMale from "../../data/who/weight_for_age_male.json";
import lhfaFemale from "../../data/who/length_height_for_age_female.json";
import lhfaMale from "../../data/who/length_height_for_age_male.json";
import hcfaFemale from "../../data/who/head_circumference_for_age_female.json";
import hcfaMale from "../../data/who/head_circumference_for_age_male.json";

const TABELAS = {
  F: {
    weight_for_age: wfaFemale as TabelaReferenciaOMS,
    length_height_for_age: lhfaFemale as TabelaReferenciaOMS,
    head_circumference_for_age: hcfaFemale as TabelaReferenciaOMS,
  },
  M: {
    weight_for_age: wfaMale as TabelaReferenciaOMS,
    length_height_for_age: lhfaMale as TabelaReferenciaOMS,
    head_circumference_for_age: hcfaMale as TabelaReferenciaOMS,
  },
};

function idadeEmMesesNaData(dataNascimento: string, data: string): number {
  const n = new Date(dataNascimento).getTime();
  const d = new Date(data).getTime();
  return (d - n) / (1000 * 60 * 60 * 24 * 30.4375);
}

function idadeChecklistMaisProxima(idadeMeses: number): number {
  return IDADES_CHECKLIST_MESES.reduce((maisProxima, atual) =>
    Math.abs(atual - idadeMeses) < Math.abs(maisProxima - idadeMeses) ? atual : maisProxima
  );
}

interface ResumoConsultaScreenProps {
  crianca: Crianca;
  medicoes: MedicaoCrescimento[];
  marcosAlcancados: Set<string>;
  vacinasAdministradas: VacinaAdministrada[];
  duvidasConsulta: DuvidaConsulta[];
}

export function ResumoConsultaScreen({
  crianca,
  medicoes,
  marcosAlcancados,
  vacinasAdministradas,
  duvidasConsulta,
}: ResumoConsultaScreenProps) {
  const resultadoIdade = calcularIdade(
    crianca.dataNascimento,
    new Date().toISOString(),
    crianca.prematura,
    crianca.semanasGestacaoNoNascimento
  );
  const idadeMeses = resultadoIdade.idadeCorrigidaMeses;
  const tabelas = TABELAS[crianca.sexo];

  const linhasCrescimento = useMemo(() => {
    const indicadores: { chave: keyof typeof tabelas; label: string; unidade: string; extrair: (m: MedicaoCrescimento) => number | undefined }[] = [
      { chave: "weight_for_age", label: "Peso", unidade: "kg", extrair: (m) => m.pesoKg },
      {
        chave: "length_height_for_age",
        label: "Comprimento/Altura",
        unidade: "cm",
        extrair: (m) => m.comprimentoOuAlturaCm,
      },
      {
        chave: "head_circumference_for_age",
        label: "Perímetro cefálico",
        unidade: "cm",
        extrair: (m) => m.perimetroCefalicoCm,
      },
    ];

    return indicadores.map((ind) => {
      const comValor = [...medicoes]
        .filter((m) => ind.extrair(m) !== undefined)
        .sort((a, b) => b.data.localeCompare(a.data));
      const maisRecente = comValor[0];
      if (!maisRecente) return { ...ind, semDados: true as const };

      const valor = ind.extrair(maisRecente)!;
      const idadeNaMedicao = idadeEmMesesNaData(crianca.dataNascimento, maisRecente.data);
      const resultado = calcularZScoreEPercentil(
        valor,
        tabelas[ind.chave],
        idadeNaMedicao,
        maisRecente.tipoMedicaoComprimento
      );
      return {
        ...ind,
        semDados: false as const,
        valor,
        data: maisRecente.data,
        percentil: resultado?.percentil,
      };
    });
  }, [medicoes, crianca.dataNascimento, tabelas]);

  const idadeChecklist = idadeChecklistMaisProxima(idadeMeses);
  const marcosDaEtapa = MARCOS_CDC.filter((m) => m.idadeReferenciaMeses === idadeChecklist);
  const marcosFeitos = marcosDaEtapa.filter((m) => marcosAlcancados.has(m.id));
  const marcosPorFazer = marcosDaEtapa.filter((m) => !marcosAlcancados.has(m.id));

  const dosesDevidas = DOSES_PNV.filter((d) => d.idadeMesesAprox <= idadeMeses);
  const idsRegistados = new Set(vacinasAdministradas.map((v) => v.doseId));
  const dosesPendentes = dosesDevidas.filter((d) => !idsRegistados.has(d.id));

  const duvidasPorResponder = duvidasConsulta.filter((d) => !d.respondida);
  const etapaLabel = (etapaId: string) => ETAPAS_CONSULTA.find((e) => e.id === etapaId)?.idadeLabel ?? "";

  const hoje = new Date().toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div className="resumo-screen">
      <div className="resumo-screen__acoes-tela">
        <button className="resumo-screen__btn-imprimir" onClick={() => window.print()}>
          🖨️ Imprimir / Guardar em PDF
        </button>
        <p className="resumo-screen__dica-tela">
          No iPhone: toque em Imprimir, depois faça beliscão (pinch) para dentro na pré-visualização
          para gerar o PDF, e use o botão de partilha para guardar ou enviar.
        </p>
      </div>

      <div className="resumo-screen__folha">
        <header className="resumo-screen__cabecalho">
          <h1>Resumo para a Consulta</h1>
          <p className="resumo-screen__gerado">Gerado em {hoje} — app Crescendo</p>
        </header>

        <section className="resumo-screen__dados-crianca">
          <span>
            <strong>{crianca.nome}</strong>
          </span>
          <span>{crianca.sexo === "F" ? "Feminino" : "Masculino"}</span>
          <span>Nasc.: {new Date(crianca.dataNascimento).toLocaleDateString("pt-PT")}</span>
          <span>
            Idade atual: {idadeMeses < 24 ? `${idadeMeses.toFixed(1)} meses` : `${(idadeMeses / 12).toFixed(1)} anos`}
            {resultadoIdade.aplicaCorrecao ? " (corrigida)" : ""}
          </span>
        </section>

        <section className="resumo-screen__seccao">
          <h2>Crescimento — última medição</h2>
          <table className="resumo-screen__tabela">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Percentil OMS</th>
              </tr>
            </thead>
            <tbody>
              {linhasCrescimento.map((l) => (
                <tr key={l.label}>
                  <td>{l.label}</td>
                  {l.semDados ? (
                    <td colSpan={3} className="resumo-screen__sem-dados">
                      Sem medições registadas
                    </td>
                  ) : (
                    <>
                      <td>
                        {l.valor.toFixed(1)} {l.unidade}
                      </td>
                      <td>{new Date(l.data).toLocaleDateString("pt-PT")}</td>
                      <td>{l.percentil !== undefined ? `P${Math.round(l.percentil)}` : "—"}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="resumo-screen__seccao">
          <h2>
            Marcos de Desenvolvimento — etapa dos {idadeChecklist} meses ({marcosFeitos.length} de{" "}
            {marcosDaEtapa.length} marcados)
          </h2>
          {marcosPorFazer.length > 0 ? (
            <>
              <p className="resumo-screen__nota-seccao">Ainda não marcados nesta etapa:</p>
              <ul className="resumo-screen__lista">
                {marcosPorFazer.map((m) => (
                  <li key={m.id}>{m.descricao}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="resumo-screen__nota-seccao">Todos os marcos desta etapa estão marcados.</p>
          )}
        </section>

        <section className="resumo-screen__seccao">
          <h2>
            Vacinas — PNV ({dosesDevidas.length - dosesPendentes.length} de {dosesDevidas.length} em dia)
          </h2>
          {dosesPendentes.length > 0 ? (
            <ul className="resumo-screen__lista">
              {dosesPendentes.map((d) => (
                <li key={d.id}>
                  {d.vacina} — {d.doseLabel} ({d.idadeLabel})
                </li>
              ))}
            </ul>
          ) : (
            <p className="resumo-screen__nota-seccao">Em dia com o calendário, pela idade atual.</p>
          )}
        </section>

        <section className="resumo-screen__seccao">
          <h2>Dúvidas para esta consulta</h2>
          {duvidasPorResponder.length > 0 ? (
            <ul className="resumo-screen__lista resumo-screen__lista--duvidas">
              {duvidasPorResponder.map((d) => (
                <li key={d.id}>
                  {d.texto}
                  <span className="resumo-screen__duvida-etapa"> ({etapaLabel(d.etapaId)})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="resumo-screen__nota-seccao">Nenhuma dúvida pendente registada.</p>
          )}
        </section>

        <p className="resumo-screen__rodape">
          Gerado pela app Crescendo — apoio informativo, não substitui a avaliação do pediatra.
        </p>
      </div>
    </div>
  );
}
