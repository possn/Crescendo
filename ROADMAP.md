# Roadmap — Crescendo

Documento vivo. Serve para nada se perder entre conversas: decisões já tomadas,
o que está construído, e um sítio para despejares ideias à medida que testas
a PWA no telemóvel. Atualiza isto sempre que quiseres — é o "cérebro externo"
do produto.

---

## Decisões já tomadas (não reabrir sem motivo forte)

| Decisão | Escolha | Porquê |
|---|---|---|
| Nome | **Crescendo** | Funciona em PT/EN, remete para "crescer", sem colisão óbvia encontrada na App Store (verificação informal — fazer busca formal de marca antes de submeter) |
| Símbolo | Hairpin de crescendo (‹) + ponto coral | É o próprio sinal musical de "a crescer"; ecoa as bandas de percentil que se alargam com a idade |
| Paleta | Creme `#f7f2e9` / tinta `#1c1b19` / coral `#d86a4a` | Inspirado na Nomi — limpo, com classe, sem gradientes |
| Stack do protótipo | React + TypeScript + Vite, PWA | Rápido de testar, reaproveitável via Capacitor para iOS nativo depois |
| Estratégia de lançamento | **PWA até estar "perfeita"**, só depois App Store | Testar e iterar sem o atrito de builds Xcode/App Store Review a cada alteração |
| Caminho para App Store | Capacitor (embrulha o React existente num projeto Xcode) | Mais rápido do que reescrever em SwiftUI; reaproveita ~100% do código |

---

## O que já está construído

- [x] Navegação lateral (sidebar) com seletor de criança
- [x] Curvas de Crescimento — peso, comprimento/altura, perímetro cefálico, dados oficiais WHO Child Growth Standards (LMS), bandas P3–P97
- [x] Marcos de Desenvolvimento — 100 marcos CDC/AAP 2022 (2–24 meses, 4 domínios) + 6 janelas motoras OMS (P1–P99)
- [x] Perfil da Criança + idade corrigida para prematuridade (AAP), aplicada automaticamente aos módulos de marcos e crescimento
- [x] PWA instalável (manifest, ícones, service worker, funciona offline)
- [x] Identidade visual: nome, ícone, paleta

## Por construir (ordem sugerida, mas discutível)

- [ ] Diário Visual — fotos/vídeos associados a marcos, timeline
- [ ] Puericultura — conselhos de sono, alimentação, segurança (0–24 meses)
- [ ] Sinais de Alerta — linguagem revista clinicamente, sem gerar scores de risco
- [ ] Definições — privacidade, exportar/apagar dados, notificações
- [ ] Exportação em PDF (curvas + marcos) para levar à consulta
- [ ] Múltiplos filhos por conta (a estrutura de dados já suporta; falta UI de gestão)

---

## Backlog de ideias (despeja aqui à medida que testas)

*Formato sugerido: `[data] Ideia — porquê / contexto`. Não precisas de arrumar,
só registar. Trio isto contigo de vez em quando para priorizar.*

-

---

## Antes de sequer pensar em submeter à App Store

Checklist mínimo, para não descobrir tarde demais:

- [ ] Revisão clínica de **todo** o conteúdo de texto por outro pediatra (não só por ti) — especialmente Sinais de Alerta
- [ ] Substituir a fonte de dados LMS (atualmente via `pygrowup`) pelos ficheiros oficiais da OMS descarregados diretamente
- [ ] Política de privacidade real (RGPD — dados de menores são categoria reforçada; se houver utilizadores nos EUA, COPPA também se aplica)
- [ ] Decisão consciente sobre se algo na app se aproxima de "Software as a Medical Device" (SaMD) — a app **não deve** gerar scores de risco automáticos; mantém-se ferramenta de vigilância parental, não de rastreio
- [ ] Aconselhamento jurídico sobre termos de uso e disclaimers
- [ ] Verificação formal de marca registada para "Crescendo" (a minha verificação foi só uma busca rápida, não é clearance legal)
- [ ] Plano de monetização decidido (grátis com prática associada? freemium? pago?) — ver nota de mercado abaixo

---

## Nota de mercado (contexto, não repetir a cada conversa)

Mercado validado mas competitivo: a CDC tem app gratuita oficial só para marcos;
há várias apps maduras só para curvas de crescimento (WHO/CDC); a Kinedu é uma
concorrente séria e bem financiada no espaço mais alargado. A diferenciação
real está em combinar os dois pilares num produto só, com enquadramento
anti-ansiedade (curva de Gauss como filosofia, não just marketing), design
com classe, e — o mais importante — a tua autoridade real como pediatra por
trás do produto. A tecnologia não é o gargalo; a distribuição e a confiança
são. Vale a pena pensar cedo em como a tua prática/rede profissional pode ser
o primeiro canal de utilizadores reais, antes de pensar em marketing pago.
