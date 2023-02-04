<template>
  <div class="experiment">
    <div class="header">
      <el-form inline  class="searchForm">
        <el-form-item label="实验选择">
          <el-select size="small" v-model="experiment_id">
            <el-option v-for="(item) in experimentOptiosn" :key="item.id" :label="item.exname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
      <div class="body">
        <el-row class="content" :gutter="24">
            <el-col :sm="12" :md="12" :lg="{span : '4-8'}" style="margin-bottom:24px" v-for="item in 5" :key="item">
                <div class="item">
                    <div class="left"><img src="https://ilab-x.jxust.edu.cn/jxustassets/image/daf93206-3e1a-45e0-b3ef-e23f034b80a2黄洋界保卫战虚拟仿真实践.jpg" /></div>
                    <div class="right">
                        <div class="title">黄洋界保卫战虚拟仿真实践</div>
                        <div class="descript">
                            时间: 
                            <i class="el-icon-time"></i>
                            2022/09/21 - 2022/10/12
                        </div>
                        <div class="descript">
                            状态: <span style="color:#67C23A">已开课 9 天</span>
                        </div>
                        <div class="operate">
                          <el-button type="primary" size="small" @click="experimentTabMenu('editAttribute')">编辑开课</el-button>
                          <el-button type="danger" size="small">删除开课</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :sm="12" :md="12" :lg="{span : '4-8'}" style="margin-bottom:24px">
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
                <!-- <component :is="item.name"></component> -->
              </el-tab-pane>
            </el-tabs>
          </div>
      </el-dialog>
    </div>
</template>

<script>
import Pagination from '@/components/common/Pagination'
export default {
  components: {
    Pagination,
  },
  computed: {
    tabMenu() {
      return this.activeName == 'addAttribute' ? this.add_tabMenu : this.edit_tabMenu
    },
    tabTitle() {
      return this.activeName == 'addAttribute' ? '添加课程' : '编辑课程'
    }
  },
  data() {
    return {
      experiment_id: '',
      experimentOptiosn: [],
      dialogVisible: false,
      activeName: 'editAttribute',
      edit_tabMenu: [
        { label: '开课属性', name: 'editAttribute' },
        { label: '课件设置', name: 'editVideo' },
      ],
      add_tabMenu: [
        { label: '开课属性', name: 'addAttribute' }
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
  @media (min-width: 992px) {
    .el-col-lg-4-8 {
        width: 33.3%;
    }
  }
  @media  (min-width: 1350px) {
    .el-col-lg-4-8 {
        width: 20%;
    }
  }
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
        display: flex;
        flex-wrap: wrap;
        .item {
            overflow: hidden;
            height: 320px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.16);
            border-radius: 5px;
        }
        .item .left {
            width: 100%;
            height: 180px;
            object-fit: contain;
            margin-right: 24px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .item .right {
            flex: 1;
            padding: 15px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .descript {
              color: rgba(153, 153, 153, 1);
              font-size: 14px;
            }
            .operate {
                display: flex;
                justify-content: space-between;
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

