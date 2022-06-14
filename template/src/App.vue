<template>
  <router-view/>
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
