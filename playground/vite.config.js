import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
    process: {
      env:{

      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    },
  },
  build: {
    target: 'es2020',
  },

  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ['rdf-editor'].includes(tag),
      }
    }
  })],
})
