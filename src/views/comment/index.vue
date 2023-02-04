<template>
  <div class="comment">
    <div class="header">
      <el-form inline class="searchForm">
        <el-form-item label="实验选择">
            <el-select size="small" v-model="experiment_id" @change="getAllevaluate($event, page, pageSize)">
              <el-option v-for="(item) in experimentOptiosn" :key="item.id" :label="item.exname" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <!-- <div class="classStatistics">
        排行统计
      </div> -->
    </div>

    <div class="body">
      <div class="main">
       <div class="table">
        <el-table
          :data="tableData"
          :header-cell-style="table_header"
          :cell-style="table_cell"
          v-loading="table_loading"
        >
          <el-table-column
            label="序号"
            type="index"
          >
          </el-table-column>

          <el-table-column
           label="评价人"
           prop="username"
          >
          </el-table-column>

          <el-table-column
            label="内容"
            prop="evaluate"
          >
            <template slot-scope="scope">
              <span class="evaluate">{{scope.row.evaluate}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="实验名称"
          >
            <template slot-scope="scope">
              <span class="exname">{{scope.row.exname}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="实验内容评分"
            prop="excontent"
          >
          </el-table-column>

          <el-table-column
            label="操作系统评分"
            prop="opsystem"
          >
          </el-table-column>

          <el-table-column
            label="支持服务评分"
            prop="spservices"
          >
          </el-table-column>

          <el-table-column
            label="评论时间"
            prop="gmtCreate"
          >
          </el-table-column>

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="preview(scope.row.id)">查看</el-button>
              <el-button size="small" type="danger" @click="deleteComment(scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
       </div>
        <div class="pagination">
          <Pagination :total="total" style="height:100%" :page="page" :size="pageSize" @currentPage="changePage"></Pagination>
        </div>
      </div>
    </div>

    <previewDialog :dialogVisible.sync="dialogVisible" :commentId="commentId" @updateTable="getAllevaluate(page, pageSize)"></previewDialog>
  </div>
</template>

<script>
import previewDialog from './components/preview_dialog.vue'
import { experimentAll } from '@/api/experiment'
import { evaluatePageAll, DeleteEvaluate } from '@/api/comment'
import confirm from '@/utils/confirm'
import Pagination from '@/components/common/Pagination'
export default {
  components:{
    Pagination, previewDialog
  },
  data() {
    return {
      experiment_id: '',
      experimentOptiosn:[],
      page: 1,
      pageSize: 11,
      total: 0,
      commentId: 0,
      tableData: [],
      table_loading: true,
      dialogVisible: false
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
    // this.getAllevaluate(this.page, this.pageSize)
    this.getAllexperiment(1,100)
  },
  methods: {
    getAllexperiment(page, size) { // 获取所有实验
      experimentAll(page, size).then(res => {
        this.experimentOptiosn = res.data
        if(this.experimentOptiosn.length != 0){
          this.experiment_id = this.experimentOptiosn[0].id
          this.getAllevaluate(this.experiment_id, this.page, this.pageSize)
        }
      })
    },
    getAllevaluate(id, page, size) {
      this.table_loading = true
      evaluatePageAll(id, page, size).then(res => {
        console.log(res)
        this.tableData = res.data
        this.total = res.total
        this.table_loading = false
      })
    },
    preview(id) {
      this.commentId = id
      this.dialogVisible = true
    },
    deleteComment({ id, evaluate }) {
      confirm(`是否删除评价内容为: <strong>${evaluate}</strong> 的评论`,'提示').then(() => {
          DeleteEvaluate(id).then(res=>{
            if(res.code == 200) {
              this.$message.success('删除成功')
              this.getAllevaluate(this.experiment_id, this.page, this.pageSize)
            }
          })
      })
    },
    changePage(page) {
      this.page = page
      this.getAllevaluate(this.experiment_id, this.page, this.pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table ::v-deep .exname,.evaluate{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .comment{
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    .header{
      // border-top: 1px solid #eee;
      // border-bottom: 1px solid #eee;
      background-color: var(--bgColor);
      display: flex;
      align-items: center;
      // justify-content: flex-end;
      height: 80px;
      padding: 0 24px;
       .el-form-item ::v-deep{
          margin-bottom: 0px;
          margin-right: 50px;
      }
      .classStatistics{
        font-size: 14px;
        color: rgb(33, 187, 126);
        cursor: pointer;
      }
    }
    .body{
      padding: 24px;
      flex: 1;
      display: flex;
      .main{
        display: flex;
        flex-direction: column;
        background-color: var(--bgColor);
        flex: 1;
        padding: 0 10px;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
        .table{
          flex: 1;
        }
        .pagination{
          height: 45px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }
  }
</style>

