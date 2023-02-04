<template>
 <div class="analysis">
    <div class="content">
        <div class="main score">
            <div class="head">
                <span class="title">实验成绩统计</span>
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
export default {
    data() {
        return {
            resultDialog: false,
            experimentRecord: [],
            experimentDetail: {}
        }
    }
}
</script>

<style scoped lang="scss">
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
    }
</style>