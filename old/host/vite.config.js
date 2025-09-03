import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host_app',
      filename: 'remoteEntry.js',
      remotes: {
        home: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/home/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        noticias: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/noticias/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        perfil: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/perfil/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        biblioteca: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/biblioteca/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        cuenta_corriente: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/cuenta_corriente/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        certificados: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/certificados/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        gestion_consultas: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/gestion_consultas/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        oportunidades_laborales: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/oportunidades_laborales/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        trayectoria_academica: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/trayectoria_academica/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        normativas_universitarias: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/normativas_universitarias/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        tutoriales_ayuda: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/tutoriales_ayuda/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        actividad_docente: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/actividad_docente/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        },
        investigacion: {
          external: "https://autogestion2.atlantida.edu.ar/frontend/investigacion/assets/remoteEntry.js",
          format: 'esm',
          from: 'vite'
        }
      },
      shared: {
        vue: { singleton: true, version: "^3.4.15" },
        "vue-router": { singleton: true, version: "^4.2.5" },
        pinia: { singleton: true, version: "^3.0.3" }
      },
      exposes: {
        "./eventBus": "./src/utils/eventBus.js",
        "./NotificationListener": "./src/components/common/NotificationListener.vue",
        "./ModalListener": "./src/components/common/ModalListener.vue",
        "./authStore": "./src/stores/authStore.js",
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/variables.scss";`
      }
    }
  },
  server: {
    port: 5000,
    host: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'https://backend.autogestion.atlantida.edu.ar',
        changeOrigin: true,
        secure: false,
        timeout: 10000
      }
    }
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['./src/utils/eventBus.js', './src/utils/fetchInterceptor.js']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
    },
  },
  base: "/"
})
