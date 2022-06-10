import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },
  {
    path: '/Login',
    name: 'home',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
