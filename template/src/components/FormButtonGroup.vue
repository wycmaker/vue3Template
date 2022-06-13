<template>
  <div :class="$style.center">
    <el-button :class="$style['btn-B']" @click="confirm">確定</el-button>
    <el-button :class="$style['btn-C']" @click="cancel">取消</el-button>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    /**
     * 按下確定按鈕
     */
    const confirm = () => {
      emit('confirm')
    }

    /**
     * 按下取消按紐
     */
    const cancel = () => {
      emit('cancel')
    }

    return { confirm, cancel }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .center {
    margin-top: 10px;
  }
</style>