<template>
  <el-pagination
    :class="$style.page"
    :layout="(pageCount === 5) ? 'total, prev, pager, next' : 'total, sizes, prev, pager, next, jumper'"
    background
    @size-change="sizeChange"
    @current-change="currentChange"
    :current-page="currentPageValue"
    :page-sizes="pageSizes"
    :page-size="pageSizeValue"
    :total="total"
    :pager-count="pageCount"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      dafault: 10
    },
    currentPage: {
      type: Number,
      dafault: 1
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    total: {
      type: Number,
      default: 0
    },
  },
  setup(props, { emit }) {
    /*==========Data and Props==========*/
    const pageSizes = toRef(props, 'pageSizes')
    const total = toRef(props, 'total')
    const currentPageValue = useVModel(props, 'currentPage')
    const pageSizeValue = useVModel(props, 'pageSize')
    const store = getStore()

    /*==========Method==========*/
    /**
     * 資料數變更函數
     * @param {number} size 每頁資料數
     */
    const sizeChange = (size) => {
      pageSizeValue.value = size
      emit('changeSize', size)
    }

    /**
     * 頁面變更函數
     * @param {number} page 頁數
     */
    const currentChange = (page) => {
      currentPageValue.value = page
      emit('changeCurrent', page)
    }

    /*==========Computed==========*/
    const pageCount = computed(() => {
      let clientWidth = store.state.clientWidth
      if(clientWidth !== null) {
        if(clientWidth >= 1440) return 9
        else if(clientWidth >= 1024 && clientWidth < 1440) return 7
        else return 5
      }
      else return 9
    })

    return { pageSizes, total, currentPageValue, pageSizeValue, sizeChange, currentChange, pageCount }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .page {
    justify-content: center;
    text-align: center;
    margin-top: 15px;

    :global {
      .el-pagination__editor.el-input .el-input__inner {
        height: 25px;
      }

      .el-select .el-input__wrapper,
      .el-select .el-input.is-focus .el-input__wrapper,
      .el-select .el-input__wrapper.is-focus,
      .el-input .el-input__wrapper,
      .el-input .el-input.is-focus .el-input__wrapper {
        box-shadow: 0 0 0 1px $button-color-3 inset!important;
      }

      .el-pagination__total, .el-input__inner, .el-pagination__jump {
        @include font-setting(14px, unset, $font-color-9);
      }
      
      @include input-setting($font-color-9, $white-color, $button-color-3);

      .el-pager li:not(.is-disabled).is-active {
        @include pager-color-setting($white-color, $button-color-2, $button-color-2);
      }

      .el-pager li, .btn-prev, .btn-next{
        @include pager-color-setting($font-color-8, $white-color, $border-color-1);
      }

      .el-input--mini .el-input__inner {
        height: 28px;
        line-height: 28px;
      }

      .el-pagination__jump .el-input__inner {
        padding: 0 3px;
      }
    }
  }

</style>
