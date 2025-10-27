<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ isRegistering ? 'Create your account' : 'Sign in to your account' }}
        </h2>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>
        
        <div class="space-y-2">
          <template v-if="isRegistering">
            <div>
              <label for="firstName" class="sr-only">First name</label>
              <input
                id="firstName"
                v-model="form.firstName"
                name="firstName"
                type="text"
                required
                class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="First name"
              />
            </div>
            <div>
              <label for="lastName" class="sr-only">Last name</label>
              <input
                id="lastName"
                v-model="form.lastName"
                name="lastName"
                type="text"
                required
                class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Last name"
              />
            </div>
          </template>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              required
              class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              :placeholder="isRegistering ? 'Choose a password' : 'Password'"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span v-if="loading && !isRegistering">Signing in...</span>
            <span v-else-if="!isRegistering">Sign in</span>
            <span v-else-if="loading">Creating account...</span>
            <span v-else>Create account</span>
          </button>
        </div>

        <div class="text-center mt-4">
          <button
            type="button"
            @click="toggleMode"
            class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
          >
            {{ isRegistering ? 'Already have an account? Sign in' : 'Need an account? Sign up' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isRegistering = ref(false)

const form = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: ''
})

const loading = ref(false)
const error = ref('')

const adminSecret = ref(import.meta.env.VITE_ADMIN_SECRET || 'password')

const toggleMode = () => {
  isRegistering.value = !isRegistering.value
  error.value = ''
  form.value = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  try {
    if (isRegistering.value) {
      await authStore.register(form.value)
    } else {
      await authStore.login(form.value)
    }
    router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : isRegistering.value ? 'Registration failed' : 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>