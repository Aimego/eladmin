<template>
    <div ref="mycharts"></div>
</template>

<script>
export default {
    methods: {
        InitEcharts(value) {
            const option = {
                radar: {
                    indicator: [
                    { name: '浏览量', max: 1000 },
                    { name: '点赞数', max: 1000 },
                    { name: '评论数', max: 1000 },
                    { name: '收藏数', max: 1000 },
                    ]
                },
                series: [{
                    type: 'radar',
                    data: [
                        {
                            value
                        }
                    ]}
                ]
            }
            const Echarts = this.$echarts.init(this.$refs.mycharts)
            Echarts.setOption(option)
            window.addEventListener('resize',() => {
                Echarts.resize()
            })
        }
    }
}
</script>