<template>
  <div class="experiment">
    <div class="header">
      <el-form inline  class="searchForm">
        <el-form-item label="实验选择">
          <el-select size="medium" v-model="experiment_id">
            <el-option v-for="(item) in experimentOptiosn" :key="item.id" :label="item.exname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
      <div class="body">
        <el-row class="content" :gutter="24">
            <el-col :sm="24" :md="24" :lg="12" style="margin-bottom:24px" v-for="item in 5" :key="item">
                <div class="item">
                    <div class="left"><img src="https://ilab-x.jxust.edu.cn/jxustassets/image/daf93206-3e1a-45e0-b3ef-e23f034b80a2黄洋界保卫战虚拟仿真实践.jpg" /></div>
                    <div class="right">
                        <div class="title">黄洋界保卫战虚拟仿真实践</div>
                        <div class="description">
                             实验简介：本虚拟仿真实践是将历史、现实、科技高度融合、提炼的场景模拟，从灯光、声、表、形、场域各个方面都形成了特定的演绎模式。通过编排黄洋界保卫战进展过程，对其进行特效、配音、事件等设计虚拟战斗场景，用虚拟技术按照实际工作需要进行图像和情景仿真，师生通过虚拟场景沉浸其中，自己承担教学中的某个角色来亲身体验，从而实现教育效果。 
                        </div>
                        <div class="operate">
                          <el-button type="edit" size="small" @click="experimentTabMenu('editAttribute')">编辑实验</el-button>
                          <el-button type="upload" size="small">上传实验</el-button>
                          <el-button size="small" @click="$router.push(`/teacher_experiment/score/145`)">成绩查看</el-button>
                          <el-button size="small">实验评价</el-button>
                          <el-button size="small" @click="$router.push(`/teacher_experiment/analysis/145`)">数据分析</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :sm="24" :md="24" :lg="12" style="margin-bottom:24px">
              <div class="item addItem" @click="experimentTabMenu('addAttribute')">
                <i class="icon el-icon-circle-plus-outline"></i>
                <span class="text">
                  新建实验
                </span>
              </div>
            </el-col>
        </el-row>
        <Pagination class="pagination" :total="100" :page="1" :size="10" @currentPage="changePage"></Pagination>
      </div>
      <el-dialog
         class="dialog"
         :visible="dialogVisible"
         width="40%"
         @close="dialogVisible = false">
          <template slot="title">
              <div class="title">{{ tabTitle }}</div>
          </template>
          <div>
            <el-tabs v-model="activeName">
              <el-tab-pane v-for="item in tabMenu" :key="item.name" :label="item.label" :name="item.name">
                <component :is="item.name"></component>
              </el-tab-pane>
            </el-tabs>
          </div>
      </el-dialog>
    </div>
</template>

<script>
import Pagination from '@/components/common/Pagination'
import editAttribute from './childrenComponents/editExperiment/editAttribute.vue'
import editVideo from './childrenComponents/editExperiment/editVideo.vue'
import editTeam from './childrenComponents/editExperiment/editTeam.vue'
import addAttribute from './childrenComponents/editExperiment/addAttribute.vue'
export default {
  components: {
    Pagination,
    editAttribute,
    editVideo,
    editTeam,
    addAttribute,
  },
  computed: {
    tabMenu() {
      return this.activeName == 'addAttribute' ? this.add_tabMenu : this.edit_tabMenu
    },
    tabTitle() {
      return this.activeName == 'addAttribute' ? '添加实验' : '编辑实验'
    }
  },
  data() {
    return {
      experiment_id: '',
      experimentOptiosn: [],
      dialogVisible: false,
      activeName: 'editAttribute',
      edit_tabMenu: [
        { label: '实验属性', name: 'editAttribute' },
        { label: '实验视频', name: 'editVideo' },
        { label: '实验团队', name: 'editTeam' }
      ],
      add_tabMenu: [
        { label: '实验属性', name: 'addAttribute' }
      ]
    }
  },
  methods: {
    changePage(e) {

    },
    editClose() {

    },
    experimentTabMenu(active) {
      this.activeName = active
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-table ::v-deep .cell{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .el-button--edit {
    background-color: #4762e2;
    color: #fff;
  }
  .experiment{
    color: var(--fontColor);
    flex: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .header{
      background-color: var(--bgColor);
      display: flex;
      align-items: center;
      height: 80px;
      padding: 0 24px;
      .el-form-item ::v-deep{
          margin-bottom: 0px;
          margin-right: 50px;
      }
    }
    .body{
      padding: 24px;
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

