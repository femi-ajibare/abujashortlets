import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  // `base` matters for GitHub Pages project sites served from /<repo>/.
  // Set BASE_PATH=/your-repo-name in the deploy environment (or leave unset
  // for root hosting on Netlify / Vercel / Cloudflare).
  base: process.env.BASE_PATH ? `/${process.env.BASE_PATH}/` : "/",
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsInlineLimit: 100000000,
  },
});
