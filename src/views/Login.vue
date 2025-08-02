<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link to="/register" class="font-medium text-primary-600 hover:text-primary-500">
            create a new account
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.username }"
              placeholder="Enter your username"
            />
            <p v-if="errors.username" class="mt-1 text-sm text-red-600">{{ errors.username }}</p>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Enter your password"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>
        </div>

        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-4">
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary flex justify-center items-center"
          >
            <div v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>

        <!-- Test Admin Login -->
        <div class="mt-4">
          <button
            type="button"
            @click="testAdminLogin"
            class="w-full btn-secondary flex justify-center items-center"
          >
            Test Admin Login (Dev Mode)
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

const validateForm = () => {
  let isValid = true
  errors.username = ''
  errors.password = ''

  if (!form.username.trim()) {
    errors.username = 'Username is required'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  loading.value = true
  errorMessage.value = ''

  try {
    const result = await authStore.login({
      username: form.username,
      password: form.password
    })

    if (result.success) {
      router.push('/')
    } else {
      errorMessage.value = result.message
    }
  } catch (error) {
    errorMessage.value = 'An error occurred during login'
  } finally {
    loading.value = false
  }
}

const testAdminLogin = async () => {
  // Use real admin credentials for testing
  loading.value = true
  errorMessage.value = ''

  try {
    console.log('Attempting admin login...')
    const result = await authStore.login({
      username: 'admin',
      password: 'admin123'
    })

    console.log('Login result:', result)
    console.log('Auth store after login:', {
      isAuthenticated: authStore.isAuthenticated,
      token: authStore.token,
      user: authStore.user
    })

    if (result.success) {
      // Verify token is set in API headers
      console.log('API headers after login:', authStore.token ? `Bearer ${authStore.token}` : 'No token')
      router.push('/admin')
    } else {
      errorMessage.value = result.message || 'Admin login failed'
    }
  } catch (error) {
    console.error('Error during admin login:', error)
    errorMessage.value = 'Error during admin login'
  } finally {
    loading.value = false
  }
}
</script> 