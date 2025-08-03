<template>
  <div class="checkout-page">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Checkout</h1>
        <p class="text-gray-600 mt-2">Complete your order</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Order Form -->
        <div class="space-y-6">
          <!-- Customer Information -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Customer Information</h2>
            <form @submit.prevent="submitOrder" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    v-model="orderForm.firstName"
                    type="text"
                    id="firstName"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    v-model="orderForm.lastName"
                    type="text"
                    id="lastName"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="orderForm.email"
                  type="email"
                  id="email"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  v-model="orderForm.phone"
                  type="tel"
                  id="phone"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>

          <!-- Shipping Address -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Shipping Address</h2>
            <div class="space-y-4">
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <input
                  v-model="orderForm.address"
                  type="text"
                  id="address"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                  <input
                    v-model="orderForm.city"
                    type="text"
                    id="city"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                  <input
                    v-model="orderForm.state"
                    type="text"
                    id="state"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label for="zipCode" class="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <input
                    v-model="orderForm.zipCode"
                    type="text"
                    id="zipCode"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
            <div class="space-y-3">
              <label class="flex items-center">
                <input
                  v-model="orderForm.paymentMethod"
                  type="radio"
                  value="cod"
                  class="mr-3"
                />
                <span>Cash on Delivery</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="orderForm.paymentMethod"
                  type="radio"
                  value="online"
                  class="mr-3"
                />
                <span>Online Payment (Coming Soon)</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="space-y-6">
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            
            <!-- Cart Items -->
            <div class="space-y-4 mb-6">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex items-center space-x-4"
              >
                <img
                  :src="item.image || `https://picsum.photos/200/200?random=${item.id}`"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded"
                />
                <div class="flex-1">
                  <h3 class="font-medium">{{ item.name }}</h3>
                  <p class="text-gray-600">Qty: {{ item.quantity }}</p>
                </div>
                <div class="font-medium">
                  ₹{{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Order Totals -->
            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping:</span>
                <span>₹{{ shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{{ total.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Place Order Button -->
            <button
              @click="submitOrder"
              :disabled="!isFormValid || isSubmitting"
              class="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isSubmitting">Processing...</span>
              <span v-else>Place Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { orderApi } from '@/services/api'
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'Checkout',
  setup() {
    const router = useRouter()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const { success, error } = useNotification()
    
    const isSubmitting = ref(false)
    
    // Order form data
    const orderForm = reactive({
      firstName: '',
      lastName: '',
      email: authStore.user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      paymentMethod: 'cod'
    })

    // Computed properties
    const cartItems = computed(() => cartStore.items)
    const subtotal = computed(() => cartStore.total)
    const shipping = computed(() => subtotal.value > 1000 ? 0 : 50) // Free shipping above ₹1000
    const total = computed(() => subtotal.value + shipping.value)
    
    const isFormValid = computed(() => {
      return orderForm.firstName && 
             orderForm.lastName && 
             orderForm.email && 
             orderForm.phone && 
             orderForm.address && 
             orderForm.city && 
             orderForm.state && 
             orderForm.zipCode && 
             orderForm.paymentMethod &&
             cartItems.value.length > 0
    })

    // Methods
    const submitOrder = async () => {
      if (!isFormValid.value) {
        error('Please fill in all required fields')
        return
      }

      isSubmitting.value = true

      try {
        // Prepare order data
        const orderData = {
          customer_name: `${orderForm.firstName} ${orderForm.lastName}`,
          customer_email: orderForm.email,
          customer_phone: orderForm.phone,
          billing_address: orderForm.address,
          billing_city: orderForm.city,
          billing_state: orderForm.state,
          billing_zip: orderForm.zipCode,
          shipping_address: orderForm.address, // Same as billing for now
          shipping_city: orderForm.city,
          shipping_state: orderForm.state,
          shipping_zip: orderForm.zipCode,
          payment_method: orderForm.paymentMethod,
          subtotal: subtotal.value,
          shipping_amount: shipping.value,
          total_amount: total.value,
          items: cartItems.value.map(item => ({
            product_id: item.id,
            product_name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        }

        const response = await orderApi.createOrder(orderData)
        
        if (response.data.success) {
          // Clear cart after successful order
          cartStore.clearCart()
          
          const orderNumber = response.data.data.order_number || response.data.data.id
          
          // Show success message
          if (authStore.isAuthenticated) {
            success(`Order #${orderNumber} placed successfully!`)
          } else {
            success(`Order #${orderNumber} placed successfully! Please create an account to track your order.`)
          }
          
          console.log('Order created successfully, redirecting to orders page')
          
          // Redirect to orders page if authenticated, otherwise to home/login
          if (authStore.isAuthenticated) {
            router.push('/orders')
          } else {
            // For guest users, redirect to home with a message to login to track orders
            router.push('/')
          }
        } else {
          throw new Error(response.data.message || 'Failed to place order')
        }
        
      } catch (err) {
        error('Failed to place order: ' + (err.response?.data?.message || err.message))
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      orderForm,
      cartItems,
      subtotal,
      shipping,
      total,
      isFormValid,
      isSubmitting,
      submitOrder
    }
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
