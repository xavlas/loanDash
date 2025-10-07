<template>
  <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
    <button
      type="button"
      class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
      @click="$emit('openSidebar')"
    >
      <Bars3Icon class="h-6 w-6" />
    </button>
    
    <div class="flex-1 px-4 flex justify-between items-center">
      <div class="flex-1">
        <h1 class="text-2xl font-semibold text-gray-900">{{ pageTitle }}</h1>
      </div>
      
      <div class="ml-4 flex items-center md:ml-6">
        <!-- Notifications -->
        <button
          type="button"
          class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <BellIcon class="h-6 w-6" />
        </button>

        <!-- Profile dropdown placeholder -->
        <div class="ml-3 relative">
          <div class="flex items-center text-sm">
            <img class="h-8 w-8 rounded-full" :src="userAvatar" alt="User avatar" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Bars3Icon, BellIcon } from '@heroicons/vue/24/outline'

defineEmits<{
  openSidebar: []
}>()

const route = useRoute()
const authStore = useAuthStore()

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    'Dashboard': 'Dashboard',
    'Profile': 'My Profile',
    'Settings': 'Settings'
  }
  return titles[route.name as string] || 'Dashboard'
})

const user = computed(() => authStore.user)

const userAvatar = computed(() => 
  user.value?.avatar || `https://ui-avatars.com/api/?name=${user.value?.firstName}+${user.value?.lastName}&background=3b82f6&color=ffffff`
)
</script>