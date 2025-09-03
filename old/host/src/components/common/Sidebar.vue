<template>
  <div>
    <!-- Sidebar principal -->
    <div 
      class="host-fixed host-inset-y-0 host-left-0 host-z-50 host-transform host-transition-all host-duration-300 host-ease-in-out"
      :class="[
        isOpen ? 'host-translate-x-0' : 'host--translate-x-full lg:host-translate-x-0',
        isCollapsed
          ? 'host-w-16 lg:host-w-20'
          : 'host-w-64 sm:host-w-64 md:host-w-64 lg:host-w-72'
      ]"
    >
      <!-- Contenedor principal del sidebar -->
      <div class="host-flex host-h-full host-flex-col host-bg-white/95 dark:host-bg-gray-900/95 host-backdrop-blur-xl host-shadow-2xl host-border-r host-border-gray-200/50 dark:host-border-gray-700/50">
        
        <!-- Header con logo -->
        <div class="host-flex host-h-20 host-items-center host-border-b host-border-gray-200/50 dark:host-border-gray-700/50 host-bg-gradient-to-r host-from-white/50 host-to-gray-50/50 dark:host-from-gray-900/50 dark:host-to-gray-800/50"
             :class="isCollapsed ? 'host-px-2' : 'host-px-6'">
          <div class="host-flex host-items-center host-justify-between host-w-full">
            <!-- Logo - solo visible cuando no está colapsado -->
            <router-link v-if="!isCollapsed" to="/" class="host-block host-select-none focus:host-outline-none" active-class="" exact-active-class="" draggable="false">
              <img
                :src="isDarkMode ? 'https://res.cloudinary.com/dkx9plksi/image/upload/v1749513244/logocompleto_xif6lm.png' : 'https://res.cloudinary.com/dkx9plksi/image/upload/v1749513244/logocompleto-dark_jgwiad.png'"
                alt="Logo Universidad Atlántida"
                class="host-h-auto host-w-32 xs:host-w-36 sm:host-w-40 host-object-contain host-cursor-pointer host-select-none host-transition-all host-duration-300"
                draggable="false"
              />
            </router-link>
            <!-- Espacio vacío cuando está colapsado para mantener el layout -->
            <div v-else class="host-flex-1"></div>
            
            <!-- Botón para contraer/expandir -->
            <button 
              @click="toggleCollapse"
              class="host-p-2 host-rounded-lg host-text-gray-500 hover:host-text-gray-700 hover:host-bg-gray-100 dark:host-text-gray-400 dark:hover:host-text-gray-200 dark:hover:host-bg-gray-800 host-transition-all host-duration-200"
              :title="isCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'"
            >
              <svg 
                class="host-w-5 host-h-5 host-transform host-transition-transform host-duration-200" 
                :class="{ 'host-rotate-180': isCollapsed }" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Información del usuario -->
        <div class="host-border-b host-border-gray-200/50 dark:host-border-gray-700/50 host-bg-gradient-to-b host-from-gray-50/30 host-to-transparent dark:host-from-gray-800/30 host-py-4"
             :class="isCollapsed ? 'host-px-2' : 'host-px-6'">
          <div class="host-flex host-items-center host-gap-3">
            <div class="host-relative host-group">
              <div class="host-absolute host--inset-0.5 host-bg-gradient-to-br host-from-slate-500 host-to-slate-700 host-rounded-full host-blur host-opacity-60 group-hover:host-opacity-80 host-transition host-duration-300"></div>
              <div class="host-relative host-h-10 host-w-10 host-rounded-full host-bg-gradient-to-br host-from-slate-500 host-to-slate-700 host-flex host-items-center host-justify-center host-ring-2 host-ring-white dark:host-ring-gray-900 group-hover:host-scale-105 host-transition-transform host-duration-300">
                <span class="host-text-white host-text-sm host-font-semibold">{{ userInitials }}</span>
              </div>
            </div>
            
                      <div v-if="!isCollapsed" class="host-transition-all host-duration-300 host-min-w-0 host-flex-1">
            <p class="host-text-sm host-font-semibold host-text-gray-900 dark:host-text-white host-truncate">{{ userFullName }}</p>
            <p class="host-text-xs host-text-gray-500 dark:host-text-gray-400 host-truncate">DNI: {{ authStore.datosPersonales?.datos?.dni || 'No disponible' }}</p>
          </div>
          </div>
        </div>

        <!-- Navegación -->
        <nav class="host-flex-1 host-overflow-y-auto host-px-3 host-py-4 host-space-y-1">
          <!-- Indicador de carga -->
          <div v-if="isLoading" class="host-flex host-justify-center host-items-center host-py-8">
            <div class="host-animate-spin host-rounded-full host-h-8 host-w-8 host-border-2 host-border-blue-500 host-border-t-transparent"></div>
          </div>

          <!-- Items del menú usando componente recursivo -->
          <template v-else v-for="(item, index) in menuItems" :key="index">
            <!-- Item simple sin submenú -->
            <div v-if="!item.submenu || item.submenu.length === 0" class="host-relative">
              <!-- Enlaces externos -->
              <a v-if="item.path && (item.path.startsWith('http://') || item.path.startsWith('https://'))" 
                :href="item.path" 
                target="_blank"
                rel="noopener noreferrer"
                class="host-group host-flex host-items-center host-px-3 host-py-2.5 host-text-base md:host-text-sm host-font-medium host-rounded-lg host-transition-all host-duration-200 host-relative
                       host-text-gray-700 hover:host-text-gray-900 hover:host-bg-gray-50 dark:host-text-gray-300 dark:hover:host-text-white dark:hover:host-bg-gray-800"
                :title="isCollapsed ? item.name : ''"
                @mouseenter="handleItemHover(item, index, $event)"
                @mouseleave="hideTooltip"
              >
                <component 
                  :is="item.icon || HomeIcon" 
                  class="host-flex-shrink-0 host-h-5 host-w-5 host-transition-colors host-duration-200"
                  :class="[
                    isCollapsed ? 'host-mx-auto' : 'host-mr-3',
                    'host-text-gray-500 dark:host-text-gray-400 group-hover:host-text-gray-700 dark:group-hover:host-text-gray-300'
                  ]"
                />
                <span 
                  v-if="!isCollapsed" 
                  class="host-transition-all host-duration-300 host-break-words host-flex-1 host-leading-tight"
                >
                  {{ item.name }}
                </span>
                <!-- Icono de enlace externo -->
                <svg 
                  v-if="!isCollapsed"
                  class="host-h-4 host-w-4 host-text-gray-400 host-flex-shrink-0 host-ml-auto"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              <!-- Enlaces internos -->
              <router-link 
                v-else
                :to="item.path"
                custom 
                v-slot="{ navigate, href, isActive }"
              >
                <a 
                  :href="href" 
                  @click.prevent="onMenuClick(item, navigate)"
                  class="host-group host-flex host-items-center host-px-3 host-py-2.5 host-text-base md:host-text-sm host-font-medium host-rounded-lg host-transition-all host-duration-200 host-relative"
                  :class="[
                    isActive 
                      ? 'host-bg-blue-50 host-text-blue-700 dark:host-bg-blue-900/50 dark:host-text-blue-300' 
                      : 'host-text-gray-700 hover:host-text-gray-900 hover:host-bg-gray-50 dark:host-text-gray-300 dark:hover:host-text-white dark:hover:host-bg-gray-800'
                  ]"
                  :title="isCollapsed ? item.name : ''"
                  @mouseenter="handleItemHover(item, index, $event)"
                  @mouseleave="hideTooltip"
                >
                  <component 
                    :is="item.icon || HomeIcon" 
                    class="host-flex-shrink-0 host-h-5 host-w-5 host-transition-colors host-duration-200"
                    :class="[
                      isCollapsed ? 'host-mx-auto' : 'host-mr-3',
                      isActive ? 'host-text-blue-700 dark:host-text-blue-300' : 'host-text-gray-500 dark:host-text-gray-400 group-hover:host-text-gray-700 dark:group-hover:host-text-gray-300'
                    ]"
                  />
                  <span 
                    v-if="!isCollapsed" 
                    class="host-transition-all host-duration-300 host-break-words host-flex-1 host-leading-tight"
                  >
                    {{ item.name }}
                  </span>
                </a>
              </router-link>
            </div>

            <!-- Item con submenú usando componente recursivo -->
            <div v-else class="host-relative">
              <button
                @click="toggleSubmenu(index)"
                class="host-group host-flex host-w-full host-items-center host-px-3 host-py-2.5 host-text-base md:host-text-sm host-font-medium host-rounded-lg host-transition-all host-duration-200"
                :class="[
                  openSubmenus[index] 
                    ? 'host-bg-gray-50 host-text-gray-900 dark:host-bg-gray-800 dark:host-text-white' 
                    : 'host-text-gray-700 hover:host-text-gray-900 hover:host-bg-gray-50 dark:host-text-gray-300 dark:hover:host-text-white dark:hover:host-bg-gray-800'
                ]"
                :title="isCollapsed ? item.name : ''"
                @mouseenter="handleItemHover(item, index, $event)"
                @mouseleave="hideTooltip"
              >
                <component 
                  :is="item.icon || HomeIcon" 
                  class="host-flex-shrink-0 host-h-5 host-w-5 host-transition-colors host-duration-200"
                  :class="[
                    isCollapsed ? 'host-mx-auto' : 'host-mr-3',
                    'host-text-gray-500 dark:host-text-gray-400 group-hover:host-text-gray-700 dark:group-hover:host-text-gray-300'
                  ]"
                />
                <span 
                  v-if="!isCollapsed" 
                  class="host-flex-1 host-text-left host-break-words host-leading-tight"
                >
                  {{ item.name }}
                </span>
                <svg 
                  v-if="!isCollapsed"
                  class="host-h-4 host-w-4 host-transform host-transition-transform host-duration-200 host-text-gray-400 host-flex-shrink-0"
                  :class="{ 'host-rotate-90': openSubmenus[index] }" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>

              <!-- Submenús recursivos -->
              <div 
                v-show="openSubmenus[index] && !isCollapsed" 
                class="host-mt-1 host-space-y-1 host-transition-all host-duration-200"
              >
                <MenuItemRecursive
                  v-for="subitem in item.submenu"
                  :key="subitem.id || subitem.path"
                  :item="subitem"
                  :level="1"
                  :is-collapsed="isCollapsed"
                  @menu-click="onMenuClick"
                />
              </div>
            </div>
          </template>
        </nav>

        <!-- Footer con logout -->
        <div class="host-border-t host-border-gray-200/50 dark:host-border-gray-700/50 host-p-3">
          <button
            @click="handleLogout"
            class="host-group host-flex host-w-full host-items-center host-px-3 host-py-2.5 host-text-base md:host-text-sm host-font-medium host-rounded-lg host-transition-all host-duration-200 host-text-red-600 hover:host-bg-red-50 dark:host-text-red-400 dark:hover:host-bg-red-900/20"
            :title="isCollapsed ? 'Cerrar Sesión' : ''"
          >
            <svg 
              class="host-flex-shrink-0 host-h-5 host-w-5 host-transition-colors host-duration-200"
              :class="isCollapsed ? 'host-mx-auto' : 'host-mr-3'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span v-if="!isCollapsed" class="host-truncate">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay para móviles -->
    <div 
      v-if="isOpen" 
      @click="(event) => toggleSidebar(event)"
      class="host-fixed host-inset-0 host-z-40 host-bg-black/60 host-backdrop-blur-sm lg:host-hidden host-transition-opacity host-duration-300"
    ></div>

    <!-- Tooltip sobrio para items colapsados -->
    <div
      v-if="showTooltip && isCollapsed"
      ref="tooltipRef"
      @mouseenter="handleTooltipMouseEnter"
      @mouseleave="handleTooltipMouseLeave"
      class="host-fixed host-z-[80] host-bg-white dark:host-bg-gray-900 host-text-gray-900 dark:host-text-white host-rounded-lg host-shadow-lg host-border host-border-gray-200 dark:host-border-gray-700 host-min-w-[180px] host-max-w-[240px] host-overflow-hidden"
      :style="tooltipStyle"
    >
      <!-- Header simple -->
      <div class="host-px-3 host-py-2 host-border-b host-border-gray-100 dark:host-border-gray-700">
        <h3 class="host-font-medium host-text-sm host-text-gray-900 dark:host-text-white">{{ hoveredItem?.name }}</h3>
      </div>
      
      <!-- Contenido -->
      <div class="host-py-1">
        <!-- Si no tiene submenú -->
        <div v-if="!hoveredItem?.submenu || hoveredItem.submenu.length === 0" class="host-px-3 host-py-2">
          <p class="host-text-xs host-text-gray-500 dark:host-text-gray-400">Hacer clic para acceder</p>
        </div>
        
        <!-- Si tiene submenú -->
        <div v-else>
            <template v-for="subitem in hoveredItem.submenu" :key="subitem.path">
              <a
                v-if="subitem.path && (subitem.path.startsWith('http://') || subitem.path.startsWith('https://'))"
                :href="subitem.path"
                target="_blank"
                rel="noopener noreferrer"
                @click="onMenuClick(subitem)"
                class="host-block host-px-3 host-py-2 host-text-sm host-text-gray-700 dark:host-text-gray-300 hover:host-bg-gray-50 dark:hover:host-bg-gray-800 host-transition-colors host-duration-150 host-cursor-pointer"
              >
                {{ subitem.name }}
              </a>
              <router-link
                v-else
                :to="subitem.path"
                @click="onMenuClick(subitem, () => $router.push(subitem.path))"
                class="host-block host-px-3 host-py-2 host-text-sm host-text-gray-700 dark:host-text-gray-300 hover:host-bg-gray-50 dark:hover:host-bg-gray-800 host-transition-colors host-duration-150 host-cursor-pointer"
              >
                {{ subitem.name }}
              </router-link>
            </template>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/authStore.js'
import { useThemeStore } from '../../stores/themeStore.js'
import { API_URL } from '../../main.js'
import eventBus, { EventTypes } from '../../utils/eventBus.js'
import MenuItemRecursive from './MenuItemRecursive.vue'
import {
  UserIcon,
  BookOpenIcon,
  AcademicCapIcon,
  BanknotesIcon,
  HomeIcon,
  DocumentCheckIcon,
  BriefcaseIcon,
  AcademicCapIcon as GraduationIcon,
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  BuildingLibraryIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon as EducationIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentMagnifyingGlassIcon,
  EnvelopeIcon,
  FolderIcon,
  GlobeAltIcon,
  IdentificationIcon,
  InformationCircleIcon,
  LinkIcon,
  MapIcon,
  NewspaperIcon,
  PencilSquareIcon,
  PhoneIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  RectangleStackIcon,
  ShieldCheckIcon,
  TableCellsIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon
} from '@heroicons/vue/24/outline'

const emit = defineEmits(['collapse'])
const router = useRouter()
const route = useRoute()

// Define los refs al principio del script para evitar el error de lint
const isOpen = ref(false) // Inicializar cerrado por defecto
const isCollapsed = ref(false)
const openSubmenus = ref({})
const authStore = useAuthStore()
const themeStore = useThemeStore()
const pendingNavigation = ref(null)
const menuItems = ref([])
const isLoading = ref(true)

// Tooltip state
const showTooltip = ref(false)
const hoveredItem = ref(null)
const tooltipStyle = ref({})
const tooltipRef = ref(null)
const isHoveringTooltip = ref(false)
const hideTooltipTimeout = ref(null) // Agregar esta línea

const isDarkMode = computed(() => themeStore.isDark)

const userFullName = computed(() => {
  // Obtener datos del alumno desde datosPersonales
  if (authStore.datosPersonales?.datos) {
    const { nombre, apellido } = authStore.datosPersonales.datos;
    if (nombre && apellido) {
      return `${nombre} ${apellido}`.trim();
    }
  }
  // Fallback al campo nombreapellido si existe
  if (authStore.user?.nombreapellido) {
    return authStore.user.nombreapellido;
  }
  // Último fallback
  return 'Alumno';
})

const userInitials = computed(() => {
  // Intentar obtener de datosPersonales primero
  if (authStore.datosPersonales?.datos) {
    const { nombre, apellido } = authStore.datosPersonales.datos;
    if (nombre && apellido) {
      // Obtener la primera letra del primer nombre y del primer apellido
      const firstNameInitial = nombre.split(' ')[0].charAt(0);
      const lastNameInitial = apellido.split(' ')[0].charAt(0);
      return (firstNameInitial + lastNameInitial).toUpperCase();
    }
  }
  
  // Fallback al nombreapellido si existe
  if (authStore.user?.nombreapellido) {
    const names = authStore.user.nombreapellido.split(' ');
    const firstInitial = names[0]?.charAt(0) || '';
    const lastInitial = names[names.length - 1]?.charAt(0) || '';
    return (firstInitial + lastInitial).toUpperCase();
  }
  
  return 'A';
})

// Watch para actualizar datos del usuario
watch(() => authStore.user, (newUser) => {
  if (newUser) {
    console.log('Usuario actualizado:', newUser);
  }
}, { immediate: true });

// Watch para actualizar datos personales
watch(() => authStore.datosPersonales, (newData) => {
  if (newData?.datos) {
    console.log('Datos personales actualizados:', newData.datos);
  }
}, { immediate: true, deep: true });

// Escuchar evento de toggle móvil
const savedState = localStorage.getItem('sidebarCollapsed')
if (savedState !== null) {
  isCollapsed.value = savedState === 'true'
  // Emitir el evento de colapso al inicializar para sincronizar con App.vue
  nextTick(() => {
    emit('collapse', isCollapsed.value)
  })
}

const handleItemHover = (item, index, event) => {
  if (!isCollapsed.value) return
  
  // Limpiar cualquier timeout previo
  if (hideTooltipTimeout.value) {
    clearTimeout(hideTooltipTimeout.value)
    hideTooltipTimeout.value = null
  }
  
  hoveredItem.value = item
  showTooltip.value = true
  
  nextTick(() => {
    const rect = event.currentTarget.getBoundingClientRect()
    const tooltipWidth = 280 // Ancho máximo del tooltip
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    
    // Calcular posición horizontal
    let left = rect.right + 15
    if (left + tooltipWidth > windowWidth) {
      left = rect.left - tooltipWidth - 15
    }
    
    // Calcular posición vertical
    let top = rect.top
    const tooltipHeight = 200 // Altura estimada del tooltip
    if (top + tooltipHeight > windowHeight) {
      top = windowHeight - tooltipHeight - 20
    }
    
    tooltipStyle.value = {
      left: `${Math.max(10, left)}px`,
      top: `${Math.max(10, top)}px`,
      opacity: '0',
      transform: 'translateY(-10px) scale(0.95)',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    }
    
    // Animar la entrada del tooltip
    setTimeout(() => {
      tooltipStyle.value = {
        ...tooltipStyle.value,
        opacity: '1',
        transform: 'translateY(0) scale(1)'
      }
    }, 10)
  })
}

const hideTooltip = () => {
  // Usar un timeout más largo para dar tiempo a mover el mouse
  hideTooltipTimeout.value = setTimeout(() => {
    if (!isHoveringTooltip.value) {
      // Animar la salida del tooltip
      if (tooltipRef.value) {
        tooltipStyle.value = {
          ...tooltipStyle.value,
          opacity: '0',
          transform: 'translateY(-10px) scale(0.95)'
        }
        
        setTimeout(() => {
          showTooltip.value = false
          hoveredItem.value = null
        }, 200)
      } else {
        showTooltip.value = false
        hoveredItem.value = null
      }
    }
  }, 300) // Aumentar el delay a 300ms
}

const handleTooltipMouseEnter = () => {
  isHoveringTooltip.value = true
  // Limpiar el timeout si existe
  if (hideTooltipTimeout.value) {
    clearTimeout(hideTooltipTimeout.value)
    hideTooltipTimeout.value = null
  }
}

const handleTooltipMouseLeave = () => {
  isHoveringTooltip.value = false
  hideTooltip()
}

const onMenuClick = (itemOrEvent, navigate) => {
  // Manejar tanto llamadas directas como eventos del componente recursivo
  let item, navigationFn
  
  if (itemOrEvent && typeof itemOrEvent === 'object' && itemOrEvent.item) {
    // Viene del componente MenuItemRecursive
    item = itemOrEvent.item
    navigationFn = itemOrEvent.navigate
  } else {
    // Llamada directa
    item = itemOrEvent
    navigationFn = navigate
  }
  
  console.log("Menu item clicked:", item.name, "path:", item.path)
  hideTooltip()
  
  // Cerrar el sidebar en dispositivos móviles
  if (window.innerWidth < 1024) {
    isOpen.value = false
    console.log('Cerrando sidebar en móvil después de clic en menú')
  }
  
  // Verificar si es una URL externa (comienza con http:// o https://)
  if (item.path && (item.path.startsWith('http://') || item.path.startsWith('https://'))) {
    console.log('Abriendo enlace externo en nueva pestaña:', item.path)
    // Abrir en una nueva pestaña
    window.open(item.path.trim(), '_blank')
    return
  }
  console.log('Manejando ruta interna:', item.path)
  
  if (item.varios_legajos) {
    console.log('Este usuario tiene varios legajos. Mostrando modal de selección.')
    pendingNavigation.value = navigationFn
    
    eventBus.emit(EventTypes.SHOW_MODAL, {
      title: 'Carreras, Cursos y Otras Actividades',
      component: () => import('../ui/CareerSelectorModal.vue'),
      props: {
        pendingNavigation: () => {
          console.log('Navegación pendiente ejecutada después de seleccionar carrera')
          pendingNavigation.value?.()
          pendingNavigation.value = null
        }
      },
      hideActions: true
    })
  } else {
    console.log('Ejecutando navegación para:', item.path)
    navigationFn()
  }
}

const obtenerMenu = async () => {
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No hay token disponible')
      return
    }
    console.log('Obteniendo menú con token:', token.substring(0, 10) + '...')

    const response = await fetch(`${API_URL}/user/menu`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('Respuesta de menú:', response.status, response.url)

    if (!response.ok) {
      throw new Error('Error al obtener el menú')
    }

    const data = await response.json()
    console.log('Menú obtenido:', data)

    // Función recursiva para construir la jerarquía de menús
    const buildMenuHierarchy = (items, parentId = null) => {
      console.log('Construyendo jerarquía para parentId:', parentId, 'con', items.length, 'items')
      return items
        .filter(item => item.fk_pantalla_padre === parentId)
        .map(item => {
          const path = item.directorio.trim().startsWith('http') ? item.directorio.trim() : `/${item.carpeta}/${item.directorio.trim()}`
          console.log('Creando menuItem:', item.nombre, 'path:', path)
          const menuItem = {
            id: item.pk_pantalla,
            name: item.nombre,
            path: path,
            varios_legajos: item.varios_legajos,
            icon: getIconComponent(item.icono),
            submenu: []
          }

          // Buscar hijos recursivamente
          const children = buildMenuHierarchy(items, item.pk_pantalla)
          console.log('Hijos encontrados para', item.nombre, ':', children.length)
          if (children.length > 0) {
            menuItem.submenu = children
          }

          return menuItem
        })
    }

    // Agrupar items por sistema y construir jerarquía
    const sistemasPorId = {}
    data.forEach(item => {
      if (!sistemasPorId[item.fk_sistema]) {
        sistemasPorId[item.fk_sistema] = {
          name: item.nombre_sistema,
          icon: getIconComponent(item.icono),
          submenu: []
        }
      }
    })

    // Construir la jerarquía para cada sistema
    Object.keys(sistemasPorId).forEach(sistemaId => {
      const itemsDelSistema = data.filter(item => item.fk_sistema == sistemaId)
      sistemasPorId[sistemaId].submenu = buildMenuHierarchy(itemsDelSistema)
    })

    menuItems.value = Object.values(sistemasPorId)
    console.log('Menú procesado con jerarquía:', menuItems.value)
  } catch (error) {
    console.error('Error al obtener el menú:', error)
  } finally {
    isLoading.value = false
  }
}

const getIconComponent = (iconName) => {
  const iconMap = {
    // Mi Perfil y usuarios
    'person': UserIcon,
    'account_circle': UserIcon,
    'perfil': UserIcon,
    'usuario': UserIcon,
    'usuarios': UserGroupIcon,
    'alumnos': UserGroupIcon,
    'docentes': UserGroupIcon,
    'personal': UserGroupIcon,
    
    // Biblioteca
    'library': BookOpenIcon,
    'library_books': BookOpenIcon,
    'biblioteca': BookOpenIcon,
    'libros': BookOpenIcon,
    'book': BookOpenIcon,
    'books': BookOpenIcon,
    
    // Campus Virtual y Educación
    'school': AcademicCapIcon,
    'campus': AcademicCapIcon,
    'campus_virtual': AcademicCapIcon,
    'educacion': EducationIcon,
    'cursos': EducationIcon,
    'clases': EducationIcon,
    'aula': EducationIcon,
    'aula_virtual': EducationIcon,
    
    // Finanzas y Pagos
    'payment': BanknotesIcon,
    'cuenta_corriente': BanknotesIcon,
    'money': BanknotesIcon,
    'pagos': BanknotesIcon,
    'finanzas': CurrencyDollarIcon,
    'facturacion': CurrencyDollarIcon,
    'cuotas': CurrencyDollarIcon,
    'aranceles': CurrencyDollarIcon,
    
    // Gestiones y Trámites
    'gestiones': ClipboardDocumentIcon,
    'tramites': ClipboardDocumentIcon,
    'solicitudes': ClipboardDocumentIcon,
    'formularios': ClipboardDocumentIcon,
    'forms': ClipboardDocumentIcon,
    'gestion': ClipboardDocumentIcon,
    
    // Certificados y Documentos
    'certificados': DocumentCheckIcon,
    'documentos': DocumentTextIcon,
    'constancias': DocumentDuplicateIcon,
    'diplomas': DocumentCheckIcon,
    'titulos': DocumentCheckIcon,
    'legalizaciones': DocumentCheckIcon,
    
    // Oportunidades Laborales
    'trabajo': BriefcaseIcon,
    'empleo': BriefcaseIcon,
    'oportunidades': BriefcaseIcon,
    'pasantias': BriefcaseIcon,
    'practicas': BriefcaseIcon,
    'bolsa_trabajo': BriefcaseIcon,
    
    // Trayectoria Académica
    'trayectoria': GraduationIcon,
    'academica': GraduationIcon,
    'historial': GraduationIcon,
    'expediente': GraduationIcon,
    'rendimiento': GraduationIcon,
    'notas': GraduationIcon,
    'calificaciones': GraduationIcon,
    
    // Normativas y Reglamentos
    'normativas': ClipboardDocumentListIcon,
    'reglamentos': ClipboardDocumentListIcon,
    'normas': ClipboardDocumentListIcon,
    'regulaciones': ClipboardDocumentListIcon,
    'politicas': ClipboardDocumentListIcon,
    'legales': ClipboardDocumentListIcon,
    
    // Ayuda y Soporte
    'ayuda': QuestionMarkCircleIcon,
    'tutoriales': QuestionMarkCircleIcon,
    'help': QuestionMarkCircleIcon,
    'soporte': QuestionMarkCircleIcon,
    'faq': QuestionMarkCircleIcon,
    'preguntas': QuestionMarkCircleIcon,
    
    // Configuración y Herramientas
    'settings': Cog6ToothIcon,
    'config': Cog6ToothIcon,
    'configuracion': Cog6ToothIcon,
    'herramientas': WrenchScrewdriverIcon,
    'tools': WrenchScrewdriverIcon,
    
    // Calendario y Horarios
    'calendario': CalendarIcon,
    'horarios': ClockIcon,
    'agenda': CalendarIcon,
    'eventos': CalendarIcon,
    
    // Comunicación
    'mensajes': ChatBubbleLeftRightIcon,
    'comunicaciones': EnvelopeIcon,
    'noticias': NewspaperIcon,
    'anuncios': NewspaperIcon,
    'novedades': NewspaperIcon,
    
    // Estadísticas y Reportes
    'estadisticas': ChartBarIcon,
    'reportes': PresentationChartBarIcon,
    'informes': DocumentMagnifyingGlassIcon,
    'analisis': ChartBarIcon,
    
    // Otros
    'informacion': InformationCircleIcon,
    'ubicacion': MapIcon,
    'enlaces': LinkIcon,
    'archivos': FolderIcon,
    'seguridad': ShieldCheckIcon,
    'identificacion': IdentificationIcon,
    'lista': QueueListIcon,
    'tabla': TableCellsIcon,
    'stack': RectangleStackIcon,
    'global': GlobeAltIcon,
    'edificio': BuildingOfficeIcon,
    'contacto': PhoneIcon,
    'editar': PencilSquareIcon,
    
    // Fallback para Home
    'home': HomeIcon,
    'inicio': HomeIcon,
    'dashboard': HomeIcon
  }
  
  // Convertir el nombre del icono a minúsculas y sin espacios
  const normalizedIconName = iconName?.toLowerCase().trim().replace(/\s+/g, '_') || ''
  
  // Buscar el icono en el mapa
  return iconMap[normalizedIconName] || iconMap[normalizedIconName.replace(/_/g, '')] || BuildingLibraryIcon
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('collapse', isCollapsed.value)
  localStorage.setItem('sidebarCollapsed', isCollapsed.value)
  hideTooltip()
  
  // Cerrar todos los submenús cuando se colapsa
  if (isCollapsed.value) {
    openSubmenus.value = {}
  }
}

const toggleSidebar = (event) => {
  // Si estamos en un dispositivo móvil, manejar el toggle
  if (window.innerWidth < 1024) {
    isOpen.value = !isOpen.value
    console.log('Sidebar toggled (mobile):', isOpen.value, 'Window width:', window.innerWidth)
    // Prevenir propagación del evento para evitar comportamientos inesperados
    if (event) {
      event.stopPropagation()
    }
    document.body.clientWidth
  } else {
    isOpen.value = true
    console.log('Sidebar toggled (desktop):', isOpen.value, 'Window width:', window.innerWidth)
  }
}

const toggleSubmenu = (index) => {
  if (!isCollapsed.value) {
    openSubmenus.value = {
      ...openSubmenus.value,
      [index]: !openSubmenus.value[index]
    }
  }
}

const handleLogout = () => {
  authStore.logout()
}

// Manejar cambios de tamaño de ventana - definido fuera de onMounted para evitar problemas de ámbito
const handleResize = () => {
  // En dispositivos grandes (lg y mayores), mantener abierto
  // En dispositivos pequeños, cerrar automáticamente
  if (window.innerWidth >= 1024) {
    isOpen.value = true
  } else {
    isOpen.value = false
  }
}

onMounted(async () => {
  obtenerMenu()
  
  if (!authStore.user && authStore.isAuthenticated) {
    await authStore.fetchDatosPersonales()
  }
  
  // Cargar datos personales si no están disponibles
  if (authStore.isAuthenticated && !authStore.datosPersonales) {
    await authStore.fetchDatosPersonales()
  }
  
  // Inicializar el estado del sidebar según el tamaño de la ventana
  handleResize()
  
  // Agregar event listeners
  window.addEventListener('toggle-mobile-sidebar', (event) => toggleSidebar(event))
  window.addEventListener('resize', handleResize)
  
  // Limpiar event listeners y timeouts al desmontar
  return () => {
    window.removeEventListener('resize', handleResize)
    // Nota: No podemos eliminar el event listener exacto para toggle-mobile-sidebar
    // porque estamos usando una función anónima, pero el componente se desmontará de todos modos
    window.removeEventListener('toggle-mobile-sidebar', (event) => toggleSidebar(event))
    
    if (hideTooltipTimeout.value) {
      clearTimeout(hideTooltipTimeout.value)
    }
  }
})

defineExpose({ toggleSidebar })
</script>

<style scoped>
/* Transiciones suaves */
.router-link-active {
  @apply host-bg-blue-50 host-text-blue-700 dark:host-bg-blue-900/50 dark:host-text-blue-300;
}

/* Scrollbar personalizada para la navegación */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  @apply host-bg-transparent;
}

nav::-webkit-scrollbar-thumb {
  @apply host-bg-gray-300/60 dark:host-bg-gray-600/60 host-rounded-full;
}

nav::-webkit-scrollbar-thumb:hover {
  @apply host-bg-gray-400/60 dark:host-bg-gray-500/60;
}

/* Optimizaciones de rendimiento */
.sidebar-content {
  will-change: transform, width;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Animaciones suaves para hover */
.group:hover {
  transform: translateY(-1px);
}

/* Transiciones para elementos dinámicos */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
