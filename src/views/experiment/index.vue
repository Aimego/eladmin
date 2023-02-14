<template>
  <div class="experiment">
    <div class="header-contain">
      <el-form ref="filter-form" inline :model="query">
        <el-form-item prop="exname">
          <el-input v-model="query.exname" placeholder="请输入实验名称" size="small" />
        </el-form-item>
        <el-form-item prop="fullname">
          <el-input v-model="query.fullname" placeholder="请输入负责人名称" size="small" />
        </el-form-item>
        <el-form-item prop="major">
          <el-select v-model="query.major" placeholder="请选择" size="small">
            <el-option
              v-for="item in professional"
              :key="item._id"
              :label="item.najorname"
              :value="item.najorname"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search" @click="getExperimentAll(page, pageSize, query)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="warning" icon="el-icon-refresh-left" @click="$refs['filter-form'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="body-contain">
      <el-row class="content" :gutter="24">
        <el-col v-for="item in experimentData" :key="item._id" :sm="24" :md="24" :lg="12" style="margin-bottom:24px">
          <div class="item">
            <div class="left"><img :src="item.imagesurl"></div>
            <div class="right">
              <div class="title">{{ item.exname }}</div>
              <div class="fullname">实验负责人：{{ item.fullname }}</div>
              <div class="description">
                {{ item.exinfo }}
              </div>
              <div class="operate">
                <el-button type="primary" size="small" @click="experimentTabMenu(item)">编辑实验</el-button>
                <el-button type="danger" size="small" @click="deleteExperiment(item._id)">删除实验</el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :sm="24" :md="24" :lg="12" style="margin-bottom:24px">
          <div class="item addItem" @click="experimentTabMenu({})">
            <i class="icon el-icon-circle-plus-outline" />
            <span class="text">
              新建实验
            </span>
          </div>
        </el-col>
      </el-row>
      <Pagination class="pagination" :total="total" :page="page" :size="pageSize" @currentPage="changePage" @currentSize="changeSize" />
    </div>
    <el-dialog
      class="dialog"
      :visible="dialogVisible"
      width="40%"
      @close="() => {
        getExperimentAll(page, pageSize, query)
        dialogVisible = false
      }"
      @opened="() => {
        $refs['editAttribute'].form = form
        $refs['editAttribute'].professtion = professional
      }"
    >
      <template slot="title">
        <div class="title">{{ '编辑实验' }}</div>
      </template>
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="实验属性" name="editAttribute">
            <editAttribute ref="editAttribute" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { experimentAll, professional, deleteExperiment } from '@/api/experiment'
import Pagination from '@/components/common/Pagination'
import editAttribute from './childrenComponents/editExperiment/editAttribute.vue'
export default {
  components: {
    Pagination,
    editAttribute
  },
  data() {
    return {
      query: {
        fullname: '',
        exname: '',
        najorname: ''
      },
      dialogVisible: false,
      page: 1,
      pageSize: 5,
      total: 0,
      experimentData: [],
      form: {},
      professional: [],
      activeName: 'editAttribute',
      tabMenu: [
        { label: '实验属性', name: 'editAttribute' }
      ]
    }
  },
  computed: {
  },
  created() {
    this.getExperimentAll(this.page, this.pageSize, this.query)
    professional().then(res => {
      this.professional = res.data
    })
  },
  methods: {
    getExperimentAll(page, size, query) {
      experimentAll(page, size, query).then(res => {
        this.experimentData = res.data
        this.total = res.total
      })
    },
    changePage(e) {
      this.page = e
      this.getExperimentAll(this.page, this.pageSize, this.query)
    },
    changeSize(e) {
      this.pageSize = e
      this.getExperimentAll(this.page, this.pageSize, this.query)
    },
    experimentTabMenu(form) {
      this.form = form
      this.dialogVisible = true
    },
    deleteExperiment(id) {
      this.$confirm(`确认删除该实验?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteExperiment(id).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getExperimentAll(this.page, this.pageSize, this.query)
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .experiment{
    color: var(--fontColor);
    flex: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: var(--bgColor);
    padding: 0 24px;
    .header-contain{
      display: flex;
      margin-top: 10px;
    }
    .body-contain{
      flex: 1;
      display: flex;
      flex-direction: column;
      .content {
        flex: 1;
        .item {
            height: 210px;
            padding: 24px;
            background-color: #fff;
            display: flex;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.16);
            border-radius: 5px;
        }
        .item .left {
            width: 250px;
            object-fit: contain;
            margin-right: 24px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .item .right{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .fullname {
              font-size: 14px;
              color: rgba(153, 153, 153, 1);
            }
            .description {
              color: rgba(153, 153, 153, 1);
              font-size: 14px;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 3; //数字2为行数，可以设置在第几行隐藏
              -webkit-box-orient: vertical;
            }
        }
        .addItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .icon {
            font-size: 80px;
            margin-bottom: 20px;
          }
          .text {
            color: #909399;
          }
        }
      }
    }
  }
  .pagination {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
</style>

