import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { GrowthCurvesScreen } from "./features/growth/GrowthCurvesScreen";
import { MilestonesScreen } from "./features/milestones/MilestonesScreen";
import { ProfileScreen } from "./features/profile/ProfileScreen";
import { DiaryScreen } from "./features/diary/DiaryScreen";
import { PuericulturaScreen } from "./features/puericultura/PuericulturaScreen";
import { AlertasScreen } from "./features/alertas/AlertasScreen";
import { SettingsScreen } from "./features/settings/SettingsScreen";
import { EmConstrucao } from "./features/shared/EmConstrucao";
import { SplashScreen } from "./components/SplashScreen";
import type { AppSection, Crianca, EntradaDiario, MedicaoCrescimento } from "./types";
import {
  carregarCriancas,
  guardarCriancas,
  carregarMedicoes,
  guardarMedicoes,
  carregarMarcosAlcancados,
  guardarMarcosAlcancados,
  carregarDiario,
  guardarDiario,
} from "./lib/persistence";
import "./App.css";

// Dados de exemplo (sintéticos) — usados só na primeiríssima utilização,
// antes de existir qualquer dado guardado localmente. Nenhuma criança real.
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
  const [pronto, setPronto] = useState(false);
  const [splashTerminou, setSplashTerminou] = useState(false);
  const [seccaoAtiva, setSeccaoAtiva] = useState<AppSection>("crescimento");
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [criancas, setCriancas] = useState<Crianca[]>([]);
  const [criancaAtivaId, setCriancaAtivaId] = useState("");
  const [medicoes, setMedicoes] = useState<MedicaoCrescimento[]>([]);
  const [marcosAlcancados, setMarcosAlcancados] = useState<Set<string>>(new Set());
  const [entradasDiario, setEntradasDiario] = useState<EntradaDiario[]>([]);

  // Carrega tudo do IndexedDB local ao arrancar. Se for a primeira vez
  // (nada guardado ainda), semeia com os dados de exemplo e já os grava.
  useEffect(() => {
    (async () => {
      const [criancasGuardadas, medicoesGuardadas, marcosGuardados, diarioGuardado] =
        await Promise.all([
          carregarCriancas(),
          carregarMedicoes(),
          carregarMarcosAlcancados(),
          carregarDiario(),
        ]);

      if (criancasGuardadas === undefined) {
        setCriancas([CRIANCA_EXEMPLO]);
        setCriancaAtivaId(CRIANCA_EXEMPLO.id);
        setMedicoes(MEDICOES_EXEMPLO);
        await Promise.all([
          guardarCriancas([CRIANCA_EXEMPLO]),
          guardarMedicoes(MEDICOES_EXEMPLO),
        ]);
      } else {
        setCriancas(criancasGuardadas);
        setCriancaAtivaId(criancasGuardadas[0]?.id ?? "");
        setMedicoes(medicoesGuardadas ?? []);
      }

      setMarcosAlcancados(marcosGuardados);
      setEntradasDiario(diarioGuardado ?? []);
      setPronto(true);
    })();
  }, []);

  const criancaAtiva = criancas.find((c) => c.id === criancaAtivaId);
  const medicoesDaCrianca = medicoes.filter((m) => m.criancaId === criancaAtivaId);

  function adicionarMedicao(m: MedicaoCrescimento) {
    setMedicoes((prev) => {
      const novo = [...prev, m];
      guardarMedicoes(novo);
      return novo;
    });
  }

  function alternarMarco(marcoId: string) {
    setMarcosAlcancados((prev) => {
      const novo = new Set(prev);
      if (novo.has(marcoId)) novo.delete(marcoId);
      else novo.add(marcoId);
      guardarMarcosAlcancados(novo);
      return novo;
    });
  }

  function guardarPerfil(c: Crianca) {
    setCriancas((prev) => {
      const novo = prev.map((x) => (x.id === c.id ? c : x));
      guardarCriancas(novo);
      return novo;
    });
  }

  function adicionarEntradaDiario(e: EntradaDiario) {
    setEntradasDiario((prev) => {
      const novo = [...prev, e];
      guardarDiario(novo);
      return novo;
    });
  }
  function removerEntradaDiario(id: string) {
    setEntradasDiario((prev) => {
      const novo = prev.filter((e) => e.id !== id);
      guardarDiario(novo);
      return novo;
    });
  }
  function atualizarLegendaDiario(id: string, legenda: string) {
    setEntradasDiario((prev) => {
      const novo = prev.map((e) => (e.id === id ? { ...e, legenda } : e));
      guardarDiario(novo);
      return novo;
    });
  }
  function associarMarcoDiario(id: string, marcoId: string | undefined) {
    setEntradasDiario((prev) => {
      const novo = prev.map((e) => (e.id === id ? { ...e, marcoId } : e));
      guardarDiario(novo);
      return novo;
    });
  }

  function dadosApagados() {
    setCriancas([CRIANCA_EXEMPLO]);
    setCriancaAtivaId(CRIANCA_EXEMPLO.id);
    setMedicoes(MEDICOES_EXEMPLO);
    setMarcosAlcancados(new Set());
    setEntradasDiario([]);
    guardarCriancas([CRIANCA_EXEMPLO]);
    guardarMedicoes(MEDICOES_EXEMPLO);
  }

  if (!splashTerminou) {
    return <SplashScreen onTerminar={() => setSplashTerminou(true)} />;
  }

  if (!pronto || !criancaAtiva) {
    return (
      <div className="app-shell app-shell--loading">
        <p>A carregar…</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        seccaoAtiva={seccaoAtiva}
        onMudarSeccao={setSeccaoAtiva}
        criancas={criancas}
        criancaAtivaId={criancaAtivaId}
        onMudarCrianca={setCriancaAtivaId}
        aberta={sidebarAberta}
        onFechar={() => setSidebarAberta(false)}
      />
      <main className="app-shell__content">
        <button
          className="app-shell__menu-btn"
          onClick={() => setSidebarAberta(true)}
          aria-label="Abrir menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
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
          <DiaryScreen
            crianca={criancaAtiva}
            entradas={entradasDiario}
            onAdicionar={adicionarEntradaDiario}
            onRemover={removerEntradaDiario}
            onAtualizarLegenda={atualizarLegendaDiario}
            onAssociarMarco={associarMarcoDiario}
          />
        )}
        {seccaoAtiva === "puericultura" && <PuericulturaScreen crianca={criancaAtiva} />}
        {seccaoAtiva === "alertas" && <AlertasScreen crianca={criancaAtiva} />}
        {seccaoAtiva === "perfil" && (
          <ProfileScreen crianca={criancaAtiva} onGuardar={guardarPerfil} />
        )}
        {seccaoAtiva === "definicoes" && <SettingsScreen onDadosApagados={dadosApagados} />}
      </main>
    </div>
  );
}
