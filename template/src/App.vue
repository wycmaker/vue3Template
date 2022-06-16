<template>
  <el-container :class="$style.main">
    <router-view name="sidemenu" @change="menuChange"></router-view>
    <el-container :class="(show === true) ? $style.open : $style.close">
      <el-header height="60px">
        <router-view name="header"></router-view>
      </el-header>
      <router-view ref="page"></router-view>
    </el-container>
  </el-container>
</template>
<script>
import * as utils from '@/utils'
import { ref, reactive, onMounted, provide, inject, toRef, toRefs, computed } from 'vue'

window.ref = ref
window.onMounted = onMounted
window.provide = provide
window.inject = inject
window.reactive = reactive
window.toRef = toRef
window.toRefs = toRefs
window.computed = computed


export default {
  setup() {
    /*==========Data and Props==========*/
    const page = ref(null)
    const show = ref(false)
    const store = utils.getStore()
    window.getStore = utils.getStore
    window.route = utils.getRoute()
    window.router = utils.getRouter()
    const { api, info, validator } = utils.getPrototype()
    window.info = info
    window.api = api
    window.validator = validator
    window.useVModel = utils.useVModel
    window.useSignalR = utils.useSignalR

    /*==========Method==========*/
    /**
     * 頁面重新整理
     */
    const reload = () => {
      page.backToList(true)
    }

    /**
     * Sidemenu顯示切換
     * @param {Boolean} val 是否顯示
     */
    const menuChange = (val) => {
      show.value = val
    }
    
    /*==========Mounted==========*/
    onMounted(() => {
      store.commit('setClientWidth', document.body.clientWidth)
      window.onresize = () => {
        store.commit('setClientWidth', document.body.clientWidth)
      }
    })

    provide('reloadPage', reload)

    return { page, show, menuChange }
  },
}
</script>

<style lang="scss" module>
@import "@/assets/css/custom.scss";

.main {
  @include background-image-setting(unset, 100vw, 100vh, 0);

  :global {
    .el-header {
      padding: 0px;
    }
  }
}

.open {
  width: calc(100vw - 210px);
  transition: width 0.4s;
}

.close {
  width: calc(100vw - 40px);
  transition: width 0.4s;
}
</style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
