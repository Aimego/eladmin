<template>
  <div class="course">
    <!-- <div class="header">
      <el-form inline :model="searchForm" class="searchForm">
        <el-form-item label="实验选择">
          <el-input size="small" v-model="searchForm.school"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary">查找</el-button>
        </el-form-item>
      </el-form>
      <div class="classStatistics">
        排行统计
      </div>
    </div> -->

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
           label="课程名称"
          >
            <template slot-scope="scope">
              <span class="cname">{{scope.row.courseName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="创建人"
            prop="username"
          >
          </el-table-column>

          <!-- <el-table-column
            label="院系名"
            prop="cname"
          >
          </el-table-column>

          <el-table-column
            label="专业名"
            prop="mname"
          >
          </el-table-column>

          <el-table-column
            label="开课范围"
          >
            <template slot-scope="scope">
              {{scope.row.ran | formatCourseRan}}
            </template>
          </el-table-column> -->

          <el-table-column
            label="开始时间"
            prop="startTime"
          >
          </el-table-column>

          <el-table-column
            label="结束时间"
            prop="endTime"
          >
          </el-table-column>

          <el-table-column
            label="审核状态"
          >
            <template slot-scope="scope">
              <span :style="scope.row.states | formatStatus().sty">{{ scope.row.states | formatStatus().text }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="audit(scope.row.courseId)">审核</el-button>
              <el-button size="small" type="danger" @click="disapprove(scope.row.courseId)">不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
       </div>
       
        <div class="pagination">
          <Pagination :total="total" style="height:100%" :page="page" :size="pageSize" @currentPage="changePage"></Pagination>
        </div>
      </div>
    </div>

    <auditDialog v-if="dialogVisible" :dialogVisible.sync="dialogVisible" :courseId="courseId" @alreadyOperate="getAllcourse(page, pageSize)"></auditDialog>
  </div>
</template>

<script>
import auditDialog from './components/audit_dialog.vue'
import { coursePageAll, failById } from '@/api/course'
import Pagination from '@/components/common/Pagination'
export default {
  components:{
    Pagination,
    auditDialog
  },
  data() {
    return {
      page: 1,
      pageSize: 13,
      total: 0,
      searchForm:{
        school:'',
        experiment:''
      },
      tableData:[],
      courseId: 0,
      disapprove_loading: false,
      dialogVisible: false,
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
  filters: {
    formatCourseRan(ran) {
      switch(ran){
        case 0: return '校内';
        case 1: return '校外';
        case 2: return '本校';
        case 3: return '开放到省虚拟仿真平台';
        case 4: return '开放到国家平台'
      }
    },
    formatStatus(status) {
      let arr = [{text:'待审核',sty:{color:'#E6A23C'}},{text:'已通过',sty:{color:'#67C23A'}},{text:'未通过',sty:{color:'#F56C6C'}}]
      return arr[status]
    }
  },
  created() {
    this.getAllcourse(this.page, this.pageSize)
  },
  methods: {
    getAllcourse(page, size) {
      this.table_loading = true
      coursePageAll(page, size).then(res => {
        this.tableData = res.data
        this.total = res.total
        this.table_loading = false
      })
    },
    // 审核
    audit(id) {
      this.courseId = id
      this.dialogVisible = true
    },
    disapprove(id) {
      this.disapprove_loading = true
      failById(id).then(res => {
        this.getAllcourse(this.page, this.pageSize)
      })
    },
    changePage(page) {
      this.page = page
      this.getAllcourse(this.page, this.pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table ::v-deep .cname{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .course{
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    .header{
      background-color: var(--bgColor);
      display: flex;
      align-items: center;
      justify-content: space-between;
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

