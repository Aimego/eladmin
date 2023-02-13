<template>
    <div ref="mycharts"></div>
</template>

<script>
export default {
    methods: {
        InitEcharts(date, count) {
            let data = []
            for(let i = 1; i < date.length; i++) {
                data.push([date[i], count[i]])
            }
            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'time',
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 20
                },
                {
                    start: 0,
                    end: 20
                }],
                visualMap: {
                    top: 0,
                    right: 10,
                    pieces: [{
                        gt: 0,
                        lte: 50,
                        color: '#93CE07'
                    },
                    {
                        gt: 50,
                        lte: 100,
                        color: '#FBDB0F'
                    },
                    {
                        gt: 100,
                        lte: 150,
                        color: '#FC7D02'
                    },
                    {
                        gt: 150,
                        lte: 200,
                        color: '#FD0100'
                    },
                    {
                        gt: 200,
                        lte: 300,
                        color: '#AA069F'
                    },
                    {
                        gt: 300,
                        color: '#AC3B2A'
                    }],
                outOfRange: {
                    color: '#999'
                }
            },
            series: [{
                name: '人次',
                type: 'line',
                smooth: true,
                symbol: 'none',
                // areaStyle: {},
                data: data
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