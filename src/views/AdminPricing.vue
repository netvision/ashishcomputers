<template>
  <AdminLayout>
    <div class="admin-pricing bg-gray-50 min-h-screen">
      <!-- Header with gradient background -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 shadow-lg rounded-lg mb-8 p-8 text-white">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold mb-2">Price Management</h1>
            <p class="text-green-100 text-lg">Update product prices quickly and efficiently</p>
          </div>
          <div class="hidden md:block">
            <div class="bg-white bg-opacity-20 rounded-full p-4">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-gray-800 mb-1">{{ totalProducts }}</div>
              <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Products</div>
            </div>
            <div class="bg-gradient-to-br from-green-400 to-emerald-600 p-3 rounded-full shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Active</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-gray-800 mb-1">{{ updatedToday }}</div>
              <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">Updated Today</div>
            </div>
            <div class="bg-gradient-to-br from-blue-400 to-indigo-600 p-3 rounded-full shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">Recent</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-gray-800 mb-1">₹{{ averagePrice }}</div>
              <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">Average Price</div>
            </div>
            <div class="bg-gradient-to-br from-purple-400 to-pink-600 p-3 rounded-full shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">Analytics</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-gray-800 mb-1">{{ pendingUpdates }}</div>
              <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">Pending Updates</div>
            </div>
            <div class="bg-gradient-to-br from-orange-400 to-red-600 p-3 rounded-full shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">Queue</span>
          </div>
        </div>
      </div>

      <!-- Enhanced Filters Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div class="flex items-center mb-4">
          <svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-800">Filter Products</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Search Products</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search by name, SKU..." 
                class="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              />
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Category</label>
            <select v-model="selectedCategory" class="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Price Range</label>
            <select v-model="priceRange" class="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200">
              <option value="">All Prices</option>
              <option value="0-1000">₹0 - ₹1,000</option>
              <option value="1000-5000">₹1,000 - ₹5,000</option>
              <option value="5000-10000">₹5,000 - ₹10,000</option>
              <option value="10000+">₹10,000+</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Enhanced Products Table -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center">
            <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
            Product Pricing
            <span v-if="hasUnsavedChanges" class="ml-2 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
              {{ Object.keys(priceChanges).length }} unsaved changes
            </span>
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Product</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Category</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">SKU</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Base Price</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Customer Pricing</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-green-50 transition-colors duration-200">
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-16 h-16">
                      <img
                        :src="product.image || `https://picsum.photos/200/200?random=${product.id}`"
                        :alt="product.name"
                        class="w-16 h-16 object-cover rounded-xl shadow-md"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-bold text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">{{ product.description?.substring(0, 50) }}...</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {{ product.category?.name || product.category_name || 'Uncategorized' }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ product.sku || product.id || 'N/A' }}</div>
                </td>
                
                <!-- Base Price -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div v-if="editingPrice[product.id] === 'base'">
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 text-sm">₹</span>
                      </div>
                      <input
                        :ref="`input-${product.id}-base`"
                        v-model="tempPrices[`${product.id}-base`]"
                        @keyup.enter="savePrice(product.id, 'base', tempPrices[`${product.id}-base`])"
                        @keyup.escape="cancelEdit(product.id, 'base')"
                        @blur="savePrice(product.id, 'base', tempPrices[`${product.id}-base`])"
                        type="number"
                        step="0.01"
                        min="0"
                        class="pl-8 block w-32 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-50"
                      />
                    </div>
                    <div class="text-xs text-gray-500 mt-1">Press Enter to save</div>
                  </div>
                  <div v-else @click="startEdit(product.id, 'base', product.base_price || product.price)" class="cursor-pointer hover:bg-green-100 rounded px-2 py-1 transition-colors">
                    <div class="text-lg font-bold text-green-600">₹{{ formatPrice(product.base_price || product.price || 0) }}</div>
                    <div class="text-xs text-gray-500">Default price - Click to edit</div>
                  </div>
                </td>

                <!-- Customer Pricing -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="space-y-2">
                    <div v-if="userTypes.length > 0">
                      <div v-for="userType in userTypes" :key="userType.id" class="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                        <div class="flex-1">
                          <div class="text-sm font-medium text-gray-800">{{ userType.name }}</div>
                          <div v-if="editingPrice[product.id] === `customer-${userType.id}`">
                            <div class="relative mt-1">
                              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="text-gray-500 text-sm">₹</span>
                              </div>
                              <input
                                :ref="`input-${product.id}-customer-${userType.id}`"
                                v-model="tempPrices[`${product.id}-customer-${userType.id}`]"
                                @keyup.enter="saveCustomerPrice(product.id, userType.id, tempPrices[`${product.id}-customer-${userType.id}`])"
                                @keyup.escape="cancelEdit(product.id, `customer-${userType.id}`)"
                                @blur="saveCustomerPrice(product.id, userType.id, tempPrices[`${product.id}-customer-${userType.id}`])"
                                type="number"
                                step="0.01"
                                min="0"
                                class="pl-8 block w-24 text-sm border-blue-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                              />
                            </div>
                            <div class="text-xs text-gray-500 mt-1">Press Enter to save</div>
                          </div>
                          <div v-else @click="startCustomerPriceEdit(product, userType)" class="cursor-pointer hover:bg-blue-100 rounded px-2 py-1 transition-colors">
                            <div v-if="getCustomerPrice(product, userType.id)" class="text-sm font-bold text-blue-600">
                              ₹{{ formatPrice(getCustomerPrice(product, userType.id)) }}
                            </div>
                            <div v-else class="text-sm text-gray-400 italic">
                              Uses base price
                            </div>
                          </div>
                        </div>
                        <div v-if="getCustomerPrice(product, userType.id) && editingPrice[product.id] !== `customer-${userType.id}`" class="ml-2">
                          <button @click="removeCustomerPrice(product.id, userType.id)" class="text-red-500 hover:text-red-700 text-xs">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-sm text-gray-400 italic">
                      Loading user types...
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-if="loading" class="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div class="max-w-md mx-auto">
            <div class="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Loading Products...</h3>
            <p class="text-gray-600">Please wait while we fetch product data.</p>
          </div>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div class="max-w-md mx-auto">
            <div class="bg-gradient-to-br from-gray-400 to-gray-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
            <p class="text-gray-600 mb-6">
              {{ products.length === 0 ? 'No products available for pricing.' : 'Try adjusting your search filters to find products.' }}
            </p>
            <button 
              v-if="products.length > 0" 
              @click="searchQuery = ''; selectedCategory = ''; priceRange = ''"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, onMounted, computed, nextTick } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { productApi, userApi } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'AdminPricing',
  components: {
    AdminLayout
  },
  setup() {
    const authStore = useAuthStore()
    const { success, error } = useNotification()
    const products = ref([])
    const categories = ref([])
    const userTypes = ref([])
    const loading = ref(true)
    
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const priceRange = ref('')

    // Inline editing states
    const editingPrice = ref({}) // tracks which product-price combination is being edited
    const tempPrices = ref({}) // holds temporary input values
    const priceChanges = ref({}) // tracks unsaved changes
    
    // Modal states
    const selectedProduct = ref(null)
    const showPricingModal = ref(false)

    const fetchProducts = async () => {
      try {
        loading.value = true
        console.log('Fetching products for pricing...')
        const response = await productApi.getProducts()
        
        console.log('Products API response:', response.data)
        
        // Handle different response structures
        if (response.data.success) {
          products.value = response.data.data.products || response.data.data || []
        } else if (Array.isArray(response.data)) {
          products.value = response.data
        } else {
          products.value = response.data.data || response.data || []
        }
        
        console.log('Products loaded:', products.value.length)
      } catch (err) {
        console.error('Error fetching products:', err)
        error('Failed to load products: ' + (err.response?.data?.message || err.message))
        products.value = []
      } finally {
        loading.value = false
      }
    }

    const fetchCategories = async () => {
      try {
        console.log('Fetching categories for pricing...')
        const response = await productApi.getCategories()
        console.log('Categories response for pricing:', response)
        categories.value = response.data.data || response.data || []
        console.log('Categories loaded for pricing:', categories.value)
      } catch (err) {
        console.error('Failed to load categories:', err)
        // Add some default categories for testing
        categories.value = [
          { id: 1, name: 'Laptops' },
          { id: 2, name: 'Desktops' },
          { id: 3, name: 'Accessories' }
        ]
      }
    }

    const fetchUserTypes = async () => {
      try {
        console.log('Fetching user types...')
        const response = await userApi.getUserTypes()
        console.log('User types response:', response)
        userTypes.value = response.data.data || response.data || []
        console.log('User types loaded:', userTypes.value)
      } catch (error) {
        console.error('Error fetching user types:', error)
        // Add fallback data
        userTypes.value = [
          { id: 1, name: 'Regular Customer', description: 'Standard retail customers', discount_percentage: 0 },
          { id: 2, name: 'Wholesale Customer', description: 'Bulk purchase customers', discount_percentage: 10 },
          { id: 3, name: 'VIP Customer', description: 'Premium customers', discount_percentage: 15 },
          { id: 4, name: 'Staff', description: 'Company staff members', discount_percentage: 20 }
        ]
      }
    }

    // Computed properties
    const hasUnsavedChanges = computed(() => Object.keys(priceChanges.value).length > 0)

    const filteredProducts = computed(() => {
      let filtered = products.value

      // Search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.sku?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
        )
      }

      // Category filter
      if (selectedCategory.value) {
        filtered = filtered.filter(product => 
          product.category_id == selectedCategory.value
        )
      }

      // Price range filter
      if (priceRange.value) {
        const [min, max] = priceRange.value.split('-').map(p => p.replace('+', ''))
        filtered = filtered.filter(product => {
          const price = parseFloat(product.price)
          if (max) {
            return price >= parseFloat(min) && price <= parseFloat(max)
          } else {
            return price >= parseFloat(min)
          }
        })
      }

      return filtered
    })

    // Stats computations
    const totalProducts = computed(() => products.value.length)
    const updatedToday = computed(() => {
      // This would ideally come from backend tracking price update dates
      return 0
    })
    const averagePrice = computed(() => {
      if (products.value.length === 0) return '0'
      const total = products.value.reduce((sum, product) => sum + parseFloat(product.price || 0), 0)
      return (total / products.value.length).toFixed(0)
    })
    const pendingUpdates = computed(() => 0)

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-IN').format(parseFloat(price))
    }

    const startEdit = (productId, priceType, currentValue) => {
      editingPrice.value[productId] = priceType
      tempPrices.value[`${productId}-${priceType}`] = currentValue || 0
      
      // Focus the input field in the next tick
      nextTick(() => {
        const input = document.querySelector(`input[ref="input-${productId}-${priceType}"]`)
        if (input) {
          input.focus()
          input.select()
        }
      })
    }

    const cancelEdit = (productId, priceType) => {
      delete editingPrice.value[productId]
      delete tempPrices.value[`${productId}-${priceType}`]
    }

    const savePrice = async (productId, priceType, newValue) => {
      const numericPrice = parseFloat(newValue)
      if (isNaN(numericPrice) || numericPrice < 0) {
        cancelEdit(productId, priceType)
        return
      }

      try {
        // Only handle base price editing for now
        let updateData = {}
        if (priceType === 'base') {
          updateData.base_price = numericPrice
          updateData.price = numericPrice // Also update the main price field
        } else {
          return
        }

        const response = await productApi.updateProduct(productId, updateData)

        if (response.data.success) {
          // Update the product in the local array
          const productIndex = products.value.findIndex(p => p.id == productId)
          if (productIndex !== -1) {
            Object.assign(products.value[productIndex], updateData)
          }

          success(`Base price updated successfully`)
          cancelEdit(productId, priceType)
        } else {
          throw new Error(response.data.message || 'Failed to update price')
        }
      } catch (err) {
        error('Failed to update price: ' + (err.response?.data?.message || err.message))
        cancelEdit(productId, priceType)
      }
    }

    const getUserTypeName = (userTypeId) => {
      const userType = userTypes.value.find(ut => ut.id == userTypeId)
      return userType ? userType.name : 'Unknown'
    }

    const getCustomerPrice = (product, userTypeId) => {
      if (!product.prices || !Array.isArray(product.prices)) return null
      const priceItem = product.prices.find(p => p.user_type_id == userTypeId)
      return priceItem ? priceItem.price : null
    }

    const startCustomerPriceEdit = (product, userType) => {
      const currentPrice = getCustomerPrice(product, userType.id)
      const priceKey = `customer-${userType.id}`
      
      editingPrice.value[product.id] = priceKey
      tempPrices.value[`${product.id}-${priceKey}`] = currentPrice || (product.base_price || product.price || 0)
      
      // Focus the input field in the next tick
      nextTick(() => {
        const input = document.querySelector(`input[ref="input-${product.id}-${priceKey}"]`)
        if (input) {
          input.focus()
          input.select()
        }
      })
    }

    const saveCustomerPrice = async (productId, userTypeId, newValue) => {
      const numericPrice = parseFloat(newValue)
      if (isNaN(numericPrice) || numericPrice < 0) {
        cancelEdit(productId, `customer-${userTypeId}`)
        return
      }

      try {
        // Find the product
        const product = products.value.find(p => p.id == productId)
        if (!product) return

        // Check if this is removing the price (setting it to base price)
        const basePrice = parseFloat(product.base_price || product.price || 0)
        if (Math.abs(numericPrice - basePrice) < 0.01) {
          // Remove custom pricing if it matches base price
          await removeCustomerPrice(productId, userTypeId)
          return
        }

        // Prepare the prices array
        const currentPrices = product.prices || []
        const existingPriceIndex = currentPrices.findIndex(p => p.user_type_id == userTypeId)
        
        let updatedPrices
        if (existingPriceIndex >= 0) {
          // Update existing price
          updatedPrices = [...currentPrices]
          updatedPrices[existingPriceIndex] = {
            ...updatedPrices[existingPriceIndex],
            price: numericPrice
          }
        } else {
          // Add new price
          updatedPrices = [
            ...currentPrices,
            {
              user_type_id: userTypeId,
              price: numericPrice
            }
          ]
        }

        const response = await productApi.updateProduct(productId, {
          prices: updatedPrices
        })

        if (response.data.success) {
          // Update the product in the local array
          const productIndex = products.value.findIndex(p => p.id == productId)
          if (productIndex !== -1) {
            products.value[productIndex].prices = updatedPrices
          }

          const userTypeName = getUserTypeName(userTypeId)
          success(`${userTypeName} price updated successfully`)
          cancelEdit(productId, `customer-${userTypeId}`)
        } else {
          throw new Error(response.data.message || 'Failed to update customer price')
        }
      } catch (err) {
        error('Failed to update customer price: ' + (err.response?.data?.message || err.message))
        cancelEdit(productId, `customer-${userTypeId}`)
      }
    }

    const removeCustomerPrice = async (productId, userTypeId) => {
      try {
        const product = products.value.find(p => p.id == productId)
        if (!product) return

        const currentPrices = product.prices || []
        const updatedPrices = currentPrices.filter(p => p.user_type_id != userTypeId)

        const response = await productApi.updateProduct(productId, {
          prices: updatedPrices
        })

        if (response.data.success) {
          // Update the product in the local array
          const productIndex = products.value.findIndex(p => p.id == productId)
          if (productIndex !== -1) {
            products.value[productIndex].prices = updatedPrices
          }

          const userTypeName = getUserTypeName(userTypeId)
          success(`${userTypeName} custom pricing removed`)
        } else {
          throw new Error(response.data.message || 'Failed to remove customer price')
        }
      } catch (err) {
        const userTypeName = getUserTypeName(userTypeId)
        error(`Failed to remove ${userTypeName} pricing: ` + (err.response?.data?.message || err.message))
      }
    }

    onMounted(async () => {
      await Promise.all([fetchProducts(), fetchCategories(), fetchUserTypes()])
    })

    return {
      products,
      categories,
      userTypes,
      loading,
      searchQuery,
      selectedCategory,
      priceRange,
      editingPrice,
      tempPrices,
      priceChanges,
      hasUnsavedChanges,
      filteredProducts,
      totalProducts,
      updatedToday,
      averagePrice,
      pendingUpdates,
      formatPrice,
      startEdit,
      cancelEdit,
      savePrice,
      getUserTypeName,
      getCustomerPrice,
      startCustomerPriceEdit,
      saveCustomerPrice,
      removeCustomerPrice
    }
  }
}
</script>
