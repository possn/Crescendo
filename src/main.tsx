import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "./styles/tokens.css";
import App from "./App.tsx";

// Nesta fase de testes, uma nova versão publicada deve substituir
// imediatamente qualquer versão antiga em cache no telemóvel — em vez de
// ficar presa até o utilizador fechar manualmente todas as instâncias.
registerSW({
  immediate: true,
  onNeedRefresh() {
    window.location.reload();
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
