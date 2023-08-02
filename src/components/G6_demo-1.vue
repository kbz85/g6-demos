<template>
    <div id="mountNode"></div>
</template>
<script lang='ts' setup>
import G6 from '@antv/g6';
import { onMounted } from 'vue';
import { generateCircularLayout } from '../utils'
// import nodeImg from '../assets/node.png?raw'
// 定义自定义节点形状
G6.registerNode('image-node', {
    draw(cfg, group) {
        const { x, y, img } = cfg;

        const imgShape = group.addShape('image', {
            attrs: {
                x: x,
                y: y,
                width: 10,
                height: 10,
                img
            },
            name: 'image-shape'
        });
        return imgShape
    },
});
const centerNode = {
    id: 'id-center',
    x: 200,
    y: 200,
    size: 20,
    type: 'image',
    img: 'http://seopic.699pic.com/photo/50055/5642.jpg_wh1200.jpg',
    label: 'Node 0',
    shape: 'image-node', // 使用自定义的节点样式
}
const radius = 100
const pointsSum = 10
const points = generateCircularLayout(centerNode.x, centerNode.y, radius, pointsSum)

const nodes = points.map((item, index) => {
    return Object.assign({
        id: 'id-' + index,
        img: 'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png',
        label: 'Node ' + index,
        size: 20,
        type: 'image',
        shape: 'image-node', // 使用自定义的节点样式
    }, item)
})
nodes.unshift(centerNode)

const edges = nodes.map(node => {
    return {
        target: node.id,
        source: 'id-center'
    }
})
let graph: any = null
function init() {
    const data = {
        // 点集
        nodes: nodes,
        // 边集
        edges: edges,
    };
    graph = new G6.Graph({
        container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: 800, // Number，必须，图的宽度
        height: 500, // Number，必须，图的高度
    });

    graph.data(data); // 读取 Step 2 中的数据源到图上
    graph.render(); // 渲染图
}
const targetAngle = Math.PI * 2 / pointsSum; // 目标角度，对应36°
let currentAngle = 0;
let startTime: number = 0;
const duration = 1000; // 动画持续时间，单位毫秒

// 定义动画函数
function animateNodes(timestamp: any) {
    if (!startTime) {
        startTime = timestamp;
    }
    const progress = (timestamp - startTime) / duration;
    const angle = currentAngle + targetAngle * progress;
    nodes.forEach((node, i) => {
        if (node.id !== 'id-center') {
            i = i - 1
            const iAngle = (Math.PI * 2 * i) / pointsSum
            const targetX = centerNode.x + radius * Math.cos(iAngle + angle);
            const targetY = centerNode.y + radius * Math.sin(iAngle + angle);
            const item = graph.findById(node.id)
            graph.updateItem(item, { x: targetX, y: targetY });
        }
    })
    if (progress < 1) {
        requestAnimationFrame(animateNodes);
    } else {
        currentAngle = angle % (2 * Math.PI);
        startTime = 0;
        setTimeout(() => {
            requestAnimationFrame(animateNodes);
        }, duration)
    }
}
onMounted(() => {
    init()
    setTimeout(() => {
        requestAnimationFrame(animateNodes);
    }, duration)
})
</script>
<style lang='less'></style>