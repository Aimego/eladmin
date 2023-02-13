<template>
  <div class="tools">
    <div class="header-contain">
      <el-form inline :model="query" ref="filter-form">
        <el-form-item prop="originalname">
            <el-input v-model="query.originalname" placeholder="请输入资源名称或类型" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search" @click="getFileAll(page, pageSize, query)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="warning" icon="el-icon-refresh-left" @click="$refs['filter-form'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="edit-contain">
          <el-button type="primary" size="small" icon="el-icon-upload" @click="dialogVisible = true">上传</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteFiles(multipleSelection)" :disabled="multipleSelection.length == 0">删除</el-button>
      </div>

    <div class="body-contain">
        <el-table
          :data="tableData"
          :header-cell-style="table_header"
          :cell-style="table_cell"
          @selection-change="handleSelectionChange"
          v-loading="table_loading"
        >
          <el-table-column
            type="selection"
          >
          </el-table-column>

          <el-table-column
           label="文件名称"
           prop="originalname"
           show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            label="预览文件"
          >
            <template slot-scope="scope">
              <el-image
                class="image-avatar" 
                :src="scope.row.imageurl" 
                :preview-src-list="[scope.row.imageurl]"
                fit="contain"
                lazy
                >
                  <a :href="scope.row.imageurl" target="_blank" slot="error">
                    <i class="el-icon-document" />
                  </a>
                </el-image>

            </template>
          </el-table-column>

          <el-table-column
            label="文件类型"
            prop="type"
          >
          </el-table-column>

          <el-table-column
            label="大小"
            prop="size"
          >
          </el-table-column>

          <el-table-column
            label="操作人"
            prop="createBy"
          >
          </el-table-column>

          <el-table-column
            label="创建时间"
            prop="createTime"
          >
          </el-table-column>

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteFiles([scope.row])"></el-button>
            </template>
          </el-table-column>
        </el-table>
       </div>
       <Pagination class="pagination" :total="total" :page="page" :size="pageSize" @currentPage="changePage" @currentSize="changeSize"></Pagination>
       <el-dialog 
          title="文件上传"
          :visible.sync="dialogVisible"
          width="30%"
          @close="getFileAll(page, pageSize, query)"
          >
          <Uploads ref="uploads" />
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="$refs.uploads.submitUploads()">确 定</el-button>
          </span>
       </el-dialog>
  </div>
</template>

<script>
import { fileAll, deleteFiles } from '@/api/fileManagement'
import Uploads from '@/components/common/upload/uploads.vue'
import Pagination from '@/components/common/Pagination'
export default {
  components:{
    Pagination, Uploads
  },
  data() {
    return {
      query: {
        originalname:''
      },
      page: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogVisible: false,
      table_loading: false,
      multipleSelection: []
    }
  },
  computed: {
    table_header() {
      return {
        textAlign:'center'
      }
    },
    table_cell() {
      return {
        textAlign: 'center'
      }
    }
  },
  created() {
    this.getFileAll(this.page, this.pageSize, this.query)
  },
  methods: {
    getFileAll(page, size, query) {
      this.table_loading = true
      fileAll(page, size, query).then(res => {
        this.tableData = res.data
        this.total = res.total
        this.table_loading = false
      })
    },
    changePage(page) {
      this.page = page
      this.getFileAll(this.page, this.pageSize, this.query)
    },
    changeSize(size) {
      this.pageSize = size
      this.getFileAll(this.page, this.pageSize, this.query)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteFiles(vals) {
      this.$confirm(`确认删除选中的${vals.length}条数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFiles(vals).then(res => {
          if(res.code == 200) {
            this.$message.success('删除成功')
            this.getFileAll(this.page, this.pageSize, this.query)
          }
        })
      }).catch(() => {
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .tools{
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: var(--bgColor);
    border-radius: 5px;
    box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
    width: 100%;
    padding: 0 24px;
    .header-contain{
      display: flex;
      margin-top: 10px;
      // align-items: center;
      // height: 80px;
    }
    .edit-contain {
      margin-bottom: 10px;
    }
    .image-avatar {
      display: inline-block;
      background: #ccc;
      overflow: hidden;
      width: 32px;
      height: 32px;
      line-height: 32px;
      border-radius: 50%;
    }
    .pagination {
      height: 50px;
      display: flex;
      align-items: center;
    }
  }
</style>

