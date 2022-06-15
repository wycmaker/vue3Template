import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
/*==========Layout==========*/
import Header from '@/layouts/Header'
import Sidemenu from '@/layouts/Sidemenu'

import Login from '@/pages/Login'
import Index from '@/pages/Index'

const routes = [
  {
    path: '/',
    components: {
      default: Index,
      header: Header,
      sidemenu: Sidemenu
    }
  },
  {
    path: '/Login',
    components: {
      default: Login,
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/'
  }
]

const router = createRouter({
  history: (process.env.NODE_ENV === 'development') ? createWebHashHistory() : createWebHistory(process.env.BASE_URL),
  routes
})

export default router
