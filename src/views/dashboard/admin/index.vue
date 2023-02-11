<template>
  <div class="dashboard">
      <el-row :gutter="24" class="header">
        <el-col style="margin-bottom:24px" :xs="24" :sm="24" :md="12" :lg="{span : '4-8'}">
         <div class="item">
          <div class="text">
          <!-- 引入了i18n包，中英文切换 -->
           <span class="title">{{$t('dashboard.Total_views')}}</span>
           <div class="number">
             <countTo
              :startVal="0"
              :endVal="Statistic.browse || 0"
              :duration="2000"
             >
            </countTo>
             <span class="format">人</span>
           </div>
          </div>
          <svg-icon icon-class="dashboard_user" class="icon"></svg-icon>
         </div>
        </el-col>

        <el-col style="margin-bottom:24px" :xs="24" :sm="24" :md="12" :lg="{span : '4-8'}">
         <div class="item">
          <div class="text">
           <span class="title">{{$t('dashboard.Total_likes')}}</span>
           <div class="number">
             <countTo
              :startVal="0"
              :endVal="Statistic.likes || 0"
              :duration="2000"
             >
             </countTo>
             <span class="format">人</span>
           </div>
          </div>
          <svg-icon icon-class="dashboard_heart" class="icon"></svg-icon>
         </div>
        </el-col>

        <el-col style="margin-bottom:24px" :xs="24" :sm="24" :md="12" :lg="{span : '4-8'}">
         <div class="item">
          <div class="text">
           <span class="title">{{$t('dashboard.Total_collection')}}</span>
           <div class="number">
             <countTo
              :startVal="0"
              :endVal="Statistic.collection || 0"
              :duration="2000"
             >
             </countTo>
             <span class="format">人</span>
           </div>
          </div>
          <svg-icon icon-class="dashboard_lock" class="icon"></svg-icon>
         </div>
        </el-col>

        <el-col  style="margin-bottom:24px" :xs="24" :sm="24" :md="12" :lg="{span : '4-8'}">
         <div class="item">
          <div class="text">
           <span class="title">{{$t('dashboard.Total_course')}}</span>
           <div class="number">
            <countTo
              :startVal="0"
              :endVal="Statistic.courses || 0"
              :duration="2000"
             >
             </countTo>
             <span class="format">次</span>
           </div>
          </div>
          <svg-icon icon-class="dashboard_book" class="icon"></svg-icon>
         </div>
        </el-col>

        <el-col  style="margin-bottom:24px" :xs="24" :sm="24" :md="12" :lg="{span : '4-8'}">
         <div class="item">
          <div class="text">
           <span class="title">{{$t('dashboard.Total_experiments')}}</span>
           <div class="number">
             <countTo
              :startVal="0"
              :endVal="Statistic.experiments || 0"
              :duration="2000"
             >
             </countTo>
             <span class="format">次</span>
           </div>
          </div>
          <svg-icon icon-class="dashboard_money" class="icon"></svg-icon>
         </div>
        </el-col>
      </el-row>


      <el-row :gutter="24" class="body">
        <el-col :sm="24" :md="24" :lg="13" class="echarts" style="margin-bottom:24px">
            <div class="line">
                <div class="head">
                    <span class="title">{{$t('dashboard.Experimental_results')}}</span>
                    <div class="date">
                      <latelyTabbar  @changeBar="changeBar"></latelyTabbar>
                    </div>
                </div>
                <LineEcharts ref="line" class="lineEcharts"></LineEcharts>
            </div>
            <div class="pie">
                <div class="head">
                    <div class="title">
                      {{$t('dashboard.Major_experiments')}}
                    </div>
                </div>
                <div class="pieStatistics">
                  <div class="Statistics">
                    <span class="number">{{allExNumber}}</span>
                    <span class="tips">实验总数</span>
                  </div>
                  <PieEcharts ref="pie" class="pieEcharts"></PieEcharts>
                </div>
                <!-- <PillarEchats ref="pil" class="pillarEcharts"></PillarEchats> -->
            </div>
        </el-col>

        <el-col :sm="24" :md="24" :lg="11" style="margin-bottom:24px">
          <div class="leftMenu">
            <div class="head">
              <div class="title">
                {{$t('dashboard.Experimental_evaluation')}}<span class="evaNumber">(共{{total}}条)</span>
              </div>
            </div>
            <div class="table">
              <el-table
              :data="tableData"
              ref="table"
              :header-cell-style="table_header"
              :cell-style="table_cell"
              highlight-current-row
              @row-click="handleCurrentRow"
              v-loading="table_loading"
              :element-loading-background="stylize.loadingColor"
             >
              <el-table-column
                type="index"
                :label="$t('dashboard.table.Index')"
                >
              </el-table-column>

              <el-table-column
                :label="$t('dashboard.table.Evaluation_people')"
                prop="username"
                >
              </el-table-column>
            
              <el-table-column
                :label="$t('dashboard.table.Content')"
                prop="evaluate"
                width="200"
              >
              </el-table-column>

              <el-table-column
                :label="$t('dashboard.table.Experiment')"
                prop="exname"
                width="200"
              >
              </el-table-column>

              <el-table-column
                :label="$t('dashboard.table.Date')"
                prop="gmtCreate"
              >
              </el-table-column>
             </el-table>
            </div>
            <div class="pagination">
                <Pagination class="pagin"  :total="total" :size="pageSize" :page="page" @currentPage="changePage"></Pagination>
            </div>
         </div>
        </el-col>
      </el-row>
      <previewDialog :dialogVisible.sync="dialogVisible" :commentId="commentId" @updateTable="getInitevaluate(page, pageSize)"></previewDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dateTabbar from '@/components/common/echarts/dateTabbar.vue'
import latelyTabbar from '@/components/common/echarts/latelyTabbar.vue'
import datePicker from '@/components/common/echarts/datePicker.vue'
import LineEcharts from '@/components/common/echarts/LineEcharts.vue'
import PieEcharts from '@/components/common/echarts/PieEcharts.vue'
import PillarEchats from '@/components/common/echarts/PillarEchats.vue'
import Pagination from '@/components/common/Pagination'
import countTo from 'vue-count-to'
import previewDialog from '@/views/comment/components/preview_dialog.vue'
import { professional } from '@/api/experiment'
import { headerStatistic, evaluate, WorkbenchWeek, WorkbenchLately } from '@/api/dashboard'
import { formatMoney } from '@/utils/format' // 千分位修饰
export default {
  name: 'Dashboard',
  components:{ LineEcharts, PieEcharts, PillarEchats, previewDialog, dateTabbar, latelyTabbar, datePicker, Pagination, countTo},
  computed:{
    ...mapGetters(['stylize']), 
    table_header() {
      return {
        textAlign: 'center'
      }
    },
    table_cell() {
      return {
        textAlign: 'center',
      }
    },
    total_pages() {
      return Math.ceil(this.total / this.pageSize)
    },
    Tabbar_unit() {
      switch(this.dateTabbar_index) {
        case 0: return '周';
        case 1: return '月';
        case 2: return '年';
      }
    }
  },
  data() {
    return {
      page: 1,
      pageSize: 11,
      total: 0,
      tableData:[],
      commentId: 0, 
      table_loading: true,
      dialogVisible: false,
      dateTabbar_index: 0,
      allExNumber: 0, // 专业总实验数
      Statistic:{
        browse: 71589,
        likes: 33836,
        collection: 22903,
        courses: 27887,
        experiments: 59884
      } // header统计数据
    }
  },
  created() {
    // this.getAllheaderStatistic()
    this.getInitevaluate(this.page, this.pageSize)
    this.$nextTick(() => {
      this.getAllWorkbenchItem()
      this.changeBar(this.dateTabbar_index)
    })
  },
  methods: {
    // 头部数据展示
    getAllheaderStatistic() {
      headerStatistic().then(res=>{
        console.log(res)
        let course_count = res[1].data
        let test_count = res[2].data
        let obj = {...res[0].data, course_count, test_count}
        this.Statistic = obj
      })
    },
    // 初始化实验评价统计
    async getInitevaluate(page, size) {
      this.table_loading = true
      let data = await evaluate(page, size)
      this.total = data.total
      this.tableData = data.data
      this.table_loading = false
    },
    // 实验评论统计分页
    async getevaluatePage(page , size) {
      this.table_loading = true
      let data = await evaluate(page, size)
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
    // 选中评论行
    handleCurrentRow({id}) {
      this.commentId = id
      this.dialogVisible = true
    },
    // 统计实验平均分
    getAllWorkbenchWeek(we, status) {
      console.log(we, status)
      WorkbenchWeek(we, status).then(res => {
        this.$nextTick(()=>{
          this.InitLineEcharts(['周一','周二','周三','周四','周五','周六','周日'],res.data)
        })
      })
    },
    // 实验专业统计
    getAllWorkbenchItem() {
      professional().then(res => {
        let arr = []
        let allExNumber = 0 // 专业总实验数
        res.data.forEach(val => {
          allExNumber += val.number
          arr.push({'value': val.percent, 'name': val.najorname, 'number': val.number})
        })
        this.allExNumber = allExNumber
        this.InitPieEcharts(arr)
    })
    },
    changeBar(index) {
      this.dateTabbar_index = index
      WorkbenchLately(index).then(res=> {
        console.log(res)
        let {date, count, avg} = res.data
        this.InitLineEcharts(date.reverse(), count.reverse(), avg.reverse(), this.Tabbar_unit)
      })
    },
    InitLineEcharts(xData, seriesData, avg, unit){
      const option = {
        title:{
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
        grid:{          //显示数据的图表位于当前canvas的坐标轴
          x:40,
          y:50,
          x2:40,
          y2:50,
          borderWidth:1
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
    InitPieEcharts(seriesData){
      let option = {
            // legend: {
            //   top: 'bottom'
            // },
            tooltip: {
              trigger: 'item',
              formatter:function(param){
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
  .el-table ::v-deep .cell{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
 .dashboard{
    color: var(--fontColor);
    flex: 1;
    // padding: 24px;
    display: flex;
    flex-direction: column;
    .header{
        flex: 15%;
        display: flex;
        flex-wrap: wrap;
        .item{
         flex: 1;
         display: flex;
         height: 100%;
         align-items: center;
         justify-content: space-between;
         background-color: var(--bgColor);
        //  color: var(--fontColor);
         border-radius: 5px;
         box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
         padding: 24px;
       }
      .icon{
        width: 60px;
        height: 60px;
      }
      .population {
        // border: 1px solid red;
        fill: black !important;
        // stroke: black;
      }
      .amount{
        fill: red !important;
      }
      .text{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
       .title{
          font-size: 18px;
        }
       .number{
          font-size: 24px;
          color: #53CA9B;
          .format{
            font-size: 16px;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
    }
    .body{
        flex: 85%;
        display: flex;
        flex-flow: row wrap;
        .leftMenu{
            padding: 0 24px;
            border-radius: 5px;
            box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
            height: 100%;
            box-sizing: border-box;
            background-color: var(--bgColor);
            display: flex;
            flex-direction: column;
            position: relative;
            .head{
              height: 50px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .title{
                font-size: 18px;
                font-weight: bold;
              }
              .title .evaNumber{
                margin-left: 10px;
                font-size: 14px;
              }
            }
            .table{
                // max-height: 598px;
                flex: 1;
                // overflow-y: hidden;
            }
            .pagination{
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: flex-end;            
            }

        }
        .echarts{
            display: flex;
            flex-direction: column;
            .line{
                flex: 1;
                // position: relative;
                border-radius: 5px;
                box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
                padding: 0 24px;
                background-color: var(--bgColor);
                min-height: 278px;
                margin-bottom: 24px;
                display: flex;
                flex-direction: column;
                .head{
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .title{
                        font-size: 18px;
                        font-weight: bold;
                    }
                     .date {
                      display: flex;
                      align-items: center;
                    }
                }
                .datePick{
                  position: absolute;
                  left: 14px;
                  bottom: 0;
                  ::v-deep .el-input__inner{
                    width: 100px;
                    padding: 0;
                    border: none;
                  }
                }
                .lineEcharts{
                    flex: 1;
                }
            }
            .pie{
                flex: 1;
                border-radius: 5px;
                box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
                background-color: var(--bgColor);
                min-height: 278px;
                padding: 0 24px;
                display: flex;
                flex-direction: column;
                .head{
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .title{
                        font-size: 18px;
                        font-weight: bold;
                    }
                }
                .pieStatistics{
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
 @media only screen and (min-width: 768px) {
    .el-col-sm-4-8 {
      width: 20%;
    }
    .el-col-sm-offset-3-4 {
      margin-left: 20%;
    }
    .el-col-sm-pull-3-4 {
      position: relative;
      right: 20%;
    }
    .el-col-sm-push-3-4 {
      position: relative;
      left: 20%;
    }
  }

  @media only screen and (min-width: 992px) {
    .el-col-md-4-8 {
      width: 20%;
    }
    .el-col-md-offset-3-4 {
      margin-left: 20%;
    }
    .el-col-md-pull-3-4 {
      position: relative;
      right: 20%;
    }
    .el-col-md-push-3-4 {
      position: relative;
      left: 20%;
    }
  }

  @media only screen and (min-width: 1200px) {
    .el-col-lg-4-8 {
      width: 20%;
    }
    .el-col-lg-offset-4-8 {
      margin-left: 20%;
    }
    .el-col-lg-pull-4-8 {
      position: relative;
      right: 20%;
    }
    .el-col-lg-push-4-8 {
      position: relative;
      left: 20%;
    }
  }

  @media only screen and (min-width: 1920px) {
    .el-col-xl-4-8 {
      width: 20%;
    }
    .el-col-xl-offset-4-8 {
      margin-left: 20%;
    }
    .el-col-xl-pull-4-8 {
      position: relative;
      right: 20%;
    }
    .el-col-xl-push-4-8 {
      position: relative;
      left: 20%;
    }
  }
</style>
