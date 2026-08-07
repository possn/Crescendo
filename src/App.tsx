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
import type {
  AppSection,
  Crianca,
  EntradaDiario,
  MedicaoCrescimento,
  Preferencias,
} from "./types";
import {
  carregarCriancas,
  guardarCriancas,
  carregarMedicoes,
  guardarMedicoes,
  carregarMarcosAlcancados,
  guardarMarcosAlcancados,
  carregarDiario,
  guardarDiario,
  carregarPreferencias,
  guardarPreferencias,
  PREFERENCIAS_OMISSAO,
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

function aplicarTema(tema: Preferencias["tema"]) {
  const raiz = document.documentElement;
  if (tema === "sistema") {
    const escuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
    raiz.dataset.theme = escuro ? "dark" : "light";
  } else {
    raiz.dataset.theme = tema === "escuro" ? "dark" : "light";
  }
}

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
  const [preferencias, setPreferencias] = useState<Preferencias>(PREFERENCIAS_OMISSAO);

  // Carrega tudo do IndexedDB local ao arrancar. Se for a primeira vez
  // (nada guardado ainda), semeia com os dados de exemplo e já os grava.
  useEffect(() => {
    (async () => {
      const [criancasGuardadas, medicoesGuardadas, marcosGuardados, diarioGuardado, prefsGuardadas] =
        await Promise.all([
          carregarCriancas(),
          carregarMedicoes(),
          carregarMarcosAlcancados(),
          carregarDiario(),
          carregarPreferencias(),
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
      setPreferencias(prefsGuardadas);
      aplicarTema(prefsGuardadas.tema);
      setPronto(true);
    })();
  }, []);

  // Notificação local (só funciona com a app aberta/recente — ver nota no
  // ecrã de Definições): avisa se não há medições há mais de 60 dias.
  useEffect(() => {
    if (!pronto || !preferencias.notificacoesAtivas) return;
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;

    const medicoesDaCriancaAtiva = medicoes.filter((m) => m.criancaId === criancaAtivaId);
    if (medicoesDaCriancaAtiva.length === 0) return;

    const ultimaData = medicoesDaCriancaAtiva
      .map((m) => new Date(m.data).getTime())
      .sort((a, b) => b - a)[0];
    const diasPassados = (Date.now() - ultimaData) / (1000 * 60 * 60 * 24);

    if (diasPassados > 60) {
      new Notification("Crescendo", {
        body: `Já não há medições novas há ${Math.floor(diasPassados)} dias.`,
        icon: `${import.meta.env.BASE_URL}icons/icon-192.png`,
      });
    }
    // Só na abertura da app, não repetidamente — daí sem diasPassados nas deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pronto, preferencias.notificacoesAtivas, criancaAtivaId]);

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

  function adicionarCrianca(c: Crianca) {
    setCriancas((prev) => {
      const novo = [...prev, c];
      guardarCriancas(novo);
      return novo;
    });
    setCriancaAtivaId(c.id);
  }

  function apagarCrianca(id: string) {
    setCriancas((prev) => {
      const novo = prev.filter((c) => c.id !== id);
      guardarCriancas(novo);
      if (criancaAtivaId === id && novo.length > 0) setCriancaAtivaId(novo[0].id);
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

  function atualizarPreferencias(p: Preferencias) {
    setPreferencias(p);
    guardarPreferencias(p);
    aplicarTema(p.tema);
  }

  function dadosApagados() {
    setCriancas([CRIANCA_EXEMPLO]);
    setCriancaAtivaId(CRIANCA_EXEMPLO.id);
    setMedicoes(MEDICOES_EXEMPLO);
    setMarcosAlcancados(new Set());
    setEntradasDiario([]);
    setPreferencias(PREFERENCIAS_OMISSAO);
    guardarCriancas([CRIANCA_EXEMPLO]);
    guardarMedicoes(MEDICOES_EXEMPLO);
    aplicarTema(PREFERENCIAS_OMISSAO.tema);
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
            unidades={preferencias.unidades}
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
        {seccaoAtiva === "definicoes" && (
          <SettingsScreen
            onDadosApagados={dadosApagados}
            criancas={criancas}
            criancaAtivaId={criancaAtivaId}
            onMudarCrianca={setCriancaAtivaId}
            onAdicionarCrianca={adicionarCrianca}
            onApagarCrianca={apagarCrianca}
            preferencias={preferencias}
            onAtualizarPreferencias={atualizarPreferencias}
          />
        )}
      </main>
    </div>
  );
}
