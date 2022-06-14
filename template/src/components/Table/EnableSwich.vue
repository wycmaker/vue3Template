<template>
  <div>
    <el-switch
      v-model="enableValue"
      active-color="#81C6AA"
      inactive-color="#809B8D"
      :active-text="switchText[0]"
      :inactive-text="switchText[1]"
      @change="onChange"
      :disabled="disabled"
      :class="$style.switch"
    >
    </el-switch>
  </div>
</template>

<script>
import { useVModel } from '@/utils'

export default {
  props: {
    enable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    switchText: {
      type: Array,
      default: () => { return [ '啟用', '停用'] }
    }
  },
  setup(props, { emit }) {
    /*==========Data and Props==========*/
    const enableValue = useVModel(props, 'enable')
    const { disabled } = props
    const { switchText } = props

    /*==========Method==========*/
    /**
     * switch改變事件
     */
    const onChange = () => {
      emit('change')
    }

    return { enableValue, disabled, switchText, onChange }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  @include switch-setting($switch-active, $switch-unactive, $switch-default);
</style>