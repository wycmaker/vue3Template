import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { routerProcess } from '@/services/routerProcess.js'
import { services } from '@/services'
import { apis } from '@/apiservices'


/* #region Toastr 設定 */

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

/* #endregion */

/* #region Element UI 設定 */

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'

/* #endregion */

routerProcess()

const app = createApp(App)
  .use(Toast)
  .use(ElementPlus, { locale })
  .use(store)
  .use(router)

app.config.globalProperties.$service = services
app.config.globalProperties.$api = apis

app.mount('#app')