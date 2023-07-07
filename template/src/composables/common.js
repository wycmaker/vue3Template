import { ref, reactive, onMounted, provide, inject, toRef, toRefs, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as signalR from '@microsoft/signalr'

/**
 * @description: 取得Vuex的store物件
 * @return {object}
 */
const getStore = () => {
  const store = useStore()
  return store
}

/**
 * @description: 取得Vue-Router的router物件
 * @return {object}
 */
const getRouter = () => {
  const router = useRouter()
  return router
}

/**
 * @description: 取得Vue-Router的route物件
 * @return {object}
 */
const getRoute = () => {
  const route = useRoute()
  return route
}

  /**
   * @description: 取得共用變數
   * @return {object}
   */
const getProperties = () => {
  const app = getCurrentInstance()
  return app.appContext.config.globalProperties
}

export const Common = { getStore, getRouter, getRoute, ref, reactive, onMounted, provide, inject, toRef, toRefs, computed, getProperties }

/**
 * @description: 撰寫共用的computed函式
 * @param {array} props 欄位列表
 * @param {string} propName 欄位名稱
 * @return {function}
 */
export const useVModel = (props, propName) => {
  const vm = getCurrentInstance().proxy

  return computed({
    get() {
      return props[propName]
    },
    set(value) {
      vm.$emit(`update:${propName}`, value)
    },
  })
}

/**
 * @description: 設定SignalR連線與收取資料相關函數
 * @return {object}
 */
export const useSignalR = () => {
  const store = getStore()

  const hubUrl = process.env.VUE_APP_SIGNALR_HUB
  const connection = new signalR.HubConnectionBuilder().withAutomaticReconnect().withUrl(hubUrl).build()

  connection.start().catch(err => console.log(err));

  /* #region SignalR 接收函數 */

  connection.on('Show', msg => {
    store.commit('addmessage', msg)
  })

  /* #endregion */

  /* #region SignalR 傳送函數 */

  const send = () => {
    connection.invoke("SendMsg", "hello");
  }

  /* #endregion */

  return { send }
}

