<template>
  <div id="app" class="host-min-h-screen host-bg-gray-100 host-p-8">
    <header class="host-text-center host-mb-8">
      <h1 class="host-text-4xl host-font-bold host-text-gray-800 host-mb-4">Module Federation Host</h1>
      <p class="host-text-lg host-text-gray-600">Loading micro-frontends dynamically</p>
    </header>

    <main class="host-max-w-6xl host-mx-auto">
      <div class="host-grid host-grid-cols-1 host-md:grid-cols-2 host-gap-8">
        <!-- MFE-1 Section -->
        <section class="host-bg-white host-p-6 host-rounded-lg host-shadow-md">
          <h2 class="host-text-2xl host-font-semibold host-text-blue-600 host-mb-4">MFE-1 Component</h2>
          <div class="host-border host-border-blue-200 host-p-4 host-rounded">
            <Suspense>
              <template #default>
                <HelloWorldMFE1 msg="Hello from MFE-1!" />
              </template>
              <template #fallback>
                <div class="host-text-center host-py-8">
                  <p class="host-text-gray-500">Loading MFE-1...</p>
                </div>
              </template>
            </Suspense>
          </div>
        </section>

        <!-- MFE-2 Section -->
        <section class="host-bg-white host-p-6 host-rounded-lg host-shadow-md">
          <h2 class="host-text-2xl host-font-semibold host-text-purple-600 host-mb-4">MFE-2 Component</h2>
          <div class="host-border host-border-purple-200 host-p-4 host-rounded">
            <Suspense>
              <template #default>
                <HelloWorldMFE2 msg="Hello from MFE-2!" />
              </template>
              <template #fallback>
                <div class="host-text-center host-py-8">
                  <p class="host-text-gray-500">Loading MFE-2...</p>
                </div>
              </template>
            </Suspense>
          </div>
        </section>
      </div>
    </main>

    <footer class="host-text-center host-mt-12 host-text-gray-500">
      <p class="host-text-sm">Powered by Vite Module Federation</p>
    </footer>
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, onBeforeMount, ref } from 'vue'

console.log('🏠 HOST: App.vue script setup iniciado');
console.log('🏠 HOST: Definiendo componentes asincrónicos...');

const mfe1Loaded = ref(false);
const mfe2Loaded = ref(false);

// Import remote components con logging extensivo
const HelloWorldMFE1 = defineAsyncComponent({
  loader: async () => {
    console.log('🔄 HOST: Iniciando carga de MFE-1...');
    console.log('🔄 HOST: URL de MFE-1:', 'mfe1/HelloWorld');
    try {
      const module = await import('mfe1/HelloWorld');
      console.log('✅ HOST: MFE-1 cargado exitosamente:', module);
      console.log('✅ HOST: MFE-1 default export:', module.default);
      mfe1Loaded.value = true;
      return module;
    } catch (error) {
      console.error('❌ HOST: Error cargando MFE-1:', error);
      console.error('❌ HOST: Stack trace MFE-1:', error.stack);
      throw error;
    }
  },
  loadingComponent: {
    template: '<div class="host-text-center host-py-8"><p class="host-text-gray-500">Loading MFE-1...</p></div>'
  },
  errorComponent: {
    template: '<div class="host-text-center host-py-8"><p class="host-text-red-500">Error loading MFE-1</p></div>'
  }
});

const HelloWorldMFE2 = defineAsyncComponent({
  loader: async () => {
    console.log('🔄 HOST: Iniciando carga de MFE-2...');
    console.log('🔄 HOST: URL de MFE-2:', 'mfe2/HelloWorld');
    try {
      const module = await import('mfe2/HelloWorld');
      console.log('✅ HOST: MFE-2 cargado exitosamente:', module);
      console.log('✅ HOST: MFE-2 default export:', module.default);
      mfe2Loaded.value = true;
      return module;
    } catch (error) {
      console.error('❌ HOST: Error cargando MFE-2:', error);
      console.error('❌ HOST: Stack trace MFE-2:', error.stack);
      throw error;
    }
  },
  loadingComponent: {
    template: '<div class="host-text-center host-py-8"><p class="host-text-gray-500">Loading MFE-2...</p></div>'
  },
  errorComponent: {
    template: '<div class="host-text-center host-py-8"><p class="host-text-red-500">Error loading MFE-2</p></div>'
  }
});

onBeforeMount(() => {
  console.log('🏠 HOST: onBeforeMount - Componente Host a punto de montarse');
  console.log('🏠 HOST: Verificando estilos CSS en <head>...');
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
  console.log('🏠 HOST: Stylesheets encontrados:', stylesheets.length);
  stylesheets.forEach((sheet, index) => {
    console.log(`🏠 HOST: Stylesheet ${index}:`, sheet.href || 'inline style', sheet);
  });
});

onMounted(() => {
  console.log('🏠 HOST: onMounted - Componente Host montado');
  console.log('🏠 HOST: Estado MFE-1 cargado:', mfe1Loaded.value);
  console.log('🏠 HOST: Estado MFE-2 cargado:', mfe2Loaded.value);
  
  // Verificar estilos aplicados
  setTimeout(() => {
    console.log('🏠 HOST: Verificando estilos aplicados después de 2s...');
    const hostElement = document.getElementById('app');
    if (hostElement) {
      const computedStyles = window.getComputedStyle(hostElement);
      console.log('🏠 HOST: Estilos computados del elemento #app:');
      console.log('🏠 HOST: background-color:', computedStyles.backgroundColor);
      console.log('🏠 HOST: padding:', computedStyles.padding);
      console.log('🏠 HOST: min-height:', computedStyles.minHeight);
    }
    
    // Verificar elementos MFE
    const mfe1Elements = document.querySelectorAll('[class*="mfe1-"]');
    const mfe2Elements = document.querySelectorAll('[class*="mfe2-"]');
    console.log('🏠 HOST: Elementos con clases mfe1-*:', mfe1Elements.length);
    console.log('🏠 HOST: Elementos con clases mfe2-*:', mfe2Elements.length);
    
    mfe1Elements.forEach((el, index) => {
      console.log(`🏠 HOST: MFE1 elemento ${index}:`, el.className, window.getComputedStyle(el));
    });
    
    mfe2Elements.forEach((el, index) => {
      console.log(`🏠 HOST: MFE2 elemento ${index}:`, el.className, window.getComputedStyle(el));
    });
  }, 2000);
});

console.log('🏠 HOST: App.vue script setup completado');
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
