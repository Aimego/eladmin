<template>
    <div class="preview">
        <div class="analysis">
         <div class="achievement">
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
         </div>
         <div class="pie">
            <!-- <div class="detail">
                <div class="exAll">
                    <span class="number">7863</span>
                    <span class="text">实验总次数</span>
                </div>
            </div> -->
            <PieEcharts ref="pie" class="pieEcharts"></PieEcharts>
         </div>
        </div>
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
        experimentStatis: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    // created() {
    //     this.$nextTick(()=> {
    //         analysisById(5).then(res => {
    //         this.experimentStatis = res.data
    //         this.InitPieEcharts([
    //             { value: this.experimentStatis.excellent, name: '优秀' },
    //             { value: this.experimentStatis.good, name: '良好' },
    //             { value: this.experimentStatis.pass, name: '及格' },
    //             { value: this.experimentStatis.fail, name: '不及格' }
    //         ])
    //         })
    //     })
    // },
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
        InitPieEcharts(seriesData){
            let option = {
             legend: {
                top: 'bottom'
             },
             tooltip: {
               trigger: 'item',
               formatter:function(param) {
                console.log(param)
                return `${param.marker} ${param.name}</br>
                总数: ${param.value}人 (${param.data.per}%)`
               }
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
                    fontWeight: 'bold'
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
    .analysis{
        display: flex;
        flex-direction: column;
        // flex-flow: row wrap;
        justify-content: center;
    }
    .achievement {
        flex: 1;
        padding: 0 20px;
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
    .pie {
        display: flex;
        // height: 200px;
        .detail{
            margin: 10px 0;
            // border-right: 1px solid #F0F4F6;
            display:  flex;
            justify-content: center;
            align-items: center;
        }
        .exAll{
            display: flex;
            flex-direction: column;
            align-items: center;
            .number {
                font-size: 28px;
                color: #2A97EC;
                margin-bottom: 5px;
            }
            .text {
                font-size: 14px;
                color: #a9a9a9;
            }
        }
    }
    .pieEcharts{
        height: 100%;
        flex: 70%;
        min-height: 300px;
    }
</style>