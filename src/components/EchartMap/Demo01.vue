<template>
    <div style="width: 100%; height: 100%; position: relative;">
        <div style="width: 100%; height: 100%;" ref="containerRef"></div>
        <div class="bg"></div>
    </div>
    <div class="echart-tooltip-wrapper" ref=tooltipWrapperRef>
        <div class="title">{{ tooltipWrapperData.title }}</div>
        <div class="list-wrapper">
            <div class="">设备列表{{ tooltipWrapperData.list.length }}</div>
        </div>
    </div>
</template>
<!-- 
    一部分是，但跟更多的是你让我感觉你是个乐观有趣的人，而且还很亲切
 -->
<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import FiveRegion from './mapJson/FiveRegion.json'
import China from './mapJson/China.json'
import { fiveRegionsPro } from './mapUtils/map'

import * as $echarts from 'echarts'
const containerRef = ref()
const mapData = [
    {
        value: [85, 43, 99, '石家庄市', 'high', {
            pos: '东部战区',
            list: [
                {
                    name: '这是名称1'
                },
                {
                    name: '这是名称2'
                },
                {
                    name: '这是名称3'
                }
            ]
        }]
    },
    {
        value: [88, 31, 88, '唐山市', 'high', {
            pos: '东部战区',
            list: [
                {
                    name: '这是名称1'
                },
                {
                    name: '这是名称2'
                },
                {
                    name: '这是名称3'
                }
            ]
        }],
    },
    {
        value: [100, 25, 77, '秦皇岛市', 'high', {
            pos: '东部战区',
            list: [
                {
                    name: '这是名称1'
                },
                {
                    name: '这是名称2'
                },
                {
                    name: '这是名称3'
                }
            ]
        }]
    },
    {
        value: [112, 23, 66, '邯郸市', 'high', {
            pos: '东部战区',
            list: [
                {
                    name: '这是名称1'
                },
                {
                    name: '这是名称2'
                },
                {
                    name: '这是名称3'
                }
            ]
        }]
    },
    {
        value: [116, 28, 55, '邢台市', 'medium', {
            pos: '东部战区',
            list: [
                {
                    name: '这是名称1'
                },
                {
                    name: '这是名称2'
                },
                {
                    name: '这是名称3'
                }
            ]
        }]
    },
    {
        value: [111, 31, 44, '保定市', 'medium', {
            pos: '东部战区',
            list: [
                {
                    name: '这是名称1'
                },
                {
                    name: '这是名称2'
                },
                {
                    name: '这是名称3'
                }
            ]
        }]
    },
    {
        value: [128, 48, 33, '张家口市', 'medium', {
            pos: '东部战区',
            list: [
                {
                    name: '这是名称1'
                },
                {
                    name: '这是名称2'
                },
                {
                    name: '这是名称3'
                }
            ]
        }]
    },
    {
        value: [109, 41, 22, '承德市', 'low', {
            pos: '东部战区',
            list: [
                {
                    name: '这是名称1'
                },
                {
                    name: '这是名称2'
                },
                {
                    name: '这是名称3'
                }
            ]
        }]
    },
    {
        value: [112, 36, 11, '沧州市', 'low', {
            pos: '东部战区',
            list: [
                {
                    name: '这是名称1'
                },
                {
                    name: '这是名称2'
                },
                {
                    name: '这是名称3'
                }
            ]
        }]
    },
    {
        value: [126, 42, 0, '天津市和北京市两个直辖市中间的廊坊市', 'no', {
            pos: '东部战区',
            list: [
                {
                    name: '这是名称1'
                },
                {
                    name: '这是名称2'
                },
                {
                    name: '这是名称3'
                }
            ]
        }]
    },
    {
        value: [98, 36, -1, '衡水市', 'no', {
            pos: '东部战区',
            list: [
                {
                    name: '这是名称1'
                },
                {
                    name: '这是名称2'
                },
                {
                    name: '这是名称3'
                }
            ]
        }]
    }
]
const mapInfo = {
    high: [
        '高',
        '//img.isqqw.com/profile/upload/2023/07/28/fc5f5b7f-780f-4f23-803b-59a4b8d1d408.png',
        '//img.isqqw.com/profile/upload/2023/07/28/32d8713d-fffc-4c58-b43a-baf4aed06bd7.png',
        '//img.isqqw.com/profile/upload/2023/07/28/7ec469c8-e823-4970-98d4-74822f4edd8b.png'
    ],
    medium: [
        '中',
        '//img.isqqw.com/profile/upload/2023/07/28/cfc87aa7-4553-47d1-a508-9cf664de8022.png',
        '//img.isqqw.com/profile/upload/2023/07/28/755ff50f-5f42-4358-813c-67c6cb3dc25c.png',
        '//img.isqqw.com/profile/upload/2023/07/28/cf49cc3e-d06c-4faf-9bef-bb6d3377acbd.png'
    ],
    low: [
        '低',
        '//img.isqqw.com/profile/upload/2023/07/28/d263c0bd-7f16-40be-8c80-73f132f87ca9.png',
        '//img.isqqw.com/profile/upload/2023/07/28/1b264347-82a1-41bb-8bec-4563b6bfa9b3.png',
        '//img.isqqw.com/profile/upload/2023/07/28/ba4c559e-54a7-4eb9-be2f-6e6bd1cb4445.png'
    ],
    no: [
        '无',
        '//img.isqqw.com/profile/upload/2023/07/28/8b424dd7-fa23-4a3b-afc0-0d5e84f13888.png',
        '//img.isqqw.com/profile/upload/2023/07/28/4a7c8742-ce3f-442e-b651-402886d4e100.png',
        '//img.isqqw.com/profile/upload/2023/07/28/9c36c5d2-738e-48d5-bf7c-5ae44aeff1a6.png'
    ]
}
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
        background: "rgb(231, 235, 238)",
        tooltip: {
            // position: 'right',
            // extraCssText: 'width: 200px;',
            hideDelay: 0
        },
        geo: [
            {
                map: `FiveRegion`,
                // 开启缩放和平移
                roam: false,
                layoutCenter: ['50.1%', '63.6%'],
                layoutSize: commonOption.layoutSize,
                tooltip: {
                    show: false
                },
                // 图形上的文本标签
                label: {
                    show: false
                },
                // 地图普通状态样式
                itemStyle: {
                    areaColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 1.5,
                    borderColor: '#1890ff'
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
                layoutCenter: ['50%', '65%'],
                layoutSize: commonOption.layoutSize,
                // 图形上的文本标签
                label: {
                    show: true
                },
                // 地图普通状态样式
                itemStyle: {
                    areaColor: 'rgba(121, 162, 241, 0.4)',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
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
                layoutCenter: ['50%', '67.5%'],
                layoutSize: commonOption.layoutSize,
                // 图形上的文本标签
                label: {
                    show: true
                },
                // 地图普通状态样式
                itemStyle: {
                    areaColor: 'rgba(56, 123, 205, 0.6)',
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
                // scaleLimit: {
                //     min: 0.8,
                //     max: 50
                // },
                // zoom: 1.6,
                layoutCenter: commonOption.layoutCenter,
                layoutSize: commonOption.layoutSize,
                tooltip: {
                    show: false
                },
                // 图形上的文本标签
                label: {
                    show: true
                },
                showLegendSymbol: true,
                // 地图普通状态样式
                itemStyle: {
                    areaColor: '#cee7fe',
                    borderWidth: 1,
                    borderColor: '#ffffff',
                    shadowColor: '#fff',
                    shadowBlur: 0.5,
                    shadowOffsetX: 0.5,
                    shadowOffsetY: 0
                },
                emphasis: {
                    label: {
                        show: true,
                        // color: '#1890ff', // 高亮标签文字颜色
                        // fontSize: 16 // 高亮标签文字大小
                    },
                    itemStyle: {
                        areaColor: '#1890ff', // 高亮区域颜色
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        // borderColor: 'blue', // 高亮区域边框颜色
                        // borderWidth: 2 // 高亮区域边框宽度
                    }
                },
                data: provinceData, // 省份数据
                z: 3
            },
            {
                // 自定义系列, 实现地图点位跳动
                type: 'custom',
                // 该系列使用的坐标系
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 1,
                data: mapData,
                tooltip: {
                    formatter: function (params) {
                        // 在 Tooltip 中添加一个超链接，并设置一个自定义属性 data-index 来标记索引
                        return `<a href="#" data-index="${params.dataIndex}" style="color: blue; text-decoration: underline;">点击我</a>`;
                    }
                },
                // 图形渲染逻辑
                renderItem(params, api) {
                    // 节点名称
                    let name = api.value(3, params.dataIndex);
                    // 等级关键字
                    let riskKey = api.value(4, params.dataIndex);
                    // 点位图片
                    let imgPath = mapInfo[riskKey][2];
                    // 点位图片-鼠标悬浮
                    let imgPathEmphasis = mapInfo[riskKey][3];
                    // 字体样式
                    let fontStyle = api.font({ fontStyle: 'normal', fontWeight: 400, fontSize: 18, fontFamily: 'Microsoft Yahei' });
                    // 获取点位经纬度
                    let coord = api.coord([api.value(0, params.dataIndex), api.value(1, params.dataIndex)]);
                    return {
                        type: 'group',
                        x: coord[0],
                        y: coord[1],
                        children: [
                            {
                                type: 'image',
                                style: {
                                    image: imgPath,
                                    x: -15,
                                    y: -41,
                                    width: 30,
                                    height: 41
                                },
                                // 关键帧动画 Jump animation.
                                keyframeAnimation: {
                                    duration: 1500,
                                    loop: true,
                                    delay: Math.random() * 3000,
                                    keyframes: [
                                        {
                                            y: -10,
                                            percent: 0.5,
                                            // 点位跳动状态，参考缓动示例
                                            easing: 'circularOut'
                                        },
                                        {
                                            y: 0,
                                            percent: 1,
                                            easing: 'quarticOut'
                                        }
                                    ]
                                },
                                // 高量状态
                                emphasis: {
                                    style: {
                                        image: imgPathEmphasis,
                                        x: -18,
                                        y: -49,
                                        width: 36,
                                        height: 49
                                    }
                                }
                            }
                        ]
                    };
                }
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
    // 事件点击高亮区域
    chart.on("click", (params) => {
        console.log(params);
        if (params.componentType === "series" && params.componentSubType === "custom") {
            const { event, data } = params
            showPoint(event, data)
        } else if (params.componentType === 'geo') {
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
        }
    });
}
const tooltipWrapperRef = ref()
const tooltipWrapperData = ref({
    title: '',
    list: []
})

function showPoint(event, data) {
    // console.log(event, data);
    const { offsetX, offsetY } = event
    const _data = {
        title: data.value[5].pos,
        list: data.value[5].list
    }
    tooltipWrapperData.value = _data

    const wrapperDom = tooltipWrapperRef.value as HTMLDivElement
    wrapperDom.style.left = offsetX + 30 + 'px'
    wrapperDom.style.top = offsetY - 40 + 'px'
    wrapperDom.style.display = 'block'
    setTimeout(() => {
        wrapperDom.style.display = 'none'
    }, 3000)
}
onMounted(() => {
    console.log(containerRef.value)
    initEchart()
})
</script>
<style>
.bg {
    width: 100%; height: 100%;
    background: url(./images/1111.png) repeat;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 22;
    pointer-events: none;
}

.echart-tooltip-wrapper {
    width: 300px;
    height: 400px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 2px #a0a0a0;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    transition: display 5s cubic-bezier(0.42, 0, 0.24, 0.94);
}
</style>