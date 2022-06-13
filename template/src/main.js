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
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

/* #endregion */

routerProcess()

const app = createApp(App)
  .use(Toast)
  .use(ElementPlus, {
    locale
  })
  .use(store)
  .use(router)

/* #region 設定全域變數 */

app.config.globalProperties.$service = services
app.config.globalProperties.$api = apis

/* #endregion */

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')