import { PluginOption, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { analyzer } from 'vite-bundle-analyzer'

const addAnalyzer: PluginOption[] = process.env.ANALYZE === '1' ? [analyzer()] : []

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ...addAnalyzer],
  root: 'public', // Set the root to the public directory
  publicDir: 'public',
  server: {
    port: 3000,
  },
  base: '',
  optimizeDeps: {
    include: ['bn.js'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    target: 'es2020',
    outDir: '../dist', // Output to the dist folder in the project root
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname, './src'),
    },
  },
})