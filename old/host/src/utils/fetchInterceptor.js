import { useAuthStore } from '../stores/authStore.js';
import eventBus, { EventTypes } from './eventBus';

export function initFetchInterceptor() {
  const originalFetch = window.fetch;
  console.log('[FetchInterceptor] Inicializando interceptor de fetch en HOST');

  window.fetch = async (...args) => {
    const authStore = useAuthStore();

    try {
      const [resource, config = {}] = args;
      const token = localStorage.getItem("token");

      // Verificar si el token existe antes de hacer la solicitud
      if (!token && resource.includes('/api/') && !resource.includes('/api/auth/')) {
        console.warn('[FetchInterceptor] Intento de solicitud autenticada sin token disponible:', resource);
        eventBus.emit(EventTypes.ERROR, {
          message: 'No hay sesión activa. Por favor, inicie sesión nuevamente.',
          timestamp: new Date().toISOString()
        });
        throw new Error('No hay token de autenticación disponible');
      }

      const headers = {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : undefined
      };

      console.log(`[FetchInterceptor] Solicitud a ${resource}`);
      const response = await originalFetch(resource, { ...config, headers });

      // Intentar obtener un nuevo token:
      // 1) Desde el header "X-New-Token" (si el backend lo expone)
      // 2) Como fallback, desde el cuerpo JSON (propiedades: token | newToken)

      let newToken = response.headers.get('x-new-token') || response.headers.get('X-New-Token');

      // Si el header no está accesible (frecuente cuando el backend no expone CORS)
      // intentamos clonar la respuesta y leer el token del body JSON.
      if (!newToken) {
        try {
          const cloned = response.clone();
          const data = await cloned.json();
          newToken = data?.token || data?.newToken || null;
        } catch (_) {
          // Ignorar: la respuesta no es JSON o ya fue consumida.
        }
      }

      if (newToken) {
        console.log('[FetchInterceptor] Nuevo token recibido, actualizando...');
        localStorage.setItem('token', newToken);
        authStore.setToken(newToken);
      }

      // Verificar si la respuesta es un 401 (No autorizado)
      // Evitamos forzar el logout en endpoints de autenticación (por ejemplo, /auth/login)
      // para permitir que las pantallas de login manejen sus propios mensajes de error.
      if (response.status === 401 && !resource.includes('/api/auth/')) {
        console.warn('[FetchInterceptor] Error de autenticación (401) en:', resource);

        // Emitir notificación genérica de sesión expirada sólo si el usuario estaba autenticado
        if (authStore.isAuthenticated) {
          eventBus.emit(EventTypes.ERROR, {
            message: 'Sesión expirada. Por favor, inicie sesión nuevamente.',
            timestamp: new Date().toISOString()
          });

          // Cerrar la sesión para limpiar el estado y redirigir al login
          authStore.logout();
        }
      }

      return response;
    } catch (error) {
      console.error("[FetchInterceptor] Error en Fetch:", error);
      throw error;
    }
  };
}