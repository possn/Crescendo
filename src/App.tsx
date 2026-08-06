import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { GrowthCurvesScreen } from "./features/growth/GrowthCurvesScreen";
import { MilestonesScreen } from "./features/milestones/MilestonesScreen";
import { EmConstrucao } from "./features/shared/EmConstrucao";
import type { AppSection, Crianca, MedicaoCrescimento } from "./types";
import "./App.css";

// Dados de exemplo (sintéticos) só para o protótipo poder ser testado
// sem necessitar de backend. Nenhuma criança real.
const CRIANCA_EXEMPLO: Crianca = {
  id: "crianca-1",
  nome: "Matilde",
  sexo: "F",
  dataNascimento: "2025-02-10",
  prematura: false,
};

const MEDICOES_EXEMPLO: MedicaoCrescimento[] = [
  { id: "m1", criancaId: "crianca-1", data: "2025-02-10", pesoKg: 3.3, comprimentoOuAlturaCm: 49.5, tipoMedicaoComprimento: "comprimento", perimetroCefalicoCm: 34.2 },
  { id: "m2", criancaId: "crianca-1", data: "2025-04-10", pesoKg: 5.4, comprimentoOuAlturaCm: 58.0, tipoMedicaoComprimento: "comprimento", perimetroCefalicoCm: 38.5 },
  { id: "m3", criancaId: "crianca-1", data: "2025-08-10", pesoKg: 7.6, comprimentoOuAlturaCm: 67.0, tipoMedicaoComprimento: "comprimento", perimetroCefalicoCm: 43.5 },
  { id: "m4", criancaId: "crianca-1", data: "2025-12-10", pesoKg: 9.1, comprimentoOuAlturaCm: 73.5, tipoMedicaoComprimento: "comprimento", perimetroCefalicoCm: 45.8 },
];

export default function App() {
  const [seccaoAtiva, setSeccaoAtiva] = useState<AppSection>("crescimento");
  const [criancas] = useState<Crianca[]>([CRIANCA_EXEMPLO]);
  const [criancaAtivaId, setCriancaAtivaId] = useState(CRIANCA_EXEMPLO.id);
  const [medicoes, setMedicoes] = useState<MedicaoCrescimento[]>(MEDICOES_EXEMPLO);
  const [marcosAlcancados, setMarcosAlcancados] = useState<Set<string>>(new Set());

  const criancaAtiva = criancas.find((c) => c.id === criancaAtivaId)!;
  const medicoesDaCrianca = medicoes.filter((m) => m.criancaId === criancaAtivaId);

  function adicionarMedicao(m: MedicaoCrescimento) {
    setMedicoes((prev) => [...prev, m]);
  }

  function alternarMarco(marcoId: string) {
    setMarcosAlcancados((prev) => {
      const novo = new Set(prev);
      if (novo.has(marcoId)) {
        novo.delete(marcoId);
      } else {
        novo.add(marcoId);
      }
      return novo;
    });
  }

  return (
    <div className="app-shell">
      <Sidebar
        seccaoAtiva={seccaoAtiva}
        onMudarSeccao={setSeccaoAtiva}
        criancas={criancas}
        criancaAtivaId={criancaAtivaId}
        onMudarCrianca={setCriancaAtivaId}
      />
      <main className="app-shell__content">
        {seccaoAtiva === "crescimento" && (
          <GrowthCurvesScreen
            crianca={criancaAtiva}
            medicoes={medicoesDaCrianca}
            onAdicionarMedicao={adicionarMedicao}
          />
        )}
        {seccaoAtiva === "inicio" && (
          <EmConstrucao
            titulo="Olá! 👋"
            descricao={`Dashboard de ${criancaAtiva.nome} — resumo dos últimos marcos e medições.`}
          />
        )}
        {seccaoAtiva === "marcos" && (
          <MilestonesScreen
            crianca={criancaAtiva}
            marcosAlcancados={marcosAlcancados}
            onAlternarMarco={alternarMarco}
          />
        )}
        {seccaoAtiva === "diario" && (
          <EmConstrucao
            titulo="Diário Visual"
            descricao="Fotos e vídeos organizados por idade, associáveis a marcos específicos."
          />
        )}
        {seccaoAtiva === "puericultura" && (
          <EmConstrucao
            titulo="Puericultura"
            descricao="Conselhos sobre sono, alimentação, segurança e estimulação, com foco nos primeiros 24 meses."
          />
        )}
        {seccaoAtiva === "alertas" && (
          <EmConstrucao
            titulo="Sinais de Alerta"
            descricao="Quando contactar o pediatra — conteúdo com revisão clínica obrigatória antes de publicação."
          />
        )}
        {seccaoAtiva === "perfil" && (
          <EmConstrucao titulo="Perfil da Criança" descricao="Dados, idade corrigida e gestão de múltiplos perfis." />
        )}
        {seccaoAtiva === "definicoes" && (
          <EmConstrucao titulo="Definições" descricao="Privacidade, exportação e eliminação de dados, notificações." />
        )}
      </main>
    </div>
  );
}
