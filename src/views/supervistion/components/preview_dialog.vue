<template>
    <div class="preview">
        <el-dialog
        class="dialog"
        :visible="dialogVisible"
        width="40%"
        @close="$emit('update:dialogVisible', false)"
        @opened="opened(classData.classId)"
        >
        <template slot="title">
            <div class="title">实验班级成绩分析({{classData.className}})</div>
        </template>
        
        <el-row :gutter="20" class="analysis">
         <el-col :sm="24" :md="24" :lg="12">
            <PieEcharts ref="pie" class="pieEcharts"></PieEcharts>
         </el-col>
         <el-col class="achievement" :sm="24" :md="24" :lg="12">
            <div class="item">
                <span class="title">实验浏览量</span>
                <div class="content">
                    <el-progress class="progress" :text-inside="true" color="rgb(255, 176, 67)" :show-text="true" :stroke-width="20" :format="browse" :percentage="100"></el-progress>
                </div>
            </div>
            <div class="item">
                <span class="title">实验人次</span>
                <div class="content">
                    <el-progress class="progress" :text-inside="true" color="rgb(24, 187, 75)" :show-text="true" :stroke-width="20" :format="exsecond" :percentage="100"></el-progress>
                </div>
            </div>
            <div class="item">
                <span class="title">实验人数</span>
                <div class="content">
                    <el-progress class="progress" :text-inside="true" color="rgb(101, 169, 255)" :show-text="true" :stroke-width="20" :format="exnum" :percentage="100"></el-progress>
                </div>
            </div>
            <div class="item">
                <span class="title">实验平均用时</span>
                <div class="content">
                    <el-progress class="progress" :text-inside="true" color="rgb(255, 58, 76)" :show-text="true" :stroke-width="20" :format="minute" :percentage="100"></el-progress>
                </div>
            </div>
            <div class="item">
                <span class="title">实验完成率</span>
                <div class="content">
                    <el-progress class="progress" :text-inside="true" color="rgb(67, 110, 243)" :show-text="true" :stroke-width="20" :format="complete" :percentage="100"></el-progress>
                </div>
            </div>
            <div class="item">
                <span class="title">实验通过率</span>
                <div class="content">
                    <el-progress class="progress" :text-inside="true" color="rgb(198, 93, 255)" :show-text="true" :stroke-width="20" :format="adopt" :percentage="100"></el-progress>
                </div>
            </div>
        </el-col>
    </el-row>

        

        <span slot="footer" class="dialog_footer">
            <el-button type="primary" @click="$emit('update:dialogVisible', false)">返回</el-button>
         </span>
        </el-dialog>
    </div>
    
</template>

<script>
import PieEcharts from '@/components/common/echarts/PieEcharts.vue'
import { analysisById } from '@/api/supervistion'
export default {
    components: {
        PieEcharts
    },
    props:{
        dialogVisible: {
            type: Boolean,
            default: false
        },
        classData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            experimentStatis:{}
        }
    },
    methods: {
        browse() {
            return `${this.experimentStatis.browse} 人`
        },
        exsecond() {
            return `${this.experimentStatis.exsecond} 次`
        },
        exnum() {
            return `${this.experimentStatis.exnum} 人`
        },
        minute() {
            return `${this.experimentStatis.minute} 分钟`
        },
        complete() {
            return `${this.experimentStatis.complete} %`
        },
        adopt() {
            return `${this.experimentStatis.adopt} %`
        },
        opened(id) {
            analysisById(id).then(res => {
                this.experimentStatis = res.data
                this.InitPieEcharts([
                 { value: this.experimentStatis.excellent, name: '优秀' },
                 { value: this.experimentStatis.good, name: '良好' },
                 { value: this.experimentStatis.pass, name: '及格' },
                 { value: this.experimentStatis.fail, name: '不及格' }
                ])
            })
        },
        InitPieEcharts(seriesData){
            let option = {
             legend: {
                top: 'bottom'
             },
             tooltip: {
               trigger: 'item',
               formatter:'{c} %'
             },
             series: [{
                name: '实验成绩统计',
                type: 'pie',
                radius: '50%',
                avoidLabelOverlap: false,
              emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold',
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
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
    .dialog ::v-deep .el-dialog__header {
        border-bottom: 1px solid #eee;
    }
    .dialog_footer {
        display: flex;
        justify-content: flex-end;
    }
    .analysis{
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }
    .achievement {
        flex: 1;
        .item{
            margin-top: 20px;
            .content{
                display: flex;
                margin-top: 10px;
                align-items: center;
            }
            .content .progress{
                flex: 80%;
                margin-right: 10px;
            }
            .content .number {
                flex: 20%;
            }
        }
    }
    .pieEcharts{
        height: 100%;
        flex: 1;
        min-height: 300px;
    }
</style>