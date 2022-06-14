<template>
  <div :class="[$style['query-item']]">
    <el-button :class="$style['btn-B']" v-if="show[0]" @click="getList">
      <el-icon :size="18"><Search /></el-icon>
    </el-button>
    <el-button :class="$style['btn-B']" v-if="show[1]" @click="createData">
      <el-icon :size="18"><DocumentAdd /></el-icon>
      &nbsp;新增
    </el-button>
    <el-button :class="$style['btn-B']" v-if="show[2]" @click="exportList" > 
      <el-icon :size="18"><Download /></el-icon>
      &nbsp;匯出
    </el-button>
  </div>
</template>

<script>
import { toRef } from 'vue'
export default {
  props: {
    show: {
      type: Array,
      default: () => {
        return [true, true, false]
      }
    }
  },
  setup(props, { emit }) {
    /*==========Data and Props==========*/
    const show = toRef(props, 'show')

    /*==========Method==========*/
    const exportList = () => { emit('export') }
    const createData = () => { emit('add', null) }
    const getList = () => { emit('getData', false) }


    return { show, exportList, createData, getList }
  }
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';
</style>
