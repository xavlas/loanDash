<template>
  <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
    <div class="flex items-center flex-shrink-0 px-4">
      <h1 class="text-xl font-bold text-gray-900">Vue Dashboard</h1>
    </div>
    <nav class="mt-5 flex-1 px-2 space-y-1">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.to"
        :class="[
          item.current
            ? 'bg-blue-100 text-blue-900'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
        ]"
      >
        <component
          :is="item.icon"
          :class="[
            item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
            'mr-3 flex-shrink-0 h-6 w-6'
          ]"
        />
        {{ item.name }}
      </router-link>
    </nav>
  </div>
  
  <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
    <div class="flex items-center w-full">
      <div class="flex-shrink-0">
        <img class="h-8 w-8 rounded-full" :src="userAvatar" alt="User avatar" />
      </div>
      <div class="ml-3 flex-1">
        <p class="text-sm font-medium text-gray-700">{{ user?.firstName }} {{ user?.lastName }}</p>
        <p class="text-xs text-gray-500">{{ user?.email }}</p>
      </div>
      <button
        @click="logout"
        class="ml-3 flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <ArrowRightOnRectangleIcon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const userAvatar = computed(() => 
  user.value?.avatar || `https://ui-avatars.com/api/?name=${user.value?.firstName}+${user.value?.lastName}&background=3b82f6&color=ffffff`
)

const navigation = computed(() => [
  {
    name: 'Dashboard',
    to: '/',
    icon: HomeIcon,
    current: route.name === 'Dashboard'
  },
  {
    name: 'Profile',
    to: '/profile',
    icon: UserIcon,
    current: route.name === 'Profile'
  },
  {
    name: 'Settings',
    to: '/settings',
    icon: Cog6ToothIcon,
    current: route.name === 'Settings'
  }
])

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>