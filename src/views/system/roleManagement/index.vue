<template>
  <div class="role">
    <div class="header-contain">
      <el-form inline :model="query" ref="filter-form">
        <el-form-item prop="name">
            <el-input v-model="query.name" placeholder="请输入角色名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search" @click="getRolesAll(page, pageSize, query)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="warning" icon="el-icon-refresh-left" @click="$refs['filter-form'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="edit-contain">
          <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="editRole({})">增加</el-button>
          <el-button type="success" size="small" icon="el-icon-edit" :disabled="multipleSelection.length != 1" @click="editRole(...multipleSelection)">修改</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="deleteRole(multipleSelection)">删除</el-button>
      </div>

    <div class="body-contain">
        <el-table
          :data="tableData"
          :header-cell-style="{textAlign:'center'}"
          :cell-style="{textAlign:'center'}"
          @selection-change="handleSelectionChange"
          v-loading="table_loading"
        >
          <el-table-column
            type="selection"
          >
          </el-table-column>

          <el-table-column
           label="角色名称"
           prop="name"
           show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            label="备注"
            prop="describe"
          >
          </el-table-column>

          <el-table-column
            label="角色级别"
            prop="level"
          >
          </el-table-column>

          <el-table-column
            label="创建人"
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
              <el-button size="small" type="primary" icon="el-icon-edit" @click="editRole(scope.row)"></el-button>
              <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteRole([scope.row])"></el-button>
            </template>
          </el-table-column>
        </el-table>
       </div>
       <Pagination class="pagination" :total="total" :page="page" :size="pageSize" @currentPage="changePage" @currentSize="changeSize"></Pagination>
       <el-dialog 
          :title="editRole_title"
          :visible.sync="dialogVisible"
          @open="$refs.eltree.setCheckedKeys([])"
          @close="getRolesAll(page, pageSize, query)"
          width="30%"
          >
          <el-form :model="form" :rules="ruleForm" ref="roleForm" label-width="80px">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="描述信息" prop="name">
              <el-input type="textarea" v-model="form.describe" placeholder="请输入角色描述信息"></el-input>
            </el-form-item>
            <el-form-item label="角色级别" prop="level">
              <el-input-number v-model="form.level" controls-position="right" :min="1" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="分配菜单">
              <el-tree
                :data="menus"
                show-checkbox
                node-key="_id"
                :default-checked-keys="form.authority"
                ref="eltree"
                :props="{children:'children',label:'name'}"
                @check="handleCheck"
              >
              </el-tree>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitRole('roleForm',form)">确 定</el-button>
          </span>
       </el-dialog>
  </div>
</template>

<script>
import { getRoles, rolesMenus, addRole, editRole, deleteRole } from '@/api/system/roleManagement'
import Uploads from '@/components/common/upload/uploads.vue'
import Pagination from '@/components/common/Pagination'
export default {
  components:{
    Pagination, Uploads
  },
  computed: {
    editRole_title() {
      return this.form._id ? '修改角色' : '添加角色'
    },
    submitRole_Api() {
      return this.form._id ? editRole : addRole
    }
  },
  data() {
    return {
      query: {
        name:''
      },
      page: 1,
      pageSize: 10,
      total: 0,
      menus: [],
      form: {},
      tableData: [],
      ruleForm: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '角色描述信息不能为空', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '角色级别不能为空', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      table_loading: false,
      multipleSelection: []
    }
  },
  created() {
    this.getRolesAll(this.page, this.pageSize, this.query)
    rolesMenus().then(res => {
      this.menus = res.data
    })
  },
  methods: {
    getRolesAll(page, size, query) {
      this.table_loading = true
      getRoles(page, size, query).then(res => {
        this.tableData = res.data
        this.total = res.total
        this.table_loading = false
      })
    },
    editRole(form) {
      this.form = form
      this.dialogVisible = true
    },
    changePage(page) {
      this.page = page
      this.getRolesAll(this.page, this.pageSize, this.query)
    },
    changeSize(size) {
      this.pageSize = size
      this.getRolesAll(this.page, this.pageSize, this.query)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteRole(vals) {
      this.$confirm(`确认删除选中的${vals.length}条数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(vals).then(res => {
          if(res.code == 200) {
            this.$message.success('删除成功')
            this.getRolesAll(this.page, this.pageSize, this.query)
          }
        })
      }).catch(() => {
      })
    },
    handleCheck(checkedNodes, {checkedKeys}) {
      this.form.authority = checkedKeys
    },
    submitRole(formName,form) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          this.submitRole_Api(form).then(res => {
            if(res.code == 200) {
              this.$message.success(res.message)
              this.dialogVisible = false
            }
          })
        }else return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .role{
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
    }
    .edit-contain {
      margin-bottom: 10px;
    }
    .pagination {
      height: 50px;
      display: flex;
      align-items: center;
    }
  }
</style>

