<template>
  <div id="app">
    <!-- Only show main layout for non-admin routes -->
    <div v-if="!isAdminRoute" class="min-h-screen bg-gray-50">
      <!-- Enhanced Professional Navigation Bar -->
      <nav class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-20">
            <!-- Logo Section -->
            <div class="flex items-center">
              <router-link to="/" class="flex-shrink-0 flex items-center group">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                      Ashish Computers
                    </h1>
                    <p class="text-xs text-gray-500 -mt-1">Technology Solutions</p>
                  </div>
                </div>
              </router-link>
            </div>
            
            <!-- Navigation Links -->
            <div class="hidden md:flex items-center space-x-2">
              <router-link 
                to="/" 
                class="nav-link-professional group"
                :class="{ 'nav-link-active': $route.path === '/' }"
              >
                <svg class="w-4 h-4 mr-2 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Home
              </router-link>
              <router-link 
                to="/products" 
                class="nav-link-professional group"
                :class="{ 'nav-link-active': $route.path === '/products' }"
              >
                <svg class="w-4 h-4 mr-2 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                Products
              </router-link>
              <router-link 
                to="/cart" 
                class="nav-link-professional group relative"
                :class="{ 'nav-link-active': $route.path === '/cart' }"
              >
                <svg class="w-4 h-4 mr-2 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                </svg>
                Cart
                <span 
                  v-if="cartStore.itemCount > 0"
                  class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse"
                >
                  {{ cartStore.itemCount }}
                </span>
              </router-link>
            </div>
            
            <!-- User Actions -->
            <div class="flex items-center space-x-3">
              <div v-if="authStore.isAuthenticated" class="flex items-center space-x-3">
                <router-link 
                  v-if="authStore.isAdmin"
                  to="/admin" 
                  class="admin-button-professional"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Admin Panel
                </router-link>
                <router-link 
                  to="/profile" 
                  class="nav-link-professional group"
                  :class="{ 'nav-link-active': $route.path === '/profile' }"
                >
                  <svg class="w-4 h-4 mr-2 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Profile
                </router-link>
                <button 
                  @click="logout" 
                  class="logout-button-professional"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Logout
                </button>
              </div>
              <div v-else class="flex items-center space-x-3">
                <router-link 
                  to="/login" 
                  class="login-button-professional"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Login
                </router-link>
                <router-link 
                  to="/register" 
                  class="register-button-professional"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                  </svg>
                  Register
                </router-link>
              </div>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
              <button 
                @click="mobileMenuOpen = !mobileMenuOpen"
                class="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200"
              >
                <svg class="h-6 w-6" :class="{'hidden': mobileMenuOpen, 'block': !mobileMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                <svg class="h-6 w-6" :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile menu -->
          <div :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen}" class="md:hidden border-t border-gray-200 bg-white">
            <div class="pt-2 pb-3 space-y-1">
              <router-link 
                to="/" 
                class="mobile-nav-link"
                @click="mobileMenuOpen = false"
              >
                Home
              </router-link>
              <router-link 
                to="/products" 
                class="mobile-nav-link"
                @click="mobileMenuOpen = false"
              >
                Products
              </router-link>
              <router-link 
                to="/cart" 
                class="mobile-nav-link relative"
                @click="mobileMenuOpen = false"
              >
                Cart
                <span 
                  v-if="cartStore.itemCount > 0"
                  class="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {{ cartStore.itemCount }}
                </span>
              </router-link>
              
              <div v-if="authStore.isAuthenticated" class="border-t border-gray-200 pt-2 mt-2">
                <router-link 
                  v-if="authStore.isAdmin"
                  to="/admin" 
                  class="mobile-nav-link text-purple-600"
                  @click="mobileMenuOpen = false"
                >
                  Admin Panel
                </router-link>
                <router-link 
                  to="/profile" 
                  class="mobile-nav-link"
                  @click="mobileMenuOpen = false"
                >
                  Profile
                </router-link>
                <button 
                  @click="logout; mobileMenuOpen = false" 
                  class="mobile-nav-link text-red-600 w-full text-left"
                >
                  Logout
                </button>
              </div>
              <div v-else class="border-t border-gray-200 pt-2 mt-2">
                <router-link 
                  to="/login" 
                  class="mobile-nav-link"
                  @click="mobileMenuOpen = false"
                >
                  Login
                </router-link>
                <router-link 
                  to="/register" 
                  class="mobile-nav-link text-indigo-600"
                  @click="mobileMenuOpen = false"
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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const mobileMenuOpen = ref(false)

// Check if current route is an admin route
const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})

const logout = () => {
  authStore.logout()
  mobileMenuOpen.value = false
}
</script>

<style scoped>
/* Professional Navigation Styles */
.nav-link-professional {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  position: relative;
  transition: all 0.2s ease;
}

.nav-link-professional:hover {
  color: #4F46E5;
  background-color: #EEF2FF;
}

.nav-link-active {
  color: #4F46E5;
  background-color: #EEF2FF;
}

.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 2px;
  background: linear-gradient(to right, #4F46E5, #2563EB);
}

.admin-button-professional {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, #8B5CF6, #4F46E5);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.admin-button-professional:hover {
  background: linear-gradient(to right, #7C3AED, #4338CA);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.login-button-professional {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.login-button-professional:hover {
  color: #4F46E5;
  background-color: #F9FAFB;
}

.register-button-professional {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, #4F46E5, #2563EB);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.register-button-professional:hover {
  background: linear-gradient(to right, #4338CA, #1D4ED8);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.logout-button-professional {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #DC2626;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.logout-button-professional:hover {
  color: #B91C1C;
  background-color: #FEF2F2;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  color: #4F46E5;
  background-color: #EEF2FF;
}

/* Add subtle animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-link-professional:hover {
  animation: slideIn 0.2s ease-out;
}
</style> 