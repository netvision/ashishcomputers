<template>
  <div class="orders-page">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Orders</h1>
        <p class="text-gray-600 mt-2">View and track your order history</p>
      </div>

      <!-- Orders List -->
      <div v-if="loading" class="text-center py-8">
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
                  <span class="text-sm font-mono text-gray-900">{{ order.id }}</span>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-500">Date:</span>
                  <span class="text-sm text-gray-900">{{ formatDate(order.created_at) }}</span>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-500">Total:</span>
                  <span class="text-sm font-semibold text-gray-900">₹{{ order.total.toFixed(2) }}</span>
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
                  :src="item.product.image || `https://picsum.photos/200/200?random=${item.product.id}`"
                  :alt="item.product.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ item.product.name }}</h4>
                  <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
                  <p class="text-sm text-gray-600">Price: ₹{{ item.price.toFixed(2) }} each</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">₹{{ (item.price * item.quantity).toFixed(2) }}</p>
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
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'Orders',
  setup() {
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    
    const loading = ref(true)
    const orders = ref([])

    // Mock data for demonstration
    const mockOrders = [
      {
        id: 'ORD-2025-001',
        created_at: '2025-07-30T10:30:00Z',
        status: 'delivered',
        total: 2499.00,
        tracking_number: 'TRK123456789',
        items: [
          {
            id: 1,
            quantity: 1,
            price: 2499.00,
            product: {
              id: 1,
              name: 'Gaming Laptop - ASUS ROG',
              image: 'https://picsum.photos/400/300?random=1'
            }
          }
        ]
      },
      {
        id: 'ORD-2025-002',
        created_at: '2025-07-28T15:45:00Z',
        status: 'shipped',
        total: 899.00,
        tracking_number: 'TRK987654321',
        items: [
          {
            id: 2,
            quantity: 2,
            price: 449.50,
            product: {
              id: 2,
              name: 'Wireless Mouse',
              image: 'https://picsum.photos/400/300?random=2'
            }
          }
        ]
      },
      {
        id: 'ORD-2025-003',
        created_at: '2025-07-25T09:15:00Z',
        status: 'pending',
        total: 1599.00,
        items: [
          {
            id: 3,
            quantity: 1,
            price: 1599.00,
            product: {
              id: 3,
              name: 'Mechanical Keyboard',
              image: 'https://picsum.photos/400/300?random=3'
            }
          }
        ]
      }
    ]

    const fetchOrders = async () => {
      try {
        loading.value = true
        
        // TODO: Replace with actual API call
        // const response = await api.get('/orders')
        // orders.value = response.data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        orders.value = mockOrders
        
      } catch (error) {
        console.error('Error fetching orders:', error)
        orders.value = []
      } finally {
        loading.value = false
      }
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
      // TODO: Implement order details modal or navigation
      alert(`Viewing details for order ${order.id}`)
    }

    const cancelOrder = async (order) => {
      if (confirm(`Are you sure you want to cancel order ${order.id}?`)) {
        try {
          // TODO: Implement cancel order API call
          console.log('Cancelling order:', order.id)
          
          // Update order status locally
          const orderIndex = orders.value.findIndex(o => o.id === order.id)
          if (orderIndex !== -1) {
            orders.value[orderIndex].status = 'cancelled'
          }
          
          alert('Order cancelled successfully')
        } catch (error) {
          console.error('Error cancelling order:', error)
          alert('Failed to cancel order. Please try again.')
        }
      }
    }

    const reorder = (order) => {
      // Add all items from the order to cart
      order.items.forEach(item => {
        cartStore.addToCart({
          id: item.product.id,
          name: item.product.name,
          price: item.price,
          image: item.product.image
        }, item.quantity)
      })
      
      alert('Items added to cart!')
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      loading,
      orders,
      formatDate,
      getStatusClass,
      getStatusText,
      canCancelOrder,
      canReorder,
      viewOrderDetails,
      cancelOrder,
      reorder
    }
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
