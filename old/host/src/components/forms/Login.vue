<template>
  <div class="host-min-h-screen host-flex host-flex-col md:host-flex-row host-bg-slate-50">
    <!-- Columna izquierda - Carrusel de imágenes (visible en todos los dispositivos) -->
    <div class="host-w-full md:host-w-1/2 lg:host-w-3/5 host-relative host-overflow-hidden host-min-h-[50vh] md:host-min-h-screen">
      <div class="host-absolute host-inset-0">
        <transition-group name="fade">
          <div 
            v-for="(image, index) in backgroundImages" 
            :key="index"
            v-show="currentImageIndex === index"
            class="host-absolute host-inset-0"
          >
            <img 
              :src="image" 
              :alt="`Fondo ${index + 1}`"
              class="host-w-full host-h-full host-object-cover"
              @load="onImageLoad(index)"
              @error="onImageError(index)"
            />
            <!-- Overlay más sutil para ver mejor las imágenes -->
            <div class="host-absolute host-inset-0 host-bg-gradient-to-r host-from-slate-900/60 host-via-slate-800/40 host-to-slate-900/70"></div>
          </div>
        </transition-group>
      </div>
      
      <!-- Contenido superpuesto en el carrusel -->
      <div class="host-relative host-z-10 host-flex host-flex-col host-justify-center host-items-start host-p-4 sm:host-p-6 md:host-p-8 lg:host-p-12 host-text-white host-h-full">
        <div class="host-max-w-lg host-w-full">
          <div class="host-mb-6 md:host-mb-8">
              <!-- Logo de la universidad en lugar del ícono del libro -->
              <img 
                src="@/assets/logocompleto.png" 
                alt="Logo Universidad Atlántida"
                class="host-h-8 md:host-h-10 host-w-auto host-object-contain host-filter host-brightness-0 host-invert"
              />
          </div>
          
          <h1 class="host-text-2xl sm:host-text-3xl md:host-text-4xl xl:host-text-5xl host-font-bold host-mb-3 sm:host-mb-4 md:host-mb-6 host-leading-tight">
            Bienvenido a tu
            <span class="host-text-blue-300">Universidad</span>
          </h1>
          <p class="host-text-base sm:host-text-lg md:host-text-xl host-text-blue-100 host-mb-4 sm:host-mb-6 md:host-mb-8 host-leading-relaxed">
            Accede a tu portal académico y gestiona tu experiencia universitaria de manera integral.
          </p>
          
          <!-- Características -->
          <div class="host-space-y-2 sm:host-space-y-3 md:host-space-y-4 host-mb-4 sm:host-mb-6 md:host-mb-8">
            <div class="host-flex host-items-center host-space-x-3">
              <div class="host-w-1.5 sm:host-w-2 host-h-1.5 sm:host-h-2 host-bg-blue-400 host-rounded-full"></div>
              <span class="host-text-xs sm:host-text-sm md:host-text-base host-text-blue-100">Portal Académico Integrado</span>
            </div>
            <div class="host-flex host-items-center host-space-x-3">
              <div class="host-w-1.5 sm:host-w-2 host-h-1.5 sm:host-h-2 host-bg-blue-400 host-rounded-full"></div>
              <span class="host-text-xs sm:host-text-sm md:host-text-base host-text-blue-100">Gestión de Materias y Notas</span>
            </div>
            <div class="host-flex host-items-center host-space-x-3">
              <div class="host-w-1.5 sm:host-w-2 host-h-1.5 sm:host-h-2 host-bg-blue-400 host-rounded-full"></div>
              <span class="host-text-xs sm:host-text-sm md:host-text-base host-text-blue-100">Comunicación Directa</span>
            </div>
          </div>
          
          <div class="host-flex host-items-center host-space-x-3 sm:host-space-x-4">
            <div class="host-w-8 sm:host-w-10 md:host-w-12 host-h-0.5 sm:host-h-1 host-bg-blue-400 host-rounded-full"></div>
            <span class="host-text-2xs sm:host-text-xs md:host-text-sm host-text-blue-200">Universidad Atlántida</span>
          </div>
        </div>
      </div>
      
      <!-- Indicadores del carrusel -->
      <div class="host-absolute host-bottom-4 sm:host-bottom-6 md:host-bottom-8 host-left-4 sm:host-left-6 md:host-left-12 host-flex host-space-x-2 sm:host-space-x-3 host-z-20">
        <button
          v-for="(image, index) in backgroundImages"
          :key="index"
          @click="setCurrentImage(index)"
          class="host-w-2 sm:host-w-2.5 md:host-w-3 host-h-2 sm:host-h-2.5 md:host-h-3 host-rounded-full host-transition-all host-duration-300 host-border host-border-blue-300/50"
          :class="currentImageIndex === index ? 'host-bg-blue-400 host-scale-110 host-shadow-lg host-shadow-blue-400/50' : 'host-bg-blue-300/40 hover:host-bg-blue-300/70'"
        ></button>
      </div>
    </div>

    <!-- Columna derecha - Formulario de login -->
     <div class="md:host-w-1/2 lg:host-w-2/5 host-flex host-items-center host-justify-center host-p-4 sm:host-p-6 md:host-p-8 host-bg-white host-min-h-[50vh] md:host-min-h-screen">
      <div class="host-w-full host-max-w-[18rem] sm:host-max-w-xs md:host-max-w-sm host-space-y-3 sm:host-space-y-4 md:host-space-y-6">
        <!-- Logo y título -->
        <div class="host-text-center host-space-y-3 sm:host-space-y-4">
          <div class="host-mx-auto host-h-12 sm:host-h-14 host-w-32 sm:host-w-40 host-flex host-items-center host-justify-center">
            <img 
              src="@/assets/logocompleto.png" 
              alt="Logo Universidad Atlántida"
              class="host-h-auto host-w-full host-object-contain host-transform host-transition-all host-duration-300 hover:host-scale-105"
            />
          </div>
          <div class="host-space-y-1 sm:host-space-y-2">
            <h2 class="host-text-xl sm:host-text-2xl host-font-bold host-text-slate-800">
              Iniciar Sesión
            </h2>
            <p class="host-text-sm sm:host-text-base host-text-slate-600">
              Ingresa tus credenciales para acceder
            </p>
          </div>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleLogin" class="host-space-y-3 sm:host-space-y-4 md:host-space-y-5">
          <div class="host-space-y-4">
            <!-- Campo DNI -->
            <div class="host-space-y-1.5 sm:host-space-y-2">
              <label for="dni" class="host-block host-text-xs sm:host-text-sm host-font-semibold host-text-slate-700">
                DNI
              </label>
              <div class="host-relative">
                <div class="host-absolute host-inset-y-0 host-left-0 host-pl-2.5 sm:host-pl-3 host-flex host-items-center host-pointer-events-none">
                  <svg class="host-h-4 sm:host-h-5 host-w-4 sm:host-w-5 host-text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="dni"
                  v-model="dni"
                  type="text"
                  required
                  v-mask="'########'"
                  maxlength="8"
                  :disabled="isLoading"
                  class="host-block host-w-full host-pl-8 sm:host-pl-10 host-pr-3 sm:host-pr-4 host-py-2.5 sm:host-py-3 host-text-sm host-border host-border-slate-300 host-rounded-xl host-text-slate-900 host-placeholder-slate-500 focus:host-outline-none focus:host-ring-2 focus:host-ring-blue-500 focus:host-border-transparent host-transition-all host-duration-200 disabled:host-opacity-50 disabled:host-bg-slate-50"
                  placeholder="00000000"
                />
              </div>
            </div>

            <!-- Campo de contraseña -->
            <div class="host-space-y-1.5 sm:host-space-y-2">
              <label for="password" class="host-block host-text-xs sm:host-text-sm host-font-semibold host-text-slate-700">
                Contraseña
              </label>
              <div class="host-relative">
                <div class="host-absolute host-inset-y-0 host-left-0 host-pl-2.5 sm:host-pl-3 host-flex host-items-center host-pointer-events-none">
                  <svg class="host-h-4 sm:host-h-5 host-w-4 sm:host-w-5 host-text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  :disabled="isLoading"
                  class="host-block host-w-full host-pl-8 sm:host-pl-10 host-pr-10 sm:host-pr-12 host-py-2.5 sm:host-py-3 host-text-sm host-border host-border-slate-300 host-rounded-xl host-text-slate-900 host-placeholder-slate-500 focus:host-outline-none focus:host-ring-2 focus:host-ring-blue-500 focus:host-border-transparent host-transition-all host-duration-200 disabled:host-opacity-50 disabled:host-bg-slate-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="togglePassword"
                  :disabled="isLoading"
                  class="host-absolute host-inset-y-0 host-right-0 host-pr-2.5 sm:host-pr-3 host-flex host-items-center"
                >
                  <svg
                    class="host-h-4 sm:host-h-5 host-w-4 sm:host-w-5 host-text-slate-400 hover:host-text-slate-600 host-transition-colors host-duration-200"
                    :class="showPassword ? 'host-hidden' : 'host-block'"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg
                    class="host-h-4 sm:host-h-5 host-w-4 sm:host-w-5 host-text-slate-400 hover:host-text-slate-600 host-transition-colors host-duration-200"
                    :class="showPassword ? 'host-block' : 'host-hidden'"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Recordarme y Olvidé contraseña -->
            <div class="host-flex host-items-center host-justify-between">
              <div class="host-flex host-items-center">
                <input
                  id="remember-me"
                  v-model="rememberMe"
                  type="checkbox"
                  :disabled="isLoading"
                  class="host-h-3.5 sm:host-h-4 host-w-3.5 sm:host-w-4 host-text-blue-600 focus:host-ring-blue-500 host-border-slate-300 host-rounded host-cursor-pointer disabled:host-opacity-50"
                />
                <label for="remember-me" class="host-ml-1.5 sm:host-ml-2 host-block host-text-xs sm:host-text-sm host-text-slate-700 host-cursor-pointer">
                  Recordarme
                </label>
              </div>
              <a 
                href="#" 
                @click.prevent="mode = 'recovery'"
                class="host-text-xs sm:host-text-sm host-font-medium host-text-blue-600 hover:host-text-blue-500 host-transition-colors host-duration-200"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <!-- Mensaje de error -->
            <div v-if="error" class="host-rounded-lg host-bg-red-50 host-border host-border-red-200 host-p-3 host-text-sm host-text-red-700">
              {{ error }}
            </div>

            <!-- Botón de inicio de sesión -->
            <button
              type="submit"
              :disabled="isLoading"
              class="host-w-full host-relative host-flex host-justify-center host-py-2.5 sm:host-py-3 host-px-3 sm:host-px-4 host-border host-border-transparent host-rounded-xl host-text-xs sm:host-text-sm host-font-semibold host-text-white host-bg-gradient-to-r host-from-blue-600 host-to-blue-700 hover:host-from-blue-700 hover:host-to-blue-800 focus:host-outline-none focus:host-ring-2 focus:host-ring-blue-500 focus:host-ring-offset-2 host-transition-all host-duration-200 disabled:host-opacity-50 disabled:host-cursor-not-allowed host-shadow-lg hover:host-shadow-xl host-transform hover:host-scale-[1.02]"
            >
              <span :class="{ 'host-opacity-0': isLoading }" class="host-relative host-z-10">
                Iniciar sesión
              </span>
              <div
                v-if="isLoading"
                class="host-absolute host-inset-0 host-flex host-items-center host-justify-center"
              >
                <svg class="host-animate-spin host-h-4 sm:host-h-5 host-w-4 sm:host-w-5 host-text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="host-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="host-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </button>
          </div>
        </form>

        <!-- Primera vez -->
        <div class="host-text-center">
          <span class="host-text-xs sm:host-text-sm host-text-slate-600">¿Primera vez?</span>
          <a 
            href="#" 
            @click.prevent="mode = 'request'"
            class="host-ml-1 host-font-medium host-text-xs sm:host-text-sm host-text-blue-600 hover:host-text-blue-500 host-transition-colors host-duration-200"
          >
            Solicitar cuenta
          </a>
        </div>

        <!-- Enlaces -->
        <div class="host-border-t host-border-slate-200 host-pt-3 sm:host-pt-4">
          <div class="host-flex host-flex-wrap host-justify-center host-gap-3 sm:host-gap-4 host-text-xs sm:host-text-sm">
            <a 
              href="https://atlantida.edu.ar/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="host-flex host-items-center host-text-slate-600 hover:host-text-blue-600 host-transition-colors host-duration-200"
            >
              <svg class="host-w-4 host-h-4 host-mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 0 001.242 7.244" />
              </svg>
              Universidad
            </a>
            <a 
              href="https://virtual.atlantida.edu.ar/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="host-flex host-items-center host-text-slate-600 hover:host-text-blue-600 host-transition-colors host-duration-200"
            >
              <svg class="host-w-4 host-h-4 host-mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 0 001.242 7.244" />
              </svg>
              Virtual
            </a>
            <a 
              href="https://web.atlantida.edu.ar/manuales/manual_ingreso_autogestion.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="host-flex host-items-center host-text-slate-600 hover:host-text-blue-600 host-transition-colors host-duration-200"
            >
              <svg class="host-w-4 host-h-4 host-mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Ayuda
            </a>
          </div>
          
          <div class="host-mt-3 host-text-center host-text-xs host-text-slate-500">
            <p>Consultas | Teléfono: 02257-429300/420338</p>
            <p class="host-mt-1">© {{ new Date().getFullYear() }} Universidad Atlántida Argentina</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modales con colores azules -->
    <div v-if="mode === 'recovery'" class="host-fixed host-inset-0 host-bg-slate-900/50 host-backdrop-blur-sm host-flex host-items-center host-justify-center host-p-4 host-z-50">
      <div class="host-bg-white host-rounded-2xl host-p-8 host-max-w-md host-w-full host-shadow-2xl host-border host-border-slate-200">
        <h3 class="host-text-2xl host-font-bold host-text-slate-800 host-mb-6">Recuperar contraseña</h3>
        <form @submit.prevent="handleRecovery" class="host-space-y-6">
          <div class="host-space-y-2">
            <label for="recoveryDni" class="host-block host-text-sm host-font-medium host-text-slate-700">DNI</label>
            <input
              id="recoveryDni"
              v-model="recoveryDni"
              type="text"
              required
              v-mask="'########'"
              maxlength="8"
              class="host-block host-w-full host-px-4 host-py-3 host-border host-border-slate-300 host-rounded-xl host-text-slate-900 host-placeholder-slate-500 focus:host-outline-none focus:host-ring-2 focus:host-ring-blue-500 focus:host-border-transparent host-transition-all host-duration-200"
              placeholder="00000000"
            />
          </div>
          <div class="host-space-y-2">
            <label for="recoveryEmail" class="host-block host-text-sm host-font-medium host-text-slate-700">Email</label>
            <input
              id="recoveryEmail"
              v-model="recoveryEmail"
              type="email"
              required
              class="host-block host-w-full host-px-4 host-py-3 host-border host-border-slate-300 host-rounded-xl host-text-slate-900 host-placeholder-slate-500 focus:host-outline-none focus:host-ring-2 focus:host-ring-blue-500 focus:host-border-transparent host-transition-all host-duration-200"
              placeholder="ejemplo@email.com"
            />
          </div>
          <div class="host-space-y-3">
            <button type="submit" class="host-w-full host-flex host-justify-center host-py-3 host-px-4 host-border host-border-transparent host-rounded-xl host-text-sm host-font-medium host-text-white host-bg-blue-600 hover:host-bg-blue-700 focus:host-outline-none focus:host-ring-2 focus:host-ring-offset-2 focus:host-ring-blue-500 host-transition-all host-duration-200">
              Enviar instrucciones
            </button>
            <button type="button" @click="mode = 'login'" class="host-w-full host-flex host-justify-center host-py-3 host-px-4 host-border host-border-slate-300 host-rounded-xl host-text-sm host-font-medium host-text-slate-700 host-bg-white hover:host-bg-slate-50 focus:host-outline-none focus:host-ring-2 focus:host-ring-offset-2 focus:host-ring-blue-500 host-transition-all host-duration-200">
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="mode === 'request'" class="host-fixed host-inset-0 host-bg-slate-900/50 host-backdrop-blur-sm host-flex host-items-center host-justify-center host-p-4 host-z-50">
      <div class="host-bg-white host-rounded-2xl host-p-8 host-max-w-md host-w-full host-shadow-2xl host-border host-border-slate-200">
        <h3 class="host-text-2xl host-font-bold host-text-slate-800 host-mb-6">Solicitar nueva cuenta</h3>
        <form @submit.prevent="handleRequest" class="host-space-y-6">
          <div class="host-space-y-2">
            <label for="requestDni" class="host-block host-text-sm host-font-medium host-text-slate-700">DNI</label>
            <input
              id="requestDni"
              v-model="requestDni"
              type="text"
              required
              v-mask="'########'"
              maxlength="8"
              class="host-block host-w-full host-px-4 host-py-3 host-border host-border-slate-300 host-rounded-xl host-text-slate-900 host-placeholder-slate-500 focus:host-outline-none focus:host-ring-2 focus:host-ring-blue-500 focus:host-border-transparent host-transition-all host-duration-200"
              placeholder="00000000"
            />
          </div>
          <div class="host-space-y-3">
            <button type="submit" class="host-w-full host-flex host-justify-center host-py-3 host-px-4 host-border host-border-transparent host-rounded-xl host-text-sm host-font-medium host-text-white host-bg-blue-600 hover:host-bg-blue-700 focus:host-outline-none focus:host-ring-2 focus:host-ring-offset-2 focus:host-ring-blue-500 host-transition-all host-duration-200">
              Solicitar cuenta
            </button>
            <button type="button" @click="mode = 'login'" class="host-w-full host-flex host-justify-center host-py-3 host-px-4 host-border host-border-slate-300 host-rounded-xl host-text-sm host-font-medium host-text-slate-700 host-bg-white hover:host-bg-slate-50 focus:host-outline-none focus:host-ring-2 focus:host-ring-offset-2 focus:host-ring-blue-500 host-transition-all host-duration-200">
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { vMask } from 'vue-the-mask'

// Importar las imágenes originales
import fondo1 from '@/assets/img/fondos/1.jpeg'
import fondo2 from '@/assets/img/fondos/2.jpeg'
import fondo3 from '@/assets/img/fondos/3.jpeg'
import fondo4 from '@/assets/img/fondos/4.jpeg'

const authStore = useAuthStore()

// Variables reactivas
const mode = ref('login')
const dni = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const error = ref('')
const isLoading = ref(false)

// Campos para recuperación de contraseña
const recoveryDni = ref('')
const recoveryEmail = ref('')

// Campo para solicitud de cuenta
const requestDni = ref('')

// Imágenes originales del carrusel
const backgroundImages = ref([
  fondo1,
  fondo2,
  fondo3,
  fondo4
])

const currentImageIndex = ref(0)
let carouselInterval = null

// Callbacks para imágenes
const onImageLoad = (index) => {
  console.log(`✅ Imagen ${index} cargada correctamente`)
}

const onImageError = (index) => {
  console.error(`❌ Error cargando imagen ${index}`)
}

// Función para cambiar la imagen
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % backgroundImages.value.length
}

// Función para establecer imagen específica
const setCurrentImage = (index) => {
  currentImageIndex.value = index
}

// Función para toggle password
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Iniciar carrusel
onMounted(() => {
  carouselInterval = setInterval(() => {
    nextImage()
  }, 5000)
})

onUnmounted(() => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
})

const handleLogin = async () => {
  try {
    error.value = ''
    isLoading.value = true
    const result = await authStore.login({
      dni: dni.value,
      password: password.value
    })
    
    if (!result.success) {
      error.value = result.error || 'Credenciales incorrectas. Por favor, inténtalo de nuevo.'
    }
  } catch (err) {
    error.value = 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.'
    console.error('Error de login:', err)
  } finally {
    isLoading.value = false
  }
}

const handleRecovery = async () => {
  try {
    isLoading.value = true
    const result = await authStore.recoverPassword({
      dni: recoveryDni.value,
      email: recoveryEmail.value
    })
    
    if (result.success) {
      mode.value = 'login'
    } else {
      error.value = result.error || 'Error al procesar la solicitud'
    }
  } catch (err) {
    error.value = 'Ocurrió un error al procesar la solicitud'
    console.error('Error de recuperación:', err)
  } finally {
    isLoading.value = false
  }
}

const handleRequest = async () => {
  try {
    isLoading.value = true
    const result = await authStore.requestAccount(requestDni.value)
    
    if (result.success) {
      mode.value = 'login'
    } else {
      error.value = result.error || 'Error al procesar la solicitud'
    }
  } catch (err) {
    error.value = 'Ocurrió un error al procesar la solicitud'
    console.error('Error de solicitud:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>