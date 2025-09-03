<template>
  <div>
    <!-- Elemento de menú simple (sin submenús) -->
    <template v-if="!item.submenu || item.submenu.length === 0">
      <template v-if="item.path && (item.path.startsWith('http://') || item.path.startsWith('https://'))">
        <a 
          :href="item.path"
          target="_blank"
          rel="noopener noreferrer"
          @click.prevent="onMenuClick(item)"
          class="host-group host-flex host-items-center host-px-3 host-py-2.5 host-text-base md:host-text-sm host-font-medium host-rounded-lg host-transition-all host-duration-200 host-text-gray-600 hover:host-text-gray-900 hover:host-bg-gray-50 dark:host-text-gray-400 dark:hover:host-text-white dark:hover:host-bg-gray-800"
          :style="{ paddingLeft: `${(level * 12) + 12}px` }"
        >
          <component 
            v-if="item.icon && level === 0" 
            :is="item.icon" 
            class="host-w-5 host-h-5 host-mr-3 host-flex-shrink-0 host-transition-colors host-duration-200 host-text-gray-400 group-hover:host-text-gray-600 dark:host-text-gray-500 dark:group-hover:host-text-gray-400"
          />
          <div 
            v-else-if="level > 0"
            class="host-w-1.5 host-h-1.5 host-rounded-full host-mr-3 host-flex-shrink-0 host-transition-colors host-duration-200 host-bg-gray-400 dark:host-bg-gray-500 group-hover:host-bg-gray-600 dark:group-hover:host-bg-gray-400"
          ></div>
          <span class="host-break-words host-flex-1 host-leading-tight">{{ item.name }}</span>
        </a>
      </template>
      <router-link 
        v-else
        :to="item.path" 
        custom 
        v-slot="{ navigate, href, isActive }"
      >
        <a 
          :href="href" 
          @click.prevent="onMenuClick(item, navigate)"
          class="host-group host-flex host-items-center host-px-3 host-py-2.5 host-text-base md:host-text-sm host-font-medium host-rounded-lg host-transition-all host-duration-200"
          :class="[
            isActive 
              ? 'host-bg-blue-50 host-text-blue-700 dark:host-bg-blue-900/50 dark:host-text-blue-300' 
              : 'host-text-gray-600 hover:host-text-gray-900 hover:host-bg-gray-50 dark:host-text-gray-400 dark:hover:host-text-white dark:hover:host-bg-gray-800'
          ]"
          :style="{ paddingLeft: `${(level * 12) + 12}px` }"
        >
          <component 
            v-if="item.icon && level === 0" 
            :is="item.icon" 
            class="host-w-5 host-h-5 host-mr-3 host-flex-shrink-0 host-transition-colors host-duration-200"
            :class="[
              isActive 
                ? 'host-text-blue-700 dark:host-text-blue-300' 
                : 'host-text-gray-400 group-hover:host-text-gray-600 dark:host-text-gray-500 dark:group-hover:host-text-gray-400'
            ]"
          />
          <div 
            v-else-if="level > 0"
            class="host-w-1.5 host-h-1.5 host-rounded-full host-mr-3 host-flex-shrink-0 host-transition-colors host-duration-200"
            :class="[
              isActive 
                ? 'host-bg-blue-700 dark:host-bg-blue-300' 
                : 'host-bg-gray-400 dark:host-bg-gray-500 group-hover:host-bg-gray-600 dark:group-hover:host-bg-gray-400'
            ]"
          ></div>
          <span class="host-break-words host-flex-1 host-leading-tight">{{ item.name }}</span>
        </a>
      </router-link>
    </template>

    <!-- Elemento de menú con submenús -->
    <template v-else>
      <div class="host-space-y-1">
        <button
          @click="toggleSubmenu"
          class="host-group host-flex host-w-full host-items-center host-px-3 host-py-2.5 host-text-base md:host-text-sm host-font-medium host-rounded-lg host-transition-all host-duration-200 host-text-gray-600 hover:host-text-gray-900 hover:host-bg-gray-50 dark:host-text-gray-400 dark:hover:host-text-white dark:hover:host-bg-gray-800"
          :style="{ paddingLeft: `${(level * 12) + 12}px` }"
        >
          <component 
            v-if="item.icon && level === 0" 
            :is="item.icon" 
            class="host-w-5 host-h-5 host-mr-3 host-flex-shrink-0 host-text-gray-400 group-hover:host-text-gray-600 dark:host-text-gray-500 dark:group-hover:host-text-gray-400 host-transition-colors host-duration-200"
          />
          <div 
            v-else-if="level > 0"
            class="host-w-1.5 host-h-1.5 host-rounded-full host-mr-3 host-flex-shrink-0 host-bg-gray-400 dark:host-bg-gray-500 group-hover:host-bg-gray-600 dark:group-hover:host-bg-gray-400 host-transition-colors host-duration-200"
          ></div>
          <span class="host-break-words host-flex-1 host-leading-tight host-text-left">{{ item.name }}</span>
          <svg 
            class="host-w-4 host-h-4 host-ml-2 host-flex-shrink-0 host-transition-transform host-duration-200" 
            :class="{ 'host-rotate-90': isOpen }" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Submenús recursivos -->
        <div 
          v-show="isOpen && !isCollapsed" 
          class="host-space-y-1 host-transition-all host-duration-200"
        >
          <MenuItemRecursive
            v-for="subitem in item.submenu"
            :key="subitem.id || subitem.path"
            :item="subitem"
            :level="level + 1"
            :is-collapsed="isCollapsed"
            @menu-click="$emit('menu-click', $event)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  level: {
    type: Number,
    default: 0
  },
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['menu-click'])

const isOpen = ref(false)

const toggleSubmenu = () => {
  isOpen.value = !isOpen.value
}

const onMenuClick = (item, navigate) => {
  emit('menu-click', { item, navigate })
}
</script>