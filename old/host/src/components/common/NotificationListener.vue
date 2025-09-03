<template>
  <div aria-live="assertive" class="host-fixed host-inset-0 host-flex host-items-end host-px-4 host-py-6 host-pointer-events-none sm:host-p-6 sm:host-items-start host-z-50">
    <div class="host-w-full host-flex host-flex-col host-items-center host-space-y-4 sm:host-items-end">
      <!-- Notificación -->
      <Transition
        enter-active-class="host-transform host-ease-out host-duration-300 host-transition"
        enter-from-class="host-translate-y-2 host-opacity-0 sm:host-translate-y-0 sm:host-translate-x-2"
        enter-to-class="host-translate-y-0 host-opacity-100 sm:host-translate-x-0"
        leave-active-class="host-transition host-ease-in host-duration-100"
        leave-from-class="host-opacity-100"
        leave-to-class="host-opacity-0"
      >
        <div v-if="showNotification" class="host-max-w-sm host-w-full host-bg-[#f8fafc] dark:host-bg-[#1c2533] host-shadow-lg host-rounded-lg host-pointer-events-auto host-ring-1 host-ring-[#475b7f]/10">
          <div class="host-p-4">
            <div class="host-flex host-items-start">
              <div class="host-flex-shrink-0">
                <!-- Iconos según tipo -->
                <svg v-if="currentNotification.type === 'error'" class="host-h-6 host-w-6 host-text-[#a4b4d1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg v-else-if="currentNotification.type === 'success'" class="host-h-6 host-w-6 host-text-[#8195b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg v-else class="host-h-6 host-w-6 host-text-[#475b7f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div class="host-ml-3 host-w-0 host-flex-1">
                <p class="host-text-sm host-font-medium host-text-[#2f3f57] dark:host-text-[#f8fafc]">{{ currentNotification.title || defaultTitle }}</p>
                <p class="host-mt-1 host-text-sm host-text-[#57697f] dark:host-text-[#a4b4d1]">{{ currentNotification.message }}</p>
              </div>
              <div class="host-ml-4 host-flex-shrink-0 host-flex">
                <button @click="hideNotification" class="host-bg-[#f8fafc] dark:host-bg-[#1c2533] host-rounded-md host-inline-flex host-text-[#57697f] hover:host-text-[#2f3f57] dark:host-text-[#a4b4d1] dark:hover:host-text-[#f8fafc] focus:host-outline-none focus:host-ring-2 focus:host-ring-offset-2 focus:host-ring-[#475b7f] dark:focus:host-ring-offset-[#1c2533]">
                  <span class="host-sr-only">Cerrar</span>
                  <svg class="host-h-5 host-w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                </button>
              </div>
            </div>
            <div class="host-absolute host-bottom-0 host-left-0 host-right-0">
              <div class="host-h-1 host-transition-all host-duration-300 host-rounded-b-lg" :class="progressBarClass" :style="{ width: `${progress}%` }"></div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import eventBus, { EventTypes } from '../../utils/eventBus';

const showNotification = ref(false);
const progress = ref(100);
const currentNotification = ref({ type: 'info', title: '', message: '' });

const defaultTitle = computed(() => {
  switch (currentNotification.value.type) {
    case 'error':
      return 'Error';
    case 'success':
      return 'Éxito';
    default:
      return 'Información';
  }
});

const progressBarClass = computed(() => ({
  'bg-[#a4b4d1]': currentNotification.value.type === 'error',
  'bg-[#8195b8]': currentNotification.value.type === 'success',
  'bg-[#475b7f]': currentNotification.value.type === 'info',
}));

let progressInterval;

const showNotificationWithTimeout = (notification) => {
  currentNotification.value = notification;
  showNotification.value = true;
  progress.value = 100;

  if (progressInterval) clearInterval(progressInterval);
  const duration = 5000;
  const updateInterval = 10;
  const step = (100 * updateInterval) / duration;

  progressInterval = setInterval(() => {
    progress.value = Math.max(0, progress.value - step);
    if (progress.value <= 0) hideNotification();
  }, updateInterval);
};

const hideNotification = () => {
  showNotification.value = false;
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
};

const handleError = (error) => showNotificationWithTimeout({ type: 'error', message: error.message });
const handleSuccess = (data) => showNotificationWithTimeout({ type: 'success', message: data.message });
const handleNavigation = (nav) => showNotificationWithTimeout({ type: 'info', title: 'Navegación', message: `Navegando de ${nav.from} a ${nav.to}` });

onMounted(() => {
  eventBus.on(EventTypes.ERROR, handleError);
  eventBus.on(EventTypes.NAVIGATION, handleNavigation);
  eventBus.on(EventTypes.SUCCESS, handleSuccess);
  eventBus.on(EventTypes.NOTIFICATION, showNotificationWithTimeout);
});

onUnmounted(() => {
  eventBus.off(EventTypes.ERROR, handleError);
  eventBus.off(EventTypes.NAVIGATION, handleNavigation);
  eventBus.off(EventTypes.SUCCESS, handleSuccess);
  eventBus.off(EventTypes.NOTIFICATION, showNotificationWithTimeout);
  if (progressInterval) clearInterval(progressInterval);
});
</script>