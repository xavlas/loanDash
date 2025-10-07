<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
          Profile Information
        </h3>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="flex items-center space-x-6">
            <div class="shrink-0">
              <img class="h-16 w-16 object-cover rounded-full" :src="userAvatar" alt="Current profile photo" />
            </div>
            <div>
              <button
                type="button"
                class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Change Photo
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="firstName" class="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div class="mt-1">
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="lastName" class="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div class="mt-1">
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="role" class="block text-sm font-medium text-gray-700">
                Role
              </label>
              <div class="mt-1">
                <input
                  id="role"
                  :value="user?.role"
                  type="text"
                  readonly
                  class="shadow-sm bg-gray-50 border-gray-300 block w-full sm:text-sm border rounded-md text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {{ success }}
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="loading"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <span v-if="loading">Updating...</span>
              <span v-else>Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Account Information -->
    <div class="mt-6 bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
          Account Information
        </h3>
        
        <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm font-medium text-gray-500">Member since</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ formatDate(user?.createdAt) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Last login</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ formatDate(user?.lastLogin) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Account ID</dt>
            <dd class="mt-1 text-sm text-gray-900 font-mono">{{ user?.id }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Account Status</dt>
            <dd class="mt-1">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const user = computed(() => authStore.user)
const loading = ref(false)
const error = ref('')
const success = ref('')

const form = ref({
  firstName: '',
  lastName: '',
  email: ''
})

const userAvatar = computed(() => 
  user.value?.avatar || `https://ui-avatars.com/api/?name=${user.value?.firstName}+${user.value?.lastName}&background=3b82f6&color=ffffff`
)

const formatDate = (date?: Date) => {
  if (!date) return 'Never'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleSubmit = async () => {
  if (!user.value) return
  
  loading.value = true
  error.value = ''
  success.value = ''
  
  try {
    await authStore.updateProfile(form.value)
    success.value = 'Profile updated successfully!'
    setTimeout(() => {
      success.value = ''
    }, 3000)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Update failed'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (user.value) {
    form.value = {
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      email: user.value.email
    }
  }
})
</script>