<template>
  <div :class="$style.center">
    <el-button :class="$style['btn-B']" :disabled="disable[0]" v-if="show[0]" @click="updateItem(scope.$index)">
      <el-icon><EditPen /></el-icon>
    </el-button>
    <el-button :class="$style['btn-B']" :disabled="disable[1]" v-if="show[1]" @click="watchItem(scope.$index)">
      <el-icon><View /></el-icon>
    </el-button>
    <el-button :class="(isDelete == true) ? $style['btn-C'] : $style['btn-E']" :disabled="disable[2]" v-if="show[2]" @click="deleteItem(scope.$index)">
      <el-icon v-if="isDelete">
        <Delete />
      </el-icon>
      <el-icon v-else>
        <Setting />
      </el-icon>
    </el-button>
  </div>
</template>

<script>
import { toRef } from 'vue'
export default {
  props: {
    scope: {
      type: Object,
    },
    show: {
      type: Array,
      default: () => {
        return [true, true, false]
      }
    },
    disable: {
      type: Array,
      default: () => {
        return [false, false, false]
      }
    },
    isDelete: {
      type: Boolean,
      dafault: true
    }
  },
  setup(props, { emit }) {
    /*==========Data and Props*/
    const scope = toRef(props, 'scope')
    const show = toRef(props, 'show')
    const disable = toRef(props, 'disable')
    const isDelete = toRef(props, 'isDelete')

    /*==========Medthod==========*/
    /**
     * 按下修改按鈕
     * @param {number} index 陣列索引值
     */
    const updateItem = (index) => {
      emit('update', index)
    }

    /**
     * 按下刪除按鈕
     * @param {number} index 陣列索引值
     */
    const deleteItem = (index) => {
      emit('delete', index)
    }

    /**
     * 按下檢視按鈕
     * @param {number} index 陣列索引值
     */
    const watchItem = (index) => {
      emit('watch', index)
    }

    return { scope, show, disable, isDelete, updateItem, deleteItem, watchItem }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";
</style>