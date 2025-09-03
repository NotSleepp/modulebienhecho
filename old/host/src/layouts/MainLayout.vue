<template>
  <div class="host-min-h-screen host-bg-gray-50 dark:host-bg-gray-900 host-transition-colors host-duration-300">
    <!-- Sidebar -->
    <Sidebar v-if="isAuthenticated" />
    
    <!-- Main Content -->
    <div :class="{
      'host-ml-64': isAuthenticated && !isSidebarCollapsed,
      'host-ml-16': isAuthenticated && isSidebarCollapsed,
      'host-ml-0': !isAuthenticated
    }" class="host-transition-all host-duration-300">
      <!-- Header -->
      <header v-if="isAuthenticated" class="host-bg-white dark:host-bg-gray-800 host-shadow-sm host-border-b host-border-gray-200 dark:host-border-gray-700">
        <div class="host-px-4 host-sm:px-6 host-lg:px-8">
          <div class="host-flex host-justify-between host-h-16">
            <div class="host-flex host-items-center">
              <h1 class="host-text-xl host-font-semibold host-text-gray-900 dark:host-text-white">
                {{ pageTitle }}
              </h1>
            </div>
            
            <div class="host-flex host-items-center host-space-x-4">
              <!-- Theme Toggle -->
              <ThemeToggle />
              
              <!-- User Menu -->
              <div class="host-relative">
                <button @click="showUserMenu = !showUserMenu" 
                        class="host-flex host-items-center host-space-x-2 host-text-sm host-rounded-full host-focus:outline-none host-focus:ring-2 host-focus:ring-offset-2 host-focus:ring-indigo-500">
                  <div class="host-w-8 host-h-8 host-bg-indigo-500 host-rounded-full host-flex host-items-center host-justify-center">
                    <span class="host-text-white host-font-medium">{{ userInitials }}</span>
                  </div>
                </button>
                
                <!-- User Dropdown -->
                <div v-if="showUserMenu" 
                     class="host-absolute host-right-0 host-mt-2 host-w-48 host-bg-white dark:host-bg-gray-800 host-rounded-md host-shadow-lg host-py-1 host-z-50">
                  <a href="#" class="host-block host-px-4 host-py-2 host-text-sm host-text-gray-700 dark:host-text-gray-300 hover:host-bg-gray-100 dark:hover:host-bg-gray-700">
                    Perfil
                  </a>
                  <a href="#" class="host-block host-px-4 host-py-2 host-text-sm host-text-gray-700 dark:host-text-gray-300 hover:host-bg-gray-100 dark:hover:host-bg-gray-700">
                    Configuración
                  </a>
                  <button @click="handleLogout" 
                          class="host-block host-w-full host-text-left host-px-4 host-py-2 host-text-sm host-text-gray-700 dark:host-text-gray-300 hover:host-bg-gray-100 dark:hover:host-bg-gray-700">
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Page Content -->
      <main class="host-flex-1">
        <div class="host-py-6">
          <div class="host-max-w-7xl host-mx-auto host-px-4 host-sm:px-6 host-lg:px-8">
            <router-view />
          </div>
        </div>
      </main>
    </div>
    
    <!-- Global Components -->
    <ModalListener />
    <NotificationListener />
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../components/common/Sidebar.vue'
import ThemeToggle from '../components/ui/ThemeToggle.vue'
import ModalListener from '../components/common/ModalListener.vue'
import NotificationListener from '../components/common/NotificationListener.vue'
import { useAuth } from '../composables/useAuth.js'

export default {
  name: 'MainLayout',
  components: {
    Sidebar,
    ThemeToggle,
    ModalListener,
    NotificationListener
  },
  setup() {
    const route = useRoute()
    const { isAuthenticated, user, logout } = useAuth()
    
    const showUserMenu = ref(false)
    const isSidebarCollapsed = ref(false)
    
    const pageTitle = computed(() => {
      return route.meta?.title || 'Dashboard'
    })
    
    const userInitials = computed(() => {
      if (!user.value) return 'U'
      const names = user.value.name?.split(' ') || ['Usuario']
      return names.map(name => name.charAt(0)).join('').toUpperCase().slice(0, 2)
    })
    
    const handleLogout = async () => {
      showUserMenu.value = false
      await logout()
    }
    
    const handleClickOutside = (event) => {
      if (showUserMenu.value && !event.target.closest('.host-relative')) {
        showUserMenu.value = false
      }
    }
    
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    
    return {
      isAuthenticated,
      user,
      showUserMenu,
      isSidebarCollapsed,
      pageTitle,
      userInitials,
      handleLogout
    }
  }
}
</script>