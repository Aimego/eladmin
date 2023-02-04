<template>
  <div class="comment">
    <div class="header">
      <!-- <el-form inline :model="searchForm" class="searchForm">
        <el-form-item label="实验选择">
          <el-input size="small" v-model="searchForm.school"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary">查找</el-button>
        </el-form-item>
      </el-form> -->
      <el-button type="send" size="small" icon="el-icon-circle-plus-outline" @click="add_dialogVisible = true">发布公告</el-button>
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
           label="公告标题"
           prop="noticename"
          >
          </el-table-column>

          <el-table-column
            label="公告内容"
          >
            <template slot-scope="scope">
              <span class="content">{{scope.row.content}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="公告类型"
          >
            <template slot-scope="scope">
              <span>{{scope.row.type | formatType}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="公告范围"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.ran | formatRan }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="生效时间"
            prop="startTime"
          >
          </el-table-column>

          <el-table-column
            label="失效时间"
            prop="endTime"
          >
          </el-table-column>

          <el-table-column
            label="发布者"
            prop="createName"
          >
          </el-table-column>

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="editAnnouncement(scope.row.id)">编辑</el-button>
              <el-button size="small" type="danger" @click="delAnnouncement(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
       </div>
      
        <div class="pagination">
          <Pagination :total="total" style="height:100%" :page="page" :size="pageSize" @currentPage="changePage"></Pagination>
        </div>
      </div>
    </div>

    <editDialog :dialogVisible.sync="dialogVisible" :announcementId="announcementId" @updateTable="getAllannouncement(page, pageSize)"></editDialog>

    <addDialogVisible :add_dialogVisible.sync="add_dialogVisible" @updateTable="getAllannouncement(page, pageSize)"></addDialogVisible>
  </div>
</template>

<script>
import { announcementPageAll, announcementDel } from '@/api/announcement'
import confirm from '@/utils/confirm'
import editDialog from './components/edit_dialog.vue'
import addDialogVisible from './components/add_dialog.vue'
import Pagination from '@/components/common/Pagination'
export default {
  components:{
    editDialog, addDialogVisible, Pagination
  },
  data() {
    return {
      page: 1,
      pageSize: 11,
      total: 0,
      searchForm: {
        school:'',
        experiment:''
      },
      tableData: [],
      table_loading: true,
      announcementId: 0,
      dialogVisible: false,
      add_dialogVisible: false
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
    formatType(type) {
      switch(type){
        case '1': return '普通公告';
        case '2': return '重要公告';
      }
    },
    formatRan(ran) {
      let arr = ['全部', '实验内', '班级内']
      return arr[ran]
    }
  },
  created() {
    this.getAllannouncement(this.page, this.pageSize)
  },
  methods: {
    getAllannouncement(page, size) {
      this.table_loading = true
      announcementPageAll(page, size).then(res => {
        console.log(res)
        this.tableData = res.data
        this.total = res.total
        this.table_loading = false
      })
    },
    // 分页
    changePage(page) {
      this.page = page
      this.getAllannouncement(this.page, this.pageSize)
    },
    // 编辑
    editAnnouncement(id) {
      this.announcementId = id
      this.dialogVisible = true
    },
    // 删除公告
    delAnnouncement({ id, content }) {
      confirm(`是否删除公告标题为: <strong>${content}</strong> 的公告`,'提示').then(() => {
        announcementDel(id).then(res => {
          if(res.code == 200) {
            this.$message.success('删除成功')
            this.getAllannouncement(this.page, this.pageSize)
          }
        })
      })
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
      justify-content: flex-end;
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

