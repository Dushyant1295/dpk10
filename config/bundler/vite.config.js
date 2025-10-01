import { defineConfig } from "vite";
import liveReload from "vite-plugin-live-reload";

const { resolve } = require("path");

export default defineConfig({
  plugins: [liveReload(__dirname + "/**/*.html")],
  root: "",
  base: process.env.NODE_ENV === "development" ? "/" : "/dist/",





  build: {
    outDir: resolve(__dirname, './Dpk/Main/dist'),
    emptyOutDir: true,

    // manifest: true,
    // target: 'es2018',


    rollupOptions: {
      input: {
        main: resolve( __dirname + '/dpk.js')
      },
      
      
      output: {
          entryFileNames: `dpk.js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`
      }
    },
    
    minify: true,
    write: true
  },












  server: {
    cors: true,
    strictPort: true,
    port: 3000,
    https: false,
    hmr: {
      host: "localhost",
    },
  },
  resolve: {},
});