<template>
  <div class="dashboard">
    <el-row :gutter="24" class="header">
      <el-col style="margin-bottom:24px" :xs="24" :sm="24" :md="12" :lg="{ span: '4-8' }">
        <div class="item">
          <div class="text">
            <!-- 引入了i18n包，中英文切换 -->
            <span class="title">{{ $t('dashboard.Total_views') }}</span>
            <div class="number">
              <countTo :start-val="0" :end-val="Statistic.browse || 0" :duration="2000" />
              <span class="format">人</span>
            </div>
          </div>
          <svg-icon icon-class="dashboard_user" class="icon" />
        </div>
      </el-col>

      <el-col style="margin-bottom:24px" :xs="24" :sm="24" :md="12" :lg="{ span: '4-8' }">
        <div class="item">
          <div class="text">
            <span class="title">{{ $t('dashboard.Total_likes') }}</span>
            <div class="number">
              <countTo :start-val="0" :end-val="Statistic.likes || 0" :duration="2000" />
              <span class="format">人</span>
            </div>
          </div>
          <svg-icon icon-class="dashboard_heart" class="icon" />
        </div>
      </el-col>

      <el-col style="margin-bottom:24px" :xs="24" :sm="24" :md="12" :lg="{ span: '4-8' }">
        <div class="item">
          <div class="text">
            <span class="title">{{ $t('dashboard.Total_collection') }}</span>
            <div class="number">
              <countTo :start-val="0" :end-val="Statistic.collection || 0" :duration="2000" />
              <span class="format">人</span>
            </div>
          </div>
          <svg-icon icon-class="dashboard_lock" class="icon" />
        </div>
      </el-col>

      <el-col style="margin-bottom:24px" :xs="24" :sm="24" :md="12" :lg="{ span: '4-8' }">
        <div class="item">
          <div class="text">
            <span class="title">{{ $t('dashboard.Total_course') }}</span>
            <div class="number">
              <countTo :start-val="0" :end-val="Statistic.courses || 0" :duration="2000" />
              <span class="format">次</span>
            </div>
          </div>
          <svg-icon icon-class="dashboard_book" class="icon" />
        </div>
      </el-col>

      <el-col style="margin-bottom:24px" :xs="24" :sm="24" :md="12" :lg="{ span: '4-8' }">
        <div class="item">
          <div class="text">
            <span class="title">{{ $t('dashboard.Total_experiments') }}</span>
            <div class="number">
              <countTo :start-val="0" :end-val="Statistic.experiments || 0" :duration="2000" />
              <span class="format">次</span>
            </div>
          </div>
          <svg-icon icon-class="dashboard_money" class="icon" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="body">
      <el-col :sm="24" :md="24" :lg="11" style="margin-bottom:24px">
        <div class="leftMenu">
          <div class="head">
            <div class="title">
              {{ $t('dashboard.Experimental_evaluation') }}<span class="evaNumber">(共{{ total }}条)</span>
            </div>
          </div>
          <div class="table">
            <el-table
              ref="table"
              v-loading="table_loading"
              :data="tableData"
              :header-cell-style="table_header"
              :cell-style="table_cell"
              highlight-current-row
              :element-loading-background="stylize.loadingColor"
              @row-click="handleCurrentRow"
            >
              <el-table-column type="index" :label="$t('dashboard.table.Index')" />

              <el-table-column :label="$t('dashboard.table.Evaluation_people')" prop="username" />

              <el-table-column :label="$t('dashboard.table.Content')" prop="evaluate" width="200" />

              <el-table-column
                show-overflow-tooltip
                :label="$t('dashboard.table.Experiment')"
                prop="exname"
                width="200"
              />

              <el-table-column :label="$t('dashboard.table.Date')" prop="gmtCreate" />
            </el-table>
          </div>
          <div class="pagination">
            <Pagination
              class="pagin"
              :total="total"
              :size="pageSize"
              :page="page"
              @currentPage="changePage"
              @currentSize="changeSize"
            />
          </div>
        </div>
      </el-col>

      <el-col :sm="24" :md="24" :lg="13" class="echarts" style="margin-bottom:24px">
        <div class="line">
          <div class="head">
            <span class="title">{{ $t('dashboard.Experimental_results') }}</span>
            <div class="date">
              <latelyTabbar @changeBar="changeBar" />
            </div>
          </div>
          <LineEcharts ref="line" class="lineEcharts" />
        </div>
        <div class="pie">
          <div class="head">
            <div class="title">
              {{ $t('dashboard.Major_experiments') }}
            </div>
          </div>
          <div class="pieStatistics">
            <div class="Statistics">
              <span class="number">{{ allExNumber }}</span>
              <span class="tips">实验总数</span>
            </div>
            <PieEcharts ref="pie" class="pieEcharts" />
          </div>
        </div>
      </el-col>
    </el-row>
    <previewDialog
      :dialog-visible.sync="dialogVisible"
      :comment-id="commentId"
      @updateTable="getInitevaluate(page, pageSize)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import latelyTabbar from '@/components/common/echarts/latelyTabbar.vue'
import LineEcharts from '@/components/common/echarts/LineEcharts.vue'
import PieEcharts from '@/components/common/echarts/PieEcharts.vue'
import Pagination from '@/components/common/Pagination'
import countTo from 'vue-count-to'
import previewDialog from '@/views/comment/components/preview_dialog.vue'
import { professional } from '@/api/experiment'
import { headerStatistic, evaluate, WorkbenchWeek, WorkbenchLately } from '@/api/dashboard'
export default {
  name: 'Dashboard',
  components: { LineEcharts, PieEcharts, previewDialog, latelyTabbar, Pagination, countTo },
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      commentId: 0,
      table_loading: true,
      dialogVisible: false,
      dateTabbar_index: 0,
      allExNumber: 0, // 专业总实验数
      Statistic: {
        browse: 71589,
        likes: 33836,
        collection: 22903,
        courses: 27887,
        experiments: 59884
      }
    }
  },
  computed: {
    ...mapGetters(['stylize']),
    table_header() {
      return {
        textAlign: 'center'
      }
    },
    table_cell() {
      return {
        textAlign: 'center'
      }
    },
    total_pages() {
      return Math.ceil(this.total / this.pageSize)
    },
    Tabbar_unit() {
      let unit = ''
      switch (this.dateTabbar_index) {
        case 0: unit = '周'; break
        case 1: unit = '月'; break
        case 2: unit = '年'; break
      }
      return unit
    }
  },
  created() {
    this.getInitevaluate(this.page, this.pageSize)
    this.$nextTick(() => {
      this.getAllWorkbenchItem()
      this.changeBar(this.dateTabbar_index)
    })
  },
  methods: {
    // 头部数据展示
    getAllheaderStatistic() {
      headerStatistic().then(res => {
        const course_count = res[1].data
        const test_count = res[2].data
        const obj = { ...res[0].data, course_count, test_count }
        this.Statistic = obj
      })
    },
    // 初始化实验评价统计
    async getInitevaluate(page, size) {
      this.table_loading = true
      const data = await evaluate(page, size)
      this.total = data.total
      this.tableData = data.data
      this.table_loading = false
    },
    // 实验评论统计分页
    async getevaluatePage(page, size) {
      this.table_loading = true
      const data = await evaluate(page, size)
      this.total = data.total
      this.tableData = data.data
      this.table_loading = false
      // return data.data
    },
    // 实验评价分页
    changePage(e) {
      this.page = e
      this.getevaluatePage(this.page, this.pageSize)
    },
    changeSize(size) {
      this.pageSize = size
      this.getevaluatePage(this.page, this.pageSize, this.query)
    },
    // 选中评论行
    handleCurrentRow({ id }) {
      this.commentId = id
      this.dialogVisible = true
    },
    // 统计实验平均分
    getAllWorkbenchWeek(we, status) {
      WorkbenchWeek(we, status).then(res => {
        this.$nextTick(() => {
          this.InitLineEcharts(['周一', '周二', '周三', '周四', '周五', '周六', '周日'], res.data)
        })
      })
    },
    // 实验专业统计
    getAllWorkbenchItem() {
      professional().then(res => {
        const arr = []
        let allExNumber = 0 // 专业总实验数
        res.data.forEach(val => {
          allExNumber += val.number
          arr.push({ 'value': val.percent, 'name': val.najorname, 'number': val.number })
        })
        this.allExNumber = allExNumber
        this.InitPieEcharts(arr)
      })
    },
    changeBar(index) {
      this.dateTabbar_index = index
      WorkbenchLately(index).then(res => {
        const { date, count, avg } = res.data
        this.InitLineEcharts(date.reverse(), count.reverse(), avg.reverse(), this.Tabbar_unit)
      })
    },
    InitLineEcharts(xData, seriesData, avg, unit) {
      const option = {
        title: {
          text: '(人数)',
          x: 0,
          textStyle: {
            fontSize: 12,
            align: 'center',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(param) {
            return `
              ${param[0].marker} ${param[0].axisValue} ${unit}</br>
              <span style="font-size:13px";>实验人数: ${param[0].data} 人 </span></br>
              <span style="font-size:13px";>平均成绩: ${avg[param[0].dataIndex]} 分</span>
            `
          }
        },
        grid: { // 显示数据的图表位于当前canvas的坐标轴
          x: 40,
          y: 50,
          x2: 40,
          y2: 50,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          data: xData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'line',
          smooth: true // 开启平滑
        }]
      }
      this.$refs.line.InitLine(option)
    },
    InitPieEcharts(seriesData) {
      const option = {
        // legend: {
        //   top: 'bottom'
        // },
        tooltip: {
          trigger: 'item',
          formatter: function(param) {
            return `${param.marker} ${param.seriesName}</br>
                        ${param.name}: ${param.value}%</br>
                        实验数: ${param.data.number}
                        `
          }
        },
        series: [{
          name: '院校实验数',
          type: 'pie',
          // radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          data: seriesData
        }]
      }
      this.$refs.pie.InitPie(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  color: var(--fontColor);
  flex: 1;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-wrap: wrap;
    .item {
      flex: 1;
      display: flex;
      height: 108px;
      align-items: center;
      justify-content: space-between;
      background-color: var(--bgColor);
      border-radius: 5px;
      box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
      padding: 24px;
    }

    .icon {
      width: 60px;
      height: 60px;
    }

    .text {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .title {
        font-size: 18px;
      }

      .number {
        font-size: 24px;
        color: #53CA9B;

        .format {
          font-size: 16px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }

  .body {
    flex: 1;
    display: flex;
    flex-flow: row wrap;

    .leftMenu {
      padding: 0 24px;
      border-radius: 5px;
      box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
      height: 100%;
      box-sizing: border-box;
      background-color: var(--bgColor);
      display: flex;
      flex-direction: column;
      position: relative;

      .head {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
          font-size: 18px;
          font-weight: bold;
        }

        .title .evaNumber {
          margin-left: 10px;
          font-size: 14px;
        }
      }

      .pagination {
        height: 50px;
        display: flex;
        align-items: center;
      }

    }

    .echarts {
      display: flex;
      flex-direction: column;

      .line {
        flex: 1;
        border-radius: 5px;
        box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
        padding: 0 24px;
        background-color: var(--bgColor);
        min-height: 278px;
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;

        .head {
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .title {
            font-size: 18px;
            font-weight: bold;
          }

          .date {
            display: flex;
            align-items: center;
          }
        }
        .lineEcharts {
          flex: 1;
        }
      }

      .pie {
        flex: 1;
        border-radius: 5px;
        box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
        background-color: var(--bgColor);
        min-height: 278px;
        padding: 0 24px;
        display: flex;
        flex-direction: column;

        .head {
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .title {
            font-size: 18px;
            font-weight: bold;
          }
        }

        .pieStatistics {
          display: flex;
          flex: 1;
        }

        .Statistics {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #eee;

          .number {
            font-size: 48px;
            color: #2A97EC;
          }

          .tips {
            font-size: 14px;
            color: #a9a9;
          }
        }

        .pieEcharts {
          flex: 1;
        }
      }
    }
  }
}

</style>
