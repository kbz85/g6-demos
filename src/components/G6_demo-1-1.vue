<template>
    <div id="mountNode" style="width: 500px;height: 500px;"></div>
</template>
<script lang='ts' setup>
import G6 from '@antv/g6';
import { onMounted } from 'vue';

let graph2: any
let nodes2: any[] = []
const angle = (2 * Math.PI) / 10;
function init2() {
    // 创建图形实例
    graph2 = new G6.Graph({
        container: 'mountNode',
        width: 400,
        height: 400,
    });

    // 定义中心点的坐标
    const centerX = 200;
    const centerY = 200;

    // 定义半径和角度
    const radius = 100;
    // 10个点，每个点相隔36度

    // 添加节点数据
    // const nodes2 = [];
    for (let i = 0; i < 10; i++) {
        const x = centerX + radius * Math.cos(i * angle);
        const y = centerY + radius * Math.sin(i * angle);
        nodes2.push({ id: `node${i}`, x, y, label: `node${i}` });
    }

    // 渲染图形
    graph2.data({ nodes: nodes2 });
    graph2.render();
}
let rotation = 0;
let isPaused = false;
// 定义动画函数
function animateNodes2() {
    nodes2.forEach((node: { id: any; }, i: number) => {
        const targetX = 200 + 100 * Math.cos(i * ((2 * Math.PI) / 10) + (Date.now() % 10000) / 1000);
        const targetY = 200 + 100 * Math.sin(i * ((2 * Math.PI) / 10) + (Date.now() % 10000) / 1000);
        // graph.updateItem(node, { x: targetX, y: targetY });
        const item = graph2.findById(node.id);
        graph2.updateItem(item, { x: targetX, y: targetY });
    });

    rotation += angle;

    if (rotation % (Math.PI * 2) === 0) {
        // 旋转一周后暂停10秒
        isPaused = true;
        setTimeout(() => {
            isPaused = false;
        }, 10000);
    }

    if (!isPaused) {
        requestAnimationFrame(animateNodes2);
    }
}
onMounted(() => {
    const container = document.getElementById('mountNode') as HTMLDivElement;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 100;
    const angleStep = Math.PI / 180 * 36; // 每次旋转36°
    const pauseDuration = 3000; // 暂停时长（单位：毫秒）

    const data = Array.from({ length: 10 }).map((_, i) => ({
        id: `${i}`,
        x: centerX + radius * Math.cos(i * angleStep),
        y: centerY + radius * Math.sin(i * angleStep),
        label: `Node ${i + 1}`,
    }));

    const graph = new G6.Graph({
        container: 'mountNode',
        width,
        height,
        defaultNode: {
            size: 30,
            style: {
                fill: '#5B8FF9',
                stroke: '#5B8FF9',
            },
        },
        modes: {
            default: ['drag-node'],
        },
    });

    graph.data({ nodes: data });
    graph.render();
    // 每次增加到36即可停止
    // 
    function rotateNodes() {
        const start = Date.now();
        // let rotaion = 0
        function updateNodes() {
            const elapsed = Date.now() - start;
            const progress = elapsed / pauseDuration;
            console.log(progress);
            
            data.forEach((node, i) => {
                node.x = centerX + radius * Math.cos(i * angleStep + progress * 2 * Math.PI);
                node.y = centerY + radius * Math.sin(i * angleStep + progress * 2 * Math.PI);
                const item = graph.findById(node.id);
                graph.updateItem(item, { x: node.x, y: node.y });
                //   graph.updateItem(node);
            });

            if (progress < 0.36) {
                requestAnimationFrame(updateNodes); // 继续下一帧动画
            } else {
                setTimeout(rotateNodes, pauseDuration); // 停止10秒后重新开始旋转
            }
        }

        requestAnimationFrame(updateNodes);
    }

    rotateNodes()
})
</script>
<style lang='less'></style>