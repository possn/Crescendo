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
- [x] Diário Visual — fotos/vídeos associados a marcos, timeline por idade
- [x] Persistência local (IndexedDB) — dados sobrevivem a fechar a app, nunca saem do dispositivo
- [x] Definições — privacidade, exportar, apagar tudo, gestão de vários
  filhos, unidades métrico/imperial, modo escuro, notificações locais
  (avisadamente limitadas a app aberta/recente — sem servidor, sem push
  verdadeiro em segundo plano)
- [x] Onboarding real (boas-vindas + criação do 1º perfil) — já não arranca
  com dados de exemplo; primeira utilização começa vazia a sério
- [x] Crédito de autoria: Pedro Sampaio Nunes, Pediatria — Conceito e
  direção clínica (em Definições → Sobre)
- [x] Puericultura — 16 conselhos AAP/WHO/NIAID, sono/alimentação/segurança/estimulação
- [x] Sinais de Alerta — CDC "Learn the Signs", alinhado com as janelas OMS do Módulo de Marcos

- [x] Dashboard (Início) real — última medição com percentil, progresso de
  marcos da etapa atual, fotos recentes, atalho para sinais de alerta

- [x] Sintomas Comuns — secção própria no menu (separada da Puericultura),
  10 itens (febre, vómitos, gastroenterite, tosse/constipação) + calculadora
  de dose de paracetamol/ibuprofeno por peso, com bloqueio de segurança
  para ibuprofeno <6 meses e aviso crítico para febre <3 meses

## Todos os módulos do MVP estão construídos

Próximo foco natural: testar a fundo, recolher feedback real (ver secção de
backlog abaixo), e trabalhar a checklist pré-App Store mais abaixo neste
documento — não há mais nenhum módulo "em falta" da lista original.

## Ideias fora do MVP original (avaliar antes de construir)

- [x] Pesquisa global — feita (~210 itens indexados)
- [x] Onboarding reforçado com mensagem de bom senso — feito
- [ ] Links para recursos práticos (ex.: fraldas, roupa) — ver nota de
  17/discussão: risco de misturar conteúdo comercial com conselho clínico,
  possível questão de conduta profissional (Ordem dos Médicos) se
  associado ao nome do autor. Se avançar, manter separado do conteúdo
  clínico, sem marcas/afiliação, e validar as regras profissionais primeiro.
- [x] Rastreador de vacinas (PNV) — feito. 14 doses, 0-5 anos, com as
  atualizações de 2024/2025 (pneumocócica, MenACWY). Rever periodicamente
  contra dgs.pt — o PNV muda com regularidade.
- [ ] Exportação em PDF (curvas + marcos + resumo de uma página) para
  levar à consulta — prioridade alta, é o tipo de coisa que faz um pai
  dizer "era mesmo isto que precisava"
- [x] Contactos Úteis (112, CIAV, SNS24, Linha de Apoio à Criança, APSI,
  DGS-PNV, SPP) — feito, por pedido do utilizador
- [ ] Favoritos/atalhos — marcar 3-5 artigos usados com frequência (ex.:
  passos do SBV, calculadora de dose) para acesso instantâneo no Dashboard

---

## Backlog de ideias (despeja aqui à medida que testas)

*Formato sugerido: `[data] Ideia — porquê / contexto`. Não precisas de arrumar,
só registar. Trio isto contigo de vez em quando para priorizar.*

-

---

## Antes de sequer pensar em submeter à App Store

Checklist mínimo, para não descobrir tarde demais:

- [ ] Revisão clínica de **todo** o conteúdo de texto por outro pediatra (não só por ti) — especialmente Sinais de Alerta, Calculadora de Dose, e Desengasgamento/SBV (estes três já não são "conteúdo informativo genérico", são instrução de ação — o risco de um erro aqui é maior do que era há uma semana)
- [ ] Substituir a fonte de dados LMS (atualmente via `pygrowup`) pelos ficheiros oficiais da OMS descarregados diretamente
- [ ] Política de privacidade real (RGPD — dados de menores são categoria reforçada; se houver utilizadores nos EUA, COPPA também se aplica). Nota: a arquitetura já é 100% local-first (IndexedDB, sem servidor) — o que falta é o *texto legal*, não a engenharia. Isto é também uma vantagem real a comunicar: "não recolhemos dados" é uma etiqueta de privacidade da App Store muito favorável.
- [ ] Decisão consciente sobre se algo na app se aproxima de "Software as a Medical Device" (SaMD) — a app **não deve** gerar scores de risco automáticos; mantém-se ferramenta de vigilância parental, não de rastreio
- [ ] Aconselhamento jurídico sobre termos de uso e disclaimers
- [ ] Verificação formal de marca registada para "Crescendo" (a minha verificação foi só uma busca rápida, não é clearance legal)
- [ ] Plano de monetização decidido (grátis com prática associada? freemium? pago?) — ver nota de mercado abaixo

## Fase 2 — Preparação técnica (Capacitor → Xcode)

- [ ] `npx cap init` + `npx cap add ios` no projeto atual — embrulha o React já feito, não reescreve nada
- [ ] Confirmar todos os tamanhos de ícone exigidos pela Apple (já temos o 1024 base)
- [ ] Ecrã de arranque nativo (mecanismo diferente do splash web que já construímos — a Apple usa Storyboard/Info.plist, não o nosso `SplashScreen.tsx`)
- [ ] Capturas de ecrã para a ficha da App Store (vários tamanhos de dispositivo)
- [ ] Conta Apple Developer Program (99 USD/ano) — isto tens de ser tu a criar, precisa da tua identidade
- [ ] TestFlight com um grupo pequeno antes de submeter para revisão pública

## Fase 3 — Riscos específicos de revisão da Apple para este tipo de app

- [ ] Categoria provável: **Médica** ou **Saúde e Fitness** — a categoria Médica tem escrutínio mais apertado (Guideline 1.4.1, informação que pode causar dano físico se mal utilizada)
- [ ] A Calculadora de Dose e o SBV são exatamente o tipo de conteúdo que pode gerar um pedido de esclarecimento da Apple — já têm salvaguardas fortes (limites de idade, doses máximas, "confirme com a bula"), mas vale a pena preparar uma resposta pronta a explicar isto, e destacar a tua credencial como pediatra
- [ ] Etiqueta de privacidade da App Store (App Privacy) — dado seres 100% local-first, isto deve poder dizer "não recolhemos dados nenhuns", que é raro e forte
- [ ] Questionário de classificação etária e de conformidade de exportação (encriptação) — mais simples do que parece, mas é preciso preencher com cuidado

## Fase 4 — Antes do lançamento em si

- [ ] Uso real com pacientes/rede profissional tua — continua a ser o passo de maior retorno que falta, mais do que qualquer funcionalidade nova
- [ ] Feedback de pelo menos 5-10 famílias reais fora do teu círculo mais próximo

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
