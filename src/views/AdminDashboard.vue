<template>
  <AdminLayout>
    <div class="admin-dashboard">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-600 mt-2">Welcome to your store management dashboard</p>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Products</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalProducts }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Categories</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalCategories }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Users</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Low Stock</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.lowStockProducts }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <router-link to="/admin/products/create" class="btn-primary w-full block text-center">
              Add New Product
            </router-link>
            <router-link to="/admin/categories/create" class="btn-secondary w-full block text-center">
              Add New Category
            </router-link>
            <router-link to="/admin/users" class="btn-secondary w-full block text-center">
              Manage Users
            </router-link>
            <router-link to="/admin/debug" class="btn-secondary w-full block text-center">
              Debug Panel
            </router-link>
            <button @click="refreshData" class="btn-secondary w-full" :disabled="loading">
              {{ loading ? 'Refreshing...' : 'Refresh Data' }}
            </button>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div class="space-y-3">
            <div v-if="recentProducts.length > 0">
              <h4 class="text-sm font-medium text-gray-600 mb-2">Recently Added Products</h4>
              <ul class="space-y-1">
                <li v-for="product in recentProducts.slice(0, 3)" :key="product.id" class="text-sm text-gray-700">
                  • {{ product.name }}
                </li>
              </ul>
            </div>
            <div v-else class="text-sm text-gray-500">
              No recent activity
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Products Table -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Recent Products</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in recentProducts.slice(0, 5)" :key="product.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ product.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ getCategoryName(product.category_id) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{{ formatPrice(product.price) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span :class="getStockClass(product.stock)">
                    {{ product.stock }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(product.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ product.status === 1 ? 'Active' : 'Inactive' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { productApi, adminUserApi } from '@/services/api'

export default {
  name: 'AdminDashboard',
  components: {
    AdminLayout
  },
  setup() {
    const loading = ref(true)
    const products = ref([])
    const categories = ref([])
    const users = ref([])

    const stats = computed(() => ({
      totalProducts: Array.isArray(products.value) ? products.value.length : 0,
      totalCategories: Array.isArray(categories.value) ? categories.value.length : 0,
      totalUsers: Array.isArray(users.value) ? users.value.length : 0,
      lowStockProducts: Array.isArray(products.value) ? products.value.filter(p => p.stock <= 5).length : 0,
      totalOrders: 0 // Placeholder for orders
    }))

    const recentProducts = computed(() => {
      if (!Array.isArray(products.value)) {
        return []
      }
      return [...products.value]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)
    })

    const fetchData = async () => {
      try {
        loading.value = true
        const [productsResponse, categoriesResponse, usersResponse] = await Promise.all([
          productApi.getProducts({ limit: 50 }),
          productApi.getCategories(),
          adminUserApi.getUsers({ limit: 100 })
        ])
        
        // Handle standardized API response structure
        if (productsResponse.data.success && productsResponse.data.data) {
          const productData = productsResponse.data.data
          if (productData.products && Array.isArray(productData.products)) {
            products.value = productData.products
          } else {
            products.value = []
          }
        } else {
          products.value = []
        }
        
        // Handle categories response
        if (categoriesResponse.data.success && categoriesResponse.data.data) {
          categories.value = Array.isArray(categoriesResponse.data.data) ? categoriesResponse.data.data : []
        } else {
          categories.value = []
        }
        
        // Handle users response
        if (usersResponse.data.success && usersResponse.data.data) {
          const userData = usersResponse.data.data
          if (userData.users && Array.isArray(userData.users)) {
            users.value = userData.users
          } else {
            users.value = []
          }
        } else {
          users.value = []
        }
        
        console.log('Products loaded:', products.value.length)
        console.log('Categories loaded:', categories.value.length)
        console.log('Users loaded:', users.value.length)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        products.value = []
        categories.value = []
        users.value = []
      } finally {
        loading.value = false
      }
    }

    const refreshData = () => {
      fetchData()
    }

    const getCategoryName = (categoryId) => {
      const category = categories.value.find(c => c.id === categoryId)
      return category ? category.name : 'Unknown'
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-IN').format(parseFloat(price))
    }

    const getStockClass = (stock) => {
      if (stock <= 0) return 'text-red-600 font-semibold'
      if (stock <= 5) return 'text-yellow-600 font-semibold'
      return 'text-green-600'
    }

    const getStatusClass = (status) => {
      return status === 1 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }

    onMounted(() => {
      fetchData()
    })

    return {
      loading,
      stats,
      recentProducts,
      refreshData,
      getCategoryName,
      formatPrice,
      getStockClass,
      getStatusClass
    }
  }
}
</script>
