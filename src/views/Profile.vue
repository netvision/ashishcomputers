<template>
  <div class="profile-page">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Profile</h1>
        <p class="text-gray-600 mt-2">Manage your account information and preferences</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6">
            <!-- Profile Picture -->
            <div class="text-center mb-6">
              <div class="mx-auto h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                <svg class="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 class="mt-4 text-lg font-medium text-gray-900">{{ user?.name || 'User' }}</h3>
              <p class="text-gray-600">{{ user?.email || 'user@example.com' }}</p>
            </div>

            <!-- Profile Stats -->
            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b">
                <span class="text-gray-600">Total Orders</span>
                <span class="font-semibold">{{ profileStats.totalOrders }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b">
                <span class="text-gray-600">Total Spent</span>
                <span class="font-semibold">₹{{ profileStats.totalSpent.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600">Member Since</span>
                <span class="font-semibold">{{ profileStats.memberSince }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personal Information -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b">
              <h2 class="text-xl font-semibold text-gray-900">Personal Information</h2>
            </div>
            <div class="p-6">
              <form @submit.prevent="updateProfile" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      v-model="profileForm.firstName"
                      type="text"
                      id="firstName"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      v-model="profileForm.lastName"
                      type="text"
                      id="lastName"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    v-model="profileForm.email"
                    type="email"
                    id="email"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    v-model="profileForm.phone"
                    type="tel"
                    id="phone"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label for="dateOfBirth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    v-model="profileForm.dateOfBirth"
                    type="date"
                    id="dateOfBirth"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div class="flex justify-end">
                  <button
                    type="submit"
                    :disabled="isUpdating"
                    class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                  >
                    <span v-if="isUpdating">Updating...</span>
                    <span v-else>Update Profile</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Address Information -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b">
              <h2 class="text-xl font-semibold text-gray-900">Default Address</h2>
            </div>
            <div class="p-6">
              <form @submit.prevent="updateAddress" class="space-y-4">
                <div>
                  <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    v-model="addressForm.address"
                    type="text"
                    id="address"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                    <input
                      v-model="addressForm.city"
                      type="text"
                      id="city"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                    <input
                      v-model="addressForm.state"
                      type="text"
                      id="state"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label for="zipCode" class="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      v-model="addressForm.zipCode"
                      type="text"
                      id="zipCode"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div class="flex justify-end">
                  <button
                    type="submit"
                    :disabled="isUpdatingAddress"
                    class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                  >
                    <span v-if="isUpdatingAddress">Updating...</span>
                    <span v-else>Update Address</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Change Password -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b">
              <h2 class="text-xl font-semibold text-gray-900">Change Password</h2>
            </div>
            <div class="p-6">
              <form @submit.prevent="changePassword" class="space-y-4">
                <div>
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    v-model="passwordForm.currentPassword"
                    type="password"
                    id="currentPassword"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    v-model="passwordForm.newPassword"
                    type="password"
                    id="newPassword"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    id="confirmPassword"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div class="flex justify-end">
                  <button
                    type="submit"
                    :disabled="isChangingPassword || !isPasswordFormValid"
                    class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                  >
                    <span v-if="isChangingPassword">Changing...</span>
                    <span v-else>Change Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Account Actions -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b">
              <h2 class="text-xl font-semibold text-gray-900">Account Actions</h2>
            </div>
            <div class="p-6 space-y-4">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-medium text-gray-900">Download Data</h3>
                  <p class="text-sm text-gray-600">Download a copy of your account data</p>
                </div>
                <button
                  @click="downloadData"
                  class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Download
                </button>
              </div>
              
              <div class="flex justify-between items-center pt-4 border-t">
                <div>
                  <h3 class="font-medium text-red-600">Delete Account</h3>
                  <p class="text-sm text-gray-600">Permanently delete your account and data</p>
                </div>
                <button
                  @click="deleteAccount"
                  class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'Profile',
  setup() {
    const authStore = useAuthStore()
    
    const isUpdating = ref(false)
    const isUpdatingAddress = ref(false)
    const isChangingPassword = ref(false)
    
    const user = computed(() => authStore.user)
    
    const profileForm = reactive({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    })
    
    const addressForm = reactive({
      address: '',
      city: '',
      state: '',
      zipCode: ''
    })
    
    const passwordForm = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    
    const profileStats = reactive({
      totalOrders: 3,
      totalSpent: 4997.00,
      memberSince: 'Jan 2025'
    })
    
    const isPasswordFormValid = computed(() => {
      return passwordForm.currentPassword && 
             passwordForm.newPassword && 
             passwordForm.confirmPassword &&
             passwordForm.newPassword === passwordForm.confirmPassword &&
             passwordForm.newPassword.length >= 8
    })

    const updateProfile = async () => {
      isUpdating.value = true
      try {
        // TODO: Implement API call to update profile
        console.log('Updating profile:', profileForm)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        alert('Profile updated successfully!')
      } catch (error) {
        console.error('Error updating profile:', error)
        alert('Failed to update profile. Please try again.')
      } finally {
        isUpdating.value = false
      }
    }

    const updateAddress = async () => {
      isUpdatingAddress.value = true
      try {
        // TODO: Implement API call to update address
        console.log('Updating address:', addressForm)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        alert('Address updated successfully!')
      } catch (error) {
        console.error('Error updating address:', error)
        alert('Failed to update address. Please try again.')
      } finally {
        isUpdatingAddress.value = false
      }
    }

    const changePassword = async () => {
      if (!isPasswordFormValid.value) {
        alert('Please fill in all fields correctly. New password must be at least 8 characters.')
        return
      }

      isChangingPassword.value = true
      try {
        // TODO: Implement API call to change password
        console.log('Changing password')
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Clear form
        Object.assign(passwordForm, {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        
        alert('Password changed successfully!')
      } catch (error) {
        console.error('Error changing password:', error)
        alert('Failed to change password. Please try again.')
      } finally {
        isChangingPassword.value = false
      }
    }

    const downloadData = () => {
      // TODO: Implement data download
      alert('Data download will be available soon!')
    }

    const deleteAccount = () => {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
          // TODO: Implement account deletion
          alert('Account deletion will be available soon!')
        }
      }
    }

    const loadProfileData = () => {
      // Load user data into forms
      if (user.value) {
        profileForm.firstName = user.value.firstName || ''
        profileForm.lastName = user.value.lastName || ''
        profileForm.email = user.value.email || ''
        profileForm.phone = user.value.phone || ''
        profileForm.dateOfBirth = user.value.dateOfBirth || ''
      }
    }

    onMounted(() => {
      loadProfileData()
    })

    return {
      user,
      profileForm,
      addressForm,
      passwordForm,
      profileStats,
      isUpdating,
      isUpdatingAddress,
      isChangingPassword,
      isPasswordFormValid,
      updateProfile,
      updateAddress,
      changePassword,
      downloadData,
      deleteAccount
    }
  }
}
</script>

<style scoped>
/* Additional styles if needed */
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
