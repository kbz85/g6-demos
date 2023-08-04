import { GeoComponent, GeoComponentOption } from "echarts/components";

export const fiveRegionsPro = {
  EasternRegion: ["江苏", "福建", "浙江", "上海", "安徽", "江西"],
  SouthernRegion: ["广东", "广西", "湖南", "云南", "贵州", "海南"],
  WesternRegion: ["四川", "甘肃", "宁夏", "青海", "新疆", "西藏", "重庆"],
  NorthernRegion: ["辽宁", "黑龙江", "山东", "吉林", "内蒙古"],
  CentralRegion: ["北京", "河北", "天津", "河南", "山西", "陕西", "湖北"],
  "": ["台湾"]
};

export const provinceKeys = [
  "江苏", "福建", "浙江", "上海", "安徽", "江西","广东", "广西", "湖南", "云南", "贵州", "海南",
  "四川", "甘肃", "宁夏", "青海", "新疆", "西藏", "重庆","辽宁", "黑龙江", "山东", "吉林", "内蒙古",
  "北京", "河北", "天津", "河南", "山西", "陕西", "湖北", "台湾"
]

type Layout = {
  layoutCenter: GeoComponentOption["layoutCenter"];
  layoutSize: GeoComponentOption["layoutSize"];
};
type ItemStyle = GeoComponentOption["itemStyle"];
type MapName = string;

type MapArr = [];
/**
 * @description: 构建地图
 * @return {*}
 */
class Map {
  layout: Layout;
  constructor() {}
}
export type LayoutOption = { 
  layoutCenter: [string, string],
  layoutSize: string | number
}
export function generateMapModel(params : {
  geoMapName: string
  seriseName: string
  geoArrOption: [
    LayoutOption, LayoutOption, LayoutOption
  ],
  seriesOption: [
    LayoutOption
  ]
}) {
  const isChina = params.seriseName === 'China'
  const geos = [
    {
      map: params.geoMapName,
      // 开启缩放和平移
      roam: false,
      layoutCenter: params.geoArrOption[0].layoutCenter,
      layoutSize: params.geoArrOption[0].layoutSize,
      tooltip: {
        show: false,
      },
      // 图形上的文本标签
      label: {
        show: false,
      },
      // 地图普通状态样式
      itemStyle: {
        areaColor: "rgba(0, 0, 0, 0)",
        borderWidth: 1.5,
        borderColor: "#1890ff",
      },
      emphasis: {
        disabled: true,
      },
      z: 4,
    },
    {
      map: params.geoMapName,
      // 开启缩放和平移
      roam: false,
      // 控制缩放
      scaleLimit: {
        min: 0.8,
        max: 20,
      },
      // zoom: 1.6,
      layoutCenter: params.geoArrOption[1].layoutCenter,
      layoutSize: params.geoArrOption[1].layoutSize,
      // 图形上的文本标签
      label: {
        show: true,
      },
      // 地图普通状态样式
      itemStyle: {
        areaColor: "rgba(121, 162, 241, 0.4)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.5)",
      },
      emphasis: {
        disabled: true,
      },
      silent: true,
      z: 2,
    },
    {
      map: params.geoMapName,
      // 开启缩放和平移
      roam: false,
      // 控制缩放
      scaleLimit: {
        min: 0.8,
        max: 20,
      },
      // zoom: 1.6,
      layoutCenter: params.geoArrOption[2].layoutCenter,
      layoutSize: params.geoArrOption[2].layoutSize,
      // 图形上的文本标签
      label: {
        show: true,
      },
      // 地图普通状态样式
      itemStyle: {
        areaColor: "rgba(56, 123, 205, 0.6)",
        borderWidth: 0,
      },
      emphasis: {
        disabled: true,
      },
      silent: true,
      z: 1,
    },
  ];
  const seriseGeo = {
    name: params.seriseName,
    type: "map",
    map: params.seriseName,
    selectedMode: isChina ? 'multiple' : 'single',
    // 开启缩放和平移
    roam: false,
    layoutCenter: params.seriesOption[0].layoutCenter,
    layoutSize: params.seriesOption[0].layoutSize,
    tooltip: {
      show: false,
    },
    // 图形上的文本标签
    label: {
      show: true,
    },
    showLegendSymbol: true,
    // 地图普通状态样式
    itemStyle: {
      areaColor: "#cee7fe",
      borderWidth: 1,
      borderColor: "#ffffff",
      shadowColor: "#fff",
      shadowBlur: 0.5,
      shadowOffsetX: 0.5,
      shadowOffsetY: 0,
    },
    emphasis: {
      label: {
        show: true,
      },
      itemStyle: {
        areaColor: "#1890ff", // 高亮区域颜色
        borderColor: "rgba(255, 255, 255, 0.5)",
      },
    },
    select: {
      label: {
        show: true,
      },
      itemStyle: {
        areaColor: "#1890ff", // 高亮区域颜色
        borderColor: "rgba(255, 255, 255, 0.5)",
      },
    },
    data: [], // 省份数据
    z: 3,
  };
  return {
    geos,
    seriseGeo,
  };
}

export function generatePoints() {
  const mapData = [
    {
      value: [
        85,
        43,
        99,
        "石家庄市",
        "high",
        {
          pos: "东部战区",
          list: [
            {
              name: "这是名称1",
            },
            {
              name: "这是名称2",
            },
            {
              name: "这是名称3",
            },
          ],
        },
      ],
    },
    {
      value: [
        88,
        31,
        88,
        "唐山市",
        "high",
        {
          pos: "东部战区",
          list: [
            {
              name: "这是名称1",
            },
            {
              name: "这是名称2",
            },
            {
              name: "这是名称3",
            },
          ],
        },
      ],
    },
    {
      value: [
        100,
        25,
        77,
        "秦皇岛市",
        "high",
        {
          pos: "东部战区",
          list: [
            {
              name: "这是名称1",
            },
            {
              name: "这是名称2",
            },
            {
              name: "这是名称3",
            },
          ],
        },
      ],
    },
    {
      value: [
        112,
        23,
        66,
        "邯郸市",
        "high",
        {
          pos: "东部战区",
          list: [
            {
              name: "这是名称1",
            },
            {
              name: "这是名称2",
            },
            {
              name: "这是名称3",
            },
          ],
        },
      ],
    },
    {
      value: [
        116,
        28,
        55,
        "邢台市",
        "medium",
        {
          pos: "东部战区",
          list: [
            {
              name: "这是名称1",
            },
            {
              name: "这是名称2",
            },
            {
              name: "这是名称3",
            },
          ],
        },
      ],
    },
    {
      value: [
        111,
        31,
        44,
        "保定市",
        "medium",
        {
          pos: "东部战区",
          list: [
            {
              name: "这是名称1",
            },
            {
              name: "这是名称2",
            },
            {
              name: "这是名称3",
            },
          ],
        },
      ],
    },
    {
      value: [
        128,
        48,
        33,
        "张家口市",
        "medium",
        {
          pos: "东部战区",
          list: [
            {
              name: "这是名称1",
            },
            {
              name: "这是名称2",
            },
            {
              name: "这是名称3",
            },
          ],
        },
      ],
    },
    {
      value: [
        109,
        41,
        22,
        "承德市",
        "low",
        {
          pos: "东部战区",
          list: [
            {
              name: "这是名称1",
            },
            {
              name: "这是名称2",
            },
            {
              name: "这是名称3",
            },
          ],
        },
      ],
    },
    {
      value: [
        112,
        36,
        11,
        "沧州市",
        "low",
        {
          pos: "东部战区",
          list: [
            {
              name: "这是名称1",
            },
            {
              name: "这是名称2",
            },
            {
              name: "这是名称3",
            },
          ],
        },
      ],
    },
    {
      value: [
        126,
        42,
        0,
        "天津市和北京市两个直辖市中间的廊坊市",
        "no",
        {
          pos: "东部战区",
          list: [
            {
              name: "这是名称1",
            },
            {
              name: "这是名称2",
            },
            {
              name: "这是名称3",
            },
          ],
        },
      ],
    },
    {
      value: [
        98,
        36,
        -1,
        "衡水市",
        "no",
        {
          pos: "东部战区",
          list: [
            {
              name: "这是名称1",
            },
            {
              name: "这是名称2",
            },
            {
              name: "这是名称3",
            },
          ],
        },
      ],
    },
  ];
  const mapInfo = {
    high: [
      "高",
      "//img.isqqw.com/profile/upload/2023/07/28/fc5f5b7f-780f-4f23-803b-59a4b8d1d408.png",
      "//img.isqqw.com/profile/upload/2023/07/28/32d8713d-fffc-4c58-b43a-baf4aed06bd7.png",
      "//img.isqqw.com/profile/upload/2023/07/28/7ec469c8-e823-4970-98d4-74822f4edd8b.png",
    ],
    medium: [
      "中",
      "//img.isqqw.com/profile/upload/2023/07/28/cfc87aa7-4553-47d1-a508-9cf664de8022.png",
      "//img.isqqw.com/profile/upload/2023/07/28/755ff50f-5f42-4358-813c-67c6cb3dc25c.png",
      "//img.isqqw.com/profile/upload/2023/07/28/cf49cc3e-d06c-4faf-9bef-bb6d3377acbd.png",
    ],
    low: [
      "低",
      "//img.isqqw.com/profile/upload/2023/07/28/d263c0bd-7f16-40be-8c80-73f132f87ca9.png",
      "//img.isqqw.com/profile/upload/2023/07/28/1b264347-82a1-41bb-8bec-4563b6bfa9b3.png",
      "//img.isqqw.com/profile/upload/2023/07/28/ba4c559e-54a7-4eb9-be2f-6e6bd1cb4445.png",
    ],
    no: [
      "无",
      "//img.isqqw.com/profile/upload/2023/07/28/8b424dd7-fa23-4a3b-afc0-0d5e84f13888.png",
      "//img.isqqw.com/profile/upload/2023/07/28/4a7c8742-ce3f-442e-b651-402886d4e100.png",
      "//img.isqqw.com/profile/upload/2023/07/28/9c36c5d2-738e-48d5-bf7c-5ae44aeff1a6.png",
    ],
  };
  const serisePoint = {
    // 自定义系列, 实现地图点位跳动
    type: "custom",
    // 该系列使用的坐标系
    coordinateSystem: "geo",
    geoIndex: 0,
    zlevel: 1,
    data: mapData,
    // 图形渲染逻辑
    renderItem(params, api) {
      // 节点名称
      // let name = api.value(3, params.dataIndex);
      // 等级关键字
      let riskKey = api.value(4, params.dataIndex);
      // 点位图片
      let imgPath = mapInfo[riskKey][2];
      // 点位图片-鼠标悬浮
      let imgPathEmphasis = mapInfo[riskKey][3];
      // 字体样式
      // let fontStyle = api.font({ fontStyle: 'normal', fontWeight: 400, fontSize: 18, fontFamily: 'Microsoft Yahei' });
      // 获取点位经纬度
      let coord = api.coord([
        api.value(0, params.dataIndex),
        api.value(1, params.dataIndex),
      ]);
      return {
        type: "group",
        x: coord[0],
        y: coord[1],
        children: [
          {
            type: "image",
            style: {
              image: imgPath,
              x: -15,
              y: -41,
              width: 30,
              height: 41,
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
                  easing: "circularOut",
                },
                {
                  y: 0,
                  percent: 1,
                  easing: "quarticOut",
                },
              ],
            },
            // 高量状态
            emphasis: {
              style: {
                image: imgPathEmphasis,
                x: -18,
                y: -49,
                width: 36,
                height: 49,
              },
            },
          },
        ],
      };
    },
  };
  return serisePoint
}


// chart.value.on('georoam', params => {
//     let myOption = chart.value.getOption();
//     console.log(myOption);

//     if (params.zoom != null) {
//         //捕捉到缩放时
//         myOption.geo[1].zoom = myOption.geo[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
//         myOption.geo[2].zoom = myOption.geo[0].zoom; //下层的geo的中心位置随着上层geo一起改变
//         myOption.series[0].zoom = myOption.geo[0].zoom;
//     } else {
//         //捕捉到拖曳时
//         myOption.geo[1].center = myOption.geo[0].center; //下层的geo的中心位置随着上层geo一起改变
//         myOption.geo[2].center = myOption.geo[0].center; //下层的geo的中心位置随着上层geo一起改变
//         myOption.series[0].center = myOption.geo[0].center;
//     }
//     chart.value.setOption(myOption);
// });