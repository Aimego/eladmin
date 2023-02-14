<template>
  <div class="upload">
    <el-upload
      ref="uploads"
      :action="action"
      name="file"
      drag
      :auto-upload="false"
      :headers="headers"
      :multiple="true"
      :limit="3"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">可上传任意类型文件，且不超过10MB</div>
    </el-upload>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    size: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      headers: { 'authorization': getToken() },
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
      const isSize = file.size / 1024 / 1024 < this.size
      if (!isSize) {
        this.$message.error(`上传文件大小不能超过 ${this.size}MB!`)
      }
      return isSize
    },
    submitUploads() {
      this.$refs.uploads.submit()
    }
  }
}
</script>

  <style lang="scss" scoped>
    ::v-deep .el-upload {
        width: 100%;
    }
    ::v-deep .el-upload-dragger {
        width: 100% !important;
    }
  </style>
