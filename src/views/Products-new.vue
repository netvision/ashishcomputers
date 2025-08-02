<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Our Products</h1>
        <p class="mt-4 text-lg text-gray-600">Browse our collection of computers and accessories</p>
      </div>

      <!-- Search and Filter Section -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="input-field"
            />
          </div>
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              id="category"
              v-model="selectedCategory"
              class="input-field"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="sort" class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              id="sort"
              v-model="sortBy"
              class="input-field"
            >
              <option value="name">Name</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="created_at">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <p class="text-gray-600">{{ error }}</p>
        <button @click="fetchProducts" class="btn-primary mt-4">Try Again</button>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="card overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div class="aspect-w-16 aspect-h-12 bg-gray-200">
            <img
              :src="product.image || `https://picsum.photos/400/300?random=${product.id}`"
              :alt="product.name"
              class="w-full h-48 object-cover"
              @error="handleImageError"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
            <div class="flex items-center justify-between mb-3">
              <ProductPricing
                :base-price="product.price"
                :prices="product.prices || []"
                :product-id="product.id"
                class="flex-1"
              />
            </div>
            <div class="flex space-x-2">
              <router-link
                :to="`/product/${product.id}`"
                class="flex-1 btn-secondary text-center text-sm"
              >
                View Details
              </router-link>
              <button
                @click="addToCart(product)"
                :disabled="product.stock <= 0"
                class="flex-1 btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && filteredProducts.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <p class="text-gray-600">No products found matching your criteria.</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center">
        <nav class="flex space-x-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-2 text-sm border rounded-md',
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import ProductPricing from '@/components/ProductPricing.vue'
import api from '@/services/api'

export default {
  name: 'Products',
  components: {
    ProductPricing
  },
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const router = useRouter()

    // Reactive data
    const products = ref([])
    const categories = ref([])
    const loading = ref(true)
    const error = ref(null)
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortBy = ref('name')
    const currentPage = ref(1)
    const itemsPerPage = 12

    // Computed properties
    const filteredProducts = computed(() => {
      let filtered = products.value

      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        )
      }

      // Filter by category
      if (selectedCategory.value) {
        filtered = filtered.filter(product => product.category_id === selectedCategory.value)
      }

      // Sort products
      filtered.sort((a, b) => {
        switch (sortBy.value) {
          case 'price_asc':
            return parseFloat(a.price) - parseFloat(b.price)
          case 'price_desc':
            return parseFloat(b.price) - parseFloat(a.price)
          case 'created_at':
            return new Date(b.created_at) - new Date(a.created_at)
          default:
            return a.name.localeCompare(b.name)
        }
      })

      // Pagination
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filtered.slice(start, end)
    })

    const totalPages = computed(() => {
      let filtered = products.value
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        )
      }

      if (selectedCategory.value) {
        filtered = filtered.filter(product => product.category_id === selectedCategory.value)
      }

      return Math.ceil(filtered.length / itemsPerPage)
    })

    const visiblePages = computed(() => {
      const pages = []
      const start = Math.max(1, currentPage.value - 2)
      const end = Math.min(totalPages.value, start + 4)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    })

    // Methods
    const fetchProducts = async () => {
      try {
        loading.value = true
        error.value = null
        const response = await api.get('/products')
        products.value = response.data.data || response.data || []
      } catch (err) {
        console.error('Error fetching products:', err)
        error.value = 'Failed to load products. Please try again.'
      } finally {
        loading.value = false
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories')
        categories.value = response.data.data || response.data || []
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }

    const addToCart = (product) => {
      cartStore.addItem({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        stock: product.stock
      })
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-IN').format(parseFloat(price))
    }

    const handleImageError = (event) => {
      event.target.src = 'https://picsum.photos/400/300?random=default'
    }

    // Watchers
    watch([searchQuery, selectedCategory, sortBy], () => {
      currentPage.value = 1
    })

    // Lifecycle
    onMounted(() => {
      fetchProducts()
      fetchCategories()
    })

    return {
      products,
      categories,
      loading,
      error,
      searchQuery,
      selectedCategory,
      sortBy,
      currentPage,
      filteredProducts,
      totalPages,
      visiblePages,
      fetchProducts,
      addToCart,
      formatPrice,
      handleImageError
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-w-16 {
  position: relative;
  padding-bottom: 75%; /* 16:12 aspect ratio */
}

.aspect-w-16 > img {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
