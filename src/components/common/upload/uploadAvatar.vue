<template>
  <div class="upload">
    <div class="avatar">
      <!-- <span class="tips">头像</span> -->
      <img :src="uploadUrl || avatar">
    </div>
    <el-upload
      class="uploadAvatar"
      action=""
      :http-request="upload"
      :auto-upload="true"
      :before-upload="beforeAvatarUpload"
      :show-file-list="false"
      accept=".png,.jpg,.jpeg"
    >
      <el-button :loading="upload_loading" size="medium" icon="el-icon-upload" class="import" plain>更换头像</el-button>
    </el-upload>
  </div>
</template>
<script>
import { adminImages } from '@/api/profile'
import { mapActions } from 'vuex'
export default {
  props: {
    avatar: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      uploadUrl: '',
      upload_loading: false
    }
  },
  methods: {
    ...mapActions('user', ['getInfo']),
    beforeAvatarUpload(file) {
      const isType = file.type === 'image/png' || file.type === 'image/jpeg'
      const isSize = file.size / 1024 / 1024 < this.size
      if (!isType) {
        this.$message.error('上传的图片只能是 JPG 格式 或 PNG 格式!')
      }
      if (!isSize) {
        this.$message.error(`上传图片大小不能超过 ${this.size}MB!`)
      }
      return isType && isSize
    },
    upload(fileObj) {
      this.upload_loading = true
      adminImages(fileObj.file).then(res => {
        if (res.code === 200) {
          this.uploadUrl = URL.createObjectURL(fileObj.file)
          this.getInfo()
          this.$message.success('上传成功')
        }
        this.upload_loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar{
    position: relative;
    display: flex;
    margin-bottom: 20px;
    border-radius: 50%;
    overflow: hidden;
    .tips{
      position: absolute;
      top: -10px;
      left: -10px;
    }
    img{
      width: 144px;
      height: 144px;
    }
  }
</style>
