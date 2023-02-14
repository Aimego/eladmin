<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  // form全局样式
  .el-form-item__label{
    color: var(--fontColor);
  }
  .el-input__inner, .el-textarea__inner{
    background-color: var(--bgColor);
    color: var(--fontColor);
  }

  // loading全局样式
  .el-loading-mask{
    background-color: var(--bgColor) !important;
  }

  // table全局样式
 .el-table tr { // 更改表格样式
    background-color:var(--bgColor);
    color: var(--fontColor);
  }
  .el-table th.el-table__cell{
    background-color:var(--table_bgColor);
    color: var(--table_fontColor);
  }
  .el-table {
    background-color: var(--bgColor) !important;
  }
  .el-table tbody tr:hover>td { // 更改表格col悬浮样式
    background: var(--table_HoverbgColor) !important;
  }
  .app-main{
    background-color: var(--appMainbgColor);
    display: flex;
    // min-height: calc(100vh - 85px) !important;
  }
</style>
