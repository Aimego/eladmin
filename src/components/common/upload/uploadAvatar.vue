<template>
  <div class="upload">
    <div class="avatar">
      <img :src="uploadUrl || imagesrc">
    </div>
    <el-upload
      class="uploadAvatar"
      :action="action"
      :headers="headers"
      :auto-upload="true"
      :before-upload="beforeAvatarUpload"
      :on-success="handleSuccess"
      :show-file-list="false"
      accept=".png,.jpg,.jpeg"
    >
      <el-button :loading="upload_loading" size="medium" icon="el-icon-upload" class="import" plain>更换头像</el-button>
    </el-upload>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { adminImages } from '@/api/profile'
import { getToken } from '@/utils/auth'
export default {
  props: {
    imagesrc: {
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
      headers: { 'authorization': getToken() },
      uploadUrl: '',
      upload_loading: false
    }
  },
  computed: {
    action() {
      return `${process.env.VUE_APP_BASE_API}/upload`
    }
  },
  methods: {
    ...mapMutations('user', ['SET_USERDETAIL']),
    beforeAvatarUpload(file) {
      const isType = file.type === 'image/png' || file.type === 'image/jpeg'
      const isSize = file.size / 1024 / 1024 < this.size
      this.upload_loading = true
      if (!isType) {
        this.$message.error('上传的图片只能是 JPG 格式 或 PNG 格式!')
      }
      if (!isSize) {
        this.$message.error(`上传图片大小不能超过 ${this.size}MB!`)
      }
      return isType && isSize
    },
    handleSuccess(res, file) {
      this.upload_loading = false
      if (res.code === 200) {
        this.uploadUrl = URL.createObjectURL(file.raw)
        this.$emit('update:imagesrc', res.imageurl)
        adminImages(res.imageurl).then(docs => {
          this.SET_USERDETAIL(docs.data)
        })
      }
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
