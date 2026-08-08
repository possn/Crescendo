import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { GrowthCurvesScreen } from "./features/growth/GrowthCurvesScreen";
import { MilestonesScreen } from "./features/milestones/MilestonesScreen";
import { ProfileScreen } from "./features/profile/ProfileScreen";
import { DiaryScreen } from "./features/diary/DiaryScreen";
import { PuericulturaScreen } from "./features/puericultura/PuericulturaScreen";
import { DiversificacaoScreen } from "./features/diversificacao/DiversificacaoScreen";
import { AlertasScreen } from "./features/alertas/AlertasScreen";
import { SintomasScreen } from "./features/sintomas/SintomasScreen";
import { CalculadoraScreen } from "./features/sintomas/CalculadoraScreen";
import { PrimeirosSocorrosScreen } from "./features/primeiros-socorros/PrimeirosSocorrosScreen";
import { SbvScreen } from "./features/sbv/SbvScreen";
import { ContactosScreen } from "./features/contactos/ContactosScreen";
import { VacinasScreen } from "./features/vacinas/VacinasScreen";
import { ConsultasScreen } from "./features/consultas/ConsultasScreen";
import { ResumoConsultaScreen } from "./features/resumo/ResumoConsultaScreen";
import { SettingsScreen } from "./features/settings/SettingsScreen";
import { SplashScreen } from "./components/SplashScreen";
import { SearchOverlay } from "./components/SearchOverlay";
import { OnboardingScreen } from "./features/onboarding/OnboardingScreen";
import { DashboardScreen } from "./features/dashboard/DashboardScreen";
import type {
  AppSection,
  Crianca,
  EntradaDiario,
  MedicaoCrescimento,
  Preferencias,
  VacinaAdministrada,
  RegistoConsulta,
  DuvidaConsulta,
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
  carregarVacinas,
  guardarVacinas,
  carregarRegistosConsulta,
  guardarRegistosConsulta,
  carregarDuvidasConsulta,
  guardarDuvidasConsulta,
} from "./lib/persistence";
import "./App.css";

// Nenhum dado de exemplo é semeado automaticamente — a primeira utilização
// passa sempre pelo onboarding, e o utilizador introduz os seus próprios
// dados desde o início. Nenhuma criança fictícia por defeito.

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
  const [seccaoAtiva, setSeccaoAtiva] = useState<AppSection>("inicio");
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [pesquisaAberta, setPesquisaAberta] = useState(false);
  const [criancas, setCriancas] = useState<Crianca[]>([]);
  const [criancaAtivaId, setCriancaAtivaId] = useState("");
  const [medicoes, setMedicoes] = useState<MedicaoCrescimento[]>([]);
  const [marcosAlcancados, setMarcosAlcancados] = useState<Set<string>>(new Set());
  const [entradasDiario, setEntradasDiario] = useState<EntradaDiario[]>([]);
  const [vacinasAdministradas, setVacinasAdministradas] = useState<VacinaAdministrada[]>([]);
  const [registosConsulta, setRegistosConsulta] = useState<RegistoConsulta[]>([]);
  const [duvidasConsulta, setDuvidasConsulta] = useState<DuvidaConsulta[]>([]);
  const [preferencias, setPreferencias] = useState<Preferencias>(PREFERENCIAS_OMISSAO);

  // Carrega tudo do IndexedDB local ao arrancar. Sem dados guardados ainda
  // (primeira utilização, ou depois de "Apagar tudo"), fica com a lista de
  // crianças vazia — o ecrã seguinte trata disso mostrando o onboarding.
  useEffect(() => {
    (async () => {
      const [
        criancasGuardadas,
        medicoesGuardadas,
        marcosGuardados,
        diarioGuardado,
        prefsGuardadas,
        vacinasGuardadas,
        registosConsultaGuardados,
        duvidasConsultaGuardadas,
      ] = await Promise.all([
        carregarCriancas(),
        carregarMedicoes(),
        carregarMarcosAlcancados(),
        carregarDiario(),
        carregarPreferencias(),
        carregarVacinas(),
        carregarRegistosConsulta(),
        carregarDuvidasConsulta(),
      ]);

      if (criancasGuardadas === undefined) {
        setCriancas([]);
      } else {
        setCriancas(criancasGuardadas);
        setCriancaAtivaId(criancasGuardadas[0]?.id ?? "");
        setMedicoes(medicoesGuardadas ?? []);
      }

      setMarcosAlcancados(marcosGuardados);
      setEntradasDiario(diarioGuardado ?? []);
      setVacinasAdministradas(vacinasGuardadas ?? []);
      setRegistosConsulta(registosConsultaGuardados ?? []);
      setDuvidasConsulta(duvidasConsultaGuardadas ?? []);
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

  // Ao mudar de secção pelo menu, repor o scroll no topo. Sem isto, o
  // conteúdo (a mesma div persiste entre navegações, só os filhos mudam)
  // mantém a posição de scroll da secção anterior, e o título novo nasce
  // escondido atrás do botão fixo do menu em telemóvel.
  useEffect(() => {
    document.querySelector(".app-shell__content")?.scrollTo(0, 0);
  }, [seccaoAtiva]);

  function adicionarMedicao(m: MedicaoCrescimento) {
    setMedicoes((prev) => {
      const novo = [...prev, m];
      guardarMedicoes(novo);
      return novo;
    });
  }

  function removerMedicao(id: string) {
    setMedicoes((prev) => {
      const novo = prev.filter((m) => m.id !== id);
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

  function registarVacina(doseId: string, dataAdministracao: string) {
    setVacinasAdministradas((prev) => {
      const novo = [
        ...prev.filter((v) => !(v.doseId === doseId && v.criancaId === criancaAtivaId)),
        { id: crypto.randomUUID(), criancaId: criancaAtivaId, doseId, dataAdministracao },
      ];
      guardarVacinas(novo);
      return novo;
    });
  }
  function removerVacina(id: string) {
    setVacinasAdministradas((prev) => {
      const novo = prev.filter((v) => v.id !== id);
      guardarVacinas(novo);
      return novo;
    });
  }

  function adicionarRegistoConsulta(r: RegistoConsulta) {
    setRegistosConsulta((prev) => {
      const novo = [...prev, r];
      guardarRegistosConsulta(novo);
      return novo;
    });
  }
  function removerRegistoConsulta(id: string) {
    setRegistosConsulta((prev) => {
      const novo = prev.filter((r) => r.id !== id);
      guardarRegistosConsulta(novo);
      return novo;
    });
  }
  function adicionarDuvidaConsulta(d: DuvidaConsulta) {
    setDuvidasConsulta((prev) => {
      const novo = [...prev, d];
      guardarDuvidasConsulta(novo);
      return novo;
    });
  }
  function alternarDuvidaConsulta(id: string) {
    setDuvidasConsulta((prev) => {
      const novo = prev.map((d) => (d.id === id ? { ...d, respondida: !d.respondida } : d));
      guardarDuvidasConsulta(novo);
      return novo;
    });
  }
  function removerDuvidaConsulta(id: string) {
    setDuvidasConsulta((prev) => {
      const novo = prev.filter((d) => d.id !== id);
      guardarDuvidasConsulta(novo);
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

  function concluirOnboarding(c: Crianca) {
    setCriancas([c]);
    setCriancaAtivaId(c.id);
    guardarCriancas([c]);
  }

  function dadosApagados() {
    setCriancas([]);
    setCriancaAtivaId("");
    setMedicoes([]);
    setMarcosAlcancados(new Set());
    setEntradasDiario([]);
    setVacinasAdministradas([]);
    setRegistosConsulta([]);
    setDuvidasConsulta([]);
    setPreferencias(PREFERENCIAS_OMISSAO);
    aplicarTema(PREFERENCIAS_OMISSAO.tema);
    // guardarCriancas/guardarMedicoes não são necessários aqui — apagarTudo()
    // já limpou as chaves todas no IndexedDB antes desta função ser chamada.
  }

  if (!splashTerminou) {
    return <SplashScreen onTerminar={() => setSplashTerminou(true)} />;
  }

  if (!pronto) {
    return (
      <div className="app-shell app-shell--loading">
        <p>A carregar…</p>
      </div>
    );
  }

  if (criancas.length === 0 || !criancaAtiva) {
    return <OnboardingScreen onConcluir={concluirOnboarding} />;
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
        onAbrirPesquisa={() => setPesquisaAberta(true)}
      />

      <div className="app-shell__mobile-header">
        <button
          className="app-shell__menu-btn"
          onClick={() => setSidebarAberta(true)}
          aria-label="Abrir menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          className="app-shell__menu-btn app-shell__pesquisa-btn"
          onClick={() => setPesquisaAberta(true)}
          aria-label="Pesquisar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </div>

      <SearchOverlay
        aberta={pesquisaAberta}
        onFechar={() => setPesquisaAberta(false)}
        onNavegar={setSeccaoAtiva}
      />

      <main className="app-shell__content">
        {seccaoAtiva === "crescimento" && (
          <GrowthCurvesScreen
            crianca={criancaAtiva}
            medicoes={medicoesDaCrianca}
            onAdicionarMedicao={adicionarMedicao}
            onRemoverMedicao={removerMedicao}
            unidades={preferencias.unidades}
          />
        )}
        {seccaoAtiva === "inicio" && (
          <DashboardScreen
            crianca={criancaAtiva}
            medicoes={medicoesDaCrianca}
            marcosAlcancados={marcosAlcancados}
            entradasDiario={entradasDiario.filter((e) => e.criancaId === criancaAtivaId)}
            vacinasAdministradas={vacinasAdministradas.filter((v) => v.criancaId === criancaAtivaId)}
            unidades={preferencias.unidades}
            onNavegar={setSeccaoAtiva}
          />
        )}
        {seccaoAtiva === "marcos" && (
          <MilestonesScreen
            crianca={criancaAtiva}
            marcosAlcancados={marcosAlcancados}
            onAlternarMarco={alternarMarco}
          />
        )}
        {seccaoAtiva === "vacinas" && (
          <VacinasScreen
            crianca={criancaAtiva}
            vacinasAdministradas={vacinasAdministradas.filter((v) => v.criancaId === criancaAtivaId)}
            onRegistar={registarVacina}
            onRemover={removerVacina}
          />
        )}
        {seccaoAtiva === "consultas" && (
          <ConsultasScreen
            crianca={criancaAtiva}
            registos={registosConsulta.filter((r) => r.criancaId === criancaAtivaId)}
            duvidas={duvidasConsulta.filter((d) => d.criancaId === criancaAtivaId)}
            onAdicionarRegisto={adicionarRegistoConsulta}
            onRemoverRegisto={removerRegistoConsulta}
            onAdicionarDuvida={adicionarDuvidaConsulta}
            onAlternarDuvida={alternarDuvidaConsulta}
            onRemoverDuvida={removerDuvidaConsulta}
          />
        )}
        {seccaoAtiva === "resumo" && (
          <ResumoConsultaScreen
            crianca={criancaAtiva}
            medicoes={medicoesDaCrianca}
            marcosAlcancados={marcosAlcancados}
            vacinasAdministradas={vacinasAdministradas.filter((v) => v.criancaId === criancaAtivaId)}
            duvidasConsulta={duvidasConsulta.filter((d) => d.criancaId === criancaAtivaId)}
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
        {seccaoAtiva === "diversificacao" && <DiversificacaoScreen crianca={criancaAtiva} />}
        {seccaoAtiva === "sintomas" && <SintomasScreen crianca={criancaAtiva} />}
        {seccaoAtiva === "calculadora" && (
          <CalculadoraScreen crianca={criancaAtiva} medicoes={medicoesDaCrianca} />
        )}
        {seccaoAtiva === "socorros" && <PrimeirosSocorrosScreen crianca={criancaAtiva} />}
        {seccaoAtiva === "sbv" && <SbvScreen crianca={criancaAtiva} />}
        {seccaoAtiva === "contactos" && <ContactosScreen />}
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
