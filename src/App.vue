<template>
  <div id="app">
    <!-- Only show main layout for non-admin routes -->
    <div v-if="!isAdminRoute" class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <router-link to="/" class="flex-shrink-0 flex items-center">
                <h1 class="text-xl font-bold text-primary-600">Ashish Computers</h1>
              </router-link>
            </div>
            
            <div class="flex items-center space-x-4">
            <router-link 
              to="/" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </router-link>
            <router-link 
              to="/products" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </router-link>
            <router-link 
              to="/cart" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium relative"
            >
              Cart
              <span 
                v-if="cartStore.itemCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ cartStore.itemCount }}
              </span>
            </router-link>
            
            <div v-if="authStore.isAuthenticated" class="flex items-center space-x-4">
              <router-link 
                v-if="authStore.isAdmin"
                to="/admin" 
                class="text-purple-600 hover:text-purple-700 px-3 py-2 rounded-md text-sm font-medium bg-purple-50 hover:bg-purple-100"
              >
                Admin Panel
              </router-link>
              <router-link 
                to="/profile" 
                class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </router-link>
              <button 
                @click="logout" 
                class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
            <div v-else class="flex items-center space-x-4">
              <router-link 
                to="/login" 
                class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </router-link>
              <router-link 
                to="/register" 
                class="btn-primary text-sm"
              >
                Register
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content for non-admin routes -->
    <main v-if="!isAdminRoute" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view />
    </main>

    <!-- Footer only for non-admin routes -->
    <footer v-if="!isAdminRoute" class="bg-white border-t border-gray-200 mt-12">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">About</h3>
            <p class="mt-4 text-base text-gray-500">
              Ashish Computers is your trusted source for quality computer products and accessories.
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Contact Us</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">FAQ</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Shipping</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Privacy Policy</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
            <ul class="mt-4 space-y-4">
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Facebook</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Twitter</a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-500 hover:text-gray-900">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-8">
          <p class="text-base text-gray-400 text-center">
            &copy; 2024 Ashish Computers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>

    <!-- Admin routes render independently without main layout -->
    <router-view v-if="isAdminRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()

// Check if current route is an admin route
const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})

const logout = () => {
  authStore.logout()
}
</script> 