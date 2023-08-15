<template>
    <div class="w-[calc(100%-1rem*2)] h-[calc(100%-1rem*2)] p-4 m-4 bg-[#dfe7ef] overflow-hidden">
        <div class="left-wrapper w-[calc(100%-400px-20px)] h-full float-left mr-5"
            :class="[{ '-enter-x -enter-x-bounce': animationFlag }]">
            <div class="w-full h-full" ref="containerRef"></div>
        </div>
        <div class="right-wrapper w-[400px] h-full round float-left shadow shadow-gray-600 bg-white"
            :class="[{ 'enter-x enter-x-bounce': animationFlag }]"></div>
    </div>
    <div class="echart-tooltip-wrapper" ref=tooltipWrapperRef>
        <div class="title">{{ tooltipWrapperData.title }}</div>
        <div class="list-wrapper">
            <div class="">设备列表{{ tooltipWrapperData.list.length }}</div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { ref, onMounted } from 'vue'
// import FiveRegion from './mapJson/FiveRegion.json'
import China from './mapJson/China.json'
import { fiveRegionsPro, generateMapModel, generatePoints, provinceKeys, LayoutOption } from './mapUtils/map'

import * as $echarts from 'echarts'
const containerRef = ref()
const chart = ref()
const mapName = ref('China')
const animationFlag = ref(true)
// setInterval(() => {
//     animationFlag.value = !animationFlag.value
// }, 1500)
function initEchart() {
    // 注册地图
    // $echarts.registerMap('FiveRegion', FiveRegion);
    $echarts.registerMap('China', China);
    chart.value = $echarts.init(containerRef.value)
    const geoArrOption: [LayoutOption, LayoutOption, LayoutOption] = [
        {
            layoutCenter: ["50.1%", "63.6%"],
            layoutSize: '100%',
        },
        {
            layoutCenter: ["50%", "65%"],
            layoutSize: '100%',
        },
        {
            layoutCenter: ["50%", "67.5%"],
            layoutSize: '100%',
        }
    ]
    const seriesOption: [LayoutOption] = [
        {
            layoutCenter: ["50%", "64%"],
            layoutSize: '100%',
        }
    ]
    const { geos, seriseGeo } = generateMapModel({
        geoMapName: 'FiveRegion',
        seriseName: 'China',
        geoArrOption,
        seriesOption
    })
    const option = {
        grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        geo: geos,
        series: [
            seriseGeo,
            generatePoints(),
        ]
    }
    chart.value.setOption(option)
    // 事件点击高亮区域
    chart.value.on("click", (params) => {
        if (params.componentType === "series" && params.componentSubType === "custom") {
            const { event, data } = params
            showPoint(event, data)
        } else if (params.componentType === 'geo') {
            const keys = Object.keys(fiveRegionsPro)
            if (keys.includes(params.name)) {
                keys.forEach(key => {
                    if (key === params.name) {
                        const highlightArr = fiveRegionsPro[params.name]
                        chart.value.dispatchAction({
                            type: 'highlight',
                            // 数据名称
                            seriesName: mapName.value,
                            // 所有数据的选中状态表。
                            name: highlightArr
                        })
                    } else {
                        chart.value.dispatchAction({
                            type: 'downplay',
                            // 数据名称
                            seriesName: mapName.value,
                            // 所有数据的选中状态表。
                            name: fiveRegionsPro[key]
                        })
                    }
                })
            } else {
                // 获取点击的区域名称
                const regionName = params.name;
                chart.value.dispatchAction({
                    type: 'select',
                    // 数据名称
                    seriesName: mapName.value,
                    // 所有数据的选中状态表。
                    name: regionName
                })
                // 遍历除了点击的区域之外的其他区域，取消高亮效果
                // chart.value.dispatchAction({
                //     type: 'downplay',
                //     name: function (data) {
                //         console.log(123, data);

                //         if (data.name !== regionName) return data.name
                //         // return data.name !== params.name;
                //     }
                // });
            }
        }
    });
    chart.value.on("dblclick", (params) => {
        const geoArrOption: [LayoutOption, LayoutOption, LayoutOption] = [
            {
                layoutCenter: ["50%", "44%"],
                layoutSize: '100%',
            },
            {
                layoutCenter: ["50%", "45%"],
                layoutSize: '100%',
            },
            {
                layoutCenter: ["50%", "47.5%"],
                layoutSize: '100%',
            }
        ]
        const seriesOption: [LayoutOption] = [
            {
                layoutCenter: ["50%", "44%"],
                layoutSize: '100%',
            }
        ]
        let path
        const newMapName = params.name
        const regionKeys = Object.keys(fiveRegionsPro)
        const regionIndex = regionKeys.findIndex(key => { return key === newMapName })
        const provinces = provinceKeys.findIndex(key => { return key === newMapName })
        if (regionIndex !== -1) path = `./mapJson/region/${newMapName}`
        else if (provinces !== -1) path = `./mapJson/provinces/${newMapName}`
        else return
        mapName.value = newMapName
        animationFlag.value = false
        import(path + '.json').then(resp => {
            $echarts.registerMap(newMapName, resp)
            chart.value.clear()
            const { geos, seriseGeo } = generateMapModel({
                geoMapName: newMapName,
                seriseName: newMapName,
                geoArrOption,
                seriesOption
            })
            const option = {
                geo: geos,
                series: [
                    seriseGeo,
                ]
            }
            chart.value.setOption(option)
            animationFlag.value = true

        })
    })
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

function getJson() {
    const map = {}
    // 在你的代码中使用 import.meta.glob 获取文件
    const modules = import.meta.glob('./mapJson/provinces/*.json');
    // 遍历获取到的文件并导入
    for (const path in modules) {
        if (Object.hasOwnProperty.call(modules, path)) {
            modules[path]().then(module => {
                // 在这里可以访问导入的模块
                // console.log(module.default); // 导入的组件对象
                const data = module.default
                if (data.features) {
                    data.features.forEach(item => {
                        if (item.properties) {
                            map[item.properties.adcode] = {
                                fileName: item.properties.name,
                                coord: generateRandomCoordinatesWithinCity(item.properties.center, 1, 5)
                            }
                            // getMaxMinLngLat(item.geometry.coordinates)
                            // map[item.properties.name] = getMaxMinLngLat(item.geometry.coordinates)
                            // item.properties.adcode

                        }
                    })
                }
            });
        }
    }
    setTimeout(() => {
        console.log(JSON.stringify(map));
    }, 5000)
}

function getMaxMinLngLat(arr: Array<any>) {

    // console.log(arr);
    let _arr = []
    if (arr.length > 1) {
        // _arr = arr.reduce((acc, curr) => {
        //     return acc.concat(curr);
        // }, []);
        // if (_arr.length > 2) {
        //     _arr = _arr.reduce((acc, curr) => {
        //         return acc.concat(curr);
        //     }, []);
        // }
        // if (_arr.length <= 2) {
        //     _arr = _arr.reduce((acc, curr) => {
        //         return acc.concat(curr);
        //     }, []);

        //     console.log(123, _arr);
        // }
        _arr = arr.flat(2)
        // console.log(123, _arr);
    } else {
        if (arr[0] > 1) _arr = arr
        else _arr = arr[0][0]
    }
    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;
    _arr.forEach(coord => {
        const lng = coord[0];
        const lat = coord[1];

        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
    })
    const newArr = [minLng, maxLng, minLat, maxLat]
    const randomCoordinates = generateRandomCoordinatesWithinCity();
    return randomCoordinates
}
function generateRandomCoordinate(center, deviation) {
  const randomDeviation = deviation * Math.random();
  return center + randomDeviation;
}

function generateRandomCoordinatesWithinCity(center, deviation, count) {
  const coordinates = [];
  
  for (let i = 0; i < count; i++) {
    const randomLng = generateRandomCoordinate(center[0], deviation);
    const randomLat = generateRandomCoordinate(center[1], deviation);
    coordinates.push([randomLng, randomLat]);
  }
  
  return coordinates;
}



onMounted(() => {
    getJson()
    // console.log(containerRef.value)
    // initEchart()
})
</script>
<style>
.bg {
    /* width: 100%;
    height: 100%;
    background: url(./images/1111.png) repeat;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 22;
    pointer-events: none; */
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