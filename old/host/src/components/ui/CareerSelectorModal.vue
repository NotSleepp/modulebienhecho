<template>
  <div class="host-max-w-full sm:host-max-w-3xl md:host-max-w-4xl host-mx-auto">
    <!-- Header con título mejorado -->
    <div class="host-text-center host-mb-8 animate-fadeIn">
      <div class="host-inline-flex host-items-center host-justify-center host-w-16 host-h-16 host-bg-gradient-to-br host-from-[#3d4e6c] host-to-[#5a6d8f] host-rounded-2xl host-shadow-lg host-mb-4 host-transform hover:host-scale-105 host-transition-all host-duration-300">
        <svg class="host-w-8 host-h-8 host-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
        </svg>
      </div>
      <h2 class="host-text-2xl host-font-bold host-text-gray-900 dark:host-text-white host-mb-2">
        Carreras, Cursos y Otras Actividades
      </h2>
      <p class="host-text-gray-600 dark:host-text-gray-400 host-text-base host-max-w-md host-mx-auto">
        Haga clic en la carrera con la que desea continuar
      </p>
    </div>
    
    <!-- Loading State con skeleton mejorado -->
    <div v-if="isLoading" class="host-space-y-6 animate-fadeIn">
      <!-- Skeletons para las cards en disposición vertical -->
      <div class="host-flex host-flex-col host-space-y-4">
        <div v-for="i in skeletonCount" :key="i" class="host-animate-pulse host-bg-white dark:host-bg-gray-800 host-rounded-xl host-shadow-md host-p-6 host-border host-border-gray-200 dark:host-border-gray-700">
          <div class="host-flex host-items-start host-gap-4">
            <div class="host-w-12 host-h-12 host-bg-slate-200 dark:host-bg-slate-700 host-rounded-xl"></div>
            <div class="host-flex-1 host-space-y-3">
              <div class="host-h-5 host-bg-slate-200 dark:host-bg-slate-700 host-rounded host-w-3/4"></div>
              <div class="host-h-4 host-bg-slate-200 dark:host-bg-slate-700 host-rounded host-w-1/2"></div>
              <div class="host-h-4 host-bg-slate-200 dark:host-bg-slate-700 host-rounded host-w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Indicador de carga central -->
      <div class="host-flex host-items-center host-justify-center host-py-8">
        <div class="host-flex host-flex-col host-items-center host-space-y-3">
          <div class="relative">
            <div class="host-animate-spin host-rounded-full host-h-10 host-w-10 host-border-2 host-border-slate-200 dark:host-border-slate-700"></div>
            <div class="host-animate-spin host-rounded-full host-h-10 host-w-10 host-border-2 host-border-[#3d4e6c] host-border-t-transparent host-absolute host-top-0 host-left-0"></div>
          </div>
          <p class="host-text-slate-600 dark:host-text-slate-400 host-font-medium host-text-sm">Cargando carreras...</p>
        </div>
      </div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="host-bg-gradient-to-r host-from-red-50 host-to-rose-50 dark:host-from-red-900/20 dark:host-to-rose-900/20 host-border host-border-red-200 dark:host-border-red-800/30 host-rounded-xl host-p-6 host-mb-6">
      <div class="host-flex host-items-start host-gap-3">
        <div class="host-flex-shrink-0">
          <svg class="host-w-5 host-h-5 host-text-red-500 host-mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 class="host-text-red-800 dark:host-text-red-200 host-font-medium host-text-sm host-mb-1">Error al cargar carreras</h3>
          <p class="host-text-red-700 dark:host-text-red-300 host-text-sm">{{ error }}</p>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="activeCareers.length === 0" class="host-text-center host-py-12">
      <div class="host-w-16 host-h-16 host-bg-slate-100 dark:host-bg-slate-800 host-rounded-full host-flex host-items-center host-justify-center host-mx-auto host-mb-4">
        <svg class="host-w-8 host-h-8 host-text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="host-text-slate-800 dark:host-text-slate-200 host-font-medium host-mb-2">No hay carreras activas disponibles</h3>
      <p class="host-text-slate-600 dark:host-text-slate-400 host-text-sm">No se encontraron carreras activas asociadas a su cuenta</p>
    </div>
    
    <!-- Career Selection Cards -->
    <div v-else class="animate-slideInUp">
      <!-- Lista vertical de carreras -->
      <div class="host-flex host-flex-col host-space-y-4 host-mb-8">
        <div 
          v-for="career in activeCareers" 
          :key="career.pkinscripcion_carrera"
          @click="selectCareerAndContinue(career.pkinscripcion_carrera)"
          class="host-bg-white dark:host-bg-gray-800 host-rounded-xl host-shadow-md host-border host-transition-all host-duration-300 host-overflow-hidden host-cursor-pointer host-animate-scaleIn host-transform hover:host-shadow-lg hover:host-scale-[1.02] host-relative"
          :class="{
            'host-border-[#3d4e6c] host-ring-2 host-ring-[#3d4e6c]/30': selectedCareerPk === career.pkinscripcion_carrera || isSelecting && selectedCareerPk === career.pkinscripcion_carrera,
            'host-border-gray-200 dark:host-border-gray-700': selectedCareerPk !== career.pkinscripcion_carrera
          }"
        >
          <!-- Patrón decorativo -->
          <div class="host-absolute host-top-0 host-right-0 host-w-full host-h-full host-opacity-5">
            <div class="host-absolute host-inset-0 host-bg-gradient-to-br host-from-slate-500/10 host-to-slate-600/10"></div>
            <svg class="host-w-full host-h-full" viewBox="0 0 100 100" fill="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)"/>
            </svg>
          </div>
          
          <div class="host-p-6 host-relative">
            <div class="host-flex host-items-start host-gap-4">
              <!-- Icono de la carrera con color según condición académica -->
              <div 
                class="host-p-3 host-rounded-xl host-shadow-md host-transform hover:host-scale-110 host-transition-all host-duration-300 host-flex-shrink-0"
                :class="{
                  'host-bg-gradient-to-br host-from-green-500 host-to-green-600': career.condicion_academica === 'ACTIVO',
                  'host-bg-gradient-to-br host-from-red-500 host-to-red-600': career.condicion_academica === 'INACTIVO',
                  'host-bg-gradient-to-br host-from-blue-500 host-to-blue-600': career.condicion_academica === 'GRADUADO',
                  'host-bg-gradient-to-br host-from-[#3d4e6c] host-to-[#5a6d8f]': !['ACTIVO', 'INACTIVO', 'GRADUADO'].includes(career.condicion_academica)
                }"
              >
                <!-- Iconos profesionales de carreras universitarias -->
                <svg v-if="career.condicion_academica === 'ACTIVO'" class="host-w-6 host-h-6 host-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <!-- Icono de birrete/graduación para carrera activa -->
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
                <svg v-else-if="career.condicion_academica === 'INACTIVO'" class="host-w-6 host-h-6 host-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <!-- Icono de libro cerrado para carrera inactiva -->
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <svg v-else-if="career.condicion_academica === 'GRADUADO'" class="host-w-6 host-h-6 host-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <!-- Icono de diploma para graduado -->
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <svg v-else class="host-w-6 host-h-6 host-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <!-- Icono de edificio/universidad para otros estados -->
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              
              <!-- Información de la carrera -->
              <div class="host-flex-1">
                <h3 class="host-text-lg host-font-bold host-text-gray-900 dark:host-text-white host-mb-1 host-line-clamp-2">
                  {{ career.carrera_bis }}
                </h3>
                <p class="host-text-sm host-text-gray-600 dark:host-text-gray-400 host-mb-3">Legajo: {{ career.legajo }}</p>
                
                <!-- Badge de estado -->
                <span 
                  class="host-inline-flex host-px-3 host-py-1 host-text-xs host-font-semibold host-rounded-full"
                  :class="{
                    'host-bg-green-100 host-text-green-800 dark:host-bg-green-900/30 dark:host-text-green-300': career.condicion_academica === 'ACTIVO',
                    'host-bg-red-100 host-text-red-800 dark:host-bg-red-900/30 dark:host-text-red-300': career.condicion_academica === 'INACTIVO',
                    'host-bg-blue-100 host-text-blue-800 dark:host-bg-blue-900/30 dark:host-text-blue-300': career.condicion_academica === 'GRADUADO',
                    'host-bg-gray-100 host-text-gray-800 dark:host-bg-gray-700 dark:host-text-gray-300': !['ACTIVO', 'INACTIVO', 'GRADUADO'].includes(career.condicion_academica)
                  }"
                >
                  {{ career.condicion_academica }}
                </span>
              </div>
              
              <!-- Indicador de selección -->
              <div v-if="selectedCareerPk === career.pkinscripcion_carrera" class="host-absolute host-top-3 host-right-3 host-w-6 host-h-6 host-bg-[#3d4e6c] host-rounded-full host-flex host-items-center host-justify-center host-shadow-md">
                <svg class="host-w-4 host-h-4 host-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mensaje de selección en curso -->
      <div v-if="isSelecting" class="host-flex host-justify-center host-pt-4 host-mb-6 animate-fadeIn">
        <div class="host-flex host-items-center host-gap-3 host-px-6 host-py-3 host-bg-gray-100 dark:host-bg-gray-800 host-rounded-full host-shadow-md">
          <div class="host-w-5 host-h-5 host-border-2 host-border-[#3d4e6c]/30 host-border-t-[#3d4e6c] host-rounded-full host-animate-spin"></div>
          <span class="host-text-gray-700 dark:host-text-gray-300 host-font-medium">Seleccionando carrera...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore.js';
import eventBus, { EventTypes } from '../../utils/eventBus.js';

const props = defineProps({
  pendingNavigation: Function
});

const emit = defineEmits(['close']);

const API_URL = 'https://backend.autogestion.atlantida.edu.ar/api';
const authStore = useAuthStore();

const careers = ref([]);
const selectedCareerPk = ref('');
const isLoading = ref(false);
const isSelecting = ref(false);
const error = ref(null);

// Computed property para filtrar solo carreras activas
const activeCareers = computed(() => {
  return careers.value.filter(career => career.condicion_academica === 'ACTIVO');
});

// Computed property para determinar cuántos skeletons mostrar
const skeletonCount = computed(() => {
  // Siempre usar la cantidad exacta de carreras activas
  const activeCount = activeCareers.value.length;
  // Si no hay carreras cargadas aún, mostrar 1 skeleton mínimo
  return activeCount > 0 ? activeCount : 1;
});

onMounted(async () => {
  await fetchCareers();
});

async function fetchCareers() {
  const token = authStore.token;
  if (!token) {
    error.value = 'No hay token de autenticación disponible';
    return;
  }
  
  isLoading.value = true;
  error.value = null;
  
  try {
    console.log('[CareerSelector] Obteniendo carreras...');
    const response = await fetch(`${API_URL}/user/carreras`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('[CareerSelector] Carreras obtenidas:', data);
    careers.value = data;
  } catch (e) {
    console.error('[CareerSelector] Error al obtener carreras:', e);
    error.value = e.message || 'Error al obtener las carreras';
  } finally {
    isLoading.value = false;
  }
}

// Función para seleccionar carrera y continuar automáticamente
async function selectCareerAndContinue(careerPk) {
  // Si ya está seleccionando, no hacer nada
  if (isSelecting.value) return;
  
  // Actualizar la carrera seleccionada
  selectedCareerPk.value = careerPk;
  
  // Llamar a la función de selección de carrera sin retrasos
  await selectCareer();
}

async function selectCareer() {
  if (!selectedCareerPk.value) return;
  
  const token = authStore.token;
  if (!token) {
    error.value = 'No hay token de autenticación disponible';
    return;
  }
  
  isSelecting.value = true;
  error.value = null;
  
  try {
    console.log('[CareerSelector] Seleccionando carrera:', selectedCareerPk.value);
    const response = await fetch(`${API_URL}/user/carrera`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pkinscripcion_carrera: selectedCareerPk.value })
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    // 1) Intentar obtener el token desde los headers
    let newToken = response.headers.get('X-New-Token') || response.headers.get('x-new-token');

    // 2) Fallback: si el header no está disponible (p.e. por CORS),
    //    buscar en el cuerpo de la respuesta.
    if (!newToken) {
      try {
        const data = await response.clone().json();
        newToken = data?.token || data?.newToken || null;
      } catch (_) {
        // La respuesta no es JSON o ya fue consumida.
      }
    }

    if (newToken) {
      console.log('[CareerSelector] Recibido nuevo token de carrera:', newToken);
      authStore.setToken(newToken);
    } else {
      console.warn('[CareerSelector] No se encontró el nuevo token en la respuesta');
    }
    
    // Emitir evento de éxito
    eventBus.emit(EventTypes.SUCCESS, {
      message: 'Carrera seleccionada correctamente',
      timestamp: new Date().toISOString()
    });
    
    // Emitir evento para recargar los datos
    eventBus.emit(EventTypes.DATA_UPDATED, {
      type: 'career-selected',
      timestamp: new Date().toISOString()
    });

    // Cerrar el modal
    emit('close');
    
    // Continuar con la navegación pendiente si existe
    if (props.pendingNavigation) {
      console.log('[CareerSelector] Continuando con la navegación pendiente');
      props.pendingNavigation();
    }
    
  } catch (e) {
    console.error('[CareerSelector] Error al seleccionar carrera:', e);
    error.value = e.message || 'Error al seleccionar la carrera';
    
    // Emitir evento de error
    eventBus.emit(EventTypes.ERROR, {
      message: error.value,
      timestamp: new Date().toISOString()
    });
  } finally {
    isSelecting.value = false;
  }
}
</script>

<style scoped>
/* Animaciones para CareerSelector */
.animate-fadeIn {
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slideInUp {
  animation: slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slideInLeft {
  animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-scaleIn {
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>