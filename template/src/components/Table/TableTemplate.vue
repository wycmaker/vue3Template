<template>
  <div style="width: 100%">
    <!-- Table -->
    <template>
      <el-table :data="dataList" :border="border" :stripe="stripe" :class="classes" :max-height="height">
        <template v-for="item in columns">
          <el-table-column :label="item.label" :key="item.prop" width="65px" align="center" :prop="item.prop" v-if="item.type === 'index'"></el-table-column>
          <el-table-column :label="item.label" :key="item.prop" :width="item.width" align="center" :prop="item.prop" :fixed="item.fix" v-if="item.type === 'button'">
            <template #default="scope">
              <table-button-group 
                :scope="scope" 
                :show="item.show"
                :disable="item.disable"
                @update="(val) => emitEvent('update', val)"
                @delete="(val) => emitEvent('delete', val)"
                @watch="(val) => emitEvent('watch', val)"
              ></table-button-group>
            </template>
          </el-table-column>
          <el-table-column :label="item.label" :key="item.prop" :min-width="item.width" :prop="item.prop" :align="item.align" :class-name="$style[item.class]" v-else>
            <template #default="scope">
              <enable-switch 
                v-model:enable="scope.row[item.prop]" 
                :disabled="scope.row.disable" 
                @change="(val) => emitEvent('inputChange', scope.row)"
                v-if="item.type === 'switch'"
              ></enable-switch>
              <el-checkbox 
                v-model="scope.row[item.prop]" 
                :disabled="scope.row.disable" 
                @change="(val) => emitEvent('inputChange', scope.row)" 
                v-else-if="item.type === 'checkbox'"
              ></el-checkbox>
              <el-input 
                v-model="scope.row[item.prop]" 
                :disabled="scope.row.disable" 
                @change="(val) => emitEvent('inputChange', scope.row)" 
                v-else-if="item.type === 'input'"
              ></el-input>
              <el-input 
                v-model="scope.row[item.prop]" 
                :disabled="scope.row.disable" 
                type="textarea" :rows="item.rows"
                @change="(val) => emitEvent('inputChange', scope.row)"
                v-else-if="item.type === 'textarea'"
              ></el-input>
              <el-select 
                v-model="scope.row[item.prop]" 
                :disabled="scope.row.disable" 
                placeholder="" 
                :clearable="item.clearable" 
                :filterable="item.filterable" 
                @change="(val) => emitEvent('inputChange', scope.row)" 
                v-else-if="item.type === 'select'"
              >
                <el-option v-for="option in options[item.optionName]" :key="option.value" :value="option.value" :label="option.label"></el-option>
              </el-select>
              <template v-else>{{ scope.row[item.prop] }}</template>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </template>
    <!-- Pagination -->
    <template>
      <pagination-bar
        :total="total"
        v-model:current-page="current"
        v-model:page-size="size"
        @changeSize="(val) => emitEvent('size-change', val)"
        @changeCurrent="(val) => emitEvent('current-change', val)"
      ></pagination-bar>
    </template>
  </div>
</template>

<script>
import EnableSwitch from '@/components/Table/EnableSwitch.vue'
import TableButtonGroup from '@/components/Table/TableButtonGroup'
import PaginationBar from '@/components/Table/PaginationBar'

export default {
  components: { EnableSwitch, TableButtonGroup, PaginationBar },
  props: {
    data: {
      type: Array,
      default: () => { return [] }
    },
    columns: {
      type: Array,
      default: () => { return [] }
    },
    classes: {
      type: Array,
      default: () => { return [] }
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    showPages: {
      type: Boolean,
      default: true
    },
    totalCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  setup(props, { emit }) {
    /*==========Data and Props==========*/
    // Table
    const dataList = useVModel(props, 'data')
    const columns = toRef(props, 'columns')
    const classes = toRef(props, 'classes')
    const border = toRef(props, 'border')
    const stripe = toRef(props, 'stripe')
    const height = toRef(props, 'height')
    const options = toRef(props, 'options')

    // PaginationBar
    const showPages = toRef(props, 'showPages')
    const total = useVModel(props, 'totalCount')
    const current = useVModel(props, 'currentPage')
    const size = useVModel(props, 'pageSize')

    /*==========Method==========*/
    /**
     * emit Events Setting
     * @param {String} emitName 事件名稱
     * @param {Any} val 數值
     */
    const emitEvent = (emitName, val) => {
      emit(emitName, val);
    }

    return { dataList, columns, classes, border, stripe, height, options, showPages, total, current, size, emitEvent }
  },
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';
</style>