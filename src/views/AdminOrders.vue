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
                  <div class="text-sm font-medium text-gray-900">#{{ order.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.customer_name }}</div>
                  <div class="text-sm text-gray-500">{{ order.customer_email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.items_count }} items</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">₹{{ formatPrice(order.total) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(order.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(order.created_at) }}</div>
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
    </div>
  </AdminLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import api from '@/services/api'

export default {
  name: 'AdminOrders',
  components: {
    AdminLayout
  },
  setup() {
    const orders = ref([])
    const loading = ref(true)
    
    const searchQuery = ref('')
    const selectedStatus = ref('')
    const dateRange = ref('')

    // Mock data for now - replace with actual API calls
    const mockOrders = [
      {
        id: 1001,
        customer_name: 'John Doe',
        customer_email: 'john@example.com',
        items_count: 3,
        total: 2599.97,
        status: 'pending',
        created_at: '2025-01-30T10:30:00Z'
      },
      {
        id: 1002,
        customer_name: 'Jane Smith',
        customer_email: 'jane@example.com',
        items_count: 1,
        total: 1299.99,
        status: 'shipped',
        created_at: '2025-01-29T14:20:00Z'
      },
      {
        id: 1003,
        customer_name: 'Bob Johnson',
        customer_email: 'bob@example.com',
        items_count: 2,
        total: 179.98,
        status: 'delivered',
        created_at: '2025-01-28T09:15:00Z'
      }
    ]

    const filteredOrders = computed(() => {
      let filtered = orders.value

      // Search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(order =>
          order.id.toString().includes(query) ||
          order.customer_name.toLowerCase().includes(query) ||
          order.customer_email.toLowerCase().includes(query)
        )
      }

      // Status filter
      if (selectedStatus.value) {
        filtered = filtered.filter(order => order.status === selectedStatus.value)
      }

      // Date range filter
      if (dateRange.value) {
        const now = new Date()
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.created_at)
          switch (dateRange.value) {
            case 'today':
              return orderDate.toDateString() === now.toDateString()
            case 'week':
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
              return orderDate >= weekAgo
            case 'month':
              const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
              return orderDate >= monthAgo
            default:
              return true
          }
        })
      }

      return filtered
    })

    const totalOrders = computed(() => orders.value.length)
    const pendingOrders = computed(() => orders.value.filter(o => o.status === 'pending').length)
    const completedOrders = computed(() => orders.value.filter(o => o.status === 'delivered').length)
    const totalRevenue = computed(() => {
      return orders.value
        .filter(o => o.status === 'delivered')
        .reduce((sum, order) => sum + order.total, 0)
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
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    }

    const fetchOrders = async () => {
      try {
        // TODO: Replace with actual API call when orders endpoint is ready
        // const response = await api.get('/orders')
        // orders.value = response.data.data || response.data || []
        
        // For now, use mock data
        orders.value = mockOrders
      } catch (error) {
        console.error('Error fetching orders:', error)
        orders.value = mockOrders // Fallback to mock data
      }
    }

    const viewOrder = (order) => {
      // TODO: Implement order detail view
      alert(`View order #${order.id} details`)
    }

    const updateOrderStatus = async (order, newStatus) => {
      try {
        // TODO: Replace with actual API call
        // await api.put(`/orders/${order.id}`, { status: newStatus })
        
        // For now, update locally
        order.status = newStatus
        console.log(`Updated order #${order.id} status to ${newStatus}`)
      } catch (error) {
        console.error('Error updating order status:', error)
        alert('Error updating order status. Please try again.')
      }
    }

    onMounted(async () => {
      loading.value = true
      await fetchOrders()
      loading.value = false
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
      formatPrice,
      formatDate,
      getStatusClass,
      viewOrder,
      updateOrderStatus
    }
  }
}
</script>
