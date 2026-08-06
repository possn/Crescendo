# Marcos — App de Desenvolvimento & Crescimento Infantil (protótipo)

Protótipo web (React + TypeScript + Vite) para testar módulos da app antes do
porte nativo para iOS/App Store. Construído módulo a módulo.

## Estado atual

- ✅ **PWA (Progressive Web App)**: manifest, ícones (incl. variantes
  "maskable" para Android e `apple-touch-icon` para iOS), e service worker
  com cache offline do "app shell" e dos dados JSON da OMS. A partir de
  Safari no iPhone, **Partilhar → Adicionar ao Ecrã Principal** instala-a
  como um ícone próprio, em ecrã inteiro, sem barra de endereço.
- ✅ **Módulo 1 — Navegação lateral (sidebar)**: menu persistente com seletor
  de criança, ligação a todas as secções.
- ✅ **Perfil da Criança + idade corrigida para prematuridade**: fórmula
  padrão da AAP (`idade corrigida = idade cronológica − semanas de
  prematuridade`), aplicada automaticamente aos Módulos 3 e 4 até aos 24
  meses de idade cronológica — sem o utilizador ter de fazer nada. O
  ecrã de perfil mostra as duas idades lado a lado e avisa que a
  vacinação segue sempre a idade cronológica.
- ✅ **Módulo 3 — Marcos de Desenvolvimento**: 100 marcos reais dos
  checklists **CDC/AAP (revisão de 2022)**, cobrindo os 8 pontos de
  controlo dos primeiros 24 meses (2, 4, 6, 9, 12, 15, 18, 24 meses) nos 4
  domínios oficiais (Socio-emocional, Linguagem/Comunicação, Cognitivo,
  Motor), mais uma secção dedicada às **6 janelas de percentil P1–P99 do
  WHO Motor Development Study (2006)** para marcos motores grossos — uma
  visualização deliberadamente não-binária, com barra de intervalo em vez
  de checkbox.
- ✅ **Módulo 4 — Curvas de Crescimento**: peso, comprimento/altura e
  perímetro cefálico, com bandas de percentil (P3–P15–P50–P85–P97) calculadas
  a partir dos **dados oficiais LMS da WHO Child Growth Standards (2006)**,
  formulário de registo de medições, e leitura de percentil/z-score em tempo
  real.
- ✅ **Diário Visual**: fotos e vídeos (captura direta da câmara em telemóvel,
  ou galeria), organizados por idade em meses, com legenda opcional e
  associação opcional a um marco de desenvolvimento específico do Módulo 3.
- ✅ **Persistência local (IndexedDB)**: todos os dados — perfis, medições,
  marcos, fotos e vídeos — ficam guardados no próprio dispositivo, entre
  sessões, sem nenhum servidor envolvido. Ver `src/lib/persistence.ts`.
- ✅ **Definições**: explica a postura de privacidade, exporta todos os
  dados num ficheiro JSON, e permite apagar tudo permanentemente.
- ✅ **Puericultura**: 16 conselhos práticos (sono, alimentação, segurança,
  estimulação), filtráveis por tema e por relevância à idade atual, com
  fontes AAP/WHO/NIAID explícitas em cada cartão.
- ✅ **Sinais de Alerta**: sinais do CDC "Learn the Signs" por domínio, com
  os valores motores alinhados aos mesmos P99 do WHO Motor Development
  Study já usados no Módulo de Marcos (nunca dois números diferentes para
  a mesma coisa), destaque próprio para regressão de competências (o sinal
  mais consistentemente urgente na literatura, a qualquer idade), e CTA
  para o pediatra em todos os pontos de decisão.

## Privacidade e armazenamento

Toda a persistência (`src/lib/persistence.ts`) usa o IndexedDB nativo do
browser, via `idb-keyval` — sem backend, sem conta, sem chamada de rede em
lado nenhum deste ficheiro. Os dados vivem só no dispositivo onde a app foi
instalada; não há sincronização entre dispositivos (se isso vier a ser
construído no futuro, tem de ser opt-in explícito, nunca automático). A
secção Definições dentro da app deixa isto claro ao utilizador, e oferece
exportar (JSON) ou apagar tudo permanentemente.

## Testar a instalação como PWA

O service worker só é gerado em build de produção (por desenho, para não
interferir com o hot-reload em desenvolvimento):

```bash
npm run build
npm run preview
```

Abre o URL que aparece (normalmente `http://localhost:4173`) no **Safari do
iPhone** (tem de ser na mesma rede Wi-Fi, ou usa um túnel tipo `ngrok` se
quiseres testar num dispositivo antes de fazer deploy). Depois: **botão
Partilhar → Adicionar ao Ecrã Principal**.

Em desenvolvimento normal (`npm run dev`) o service worker não corre — isso
é intencional.

## O caminho honesto de PWA até à App Store

Importante: **instalar como PWA não é o mesmo que estar na App Store.** A
Apple não aceita "instalar a partir do Safari" como listagem — precisa de
um `.ipa` submetido via Xcode/App Store Connect. A PWA é, no entanto, um
passo real e reutilizável nesse caminho. Duas vias a partir daqui:

1. **Capacitor** (Ionic) — embrulha esta mesma app React num projeto Xcode
   nativo, reaproveitando quase 100% do código atual (`npx cap init`,
   `npx cap add ios`). Caminho mais rápido para ter algo na App Store,
   com acesso a APIs nativas (câmara, notificações) via plugins.
2. **Reescrita nativa em SwiftUI** — mais trabalho, mas UI verdadeiramente
   nativa (o que a especificação original já previa). Os dados em
   `src/data/` e a lógica de `src/lib/` traduzem-se quase diretamente
   para Swift.

Para este protótipo, a via 1 (Capacitor) é a mais coerente com o que já
está construído.

## Rigor dos dados de marcos de desenvolvimento

- Os 100 itens em `src/data/milestones/cdcMilestones.ts` foram extraídos
  diretamente dos PDFs oficiais "Milestone Moments" do CDC
  (`cdc.gov/act-early`), revisão de 2022 com a AAP (Zubler et al.,
  *Pediatrics*, 2022) — que passou o referencial de P50 para **P75** para
  evitar a atitude de "esperar para ver". Traduzidos e adaptados para
  português, não gerados por aproximação.
- As 6 janelas motoras em `src/data/milestones/whoMotorWindows.ts` vêm do
  WHO Motor Development Study (de Onis et al., *Acta Paediatrica Suppl*
  450, 2006) — os valores P1/P99, média e desvio-padrão de cada marco são
  os publicados no estudo original, não estimados.
- A UI do módulo de marcos foi desenhada deliberadamente para **nunca**
  mostrar uma idade única como "correta" — o CDC é apresentado como
  checklist por idade de referência (com nota que representa P75, não
  P50), e a OMS como barra de intervalo P1–P99, nunca como ponto fixo.


## Rigor dos dados de crescimento

Os ficheiros em `src/data/who/*.json` contêm os parâmetros **L, M, S** reais
da OMS (0–60 meses, por sexo, indicador a indicador), extraídos da
implementação de referência `pygrowup` (que empacota as tabelas oficiais
de `who.int/tools/child-growth-standards`). Foram validados:

- O ponto de fronteira aos 24 meses do indicador comprimento/altura preserva
  as **duas séries distintas da OMS** (comprimento deitado vs. altura em pé —
  a medição em pé dá, em média, ~0.7cm menos à mesma idade), com o campo
  `tipoMedicao` a desambiguar.
- A fórmula de z-score (`src/lib/growthCalculations.ts`) foi verificada
  manualmente: o valor mediano (M) de qualquer ponto tabelado devolve sempre
  exatamente z=0 → percentil 50.

**Antes de submeter à App Store**, substituir esta fonte de dados pelos
ficheiros Excel "Expanded tables" descarregados diretamente de
`who.int/tools/child-growth-standards` — não há motivo para desconfiar dos
valores da `pygrowup`, mas a app de produção não deve depender de uma
dependência de terceiros para dados clínicos (ver nota técnica em cada
ficheiro JSON).

## Correr localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção (verifica TypeScript + gera dist/)
npm run lint       # oxlint
```

## Publicar no GitHub

```bash
git init
git add .
git commit -m "Módulo 1 (navegação) + Módulo 4 (curvas de crescimento)"
git branch -M main
git remote add origin <URL_DO_TEU_REPOSITÓRIO>
git push -u origin main
```

Compatível com **GitHub Pages** (`npm run build` + publicar `dist/`) ou
deploy automático via **Vercel/Netlify** a partir do repositório.

## Caminho para a App Store

Este protótipo web serve para validar rapidamente lógica e UX. Para
submissão à App Store, o caminho recomendado é reescrever a camada de UI em
**SwiftUI nativo**, reaproveitando:
- os ficheiros JSON de `src/data/who/` tal como estão;
- a lógica de `src/lib/growthCalculations.ts`, traduzida para Swift (a
  fórmula e a estrutura de interpolação mantêm-se idênticas);
- a estrutura de navegação lateral, mapeada para `NavigationSplitView`.

## Próximos módulos

Seguem-se, um de cada vez:
1. Módulo 3 — Marcos de Desenvolvimento (motor, linguagem, cognitivo,
   socio-emocional), com janelas CDC/AAP 2022 + WHO Windows of Achievement.
2. Perfil da Criança + idade corrigida para prematuridade.
3. Restantes módulos por ordem de prioridade clínica.
