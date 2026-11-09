import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base "./" — сайт работает на любом хостинге и в подпапке (GitHub Pages и т.п.)
export default defineConfig({ plugins: [react()], base: "./" });
