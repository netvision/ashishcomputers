import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import 'virtual:uno.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth store
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app') 