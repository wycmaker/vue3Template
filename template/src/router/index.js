import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
/*==========Layout==========*/
import Header from '@/layouts/Header'

import Login from '@/pages/Login'
import Index from '@/pages/Index'

const routes = [
  {
    path: '/',
    components: {
      default: Index,
      header: Header
    }
  },
  {
    path: '/Login',
    components: {
      default: Login,
    }
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

export default router
