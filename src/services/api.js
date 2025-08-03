import axios from 'axios'

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  // Use environment variable if available, otherwise fallback to defaults
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  
  if (apiBaseUrl) {
    return `${apiBaseUrl}/api/v1`
  }
  
  if (import.meta.env.DEV) {
    // Development environment - use proxy to avoid CORS issues
    return '/api/v1'
  } else {
    // Production environment fallback
    return 'https://computers.netserve.in/api/v1'
  }
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    } else if (error.response?.status === 403) {
      // Forbidden - might be CORS or permissions
      error.userMessage = 'Access denied. Please check if you have permission to access this resource.'
    } else if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      // Network or CORS error
      error.userMessage = 'Unable to connect to the API server. Please check if the server is running and CORS is configured properly.'
    }
    
    return Promise.reject(error)
  }
)

// API methods for enhanced e-commerce features
export const productApi = {
  // Get all products with enhanced features
  getProducts(params = {}) {
    return api.get('/products', { params })
  },
  
  // Get product by ID with enhanced data
  getProduct(id) {
    return api.get(`/products/${id}`)
  },
  
  // Get all categories
  getCategories() {
    return api.get('/products/categories')
  },
  
  // Create product (with multi-features)
  createProduct(productData) {
    return api.post('/products/create', productData)
  },
  
  // Update product
  updateProduct(id, productData) {
    return api.put(`/products/update/${id}`, productData)
  },
  
  // Delete product
  deleteProduct(id) {
    return api.delete(`/products/delete/${id}`)
  },

  // Upload images
  uploadImages(formData) {
    return api.post('/products/upload-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // Brand management
  getBrands() {
    return api.get('/products/brands')
  },
  
  createBrand(brandData) {
    return api.post('/products/create-brand', brandData)
  },
  
  updateBrand(id, brandData) {
    return api.put(`/products/update-brand/${id}`, brandData)
  },
  
  deleteBrand(id) {
    return api.delete(`/products/delete-brand/${id}`)
  }
}

export const categoryApi = {
  // Get all categories
  getCategories() {
    return api.get('/products/categories')
  },
  
  // Create category
  createCategory(categoryData) {
    return api.post('/products/create-category', categoryData)
  },
  
  // Update category
  updateCategory(id, categoryData) {
    return api.put(`/products/update-category/${id}`, categoryData)
  },
  
  // Delete category
  deleteCategory(id) {
    return api.delete(`/products/delete-category/${id}`)
  }
}

export const userApi = {
  // User login
  login(credentials) {
    return api.post('/auth/login', credentials)
  },
  
  // Enhanced user registration
  register(userData) {
    return api.post('/user/register', userData)
  },
  
  // Get user profile
  getProfile() {
    return api.get('/user/profile')
  },
  
  // Update user profile
  updateProfile(userData) {
    return api.put('/user/update-profile', userData)
  },
  
  // Change password
  changePassword(passwordData) {
    return api.post('/user/changepassword', passwordData)
  },
  
  // Get user types for registration and profile
  getUserTypes() {
    return api.get('/user/types')
  }
}

// Admin user management API
export const adminUserApi = {
  // Get all users with filtering and pagination
  getUsers(params = {}) {
    return api.get('/user', { params })
  },
  
  // Get user by ID
  getUser(id) {
    return api.get(`/user/view/${id}`)
  },
  
  // Create new user
  createUser(userData) {
    return api.post('/user/create', userData)
  },
  
  // Update user
  updateUser(id, userData) {
    return api.put(`/user/update/${id}`, userData)
  },
  
  // Delete user
  deleteUser(id) {
    return api.delete(`/user/delete/${id}`)
  },
  
  // Toggle user status (enable/disable)
  toggleUserStatus(userId) {
    return api.post('/user/togglestatus', { user_id: userId })
  },
  
  // Make user admin
  makeAdmin(userId) {
    return api.post('/user/makeadmin', { user_id: userId })
  },
  
  // Get all user types
  getUserTypes() {
    return api.get('/user/types')
  },
  
  // Admin change user password
  adminChangePassword(userId, newPassword) {
    return api.post('/user/adminchangepassword', { 
      user_id: userId, 
      new_password: newPassword 
    })
  },
  
  // Update user type assignment (Admin function)
  updateUserType(userId, userTypeId) {
    return api.put(`/user/update/${userId}`, { 
      user_type_id: userTypeId 
    })
  }
}

// Order API methods
export const orderApi = {
  // Get all orders (admin) or user's orders
  getOrders(params = {}) {
    return api.get('/orders', { params })
  },
  
  // Get specific order by ID
  getOrder(id) {
    return api.get(`/orders/${id}`)
  },
  
  // Create new order
  createOrder(orderData) {
    return api.post('/orders', orderData)
  },
  
  // Update order (admin only)
  updateOrder(id, orderData) {
    return api.put(`/orders/${id}`, orderData)
  },
  
  // Update order status (admin only)
  updateOrderStatus(id, status) {
    return api.patch(`/orders/${id}/status`, { status })
  },
  
  // Cancel order
  cancelOrder(id) {
    return api.patch(`/orders/${id}/cancel`)
  },
  
  // Get order statistics (admin only)
  getOrderStats(params = {}) {
    return api.get('/orders/stats', { params })
  }
}

export default api 