import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterData } from '@/types'
import { authService } from '@/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null
    // Récupère le secret admin depuis l'environnement
    const adminSecret = import.meta.env.VITE_ADMIN_SECRET || 'password'
    const demoUsers = [
      { email: 'admin@example.com', password: adminSecret, firstName: 'Admin', lastName: 'User', role: 'admin' as 'admin', createdAt: new Date(), lastLogin: new Date() },
      { email: 'user@example.com', password: 'password', firstName: 'John', lastName: 'Doe', role: 'user' as 'user', createdAt: new Date(), lastLogin: new Date() }
    ]
    const found = demoUsers.find(u => u.email === credentials.email && u.password === credentials.password)
    await new Promise(resolve => setTimeout(resolve, 500)) // Simule un délai réseau
    if (found) {
      user.value = {
        email: found.email,
        firstName: found.firstName,
        lastName: found.lastName,
        role: found.role,
        id: found.email, // id fictif
        createdAt: found.createdAt,
        lastLogin: found.lastLogin
      }
      return user.value
    } else {
      error.value = 'Email ou mot de passe incorrect'
      throw new Error(error.value)
    }
    loading.value = false
  }

  const register = async (data: RegisterData) => {
    loading.value = true
    error.value = null
    
    try {
      const userData = await authService.register(data)
      user.value = userData
      return userData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.warn('Erreur lors de la déconnexion:', err)
    } finally {
      user.value = null
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user.value) return
    
    loading.value = true
    try {
      const updatedUser = await authService.updateProfile(user.value.id, updates)
      user.value = { ...user.value, ...updatedUser }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Update failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const initializeAuth = async () => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      try {
        // Vérifier le token avec l'API
        const userData = await authService.getProfile()
        user.value = userData
      } catch (err) {
        // Token invalide, le supprimer
        localStorage.removeItem('auth-token')
        console.warn('Token invalide lors de l\'initialisation:', err)
      }
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    initializeAuth
  }
})