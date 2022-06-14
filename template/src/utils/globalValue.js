import { getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export const getPrototype = () => {
  const { proxy } = getCurrentInstance()
  return { ...proxy.$service, api: proxy.$api }
}

export const getStore = () => {
  const store = useStore()
  return store
}

export const getRouter = () => {
  const router = useRouter()
  return router
}