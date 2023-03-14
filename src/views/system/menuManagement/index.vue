<template>
  <div class="app-container">
    <div class="header-contain">
      <el-form ref="filter-form" inline :model="query">
        <el-form-item prop="name">
          <el-input v-model="query.name" placeholder="请输入菜单名称" size="small" />
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="getMenusAll(page, pageSize, query)"
          >搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="warning"
            icon="el-icon-refresh-left"
            @click="$refs['filter-form'].resetFields()"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="edit-contain">
      <el-button
        v-PermissionBtns="'/system/menuManagement/add'"
        type="primary"
        size="small"
        icon="el-icon-circle-plus-outline"
        @click="($event) => { form = defaultForm; dialogVisible = true }"
      >增加</el-button>
      <el-button
        v-PermissionBtns="'/system/menuManagement/edit'"
        type="success"
        size="small"
        icon="el-icon-edit"
        :disabled="multipleSelection.length !== 1"
        @click="editMenus(...multipleSelection)"
      >修改</el-button>
      <el-button
        v-PermissionBtns="'/system/menuManagement/delete'"
        type="danger"
        size="small"
        icon="el-icon-delete"
        :disabled="multipleSelection.length === 0"
        @click="deleteMany(multipleSelection)"
      >删除</el-button>
    </div>

    <div class="body-contain">
      <el-table
        ref="eltable"
        v-loading="table_loading"
        :data="tableData"
        row-key="_id"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        :tree-props="{ children: 'children' }"
        @select="handleSelect"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" />

        <el-table-column label="菜单标题" prop="name" show-overflow-tooltip />

        <el-table-column label="图标">
          <template v-if="scope.row.meta" slot-scope="scope">
            <i :class="scope.row.meta.icon" />
          </template>
        </el-table-column>

        <el-table-column label="排序">
          <template slot-scope="scope">
            {{ scope.row.sort || scope.row.meta.sort }}
          </template>
        </el-table-column>

        <el-table-column label="组件路径" prop="path" />

        <el-table-column label="可见">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.hidden"
              active-color="#ff4949"
              inactive-color="#13ce66"
              @change="switchForbid(scope.row, $event)"
            />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-PermissionBtns="'/system/menuManagement/add'"
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="editMenus(scope.row)"
            />
            <el-button
              v-PermissionBtns="'/system/menuManagement/delete'"
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="deleteMany([scope.row])"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination
      class="pagination"
      :total="total"
      :page="page"
      :size="pageSize"
      @currentPage="changePage"
      @currentSize="changeSize"
    />
    <el-dialog :title="edit_title" :visible.sync="dialogVisible" width="35%" @close="getMenusAll(page, pageSize, query)">
      <el-form ref="roleForm" :model="form" :inline="true" :rules="ruleForm" label-width="100px">
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="form.type" size="small" style="width: 458px">
            <el-radio-button :label="0">目录</el-radio-button>
            <el-radio-button :label="1">菜单</el-radio-button>
            <el-radio-button :label="2">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单标题" prop="title">
          <el-input v-model="form.title" size="small" placeholder="请输入菜单标题名称" />
        </el-form-item>
        <el-form-item v-show="form.type === 1 && !form.topClass" label="组件路径" prop="component">
          <el-input v-model="form.component" size="small" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item v-show="form.type !== 2" label="菜单图标">
          <el-input v-model="form.icon" size="small" placeholder="请输入菜单图标" />
        </el-form-item>
        <el-form-item label="路由地址" prop="path">
          <el-input v-model="form.path" size="small" placeholder="请输入唯一标识" />
        </el-form-item>
        <el-form-item v-show="form.topClass && form.type !== 0" label="跳转路由" prop="redirect">
          <el-input v-model="form.redirect" size="small" placeholder="请输入跳转路由地址" />
        </el-form-item>
        <el-form-item v-show="form.type !== 2" label="目录标识">
          <el-input v-model="form.name" size="small" placeholder="输入与菜单标题名称相同" />
        </el-form-item>
        <el-form-item label="菜单排序" prop="sort">
          <el-input-number
            v-model="form.sort"
            size="small"
            controls-position="right"
            :min="0"
            :max="999"
            style="width:184px"
          />
        </el-form-item>
        <el-form-item label="可见" prop="hidden">
          <el-switch v-model="form.hidden" active-color="#ff4949" inactive-color="#13ce66" />
        </el-form-item>
        <el-form-item v-show="form.type !== 2" label="顶级类目" prop="topClass" style="width: 478px">
          <el-checkbox v-model="form.topClass" />
        </el-form-item>
        <el-form-item v-show="!form.topClass" label="上级类目" prop="pid">
          <el-cascader
            v-model="form.pid"
            :props="{ checkStrictly: true, emitPath: false, label: 'name', value: '_id' }"
            :options="tableData"
            clearable
            size="small"
            style="width: 478px"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitMenu('roleForm', form)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenu_Managements, visibleMenuCatalog, visibleMenuItem, visibleMenuBtn, TransFormatMenuAndItemForm, TransFormatBtnForm } from '@/api/system/menuManagement'
import { addMenuCatalog, addMenuItem, editMenuCatalog, editMenuItem, deleteMenu, addMenuBtn, editMenuBtn } from '@/api/system/menuManagement'
import Pagination from '@/components/common/Pagination'
const defaultForm = { type: 0, name: '', path: '', topClass: false, alwaysShow: false, component: '', title: '', icon: '', sort: 999, hidden: false, pid: '', redirect: '' }
export default {
  components: {
    Pagination
  },
  data() {
    const validatePid = (rule, value, callback) => {
      if (!this.form.topClass) {
        if (value) {
          callback()
        } else {
          callback(new Error('上级类目不能为空'))
        }
      } else {
        callback()
      }
    }
    const validateComponent = (rule, value, callback) => {
      if (this.form.type === 1 && !this.form.topClass) {
        if (value) {
          callback()
        } else {
          callback(new Error('组件路径不能为空'))
        }
      } else {
        callback()
      }
    }
    const validateRedirect = (rule, value, callback) => {
      if (this.form.topClass && this.form.type !== 0) {
        if (value) {
          callback()
        } else {
          callback(new Error('跳转路由不能为空'))
        }
      } else {
        callback()
      }
    }
    return {
      query: {
        name: ''
      },
      page: 1,
      pageSize: 10,
      total: 0,
      form: {},
      tableData: [],
      ruleForm: {
        title: [
          { required: true, message: '路由名称不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '路由地址不能为空', trigger: 'blur' }
        ],
        redirect: [
          { required: true, validator: validateRedirect, trigger: 'blur' }
        ],
        component: [
          { required: true, validator: validateComponent, trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '菜单排序不能为空', trigger: 'blur' }
        ],
        hidden: [
          { required: true, message: '是否可见不能为空', trigger: 'blur' }
        ],
        topClass: [
          { required: true, message: '顶级类目不能为空', trigger: 'blur' }
        ],
        pid: [
          { required: true, validator: validatePid, trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      table_loading: false,
      multipleSelection: []
    }
  },
  computed: {
    edit_title() {
      return this.form._id ? '修改路由' : '添加路由'
    },
    submit_catelog() {
      return this.form._id ? editMenuCatalog : addMenuCatalog
    },
    submit_item() {
      return this.form._id ? editMenuItem : addMenuItem
    },
    submit_btn() {
      return this.form._id ? editMenuBtn : addMenuBtn
    },
    defaultForm() {
      return defaultForm
    }
  },
  created() {
    this.getMenusAll(this.page, this.pageSize, this.query)
  },
  methods: {
    getMenusAll(page, size, query) {
      this.table_loading = true
      getMenu_Managements(page, size, query).then(res => {
        this.tableData = res.data
        this.total = res.total
        this.table_loading = false
      })
    },
    editMenus(form) {
      if (form.alwaysShow !== undefined) {
        this.form = new TransFormatMenuAndItemForm(form)
      } else {
        this.form = new TransFormatBtnForm(form)
      }
      this.dialogVisible = true
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    changePage(page) {
      this.page = page
      this.getUsersAll(this.page, this.pageSize, this.query)
    },
    changeSize(size) {
      this.pageSize = size
      this.getMenusAll(this.page, this.pageSize, this.query)
    },
    switchForbid(obj, value) {
      if (obj.alwaysShow !== undefined) {
        obj = new TransFormatMenuAndItemForm(obj)
      } else {
        obj = new TransFormatBtnForm(obj)
      }
      console.log(obj)
      this.$confirm(`确定${value ? '隐藏' : '展示'}该菜单?，是否继续`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        switch (obj.type) {
          case 0: visibleMenuCatalog(obj._id, value).then(res => this.$message.success(res.message)); break
          case 1: visibleMenuItem(obj._id, value).then(res => this.$message.success(res.message)); break
          case 2: visibleMenuBtn(obj._id, value).then(res => this.$message.success(res.message)); break
        }
      }).catch(() => {
        obj.hidden = !value
      })
    },
    handleSelect(section, row) {
      if (section.includes(row) && (row.children && row.children.length !== 0)) {
        this.handleToggleRowSelection(row.children, true)
      } else {
        this.handleToggleRowSelection(row.children, false)
      }
      this.$nextTick(() => {
        this.multipleSelection = this.$refs.eltable.store.states.selection
      })
    },
    handleToggleRowSelection(children, flag) {
      this.$nextTick(() => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].children && children[i].children.length !== 0) {
            this.handleToggleRowSelection(children[i].children, flag)
          }
          this.$refs.eltable.toggleRowSelection(children[i], flag)
        }
      })
    },
    getIsAllChecked() {
      // 下面这行为获取table组件中的全选checkbox的勾选状态
      return this.$refs.eltable.store.states.isAllSelected
    },
    handleSelectAll(val) {
      if (this.getIsAllChecked()) {
        for (let i = 0; i < val.length; i++) {
          this.handleToggleRowSelection(val[i].children, true)
        }
      } else {
        this.handleToggleRowSelection(val, false)
        this.$refs.eltable.clearSelection()
      }
      this.$nextTick(() => {
        this.multipleSelection = this.$refs.eltable.store.states.selection
      })
    },
    deleteMany(vals) {
      this.$confirm(`确认删除选中的${vals.length}条数据?，如果存在下级节点则一并删除，此操作不能撤销！`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const menus = vals.map(val => `${val._id}$${val.path}`)
        deleteMenu(menus).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getMenusAll(this.page, this.pageSize, this.query)
          }
        })
      }).catch(() => {
      })
    },
    submitMenu(formName, form) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          switch (form.type) {
            case 0: this.submit_catelog(form).then(res => this.$message.success(res.message)); break
            case 1: this.submit_item(form).then(res => this.$message.success(res.message)); break
            case 2: this.submit_btn(form).then(res => this.$message.success(res.message)); break
          }
          this.dialogVisible = false
        } else return false
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>

