<template>
    <div class="result">
        <el-result :icon="auditHint.icon">
            <template slot="title">
                <span class="result_title">{{auditHint.title}}</span>
            </template>
        </el-result>
    </div>
</template>

<script>
export default {
    props:{
        status: {
            type: Number,
            default:0
        }
    },
    data() {
        return {

        }
    },
    computed: {
        auditHint(){
            return this.status === 0 ? {icon:'success', title: '已审核通过'} : {icon:'warning', title: '已审核不通过'}
        }
    },
}
</script>

<style lang="scss" scoped>
    .result_title{
        color: #5e6d82;
        font-size: 14px;   
    }
</style>