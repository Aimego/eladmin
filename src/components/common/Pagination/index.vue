<template>
    <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        :current-page="page"
        :small="small"
        :hide-on-single-page="true"
        @current-change="currentChange"
    >

    </el-pagination>
</template>

<script>
export default {
    props:{
        total: {
            type: Number,
            default: 10
        },
        page: {
            type: Number,
            default: 1
        },
        size: {
            type: Number,
            default: 10
        },
        small: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        currentChange(page){
            this.$emit('currentPage',page)
        }
    }
}
</script>

<style lang="scss" scoped>
    .pagination ::v-deep{
        .active {
            color: #fff !important;
            background-color: rgba(33, 187, 126, 1) !important;
        }
        li{
            color: rgba(33, 187, 126, 1) !important;
            background-color: rgba(33, 187, 126, 0.1) !important;
        }
    }
</style>
