import axios from 'axios'
import type { User, LoginCredentials, RegisterData } from '@/types'

// Configuration de l'URL de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Créer une instance axios avec la configuration de base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour ajouter le token d'authentification
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide, supprimer le token local
      localStorage.removeItem('auth-token')
      // Rediriger vers la page de connexion si nécessaire
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await apiClient.post('/auth/login', credentials)
      const { token, user } = response.data
      
      // Stocker le token
      localStorage.setItem('auth-token', token)
      
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de la connexion'
      throw new Error(message)
    }
  }

  async register(data: RegisterData): Promise<User> {
    try {
      const response = await apiClient.post('/auth/register', data)
      const { token, user } = response.data
      
      // Stocker le token
      localStorage.setItem('auth-token', token)
      
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de l\'inscription'
      throw new Error(message)
    }
  }

  async updateProfile(userId: string, updates: Partial<User>): Promise<Partial<User>> {
    try {
      const response = await apiClient.put('/user/profile', updates)
      const { user } = response.data
      
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de la mise à jour du profil'
      throw new Error(message)
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword
      })
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors du changement de mot de passe'
      throw new Error(message)
    }
  }

  async getProfile(): Promise<User> {       
    try {
      const response = await apiClient.get('/user/profile')
      const { user } = response.data
      
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de la récupération du profil'
      throw new Error(message)
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const response = await apiClient.post('/auth/refresh')
      const { token } = response.data
      
      localStorage.setItem('auth-token', token)
      return token
    } catch (error: any) {
      localStorage.removeItem('auth-token')
      throw new Error('Impossible de rafraîchir le token')
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      // Ignorer les erreurs de déconnexion côté serveur
      console.warn('Erreur lors de la déconnexion côté serveur:', error)
    } finally {
      // Toujours supprimer le token local
      localStorage.removeItem('auth-token')
    }
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth-token')
  }

  // Obtenir le token stocké
  getToken(): string | null {
    return localStorage.getItem('auth-token')
  }
}

export const authService = new AuthService()
