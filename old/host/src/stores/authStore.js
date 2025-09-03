import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '../router'
//import { useSharedStore } from 'perfil/store'

const API_URL = 'https://backend.autogestion.atlantida.edu.ar/api'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const isReady = ref(false)
  const isTransitioning = ref(false)
  const user = ref(null)
  const datosPersonales = ref(null)
  const tokenRef = ref(localStorage.getItem('token'))
  //const sharedStore = useSharedStore()

  function initAuth() {
    if (tokenRef.value) {
      isAuthenticated.value = true
      //sharedStore.setToken(token)
      fetchDatosPersonales()
    }
    isReady.value = true
  }

  async function login(credentials) {
    try {
      // No marcamos transición hasta confirmar un login exitoso
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: credentials.dni,
          password: credentials.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.mensaje || 'Error de autenticación')
      }

      if (data.token) {
        setToken(data.token)
        
        // Guardar datos básicos del usuario
        user.value = {
          id: data.id,
          usuario: data.usuario,
          nombreapellido: data.nombreapellido,
          email: data.email
        }

        // Obtener datos personales inmediatamente
        await fetchDatosPersonales()
        
        // Establecer autenticación después de obtener todos los datos
        isAuthenticated.value = true
        
        // Mostrar overlay de transición sólo durante la navegación a la app
        isTransitioning.value = true
        await router.push('/')
        return { success: true }
      }

      return {
        success: false,
        error: 'No se recibió el token de autenticación'
      }
    } catch (error) {
      console.error('Error en login:', error)
      return {
        success: false,
        error: error.message || 'Error al intentar iniciar sesión'
      }
    } finally {
      // Asegurar que el estado de transición se limpie siempre
      isTransitioning.value = false
    }
  }

  async function logout() {
    try {
      console.log('🔐 Iniciando proceso de logout...')
      isTransitioning.value = true
      setToken(null)
      user.value = null
      datosPersonales.value = null
      // Limpiar el token en el store compartido
      //sharedStore.clearToken()
      await router.push('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      isTransitioning.value = false
    }
  }

  async function fetchDatosPersonales() {
    try {
      const response = await fetch(`${API_URL}/perfil/datosPersonales`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error al obtener datos personales')
      }

      const data = await response.json()
      if (data.estado && data.datos) {
        // Actualizar los datos personales y del usuario
        datosPersonales.value = data
        // Actualizar también los datos básicos del usuario
        if (data.datos) {
          user.value = {
            ...user.value,
            nombreapellido: `${data.datos.nombre} ${data.datos.apellido}`.trim(),
            ...data.datos
          }
        }
      } else {
        throw new Error(data.mensaje || 'Error al obtener datos personales')
      }
    } catch (error) {
      console.error('Error al obtener datos personales:', error)
      // No hacemos logout aquí para no interrumpir la sesión si falla
    }
  }

  async function requestAccount(dni) {
    try {
      const response = await fetch(`${API_URL}/auth/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dni })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al solicitar cuenta')
      }

      return { 
        success: true, 
        message: data.message || 'Solicitud enviada correctamente' 
      }
    } catch (error) {
      console.error('Error al solicitar cuenta:', error)
      return {
        success: false,
        error: error.message || 'Error al procesar la solicitud'
      }
    }
  }

  async function recoverPassword(dni) {
    try {
      const response = await fetch(`${API_URL}/auth/recovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dni })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al recuperar contraseña')
      }

      return { 
        success: true, 
        message: data.message || 'Instrucciones enviadas correctamente' 
      }
    } catch (error) {
      console.error('Error al recuperar contraseña:', error)
      return {
        success: false,
        error: error.message || 'Error al procesar la solicitud'
      }
    }
  }

  function setToken(newToken) {
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
    tokenRef.value = newToken
    isAuthenticated.value = !!newToken
  }

  return {
    isAuthenticated,
    isReady,
    isTransitioning,
    user,
    datosPersonales,
    token: computed(() => tokenRef.value),
    initAuth,
    login,
    logout,
    requestAccount,
    recoverPassword,
    fetchDatosPersonales,
    setToken
  }
})