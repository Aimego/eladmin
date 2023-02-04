<template>
  <div class="experiment">
    <div class="header">
      <el-form inline  class="searchForm">
        <el-form-item label="实验选择">
          <el-select size="small" v-model="experiment_id" @change="changeExperimentId">
            <el-option v-for="(item) in experimentOptiosn" :key="item.id" :label="item.exname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
      <el-row class="body" :gutter="24">
        <el-col :sm="24" :md="24" :lg="19" style="margin-bottom:24px">
          <div class="line">
            <div class="score">
              <div class="head">
                <span class="title">实验周期统计</span>
                <latelyTabbar  @changeBar="changeBar"></latelyTabbar>
              </div>
                <LineEcharts ref="line" class="lineEcharts"></LineEcharts>
            </div>
          </div>
        </el-col>

        <el-col :sm="24" :md="24" :lg="5" style="margin-bottom:24px">
          <div class="pie">
            <rightMenu ref="pie" class="pieEcharts" :experimentStatis="exStatisticData"></rightMenu>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { experimentAll, experimentResult, frequency, experimentStatistic, experimentCourse, achievement } from '@/api/experiment'
import rightMenu from './components/right_menu.vue'
import dateTabbar from '@/components/common/echarts/dateTabbar.vue'
import datePicker from '@/components/common/echarts/datePicker.vue'
import LineEcharts from '@/components/common/echarts/LineEcharts.vue'
import PieEcharts from '@/components/common/echarts/PieEcharts.vue'
import Pagination from '@/components/common/Pagination'
import latelyTabbar from '@/components/common/echarts/latelyTabbar.vue'
export default {
  components: {
    rightMenu,
    Pagination,
    dateTabbar,
    datePicker,
    LineEcharts,
    PieEcharts,
    latelyTabbar
  },
  data() {
    return {
      experiment_id: '',
      experimentOptiosn:[],
      dateTabbar_index: 0,
      Tabbar_type: 'date',
      date:'',
      page: 1,
      pageSize: 4,
      total: 0,
      tableData: [],
      exStatisticData: {},
      table_loading: false
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
    },
    Tabbar_unit() {
      switch(this.dateTabbar_index) {
        case 0: return '周';
        case 1: return '月';
        case 2: return '年';
      }
    }
  },
  created() {
    this.getAllexperiment(1,100)
  },
  methods: {
    getAllexperiment(page, size) { // 获取所有实验
      experimentAll(page, size).then(res => {
        this.experimentOptiosn = res.data
        if(this.experimentOptiosn.length != 0){
          this.experiment_id = this.experimentOptiosn[0].id
          this.changeBar(this.dateTabbar_index, this.experiment_id)
          this.changeExperimentId(this.experiment_id)
        }
      })
    },
    getAllexperimentCourse(id, page, size) { // 查询实验课程
      this.table_loading = true
      experimentCourse(id, page, size).then(res => {
        console.log(res)
        this.table_loading = false
        this.tableData = res.data
        this.total = res.total
      })
    },
    // getAllexperimentResult(date, status, id) { // 查询实验成绩
    //   let xAxisData = []
    //   let seriesData = []
    //   experimentResult(id, date, status).then(res => {
    //     res.data.forEach((val, index) => {
    //       seriesData.push(val)
    //       xAxisData.push(index + 1)
    //     })
    //     this.$nextTick(() => {
    //       this.InitLineEcharts(xAxisData, seriesData)
    //     })
    //   })
    // },
    getAllexperimentScore(id) {
      achievement(id).then(res=> {
        console.log(res)
        let data = res.data
        this.$refs.pie.InitPieEcharts([
                { value: data.excellent, name: '优秀', per: data.excellentPer },
                { value: data.good, name: '良好', per: data.goodPer },
                { value: data.pass, name: '及格', per: data.passPer },
                { value: data.fail, name: '不及格', per: data.failPer }
          ])
      })
    },
    getAllexperimentStatistic(id) { // 查询实验统计
      experimentStatistic(id).then(res => {
        console.log(res.data)
        this.exStatisticData = res.data
      })
    },
    changeExperimentId(exId) {
      // this.getAllexperimentResult(this.date, this.dateTabbar_index, exId)
      // this.getAllexperimentCourse(exId, this.page, this.pageSize)
      this.changeBar(this.dateTabbar_index)
      this.getAllexperimentScore(exId)
      this.getAllexperimentStatistic(exId)
    },
    // 实验课程分页
    changePage(e) {
      this.page = e
      this.getAllexperimentCourse(this.experiment_id, this.page, this.pageSize)
    },
    // 根据周期状态id变更实验成绩
    changeBar(index) {
      this.dateTabbar_index = index
      frequency(index, this.experiment_id).then(res => {
        console.log(res)
        let data = res.data
        this.InitLineEcharts(data.date.reverse(), data.count.reverse(), this.Tabbar_unit)
      })
    },
    InitLineEcharts(xData, seriesData, unit) {
      const option = {
        title:{
          text: '(人数)',
          x: 35,
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
              实验人数: ${param[0].value} 人
              `
          }
        },
        grid:{  //显示数据的图表位于当前canvas的坐标轴
          x:70,
          y:50,
          x2:50,
          y2:70,
          borderWidth:1
        },
        legend: {
          data: ['实验成绩'],
          x2: 50,
          y: 'top'
        },
        xAxis: {
        type: 'category',
        data: xData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '实验成绩',
          data: seriesData,
          type: 'line',
          smooth: true, // 开启平滑
          stack: 'Total',
          // areaStyle: {},
          lineStyle: {
            width: 4,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowBlur: 10,
          }
        }]
      }
      this.$refs.line.InitLine(option)
    },
    InitPieEcharts(seriesData){
      let option = {
            legend: {
              top:'bottom'
            },
            tooltip: {
              trigger: 'item'
            },
            series: [{
              type: 'pie',
              radius: [50, 180],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
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
  .experiment{
    color: var(--fontColor);
    // width: 100%;
    // padding: 24px;
    flex: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .header{
      // border-top: 1px solid #eee;
      // border-bottom: 1px solid #eee;
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
      flex-flow: row wrap;
      // flex-wrap: wrap;
      // justify-content: space-between;
      .line{
        flex: 1;
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        .table {
          padding: 0 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          border-radius: 5px;        
          background-color: var(--bgColor);
          box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
          margin-bottom: 24px;
          .el_table{
            flex: 1;
          }
          .head{
            height: 50px;
            display: flex;
            align-items: center;
            .title{
              font-size: 18px;
              font-weight: bold;
            }
          }
          .pagination{
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: flex-end;            
            }
        }
        .score {
          flex: 1;
          border-radius: 5px;        
          background-color: var(--bgColor);
          box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
          display: flex;
          flex-direction: column;
          min-height: 278px;
          .head{
            height: 50px;
            display: flex;
            align-items: center;
          .title{
            margin: 0 50px 0 24px;
            font-size: 18px;
            font-weight: bold;
            }
          }
          .lineEcharts{
            flex: 1;
          }
        }
        
        .datePick{
            position: absolute;
            // border: 1px solid red;
            width: 100%;
            left: 14px;
            bottom: 0;
            ::v-deep .el-input__inner{
              width: 100px;
              padding: 0;
              border: none;
            }
          }
      }
      .pie{
        // min-height: 700px;
        flex: 1;
        display: flex;
        background-color: var(--bgColor);
        height: 100%;
        border-radius: 5px;
        box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
        padding-bottom: 20px;
        justify-content: center;
        .pieEcharts{
          // width: 100%;
          flex: 1;
          // height: 100%;
        }
      }
    }
  }
</style>

