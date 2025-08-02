<template>
  <AdminLayout>
    <div class="admin-users">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
          <p class="text-gray-600 mt-1">Manage users, user types, and permissions</p>
        </div>
        <button @click="showCreateUserModal = true" class="btn-primary">
          Add New User
        </button>
      </div>

      <!-- Filters -->
      <div class="card p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search users..."
              class="form-input"
              @input="debouncedSearch"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select v-model="filters.status" @change="fetchUsers" class="form-select">
              <option value="">All Status</option>
              <option value="10">Active</option>
              <option value="9">Inactive</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">User Type</label>
            <select v-model="filters.user_type_id" @change="fetchUsers" class="form-select">
              <option value="">All Types</option>
              <option v-for="type in userTypes" :key="type.id" :value="type.id">
                {{ type.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select v-model="filters.role" @change="fetchUsers" class="form-select">
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="loading" v-for="n in 5" :key="n">
                <td colspan="7" class="px-6 py-4">
                  <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-gray-300 h-10 w-10"></div>
                    <div class="flex-1 space-y-2 py-1">
                      <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-else-if="users.length === 0">
                <td colspan="7" class="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
              <tr v-else v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span class="text-sm font-medium text-gray-700">
                          {{ getUserInitials(user) }}
                        </span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.full_name || user.username }}</div>
                      <div class="text-sm text-gray-500">@{{ user.username }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.email }}</div>
                  <div class="text-sm text-gray-500">{{ user.phone || 'No phone' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="text-sm text-gray-900">{{ user.user_type?.name || 'Default' }}</span>
                    <button
                      @click="openUserTypeModal(user)"
                      class="ml-2 text-xs text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </div>
                  <div v-if="user.user_type?.discount_percentage" class="text-xs text-green-600">
                    {{ user.user_type.discount_percentage }}% discount
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full': true,
                    'bg-purple-100 text-purple-800': user.role === 'admin',
                    'bg-gray-100 text-gray-800': user.role === 'user'
                  }">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full': true,
                    'bg-green-100 text-green-800': user.status === 10,
                    'bg-red-100 text-red-800': user.status !== 10
                  }">
                    {{ user.status_text }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                    <button 
                      @click="toggleUserStatus(user)" 
                      :class="user.status === 10 ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
                      :disabled="user.is_admin && user.id === currentUser?.id"
                    >
                      {{ user.status === 10 ? 'Disable' : 'Enable' }}
                    </button>
                    <button 
                      @click="deleteUser(user)" 
                      class="text-red-600 hover:text-red-900"
                      :disabled="user.is_admin && user.id === currentUser?.id"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="prevPage"
              :disabled="pagination.page <= 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page >= pagination.pageCount"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing page {{ pagination.page }} of {{ pagination.pageCount }} 
                ({{ pagination.total }} total users)
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="prevPage"
                  :disabled="pagination.page <= 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="pagination.page >= pagination.pageCount"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <!-- Create/Edit User Modal -->
      <div v-if="showCreateUserModal || showEditUserModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{ showCreateUserModal ? 'Create New User' : 'Edit User' }}
            </h3>
            
            <form @submit.prevent="saveUser" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Username</label>
                  <input v-model="userForm.username" type="text" required class="form-input" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input v-model="userForm.email" type="email" required class="form-input" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">First Name</label>
                  <input v-model="userForm.first_name" type="text" class="form-input" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Last Name</label>
                  <input v-model="userForm.last_name" type="text" class="form-input" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Phone</label>
                  <input v-model="userForm.phone" type="text" class="form-input" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">User Type</label>
                  <select v-model="userForm.user_type_id" class="form-select">
                    <option v-for="type in userTypes" :key="type.id" :value="type.id">
                      {{ type.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Role</label>
                  <select v-model="userForm.role" class="form-select">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Status</label>
                  <select v-model="userForm.status" class="form-select">
                    <option :value="10">Active</option>
                    <option :value="9">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div v-if="showCreateUserModal || userForm.password">
                <label class="block text-sm font-medium text-gray-700">
                  Password {{ showEditUserModal ? '(leave blank to keep current)' : '' }}
                </label>
                <input v-model="userForm.password" type="password" class="form-input" />
              </div>

              <div class="flex justify-end space-x-2 pt-4">
                <button 
                  type="button" 
                  @click="closeModals" 
                  class="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="btn-primary"
                  :disabled="saving"
                >
                  {{ saving ? 'Saving...' : (showCreateUserModal ? 'Create User' : 'Update User') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- User Type Change Modal -->
      <div v-if="showUserTypeModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Change User Type for {{ selectedUserForTypeChange?.full_name || selectedUserForTypeChange?.username }}
            </h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">User Type</label>
                <select v-model="newUserTypeId" class="form-select">
                  <option v-for="type in userTypes" :key="type.id" :value="type.id">
                    {{ type.name }} 
                    <span v-if="type.discount_percentage">({{ type.discount_percentage }}% discount)</span>
                  </option>
                </select>
              </div>

              <div class="flex justify-end space-x-2 pt-4">
                <button @click="showUserTypeModal = false" class="btn-secondary">
                  Cancel
                </button>
                <button @click="updateUserTypeAssignment" class="btn-primary" :disabled="saving">
                  {{ saving ? 'Updating...' : 'Update User Type' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { adminUserApi } from '@/services/api'
import AdminLayout from '@/components/AdminLayout.vue'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)

const users = ref([])
const userTypes = ref([])
const loading = ref(false)
const saving = ref(false)

const showCreateUserModal = ref(false)
const showEditUserModal = ref(false)
const showUserTypeModal = ref(false)
const selectedUserForTypeChange = ref(null)
const newUserTypeId = ref(null)

const filters = reactive({
  search: '',
  status: '',
  user_type_id: '',
  role: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0,
  pageCount: 0
})

const userForm = reactive({
  id: null,
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  phone: '',
  user_type_id: 1,
  role: 'user',
  status: 10,
  password: ''
})

const fetchUsers = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      limit: pagination.pageSize,
      ...filters
    }
    
    // Remove empty filters
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key]
      }
    })

    const response = await adminUserApi.getUsers(params)
    if (response.data.success) {
      users.value = response.data.data.users
      Object.assign(pagination, response.data.data.pagination)
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

const fetchUserTypes = async () => {
  try {
    const response = await adminUserApi.getUserTypes()
    if (response.data.success) {
      userTypes.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching user types:', error)
  }
}

// Debounced search
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.page = 1
    fetchUsers()
  }, 500)
}

const resetUserForm = () => {
  Object.assign(userForm, {
    id: null,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    user_type_id: 1,
    role: 'user',
    status: 10,
    password: ''
  })
}

const editUser = (user) => {
  Object.assign(userForm, {
    id: user.id,
    username: user.username,
    email: user.email,
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    phone: user.phone || '',
    user_type_id: user.user_type_id,
    role: user.role,
    status: user.status,
    password: ''
  })
  showEditUserModal.value = true
}

const saveUser = async () => {
  saving.value = true
  try {
    let response
    if (showCreateUserModal.value) {
      response = await adminUserApi.createUser(userForm)
    } else {
      response = await adminUserApi.updateUser(userForm.id, userForm)
    }

    if (response.data.success) {
      closeModals()
      fetchUsers()
    } else {
      alert('Error: ' + response.data.message)
    }
  } catch (error) {
    console.error('Error saving user:', error)
    alert('Error saving user: ' + (error.response?.data?.message || error.message))
  } finally {
    saving.value = false
  }
}

const toggleUserStatus = async (user) => {
  if (user.is_admin && user.id === currentUser.value?.id) {
    alert('Cannot disable your own account')
    return
  }

  const action = user.status === 10 ? 'disable' : 'enable'
  if (confirm(`Are you sure you want to ${action} this user?`)) {
    try {
      const response = await adminUserApi.toggleUserStatus(user.id)
      if (response.data.success) {
        fetchUsers()
      }
    } catch (error) {
      console.error('Error toggling user status:', error)
      alert('Error updating user status')
    }
  }
}

const deleteUser = async (user) => {
  if (user.is_admin && user.id === currentUser.value?.id) {
    alert('Cannot delete your own account')
    return
  }

  if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    try {
      const response = await adminUserApi.deleteUser(user.id)
      if (response.data.success) {
        fetchUsers()
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Error deleting user')
    }
  }
}

const openUserTypeModal = (user) => {
  selectedUserForTypeChange.value = user
  newUserTypeId.value = user.user_type_id
  showUserTypeModal.value = true
}

const updateUserTypeAssignment = async () => {
  saving.value = true
  try {
    const response = await adminUserApi.updateUserType(
      selectedUserForTypeChange.value.id, 
      newUserTypeId.value
    )
    if (response.data.success) {
      showUserTypeModal.value = false
      fetchUsers()
    }
  } catch (error) {
    console.error('Error updating user type:', error)
    alert('Error updating user type')
  } finally {
    saving.value = false
  }
}

const closeModals = () => {
  showCreateUserModal.value = false
  showEditUserModal.value = false
  showUserTypeModal.value = false
  resetUserForm()
}

const getUserInitials = (user) => {
  if (user.first_name && user.last_name) {
    return (user.first_name[0] + user.last_name[0]).toUpperCase()
  }
  return user.username.substring(0, 2).toUpperCase()
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp * 1000).toLocaleDateString()
}

const prevPage = () => {
  if (pagination.page > 1) {
    pagination.page--
    fetchUsers()
  }
}

const nextPage = () => {
  if (pagination.page < pagination.pageCount) {
    pagination.page++
    fetchUsers()
  }
}

onMounted(() => {
  fetchUsers()
  fetchUserTypes()
})
</script>

<style scoped>
.form-input {
  margin-top: 0.25rem;
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-select {
  margin-top: 0.25rem;
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: white;
}

.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
