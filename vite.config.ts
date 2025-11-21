import { defineConfig } from 'vite'
import { resolve } from "path";
import react from '@vitejs/plugin-react'
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables" as *;`,
      },
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
});
