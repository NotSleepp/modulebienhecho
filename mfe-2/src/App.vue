<script setup>
import { onMounted, onBeforeMount } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

console.log('🟣 MFE-2: App.vue script setup iniciado');
console.log('🟣 MFE-2: Importando HelloWorld component...');

onBeforeMount(() => {
  console.log('🟣 MFE-2: onBeforeMount - Componente MFE-2 a punto de montarse');
  console.log('🟣 MFE-2: Verificando estilos CSS disponibles...');
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
  console.log('🟣 MFE-2: Total stylesheets encontrados:', stylesheets.length);
  stylesheets.forEach((sheet, index) => {
    if (sheet.href && sheet.href.includes('mfe-2')) {
      console.log(`🟣 MFE-2: MFE-2 Stylesheet ${index}:`, sheet.href, sheet);
    }
  });
});

onMounted(() => {
  console.log('🟣 MFE-2: onMounted - Componente MFE-2 montado exitosamente');
  
  // Verificar estilos aplicados
  setTimeout(() => {
    console.log('🟣 MFE-2: Verificando estilos aplicados después de 1s...');
    
    // Verificar el contenedor principal
    const mainContainer = document.querySelector('.flex.justify-center.items-center.bg-red-500');
    if (mainContainer) {
      const computedStyles = window.getComputedStyle(mainContainer);
      console.log('🟣 MFE-2: Estilos computados del contenedor principal:');
      console.log('🟣 MFE-2: display:', computedStyles.display);
      console.log('🟣 MFE-2: justify-content:', computedStyles.justifyContent);
      console.log('🟣 MFE-2: align-items:', computedStyles.alignItems);
      console.log('🟣 MFE-2: background-color:', computedStyles.backgroundColor);
      console.log('🟣 MFE-2: padding:', computedStyles.padding);
      console.log('🟣 MFE-2: color:', computedStyles.color);
    } else {
      console.error('🟣 MFE-2: ❌ No se encontró el contenedor principal con clases Tailwind');
    }
    
    // Verificar todos los elementos con clases de Tailwind
    const tailwindElements = document.querySelectorAll('[class*="flex"], [class*="bg-"], [class*="text-"], [class*="p-"], [class*="mfe2-"]');
    console.log('🟣 MFE-2: Elementos con clases Tailwind encontrados:', tailwindElements.length);
    
    tailwindElements.forEach((el, index) => {
      if (el.closest('[data-v-app]') || el.closest('#app')) {
        console.log(`🟣 MFE-2: Elemento Tailwind ${index}:`, el.className);
        const styles = window.getComputedStyle(el);
        console.log(`🟣 MFE-2: Estilos elemento ${index}:`, {
          display: styles.display,
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          padding: styles.padding
        });
      }
    });
  }, 1000);
});

console.log('🟣 MFE-2: App.vue script setup completado');
</script>

<template>
  <div class="flex justify-center items-center bg-red-500 p-4 text-white">
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
