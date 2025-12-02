import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pregnancy-food-checker/', // GitHub Pages base path
  assetsInclude: ['**/*.json'], // Include JSON files as assets
})
