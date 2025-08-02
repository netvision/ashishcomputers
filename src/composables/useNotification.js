import { reactive } from 'vue'

// Notification store
const state = reactive({
  notifications: []
})

// Notification service
export const useNotification = () => {
  let id = 0

  const addNotification = (notification) => {
    const newNotification = {
      id: ++id,
      type: 'info',
      duration: 5000,
      ...notification,
      timestamp: Date.now()
    }
    
    state.notifications.push(newNotification)
    
    // Auto remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, newNotification.duration)
    }
    
    return newNotification.id
  }

  const removeNotification = (id) => {
    const index = state.notifications.findIndex(n => n.id === id)
    if (index > -1) {
      state.notifications.splice(index, 1)
    }
  }

  const clearAll = () => {
    state.notifications.splice(0)
  }

  // Convenience methods
  const success = (title, message = '', duration = 3000) => {
    return addNotification({ type: 'success', title, message, duration })
  }

  const error = (title, message = '', duration = 5000) => {
    return addNotification({ type: 'error', title, message, duration })
  }

  const warning = (title, message = '', duration = 4000) => {
    return addNotification({ type: 'warning', title, message, duration })
  }

  const info = (title, message = '', duration = 3000) => {
    return addNotification({ type: 'info', title, message, duration })
  }

  return {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  }
}
