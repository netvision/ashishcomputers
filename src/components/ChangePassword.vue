<template>
  <div class="change-password">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Change Password</h2>
      <p class="text-gray-600 mt-2">Update your account password for better security</p>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <form @submit.prevent="changePassword" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Current Password *
          </label>
          <input
            v-model="passwordForm.currentPassword"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            New Password *
          </label>
          <input
            v-model="passwordForm.newPassword"
            type="password"
            required
            minlength="8"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter new password (minimum 8 characters)"
            @input="validatePassword"
          />
          <div class="mt-2 text-sm text-gray-600">
            Password must be at least 8 characters long
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password *
          </label>
          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Confirm new password"
            @input="validatePassword"
          />
          <div v-if="passwordForm.confirmPassword && !passwordsMatch" class="mt-2 text-sm text-red-600">
            Passwords do not match
          </div>
          <div v-if="passwordForm.confirmPassword && passwordsMatch" class="mt-2 text-sm text-green-600">
            Passwords match
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            :disabled="!isFormValid || isChangingPassword"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i v-if="isChangingPassword" class="fas fa-spinner fa-spin mr-2"></i>
            {{ isChangingPassword ? 'Changing Password...' : 'Change Password' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Password Strength Tips -->
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
      <h3 class="text-sm font-medium text-yellow-800 mb-2">Password Security Tips:</h3>
      <ul class="text-sm text-yellow-700 space-y-1">
        <li>• Use at least 8 characters</li>
        <li>• Include uppercase and lowercase letters</li>
        <li>• Add numbers and special characters</li>
        <li>• Avoid common words or personal information</li>
        <li>• Don't reuse passwords from other accounts</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { userApi } from '@/services/api'

// Reactive data
const isChangingPassword = ref(false)

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Computed properties
const passwordsMatch = computed(() => {
  return passwordForm.value.newPassword === passwordForm.value.confirmPassword
})

const isPasswordValid = computed(() => {
  return passwordForm.value.newPassword.length >= 8
})

const isFormValid = computed(() => {
  return (
    passwordForm.value.currentPassword &&
    passwordForm.value.newPassword &&
    passwordForm.value.confirmPassword &&
    passwordsMatch.value &&
    isPasswordValid.value
  )
})

// Methods
const validatePassword = () => {
  // This method is called on input to trigger reactive validation
  // The actual validation is handled by computed properties
}

const resetForm = () => {
  Object.assign(passwordForm.value, {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
}

const changePassword = async () => {
  if (!isFormValid.value) {
    alert('Please fill in all fields correctly.')
    return
  }

  isChangingPassword.value = true
  try {
    const response = await userApi.changePassword({
      current_password: passwordForm.value.currentPassword,
      new_password: passwordForm.value.newPassword,
      confirm_password: passwordForm.value.confirmPassword
    })

    if (response.data.success) {
      alert('Password changed successfully!')
      resetForm()
    } else {
      alert('Error: ' + response.data.message)
    }
  } catch (error) {
    console.error('Error changing password:', error)
    const errorMessage = error.response?.data?.message || 'Failed to change password. Please try again.'
    alert('Error: ' + errorMessage)
  } finally {
    isChangingPassword.value = false
  }
}
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
