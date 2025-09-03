<template>
  <button
    @click="toggleTheme"
    class="host-fixed host-right-6 host-p-3 host-rounded-xl host-bg-white/90 dark:host-bg-gray-800/90 host-backdrop-blur-lg host-shadow-lg hover:host-shadow-xl dark:host-shadow-gray-900/30 host-transition-all host-duration-300 focus:host-outline-none focus:host-ring-2 focus:host-ring-offset-2 focus:host-ring-indigo-500 dark:focus:host-ring-offset-gray-900 host-z-50 host-group"
    :title="themeStore.isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
  >
    <div class="host-relative">
      <!-- Sol (Modo claro) -->
      <svg
        class="host-w-6 host-h-6 host-text-yellow-500 host-transition-all host-duration-500 host-absolute host-inset-0"
        :class="themeStore.isDark ? 'host-opacity-100 host-rotate-0 host-scale-100' : 'host-opacity-0 host-rotate-90 host-scale-50'"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0 100"
            to="100 100"
            dur="0.6s"
            begin="0s"
            fill="freeze"
          />
        </path>
      </svg>
      <!-- Luna (Modo oscuro) -->
      <svg
        class="host-w-6 host-h-6 host-text-indigo-600 dark:host-text-indigo-400 host-transition-all host-duration-500"
        :class="!themeStore.isDark ? 'host-opacity-100 host-rotate-0 host-scale-100' : 'host-opacity-0 host--rotate-90 host-scale-50'"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0 100"
            to="100 100"
            dur="0.6s"
            begin="0s"
            fill="freeze"
          />
        </path>
      </svg>
    </div>
    <!-- Efecto de ripple -->
    <div class="host-absolute host-inset-0 host-rounded-xl host-transition-transform host-duration-500 host-bg-gradient-to-br host-from-yellow-400/20 host-to-orange-500/20 dark:host-from-indigo-500/20 dark:host-to-purple-500/20 host-opacity-0 group-hover:host-opacity-100"></div>
    <!-- Efecto de glow -->
    <div class="host-absolute host--inset-1 host-rounded-xl host-bg-gradient-to-br host-from-yellow-400/30 host-to-orange-500/30 dark:host-from-indigo-500/30 dark:host-to-purple-500/30 host-opacity-0 group-hover:host-opacity-100 host-blur host-transition-opacity host-duration-500"></div>
  </button>
</template>

<script setup>
import { useThemeStore } from '../../stores/themeStore.js';

const themeStore = useThemeStore();

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<style scoped>
@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>