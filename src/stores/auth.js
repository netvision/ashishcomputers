import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api, { userApi } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin' || user.value?.is_admin === 1)

  const login = async (credentials) => {
    try {
      const response = await userApi.login(credentials)
      if (response.data.success) {
        user.value = response.data.data.user
        token.value = response.data.data.token
        localStorage.setItem('token', token.value)
        localStorage.setItem('user', JSON.stringify(user.value))
        api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await userApi.register(userData)
      if (response.data.success) {
        user.value = response.data.data.user
        token.value = response.data.data.token
        localStorage.setItem('token', token.value)
        localStorage.setItem('user', JSON.stringify(user.value))
        api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
  }

  const initializeAuth = () => {
    if (token.value) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      
      // Try to restore user data from localStorage
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
        } catch (error) {
          console.error('Error parsing stored user data:', error)
          localStorage.removeItem('user')
        }
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    initializeAuth
  }
}) 