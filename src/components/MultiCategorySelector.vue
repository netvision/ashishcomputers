<template>
  <div class="multi-category-selector">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <!-- Selected Categories Display -->
    <div v-if="selectedCategories.length > 0" class="selected-categories mb-3">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="category in selectedCategories"
          :key="category.id"
          :class="[
            'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
            category.is_primary
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : 'bg-gray-100 text-gray-800 border border-gray-200'
          ]"
        >
          {{ category.name }}
          <span v-if="category.is_primary" class="ml-1 text-xs">(Primary)</span>
          <button
            @click="removeCategory(category.id)"
            class="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
          >
            ×
          </button>
        </span>
      </div>
    </div>

    <!-- Category Selection Dropdown -->
    <div class="relative">
      <div
        @click="toggleDropdown"
        class="input-field cursor-pointer flex justify-between items-center"
      >
        <span class="text-gray-500">
          {{ selectedCategories.length === 0 ? 'Select categories...' : `${selectedCategories.length} categories selected` }}
        </span>
        <svg
          :class="['w-5 h-5 text-gray-400 transition-transform', { 'rotate-180': isOpen }]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      <!-- Dropdown Menu -->
      <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
      >
        <div class="p-2">
          <!-- Search Input -->
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search categories..."
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <!-- Category Options -->
        <div class="py-1">
          <div
            v-for="category in filteredCategories"
            :key="category.id"
            @click="toggleCategory(category)"
            :class="[
              'flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-50',
              isCategorySelected(category.id) ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
            ]"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                :checked="isCategorySelected(category.id)"
                class="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                @click.stop
              />
              <span>{{ category.name }}</span>
            </div>
            
            <!-- Primary Category Button -->
            <button
              v-if="isCategorySelected(category.id)"
              @click.stop="setPrimaryCategory(category.id)"
              :class="[
                'text-xs px-2 py-1 rounded',
                isPrimaryCategory(category.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-blue-200'
              ]"
            >
              {{ isPrimaryCategory(category.id) ? 'Primary' : 'Set Primary' }}
            </button>
          </div>
          
          <!-- No Results Message -->
          <div v-if="filteredCategories.length === 0" class="px-4 py-2 text-sm text-gray-500">
            No categories found
          </div>
        </div>
      </div>
    </div>

    <!-- Help Text -->
    <p v-if="helpText" class="mt-1 text-sm text-gray-500">{{ helpText }}</p>
    
    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

export default {
  name: 'MultiCategorySelector',
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: 'Categories'
    },
    required: {
      type: Boolean,
      default: false
    },
    helpText: {
      type: String,
      default: 'Select one or more categories. Set one as primary.'
    },
    error: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue', 'primary-changed'],
  setup(props, { emit }) {
    const isOpen = ref(false)
    const searchQuery = ref('')

    const selectedCategories = computed(() => {
      return props.modelValue.map(selectedId => {
        const category = props.categories.find(cat => cat.id === selectedId.id || cat.id === selectedId)
        return {
          id: selectedId.id || selectedId,
          name: category?.name || 'Unknown Category',
          is_primary: selectedId.is_primary || false
        }
      })
    })

    const filteredCategories = computed(() => {
      if (!searchQuery.value) {
        return props.categories
      }
      return props.categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
      if (isOpen.value) {
        searchQuery.value = ''
      }
    }

    const closeDropdown = () => {
      isOpen.value = false
    }

    const isCategorySelected = (categoryId) => {
      return selectedCategories.value.some(cat => cat.id === categoryId)
    }

    const isPrimaryCategory = (categoryId) => {
      const category = selectedCategories.value.find(cat => cat.id === categoryId)
      return category?.is_primary || false
    }

    const toggleCategory = (category) => {
      if (isCategorySelected(category.id)) {
        removeCategory(category.id)
      } else {
        addCategory(category)
      }
    }

    const addCategory = (category) => {
      const newSelection = [...props.modelValue]
      const isPrimary = newSelection.length === 0 // First category becomes primary

      newSelection.push({
        id: category.id,
        is_primary: isPrimary
      })

      emit('update:modelValue', newSelection)
      
      if (isPrimary) {
        emit('primary-changed', category.id)
      }
    }

    const removeCategory = (categoryId) => {
      const newSelection = props.modelValue.filter(cat => 
        (cat.id || cat) !== categoryId
      )
      
      // If we removed the primary category, make the first remaining one primary
      const wasPrimary = props.modelValue.find(cat => 
        (cat.id || cat) === categoryId && (cat.is_primary || false)
      )
      
      if (wasPrimary && newSelection.length > 0) {
        newSelection[0].is_primary = true
        emit('primary-changed', newSelection[0].id || newSelection[0])
      }

      emit('update:modelValue', newSelection)
    }

    const setPrimaryCategory = (categoryId) => {
      const newSelection = props.modelValue.map(cat => ({
        id: cat.id || cat,
        is_primary: (cat.id || cat) === categoryId
      }))

      emit('update:modelValue', newSelection)
      emit('primary-changed', categoryId)
    }

    // Click outside to close dropdown
    const handleClickOutside = (event) => {
      if (!event.target.closest('.multi-category-selector')) {
        closeDropdown()
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isOpen,
      searchQuery,
      selectedCategories,
      filteredCategories,
      toggleDropdown,
      closeDropdown,
      isCategorySelected,
      isPrimaryCategory,
      toggleCategory,
      removeCategory,
      setPrimaryCategory
    }
  }
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
