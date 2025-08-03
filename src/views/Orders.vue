<template>
  <div class="orders-page">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Orders</h1>
        <p class="text-gray-600 mt-2">View and track your order history</p>
      </div>

      <!-- Orders List -->
      <div v-if="!authStore.isAut    const viewOrder = (order) => {
      selectedOrder.value = order
    }icated" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-24 w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">Please Login</h3>
        <p class="text-gray-600 mb-6">You need to login to view your orders.</p>
        <router-link
          to="/login"
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </router-link>
      </div>

      <div v-else-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading your orders...</p>
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-24 w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
        <p class="text-gray-600 mb-6">When you place orders, they will appear here.</p>
        <router-link
          to="/products"
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </router-link>
      </div>

      <div v-else class="space-y-6">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <!-- Order Header -->
          <div class="bg-gray-50 px-6 py-4 border-b">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <div class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-6">
                <div>
                  <span class="text-sm font-medium text-gray-500">Order #</span>
                  <span class="text-sm font-mono text-gray-900">{{ order.order_number || order.id }}</span>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-500">Date:</span>
                  <span class="text-sm text-gray-900">{{ formatDate(order.ordered_at || order.created_at) }}</span>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-500">Total:</span>
                  <span class="text-sm font-semibold text-gray-900">₹{{ formatPrice(order.total_amount || order.total || 0) }}</span>
                </div>
              </div>
              <div class="mt-2 md:mt-0">
                <span
                  :class="getStatusClass(order.status)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ getStatusText(order.status) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="px-6 py-4">
            <div class="space-y-4">
              <div
                v-for="item in order.items"
                :key="item.id"
                class="flex items-center space-x-4"
              >
                <img
                  :src="item.product_image || item.product?.image || `https://picsum.photos/200/200?random=${item.product_id || item.product?.id}`"
                  :alt="item.product_name || item.product?.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ item.product_name || item.product?.name }}</h4>
                  <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
                  <p class="text-sm text-gray-600">Price: ₹{{ formatPrice(item.unit_price || item.price || 0) }} each</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">₹{{ formatPrice((item.unit_price || item.price || 0) * item.quantity) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Actions -->
          <div class="bg-gray-50 px-6 py-4 border-t">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <div class="text-sm text-gray-600">
                <span v-if="order.tracking_number">
                  Tracking: {{ order.tracking_number }}
                </span>
              </div>
              <div class="flex space-x-3">
                <button
                  @click="viewOrderDetails(order)"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Details
                </button>
                <button
                  v-if="canCancelOrder(order)"
                  @click="cancelOrder(order)"
                  class="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Cancel Order
                </button>
                <button
                  v-if="canReorder(order)"
                  @click="reorder(order)"
                  class="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Reorder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Details Modal -->
      <div v-if="selectedOrder" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeOrderDetails">
        <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white" @click.stop>
          <!-- Modal Header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-2xl font-bold text-gray-900">
              Order Details #{{ selectedOrder.order_number || selectedOrder.id }}
            </h3>
            <button 
              @click="closeOrderDetails"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="mt-4 max-h-96 overflow-y-auto">
            <!-- Customer Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-lg font-semibold text-gray-900 mb-3">Customer Information</h4>
                <div class="space-y-2">
                  <p><span class="font-medium">Name:</span> {{ selectedOrder.customer_name || 'N/A' }}</p>
                  <p><span class="font-medium">Email:</span> {{ selectedOrder.customer_email || 'N/A' }}</p>
                  <p><span class="font-medium">Phone:</span> {{ selectedOrder.customer_phone || 'N/A' }}</p>
                </div>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-lg font-semibold text-gray-900 mb-3">Order Information</h4>
                <div class="space-y-2">
                  <p><span class="font-medium">Status:</span> 
                    <span :class="getStatusClass(selectedOrder.status)" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ml-2">
                      {{ getStatusText(selectedOrder.status) }}
                    </span>
                  </p>
                  <p><span class="font-medium">Payment Status:</span> {{ selectedOrder.payment_status || 'N/A' }}</p>
                  <p><span class="font-medium">Payment Method:</span> {{ selectedOrder.payment_method || 'N/A' }}</p>
                  <p><span class="font-medium">Order Date:</span> {{ formatDate(selectedOrder.ordered_at || selectedOrder.created_at) }}</p>
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-3">Shipping Address</h4>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p>{{ selectedOrder.shipping_address || 'No shipping address provided' }}</p>
              </div>
            </div>

            <!-- Order Items -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-3">Order Items</h4>
              <div class="space-y-4">
                <div 
                  v-for="item in selectedOrder.items" 
                  :key="item.id"
                  class="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                >
                  <img
                    :src="item.product_image || item.product?.image || `https://picsum.photos/200/200?random=${item.product_id || item.product?.id}`"
                    :alt="item.product_name || item.product?.name"
                    class="w-16 h-16 object-cover rounded-lg"
                  />
                  <div class="flex-1">
                    <h5 class="font-medium text-gray-900">{{ item.product_name || item.product?.name }}</h5>
                    <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
                    <p class="text-sm text-gray-600">Unit Price: ₹{{ formatPrice(item.unit_price || item.price || 0) }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-medium text-gray-900">₹{{ formatPrice((item.unit_price || item.price || 0) * item.quantity) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="border-t pt-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-3">Order Summary</h4>
              <div class="bg-gray-50 p-4 rounded-lg space-y-2">
                <div class="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{{ formatPrice((selectedOrder.total_amount || 0) - (selectedOrder.tax_amount || 0) - (selectedOrder.shipping_cost || 0)) }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Tax:</span>
                  <span>₹{{ formatPrice(selectedOrder.tax_amount || 0) }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Shipping:</span>
                  <span>₹{{ formatPrice(selectedOrder.shipping_cost || 0) }}</span>
                </div>
                <div v-if="selectedOrder.discount_amount > 0" class="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-₹{{ formatPrice(selectedOrder.discount_amount || 0) }}</span>
                </div>
                <div class="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>₹{{ formatPrice(selectedOrder.total_amount || 0) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end space-x-3 pt-4 border-t mt-6">
            <button
              @click="closeOrderDetails"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { orderApi } from '@/services/api'
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'Orders',
  setup() {
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    const { success, error } = useNotification()
    
    const loading = ref(true)
    const orders = ref([])
    const selectedOrder = ref(null)

    const fetchOrders = async () => {
      try {
        loading.value = true
        
        // Check if user is authenticated
        if (!authStore.isAuthenticated) {
          error('Please login to view your orders')
          return
        }
        
        const response = await orderApi.getOrders()
        
        if (response.data.success) {
          orders.value = response.data.data.orders || []
        } else {
          throw new Error(response.data.message || 'Failed to fetch orders')
        }
        
      } catch (err) {
        console.error('Error fetching orders:', err)
        
        // Handle authentication errors
        if (err.response?.status === 401) {
          error('Please login to view your orders')
          authStore.logout()
          return
        }
        
        error('Failed to load orders: ' + (err.response?.data?.message || err.message))
        orders.value = []
      } finally {
        loading.value = false
      }
    }

    const formatPrice = (value) => {
      const num = parseFloat(value) || 0
      return num.toFixed(2)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const getStatusClass = (status) => {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }

    const getStatusText = (status) => {
      const texts = {
        pending: 'Pending',
        confirmed: 'Confirmed',
        shipped: 'Shipped',
        delivered: 'Delivered',
        cancelled: 'Cancelled'
      }
      return texts[status] || 'Unknown'
    }

    const canCancelOrder = (order) => {
      return ['pending', 'confirmed'].includes(order.status)
    }

    const canReorder = (order) => {
      return ['delivered', 'cancelled'].includes(order.status)
    }

    const viewOrderDetails = (order) => {
      selectedOrder.value = order
    }

    const closeOrderDetails = () => {
      selectedOrder.value = null
    }

    const cancelOrder = async (order) => {
      if (confirm(`Are you sure you want to cancel order #${order.order_number || order.id}?`)) {
        try {
          // Check authentication before making request
          if (!authStore.isAuthenticated) {
            error('Please login to cancel orders')
            return
          }
          
          const response = await orderApi.cancelOrder(order.id)
          
          if (response.data.success) {
            // Update order status locally
            const orderIndex = orders.value.findIndex(o => o.id === order.id)
            if (orderIndex !== -1) {
              orders.value[orderIndex].status = 'cancelled'
            }
            success('Order cancelled successfully')
          } else {
            throw new Error(response.data.message || 'Failed to cancel order')
          }
        } catch (err) {
          // Handle authentication errors
          if (err.response?.status === 401) {
            error('Please login to cancel orders')
            authStore.logout()
            return
          }
          
          error('Failed to cancel order: ' + (err.response?.data?.message || err.message))
        }
      }
    }

    const reorder = (order) => {
      // Add all items from the order to cart
      if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
          cartStore.addItem({
            id: item.product_id || item.product?.id,
            name: item.product_name || item.product?.name,
            price: item.unit_price || item.price,
            image: item.product_image || item.product?.image
          }, item.quantity)
        })
        
        success('Items added to cart!')
      }
    }

    onMounted(() => {
      // Only fetch orders if user is authenticated
      if (authStore.isAuthenticated) {
        fetchOrders()
      } else {
        loading.value = false
        error('Please login to view your orders')
      }
    })

    return {
      authStore,
      loading,
      orders,
      selectedOrder,
      formatPrice,
      formatDate,
      getStatusClass,
      getStatusText,
      canCancelOrder,
      canReorder,
      viewOrderDetails,
      closeOrderDetails,
      cancelOrder,
      reorder
    }
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
