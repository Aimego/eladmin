<template>
  <div class="webgl">
    <div class="head">webgl对接规范</div>
    <div class="content">
      <div class="title">1.1 获取用户信息及token</div>
      <p>GET/webgl链接?user_id=1&user_name=admin&access_token=token</p>
      <p>示例：</p>
      <a href="https://ilab-x.jxust.edu.cn/?user_id=1&user_name=admin&access_token=token">https://ilab-x.jxust.edu.cn/?user_id=1&user_name=admin&access_token=token</a>
      <div class="danger">
        <p>注：</p>
        <p>Webgl链接：unity存储服务器地址链接（unity没存储本平台需提供链接）</p>
        <p>user_id：用户id</p>
        <p>user_name：用户名</p>
        <p>access_token：访问令牌</p>
        <p>以上数据会通过url进行传输，webgl只需接收数据</p>
      </div>
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
