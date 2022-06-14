<template>
  <div :class="[$style['query-item']]">
    <label>{{title}}</label>
    <el-date-picker
      v-model="startDateValue"
      type="date"
      value-format="YYYY/MM/DD"
      format="YYYY-MM-DD"
      :clearable="true"
      @change="startChange"
      placeholder="">
    </el-date-picker>
    <label>到</label>
    <el-date-picker
      v-model="endDateValue"
      type="date"
      value-format="YYYY/MM/DD"
      format="YYYY-MM-DD"
      :clearable="false"
      @change="endChange"
      :disabled-date="endOption"
      placeholder="">
    </el-date-picker>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useVModel } from '@/utils'

export default {
  emits: ['update:startDate', 'update:endDate'],
  props: {
    startDate: {
      type: String,
      default: null
    },
    endDate: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  },
  setup(props) {
    /*==========Data and Props==========*/
    const { title } = props
    const startDateValue = useVModel(props, 'startDate')
    const endDateValue = useVModel(props, 'endDate')
    const endOption = reactive((time) => {
      if(startDateValue.value === null) return null 
      else {
        return new Date(startDateValue.value).getTime() > (time.getTime())
      } 
    })

    /*==========Method==========*/
    /**
     * 開始日期改變
     * @param {Date} val 日期
     */
    const startChange = (val) => {
      if(val !== null) {
        if(endDateValue.value === null) {
          endDateValue.value = new Date(val).toString('/')
        }
        else if(endDateValue.value !== null && new Date(val).getTime() > new Date(endDateValue.value).getTime()) {
          endDateValue.value = new Date(val).toString('/')
        }
      } else endDateValue.value = null
    }

    /**
     * 結束日期改變
     * @param {Date} val 日期
     */
    const endChange = (val) => {
      if(val !== null && startDateValue.value === null) startDateValue.value = new Date(val).toString('/')
    }

    return { startDateValue, endDateValue, title, endOption, startChange, endChange }
  }
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';
</style>