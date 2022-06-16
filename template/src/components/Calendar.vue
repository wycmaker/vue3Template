<template>
  <el-calendar :class="$style.calendar">
    <template #header>
      <p></p>
    </template>
    <template #dateCell="{ data }">
      <template v-if="data.day.split('-')[1] == new Date().toString('-').split('-')[1]">
        <p> {{ data.day.split('-').slice(2).join('') }}</p>
        <el-select v-model="data.day" placeholder="">
        </el-select>
      </template>
      <template v-else><p></p></template>
    </template>
  </el-calendar>
</template>

<script>
export default {

}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .calendar {
    :global {

      .el-calendar-table__row .prev {
        pointer-events: none;
      }

      .el-calendar-table__row .current p {
        margin: 0 0 5px 0;
      }
    }
  }
</style>