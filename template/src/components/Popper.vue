<template>
  <el-popover :placement="placement" :width="width" :trigger="trigger">
    <template #reference>
      <slot name="trigger"></slot>
      <!-- <el-icon :class="$style['popper-icon']"><WarningFilled /></el-icon> -->
    </template>
    <template #default>
      <div :class="$style.popper">
        <el-scrollbar>
          <slot name="content"></slot>
          <!-- <a style="text-decoration: none" href="/Login" v-for="(item, index) in gridData" :key="item"><p>test{{ index }}</p></a> -->
        </el-scrollbar>
      </div>
    </template>
  </el-popover>
</template>

<script>
export default {
  props: {
    trigger: {
      type: String,
      default: 'click'
    },
    width: {
      type: Number,
      default: 200
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  },
  setup(props, { emit }) {
    /*==========Data and Props==========*/
    const trigger = toRef(props, 'trigger')
    const width = toRef(props, 'width')
    const placement = toRef(props, 'placement')

    return { trigger, width, placement }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";
</style>