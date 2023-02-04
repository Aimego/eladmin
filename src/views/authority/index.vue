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
    </div>
    河北捏🦆
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
           label="头像"
           prop="images"
          >
            <template slot-scope="scope">
                <img class="avatar" :src="scope.row.images || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
            </template>
          </el-table-column>

          <el-table-column
            label="用户名"
            prop="username"
          >
          </el-table-column>

          <el-table-column
            label="手机号"
            prop="phone"
          >
          </el-table-column>

          <el-table-column
            label="身份"
          >
            <template slot-scope="scope">
                {{scope.row.identity | identTrans}}
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button size="small" type="primary">查看</el-button>
              <!-- <el-button size="small" type="danger">删除</el-button> -->
            </template>
          </el-table-column>

        </el-table>
       </div>
        <div class="pagination">
          <Pagination :total="total" style="height:100%" :page="page" :size="pageSize" @currentPage="changePage"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userPageAll } from '@/api/authority'
import Pagination from '@/components/common/Pagination'
export default {
  components:{
    Pagination
  },
  data() {
    return {
      experiment_id: '',
      experimentOptiosn:[],
      page: 1,
      pageSize: 9,
      total: 0,
      commentId: 0,
      tableData: [],
      table_loading: false,
      dialogVisible: false
    }
  },
  computed: {
    table_header() {
      return {
        textAlign:'center',
      }
    },
    table_cell() {
      return {
        textAlign: 'center'
      }
    }
  },
  created() {
    this.getAllUserPage(this.page, this.pageSize)
  },
  filters: {
    identTrans(id) {
        switch(id) {
            case 0: return '社会';
            case 1: return '学生';
            case 2: return '老师';
            case 3: return '教务';
            case 4: return '管理员';
        }
    }
  },
  methods: {
    getAllUserPage(page, size) {
        this.table_loading = true
        userPageAll(page, size).then(res => {
            this.table_loading = false
            this.tableData = res.data
            this.total = res.total
            console.log(res)
        })
    },
    changePage(page) {
      this.page = page
      this.getAllUserPage(this.page, this.pageSize)
    //   this.getAllevaluate(this.experiment_id, this.page, this.pageSize)
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
          .avatar {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                overflow: hidden;
            }
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

