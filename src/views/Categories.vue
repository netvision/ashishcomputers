<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav class="flex mb-4" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2">
            <li>
              <router-link to="/" class="text-gray-500 hover:text-gray-700">Home</router-link>
            </li>
            <li>
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
            </li>
            <li>
              <router-link to="/products" class="text-gray-500 hover:text-gray-700">Products</router-link>
            </li>
            <li v-if="selectedCategory">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
            </li>
            <li v-if="selectedCategory" class="text-gray-900">{{ selectedCategory.name }}</li>
          </ol>
        </nav>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              {{ selectedCategory ? selectedCategory.name : 'All Categories' }}
            </h1>
            <p class="mt-2 text-gray-600">
              {{ selectedCategory ? selectedCategory.description : 'Browse products by category' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar - Categories -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Categories</h3>
            <div class="space-y-2">
              <button
                @click="selectCategory(null)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                  !selectedCategoryId ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                All Categories
              </button>
              <button
                v-for="category in categories"
                :key="category.id"
                @click="selectCategory(category)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                  selectedCategoryId === category.id ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                {{ category.name }}
                <span class="text-xs text-gray-500 ml-1">({{ getCategoryProductCount(category.id) }})</span>
              </button>
            </div>
          </div>

          <!-- Filters -->
          <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>
            
            <!-- Price Range -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div class="grid grid-cols-2 gap-2">
                <input
                  v-model="priceFilter.min"
                  type="number"
                  placeholder="Min"
                  class="input-field text-sm"
                />
                <input
                  v-model="priceFilter.max"
                  type="number"
                  placeholder="Max"
                  class="input-field text-sm"
                />
              </div>
            </div>

            <!-- Stock Status -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="stockFilter" value="all" type="radio" class="text-primary-600">
                  <span class="ml-2 text-sm text-gray-700">All Products</span>
                </label>
                <label class="flex items-center">
                  <input v-model="stockFilter" value="in-stock" type="radio" class="text-primary-600">
                  <span class="ml-2 text-sm text-gray-700">In Stock</span>
                </label>
                <label class="flex items-center">
                  <input v-model="stockFilter" value="out-of-stock" type="radio" class="text-primary-600">
                  <span class="ml-2 text-sm text-gray-700">Out of Stock</span>
                </label>
              </div>
            </div>

            <button @click="clearFilters" class="w-full btn-secondary text-sm">
              Clear Filters
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:w-3/4">
          <!-- Search and Sort -->
          <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products..."
                  class="input-field"
                />
              </div>
              <div class="sm:w-48">
                <select v-model="sortBy" class="input-field">
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="price-asc">Price Low to High</option>
                  <option value="price-desc">Price High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-if="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>

          <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="product in paginatedProducts" 
              :key="product.id"
              class="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              @click="goToProduct(product.id)"
            >
              <img 
                :src="product.image || `https://picsum.photos/400/300?random=${product.id}`" 
                :alt="product.name"
                class="w-full h-48 object-cover rounded-t-lg"
                @error="handleImageError"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{{ product.name }}</h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-xl font-bold text-primary-600">₹{{ formatPrice(product.price) }}</span>
                  <button 
                    @click.stop="addToCart(product)"
                    class="btn-primary text-sm"
                    :disabled="product.stock <= 0"
                  >
                    {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
                  </button>
                </div>
                <div class="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span>{{ getCategoryName(product.category_id) }}</span>
                  <span :class="getStockClass(product.stock)">
                    {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ searchQuery ? 'Try adjusting your search or filters.' : 'No products available in this category.' }}
            </p>
          </div>

          <!-- Pagination -->
          <div v-if="filteredProducts.length > productsPerPage" class="mt-8 flex justify-center">
            <nav class="flex space-x-1">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 text-sm',
                  currentPage === page ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import api from '@/services/api'

export default {
  name: 'Categories',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const cartStore = useCartStore()

    const products = ref([])
    const categories = ref([])
    const loading = ref(true)
    const searchQuery = ref('')
    const sortBy = ref('name-asc')
    const selectedCategoryId = ref(null)
    const stockFilter = ref('all')
    const priceFilter = ref({ min: '', max: '' })
    const currentPage = ref(1)
    const productsPerPage = 12

    const selectedCategory = computed(() => {
      return categories.value.find(c => c.id === selectedCategoryId.value)
    })

    const filteredProducts = computed(() => {
      let filtered = products.value

      // Category filter
      if (selectedCategoryId.value) {
        filtered = filtered.filter(p => p.category_id === selectedCategoryId.value)
      }

      // Search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        )
      }

      // Stock filter
      if (stockFilter.value === 'in-stock') {
        filtered = filtered.filter(p => p.stock > 0)
      } else if (stockFilter.value === 'out-of-stock') {
        filtered = filtered.filter(p => p.stock <= 0)
      }

      // Price filter
      if (priceFilter.value.min) {
        filtered = filtered.filter(p => p.price >= parseFloat(priceFilter.value.min))
      }
      if (priceFilter.value.max) {
        filtered = filtered.filter(p => p.price <= parseFloat(priceFilter.value.max))
      }

      // Sort
      filtered.sort((a, b) => {
        switch (sortBy.value) {
          case 'name-asc':
            return a.name.localeCompare(b.name)
          case 'name-desc':
            return b.name.localeCompare(a.name)
          case 'price-asc':
            return a.price - b.price
          case 'price-desc':
            return b.price - a.price
          case 'newest':
            return new Date(b.created_at) - new Date(a.created_at)
          default:
            return 0
        }
      })

      return filtered
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredProducts.value.length / productsPerPage)
    })

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * productsPerPage
      const end = start + productsPerPage
      return filteredProducts.value.slice(start, end)
    })

    const fetchProducts = async () => {
      try {
        const response = await api.get('/products')
        if (response.data.success) {
          products.value = response.data.data.products || response.data.data || []
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await api.get('/products/categories')
        if (response.data.success) {
          categories.value = response.data.data || []
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const selectCategory = (category) => {
      selectedCategoryId.value = category ? category.id : null
      currentPage.value = 1
      
      // Update URL
      if (category) {
        router.push({ name: 'Products', query: { category_id: category.id } })
      } else {
        router.push({ name: 'Products' })
      }
    }

    const getCategoryName = (categoryId) => {
      const category = categories.value.find(c => c.id === categoryId)
      return category ? category.name : 'Unknown'
    }

    const getCategoryProductCount = (categoryId) => {
      return products.value.filter(p => p.category_id === categoryId).length
    }

    const getStockClass = (stock) => {
      if (stock <= 0) return 'text-red-600'
      if (stock <= 5) return 'text-yellow-600'
      return 'text-green-600'
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-IN').format(parseFloat(price))
    }

    const handleImageError = (event) => {
      event.target.src = 'https://picsum.photos/400/300?random=default'
    }

    const addToCart = (product) => {
      cartStore.addItem(product)
    }

    const goToProduct = (productId) => {
      router.push(`/product/${productId}`)
    }

    const clearFilters = () => {
      searchQuery.value = ''
      stockFilter.value = 'all'
      priceFilter.value = { min: '', max: '' }
      sortBy.value = 'name-asc'
      currentPage.value = 1
    }

    // Watch route changes
    watch(() => route.query.category_id, (newCategoryId) => {
      selectedCategoryId.value = newCategoryId ? parseInt(newCategoryId) : null
    }, { immediate: true })

    // Reset page when filters change
    watch([searchQuery, stockFilter, priceFilter, sortBy], () => {
      currentPage.value = 1
    })

    onMounted(async () => {
      loading.value = true
      await Promise.all([fetchProducts(), fetchCategories()])
      loading.value = false
    })

    return {
      products,
      categories,
      loading,
      searchQuery,
      sortBy,
      selectedCategoryId,
      selectedCategory,
      stockFilter,
      priceFilter,
      currentPage,
      productsPerPage,
      filteredProducts,
      totalPages,
      paginatedProducts,
      selectCategory,
      getCategoryName,
      getCategoryProductCount,
      getStockClass,
      formatPrice,
      handleImageError,
      addToCart,
      goToProduct,
      clearFilters
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
