<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- General Settings -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
          General Settings
        </h3>
        
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium text-gray-900">Email Notifications</h4>
              <p class="text-sm text-gray-500">Receive notifications about account activity</p>
            </div>
            <button
              type="button"
              :class="[
                settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              ]"
              @click="toggleSetting('emailNotifications')"
            >
              <span
                :class="[
                  settings.emailNotifications ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                ]"
              />
            </button>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium text-gray-900">Dark Mode</h4>
              <p class="text-sm text-gray-500">Use dark theme for the dashboard</p>
            </div>
            <button
              type="button"
              :class="[
                settings.darkMode ? 'bg-blue-600' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              ]"
              @click="toggleSetting('darkMode')"
            >
              <span
                :class="[
                  settings.darkMode ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                ]"
              />
            </button>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium text-gray-900">Auto-save</h4>
              <p class="text-sm text-gray-500">Automatically save changes</p>
            </div>
            <button
              type="button"
              :class="[
                settings.autoSave ? 'bg-blue-600' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              ]"
              @click="toggleSetting('autoSave')"
            >
              <span
                :class="[
                  settings.autoSave ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                ]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Settings -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
          Security Settings
        </h3>
        
        <div class="space-y-6">
          <div>
            <h4 class="text-sm font-medium text-gray-900 mb-2">Change Password</h4>
            <form @submit.prevent="changePassword" class="space-y-4">
              <div>
                <label for="currentPassword" class="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  v-model="passwordForm.currentPassword"
                  type="password"
                  required
                  class="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label for="newPassword" class="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="newPassword"
                  v-model="passwordForm.newPassword"
                  type="password"
                  required
                  class="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  required
                  class="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                :disabled="passwordLoading"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <span v-if="passwordLoading">Updating...</span>
                <span v-else>Update Password</span>
              </button>
            </form>
          </div>

          <div class="border-t border-gray-200 pt-6">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
            <p class="text-sm text-gray-500 mb-4">
              Add an extra layer of security to your account
            </p>
            <button
              type="button"
              class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ settings.twoFactorAuth ? 'Disable' : 'Enable' }} 2FA
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-red-900 mb-6">
          Danger Zone
        </h3>
        
        <div class="space-y-4">
          <div class="border border-red-200 rounded-md p-4">
            <h4 class="text-sm font-medium text-red-900 mb-2">Delete Account</h4>
            <p class="text-sm text-red-700 mb-4">
              Once you delete your account, all of your data will be permanently removed. This action cannot be undone.
            </p>
            <button
              type="button"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message" :class="messageClass" class="px-4 py-3 rounded">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const settings = ref({
  emailNotifications: true,
  darkMode: false,
  autoSave: true,
  twoFactorAuth: false
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordLoading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const messageClass = computed(() => {
  return messageType.value === 'success'
    ? 'bg-green-100 border border-green-400 text-green-700'
    : 'bg-red-100 border border-red-400 text-red-700'
})

const toggleSetting = (key: keyof typeof settings.value) => {
  settings.value[key] = !settings.value[key]
  showMessage('Setting updated successfully!', 'success')
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    showMessage('New passwords do not match', 'error')
    return
  }

  passwordLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    
    showMessage('Password updated successfully!', 'success')
  } catch (error) {
    showMessage('Failed to update password', 'error')
  } finally {
    passwordLoading.value = false
  }
}

const showMessage = (text: string, type: 'success' | 'error') => {
  message.value = text
  messageType.value = type
  
  setTimeout(() => {
    message.value = ''
  }, 3000)
}
</script>