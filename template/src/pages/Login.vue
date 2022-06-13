<template>
  <div>
    <p>{{ loading === false ? '未載入' : '已載入' }}</p>
    <button @click="click">click</button>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
import { getPrototype } from '@/utils/globalValue'

export default {
  setup() {
    const { common, info} = getPrototype()

    const loading = ref(false)
    const loginAttr = reactive({
      account: null,
      password: null
    })

    const click = () => {
      info.success('test')
    }

    return { loading, loginAttr, click }
  }
}
</script>

<style>

</style>