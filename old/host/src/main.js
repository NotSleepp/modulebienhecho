import { createApp } from "vue";
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
import "animate.css";

// Importar plugins de utilidad
import VueClickAway from "vue3-click-away";
import VueTippy from 'vue-tippy';
import VueTheMask from 'vue-the-mask';
import { initFetchInterceptor } from "./utils/fetchInterceptor";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/shift-away.css';

// Definir la URL de la API como constante global
export const API_URL = "https://backend.autogestion.atlantida.edu.ar/api";

// Inicializar Module Federation
const initApp = async () => {
  console.log('🚀 Iniciando la aplicación...');
  try {
    console.log('📦 Intentando cargar módulos remotos...');
    // Pre-carga de stores remotos. Utilizamos Promise.allSettled para que la app no se detenga
    // si algún micro-front aún no está disponible.
    await Promise.allSettled([
      import('home/store').then(() => console.log('✅ Store remoto cargado')),
      // `perfil/careerStore` puede no estar disponible en ciertos entornos; por eso lo manejamos de forma resiliente.
      import('perfil/careerStore').then(() => console.log('✅ Store de carreras cargado')),
      // Pre-carga de store compartido de Biblioteca
      import('biblioteca/sharedStore').then(() => console.log('✅ Store de Biblioteca cargado'))
    ]);
    console.log('✅ Todos los módulos remotos cargados correctamente');

    const app = createApp(App);
    const pinia = createPinia();
    const head = createHead();
    console.log('📱 App, Pinia y Head creados');

    // Configuración global
    app.config.performance = true;
    app.config.unwrapInjectedRef = true;

    // URLs del backend
    app.config.globalProperties.$api = API_URL + "/";
    app.config.globalProperties.$frontend = "https://autogestion2.atlantida.edu.ar/frontend/";
    console.log('⚙️ Configuración global establecida');

    // Inicializar el interceptor de fetch
    initFetchInterceptor();
    console.log('🔄 Interceptor de fetch inicializado');

    // Plugins
    app.use(pinia);
    app.use(router);
    app.use(head);
    app.use(VueClickAway);
    app.use(VueTheMask);
    app.use(VueTippy, {
      defaultProps: {
        theme: 'light',
        animation: 'shift-away',
        arrow: true,
        delay: [50, 0],
        duration: [200, 150],
        placement: 'bottom',
      },
    });
    console.log('🔌 Plugins instalados');

    // Directivas globales
    app.directive('focus', {
      mounted: (el) => el.focus()
    });

    // Manejo de errores global
    app.config.errorHandler = (err, vm, info) => {
      console.error('❌ Error global:', err);
      console.error('🔍 Componente:', vm);
      console.error('ℹ️ Info:', info);
    };

    console.log('🎯 Intentando montar la aplicación...');
    app.mount("#app");
    console.log('✅ Aplicación montada correctamente');
  } catch (error) {
    console.error('❌ Error inicializando la aplicación:', error);
    console.error('Stack trace:', error.stack);
  }
};

console.log('🏁 Archivo main.js cargado, iniciando aplicación...');
initApp();
