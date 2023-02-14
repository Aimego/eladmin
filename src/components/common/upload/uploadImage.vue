<template>
  <div class="upload">
    <el-upload
      class="avatar-uploader"
      :action="action"
      name="file"
      :auto-upload="true"
      :headers="headers"
      :before-upload="beforeUpload"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :show-file-list="false"
      accept=".png,.jpg,.jpeg"
    >
      <img v-if="uploadUrl || imagesrc" :src="uploadUrl || imagesrc" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <div v-show="showProgress">
      <el-progress :percentage="percentage" />
    </div>
  </div>
</template>
<script>
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
      showProgress: false,
      percentage: 0
    }
  },
  computed: {
    action() {
      return `${process.env.VUE_APP_BASE_API}/upload`
    }
  },
  methods: {
    beforeUpload(file) {
      const isType = file.type === 'image/png' || file.type === 'image/jpeg'
      const isSize = file.size / 1024 / 1024 < this.size
      if (!isType) {
        this.$message.error('上传的实验图片只能是 JPG 格式 或 PNG 格式!')
      }
      if (!isSize) {
        this.$message.error(`上传图片大小不能超过 ${this.size}MB!`)
      }
      return isType && isSize
    },
    handleProgress(event) {
      this.showProgress = true
      this.percentage = Math.floor(event.percent)
      if (this.percentage === 100) {
        this.showProgress = false
        this.percentage = 0
      }
    },
    handleSuccess(res, file) {
      this.uploadUrl = URL.createObjectURL(file.raw)
      this.$emit('update:imagesrc', res.imageurl)
    }
  }
}
</script>

  <style lang="scss" scoped>
    .avatar-uploader ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader ::v-deep .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 250px;
    height: 178px;
    display: block;
  }
  </style>
