import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "favicon.svg", "apple-touch-icon.png"],
  manifest: {
    name: "Sito Notas",
    short_name: "Sito Notas",
    description: "Aplicación de gestión de notas de Sito",
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#041e42",
    background_color: "#f2f2f2",
    display: "standalone",
    start_url: ".",
    orientation: "portrait",
  },
  devOptions: {
    enabled: true,
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
