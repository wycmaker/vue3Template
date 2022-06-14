import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Login from '@/pages/Login'
import Index from '@/pages/Index'

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/Login',
    component: Login
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

export default router
