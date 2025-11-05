import { defineConfig } from 'vite'
import liveReload from 'vite-plugin-live-reload'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    liveReload(`${__dirname}/../../**/*.twig`)
  ],
  root: '',
  base: '/',
  server: {
    cors: true,
    strictPort: true,
    port: 3000,
    https: false,
    hmr: {
      host: 'localhost'
    },
  },
  resolve: {}
})
