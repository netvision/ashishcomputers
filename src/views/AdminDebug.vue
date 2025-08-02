<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Admin Debug Panel</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Auth Status -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-3">Authentication Status</h2>
        <div class="space-y-2 text-sm">
          <p><strong>Is Authenticated:</strong> {{ authStore.isAuthenticated ? 'Yes' : 'No' }}</p>
          <p><strong>Is Admin:</strong> {{ authStore.isAdmin ? 'Yes' : 'No' }}</p>
          <p><strong>User:</strong> {{ authStore.user ? JSON.stringify(authStore.user, null, 2) : 'None' }}</p>
          <p><strong>Token:</strong> {{ authStore.token ? 'Present' : 'None' }}</p>
        </div>
      </div>

      <!-- API Test -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-3">API Tests</h2>
        <div class="space-y-2">
          <button @click="testCategories" class="btn-primary w-full">Test Categories API</button>
          <button @click="testProducts" class="btn-primary w-full">Test Products API</button>
          <button @click="testAuth" class="btn-primary w-full">Test Auth Status</button>
        </div>
        
        <div v-if="apiResult" class="mt-4">
          <h3 class="font-semibold">API Result:</h3>
          <pre class="bg-gray-100 p-2 rounded text-xs overflow-auto">{{ JSON.stringify(apiResult, null, 2) }}</pre>
        </div>
        
        <div v-if="apiError" class="mt-4">
          <h3 class="font-semibold text-red-600">API Error:</h3>
          <pre class="bg-red-100 p-2 rounded text-xs overflow-auto">{{ JSON.stringify(apiError, null, 2) }}</pre>
        </div>
      </div>

      <!-- Data Status -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-3">Data Status</h2>
        <div class="space-y-2 text-sm">
          <p><strong>Categories Count:</strong> {{ categoriesCount }}</p>
          <p><strong>Products Count:</strong> {{ productsCount }}</p>
          <p><strong>Last Fetch:</strong> {{ lastFetch || 'Never' }}</p>
        </div>
        
        <button @click="refreshData" class="btn-secondary w-full mt-3">Refresh Data</button>
      </div>

      <!-- Manual Data Entry -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-3">Manual Test</h2>
        <div class="space-y-3">
          <button @click="addMockCategories" class="btn-secondary w-full">Add Mock Categories</button>
          <button @click="addMockProducts" class="btn-secondary w-full">Add Mock Products</button>
          <button @click="clearData" class="btn-secondary w-full">Clear All Data</button>
        </div>
      </div>
    </div>

    <!-- Raw Data Display -->
    <div class="mt-6 bg-white p-4 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-3">Raw Data</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 class="font-medium mb-2">Categories:</h3>
          <pre class="bg-gray-100 p-2 rounded text-xs overflow-auto h-40">{{ JSON.stringify(rawCategories, null, 2) }}</pre>
        </div>
        <div>
          <h3 class="font-medium mb-2">Products:</h3>
          <pre class="bg-gray-100 p-2 rounded text-xs overflow-auto h-40">{{ JSON.stringify(rawProducts, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

export default {
  name: 'AdminDebug',
  setup() {
    const authStore = useAuthStore()
    
    const apiResult = ref(null)
    const apiError = ref(null)
    const rawCategories = ref([])
    const rawProducts = ref([])
    const lastFetch = ref(null)

    const categoriesCount = computed(() => rawCategories.value.length)
    const productsCount = computed(() => rawProducts.value.length)

    const testCategories = async () => {
      apiResult.value = null
      apiError.value = null
      
      try {
        const response = await api.get('/categories')
        apiResult.value = response.data
        rawCategories.value = response.data.data || response.data || []
        lastFetch.value = new Date().toLocaleTimeString()
      } catch (error) {
        apiError.value = {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        }
      }
    }

    const testProducts = async () => {
      apiResult.value = null
      apiError.value = null
      
      try {
        const response = await api.get('/products')
        apiResult.value = response.data
        rawProducts.value = response.data.data?.products || response.data.data || response.data || []
        lastFetch.value = new Date().toLocaleTimeString()
      } catch (error) {
        apiError.value = {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        }
      }
    }

    const testAuth = async () => {
      apiResult.value = null
      apiError.value = null
      
      try {
        // Try to fetch user profile or any protected endpoint
        const response = await api.get('/auth/me')
        apiResult.value = response.data
      } catch (error) {
        apiError.value = {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        }
      }
    }

    const refreshData = async () => {
      await Promise.all([testCategories(), testProducts()])
    }

    const addMockCategories = () => {
      rawCategories.value = [
        { id: 1, name: 'Laptops', slug: 'laptops', description: 'Portable computers', status: 1 },
        { id: 2, name: 'Desktops', slug: 'desktops', description: 'Desktop computers', status: 1 },
        { id: 3, name: 'Accessories', slug: 'accessories', description: 'Computer accessories', status: 1 }
      ]
      lastFetch.value = new Date().toLocaleTimeString()
    }

    const addMockProducts = () => {
      rawProducts.value = [
        { id: 1, name: 'Gaming Laptop', description: 'High-performance laptop', price: 1299.99, stock: 10, category_id: 1, status: 1 },
        { id: 2, name: 'Office Desktop', description: 'Reliable desktop computer', price: 599.99, stock: 15, category_id: 2, status: 1 },
        { id: 3, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 29.99, stock: 50, category_id: 3, status: 1 }
      ]
      lastFetch.value = new Date().toLocaleTimeString()
    }

    const clearData = () => {
      rawCategories.value = []
      rawProducts.value = []
      apiResult.value = null
      apiError.value = null
      lastFetch.value = null
    }

    onMounted(() => {
      console.log('Admin Debug mounted')
      console.log('Auth store:', authStore)
    })

    return {
      authStore,
      apiResult,
      apiError,
      rawCategories,
      rawProducts,
      lastFetch,
      categoriesCount,
      productsCount,
      testCategories,
      testProducts,
      testAuth,
      refreshData,
      addMockCategories,
      addMockProducts,
      clearData
    }
  }
}
</script>
