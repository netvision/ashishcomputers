<template>
  <AdminLayout>
    <div class="admin-products">
      <!-- Authentication Status -->
      <div v-if="!authStore.isAuthenticated" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Authentication Required</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>You must be logged in to manage products. <router-link to="/login" class="font-medium underline">Click here to login</router-link></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Products</h1>
          <p class="text-gray-600 mt-1">Manage your product inventory</p>
          <p v-if="authStore.isAuthenticated" class="text-sm text-green-600 mt-1">
            ✓ Logged in as {{ authStore.user?.username || 'Admin' }}
          </p>
        </div>
        <button @click="showCreateModal = true" class="btn-primary" :disabled="!authStore.isAuthenticated">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Product
        </button>
      </div>

      <!-- Filters -->
      <div class="card p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search products..." 
              class="input-field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select v-model="selectedCategory" class="input-field">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select v-model="selectedBrand" class="input-field">
              <option value="">All Brands</option>
              <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                {{ brand.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select v-model="selectedStatus" class="input-field">
              <option value="">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="card overflow-hidden">
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
        
        <div v-else-if="filteredProducts.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/MRP</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in filteredProducts" :key="product.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-12 w-12">
                      <img 
                        :src="product.image || `https://picsum.photos/200/200?random=${product.id}`" 
                        :alt="product.name"
                        class="h-12 w-12 rounded-lg object-cover"
                        @error="handleImageError"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">{{ truncateText(product.description, 50) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div v-if="product.company" class="flex items-center">
                    <img 
                      v-if="product.company.logo" 
                      :src="product.company.logo" 
                      :alt="product.company.name"
                      class="w-6 h-6 mr-2 object-contain"
                      @error="handleCompanyLogoError"
                    />
                    <div class="text-sm text-gray-900">{{ product.company.name }}</div>
                  </div>
                  <div v-else class="text-sm text-gray-400">No brand</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ getCategoryName(product.category_id) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">₹{{ formatPrice(product.price) }}</div>
                  <div v-if="product.mrp && product.mrp > product.price" class="text-xs text-gray-500">
                    MRP: ₹{{ formatPrice(product.mrp) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ product.sku || '-' }}</div>
                  <div v-if="product.model_no" class="text-xs text-gray-500">{{ product.model_no }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(product.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ product.status === 1 ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="editProduct(product)" 
                    class="text-blue-600 hover:text-blue-900 mr-3 disabled:text-gray-400 disabled:cursor-not-allowed"
                    :disabled="!authStore.isAuthenticated"
                  >
                    Edit
                  </button>
                  <button 
                    @click="deleteProduct(product)" 
                    class="text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                    :disabled="!authStore.isAuthenticated"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ products.length === 0 ? 'Get started by creating a new product.' : 'Try adjusting your search filters.' }}
          </p>
        </div>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="showCreateModal || editingProduct" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{ editingProduct ? 'Edit Product' : 'Create New Product' }}
            </h3>
            <form @submit.prevent="saveProduct">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input 
                    v-model="productForm.name" 
                    type="text" 
                    required 
                    class="input-field"
                    placeholder="Product name"
                  />
                </div>
                
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    v-model="productForm.description" 
                    rows="3" 
                    class="input-field"
                    placeholder="Product description"
                  ></textarea>
                </div>
                
                <!-- Multiple Categories Section -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                  <div class="border border-gray-300 rounded-lg p-3 bg-gray-50">
                    <div class="space-y-2 max-h-32 overflow-y-auto">
                      <label v-for="category in categories" :key="category.id" class="flex items-center">
                        <input 
                          type="checkbox" 
                          :value="category.id" 
                          v-model="productForm.category_ids"
                          class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
                        />
                        <span class="text-sm text-gray-700">{{ category.name }}</span>
                      </label>
                    </div>
                    <p v-if="productForm.category_ids.length === 0" class="text-sm text-red-500 mt-2">
                      Please select at least one category
                    </p>
                  </div>
                </div>

                <!-- Brand/Company Section -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Brand/Company</label>
                  <select v-model="productForm.company_id" class="input-field">
                    <option value="">Select Brand</option>
                    <option v-for="company in companies" :key="company.id" :value="company.id">
                      {{ company.name }}
                    </option>
                  </select>
                </div>

                <!-- MRP Section -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">MRP (Maximum Retail Price)</label>
                  <input 
                    v-model="productForm.mrp" 
                    type="number" 
                    step="0.01"
                    min="0"
                    class="input-field"
                    placeholder="0.00"
                  />
                </div>

                <!-- Base Price Section -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Base Price (₹)</label>
                  <input 
                    v-model="productForm.base_price" 
                    type="number" 
                    step="0.01"
                    min="0"
                    class="input-field"
                    placeholder="0.00"
                    required
                  />
                  <p class="text-xs text-gray-500 mt-1">Default selling price for all customers</p>
                </div>

                <!-- SKU Section -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                  <input 
                    v-model="productForm.sku" 
                    type="text" 
                    class="input-field"
                    placeholder="Product SKU (auto-generated if empty)"
                  />
                </div>

                <!-- Model Number Section -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Model Number</label>
                  <input 
                    v-model="productForm.model_no" 
                    type="text" 
                    class="input-field"
                    placeholder="Model/Part Number"
                  />
                </div>

                <!-- Status Section -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select v-model="productForm.status" class="input-field">
                    <option :value="1">Active</option>
                    <option :value="0">Inactive</option>
                  </select>
                </div>

                <!-- Multiple Images Section -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                  
                  <!-- File Upload Section -->
                  <div class="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    <div class="text-center">
                      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <div class="mt-4">
                        <label for="file-upload" class="cursor-pointer">
                          <span class="mt-2 block text-sm font-medium text-gray-900">
                            Upload image files
                          </span>
                          <span class="mt-1 block text-sm text-gray-500">
                            PNG, JPG, GIF, WEBP up to 5MB each
                          </span>
                          <input 
                            id="file-upload" 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            @change="handleFileUpload" 
                            class="sr-only"
                          />
                          <span class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                            Choose Files
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <!-- URL Input Section -->
                  <div class="space-y-3">
                    <div class="text-sm font-medium text-gray-700 mb-2">Or add image URLs:</div>
                    <div v-for="(image, index) in productForm.images" :key="index" class="flex items-center space-x-2">
                      <input 
                        v-model="productForm.images[index]" 
                        type="text" 
                        class="input-field flex-1"
                        :placeholder="`Image URL ${index + 1} (URL or uploaded path)`"
                      />
                      <button 
                        type="button" 
                        @click="removeImage(index)"
                        class="px-3 py-2 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-md"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                    <button 
                      type="button" 
                      @click="addImage"
                      class="flex items-center px-3 py-2 text-primary-600 hover:text-primary-800 bg-primary-50 hover:bg-primary-100 rounded-md"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                      Add Image URL
                    </button>
                  </div>

                  <!-- Image Preview Section -->
                  <div v-if="imagePreviewUrls.length > 0" class="mt-4">
                    <div class="text-sm font-medium text-gray-700 mb-2">Image Previews:</div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div v-for="(previewUrl, index) in imagePreviewUrls" :key="index" class="relative">
                        <img :src="previewUrl" alt="Preview" class="w-full h-20 object-cover rounded border" />
                        <button 
                          type="button"
                          @click="removeImagePreview(index)"
                          class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Multiple Pricing Section -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Customer Type Pricing (Optional)
                  </label>
                  <p class="text-sm text-gray-500 mb-3">
                    Set specific prices for different customer types. If not configured, base price will be used for all customers.
                  </p>
                  <div class="space-y-3">
                    <div v-for="(price, index) in productForm.prices" :key="index" class="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <div class="flex-1">
                        <select v-model="price.user_type_id" class="input-field mb-2">
                          <option value="">Select Customer Type</option>
                          <option v-for="userType in userTypes" :key="userType.id" :value="userType.id">
                            {{ userType.name }}
                            <span v-if="userType.description"> - {{ userType.description }}</span>
                          </option>
                        </select>
                        <input 
                          v-model="price.price" 
                          type="number" 
                          step="0.01"
                          min="0"
                          class="input-field"
                          placeholder="Custom price (₹)"
                        />
                        <p v-if="price.user_type_id" class="text-xs text-gray-500 mt-1">
                          {{ getUserTypeName(price.user_type_id) }}
                          <span v-if="productForm.base_price && price.price && parseFloat(price.price) < parseFloat(productForm.base_price)" class="text-green-600">
                            ({{ Math.round(((parseFloat(productForm.base_price) - parseFloat(price.price)) / parseFloat(productForm.base_price)) * 100) }}% discount)
                          </span>
                          <span v-else-if="productForm.base_price && price.price && parseFloat(price.price) > parseFloat(productForm.base_price)" class="text-red-600">
                            ({{ Math.round(((parseFloat(price.price) - parseFloat(productForm.base_price)) / parseFloat(productForm.base_price)) * 100) }}% markup)
                          </span>
                        </p>
                      </div>
                      <button 
                        type="button" 
                        @click="removePrice(index)"
                        class="px-3 py-2 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-md"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                    <button 
                      type="button" 
                      @click="addPrice"
                      class="flex items-center px-3 py-2 text-primary-600 hover:text-primary-800 bg-primary-50 hover:bg-primary-100 rounded-md"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                      Add Customer Type Pricing
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end space-x-3 mt-6">
                <button type="button" @click="closeModal" class="btn-secondary">
                  Cancel
                </button>
                <button type="submit" :disabled="saving" class="btn-primary">
                  {{ saving ? 'Saving...' : (editingProduct ? 'Update' : 'Create') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, onMounted, reactive, computed } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { productApi, userApi } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'AdminProducts',
  components: {
    AdminLayout
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const route = useRoute()
    
    // Check if user is authenticated
    if (!authStore.isAuthenticated) {
      router.push('/login')
      return
    }
    
    const products = ref([])
    const categories = ref([])
    const companies = ref([])
    const brands = ref([])
    const userTypes = ref([])
    const loading = ref(true)
    const saving = ref(false)
    const showCreateModal = ref(false)
    const editingProduct = ref(null)
    const uploadingImages = ref(false)
    const imagePreviewUrls = ref([])
    const uploadedFiles = ref([])
    
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const selectedBrand = ref('')
    const selectedStatus = ref('')
    
    const productForm = reactive({
      name: '',
      description: '',
      status: 1,
      company_id: '',
      mrp: '',
      base_price: '',
      sku: '',
      model_no: '',
      category_ids: [], // Multiple categories
      images: [''], // Multiple images
      prices: [] // Multiple price tiers - start empty
    })

    const filteredProducts = computed(() => {
      let filtered = products.value

      // Search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.sku && product.sku.toLowerCase().includes(query)) ||
          (product.model_no && product.model_no.toLowerCase().includes(query)) ||
          (product.company && product.company.name.toLowerCase().includes(query))
        )
      }

      // Category filter
      if (selectedCategory.value) {
        filtered = filtered.filter(product => product.category_id == selectedCategory.value)
      }

      // Brand filter
      if (selectedBrand.value) {
        filtered = filtered.filter(product => 
          product.company && product.company.id == selectedBrand.value
        )
      }

      // Status filter
      if (selectedStatus.value !== '') {
        filtered = filtered.filter(product => product.status == selectedStatus.value)
      }

      return filtered
    })

    const fetchProducts = async () => {
      try {
        console.log('Fetching products...')
        const response = await productApi.getProducts()
        console.log('Products response:', response)
        
        // Handle different response structures
        if (response.data.success) {
          products.value = response.data.data.products || response.data.data || []
        } else if (Array.isArray(response.data)) {
          products.value = response.data
        } else {
          products.value = response.data.data || response.data || []
        }
        
        console.log('Products loaded:', products.value)
        console.log('Number of products:', products.value.length)
        
        // Extract brands after products are loaded
        extractBrands()
      } catch (error) {
        console.error('Error fetching products:', error)
        // Show error message to user
        alert('Failed to load products. Using demo data.')
        // Add mock data for testing
        products.value = [
          { id: 1, name: 'Gaming Laptop', description: 'High-performance laptop', price: 1299.99, stock: 10, category_id: 1, status: 1, image: '' },
          { id: 2, name: 'Office Desktop', description: 'Reliable desktop computer', price: 599.99, stock: 15, category_id: 2, status: 1, image: '' },
          { id: 3, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 29.99, stock: 50, category_id: 3, status: 1, image: '' }
        ]
      }
    }

    const fetchCategories = async () => {
      try {
        console.log('Fetching categories for products...')
        const response = await productApi.getCategories()
        console.log('Categories response for products:', response)
        categories.value = response.data.data || response.data || []
        console.log('Categories loaded for products:', categories.value)
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Add mock data for testing
        categories.value = [
          { id: 1, name: 'Laptops', slug: 'laptops', description: 'Portable computers', status: 1 },
          { id: 2, name: 'Desktops', slug: 'desktops', description: 'Desktop computers', status: 1 }
        ]
      }
    }

    const fetchUserTypes = async () => {
      try {
        console.log('Fetching user types...')
        const response = await userApi.getUserTypes()
        console.log('User types response:', response)
        userTypes.value = response.data.data || response.data || []
        console.log('User types loaded:', userTypes.value)
      } catch (error) {
        console.error('Error fetching user types:', error)
        // Add fallback data
        userTypes.value = [
          { id: 1, name: 'Regular Customer', description: 'Standard retail customers', discount_percentage: 0 },
          { id: 2, name: 'Wholesale Customer', description: 'Bulk purchase customers', discount_percentage: 10 },
          { id: 3, name: 'VIP Customer', description: 'Premium customers', discount_percentage: 15 },
          { id: 4, name: 'Staff', description: 'Company staff members', discount_percentage: 20 }
        ]
      }
    }

    const extractBrands = () => {
      try {
        // Extract unique brands from products
        const uniqueBrands = []
        const brandMap = new Map()
        
        products.value.forEach(product => {
          if (product.company && !brandMap.has(product.company.id)) {
            brandMap.set(product.company.id, product.company)
            uniqueBrands.push({
              id: product.company.id,
              name: product.company.name,
              slug: product.company.slug
            })
          }
        })
        
        brands.value = uniqueBrands.sort((a, b) => a.name.localeCompare(b.name))
        companies.value = brands.value // Use the same data for companies dropdown
        console.log('Extracted brands:', brands.value)
      } catch (err) {
        console.error('Error extracting brands:', err)
        brands.value = []
        companies.value = []
      }
    }

    const getCategoryName = (categoryId) => {
      const category = categories.value.find(c => c.id === categoryId)
      return category ? category.name : 'Unknown'
    }

    const getUserTypeName = (userTypeId) => {
      const userType = userTypes.value.find(ut => ut.id == userTypeId)
      return userType ? userType.name : 'Unknown'
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-IN').format(parseFloat(price))
    }

    const getStatusClass = (status) => {
      return status === 1 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }

    const truncateText = (text, length) => {
      return text && text.length > length ? text.substring(0, length) + '...' : text
    }

    const handleImageError = (event) => {
      event.target.src = 'https://picsum.photos/200/200?random=default'
    }

    const handleCompanyLogoError = (event) => {
      event.target.style.display = 'none'
    }

    // Methods for managing multiple images
    const addImage = () => {
      productForm.images.push('')
    }

    const removeImage = (index) => {
      if (productForm.images.length > 1) {
        productForm.images.splice(index, 1)
      }
    }

    // File upload handling
    const handleFileUpload = async (event) => {
      const files = Array.from(event.target.files)
      if (files.length === 0) return

      try {
        uploadingImages.value = true
        console.log('Starting upload for files:', files.map(f => ({ name: f.name, size: f.size, type: f.type })))
        
        // Create form data
        const formData = new FormData()
        files.forEach((file, index) => {
          formData.append(`image_${index}`, file)
          console.log(`Added file ${index}:`, file.name, file.type, file.size)
        })

        console.log('FormData entries:')
        for (let [key, value] of formData.entries()) {
          console.log(key, value)
        }

        // Upload files
        console.log('Making API call to upload images...')
        const response = await productApi.uploadImages(formData)
        console.log('Upload response:', response.data)
        
        if (response.data.success && response.data.data.images) {
          // Add uploaded image URLs to the form
          const uploadedUrls = response.data.data.images
          productForm.images = [...productForm.images.filter(img => img.trim() !== ''), ...uploadedUrls]
          
          // Create preview URLs for uploaded files
          const newPreviews = []
          files.forEach(file => {
            const reader = new FileReader()
            reader.onload = (e) => {
              newPreviews.push(e.target.result)
              if (newPreviews.length === files.length) {
                imagePreviewUrls.value = [...imagePreviewUrls.value, ...newPreviews]
              }
            }
            reader.readAsDataURL(file)
          })
          
          uploadedFiles.value = [...uploadedFiles.value, ...files]
          alert(`Successfully uploaded ${uploadedUrls.length} image(s)`)
        } else {
          console.log('Upload failed:', response.data)
          alert(`Failed to upload images: ${response.data.message || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error uploading images:', error)
        console.error('Error response:', error.response?.data)
        alert(`Error uploading images: ${error.response?.data?.message || error.message}`)
      } finally {
        uploadingImages.value = false
        // Clear the file input
        event.target.value = ''
      }
    }

    const removeImagePreview = (index) => {
      imagePreviewUrls.value.splice(index, 1)
      uploadedFiles.value.splice(index, 1)
      // Also remove from productForm.images if it was uploaded
      // This is a bit complex as we need to track which URLs are from uploads
    }

    // Methods for managing multiple price tiers
    const addPrice = () => {
      productForm.prices.push({
        user_type_id: '',
        price: '',
        is_active: true
      })
    }

    const removePrice = (index) => {
      if (productForm.prices.length > 1) {
        productForm.prices.splice(index, 1)
      }
    }

    const saveProduct = async () => {
      // Check authentication before making API calls
      if (!authStore.isAuthenticated) {
        alert('You must be logged in to perform this action. Redirecting to login...')
        router.push('/login')
        return
      }

      // Validation
      if (productForm.category_ids.length === 0) {
        alert('Please select at least one category')
        return
      }

      if (!productForm.base_price || parseFloat(productForm.base_price) <= 0) {
        alert('Please enter a valid base price')
        return
      }

      try {
        saving.value = true
        console.log('Auth token:', authStore.token)
        console.log('User:', authStore.user)

        // Prepare data for API
        const productData = {
          name: productForm.name,
          description: productForm.description,
          status: productForm.status,
          price: productForm.base_price, // Main product price (base price)
          company_id: productForm.company_id || null,
          mrp: productForm.mrp || null,
          sku: productForm.sku || null,
          model_no: productForm.model_no || null,
          category_ids: productForm.category_ids,
          images: productForm.images.filter(img => img.trim() !== ''),
          prices: productForm.prices.filter(price => 
            price.price && 
            price.user_type_id && 
            parseFloat(price.price) > 0
          ).map(price => ({
            user_type_id: parseInt(price.user_type_id),
            price: parseFloat(price.price),
            is_active: price.is_active !== false
          }))
        }

        // For backward compatibility, set primary category
        if (productData.category_ids.length > 0) {
          productData.category_id = productData.category_ids[0]
        }
        if (productData.images.length > 0) {
          productData.image = productData.images[0]
        }

        console.log('Sending product data:', productData)

        if (editingProduct.value) {
          // Update existing product
          const response = await productApi.updateProduct(editingProduct.value.id, productData)
          console.log('Product updated:', response)
        } else {
          // Create new product
          const response = await productApi.createProduct(productData)
          console.log('Product created:', response)
        }
        
        await fetchProducts()
        closeModal()
        alert('Product saved successfully!')
      } catch (error) {
        console.error('Error saving product:', error)
        if (error.response?.status === 403) {
          alert('Authentication required. Please log in again.')
          authStore.logout()
          router.push('/login')
        } else {
          alert(`Error saving product: ${error.response?.data?.message || error.message}`)
        }
      } finally {
        saving.value = false
      }
    }

    const editProduct = (product) => {
      editingProduct.value = product
      productForm.name = product.name
      productForm.description = product.description || ''
      productForm.status = product.status
      productForm.company_id = product.company_id || product.company?.id || ''
      productForm.mrp = product.mrp || ''
      productForm.base_price = product.price || product.base_price || ''
      productForm.sku = product.sku || ''
      productForm.model_no = product.model_no || ''
      
      // Handle multiple categories (backward compatibility)
      if (product.category_ids && Array.isArray(product.category_ids)) {
        productForm.category_ids = [...product.category_ids]
      } else if (product.category_id) {
        productForm.category_ids = [product.category_id]
      } else {
        productForm.category_ids = []
      }
      
      // Handle multiple images (backward compatibility)
      if (product.images && Array.isArray(product.images) && product.images.length > 0) {
        productForm.images = [...product.images]
        // Ensure at least one empty field for new images
        if (productForm.images[productForm.images.length - 1] !== '') {
          productForm.images.push('')
        }
      } else if (product.image) {
        productForm.images = [product.image, '']
      } else {
        productForm.images = ['']
      }
      
      // Handle multiple prices (backward compatibility)
      if (product.prices && Array.isArray(product.prices) && product.prices.length > 0) {
        productForm.prices = product.prices.map(price => ({
          user_type_id: price.user_type_id,
          price: price.price,
          is_active: price.is_active !== false
        }))
      } else {
        productForm.prices = []
      }
      
      showCreateModal.value = true
    }

    const deleteProduct = async (product) => {
      // Check authentication before making API calls
      if (!authStore.isAuthenticated) {
        alert('You must be logged in to perform this action. Redirecting to login...')
        router.push('/login')
        return
      }

      if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
        return
      }
      
      try {
        await productApi.deleteProduct(product.id)
        await fetchProducts()
        alert('Product deleted successfully!')
      } catch (error) {
        console.error('Error deleting product:', error)
        if (error.response?.status === 403) {
          alert('Authentication required. Please log in again.')
          authStore.logout()
          router.push('/login')
        } else {
          alert(`Error deleting product: ${error.response?.data?.message || error.message}`)
        }
      }
    }

    const closeModal = () => {
      showCreateModal.value = false
      editingProduct.value = null
      
      // Reset form to initial state
      productForm.name = ''
      productForm.description = ''
      productForm.status = 1
      productForm.company_id = ''
      productForm.mrp = ''
      productForm.base_price = ''
      productForm.sku = ''
      productForm.model_no = ''
      productForm.category_ids = []
      productForm.images = ['']
      productForm.prices = []
      
      // Reset image upload data
      imagePreviewUrls.value = []
      uploadedFiles.value = []
      uploadingImages.value = false
    }

    onMounted(async () => {
      loading.value = true
      await Promise.all([fetchProducts(), fetchCategories(), fetchUserTypes()])
      loading.value = false
      
      // Check if we should open the create modal based on route
      if (route.name === 'AdminProductCreate') {
        showCreateModal.value = true
      }
    })

    return {
      authStore,
      products,
      categories,
      companies,
      brands,
      userTypes,
      loading,
      saving,
      showCreateModal,
      editingProduct,
      searchQuery,
      selectedCategory,
      selectedBrand,
      selectedStatus,
      productForm,
      filteredProducts,
      getCategoryName,
      getUserTypeName,
      formatPrice,
      getStatusClass,
      truncateText,
      handleImageError,
      handleCompanyLogoError,
      saveProduct,
      editProduct,
      deleteProduct,
      closeModal,
      addImage,
      removeImage,
      addPrice,
      removePrice,
      handleFileUpload,
      removeImagePreview,
      uploadingImages,
      imagePreviewUrls,
      uploadedFiles
    }
  }
}
</script>
