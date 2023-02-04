<template>
  <div class="comment">
    <div class="header">
      <el-form inline class="searchForm">
        <el-form-item label="开课名称">
            <el-select size="medium" v-model="experiment_id">
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
       <div class="operate">
            <div>
                <el-button type="danger" plain size="small">删除所选</el-button>
                <el-button type="primary" plain size="small">导入学生</el-button>
                <el-button type="success" plain size="small">下载模板</el-button>
            </div>
            <div style="display:flex">
                <el-input size="medium" placeholder="请输入学生姓名" prefix-icon="el-icon-search"></el-input>
                <el-button style="margin-left:10px" type="primary" size="medium">查询</el-button>
            </div>
       </div>
       <div class="table">
        <el-table
          :data="tableData"
          :header-cell-style="table_header"
          :cell-style="table_cell"
          v-loading="table_loading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
          >

          </el-table-column>

          <el-table-column
            label="序号"
            type="index"
          >
          </el-table-column>

          <el-table-column
           label="用户名"
           prop="username"
          >
          </el-table-column>

          <el-table-column
            label="姓名"
            prop="excontent"
          >
          </el-table-column>

          <el-table-column
            label="学号"
            prop="opsystem"
          >
          </el-table-column>

          <el-table-column
            label="班级"
            prop="spservices"
          >
          </el-table-column>

          <el-table-column
            label="手机号"
            prop="phone"
          >
          </el-table-column>

          <el-table-column
            label="加入时间"
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
          <Pagination :total="total" :page="page" :size="pageSize" @currentPage="changePage"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
      pageSize: 11,
      total: 0,
      tableData: [],
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
  },
  methods: {
    changePage(e) {
        
    },
    handleSelectionChange(val) {
        console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
// .el-table ::v-deep .exname,.evaluate{
//     display: -webkit-box;
//     -webkit-box-orient: vertical;
//     -webkit-line-clamp: 1;
//     overflow: hidden;
//   }
  .comment{
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    .header{
      background-color: var(--bgColor);
      display: flex;
      align-items: center;
      height: 80px;
      padding: 0 24px;
       .el-form-item ::v-deep{
          margin-bottom: 0px;
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
        padding: 0 24px;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
        .operate {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 80px;
        }
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

