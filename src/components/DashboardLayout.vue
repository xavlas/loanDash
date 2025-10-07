<template>
  <div class="min-h-screen bg-gray-100">
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    
    <div class="lg:pl-64">
      <Header @openSidebar="sidebarOpen = true" />
      
      <main class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const sidebarOpen = ref(false)
const authStore = useAuthStore()

onMounted(() => {
  authStore.initializeAuth()
})
</script>