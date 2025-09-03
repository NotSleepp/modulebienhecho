<template>
  <div class="host-min-h-screen host-bg-gradient-to-br host-from-[#f4f6f9] host-to-[#e8ecf3] dark:host-from-[#1a2234] dark:host-to-[#2c3b53]">
    <template v-if="authStore.isReady">
      <transition
        mode="out-in"
        enter-active-class="host-transition-all host-duration-300 host-ease-out"
        enter-from-class="host-opacity-0"
        enter-to-class="host-opacity-100"
        leave-active-class="host-transition-all host-duration-200 host-ease-in"
        leave-from-class="host-opacity-100"
        leave-to-class="host-opacity-0"
      >
        <!-- Router view principal -->
        <div v-if="!authStore.isTransitioning" class="host-min-h-screen">
          <router-view v-slot="{ Component }">
            <transition
              enter-active-class="host-transition-all host-duration-300 host-ease-out"
              enter-from-class="host-opacity-0 host-transform host-scale-95"
              enter-to-class="host-opacity-100 host-transform host-scale-100"
              leave-active-class="host-transition-all host-duration-200 host-ease-in"
              leave-from-class="host-opacity-100 host-transform host-scale-100"
              leave-to-class="host-opacity-0 host-transform host-scale-95"
              mode="out-in"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>

        <!-- Estado de transición -->
        <div v-else-if="authStore.isTransitioning" class="host-fixed host-inset-0 host-flex host-items-center host-justify-center host-bg-white/80 dark:host-bg-gray-900/80 host-backdrop-blur-sm">
          <div class="host-text-center">
            <!-- Spinner -->
            <svg class="host-w-16 host-h-16 host-mx-auto host-text-blue-600 dark:host-text-blue-400 host-animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="host-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="host-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <!-- Texto -->
            <div class="host-mt-4">
              <p class="host-text-base host-font-medium host-text-gray-900 dark:host-text-white">Procesando</p>
              <p class="host-text-sm host-text-gray-600 dark:host-text-gray-300">Por favor, espere un momento...</p>
            </div>
          </div>
        </div>
      </transition>
    </template>

    <!-- Pantalla de carga inicial -->
    <div v-else class="host-min-h-screen host-flex host-items-center host-justify-center">
      <div class="host-text-center">
        <div class="host-relative">
          <div class="host-absolute host--inset-2 host-bg-gradient-to-r host-from-[#4c6185] host-to-[#5d7499] host-rounded-lg host-opacity-20 host-blur-lg host-animate-pulse"></div>
          <svg class="host-w-16 host-h-16 host-text-[#2c3b53] dark:host-text-white host-animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="host-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="host-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="host-mt-4 host-text-sm host-text-[#2c3b53] dark:host-text-[#f4f6f9]">Cargando...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './stores/themeStore'
import { useAuthStore } from './stores/authStore'

const themeStore = useThemeStore()
const authStore = useAuthStore()

onMounted(() => {
  themeStore.initTheme()
  authStore.initAuth()
})
</script>

<style scoped>
/* Transiciones suaves para cambios de tema */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  @apply host-bg-gray-300/60 hover:host-bg-gray-400/60 dark:host-bg-gray-600/60 dark:hover:host-bg-gray-500/60;
  border-radius: 4px;
}

/* Mejoras de legibilidad */
body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Prevenir el parpadeo del contenido durante la carga del tema */
.dark body {
  @apply host-bg-[#1a2234];
}

/* Asegurar que las transiciones no se solapen */
.v-enter-active,
.v-leave-active {
  position: absolute;
  width: 100%;
}

.router-view-wrapper {
  position: relative;
  min-height: 100vh;
}

/* Estilos específicos para el layout del sidebar */
@media (min-width: 1024px) {
  .lg\:pl-72 {
    padding-left: 18rem !important;
  }

  .lg\:pl-20 {
    padding-left: 5rem !important;
  }
}

/* Optimización para dispositivos móviles */
@media (max-width: 1023px) {
  .lg\:pl-72,
  .lg\:pl-20 {
    padding-left: 0 !important;
  }
}

/* Transiciones suaves para el contenido principal */
.transition-all {
  transition-property: padding, margin, transform;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Asegurar que el header se extienda completamente */
header {
  margin-left: 0;
  box-sizing: border-box;
}

.blob {
  width: 112px;
  height: 112px;
  display: grid;
  background: #fff;
  filter: blur(5.6px) contrast(10);
  padding: 11.2px;
  mix-blend-mode: darken;
}

.blob:before,
.blob:after {
  content: "";
  grid-area: 1/1;
  width: 44.8px;
  height: 44.8px;
  background: #474bff;
  animation: blob-rhf26m 2s infinite;
}

.blob:after {
  animation-delay: -1s;
}

/* Ajuste para modo oscuro */
:deep(.dark) .blob {
  background: #1a1a1a;
  mix-blend-mode: lighten;
}

:deep(.dark) .blob:before,
:deep(.dark) .blob:after {
  background: #6366f1;
}

@keyframes blob-rhf26m {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(100%, 0);
  }

  50% {
    transform: translate(100%, 100%);
  }

  75% {
    transform: translate(0, 100%);
  }

  100% {
    transform: translate(0, 0);
  }
}
</style>
