<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Ashish Computers
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your trusted source for quality computer products and accessories. 
            Find the latest technology at competitive prices.
          </p>
          <div class="space-x-4">
            <router-link 
              to="/products" 
              class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Shop Now
            </router-link>
            <router-link 
              to="/products" 
              class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              View Categories
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Products -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p class="text-lg text-gray-600">Discover our most popular items</p>
        </div>

        <div v-if="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="featuredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            @click="goToProduct(product.id)"
          >
            <img 
              :src="product.primary_image || product.image" 
              :alt="product.name"
              class="w-full h-48 object-cover rounded-t-lg"
            />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
              
              <!-- User-specific pricing -->
              <div class="mb-3">
                <ProductPricing 
                  :base-price="product.price"
                  :mrp="product.mrp"
                  :prices="product.prices || []"
                  :product-id="product.id"
                  :show-bulk-pricing="false"
                />
              </div>
              
              <div class="flex justify-between items-center">
                <span></span> <!-- Empty span to maintain layout -->
                <button 
                  @click.stop="addToCart(product)"
                  class="btn-primary text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500">
          <p>No featured products available at the moment.</p>
        </div>
      </div>
    </div>

    <!-- Categories -->
    <div class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p class="text-lg text-gray-600">Browse our wide selection of computer products</p>
        </div>

        <div v-if="categoriesLoading" class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="categories.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            @click="goToCategory(category.id)"
          >
            <div class="p-6 text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ category.name }}</h3>
              <p class="text-gray-600">{{ category.description }}</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500">
          <p>No categories available at the moment.</p>
        </div>
      </div>
    </div>

    <!-- Features -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Free Shipping</h3>
            <p class="text-gray-600">Free shipping on orders over $50</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
            <p class="text-gray-600">30-day money-back guarantee</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p class="text-gray-600">Round-the-clock customer support</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { productApi } from '@/services/api'
import ProductPricing from '@/components/ProductPricing.vue'

const router = useRouter()
const cartStore = useCartStore()

const featuredProducts = ref([])
const categories = ref([])
const loading = ref(false)
const categoriesLoading = ref(false)

const fetchFeaturedProducts = async () => {
  loading.value = true
  try {
    const response = await productApi.getProducts({
      limit: 8,
      sort: 'created_at',
      order: 'desc'
    })
    if (response.data.success) {
      featuredProducts.value = response.data.data.products
    }
  } catch (error) {
    console.error('Error fetching featured products:', error)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  categoriesLoading.value = true
  try {
    const response = await productApi.getCategories()
    if (response.data.success) {
      categories.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  } finally {
    categoriesLoading.value = false
  }
}

const addToCart = (product) => {
  cartStore.addItem(product)
}

const goToProduct = (productId) => {
  router.push({
    name: 'ProductDetail',
    params: { id: productId }
  })
}

const goToCategory = (categoryId) => {
  router.push({
    name: 'Products',
    query: { category_id: categoryId }
  })
}

onMounted(() => {
  fetchFeaturedProducts()
  fetchCategories()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 