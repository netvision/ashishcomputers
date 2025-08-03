<template>
  <div class="min-h-screen">
    <!-- Enhanced Hero Section -->
    <div class="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0 bg-pattern"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="text-center animate-fade-in-up">
          <div class="mb-8">
            <div class="inline-flex items-center bg-white bg-opacity-10 rounded-full px-6 py-2 mb-6 backdrop-blur-sm border border-white border-opacity-20">
              <svg class="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span class="text-sm font-medium">Trusted by 10,000+ customers</span>
            </div>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span class="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Ashish Computers
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
            Experience the future of technology with our premium computer products and accessories. 
            Quality meets innovation at competitive prices.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link 
              to="/products" 
              class="group inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1"
            >
              <svg class="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              Shop Now
            </router-link>
            
            <router-link 
              to="/products" 
              class="group inline-flex items-center bg-white bg-opacity-10 text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white border-opacity-30 hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
            >
              <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              Browse Categories
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Floating elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-16 h-16 bg-purple-400 rounded-full opacity-20 animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-20 animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <!-- Enhanced Featured Products Section -->
    <div class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-fade-in-up">
          <div class="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            Featured Products
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 heading-professional">
            Discover Our <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Bestsellers</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked products that combine cutting-edge technology with exceptional value
          </p>
        </div>

        <div v-if="loading" class="flex justify-center py-16">
          <div class="relative">
            <div class="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div class="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>

        <div v-else-if="featuredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in-scale"
            @click="goToProduct(product.id)"
          >
            <!-- Product Image with overlay -->
            <div class="relative overflow-hidden">
              <img 
                :src="product.primary_image || product.image" 
                :alt="product.name"
                class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute top-4 left-4">
                <span class="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Featured
                </span>
              </div>
              <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button class="bg-white bg-opacity-90 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Product Details -->
            <div class="p-6">
              <div class="mb-3">
                <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {{ product.category?.name || 'Electronics' }}
                </span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {{ product.name }}
              </h3>
              
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ product.description || 'High-quality computer product with excellent performance and reliability.' }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="text-2xl font-bold text-gray-900">
                    ₹{{ formatPrice(product.price) }}
                  </span>
                  <span v-if="product.original_price && product.original_price > product.price" class="text-sm text-gray-500 line-through">
                    ₹{{ formatPrice(product.original_price) }}
                  </span>
                </div>
                
                <div class="flex items-center space-x-1">
                  <div class="flex text-yellow-400">
                    <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-500 ml-1">(4.8)</span>
                </div>
              </div>
              
              <div class="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Quick View
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-16">
          <div class="max-w-md mx-auto">
            <div class="bg-gradient-to-br from-gray-400 to-gray-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">No Products Available</h3>
            <p class="text-gray-600">Check back soon for exciting new products!</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Categories Section -->
    <div class="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-fade-in-up">
          <div class="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            Product Categories
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 heading-professional">
            Shop by <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of computer products and accessories
          </p>
        </div>

        <div v-if="categoriesLoading" class="flex justify-center py-16">
          <div class="relative">
            <div class="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin"></div>
            <div class="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>

        <div v-else-if="categories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            @click="goToCategory(category.id)"
          >
            <div class="p-8 text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200">
                {{ category.name }}
              </h3>
              <p class="text-gray-600 mb-6 leading-relaxed">
                {{ category.description || 'Discover amazing products in this category' }}
              </p>
              <div class="inline-flex items-center text-indigo-600 font-semibold group-hover:text-indigo-800 transition-colors duration-200">
                Explore Category
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-16">
          <div class="max-w-md mx-auto">
            <div class="bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Categories Coming Soon</h3>
            <p class="text-gray-600">We're working on organizing our products for you!</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Features Section -->
    <div class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4 heading-professional">
            Why Choose <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ashish Computers</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience exceptional service and quality with every purchase
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center group">
            <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Free Shipping</h3>
            <p class="text-gray-600 leading-relaxed">Free shipping on orders over ₹2,000 across India with fast delivery</p>
          </div>
          
          <div class="text-center group">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Quality Guarantee</h3>
            <p class="text-gray-600 leading-relaxed">All products come with manufacturer warranty and our quality assurance</p>
          </div>
          
          <div class="text-center group">
            <div class="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">24/7 Support</h3>
            <p class="text-gray-600 leading-relaxed">Round-the-clock customer support for all your technical queries and assistance</p>
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

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN').format(parseFloat(price || 0))
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

.bg-pattern {
  background-image: radial-gradient(circle at 30px 30px, rgba(255, 255, 255, 0.1) 2px, transparent 0);
  background-size: 60px 60px;
}

/* Enhanced animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 3s ease-in-out infinite;
  animation-delay: 1s;
}

/* Professional hover effects */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Gradient text animation */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gradient-text-animated {
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  animation: gradient-shift 4s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Professional card animations */
.card-professional {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-professional:hover {
  transform: translateY(-10px) scale(1.02);
}

/* Glass effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style> 