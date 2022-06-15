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
import { getStore } from '@/utils'
import { onMounted } from 'vue'
export default {
  setup() {
    const store = getStore()

    onMounted(() => {
      store.commit('setClientWidth', document.body.clientWidth)
      window.onresize = () => {
        store.commit('setClientWidth', document.body.clientWidth)
      }
    })
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
