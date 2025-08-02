<template>
  <AdminLayout>
    <div>
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Categories</h1>
          <p class="text-gray-600 mt-1">Manage your product categories</p>
        </div>
        <button 
          @click="showCreateModal = true" 
          class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Category
        </button>
      </div>

      <!-- Categories Table -->
      <div class="bg-white rounded-lg shadow-md border border-gray-200">
        <div v-if="loading" class="p-8 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p class="mt-2 text-gray-600">Loading categories...</p>
        </div>
        
        <div v-else-if="categories.length === 0" class="p-8 text-center text-gray-500">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No categories</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
        </div>
        
        <div v-else class="overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                    <div class="text-sm text-gray-500">{{ category.description }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ category.slug }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ getProductCount(category.id) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(category.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ category.status === 1 ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button @click="editCategory(category)" class="text-primary-600 hover:text-primary-900">
                    Edit
                  </button>
                  <button @click="deleteCategory(category)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="showCreateModal || editingCategory" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{ editingCategory ? 'Edit Category' : 'Create New Category' }}
            </h3>
            <form @submit.prevent="saveCategory">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  v-model="categoryForm.name" 
                  type="text" 
                  required 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Category name"
                />
              </div>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                <input 
                  v-model="categoryForm.slug" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="category-slug (auto-generated if empty)"
                />
              </div>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  v-model="categoryForm.description" 
                  rows="3" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                  placeholder="Category description"
                ></textarea>
              </div>
              
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select v-model="categoryForm.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option :value="1">Active</option>
                  <option :value="0">Inactive</option>
                </select>
              </div>
              
              <div class="flex justify-end space-x-3">
                <button type="button" @click="closeModal" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Cancel
                </button>
                <button type="submit" :disabled="saving" class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  {{ saving ? 'Saving...' : (editingCategory ? 'Update' : 'Create') }}
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
import { ref, onMounted, reactive } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { productApi, categoryApi } from '@/services/api'

export default {
  name: 'AdminCategories',
  components: {
    AdminLayout
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const route = useRoute()
    
    const categories = ref([])
    const products = ref([])
    const loading = ref(true)
    const saving = ref(false)
    const showCreateModal = ref(false)
    const editingCategory = ref(null)
    
    const categoryForm = reactive({
      name: '',
      slug: '',
      description: '',
      status: 1
    })

    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...')
        const response = await categoryApi.getCategories()
        console.log('Categories response:', response)
        
        // Handle different response structures
        if (response.data.success) {
          categories.value = response.data.data || []
        } else if (Array.isArray(response.data)) {
          categories.value = response.data
        } else {
          categories.value = response.data.data || response.data || []
        }
        
        console.log('Categories loaded:', categories.value)
        console.log('Number of categories:', categories.value.length)
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Show error message to user
        alert('Failed to load categories. Using demo data.')
        // Add mock data for testing
        categories.value = [
          { id: 1, name: 'Laptops', slug: 'laptops', description: 'Portable computers', status: 1 },
          { id: 2, name: 'Desktops', slug: 'desktops', description: 'Desktop computers', status: 1 },
          { id: 3, name: 'Accessories', slug: 'accessories', description: 'Computer accessories', status: 1 }
        ]
      }
    }

    const fetchProducts = async () => {
      try {
        const response = await productApi.getProducts()
        // Ensure products is always an array
        if (response.data.success) {
          products.value = response.data.data.products || response.data.data || []
        } else if (Array.isArray(response.data)) {
          products.value = response.data
        } else {
          products.value = []
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        products.value = [] // Ensure it's always an array
      }
    }

    const getProductCount = (categoryId) => {
      if (!Array.isArray(products.value)) {
        return 0
      }
      return products.value.filter(p => p.category_id === categoryId).length
    }

    const getStatusClass = (status) => {
      return status === 1 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }

    const generateSlug = (name) => {
      return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const saveCategory = async () => {
      try {
        saving.value = true
        
        // Auto-generate slug if not provided
        if (!categoryForm.slug && categoryForm.name) {
          categoryForm.slug = generateSlug(categoryForm.name)
        }

        if (editingCategory.value) {
          // Update existing category
          const response = await categoryApi.updateCategory(editingCategory.value.id, categoryForm)
          console.log('Category updated:', response)
        } else {
          // Create new category
          const response = await categoryApi.createCategory(categoryForm)
          console.log('Category created:', response)
        }
        
        await fetchCategories()
        closeModal()
        alert('Category saved successfully!')
      } catch (error) {
        console.error('Error saving category:', error)
        alert(`Error saving category: ${error.response?.data?.message || error.message}`)
      } finally {
        saving.value = false
      }
    }

    const editCategory = (category) => {
      editingCategory.value = category
      categoryForm.name = category.name
      categoryForm.slug = category.slug
      categoryForm.description = category.description || ''
      categoryForm.status = category.status
    }

    const deleteCategory = async (category) => {
      if (!confirm(`Are you sure you want to delete "${category.name}"?`)) {
        return
      }
      
      try {
        await categoryApi.deleteCategory(category.id)
        await fetchCategories()
      } catch (error) {
        console.error('Error deleting category:', error)
        alert('Error deleting category. Please try again.')
      }
    }

    const closeModal = () => {
      showCreateModal.value = false
      editingCategory.value = null
      categoryForm.name = ''
      categoryForm.slug = ''
      categoryForm.description = ''
      categoryForm.status = 1
    }

    onMounted(async () => {
      loading.value = true
      await Promise.all([fetchCategories(), fetchProducts()])
      loading.value = false
      
      // Check if we should open the create modal based on route
      if (route.name === 'AdminCategoryCreate') {
        showCreateModal.value = true
      }
    })

    return {
      categories,
      loading,
      saving,
      showCreateModal,
      editingCategory,
      categoryForm,
      getProductCount,
      getStatusClass,
      saveCategory,
      editCategory,
      deleteCategory,
      closeModal
    }
  }
}
</script>

<style>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
