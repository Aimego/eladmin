<template>
    <el-pagination
        class="pagination"
        background
        layout="sizes, prev, pager, next"
        :total="total"
        :page-size="size"
        :current-page="page"
        :small="small"
        :hide-on-single-page="false"
        :page-sizes="[5,10,20,30,50,100]"
        @current-change="currentChange"
        @size-change="currentSizeChange"
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
        },
        currentSizeChange(size) {
            this.$emit('currentSize',size)
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
