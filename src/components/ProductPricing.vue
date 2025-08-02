<template>
  <div class="product-pricing">
    <!-- Single Price Display (for non-authenticated users) -->
    <div v-if="!isAuthenticated || prices.length <= 1" class="single-price">
      <div class="flex items-center space-x-2">
        <span class="text-3xl font-bold text-blue-600">
          ₹{{ formatPrice(displayPrice) }}
        </span>
        <!-- Always show MRP if available, with strikethrough styling -->
        <span v-if="mrp && parseFloat(mrp) > 0" 
              class="text-lg text-gray-500 line-through">
          MRP ₹{{ formatPrice(mrp) }}
        </span>
        <span v-else-if="originalPrice && originalPrice !== displayPrice" class="text-lg text-gray-500 line-through">
          ₹{{ formatPrice(originalPrice) }}
        </span>
      </div>
      <div class="flex items-center space-x-2 mt-1">
        <p v-if="userTypeName && userTypeName !== 'Retail Customer'" class="text-sm text-green-600">
          {{ userTypeName }} Price
        </p>
        <p v-if="mrpDiscount > 0" class="text-sm text-green-600 font-medium">
          {{ mrpDiscount }}% off MRP
        </p>
        <p v-else-if="mrp && parseFloat(mrp) > 0 && parseFloat(mrp) <= displayPrice" class="text-xs text-gray-500">
          Special Price
        </p>
      </div>
    </div>

    <!-- Multi-Tier Price Display (for authenticated users with multiple pricing) -->
    <div v-else class="multi-tier-pricing">
      <!-- Current User's Price (Highlighted) -->
      <div class="current-price mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div class="flex items-center space-x-2">
              <span class="text-2xl font-bold text-blue-600">
                ₹{{ formatPrice(userPrice) }}
              </span>
              <!-- Always show MRP if available -->
              <span v-if="mrp && parseFloat(mrp) > 0" 
                    class="text-sm text-gray-500 line-through">
                MRP ₹{{ formatPrice(mrp) }}
              </span>
            </div>
            <span class="text-sm font-medium text-blue-800">
              Your {{ userTypeName }} Price
            </span>
          </div>
          <div class="text-right">
            <div v-if="savings > 0" class="text-sm text-green-600 font-medium">
              Save ₹{{ formatPrice(savings) }}
            </div>
            <div v-if="discountPercentage > 0" class="text-xs text-green-500">
              {{ discountPercentage }}% off
            </div>
            <div v-if="mrpDiscount > 0" class="text-xs text-green-500">
              {{ mrpDiscount }}% off MRP
            </div>
          </div>
        </div>
      </div>

      <!-- Other Pricing Tiers (Collapsible) -->
      <div class="other-prices">
        <button
          @click="showAllPrices = !showAllPrices"
          class="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1 mb-2"
        >
          <span>{{ showAllPrices ? 'Hide' : 'View' }} all pricing tiers</span>
          <svg
            :class="['w-4 h-4 transition-transform', { 'rotate-180': showAllPrices }]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <div v-if="showAllPrices" class="space-y-2">
          <div
            v-for="price in otherPrices"
            :key="price.user_type_id"
            class="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
          >
            <div>
              <span class="font-medium text-gray-800">{{ price.user_type_name }}</span>
              <div class="text-sm text-gray-600">{{ price.description }}</div>
            </div>
            <div class="text-right">
              <div class="font-bold text-gray-900">₹{{ formatPrice(price.price) }}</div>
              <div v-if="price.discount_percentage > 0" class="text-xs text-green-600">
                {{ price.discount_percentage }}% off
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upgrade Notice -->
      <div v-if="hasHigherTierPricing" class="upgrade-notice mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <p class="text-sm text-yellow-800 font-medium">
              Better pricing available for wholesale customers
            </p>
            <p class="text-xs text-yellow-700">
              Contact us to upgrade your account for better rates
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stock Status (if stock management is enabled) -->
    <div v-if="stockStatus" class="stock-status mt-3">
      <span
        :class="[
          'px-3 py-1 text-sm font-medium rounded-full',
          stockStatus.class
        ]"
      >
        {{ stockStatus.text }}
      </span>
    </div>

    <!-- Bulk Pricing Notice -->
    <div v-if="showBulkPricing" class="bulk-pricing mt-4 p-3 bg-gray-50 border rounded-lg">
      <h4 class="text-sm font-medium text-gray-800 mb-2">Bulk Pricing Available</h4>
      <p class="text-xs text-gray-600">
        Contact us for special pricing on large quantity orders (50+ units)
      </p>
    </div>

    <!-- Debug Info (temporary) -->
    <div v-if="false" class="debug-info mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs">
      <strong>Debug Info:</strong><br>
      MRP: {{ mrp }} ({{ typeof mrp }})<br>
      Display Price: {{ displayPrice }}<br>
      MRP Discount: {{ mrpDiscount }}%<br>
      MRP > Display Price: {{ mrp && parseFloat(mrp) > displayPrice }}<br>
      Formatted MRP: {{ mrp ? formatPrice(mrp) : 'N/A' }}
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'ProductPricing',
  props: {
    basePrice: {
      type: [Number, String],
      required: true
    },
    mrp: {
      type: [Number, String],
      default: null
    },
    prices: {
      type: Array,
      default: () => []
    },
    productId: {
      type: [Number, String],
      required: true
    },
    stock: {
      type: Number,
      default: null
    },
    showBulkPricing: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const authStore = useAuthStore()
    const showAllPrices = ref(false)

    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const userType = computed(() => authStore.user?.user_type || null)
    const userTypeId = computed(() => authStore.user?.user_type_id || null)
    const userTypeName = computed(() => userType.value?.name || 'Retail Customer')

    const displayPrice = computed(() => {
      if (isAuthenticated.value && userPrice.value) {
        return userPrice.value
      }
      return parseFloat(props.basePrice)
    })

    const userPrice = computed(() => {
      if (!isAuthenticated.value || !userTypeId.value) {
        return parseFloat(props.basePrice)
      }

      const userTypePricing = props.prices.find(p => p.user_type_id === userTypeId.value)
      return userTypePricing ? parseFloat(userTypePricing.price) : parseFloat(props.basePrice)
    })

    const originalPrice = computed(() => {
      if (isAuthenticated.value && userPrice.value < parseFloat(props.basePrice)) {
        return parseFloat(props.basePrice)
      }
      return null
    })

    const savings = computed(() => {
      if (originalPrice.value && userPrice.value < originalPrice.value) {
        return originalPrice.value - userPrice.value
      }
      return 0
    })

    const discountPercentage = computed(() => {
      if (userType.value?.discount_percentage) {
        return parseFloat(userType.value.discount_percentage)
      }
      if (originalPrice.value && savings.value > 0) {
        return Math.round((savings.value / originalPrice.value) * 100)
      }
      return 0
    })

    const mrpDiscount = computed(() => {
      if (!props.mrp || parseFloat(props.mrp) <= 0) return 0
      const mrpValue = parseFloat(props.mrp)
      const currentPrice = displayPrice.value
      if (currentPrice < mrpValue) {
        return Math.round(((mrpValue - currentPrice) / mrpValue) * 100)
      }
      return 0
    })

    const otherPrices = computed(() => {
      if (!isAuthenticated.value) return []
      
      return props.prices.filter(price => {
        return !userTypeId.value || price.user_type_id !== userTypeId.value
      }).map(price => ({
        ...price,
        discount_percentage: price.user_type?.discount_percentage || 0
      }))
    })

    const hasHigherTierPricing = computed(() => {
      if (!isAuthenticated.value || !userTypeId.value) return false
      
      const currentUserTypeId = userTypeId.value
      const betterPrices = props.prices.filter(price => 
        price.user_type_id !== currentUserTypeId && 
        parseFloat(price.price) < userPrice.value
      )
      
      return betterPrices.length > 0
    })

    const stockStatus = computed(() => {
      if (props.stock === null) return null
      
      if (props.stock <= 0) {
        return {
          text: 'Out of Stock',
          class: 'bg-red-100 text-red-800'
        }
      } else if (props.stock <= 5) {
        return {
          text: `Only ${props.stock} left`,
          class: 'bg-orange-100 text-orange-800'
        }
      } else if (props.stock <= 20) {
        return {
          text: 'In Stock',
          class: 'bg-green-100 text-green-800'
        }
      }
      
      return {
        text: 'In Stock',
        class: 'bg-green-100 text-green-800'
      }
    })

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-IN').format(parseFloat(price))
    }

    return {
      showAllPrices,
      isAuthenticated,
      userTypeName,
      userTypeId,
      displayPrice,
      userPrice,
      originalPrice,
      savings,
      discountPercentage,
      mrpDiscount,
      otherPrices,
      hasHigherTierPricing,
      stockStatus,
      formatPrice
    }
  }
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
