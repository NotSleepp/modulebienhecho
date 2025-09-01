<template>
  <div class="mfe1-min-h-screen mfe1-bg-gradient-to-br mfe1-from-blue-50 mfe1-to-indigo-100 mfe1-flex mfe1-items-center mfe1-justify-center mfe1-p-8">
    <div class="mfe1-max-w-2xl mfe1-mx-auto mfe1-text-center">
      <div class="mfe1-bg-white mfe1-rounded-2xl mfe1-shadow-xl mfe1-p-8 mfe1-border mfe1-border-blue-200">
        <div class="mfe1-mb-8">
          <h1 class="mfe1-text-4xl mfe1-font-bold mfe1-text-blue-600 mfe1-mb-2">{{ msg }}</h1>
          <div class="mfe1-w-24 mfe1-h-1 mfe1-bg-blue-500 mfe1-mx-auto mfe1-rounded-full"></div>
        </div>
        
        <div class="mfe1-bg-blue-50 mfe1-rounded-xl mfe1-p-6 mfe1-mb-6">
          <button
            type="button"
            class="mfe1-bg-blue-600 mfe1-hover:bg-blue-700 mfe1-text-white mfe1-font-semibold mfe1-py-3 mfe1-px-6 mfe1-rounded-lg mfe1-transition-colors mfe1-duration-200 mfe1-shadow-md mfe1-hover:shadow-lg mfe1-transform mfe1-hover:scale-105"
            @click="count++"
          >
            🔢 Count is {{ count }}
          </button>
          
          <p class="mfe1-mt-4 mfe1-text-gray-600 mfe1-text-sm">
            Edit
            <code class="mfe1-bg-gray-200 mfe1-px-2 mfe1-py-1 mfe1-rounded mfe1-text-blue-800 mfe1-font-mono mfe1-text-xs">components/HelloWorld.vue</code> 
            to test HMR
          </p>
        </div>

        <div class="mfe1-grid mfe1-grid-cols-1 mfe1-md:grid-cols-2 mfe1-gap-4 mfe1-mb-6">
          <div class="mfe1-bg-gradient-to-r mfe1-from-blue-500 mfe1-to-purple-600 mfe1-text-white mfe1-p-4 mfe1-rounded-lg">
            <h3 class="mfe1-font-semibold mfe1-mb-2">🚀 MFE-1 Features</h3>
            <ul class="mfe1-text-sm mfe1-space-y-1">
              <li>✅ Vue 3 Composition API</li>
              <li>✅ Tailwind CSS with mfe1- prefix</li>
              <li>✅ Module Federation Ready</li>
            </ul>
          </div>
          
          <div class="mfe1-bg-gradient-to-r mfe1-from-green-500 mfe1-to-teal-600 mfe1-text-white mfe1-p-4 mfe1-rounded-lg">
            <h3 class="mfe1-font-semibold mfe1-mb-2">📚 Resources</h3>
            <a href="https://vuejs.org/guide/" target="_blank" 
               class="mfe1-text-white mfe1-underline mfe1-hover:text-yellow-200 mfe1-transition-colors mfe1-text-sm">
              Vue.js Documentation
            </a>
          </div>
        </div>
        
        <div class="mfe1-flex mfe1-items-center mfe1-justify-center mfe1-space-x-2 mfe1-text-sm mfe1-text-gray-500">
          <span class="mfe1-w-2 mfe1-h-2 mfe1-bg-blue-500 mfe1-rounded-full mfe1-animate-pulse"></span>
          <span>MFE-1 Microfrontend Component</span>
          <span class="mfe1-w-2 mfe1-h-2 mfe1-bg-blue-500 mfe1-rounded-full mfe1-animate-pulse"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import '../style.css'

console.log('🟢 MFE-1: HelloWorld component script setup iniciado');

defineProps({
  msg: String,
})

const count = ref(0)

onBeforeMount(() => {
  console.log('🟢 MFE-1: HelloWorld onBeforeMount - Componente a punto de montarse');
});

onMounted(() => {
  console.log('🟢 MFE-1: HelloWorld onMounted - Componente montado');
  
  setTimeout(() => {
    console.log('🟢 MFE-1: HelloWorld verificando estilos después de 500ms...');
    
    // Verificar el contenedor principal con clases mfe1-
    const mainContainer = document.querySelector('.mfe1-min-h-screen');
    if (mainContainer) {
      const computedStyles = window.getComputedStyle(mainContainer);
      console.log('🟢 MFE-1: HelloWorld contenedor principal encontrado');
      console.log('🟢 MFE-1: HelloWorld min-height:', computedStyles.minHeight);
      console.log('🟢 MFE-1: HelloWorld background:', computedStyles.background);
      console.log('🟢 MFE-1: HelloWorld display:', computedStyles.display);
      console.log('🟢 MFE-1: HelloWorld padding:', computedStyles.padding);
    } else {
      console.error('🟢 MFE-1: HelloWorld ❌ No se encontró el contenedor principal .mfe1-min-h-screen');
    }
    
    // Verificar el botón
    const button = document.querySelector('.mfe1-bg-blue-600');
    if (button) {
      const buttonStyles = window.getComputedStyle(button);
      console.log('🟢 MFE-1: HelloWorld botón encontrado');
      console.log('🟢 MFE-1: HelloWorld botón background-color:', buttonStyles.backgroundColor);
      console.log('🟢 MFE-1: HelloWorld botón color:', buttonStyles.color);
      console.log('🟢 MFE-1: HelloWorld botón padding:', buttonStyles.padding);
      console.log('🟢 MFE-1: HelloWorld botón border-radius:', buttonStyles.borderRadius);
    } else {
      console.error('🟢 MFE-1: HelloWorld ❌ No se encontró el botón .mfe1-bg-blue-600');
    }
    
    // Contar todos los elementos con clases mfe1-
    const mfe1Elements = document.querySelectorAll('[class*="mfe1-"]');
    console.log('🟢 MFE-1: HelloWorld total elementos con clases mfe1-*:', mfe1Elements.length);
    
    // Verificar si las clases CSS están siendo aplicadas
    mfe1Elements.forEach((el, index) => {
      if (index < 5) { // Solo los primeros 5 para no saturar
        const styles = window.getComputedStyle(el);
        console.log(`🟢 MFE-1: HelloWorld elemento ${index}:`, {
          className: el.className,
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          display: styles.display,
          padding: styles.padding
        });
      }
    });
  }, 500);
});

console.log('🟢 MFE-1: HelloWorld component script setup completado');
</script>

<style module>
.button {
  background-color: #41b883;
  border: 2px solid #34495E;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: sans-serif;
}

.button:hover {
  background-color: #36a071;
}

.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
}

.readTheDocs {
  color: #888;
}
</style>
