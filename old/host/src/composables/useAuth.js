import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService.js'
import { useAuthStore } from '../stores/authStore.js'

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)

  const login = async (credentials) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authService.login(credentials)
      authStore.setUser(response.user)
      authStore.setToken(response.token)
      
      router.push('/dashboard')
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    
    try {
      await authService.logout()
      authStore.clearAuth()
      router.push('/login')
    } catch (err) {
      console.error('Error durante logout:', err)
    } finally {
      isLoading.value = false
    }
  }

  const forgotPassword = async (email) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authService.forgotPassword(email)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const requestAccount = async (userData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authService.requestAccount(userData)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    isLoading,
    error,
    isAuthenticated,
    user,
    login,
    logout,
    forgotPassword,
    requestAccount,
    clearError
  }
}