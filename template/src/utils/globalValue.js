import { getCurrentInstance } from 'vue'

export function getPrototype() {
  const { proxy } = getCurrentInstance()
  return { ...proxy.$service, api: proxy.$api }
}