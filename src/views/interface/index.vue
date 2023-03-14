<template>
  <div class="app-container">
    <div class="header-contain">
      <span class="title">第三方对接接口</span>
    </div>
    <div class="mainContent">
      <el-tabs tab-position="left">
        <el-tab-pane label="webgl 对接规范">
          <webgl />
        </el-tab-pane>
        <el-tab-pane label="实验数据回传">
          <experimentData />
        </el-tab-pane>
        <el-tab-pane label="PC对接规范">
          <pcJoin />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import webgl from './tabs/webgl_interface.vue'
import experimentData from './tabs/experimentData.vue'
import pcJoin from './tabs/pcJoin.vue'
export default {
  components: {
    webgl, experimentData, pcJoin
  }
}
</script>

<style scoped lang="scss">
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border: 1px solid red;
  margin-bottom: 20px;
  padding-bottom: 25px;
  border-bottom: 1px solid #eee;
}

.title {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: 2px solid #436EF3;
}</style>
