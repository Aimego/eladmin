<template>
  <div class="experiment">
    <div class="header-contain">
      <el-form inline :model="query" ref="filter-form">
        <el-form-item prop="exname">
            <el-input v-model="query.exname" placeholder="请输入实验名称" size="small"></el-input>
        </el-form-item>
        <el-form-item prop="fullname">
            <el-input v-model="query.fullname" placeholder="请输入负责人名称" size="small"></el-input>
        </el-form-item>
        <el-form-item prop="major">
          <el-select v-model="query.major" placeholder="请选择" size="small">
            <el-option
              v-for="item in professional"
              :key="item._id"
              :label="item.najorname"
              :value="item.najorname"
            >
            </el-option>
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
            <el-col :sm="24" :md="24" :lg="12" style="margin-bottom:24px" v-for="item in experimentData" :key="item._id">
                <div class="item">
                    <div class="left"><img :src="item.imagesurl" /></div>
                    <div class="right">
                        <div class="title">{{ item.exname }}</div>
                        <div class="fullname">实验负责人：{{ item.fullname }}</div>
                        <div class="description">
                             {{ item.exinfo }}
                        </div>
                        <div class="operate">
                          <el-button type="edit" size="small" @click="experimentTabMenu(item)">编辑实验</el-button>
                          <el-button type="upload" size="small">上传实验</el-button>
                          <el-button size="small" @click="$router.push(`/teacher_experiment/score/145`)">成绩查看</el-button>
                          <el-button size="small" @click="$router.push(`/teacher_experiment/analysis/145`)">数据分析</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :sm="24" :md="24" :lg="12" style="margin-bottom:24px">
              <div class="item addItem" @click="experimentTabMenu({})">
                <i class="icon el-icon-circle-plus-outline"></i>
                <span class="text">
                  新建实验
                </span>
              </div>
            </el-col>
        </el-row>
        <Pagination class="pagination" :total="total" :page="page" :size="pageSize" @currentPage="changePage" @currentSize="changeSize"></Pagination>
      </div>
      <el-dialog
         class="dialog"
         :visible="dialogVisible"
         width="40%"
         @close="dialogVisible = false"
         @opened="() => {
          $refs['editAttribute'].form = form
          $refs['editAttribute'].professtion = professional
          }"
         >
          <template slot="title">
              <div class="title">{{ '编辑实验' }}</div>
          </template>
          <div>
            <el-tabs v-model="activeName" @tab-click="test">
              <el-tab-pane label="实验属性" name="editAttribute">
                <editAttribute ref="editAttribute" />
              </el-tab-pane>
              <el-tab-pane label="实验团队" name="editTeam">
                <editTeam ref="editTeam" />
              </el-tab-pane>
            </el-tabs>
          </div>
      </el-dialog>
    </div>
</template>

<script>
import { experimentAll, professional } from '@/api/experiment'
import Pagination from '@/components/common/Pagination'
import editAttribute from './childrenComponents/editExperiment/editAttribute.vue'
import editTeam from './childrenComponents/editExperiment/editTeam.vue'
export default {
  components: {
    Pagination,
    editAttribute,
    editTeam,
  },
  computed: {
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
        { label: '实验属性', name: 'editAttribute' },
        { label: '实验团队', name: 'editTeam' }
      ]
    }
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
    test(event) {
      console.log(event)
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

