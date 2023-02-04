<template>
    <div class="tabbar">
        <span
            v-for="(item, index) in tabbar"
            :key="index"
            :class="['item',{'item_act': act_index === index}]"
            @click="changeActBar(index)"
            >
            {{item}}
        </span>
    </div>
</template>
<script>
export default {
    name: 'latelyTabbar',
    data() {
        return {
            act_index: 0,
            tabbar:['按周', '按月','按年']
        }
    },
    methods: {
        changeActBar(index) {
            this.act_index = index
            this.$emit('changeBar', index)
        }
    }
}
</script>

<style lang="scss" scoped>
    .tabbar{
        display: flex;
        .item{
            cursor: pointer;
            margin-right: 10px;
            padding: 6px;
            font-size: 14px;
            border-radius: 4px;
            color: rgba(153, 153, 153, 1);
        }
        .item_act{
            color: #fff;
            background-color: rgba(33, 187, 126, 1);
        }
    }
</style>