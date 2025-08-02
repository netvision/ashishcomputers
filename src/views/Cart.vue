<template>
  <div>
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div v-if="cartStore.items.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
        <p class="mt-1 text-sm text-gray-500">Start shopping to add items to your cart.</p>
        <div class="mt-6">
          <router-link to="/products" class="btn-primary">
            Continue Shopping
          </router-link>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="card">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Cart Items</h2>
              
              <div class="space-y-4">
                <div 
                  v-for="item in cartStore.items" 
                  :key="item.id"
                  class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  <img 
                    :src="item.image" 
                    :alt="item.name"
                    class="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div class="flex-1">
                    <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
                    <p class="text-gray-600">${{ item.price.toFixed(2) }}</p>
                  </div>
                  
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span class="w-12 text-center">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  
                  <div class="text-right">
                    <p class="text-lg font-semibold text-gray-900">
                      ${{ (item.price * item.quantity).toFixed(2) }}
                    </p>
                    <button 
                      @click="removeItem(item.id)"
                      class="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="card">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-medium">${{ cartStore.total.toFixed(2) }}</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-gray-600">Shipping</span>
                  <span class="font-medium">
                    {{ cartStore.total >= 50 ? 'Free' : '$5.00' }}
                  </span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-gray-600">Tax</span>
                  <span class="font-medium">${{ (cartStore.total * 0.08).toFixed(2) }}</span>
                </div>
                
                <div class="border-t pt-3">
                  <div class="flex justify-between">
                    <span class="text-lg font-semibold text-gray-900">Total</span>
                    <span class="text-lg font-semibold text-gray-900">
                      ${{ totalWithTaxAndShipping.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 space-y-3">
                <router-link 
                  to="/checkout"
                  class="w-full btn-primary text-center block"
                >
                  Proceed to Checkout
                </router-link>
                
                <button 
                  @click="clearCart"
                  class="w-full btn-secondary"
                >
                  Clear Cart
                </button>
                
                <router-link 
                  to="/products"
                  class="w-full btn-secondary text-center block"
                >
                  Continue Shopping
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const totalWithTaxAndShipping = computed(() => {
  const subtotal = cartStore.total
  const tax = subtotal * 0.08
  const shipping = subtotal >= 50 ? 0 : 5
  return subtotal + tax + shipping
})

const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, quantity)
}

const removeItem = (productId) => {
  cartStore.removeItem(productId)
}

const clearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clearCart()
  }
}
</script> 