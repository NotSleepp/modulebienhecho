import apiService from './api.js'

class AuthService {
  async login(credentials) {
    try {
      const response = await apiService.post('/auth/login', credentials)
      
      if (response.token) {
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      
      return response
    } catch (error) {
      console.error('Error detallado en login:', error)
      
      if (error.message.includes('500')) {
        throw new Error('El servidor está experimentando problemas técnicos. Por favor, intenta nuevamente en unos minutos o contacta al soporte técnico.')
      } else if (error.message.includes('401')) {
        throw new Error('Credenciales incorrectas. Verifica tu DNI y contraseña.')
      } else if (error.message.includes('404')) {
        throw new Error('Servicio de autenticación no disponible.')
      } else if (error.message.includes('Network')) {
        throw new Error('Error de conexión. Verifica tu conexión a internet.')
      } else {
        throw new Error('Error en el inicio de sesión: ' + error.message)
      }
    }
  }

  async logout() {
    try {
      await apiService.post('/auth/logout')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }
  }

  async refreshToken() {
    try {
      const response = await apiService.post('/auth/refresh')
      
      if (response.token) {
        localStorage.setItem('authToken', response.token)
      }
      
      return response
    } catch (error) {
      this.logout()
      throw error
    }
  }

  async forgotPassword(email) {
    return await apiService.post('/auth/forgot-password', { email })
  }

  async resetPassword(token, password) {
    return await apiService.post('/auth/reset-password', { token, password })
  }

  async requestAccount(userData) {
    return await apiService.post('/auth/request-account', userData)
  }

  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  getToken() {
    return localStorage.getItem('authToken')
  }

  isAuthenticated() {
    return !!this.getToken()
  }
}

export default new AuthService()