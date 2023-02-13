<template>
    <div ref="mycharts"></div>
</template>

<script>
export default {
    methods: {
        InitEcharts({body1,body2}) {
            const option = {
                title: {
                    text: '(人次)',
                    x: 35,
                    textStyle: {
                        fontSize: 12,
                        align: 'center',
                        fontWeight: 'normal'
                    },
                },
                tooltip: {
                    trigger: 'item'
                },
                xAxis: {
                    name: '分数',
                    type: 'category',
                    data: ['完成实验总人次','完成实验总人数']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '本校用户',
                    stack: 'Ad',
                    data: body1,
                    type: 'bar'
                },{
                    name: '其他学校',
                    stack: 'Ad',
                    data: body2,
                    type: 'bar'
                }
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