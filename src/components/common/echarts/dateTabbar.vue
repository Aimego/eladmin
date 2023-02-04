<template>
    <div class="tabbar">
        <span
            v-for="(item,index) in tabbar"
            :key="index"
            :class="['item',{'item_act': act_index === index}]" @click="$emit('update:act_index', index)"
            >
            {{$t(`dashboard.${item}`)}}
        </span>
    </div>
</template>
<script>
export default {
    name: 'dateTabbar',
    props:{
        tabbar: {
            type: Array,
            default(){
                return ['Day', 'Week', 'Month']
            }
        },
        act_index: {
            type:Number,
            default:0
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