<template>
  <div class="webgl">
    <div class="head">PC对接规范</div>
    <div class="content">
      <p class="title">1.1 对接方式与webgl一样</p>
      <p class="title">1.2 需提供应用程序<span class="danger"> exe </span>的链接地址 <span class="danger">（程序在本平台的无需提供）</span></p>
      <p class="title">1.3 需提供应用程序产品名称</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
    .webgl {
        margin-left: 20px;
        .head {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .content {
            padding: 0 10px;
        }
        .danger {
            color: #f00;
        }
    }
    a {
        color: #2f7cee;
    }
</style>
