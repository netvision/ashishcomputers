<template>
  <AdminLayout>
    <div class="admin-orders bg-gray-50 min-h-screen">
      <!-- Header with gradient background -->
      <div class="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 shadow-lg rounded-lg mb-8 p-8 text-white">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold mb-2">Order Management</h1>
            <p class="text-blue-100 text-lg">Monitor and manage customer orders efficiently</p>
          </div>
          <div class="hidden md:block">
            <div class="bg-white bg-opacity-20 rounded-full p-4">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-gray-800 mb-1">{{ totalOrders }}</div>
              <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Orders</div>
            </div>
            <div class="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-full shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">Active</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-gray-800 mb-1">{{ pendingOrders }}</div>
              <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">Pending Orders</div>
            </div>
            <div class="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">Needs Action</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-gray-800 mb-1">{{ completedOrders }}</div>
              <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">Completed</div>
            </div>
            <div class="bg-gradient-to-br from-green-400 to-emerald-600 p-3 rounded-full shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Delivered</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-gray-800 mb-1">₹{{ totalRevenue }}</div>
              <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Revenue</div>
            </div>
            <div class="bg-gradient-to-br from-purple-400 to-indigo-600 p-3 rounded-full shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">Earnings</span>
          </div>
        </div>
      </div>

      <!-- Enhanced Filters Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div class="flex items-center mb-4">
          <svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-800">Filter Orders</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Search Orders</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search by order ID, customer..." 
                class="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Order Status</label>
            <select v-model="selectedStatus" class="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Date Range</label>
            <select v-model="dateRange" class="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Enhanced Orders Table -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center">
            <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2"></path>
            </svg>
            Orders Management
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Order Details</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Items</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-blue-50 transition-colors duration-200">
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span class="text-white font-bold text-sm">#{{ order.id }}</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-bold text-gray-900">#{{ order.order_number || order.id }}</div>
                      <div class="text-xs text-gray-500">Order ID</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-sm">{{ (order.customer_name || 'Guest').charAt(0).toUpperCase() }}</span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">{{ order.customer_name || 'Guest Customer' }}</div>
                      <div class="text-sm text-gray-500">{{ order.customer_email || 'N/A' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {{ order.items_count || order.items?.length || 0 }} items
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="text-sm font-bold text-gray-900 text-lg">₹{{ formatPrice(order.total_amount || order.total || 0) }}</div>
                  <div class="text-xs text-gray-500">Total Amount</div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <span :class="getStatusClass(order.status)" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                    <span class="w-2 h-2 rounded-full mr-2" :class="getStatusDotClass(order.status)"></span>
                    {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="text-sm text-gray-900 font-medium">{{ formatDate(order.ordered_at || order.created_at) }}</div>
                  <div class="text-xs text-gray-500">Order Date</div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap text-sm font-medium space-x-2">
                  <button 
                    @click="viewOrder(order)" 
                    class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    View
                  </button>
                  <select 
                    :value="order.status" 
                    @change="updateOrderStatus(order, $event.target.value)"
                    class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
        
        <div v-if="filteredOrders.length === 0" class="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div class="max-w-md mx-auto">
            <div class="bg-gradient-to-br from-gray-400 to-gray-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">No Orders Found</h3>
            <p class="text-gray-600 mb-6">
              {{ orders.length === 0 ? 'No orders have been placed yet.' : 'Try adjusting your search filters to find orders.' }}
            </p>
            <button 
              v-if="orders.length > 0" 
              @click="searchQuery = ''; selectedStatus = ''; dateRange = ''"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Order Details Modal -->
      <div v-if="selectedOrder" class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4" @click="closeOrderDetails">
        <div class="relative w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl" @click.stop>
          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 px-8 py-6 rounded-t-2xl">
            <div class="flex items-center justify-between text-white">
              <div class="flex items-center space-x-4">
                <div class="bg-white bg-opacity-20 p-3 rounded-xl">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold">Order Details</h3>
                  <p class="text-blue-100">Order #{{ selectedOrder.order_number || selectedOrder.id }}</p>
                </div>
              </div>
              <button 
                @click="closeOrderDetails"
                class="text-white hover:text-gray-200 transition-colors duration-200 p-2 hover:bg-white hover:bg-opacity-10 rounded-full"
              >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Content -->
          <div class="p-8 max-h-[70vh] overflow-y-auto">
            <!-- Customer & Order Information -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
                <div class="flex items-center mb-4">
                  <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <h4 class="text-xl font-bold text-gray-800 ml-3">Customer Information</h4>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <span class="font-semibold text-gray-700 w-20">Name:</span>
                    <span class="text-gray-900">{{ selectedOrder.customer_name || 'Guest Customer' }}</span>
                  </div>
                  <div class="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <span class="font-semibold text-gray-700 w-20">Email:</span>
                    <span class="text-gray-900">{{ selectedOrder.customer_email || 'N/A' }}</span>
                  </div>
                  <div class="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <span class="font-semibold text-gray-700 w-20">Phone:</span>
                    <span class="text-gray-900">{{ selectedOrder.customer_phone || 'N/A' }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
                <div class="flex items-center mb-4">
                  <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2"></path>
                    </svg>
                  </div>
                  <h4 class="text-xl font-bold text-gray-800 ml-3">Order Information</h4>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <span class="font-semibold text-gray-700 w-24">Status:</span>
                    <span :class="getStatusClass(selectedOrder.status)" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold">
                      <span class="w-2 h-2 rounded-full mr-2" :class="getStatusDotClass(selectedOrder.status)"></span>
                      {{ selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) }}
                    </span>
                  </div>
                  <div class="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <span class="font-semibold text-gray-700 w-24">Payment:</span>
                    <span class="text-gray-900">{{ selectedOrder.payment_status || 'Pending' }}</span>
                  </div>
                  <div class="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <span class="font-semibold text-gray-700 w-24">Method:</span>
                    <span class="text-gray-900">{{ selectedOrder.payment_method || 'COD' }}</span>
                  </div>
                  <div class="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <span class="font-semibold text-gray-700 w-24">Date:</span>
                    <span class="text-gray-900">{{ formatDate(selectedOrder.ordered_at || selectedOrder.created_at) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="mb-8">
              <div class="flex items-center mb-4">
                <div class="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-gray-800 ml-3">Shipping Address</h4>
              </div>
              <div class="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border border-purple-200">
                <p class="text-gray-800 text-lg">{{ selectedOrder.shipping_address || 'No shipping address provided' }}</p>
              </div>
            </div>

            <!-- Order Items -->
            <div class="mb-8">
              <div class="flex items-center mb-6">
                <div class="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-gray-800 ml-3">Order Items</h4>
                <div class="ml-auto bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {{ (selectedOrder.items || selectedOrder.orderItems || []).length }} items
                </div>
              </div>
              <div class="space-y-4">
                <div 
                  v-for="item in selectedOrder.items || selectedOrder.orderItems || []" 
                  :key="item.id"
                  class="flex items-center space-x-6 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200"
                >
                  <div class="relative">
                    <img
                      :src="item.product_image || item.product?.image || `https://picsum.photos/200/200?random=${item.product_id || item.product?.id}`"
                      :alt="item.product_name || item.product?.name"
                      class="w-20 h-20 object-cover rounded-xl shadow-md"
                    />
                    <div class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {{ item.quantity }}
                    </div>
                  </div>
                  <div class="flex-1">
                    <h5 class="font-bold text-lg text-gray-900 mb-1">{{ item.product_name || item.product?.name }}</h5>
                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">Qty: {{ item.quantity }}</span>
                      <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">₹{{ formatPrice(item.unit_price || item.price || 0) }} each</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl font-bold text-gray-900">₹{{ formatPrice((item.unit_price || item.price || 0) * item.quantity) }}</div>
                    <div class="text-sm text-gray-500">Total</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="border-t-2 border-gray-200 pt-8">
              <div class="flex items-center mb-6">
                <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-gray-800 ml-3">Order Summary</h4>
              </div>
              <div class="bg-gradient-to-br from-indigo-50 to-purple-100 p-6 rounded-xl border border-indigo-200 space-y-4">
                <div class="flex justify-between items-center py-2 border-b border-indigo-200">
                  <span class="text-gray-700 font-medium">Subtotal:</span>
                  <span class="text-lg font-semibold text-gray-900">₹{{ formatPrice((selectedOrder.total_amount || 0) - (selectedOrder.tax_amount || 0) - (selectedOrder.shipping_cost || 0)) }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-indigo-200">
                  <span class="text-gray-700 font-medium">Tax:</span>
                  <span class="text-lg font-semibold text-gray-900">₹{{ formatPrice(selectedOrder.tax_amount || 0) }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-indigo-200">
                  <span class="text-gray-700 font-medium">Shipping:</span>
                  <span class="text-lg font-semibold text-gray-900">₹{{ formatPrice(selectedOrder.shipping_cost || 0) }}</span>
                </div>
                <div v-if="selectedOrder.discount_amount > 0" class="flex justify-between items-center py-2 border-b border-indigo-200">
                  <span class="text-green-600 font-medium">Discount:</span>
                  <span class="text-lg font-semibold text-green-600">-₹{{ formatPrice(selectedOrder.discount_amount || 0) }}</span>
                </div>
                <div class="flex justify-between items-center py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg px-4 mt-4">
                  <span class="text-xl font-bold">Total Amount:</span>
                  <span class="text-2xl font-bold">₹{{ formatPrice(selectedOrder.total_amount || 0) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-gray-50 px-8 py-6 rounded-b-2xl border-t border-gray-200">
            <div class="flex justify-between items-center">
              <button
                @click="closeOrderDetails"
                class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                Close
              </button>
              <div class="flex items-center space-x-4">
                <span class="text-gray-700 font-medium">Update Status:</span>
                <select 
                  :value="selectedOrder.status" 
                  @change="updateOrderStatus(selectedOrder, $event.target.value); closeOrderDetails()"
                  class="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 border-none font-medium shadow-md hover:shadow-lg cursor-pointer"
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
        pending: 'bg-gradient-to-r from-yellow-200 to-orange-200 text-yellow-900 border border-yellow-300',
        confirmed: 'bg-gradient-to-r from-blue-200 to-indigo-200 text-blue-900 border border-blue-300',
        processing: 'bg-gradient-to-r from-blue-200 to-purple-200 text-blue-900 border border-blue-300',
        shipped: 'bg-gradient-to-r from-purple-200 to-pink-200 text-purple-900 border border-purple-300',
        delivered: 'bg-gradient-to-r from-green-200 to-emerald-200 text-green-900 border border-green-300',
        cancelled: 'bg-gradient-to-r from-red-200 to-rose-200 text-red-900 border border-red-300'
      }
      return statusClasses[status] || 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900 border border-gray-300'
    }

    const getStatusDotClass = (status) => {
      const dotClasses = {
        pending: 'bg-yellow-500',
        confirmed: 'bg-blue-500',
        processing: 'bg-blue-600',
        shipped: 'bg-purple-500',
        delivered: 'bg-green-500',
        cancelled: 'bg-red-500'
      }
      return dotClasses[status] || 'bg-gray-500'
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
      getStatusDotClass,
      viewOrder,
      closeOrderDetails,
      updateOrderStatus,
      fetchOrders
    }
  }
}
</script>
