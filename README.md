# Marcos — App de Desenvolvimento & Crescimento Infantil (protótipo)

Protótipo web (React + TypeScript + Vite) para testar módulos da app antes do
porte nativo para iOS/App Store. Construído módulo a módulo.

## Estado atual

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
- 🚧 Restantes secções (Diário Visual, Puericultura, Sinais de Alerta,
  Perfil, Definições): placeholders "em construção" — módulos seguintes.

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
