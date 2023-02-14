<template>
  <div class="analysis">
    <div class="content">
      <div class="main course">
        <div class="head">
          <span class="title">第三方对接接口</span>
          <div class="iconfont icon-ai207 back" @click="$router.go(-1)">返回</div>
        </div>
        <div class="mainContent">
          <el-tabs tab-position="left">
            <el-tab-pane label="webgl 对接规范"><webgl /></el-tab-pane>
            <el-tab-pane label="实验数据回传"><experimentData /></el-tab-pane>
            <el-tab-pane label="PC对接规范"><pcJoin /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
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
    .analysis {
        flex: 1;
        padding: 24px;
        display: flex;
    }
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 24px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
        .main {
            margin-bottom: 20px;
        }
        .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            // border: 1px solid red;
            margin-bottom: 20px;
            padding-bottom: 25px;
            border-bottom: 1px solid #eee;
        }
        .back {
            cursor: pointer;
            font-size: 14px;
            color: #436EF3;
        }
        .title {
            font-size: 18px;
            font-weight: bold;
            padding-bottom: 5px;
            border-bottom: 2px solid #436EF3;
        }
    }
</style>
