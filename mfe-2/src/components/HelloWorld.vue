<template>
  <div class="mfe2-min-h-screen mfe2-bg-gradient-to-br mfe2-from-purple-50 mfe2-to-pink-100 mfe2-flex mfe2-items-center mfe2-justify-center mfe2-p-8">
    <div class="mfe2-max-w-2xl mfe2-mx-auto mfe2-text-center">
      <div class="mfe2-bg-white mfe2-rounded-3xl mfe2-shadow-2xl mfe2-p-8 mfe2-border mfe2-border-purple-200 mfe2-backdrop-blur-sm">
        <div class="mfe2-mb-8">
          <div class="mfe2-inline-flex mfe2-items-center mfe2-justify-center mfe2-w-16 mfe2-h-16 mfe2-bg-purple-100 mfe2-rounded-full mfe2-mb-4">
            <span class="mfe2-text-2xl">🎨</span>
          </div>
          <h1 class="mfe2-text-4xl mfe2-font-bold mfe2-text-purple-600 mfe2-mb-2">{{ msg }}</h1>
          <div class="mfe2-w-32 mfe2-h-1 mfe2-bg-gradient-to-r mfe2-from-purple-500 mfe2-to-pink-500 mfe2-mx-auto mfe2-rounded-full"></div>
        </div>
        
        <div class="mfe2-bg-gradient-to-r mfe2-from-purple-50 mfe2-to-pink-50 mfe2-rounded-2xl mfe2-p-6 mfe2-mb-6 mfe2-border mfe2-border-purple-100">
          <button
            type="button"
            class="mfe2-bg-gradient-to-r mfe2-from-purple-600 mfe2-to-pink-600 mfe2-hover:from-purple-700 mfe2-hover:to-pink-700 mfe2-text-white mfe2-font-bold mfe2-py-4 mfe2-px-8 mfe2-rounded-xl mfe2-transition-all mfe2-duration-300 mfe2-shadow-lg mfe2-hover:shadow-xl mfe2-transform mfe2-hover:scale-110 mfe2-hover:-rotate-1"
            @click="count++"
          >
            ✨ Counter: {{ count }} ✨
          </button>
          
          <p class="mfe2-mt-4 mfe2-text-gray-600 mfe2-text-sm mfe2-italic">
            Modify
            <code class="mfe2-bg-purple-100 mfe2-px-3 mfe2-py-1 mfe2-rounded-lg mfe2-text-purple-800 mfe2-font-mono mfe2-text-xs mfe2-border mfe2-border-purple-200">components/HelloWorld.vue</code> 
            for hot module replacement
          </p>
        </div>

        <div class="mfe2-space-y-4 mfe2-mb-6">
          <div class="mfe2-bg-gradient-to-r mfe2-from-purple-500 mfe2-via-pink-500 mfe2-to-red-500 mfe2-text-white mfe2-p-6 mfe2-rounded-xl mfe2-shadow-lg">
            <h3 class="mfe2-font-bold mfe2-mb-3 mfe2-text-lg">🌟 MFE-2 Highlights</h3>
            <div class="mfe2-grid mfe2-grid-cols-2 mfe2-gap-3 mfe2-text-sm">
              <div class="mfe2-flex mfe2-items-center mfe2-space-x-2">
                <span class="mfe2-w-2 mfe2-h-2 mfe2-bg-yellow-300 mfe2-rounded-full"></span>
                <span>Vue 3 + Vite</span>
              </div>
              <div class="mfe2-flex mfe2-items-center mfe2-space-x-2">
                <span class="mfe2-w-2 mfe2-h-2 mfe2-bg-yellow-300 mfe2-rounded-full"></span>
                <span>Tailwind mfe2- prefix</span>
              </div>
              <div class="mfe2-flex mfe2-items-center mfe2-space-x-2">
                <span class="mfe2-w-2 mfe2-h-2 mfe2-bg-yellow-300 mfe2-rounded-full"></span>
                <span>Module Federation</span>
              </div>
              <div class="mfe2-flex mfe2-items-center mfe2-space-x-2">
                <span class="mfe2-w-2 mfe2-h-2 mfe2-bg-yellow-300 mfe2-rounded-full"></span>
                <span>Responsive Design</span>
              </div>
            </div>
          </div>
          
          <div class="mfe2-bg-white mfe2-border-2 mfe2-border-dashed mfe2-border-purple-300 mfe2-p-4 mfe2-rounded-xl">
            <p class="mfe2-text-purple-600 mfe2-font-semibold mfe2-mb-2">📖 Learn More</p>
            <a href="https://vuejs.org/guide/" target="_blank" 
               class="mfe2-text-purple-500 mfe2-hover:text-pink-500 mfe2-underline mfe2-transition-colors mfe2-text-sm mfe2-font-medium">
              Explore Vue.js Documentation →
            </a>
          </div>
        </div>
        
        <div class="mfe2-flex mfe2-items-center mfe2-justify-center mfe2-space-x-3">
          <div class="mfe2-flex mfe2-space-x-1">
            <span class="mfe2-w-3 mfe2-h-3 mfe2-bg-purple-400 mfe2-rounded-full mfe2-animate-bounce"></span>
            <span class="mfe2-w-3 mfe2-h-3 mfe2-bg-pink-400 mfe2-rounded-full mfe2-animate-bounce mfe2-animation-delay-75"></span>
            <span class="mfe2-w-3 mfe2-h-3 mfe2-bg-red-400 mfe2-rounded-full mfe2-animate-bounce mfe2-animation-delay-150"></span>
          </div>
          <span class="mfe2-text-sm mfe2-text-gray-500 mfe2-font-medium">MFE-2 Microfrontend</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import '../style.css'

console.log('🟣 MFE-2: HelloWorld component script setup iniciado');

defineProps({
  msg: String,
})

const count = ref(0)

onBeforeMount(() => {
  console.log('🟣 MFE-2: HelloWorld onBeforeMount - Componente a punto de montarse');
});

onMounted(() => {
  console.log('🟣 MFE-2: HelloWorld onMounted - Componente montado');
  
  setTimeout(() => {
    console.log('🟣 MFE-2: HelloWorld verificando estilos después de 500ms...');
    
    // Verificar el contenedor principal con clases mfe2-
    const mainContainer = document.querySelector('.mfe2-min-h-screen');
    if (mainContainer) {
      const computedStyles = window.getComputedStyle(mainContainer);
      console.log('🟣 MFE-2: HelloWorld contenedor principal encontrado');
      console.log('🟣 MFE-2: HelloWorld min-height:', computedStyles.minHeight);
      console.log('🟣 MFE-2: HelloWorld background:', computedStyles.background);
      console.log('🟣 MFE-2: HelloWorld display:', computedStyles.display);
      console.log('🟣 MFE-2: HelloWorld padding:', computedStyles.padding);
    } else {
      console.error('🟣 MFE-2: HelloWorld ❌ No se encontró el contenedor principal .mfe2-min-h-screen');
    }
    
    // Verificar el botón
    const button = document.querySelector('.mfe2-bg-purple-600');
    if (button) {
      const buttonStyles = window.getComputedStyle(button);
      console.log('🟣 MFE-2: HelloWorld botón encontrado');
      console.log('🟣 MFE-2: HelloWorld botón background-color:', buttonStyles.backgroundColor);
      console.log('🟣 MFE-2: HelloWorld botón color:', buttonStyles.color);
      console.log('🟣 MFE-2: HelloWorld botón padding:', buttonStyles.padding);
      console.log('🟣 MFE-2: HelloWorld botón border-radius:', buttonStyles.borderRadius);
    } else {
      console.error('🟣 MFE-2: HelloWorld ❌ No se encontró el botón .mfe2-bg-purple-600');
    }
    
    // Contar todos los elementos con clases mfe2-
    const mfe2Elements = document.querySelectorAll('[class*="mfe2-"]');
    console.log('🟣 MFE-2: HelloWorld total elementos con clases mfe2-*:', mfe2Elements.length);
    
    // Verificar si las clases CSS están siendo aplicadas
    mfe2Elements.forEach((el, index) => {
      if (index < 5) { // Solo los primeros 5 para no saturar
        const styles = window.getComputedStyle(el);
        console.log(`🟣 MFE-2: HelloWorld elemento ${index}:`, {
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

console.log('🟣 MFE-2: HelloWorld component script setup completado');
</script>

<style module>
.button {
  background-color: #8b5cf6;
  border: 2px solid #5b21b6;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: sans-serif;
}

.button:hover {
  background-color: #7c3aed;
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
