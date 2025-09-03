import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSharedStore } from 'home/store'

export const useThemeStore = defineStore('theme', () => {
  // Estado reactivo
  const isDark = ref(
    localStorage.getItem('theme') !== null 
      ? localStorage.getItem('theme') === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  // Getters computados
  const currentTheme = computed(() => isDark.value ? 'dark' : 'light')

  // Acciones
  function toggleTheme() {
    isDark.value = !isDark.value
    applyTheme()
    
    // Sincronizar con el store remoto
    try {
      const sharedStore = useSharedStore()
      sharedStore.setTheme(isDark.value)
    } catch (error) {
      console.warn('No se pudo sincronizar el tema con el store remoto:', error)
    }
  }

  function initTheme() {
    // Si no hay tema guardado, usar el tema del sistema
    if (localStorage.getItem('theme') === null) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
      isDark.value = prefersDark.matches
      
      // Escuchar cambios en las preferencias del sistema solo si no hay tema guardado
      prefersDark.addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === null) {
          isDark.value = e.matches
          applyTheme()
          try {
            const sharedStore = useSharedStore()
            sharedStore.setTheme(isDark.value)
          } catch (error) {
            console.warn('No se pudo sincronizar el tema con el store remoto:', error)
          }
        }
      })
    }
    
    // Aplicar el tema inicial
    applyTheme()
    
    // Sincronizar con el store remoto
    try {
      const sharedStore = useSharedStore()
      sharedStore.setTheme(isDark.value)
    } catch (error) {
      console.warn('No se pudo sincronizar el tema con el store remoto:', error)
    }
  }

  function applyTheme() {
    // Aplicar clase al elemento html
    const root = document.documentElement
    
    // Desactivar transiciones de forma temporal para evitar el efecto "por secciones"
    root.classList.add('no-transition')
    // Forzar reflujo para asegurarnos de que la clase se aplique de inmediato
    void root.offsetWidth

    if (isDark.value) {
      root.classList.add('host-dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('host-dark')
      localStorage.setItem('theme', 'light')
    }

    // Reactivar transiciones en el siguiente ciclo del event-loop
    setTimeout(() => {
      root.classList.remove('no-transition')
    }, 0)
  }

  function setTheme(theme) {
    isDark.value = theme === 'dark'
    applyTheme()
  }

  return {
    isDark,
    currentTheme,
    toggleTheme,
    initTheme,
    applyTheme,
    setTheme
  }
})