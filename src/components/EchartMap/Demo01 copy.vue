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

import * as $echarts from 'echarts'
const containerRef = ref()

function initEchart() {
    const provinceData = [
        { name: '北京', value: 100 },
        { name: '上海', value: 200 },
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
                    // shadowColor: '#fff',
                    // shadowBlur: 1,
                    // shadowOffsetX: -2,
                    // shadowOffsetY: 0
                },
                emphasis: {
                    // disabled: true
                },
                z: 4
            },
            /*             {
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
                                    borderColor: 'blue', // 高亮区域边框颜色
                                    borderWidth: 2 // 高亮区域边框宽度
                                }
                            },
                            z: 3
                        }, */
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
            // {
            //     name: "China",
            //     type: "map", // 地图
            //     // map: 'China', // 加载注册的地图
            //     roam: false, // 鼠标事件
            //     data: [], //{name,value} 业务数据
            // },
            /*  {
                 type: 'effectScatter',
                 coordinateSystem: 'geo',
                 data: [
                     { name: '北部战区', value: [116.418261, 39.921984] }, // 北部战区的经纬度坐标
                     { name: '东部战区', value: [121.487899, 31.249162] }, // 东部战区的经纬度坐标
                     { name: '南部战区', value: [113.280637, 23.125178] }, // 南部战区的经纬度坐标
                     { name: '西部战区', value: [108.94254, 34.227066] }, // 西部战区的经纬度坐标
                     { name: '中部战区', value: [113.665412, 34.757975] } // 中部战区的经纬度坐标
                 ],
                 // 设置数据项的标记样式
                 symbolSize: 15, // 标记的大小
                 itemStyle: {
                     color: '#ff0000' // 标记的颜色
                 },
                 label: {
                     show: true, // 显示标记的名称
                     position: 'top', // 标记名称的位置
                     formatter: '{b}' // 标记名称的格式
                 }
             } */
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
        console.log(params);
    });
    chart.dispatchAction({
        type: 'highlight',
        // 数据名称
        seriesName: 'China',
        // 所有数据的选中状态表。
        name: ['新疆维吾尔','西藏', '青海', '甘肃', '宁夏', '四川', '重庆']
    })
    console.log(123123);

    // chart.dispatchAction({
    //     type: 'highlight',
    //     geoIndex: 0,
    //     name: ['新疆维吾尔']
    // })
}
onMounted(() => {
    console.log(containerRef.value)
    initEchart()
})
</script>
<style>
.bg {
    /* width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: 'auto'; */
}
</style>