<template>
  <div :class="[$style.query]">
    <template v-for="item in options">
      <date-range-picker 
        :title="item.title"
        v-model:startDate="query[item.option[0]]"
        v-model:endDate="query[item.option[1]]"
        :key="item.option" 
        v-if="item.type === 'date'"
      ></date-range-picker>
      <div :class="[$style['query-item']]" :key="item.option" v-else-if="item.type === 'input'">
        <label>{{ item.title }}</label>
        <el-input v-model="query[item.option[0]]" placeholder="" clearable></el-input>
      </div>
      <div :class="[$style['query-item']]" :key="item.option" v-else-if="item.type === 'select'">
        <label>{{ item.title }}</label>
        <el-select 
          v-model="query[item.option[0]]" 
          placeholder="" 
          :clearable="(item.clearable !== undefined) ? item.clearable : true" 
          filterable 
          :multiple="item.ismultiple"
        >
          <el-option 
            v-for="option in item.selectOptions" 
            :key="option.value" 
            :label="option.label" 
            :value="option.value"
          ></el-option>
        </el-select>
      </div>
      <query-button-group 
        :show="item.show" 
        @getData="getData" 
        @export="exportList" 
        @add="addData" 
        :key="item" 
        v-else
      ></query-button-group>
    </template>
  </div>
</template>

<script>
import DateRangePicker from '@/components/Query/DateRangePicker.vue'
import QueryButtonGroup from '@/components/Query/QueryButtonGroup.vue'

export default {
  components: { DateRangePicker, QueryButtonGroup },
  props: {
    queryData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    queryOptions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, { emit }) {
    /*==========Data and Props*/
    const query = useVModel(props, 'queryData')
    const options = useVModel(props, 'queryOptions')

    /*==========Method==========*/
    /**
     * 搜尋按鈕
     */
    const getData = () => {
      emit('getData', false)
    }

    /**
     * 新增按鈕
     */
    const addData = () => {
      emit('add', null)
    }

    /**
     * 匯出資料
     */
    const exportList = () => {
      emit('export')
    }

    return { query, options, getData, addData, exportList }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";
</style>