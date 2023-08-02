<template>
    <div style="width: 100%; height: 100%; position: relative;">
        <div style="width: 100%; height: 100%; background: #ccc;" ref="containerRef"></div>
        <div class="bg"></div>
    </div>
</template>
<!-- /**
 * 1. 获取地图数据
 * 2. 将地图注册金echarts - echarts.registerMap('HK', geoJson);
 * 3. 添加options，设置坐标
 */ -->
<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import FiveRegion from './mapJson/FiveRegion.json'
import China from './mapJson/China.json'
import { fiveRegionsPro } from './mapUtils/map'

import * as $echarts from 'echarts'
const containerRef = ref()

function initEchart() {
    const provinceData = [
        // { name: '北京', value: 100 },
        // { name: '上海', value: 200 },
        // 这里可以添加其他省份数据
    ];
    // 注册地图
    $echarts.registerMap('FiveRegion', FiveRegion);
    $echarts.registerMap('China', China);
    const commonOption = {
        layoutCenter: ['50%', '64%'],
        layoutSize: 1000,
    }
    const chart = $echarts.init(containerRef.value)
    const option = {
        background: "#ccc",
        geo: [
            {
                map: `FiveRegion`,
                // 开启缩放和平移
                roam: false,
                // 滚轮缩放的极限控制
                scaleLimit: {
                    min: 0.8,
                    max: 50
                },
                // zoom: 1.6,
                layoutCenter: commonOption.layoutCenter,
                layoutSize: commonOption.layoutSize,
                // 图形上的文本标签
                label: {
                    show: false
                },
                // 地图普通状态样式
                itemStyle: {
                    areaColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 2,
                    borderColor: '#148aea',
                },
                emphasis: {
                    disabled: true
                },
                z: 4
            },
            {
                // 3层地图，实现阴影效果
                map: `FiveRegion`,
                // 开启缩放和平移
                roam: false,
                // 控制缩放
                scaleLimit: {
                    min: 0.8,
                    max: 20
                },
                // zoom: 1.6,
                layoutCenter: ['50%', '66%'],
                layoutSize: commonOption.layoutSize,
                // 图形上的文本标签
                label: {
                    show: true
                },
                // 地图普通状态样式
                itemStyle: {
                    areaColor: 'rgba(110, 166, 255, 1)',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    // shadowColor: '#71a3ea',
                    // shadowBlur: 3,
                    // shadowOffsetX: 10,
                    // shadowOffsetY: 18
                },
                emphasis: {
                    disabled: true
                },
                silent: true,
                z: 2
            },
            {
                // 2层地图，实现阴影效果
                map: `FiveRegion`,
                // 开启缩放和平移
                roam: false,
                // 控制缩放
                scaleLimit: {
                    min: 0.8,
                    max: 20
                },
                // zoom: 1.6,
                layoutCenter: ['50%', '68%'],
                layoutSize: commonOption.layoutSize,
                // 图形上的文本标签
                label: {
                    show: true
                },
                // 地图普通状态样式
                itemStyle: {
                    areaColor: '#fff',
                    borderWidth: 0,
                    // borderColor: 'rgba(255, 255, 255, 0.3)',
                    // shadowColor: '#71a3ea',
                    // shadowBlur: 3,
                    // shadowOffsetX: 10,
                    // shadowOffsetY: 18
                },
                emphasis: {
                    disabled: true
                },
                silent: true,
                z: 1
            }
        ],
        series: [
            {
                name: 'China',
                type: 'map',
                map: `China`,
                // 开启缩放和平移
                roam: false,
                // 滚轮缩放的极限控制
                scaleLimit: {
                    min: 0.8,
                    max: 50
                },
                // zoom: 1.6,
                layoutCenter: commonOption.layoutCenter,
                layoutSize: commonOption.layoutSize,
                // 图形上的文本标签
                label: {
                    show: true
                },
                // 地图普通状态样式
                itemStyle: {
                    areaColor: '#cee7fe',
                    borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor: '#fff',
                    shadowBlur: 0.5,
                    shadowOffsetX: 0.5,
                    shadowOffsetY: 0
                },
                emphasis: {
                    label: {
                        show: true,
                        color: 'red', // 高亮标签文字颜色
                        fontSize: 16 // 高亮标签文字大小
                    },
                    itemStyle: {
                        areaColor: 'yellow', // 高亮区域颜色
                        // borderColor: 'blue', // 高亮区域边框颜色
                        // borderWidth: 2 // 高亮区域边框宽度
                    }
                },
                data: provinceData, // 省份数据
                z: 3
            }
        ]
    }
    chart.setOption(option)
    //捕捉georoam事件，使下层的geo随着上层的geo一起缩放拖曳
    chart.on('georoam', params => {
        let myOption = chart.getOption();
        console.log(myOption);

        if (params.zoom != null) {
            //捕捉到缩放时
            myOption.geo[1].zoom = myOption.geo[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
            myOption.geo[2].center = myOption.geo[0].center; //下层的geo的中心位置随着上层geo一起改变
            myOption.geo[3].center = myOption.geo[0].center; //下层的geo的中心位置随着上层geo一起改变
            //捕捉到缩放时
            myOption.geo[1].zoom = myOption.geo[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
            myOption.geo[2].center = myOption.geo[0].center; //下层的geo的中心位置随着上层geo一起改变
            myOption.geo[3].center = myOption.geo[0].center; //下层的geo的中心位置随着上层geo一起改变
        } else {
            //捕捉到拖曳时
            myOption.geo[1].center = myOption.geo[0].center; //下层的geo的中心位置随着上层geo一起改变
            myOption.geo[2].center = myOption.geo[0].center; //下层的geo的中心位置随着上层geo一起改变
            myOption.geo[3].center = myOption.geo[0].center; //下层的geo的中心位置随着上层geo一起改变
        }
        chart.setOption(myOption);
    });
    chart.on("click", (params) => {
        const keys = Object.keys(fiveRegionsPro)
        keys.forEach(key => {
            if (key === params.name) {
                const highlightArr = fiveRegionsPro[params.name]
                chart.dispatchAction({
                    type: 'highlight',
                    // 数据名称
                    seriesName: 'China',
                    // 所有数据的选中状态表。
                    name: highlightArr
                })
            } else {
                chart.dispatchAction({
                    type: 'downplay',
                    // 数据名称
                    seriesName: 'China',
                    // 所有数据的选中状态表。
                    name: fiveRegionsPro[key]
                })
            }
        })

    });

}
onMounted(() => {
    console.log(containerRef.value)
    initEchart()
})
</script>
<style>
.bg {}
</style>