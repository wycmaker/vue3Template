import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
/*==========Layout==========*/
const Header = () => import('@/layouts/Header')
const Sidemenu = () => import('@/layouts/Sidemenu')
/*==========Page==========*/
const Login = () => import('@/pages/Login')
const Index = () => import('@/pages/Index')

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
