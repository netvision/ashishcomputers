<template>
  <div>
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Product Image Carousel -->
        <div>
          <ProductImageCarousel
            :images="product.images"
            :product-id="product.id"
          />
        </div>

        <!-- Product Info -->
        <div>
          <div v-if="product.company" class="flex items-center mb-2">
            <img
              v-if="product.company.logo"
              :src="product.company.logo"
              :alt="product.company.name"
              class="w-8 h-8 mr-3 object-contain"
              @error="handleCompanyLogoError"
            />
            <span class="text-lg text-gray-600 font-medium">{{ product.company.name }}</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
          <div v-if="product.sku || product.model_no" class="text-sm text-gray-500 mb-4">
            <span v-if="product.sku">SKU: {{ product.sku }}</span>
            <span v-if="product.sku && product.model_no"> • </span>
            <span v-if="product.model_no">Model: {{ product.model_no }}</span>
          </div>
          
          <!-- Multi-Tier Pricing -->
          <ProductPricing
            :base-price="product.price"
            :mrp="product.mrp"
            :prices="product.prices || []"
            :product-id="product.id"
            :stock="product.stock"
            class="mb-6"
          />
          
          <div class="mb-6">
            <p class="text-gray-600">{{ product.description }}</p>
          </div>

          <!-- Categories Display -->
          <div class="mb-6">
            <div class="flex items-center space-x-4 mb-2">
              <span class="text-sm text-gray-600">Categories:</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="category in product.categories"
                  :key="category.id"
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    category.is_primary
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ category.name }}
                  <span v-if="category.is_primary" class="ml-1">(Primary)</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Quantity Selector -->
          <div class="mb-6">
            <div class="flex items-center space-x-4">
              <label for="quantity" class="text-sm font-medium text-gray-700">Quantity:</label>
              <div class="flex items-center space-x-2">
                <button
                  @click="decrementQuantity"
                  :disabled="quantity <= 1"
                  class="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <input
                  id="quantity"
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  class="w-20 px-3 py-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  @click="incrementQuantity"
                  class="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button 
              @click="addToCart"
              class="w-full btn-primary"
            >
              Add {{ quantity }} to Cart
            </button>
            
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="addToWishlist"
                class="btn-secondary flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span>Wishlist</span>
              </button>
              
              <router-link 
                to="/products"
                class="btn-secondary text-center flex items-center justify-center"
              >
                Back to Products
              </router-link>
            </div>
          </div>

          <!-- Product Features -->
          <div v-if="product.features" class="mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Product Features</h3>
            <ul class="space-y-2">
              <li
                v-for="feature in product.features"
                :key="feature"
                class="flex items-center space-x-2 text-sm text-gray-600"
              >
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Related Products Section -->
      <div v-if="relatedProducts.length > 0" class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="card overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div class="aspect-w-16 aspect-h-12 bg-gray-200">
              <img
                :src="relatedProduct.primary_image || `https://picsum.photos/300/200?random=${relatedProduct.id}`"
                :alt="relatedProduct.name"
                class="w-full h-48 object-cover"
              />
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ relatedProduct.name }}</h3>
              <p class="text-xl font-bold text-blue-600 mb-3">₹{{ formatPrice(relatedProduct.price) }}</p>
              <router-link
                :to="`/product/${relatedProduct.id}`"
                class="btn-secondary text-center text-sm w-full"
              >
                View Details
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <h3 class="text-lg font-medium text-gray-900">Product not found</h3>
      <p class="mt-1 text-sm text-gray-500">The product you're looking for doesn't exist.</p>
      <div class="mt-6">
        <router-link to="/products" class="btn-primary">
          Browse Products
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import ProductImageCarousel from '@/components/ProductImageCarousel.vue'
import ProductPricing from '@/components/ProductPricing.vue'
import { productApi } from '@/services/api'

export default {
  name: 'ProductDetail',
  components: {
    ProductImageCarousel,
    ProductPricing
  },
  setup() {
    const route = useRoute()
    const cartStore = useCartStore()
    const authStore = useAuthStore()

    const product = ref(null)
    const relatedProducts = ref([])
    const loading = ref(false)
    const quantity = ref(1)

    const fetchProduct = async () => {
      loading.value = true
      try {
        const response = await productApi.getProduct(route.params.id)
        console.log('Product API response:', response.data)
        
        if (response.data.success) {
          product.value = response.data.data
          // Fetch related products after getting the main product
          fetchRelatedProducts()
        } else {
          console.error('Product not found:', response.data.message)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        loading.value = false
      }
    }

    const fetchRelatedProducts = async () => {
      if (!product.value) return
      
      try {
        // Fetch products from the same primary category
        const primaryCategory = product.value.primary_category || product.value.category
        if (primaryCategory) {
          const response = await productApi.getProducts({ 
            category_id: primaryCategory.id, 
            limit: 4 
          })
          
          if (response.data.success && response.data.data && response.data.data.products) {
            relatedProducts.value = response.data.data.products
              .filter(p => p.id !== product.value.id)
              .slice(0, 4)
          }
        }
      } catch (error) {
        console.error('Error fetching related products:', error)
      }
    }

    const addToCart = () => {
      if (product.value) {
        cartStore.addItem({
          id: product.value.id,
          name: product.value.name,
          price: product.value.user_price || product.value.price,
          image: product.value.primary_image,
          quantity: quantity.value
        })
      }
    }

    const addToWishlist = () => {
      // TODO: Implement wishlist functionality
      console.log('Add to wishlist:', product.value.id)
    }

    const incrementQuantity = () => {
      quantity.value++
    }

    const decrementQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--
      }
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-IN').format(parseFloat(price))
    }

    const handleCompanyLogoError = (event) => {
      event.target.style.display = 'none'
    }

    onMounted(() => {
      fetchProduct()
    })

    return {
      product,
      relatedProducts,
      loading,
      quantity,
      addToCart,
      addToWishlist,
      incrementQuantity,
      decrementQuantity,
      formatPrice,
      handleCompanyLogoError
    }
  }
}
</script> 