<template>
  <AdminLayout>
    <div class="admin-orders">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Orders</h1>
          <p class="text-gray-600 mt-1">Manage customer orders and fulfillment</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <div class="text-2xl font-bold text-gray-900">{{ totalOrders }}</div>
              <div class="text-sm text-gray-600">Total Orders</div>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <div class="text-2xl font-bold text-gray-900">{{ pendingOrders }}</div>
              <div class="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="ml-4">
              <div class="text-2xl font-bold text-gray-900">{{ completedOrders }}</div>
              <div class="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <div class="text-2xl font-bold text-gray-900">₹{{ totalRevenue }}</div>
              <div class="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search orders..." 
              class="input-field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select v-model="selectedStatus" class="input-field">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select v-model="dateRange" class="input-field">
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in filteredOrders" :key="order.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#{{ order.order_number || order.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.customer_name }}</div>
                  <div class="text-sm text-gray-500">{{ order.customer_email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.items_count || order.items?.length || 0 }} items</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">₹{{ formatPrice(order.total_amount || order.total || 0) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(order.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(order.ordered_at || order.created_at) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="viewOrder(order)" class="text-blue-600 hover:text-blue-900 mr-3">
                    View
                  </button>
                  <select 
                    :value="order.status" 
                    @change="updateOrderStatus(order, $event.target.value)"
                    class="text-sm border-gray-300 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-if="filteredOrders.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ orders.length === 0 ? 'No orders have been placed yet.' : 'Try adjusting your search filters.' }}
          </p>
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
                      {{ selectedOrder.status }}
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
                  v-for="item in selectedOrder.items || selectedOrder.orderItems || []" 
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
            <select 
              :value="selectedOrder.status" 
              @change="updateOrderStatus(selectedOrder, $event.target.value); closeOrderDetails()"
              class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors border-none"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { orderApi } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'AdminOrders',
  components: {
    AdminLayout
  },
  setup() {
    const authStore = useAuthStore()
    const { success, error } = useNotification()
    const orders = ref([])
    const loading = ref(true)
    
    const searchQuery = ref('')
    const selectedStatus = ref('')
    const dateRange = ref('')

    const fetchOrders = async () => {
      try {
        loading.value = true
        const params = {}
        
        if (selectedStatus.value) {
          params.status = selectedStatus.value
        }
        
        if (dateRange.value) {
          const now = new Date()
          switch (dateRange.value) {
            case 'today':
              params.date_from = now.toISOString().split('T')[0]
              break
            case 'week':
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
              params.date_from = weekAgo.toISOString().split('T')[0]
              break
            case 'month':
              const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
              params.date_from = monthAgo.toISOString().split('T')[0]
              break
          }
        }

        const response = await orderApi.getOrders(params)
        
        if (response.data.success) {
          orders.value = response.data.data.orders || []
        } else {
          throw new Error(response.data.message || 'Failed to fetch orders')
        }
      } catch (err) {
        error('Failed to load orders: ' + (err.response?.data?.message || err.message))
        orders.value = []
      } finally {
        loading.value = false
      }
    }

    const filteredOrders = computed(() => {
      let filtered = orders.value

      // Search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(order =>
          order.order_number?.toLowerCase().includes(query) ||
          order.id.toString().includes(query) ||
          order.customer_name.toLowerCase().includes(query) ||
          order.customer_email.toLowerCase().includes(query)
        )
      }

      // Status filter
      if (selectedStatus.value) {
        filtered = filtered.filter(order => order.status === selectedStatus.value)
      }

      // Date range filter is handled in fetchOrders()

      return filtered
    })

    const totalOrders = computed(() => orders.value.length)
    const pendingOrders = computed(() => orders.value.filter(o => o.status === 'pending').length)
    const completedOrders = computed(() => orders.value.filter(o => o.status === 'delivered').length)
    const totalRevenue = computed(() => {
      return orders.value
        .filter(o => o.status === 'delivered')
        .reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0)
        .toFixed(2)
    })

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-IN').format(parseFloat(price))
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const getStatusClass = (status) => {
      const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    }

    const selectedOrder = ref(null)

    const viewOrder = (order) => {
      selectedOrder.value = order
    }

    const closeOrderDetails = () => {
      selectedOrder.value = null
    }

    const updateOrderStatus = async (order, newStatus) => {
      try {
        const response = await orderApi.updateOrderStatus(order.id, newStatus)
        
        if (response.data.success) {
          // Update local order status
          const orderIndex = orders.value.findIndex(o => o.id === order.id)
          if (orderIndex !== -1) {
            orders.value[orderIndex].status = newStatus
          }
          success(`Order #${order.order_number || order.id} status updated to ${newStatus}`)
        } else {
          throw new Error(response.data.message || 'Failed to update order status')
        }
      } catch (err) {
        error('Failed to update order status: ' + (err.response?.data?.message || err.message))
      }
    }

    onMounted(async () => {
      await fetchOrders()
    })

    return {
      orders,
      loading,
      searchQuery,
      selectedStatus,
      dateRange,
      filteredOrders,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      selectedOrder,
      formatPrice,
      formatDate,
      getStatusClass,
      viewOrder,
      closeOrderDetails,
      updateOrderStatus,
      fetchOrders
    }
  }
}
</script>
