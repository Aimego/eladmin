<template>
    <div class="analysis">
        <div class="content">
                <div class="main course">
                    <div class="head">
                        <span class="title">实验课程基本信息</span>
                        <div class="iconfont icon-ai207 back" @click="$router.go(-1)">返回</div>
                    </div>
                    <div class="mainContent">
                        <table align="center" border="1" width='100%' cellpadding=8 cellspacing=0>
                            <thead>
                             <tr style="backgroundColor:#F5F7FC">  
                                <th>实验课程名称</th>
                                <th>学校</th>  
                                <th>负责人</th> 
                                <th>所属专业类</th>
                                <th>申报级别</th>
                                <th>申报年份</th>
                             </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ exinfo.exname }}</td>
                                    <td>{{ exinfo.school }}</td>
                                    <td>{{ exinfo.fullname }}</td>
                                    <td>{{ exinfo.major }}</td>
                                    <td>{{ exinfo.exlevel | exLevel }}</td>
                                    <td>{{ exinfo.year }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>    
                </div>

                <div class="main questionnaire">
                    <div class="head">
                        <span class="title">参与课程人员统计</span>
                    </div>
                    <div class="mainContent">
                        <div class="search">
                            <span>查询区间：</span>
                            <el-date-picker
                                v-model="daterange1"
                                type="daterange"
                                size="small"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                @change="participateCourse(exId, ...daterange1)"
                                >
                            </el-date-picker>
                            <el-button style="margin-left:20px" size="small" type="primary">查询</el-button>
                        </div>
                        <el-row class="echart">
                            <el-col :sm="24" :md="16" :lg="16">
                                <JoinCourse ref="JoinCourse" class="lineEcharts Echarts"></JoinCourse>
                                <!-- <PieEcharts ref="JoinCourse" class="lineEcharts Echarts"></PieEcharts> -->
                            </el-col>
                            <el-col :sm="24" :md="8" :lg="8">
                                <!-- <PieEcharts ref="rar" class="pieEcharts Echarts"></PieEcharts> -->
                                <Radar ref="radar" class="pieEcharts Echarts"></Radar>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div class="main result">
                    <div class="head">
                        <span class="title">实验成绩及用时统计</span>
                    </div>
                    <div class="mainContent">
                        <table style="margin-bottom:20px" align="center" border="1" width='100%' cellpadding=8 cellspacing=0> 
                            <thead>
                             <tr style="backgroundColor:#F5F7FC">
                                <th>平均成绩</th>
                                <th>实验通过率%</th>  
                                <th>完成实验率%</th> 
                                <th>最高分</th>
                                <th>单人实验最多次数</th> 
                                <th>平均实验用时(sec)</th>
                                <th>实验步数</th>
                             </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{exStatistics.avgScore}}</td>
                                    <td>99.7</td>
                                    <td>100</td>
                                    <td>{{exStatistics.max}}</td>
                                    <td>{{exStatistics.many}}</td>
                                    <td>{{exStatistics.avgTime}}</td>
                                    <td>{{exStatistics.steps}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <el-row class="echart" :gutter="24">
                            <el-col :sm="24" :md="12" :lg="12">
                                <span class="tips">实验分数区间分布图</span>
                                <Bar ref="bar1" class="pieEcharts Echarts"></Bar>
                            </el-col>
                            <el-col :sm="24" :md="12" :lg="12">
                                <span class="tips">实验用时区间分布图</span>
                                <Bar ref="bar2" class="pieEcharts Echarts"></Bar>
                            </el-col>

                            <el-col :sm="24" :md="12" :lg="12" style="margin-top: 10px;">
                                <span class="tips">完成实验日期分布图</span>
                                <Time ref="time" class="lineEcharts Echarts"></Time>
                            </el-col>
                            <el-col :sm="24" :md="12" :lg="12" style="margin-top: 10px;">
                                <span class="tips">单人实验次数TOP10</span>
                                <div class="seniority Echarts">
                                    <div class="left">
                                        <div class="item" v-for="(item, index) in user.slice(0, 5)" :key="index">
                                            <div class="user">
                                                <span :class="['number', {'topnumber':index < 3}]">{{index + 1}}</span>
                                                <div>
                                                    <div class="fname">{{ item.fullname }}</div>
                                                    <div class="name">{{ item.username }}</div>
                                                </div>
                                            </div>
                                            <span class="time">{{ item.count }} 次</span>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="item" v-for="(item, index) in user.slice(5, 10)" :key="index">
                                            <div class="user">
                                                <span class="number">{{ index + 6 }}</span>
                                                <div>
                                                    <div class="fname">{{ item.fullname }}</div>
                                                    <div class="name">{{ item.username }}</div>
                                                </div>
                                            </div>
                                            <span class="time">{{ item.count }} 次</span>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>    
                </div>

                <div class="main score">
                    <div class="head">
                        <span class="title">实验分步成绩及分步用时统计</span>
                    </div>
                    <div class="mainContent">
                        <el-table
                            :data="experimentRecord"
                            border
                            style="width: 100%;"
                            :header-cell-style="{
                                textAlign: 'center',
                                background: 'rgba(250,250,250,1)',
                                color: 'rgba(0,0,0,0.85)',
                                fontSize: '12px',
                            }"
                            :cell-style="{
                                textAlign: 'center',
                                color: '#000',
                                fontSize: '12px',
                            }"
                        >
                            <el-table-column
                                label="用户名"
                                prop="username"
                            >
                            </el-table-column>

                            <el-table-column
                                label="学校"
                                prop="school"
                            >
                            </el-table-column>

                            <el-table-column
                                label="实验名称"
                                prop="title"
                                width="250"
                            >
                            </el-table-column>

                            <el-table-column
                                label="实验结果"
                            >
                                <template slot-scope="scope">
                                    <span>完成</span>
                                </template>
                            </el-table-column>

                            <el-table-column
                                label="实验成绩"
                                prop="score"
                            >
                            </el-table-column>

                            <el-table-column
                                label="实验开始时间"
                                width="160"
                                prop="startTime"
                            >
                            </el-table-column>

                            <el-table-column
                                label="实验结束时间"
                                width="160"
                                prop="endTime"
                            >
                            </el-table-column>

                            <el-table-column
                                label="实验用时(秒)"
                                prop="timeUsed"
                            >
                            </el-table-column>

                            <el-table-column
                                label="操作"
                            >
                            <template slot-scope="scope">
                                <span @click="resultDialog = true" style="color: rgba(67, 110, 243, 1);cursor: pointer;">查看详情</span>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
        <el-dialog
            class="dialog"
            :visible.sync="resultDialog"
            width="60%"
            title="详情"
        >
            <div>
                <div class="detail">
                    <div class="Name">
                        <span>实验名称: {{experimentDetail.title}}</span>
                    </div>
                    <div class="date">
                        <span>实验开始时间: {{experimentDetail.startTime}}</span>
                        <span>实验结束时间: {{experimentDetail.endTime}}</span>
                        <span>实验用时(秒): {{experimentDetail.timeUsed}}</span>
                    </div>
                    <div class="score">
                        <span>实验满分: 100分</span>
                        <span>实验得分: {{experimentDetail.score}}</span>
                        <span>实验结果: 完成</span>
                    </div>
                </div>
                <el-table
                    :data="experimentDetail.exSteps"
                    border
                    style="width: 100%;"
                    :header-cell-style="{
                        textAlign: 'center',
                        background: 'rgba(250,250,250,1)',
                        color: 'rgba(0,0,0,0.85)',
                        fontSize: '12px',
                    }"
                    :cell-style="{
                        textAlign: 'center',
                        color: '#000',
                        fontSize: '12px',
                    }"
                >
                <el-table-column
                    label="步骤名称"
                    prop="title"
                >
                </el-table-column>

                <el-table-column
                    label="步骤开始时间"
                    prop="startTime"
                    width="120"
                >
                </el-table-column>

                <el-table-column
                    label="步骤结束时间"
                    prop="endTime"
                    width="120"
                >
                </el-table-column>

                <el-table-column
                    label="步骤用时(秒)"
                    prop="timeUsed"
                    width="100"
                >
                </el-table-column>

                <el-table-column
                    label="步骤合理用时(秒)"
                    prop="expectTime"
                    width="120"
                >
                </el-table-column>

                <el-table-column
                    label="步骤满分"
                    prop="maxScore"
                >
                </el-table-column>

                <el-table-column
                    label="步骤得分"
                    prop="score"
                >
                </el-table-column>

                <el-table-column
                    label="步骤操作次数"
                    prop="repeatCount"
                    width="100"
                >
                </el-table-column>

                <el-table-column
                    label="步骤评价"
                    prop="evaluation"
                >
                </el-table-column>

                <el-table-column
                    label="备注"
                    prop="remarks"
                >
                </el-table-column>
            </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import JoinCourse from './childrenComponents/Echarts/JoinCourse.vue'
import Radar from './childrenComponents/Echarts/myRadar.vue'
import Bar from './childrenComponents/Echarts/myBar.vue'
import Time from './childrenComponents/Echarts/myTime.vue'
export default {
    components: {
        JoinCourse, Radar, Bar, Time
    },
    data() {
        return {
            daterange1: '',
            exId: '',
            exStatistics: {},
            exCourse: {},
            user: [],
            exinfo: {},
            experimentDetail: {},
            resultDialog: false
        }
    },
    filters: {
        exLevel(status) {
            switch(status) {
                case 1: return '国家级';
                case 2: return '省级';
                case 3: return '校级'
            }
        },
    },
    created() {
        this.exId = this.$route.params.id
        this.ExperimentInfo(this.exId)
        this.participateCourse(this.exId, '2022-01-01', '2022-10-13')
        idCensus(this.exId).then(res => {
            this.exStatistics = res.data
            this.user = res.data.singleCount
            this.$nextTick(()=> {
                this.$refs.bar1.InitEcharts(['0-10','10-20','20-30','30-40','40-50','50-60','60-70','70-80','80-90','90-100'],Object.values(this.exStatistics.scoreRange))
                this.$refs.bar2.InitEcharts(['0-10','10-20','20-30','30-40','40-50','50-60','60-70','70-80','80-90','90-100'],Object.values(this.exStatistics.timeRange))
                this.$refs.time.InitEcharts(this.exStatistics.date, this.exStatistics.count)
            })
        })
    },
    methods: {
     ExperimentInfo(id) {
        this.$nextTick(()=> {
            getQueryMyExperiment(id).then(res => {
                this.exinfo = res.data
            })
        })
     },
     participateCourse(id, start, end) {
        joinCourse(id, start, end).then(res => {
            console.log(res)
            this.exCourse = res.data
            this.$nextTick(()=> {
                let {body1, body2, body3, body4, body5, body6} = this.exCourse
                body1 = Object.values(body1).filter(val => val)
                body2 = Object.values(body2).filter(val => val)
                this.$refs.JoinCourse.InitEcharts(body1, body2)
                this.$refs.radar.InitEcharts([body3, body4, body5, body6])
            })
        })
     }
    }
}
</script>

<style scoped lang="scss">
// @import '~@/assets/elfont/font/iconfont.css';
    .analysis {
        flex: 1;
        padding: 24px;
        display: flex;
    }
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 24px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 3px 8px rgba(62, 100, 146, 0.1);
        .main {
            margin-bottom: 20px;
        }
        .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            // border: 1px solid red;
            margin-bottom: 20px;
            padding-bottom: 25px;
            border-bottom: 1px solid #eee;
        }
        .back {
            cursor: pointer;
            font-size: 14px;
            color: #436EF3;
        }
        .title {
            font-size: 18px;
            font-weight: bold;
            padding-bottom: 5px;
            border-bottom: 2px solid #436EF3;
        }
        .mainContent {
            table {
                font-size: 14px;
                border-color: #fff !important;
                text-align: center;
            }
        }
        .Echarts {
            min-height: 300px;
        }
        .questionnaire {
            .search {
                font-size: 14px;
                margin-bottom: 20px;
            }
            .echart {
                padding: 24px;
                border: 1px solid #eee;
            }
            .lineEcharts {
                border-right: 1px solid #eee;
            }
        }
        .result {
            .Echarts {
                margin-top: 10px;
                border: 1px solid #eee;
            }
            .echart {
                margin-bottom: 20px;
                .tips {
                    font-size: 14px;
                    font-weight: bold;
                }
            }
            .seniority {
                display: flex;
                .left {
                    flex: 1;
                }
                .right {
                    flex: 1;
                }
                .item {
                    height: 20%;
                    font-size: 14px;
                    .user {
                        display: flex;
                        align-items: center;
                        .fname {
                            margin-bottom: 5px;
                            color: #5f5f5f;
                        }
                        .name {
                            font-size: 13px;
                        }
                    }
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .number {
                        padding: 3px 8px;
                        margin-right: 15px;
                        background-color: #e7e7e7;
                        color: #a2a2a2;
                    }
                    .topnumber {
                        background-color: #ff7e00;
                        color: #fff;
                    }
                    .time {
                        font-weight: 700;
                        color: #ff7e00;
                    }
                }
            }
        }
    }
</style>