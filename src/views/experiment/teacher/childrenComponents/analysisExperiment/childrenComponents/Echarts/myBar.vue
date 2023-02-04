<template>
    <div ref="mycharts"></div>
</template>

<script>
export default {
    methods: {
        InitEcharts(xdata, Data) {
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
                    trigger: 'item',
                    formatter: (param) => {
                        return `
                        ${param.marker} ${param.name} </br>
                        总数: ${param.value} 人
                        `
                    }
                },
                xAxis: {
                    name: '分数',
                    type: 'category',
                    data: xdata
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: Data,
                    type: 'bar'
                }]
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