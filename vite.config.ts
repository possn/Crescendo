import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  // O site fica em possn.github.io/Crescendo/ (página de projeto, não de
  // utilizador) — sem isto, todos os ficheiros (JS, CSS, ícones) seriam
  // pedidos a partir da raiz e dariam 404.
  base: "/Crescendo/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "icons/favicon-16.png",
        "icons/favicon-32.png",
        "icons/apple-touch-icon.png",
      ],
      manifest: {
        id: "/Crescendo/",
        name: "Crescendo — Desenvolvimento & Crescimento Infantil",
        short_name: "Crescendo",
        description:
          "Acompanhamento do desenvolvimento e crescimento infantil (0-5 anos), com curvas de crescimento e marcos baseados em dados oficiais da OMS e CDC/AAP.",
        lang: "pt-PT",
        start_url: "/Crescendo/",
        scope: "/Crescendo/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#fef5e8",
        theme_color: "#fef5e8",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          {
            src: "icons/icon-maskable-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // App-shell + dados estáticos (JSON da OMS) em cache; sem cache de
        // pedidos de rede dinâmicos porque o protótipo ainda não tem backend.
        globPatterns: ["**/*.{js,css,html,json,png,svg,ico}"],
        navigateFallback: "/Crescendo/index.html",
        // Ativa a nova versão do service worker imediatamente em vez de
        // esperar que todos os separadores antigos fechem — sem isto, uma
        // vez instalada uma versão com bug, o telemóvel fica preso nela
        // indefinidamente, mesmo depois de eu corrigir e publicar de novo.
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: false, // manter simples em dev; testar PWA sempre via `npm run build && npm run preview`
      },
    }),
  ],
});
