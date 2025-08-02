<template>
  <div class="product-image-carousel">
    <!-- Main Image Display -->
    <div class="main-image-container relative">
      <img
        :src="currentImage.url"
        :alt="currentImage.alt"
        class="w-full h-96 object-cover rounded-lg shadow-lg"
        @error="handleImageError"
      />
      
      <!-- Navigation Arrows -->
      <button
        v-if="images.length > 1"
        @click="previousImage"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <button
        v-if="images.length > 1"
        @click="nextImage"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      <!-- Image Counter -->
      <div v-if="images.length > 1" class="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
    </div>

    <!-- Thumbnail Navigation -->
    <div v-if="images.length > 1" class="thumbnail-container mt-4">
      <div class="flex space-x-2 overflow-x-auto pb-2">
        <button
          v-for="(image, index) in images"
          :key="getImageId(image, index)"
          @click="setCurrentImage(index)"
          :class="[
            'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
            currentIndex === index
              ? 'border-blue-500 shadow-lg'
              : 'border-gray-200 hover:border-gray-300'
          ]"
        >
          <img
            :src="getImageUrl(image)"
            :alt="getImageAlt(image)"
            class="w-full h-full object-cover"
            @error="handleThumbnailError"
          />
        </button>
      </div>
    </div>

    <!-- Zoom Modal -->
    <div
      v-if="showZoom"
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      @click="closeZoom"
    >
      <div class="max-w-4xl max-h-4xl p-4">
        <img
          :src="currentImage.url"
          :alt="currentImage.alt"
          class="max-w-full max-h-full object-contain"
          @click.stop
        />
        <button
          @click="closeZoom"
          class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Click to Zoom Text -->
    <p class="text-center text-sm text-gray-500 mt-2 cursor-pointer" @click="openZoom">
      Click image to zoom
    </p>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'

export default {
  name: 'ProductImageCarousel',
  props: {
    images: {
      type: Array,
      default: () => []
    },
    productId: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const currentIndex = ref(0)
    const showZoom = ref(false)

    const currentImage = computed(() => {
      if (props.images.length === 0) {
        return {
          id: 0,
          url: `https://picsum.photos/400/300?random=${props.productId}`,
          alt: 'Product Image',
          is_primary: true
        }
      }
      
      const rawImage = props.images[currentIndex.value] || props.images[0]
      
      // Handle both string URLs and image objects
      if (typeof rawImage === 'string') {
        return {
          id: currentIndex.value,
          url: rawImage,
          alt: 'Product Image',
          is_primary: currentIndex.value === 0
        }
      } else {
        // It's already an object
        return rawImage
      }
    })

    const setCurrentImage = (index) => {
      currentIndex.value = index
    }

    const nextImage = () => {
      currentIndex.value = (currentIndex.value + 1) % props.images.length
    }

    const previousImage = () => {
      currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
    }

    const openZoom = () => {
      showZoom.value = true
    }

    const closeZoom = () => {
      showZoom.value = false
    }

    const handleImageError = (event) => {
      event.target.src = `https://picsum.photos/400/300?random=${props.productId}`
    }

    const handleThumbnailError = (event) => {
      event.target.src = `https://picsum.photos/80/80?random=${props.productId}`
    }

    const getImageUrl = (image) => {
      return typeof image === 'string' ? image : image.url
    }

    const getImageAlt = (image) => {
      return typeof image === 'string' ? 'Product Image' : (image.alt || 'Product Image')
    }

    const getImageId = (image, index) => {
      return typeof image === 'string' ? index : (image.id || index)
    }

    // Keyboard navigation
    const handleKeyPress = (event) => {
      if (showZoom.value) {
        if (event.key === 'Escape') {
          closeZoom()
        } else if (event.key === 'ArrowLeft') {
          previousImage()
        } else if (event.key === 'ArrowRight') {
          nextImage()
        }
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeyPress)
    })

    // Watch for changes in images prop
    watch(() => props.images, () => {
      currentIndex.value = 0
    })

    return {
      currentIndex,
      currentImage,
      showZoom,
      setCurrentImage,
      nextImage,
      previousImage,
      openZoom,
      closeZoom,
      handleImageError,
      handleThumbnailError,
      getImageUrl,
      getImageAlt,
      getImageId
    }
  }
}
</script>

<style scoped>
.thumbnail-container {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.thumbnail-container::-webkit-scrollbar {
  height: 6px;
}

.thumbnail-container::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}

.thumbnail-container::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.thumbnail-container::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
