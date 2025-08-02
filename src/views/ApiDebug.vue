<template>
  <div class="p-4">
    <h1>API Debug Tool</h1>
    
    <div class="mb-4">
      <p><strong>Current API Base URL:</strong> {{ apiBaseUrl }}</p>
      <p><strong>Environment:</strong> {{ isDev ? 'Development' : 'Production' }}</p>
      <p><strong>Environment Variable:</strong> {{ envApiUrl || 'Not set' }}</p>
    </div>

    <div class="space-y-4">
      <div>
        <button @click="testCategories" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Test Categories API
        </button>
        <button @click="testProducts" class="bg-green-500 text-white px-4 py-2 rounded mr-2">
          Test Products API
        </button>
        <button @click="testDirectAPI" class="bg-purple-500 text-white px-4 py-2 rounded">
          Test Direct API
        </button>
      </div>

      <div v-if="loading" class="text-blue-600">
        Loading...
      </div>

      <div v-if="result" class="mt-4">
        <h3 class="font-bold">Result:</h3>
        <pre class="bg-gray-100 p-4 rounded overflow-auto">{{ JSON.stringify(result, null, 2) }}</pre>
      </div>

      <div v-if="error" class="mt-4">
        <h3 class="font-bold text-red-600">Error:</h3>
        <pre class="bg-red-100 p-4 rounded overflow-auto">{{ JSON.stringify(error, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '@/services/api'
import axios from 'axios'

export default {
  name: 'ApiDebug',
  setup() {
    const loading = ref(false)
    const result = ref(null)
    const error = ref(null)

    const apiBaseUrl = api.defaults.baseURL
    const isDev = import.meta.env.DEV
    const envApiUrl = import.meta.env.VITE_API_BASE_URL

    const clearResults = () => {
      result.value = null
      error.value = null
    }

    const testCategories = async () => {
      clearResults()
      loading.value = true
      
      try {
        const response = await api.get('/products/categories')
        result.value = {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          data: response.data
        }
      } catch (err) {
        error.value = {
          message: err.message,
          code: err.code,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          config: {
            url: err.config?.url,
            method: err.config?.method,
            baseURL: err.config?.baseURL
          }
        }
      } finally {
        loading.value = false
      }
    }

    const testProducts = async () => {
      clearResults()
      loading.value = true
      
      try {
        const response = await api.get('/products')
        result.value = {
          status: response.status,
          statusText: response.statusText,
          data: response.data
        }
      } catch (err) {
        error.value = {
          message: err.message,
          code: err.code,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        }
      } finally {
        loading.value = false
      }
    }

    const testDirectAPI = async () => {
      clearResults()
      loading.value = true
      
      try {
        const directUrl = 'https://computers.netserve.in/api/v1/products/categories'
        const response = await axios.get(directUrl, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        result.value = {
          url: directUrl,
          status: response.status,
          statusText: response.statusText,
          data: response.data
        }
      } catch (err) {
        error.value = {
          url: 'https://computers.netserve.in/api/v1/products/categories',
          message: err.message,
          code: err.code,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        }
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      result,
      error,
      apiBaseUrl,
      isDev,
      envApiUrl,
      testCategories,
      testProducts,
      testDirectAPI
    }
  }
}
</script>
