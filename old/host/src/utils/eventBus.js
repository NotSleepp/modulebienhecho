import mitt from 'mitt';

// Usamos `globalThis` para asegurar que todos los contextos (host y remotos)
// referencien el MISMO objeto global, evitando problemas cuando `window` no
// está disponible o está ofuscado en el sandbox del runtime de federation.
const GLOBAL_CONTEXT = typeof globalThis !== 'undefined'
  ? globalThis
  : (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {}));

const GLOBAL_KEY = '__central_event_bus__';

// Referencias que se llenarán según exista instancia previa o se cree una nueva
let eventBus;
let EventTypes;

if (GLOBAL_CONTEXT[GLOBAL_KEY]) {
  // Ya existe una instancia global (creada por otro import/remoto)
  ({ eventBus, EventTypes } = GLOBAL_CONTEXT[GLOBAL_KEY]);
} else {
  const emitter = mitt();

  const emitterId = Math.random().toString(36).substring(2, 8);
  console.log(`[EventBus] New emitter created: ${emitterId}`);

  EventTypes = {
    USER_ACTION: 'user-action',
    NAVIGATION: 'navigation',
    DATA_UPDATED: 'data-updated',
    ERROR: 'error',
    SUCCESS: 'success',
    NOTIFICATION: 'notification',
    SHOW_MODAL: 'show-modal'
  };

  // Wrapper con trazas de depuración
  eventBus = {
    emit(type, payload) {
      if (!Object.values(EventTypes).includes(type)) {
        console.warn(`[EventBus] Warning: Emitting undefined event type "${type}"`);
      }
      console.log(`[EventBus] Emitting ${type}:`, payload);
      emitter.emit(type, payload);

      // Puente global: propaga el evento mediante CustomEvent para asegurar
      // compatibilidad entre instancias duplicadas que pudieran existir por
      // diferencias de bundling. Todos los buses escuchan 'central_bus:<type>'.
      try {
        GLOBAL_CONTEXT.dispatchEvent?.(new CustomEvent(`central_bus:${type}`, {
          detail: payload
        }));
      } catch (e) {
        // Algunos entornos (por ejemplo, test) no tienen dispatchEvent
      }
    },
    on(type, handler) {
      if (!Object.values(EventTypes).includes(type)) {
        console.warn(`[EventBus] Warning: Subscribing to undefined event type "${type}"`);
      }
      console.log(`[EventBus] Subscribing to ${type}`);
      emitter.on(type, handler);

      // Registrar listener global si aún no existe
      const globalListenerKey = `__central_bus_listener_${type}__`;
      if (!GLOBAL_CONTEXT[globalListenerKey]) {
        GLOBAL_CONTEXT.addEventListener?.(`central_bus:${type}`, (e) => {
          emitter.emit(type, e.detail);
        });
        GLOBAL_CONTEXT[globalListenerKey] = true;
      }
      return () => {
        console.log(`[EventBus] Unsubscribing from ${type}`);
        emitter.off(type, handler);
      };
    },
    off(type, handler) {
      if (!Object.values(EventTypes).includes(type)) {
        console.warn(`[EventBus] Warning: Removing handler for undefined event type "${type}"`);
      }
      console.log(`[EventBus] Removing handler for ${type}`);
      emitter.off(type, handler);
    }
  };

  // Registrar en el contexto global para que los siguientes importadores reutilicen la instancia
  GLOBAL_CONTEXT[GLOBAL_KEY] = { eventBus, EventTypes };
}

export { EventTypes };
export default eventBus; 