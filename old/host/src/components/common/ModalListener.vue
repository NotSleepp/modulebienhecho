<template>
  <Teleport to="body">
    <!-- Fondo oscuro -->
    <Transition
      enter-active-class="host-ease-out host-duration-150"
      enter-from-class="host-opacity-0"
      enter-to-class="host-opacity-100"
      leave-active-class="host-ease-in host-duration-100"
      leave-from-class="host-opacity-100"
      leave-to-class="host-opacity-0"
    >
      <div v-if="showModal" class="host-fixed host-inset-0 host-bg-black/50 host-backdrop-blur-sm host-transition-opacity host-z-50" @click="hideModal"></div>
    </Transition>

    <!-- Contenedor del modal -->
    <Transition
      enter-active-class="host-ease-out host-duration-150"
      enter-from-class="host-opacity-0 host-translate-y-4 sm:host-translate-y-0 sm:host-scale-95"
      enter-to-class="host-opacity-100 host-translate-y-0 sm:host-scale-100"
      leave-active-class="host-ease-in host-duration-100"
      leave-from-class="host-opacity-100 host-translate-y-0 sm:host-scale-100"
      leave-to-class="host-opacity-0 host-translate-y-4 sm:host-translate-y-0 sm:host-scale-95"
    >
      <div v-if="showModal" class="host-fixed host-inset-0 host-z-50 host-overflow-y-auto" @click.self="hideModal">
        <div class="host-flex host-min-h-full host-items-center host-justify-center host-p-4 host-text-center sm:host-p-0">
          <div class="host-relative host-transform host-overflow-hidden host-rounded-3xl host-bg-[#f5f7fa] dark:host-bg-[#1a2436] host-text-left host-shadow-2xl host-transition-all sm:host-my-8 host-w-full sm:host-max-w-2xl host-max-h-[90vh] host-flex host-flex-col host-border host-border-white/10 host-ring-1 host-ring-black/5 dark:host-ring-white/5">
            <!-- Botón de cierre -->
            <button @click="hideModal" class="host-absolute host-right-4 host-top-4 host-z-10 host-rounded-full host-p-2 host-text-gray-400 hover:host-text-white focus:host-outline-none focus:host-ring-2 focus:host-ring-white/20 host-transition-colors host-w-8 host-h-8 host-flex host-items-center host-justify-center">
              <span class="host-sr-only">Cerrar</span>
              <svg class="host-w-5 host-h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <!-- Cabecera -->
            <div class="host-bg-[#2d3b52]/90 host-backdrop-blur-sm host-px-6 host-py-4 host-flex-shrink-0 host-border-b host-border-[#475b7f]/10">
              <h3 class="host-text-xl host-font-semibold host-leading-6 host-text-white">{{ currentModal.title }}</h3>
            </div>

            <!-- Contenido dinamico -->
            <div class="host-px-6 host-py-5 host-flex-1 host-overflow-y-auto custom-scrollbar">
              <component :is="currentModal.component" v-bind="currentModal.props" @close="hideModal" />
            </div>

            <!-- Acciones -->
            <div v-if="!currentModal.hideActions" class="host-bg-[#1a2436] host-border-t host-border-[#475b7f]/10 host-px-6 host-py-4 host-flex host-flex-row-reverse host-gap-3 host-justify-start host-flex-shrink-0">
              <button v-if="currentModal.confirmText" type="button" class="host-inline-flex host-justify-center host-rounded-xl host-bg-gradient-to-r host-from-[#2d3b52] host-to-[#475b7f] host-px-5 host-py-2.5 host-text-sm host-font-semibold host-text-white host-shadow-sm hover:host-from-[#475b7f] hover:host-to-[#6c82a6] focus:host-outline-none focus:host-ring-2 focus:host-ring-[#475b7f]/20 host-transition-all host-duration-200" @click="handleConfirm">{{ currentModal.confirmText }}</button>
              <button type="button" class="host-inline-flex host-justify-center host-rounded-xl host-bg-[#475b7f]/5 host-px-5 host-py-2.5 host-text-sm host-font-semibold host-text-[#e9ecf2] host-shadow-sm host-ring-1 host-ring-inset host-ring-[#475b7f]/10 hover:host-bg-[#475b7f]/10 focus:host-outline-none focus:host-ring-2 focus:host-ring-[#475b7f]/20 host-transition-all host-duration-200" @click="hideModal">{{ currentModal.cancelText || 'Cerrar' }}</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, shallowRef, defineAsyncComponent } from 'vue';
import eventBus, { EventTypes } from '../../utils/eventBus';

const showModal = ref(false);
const currentModal = ref({
  title: '',
  component: null,
  props: {},
  confirmText: '',
  cancelText: 'Cerrar',
  hideActions: false,
  onConfirm: null,
});

// Función para resolver componentes dinámicos
function resolveComponent(component) {
  if (typeof component === 'function') {
    return defineAsyncComponent(component);
  }
  return component;
}

const showModalWithConfig = (config) => {
  console.log('[ModalListener] showModalWithConfig recibido', config);
  
  // Resolver el componente si es una función (importación dinámica)
  const resolvedConfig = { ...config };
  if (typeof config.component === 'function') {
    resolvedConfig.component = resolveComponent(config.component);
  }
  
  currentModal.value = { ...currentModal.value, ...resolvedConfig };
  showModal.value = true;
  document.body.style.overflow = 'hidden';
};

const hideModal = () => {
  showModal.value = false;
  setTimeout(() => {
    document.body.style.overflow = '';
    currentModal.value = {
      title: '',
      component: null,
      props: {},
      confirmText: '',
      cancelText: 'Cerrar',
      hideActions: false,
      onConfirm: null,
    };
  }, 100);
};

const handleConfirm = () => {
  currentModal.value.onConfirm?.();
  hideModal();
};

// Cerrar con ESC
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && showModal.value) hideModal();
};

onMounted(() => {
  eventBus.on(EventTypes.SHOW_MODAL, showModalWithConfig);
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  eventBus.off(EventTypes.SHOW_MODAL, showModalWithConfig);
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

:root.dark .custom-scrollbar {
  scrollbar-color: rgba(75, 85, 99, 0.5) transparent;
}

:root.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

:root.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(75, 85, 99, 0.7);
}
</style>