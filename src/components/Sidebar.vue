<template>
  <div class="sticky top-0 z-40 lg:hidden">
    <div v-if="isOpen" class="fixed inset-0 flex z-40">
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75" @click="$emit('close')"></div>
      <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button
            type="button"
            class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            @click="$emit('close')"
          >
            <XMarkIcon class="h-6 w-6 text-white" />
          </button>
        </div>
        <SidebarContent />
      </div>
    </div>
  </div>

  <!-- Static sidebar for desktop -->
  <div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
    <div class="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
      <SidebarContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import SidebarContent from './SidebarContent.vue'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()
</script>