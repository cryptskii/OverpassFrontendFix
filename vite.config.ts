import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'process', 'util']
    })
  ],
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
    },
  },
  server: {
    watch: {
      ignored: [
        '**/.git/**',
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.cache/**',
        '**/*.log',
        '**/*.lock',
        '**/package-lock.json',
        '**/public/**',
        '**/index.html',
        '**/manifest.json',
        '**/favicon.ico',
        '**/*.md',
        '**/*.json',
        '**/*.css',
        '**/ClientDirectory.txt',
        '**/Pasted*.txt',
        '**/www/**',
        '**/eslint.config.js',
        '**/tsconfig*.json',
        '**/vite.config.ts',
        '**/.config/**',
        '**/.local/**',
        '**/.upm/**',
        '**/.replit',
        '**/replit.nix',
        '**/package.json',
        '**/.vscode/**',
        '**/coverage/**',
        '**/tmp/**',
        '**/logs/**'
      ],
    },
    fs: {
      strict: false,
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          'ton-connect': ['@tonconnect/ui-react'],
        },
      },
    },
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
