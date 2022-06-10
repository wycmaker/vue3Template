<template>
  <div>
    <p>{{ loading === false ? '未載入' : '已載入' }}</p>
    <button @click="click">click</button>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue"

export default {
  setup() {
    const { proxy: _self } = getCurrentInstance()

    const loading = ref(false)
    const loginAttr = reactive({
      account: null,
      password: null
    })

    const click = () => {
      _self.$service.info.success('test')
    }

    return { loading, loginAttr, click }
  }
}
</script>

<style>

</style>