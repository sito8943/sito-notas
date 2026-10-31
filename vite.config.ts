import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv, type ProxyOptions } from "vite";
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

/** Dev proxy paths, used as VITE_AUTH_URL / VITE_API_URL to reach remote servers */
const DEV_PROXY_PATHS = {
  DEV_PROXY_AUTH_TARGET: "/proxy/auth",
  DEV_PROXY_API_TARGET: "/proxy/api",
} as const;

/**
 * Dev-only proxy to remote servers (e.g. prod) that reject the localhost origin.
 * Enabled per server by setting DEV_PROXY_*_TARGET in .env.local.
 * @param env - loaded env
 * @returns vite proxy config
 */
const buildDevProxy = (env: Record<string, string>) => {
  const proxy: Record<string, ProxyOptions> = {};
  for (const [key, path] of Object.entries(DEV_PROXY_PATHS)) {
    const target = env[key];
    if (!target) continue;
    proxy[path] = {
      target,
      changeOrigin: true,
      // Also the Notes socket (/ws)
      ws: true,
      rewrite: (url) => url.slice(path.length),
      // Same-origin for the server: drop Origin so CORS checks do not apply
      configure: (server) =>
        server.on("proxyReq", (req) => req.removeHeader("origin")),
    };
  }
  return proxy;
};

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: { proxy: buildDevProxy(loadEnv(mode, process.cwd(), "DEV_PROXY_")) },
}));
