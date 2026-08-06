import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
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
        id: "/",
        name: "Marcos — Desenvolvimento & Crescimento Infantil",
        short_name: "Marcos",
        description:
          "Acompanhamento do desenvolvimento e crescimento infantil (0-5 anos), com curvas de crescimento e marcos baseados em dados oficiais da OMS e CDC/AAP.",
        lang: "pt-PT",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#faf9f7",
        theme_color: "#2f6f62",
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
        navigateFallback: "/index.html",
      },
      devOptions: {
        enabled: false, // manter simples em dev; testar PWA sempre via `npm run build && npm run preview`
      },
    }),
  ],
});
