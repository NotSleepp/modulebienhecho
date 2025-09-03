<template>
  <div class="host-space-y-6">
    <!-- Welcome Section -->
    <div class="host-bg-white dark:host-bg-gray-800 host-overflow-hidden host-shadow host-rounded-lg">
      <div class="host-px-4 host-py-5 host-sm:p-6">
        <div class="host-flex host-items-center">
          <div class="host-flex-shrink-0">
            <div class="host-w-12 host-h-12 host-bg-indigo-500 host-rounded-lg host-flex host-items-center host-justify-center">
              <svg class="host-w-6 host-h-6 host-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 7l5 5l5-5"></path>
              </svg>
            </div>
          </div>
          <div class="host-ml-5 host-w-0 host-flex-1">
            <dl>
              <dt class="host-text-sm host-font-medium host-text-gray-500 dark:host-text-gray-400 host-truncate">
                Bienvenido de vuelta
              </dt>
              <dd class="host-text-lg host-font-medium host-text-gray-900 dark:host-text-white">
                {{ user?.name || 'Usuario' }}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="host-grid host-grid-cols-1 host-gap-5 host-sm:grid-cols-2 host-lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.name" 
           class="host-bg-white dark:host-bg-gray-800 host-overflow-hidden host-shadow host-rounded-lg">
        <div class="host-p-5">
          <div class="host-flex host-items-center">
            <div class="host-flex-shrink-0">
              <div :class="stat.iconBg" class="host-w-8 host-h-8 host-rounded-md host-flex host-items-center host-justify-center">
                <component :is="stat.icon" class="host-w-5 host-h-5 host-text-white" />
              </div>
            </div>
            <div class="host-ml-5 host-w-0 host-flex-1">
              <dl>
                <dt class="host-text-sm host-font-medium host-text-gray-500 dark:host-text-gray-400 host-truncate">
                  {{ stat.name }}
                </dt>
                <dd class="host-text-lg host-font-medium host-text-gray-900 dark:host-text-white">
                  {{ stat.value }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="host-bg-white dark:host-bg-gray-800 host-shadow host-rounded-lg">
      <div class="host-px-4 host-py-5 host-sm:p-6">
        <h3 class="host-text-lg host-leading-6 host-font-medium host-text-gray-900 dark:host-text-white">
          Actividad Reciente
        </h3>
        <div class="host-mt-5">
          <div class="host-flow-root">
            <ul class="host--mb-8">
              <li v-for="(activity, index) in recentActivity" :key="index">
                <div class="host-relative host-pb-8">
                  <div v-if="index !== recentActivity.length - 1" 
                       class="host-absolute host-top-5 host-left-5 host--ml-px host-h-full host-w-0.5 host-bg-gray-200 dark:host-bg-gray-600">
                  </div>
                  <div class="host-relative host-flex host-items-start host-space-x-3">
                    <div class="host-relative">
                      <div :class="activity.iconBg" 
                           class="host-h-10 host-w-10 host-rounded-full host-flex host-items-center host-justify-center host-ring-8 host-ring-white dark:host-ring-gray-800">
                        <component :is="activity.icon" class="host-h-5 host-w-5 host-text-white" />
                      </div>
                    </div>
                    <div class="host-min-w-0 host-flex-1">
                      <div>
                        <div class="host-text-sm">
                          <span class="host-font-medium host-text-gray-900 dark:host-text-white">
                            {{ activity.title }}
                          </span>
                        </div>
                        <p class="host-mt-0.5 host-text-sm host-text-gray-500 dark:host-text-gray-400">
                          {{ activity.description }}
                        </p>
                      </div>
                      <div class="host-mt-2 host-text-sm host-text-gray-500 dark:host-text-gray-400">
                        <time :datetime="activity.datetime">{{ activity.date }}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth.js'

export default {
  name: 'DashboardView',
  setup() {
    const { user } = useAuth()
    
    const stats = ref([
      {
        name: 'Total de Usuarios',
        value: '1,234',
        icon: 'UserGroupIcon',
        iconBg: 'host-bg-blue-500'
      },
      {
        name: 'Proyectos Activos',
        value: '23',
        icon: 'FolderIcon',
        iconBg: 'host-bg-green-500'
      },
      {
        name: 'Tareas Completadas',
        value: '456',
        icon: 'CheckCircleIcon',
        iconBg: 'host-bg-yellow-500'
      },
      {
        name: 'Rendimiento',
        value: '98.2%',
        icon: 'ChartBarIcon',
        iconBg: 'host-bg-purple-500'
      }
    ])
    
    const recentActivity = ref([
      {
        title: 'Usuario creado',
        description: 'Se registró un nuevo usuario en el sistema',
        date: 'Hace 2 horas',
        datetime: '2024-01-15T14:30:00',
        icon: 'UserPlusIcon',
        iconBg: 'host-bg-blue-500'
      },
      {
        title: 'Proyecto actualizado',
        description: 'Se actualizó la configuración del proyecto principal',
        date: 'Hace 4 horas',
        datetime: '2024-01-15T12:30:00',
        icon: 'PencilIcon',
        iconBg: 'host-bg-green-500'
      },
      {
        title: 'Backup completado',
        description: 'Se completó el backup automático del sistema',
        date: 'Hace 6 horas',
        datetime: '2024-01-15T10:30:00',
        icon: 'CloudArrowUpIcon',
        iconBg: 'host-bg-yellow-500'
      }
    ])
    
    onMounted(() => {
      // Aquí podrías cargar datos reales desde la API
      console.log('Dashboard mounted')
    })
    
    return {
      user,
      stats,
      recentActivity
    }
  }
}
</script>