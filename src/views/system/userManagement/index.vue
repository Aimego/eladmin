<template>
  <div class="role">
    <div class="header-contain">
      <el-form ref="filter-form" inline :model="query">
        <el-form-item prop="name">
          <el-input v-model="query.username" placeholder="请输入用户名称" size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search" @click="getUsersAll(page, pageSize, query)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="warning" icon="el-icon-refresh-left" @click="$refs['filter-form'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="edit-contain">
      <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="editUesr(defaultForm)">增加</el-button>
      <el-button type="success" size="small" icon="el-icon-edit" :disabled="multipleSelection.length !== 1" @click="editUesr(...multipleSelection)">修改</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" :disabled="multipleSelection.length === 0" @click="deleteUser(multipleSelection)">删除</el-button>
    </div>

    <div class="body-contain">
      <el-table
        v-loading="table_loading"
        :data="tableData"
        :header-cell-style="{textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
        />

        <el-table-column
          label="用户名"
          prop="username"
          show-overflow-tooltip
        />

        <el-table-column
          label="昵称"
          prop="name"
        />

        <el-table-column
          label="性别"
          prop="sex"
        />

        <el-table-column
          label="电话"
          prop="phone"
        />

        <el-table-column
          label="邮箱"
          prop="email"
        />

        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.forbid"
              active-color="#ff4949"
              inactive-color="#13ce66"
              @change="switchForbid(scope.row,$event)"
            />
          </template>
        </el-table-column>

        <el-table-column
          label="修改时间"
          prop="createTime"
        />

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit" @click="editUesr(scope.row)" />
            <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteUser([scope.row])" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination class="pagination" :total="total" :page="page" :size="pageSize" @currentPage="changePage" @currentSize="changeSize" />
    <el-dialog
      :title="editUser_title"
      :visible.sync="dialogVisible"
      width="30%"
      @close="getUsersAll(page, pageSize, query)"
    >
      <el-form ref="roleForm" :model="form" :inline="true" :rules="ruleForm" label-width="66px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" size="small" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" size="small" placeholder="请输入用户电话" />
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" size="small" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" size="small" placeholder="请输入用户邮箱" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" style="width: 178px">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.forbid"
            active-color="#ff4949"
            inactive-color="#13ce66"
          />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roleId" size="small" placehod="请选择用户角色" style="width: 443px">
            <el-option v-for="item in roles" :key="item._id" :label="item.name" :value="item._id" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitUser('roleForm',form)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles } from '@/api/system/roleManagement'
import { getUsers, addUser, editUser, deleteUser } from '@/api/system/userManagement'
import Pagination from '@/components/common/Pagination'
const defaultForm = { username: '', phone: '', name: '', email: '', sex: '男', forbid: true, roleId: '' }
export default {
  components: {
    Pagination
  },
  data() {
    return {
      query: {
        username: ''
      },
      page: 1,
      pageSize: 10,
      total: 0,
      roles: [],
      form: {},
      tableData: [],
      ruleForm: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      table_loading: false,
      multipleSelection: []
    }
  },
  computed: {
    editUser_title() {
      return this.form._id ? '修改用户' : '添加用户'
    },
    submitUser_Api() {
      return this.form._id ? editUser : addUser
    },
    defaultForm() {
      return defaultForm
    }
  },
  created() {
    getRoles(1, 999, {}).then(res => {
      this.roles = res.data
    })
    this.getUsersAll(this.page, this.pageSize, this.query)
  },
  methods: {
    getUsersAll(page, size, query) {
      this.table_loading = true
      getUsers(page, size, query).then(res => {
        this.tableData = res.data
        this.total = res.total
        this.table_loading = false
      })
    },
    editUesr(form) {
      this.form = form
      this.dialogVisible = true
    },
    changePage(page) {
      this.page = page
      this.getUsersAll(this.page, this.pageSize, this.query)
    },
    changeSize(size) {
      this.pageSize = size
      this.getUsersAll(this.page, this.pageSize, this.query)
    },
    switchForbid(obj, value) {
      this.$confirm(`确定${value ? '禁用' : '启用'}该用户?，是否继续`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editUser(obj).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
          }
        })
      }).catch(() => {
        obj.forbid = !value
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteUser(vals) {
      this.$confirm(`确认删除选中的${vals.length}条数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(vals).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getUsersAll(this.page, this.pageSize, this.query)
          }
        })
      }).catch(() => {
      })
    },
    submitUser(formName, form) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitUser_Api(form).then(res => {
            if (res.code === 200) {
              this.$message.success(res.message)
              this.dialogVisible = false
            }
          })
        } else return false
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

