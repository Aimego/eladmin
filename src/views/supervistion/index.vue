<template>
  <div class="comment">
    <div class="header">
      <el-form inline :model="searchForm" class="searchForm">
        <el-form-item label="课程选择">
           <el-select v-model="searchForm.courseId" @change="changeCourseId">
            <el-option v-for="item in searchForm.courseOptions" :key="item.courseId" :label="item.courseName" :value="item.courseId"></el-option>
           </el-select>
        </el-form-item>
      </el-form>
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
           label="班级名称"
           prop="classname"
          >
          </el-table-column>

          <el-table-column
            label="创建时间"
            prop="gmtCreate"
          >
          </el-table-column>

          <el-table-column
            label="修改时间"
            prop="gmtModified"
          >
          </el-table-column>

          <el-table-column
            label="创建人"
            prop="createName"
          >
          </el-table-column>

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="previewStatistics(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
       </div>
      
        <div class="pagination">
          <Pagination :total="total" style="height:100%" :page="page" :size="pageSize" @currentPage="changePage"></Pagination>
        </div>
      </div>
    </div>

    <previewDialog :dialogVisible.sync="dialogVisible" :classData="{classId,className}"></previewDialog>
  </div>
</template>

<script>
import { courseByIdClass } from '@/api/supervistion'
import { coursePageAll } from '@/api/course'
import previewDialog from './components/preview_dialog.vue'
import Pagination from '@/components/common/Pagination'
export default {
  components:{
    Pagination, previewDialog
  },
  data() {
    return {
      page: 1,
      pageSize: 11,
      total: 0,
      searchForm: {
        courseOptions: [],
        courseId: ''
      },
      classId: 0,
      className:'',
      tableData: [],
      table_loading: true,
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
  created() {
    this.getAllcourse(1, 100)
  },
  methods: {
    // 获取课程
    getAllcourse(page, size) {
      coursePageAll(page, size).then(res => {
        this.searchForm.courseOptions = res.data
        if(res.data.length != 0){
          this.searchForm.courseId = res.data[0].courseId
          this.getAllClassById(this.searchForm.courseId, this.page, this.pageSize)
        }else {
          this.table_loading = false
        }
      })
    },
    // 根据课程id获取班级
    getAllClassById(id, page, size) {
      this.table_loading = true
      courseByIdClass(id, page, size).then(res => {
        this.tableData = res.data
        this.total = res.total
        this.table_loading = false
      })
    },
    // 切换课程
    changeCourseId(id) {
      this.page = 1
      this.getAllClassById(id, this.page, this.pageSize)
    },
    previewStatistics({id, classname}) {
      this.classId = id
      this.className = classname
      this.dialogVisible = true
    },
    // 分页
    changePage(page) {
      this.page = page
      this.getAllannouncement(this.page, this.pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table ::v-deep .content{
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
      // flex: 10%;
      height: 80px;
      padding: 0 24px;
      .el-form-item ::v-deep{
          margin-bottom: 0px;
          margin-right: 50px;
      }
      .el-button--send{
        color: #fff;
        background-color: rgba(71, 91, 244, 1);
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
          height: 50px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
      
    }
  }
</style>

