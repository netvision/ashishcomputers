<template>
  <AdminLayout>
    <div class="admin-brands">
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">Brand Management</h1>
          <button
            @click="showCreateBrandModal = true"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add New Brand
          </button>
        </div>
      </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search brands..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <select
            v-model="statusFilter"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Brand List -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="brand in filteredBrands" :key="brand.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12">
                    <img
                      v-if="brand.logo"
                      :src="brand.logo"
                      :alt="brand.name"
                      class="h-12 w-12 rounded-lg object-cover"
                    />
                    <div
                      v-else
                      class="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center"
                    >
                      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ brand.name }}</div>
                    <div class="text-sm text-gray-500">{{ brand.slug }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  {{ brand.description || 'No description' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div v-if="brand.email || brand.phone">
                  <div v-if="brand.email">{{ brand.email }}</div>
                  <div v-if="brand.phone">{{ brand.phone }}</div>
                </div>
                <div v-else>No contact info</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    brand.status === 1
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ brand.status === 1 ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ brand.products_count || 0 }} products
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  @click="editBrand(brand)"
                  class="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit
                </button>
                <button
                  @click="confirmDeleteBrand(brand)"
                  class="text-red-600 hover:text-red-900 ml-3 inline-flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredBrands.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        <p class="text-xl text-gray-500">No brands found</p>
        <p class="text-gray-400">Add your first brand to get started</p>
      </div>
    </div>

    <!-- Create/Edit Brand Modal -->
    <div
      v-if="showCreateBrandModal || showEditBrandModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ showCreateBrandModal ? 'Add New Brand' : 'Edit Brand' }}
          </h3>
          <button @click="closeBrandModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveBrand" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Brand Name *
              </label>
              <input
                v-model="brandForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter brand name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <input
                v-model="brandForm.slug"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Auto-generated from name"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="brandForm.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brand description"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                v-model="brandForm.logo"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                v-model="brandForm.website"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                v-model="brandForm.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="contact@brand.com"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                v-model="brandForm.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 1234567890"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                v-model="brandForm.address"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brand address"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                v-model="brandForm.country"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="India"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              v-model="brandForm.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option :value="1">Active</option>
              <option :value="0">Inactive</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeBrandModal"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ saving ? 'Saving...' : (showCreateBrandModal ? 'Create Brand' : 'Update Brand') }}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { productApi } from '@/services/api'
import AdminLayout from '@/components/AdminLayout.vue'
import { useNotification } from '@/composables/useNotification'

// Notification system
const { success, error } = useNotification()

// Reactive data
const brands = ref([])
const loading = ref(false)
const saving = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')

// Modal states
const showCreateBrandModal = ref(false)
const showEditBrandModal = ref(false)

// Form data
const brandForm = ref({
  id: null,
  name: '',
  slug: '',
  description: '',
  logo: '',
  website: '',
  email: '',
  phone: '',
  address: '',
  country: 'India',
  status: 1
})

// Computed properties
const filteredBrands = computed(() => {
  let filtered = brands.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(brand => 
      brand.name.toLowerCase().includes(query) ||
      brand.description?.toLowerCase().includes(query) ||
      brand.email?.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value !== '') {
    filtered = filtered.filter(brand => brand.status == statusFilter.value)
  }

  return filtered
})

// Methods
const loadBrands = async () => {
  loading.value = true
  try {
    const response = await productApi.getBrands()
    if (response.data.success) {
      brands.value = response.data.data
    } else {
      error('Failed to load brands', response.data.message)
    }
  } catch (err) {
    error('Error loading brands', 'Please try again later')
  } finally {
    loading.value = false
  }
}

const resetBrandForm = () => {
  Object.assign(brandForm.value, {
    id: null,
    name: '',
    slug: '',
    description: '',
    logo: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    country: 'India',
    status: 1
  })
}

const editBrand = (brand) => {
  Object.assign(brandForm.value, {
    id: brand.id,
    name: brand.name,
    slug: brand.slug || '',
    description: brand.description || '',
    logo: brand.logo || '',
    website: brand.website || '',
    email: brand.email || '',
    phone: brand.phone || '',
    address: brand.address || '',
    country: brand.country || 'India',
    status: brand.status
  })
  showEditBrandModal.value = true
}

const closeBrandModal = () => {
  showCreateBrandModal.value = false
  showEditBrandModal.value = false
  resetBrandForm()
}

const saveBrand = async () => {
  saving.value = true
  try {
    let response
    if (showCreateBrandModal.value) {
      response = await productApi.createBrand(brandForm.value)
    } else {
      response = await productApi.updateBrand(brandForm.value.id, brandForm.value)
    }

    if (response.data.success) {
      success(response.data.message)
      closeBrandModal()
      await loadBrands()
    } else {
      error('Error', response.data.message)
    }
  } catch (err) {
    error('Error saving brand', 'Please try again later')
  } finally {
    saving.value = false
  }
}

const confirmDeleteBrand = (brand) => {
  if (confirm(`Are you sure you want to delete "${brand.name}"? This action cannot be undone.`)) {
    deleteBrand(brand.id)
  }
}

const deleteBrand = async (id) => {
  try {
    const response = await productApi.deleteBrand(id)
    if (response.data.success) {
      success(response.data.message)
      await loadBrands()
    } else {
      error('Error', response.data.message)
    }
  } catch (err) {
    error('Error deleting brand', 'Please try again later')
  }
}

// Lifecycle
onMounted(() => {
  loadBrands()
})
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
