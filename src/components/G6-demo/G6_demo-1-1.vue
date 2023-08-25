<template>
    <div id="mountNode" style="width: 500px;height: 500px;"></div>
</template>
<script lang='ts' setup>
import G6 from '@antv/g6';
import { onMounted } from 'vue';

onMounted(() => {
    /* const container = document.getElementById('mountNode') as HTMLDivElement;

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

    rotateNodes() */
    const graph = new G6.Graph({
        container: 'mountNode',
        width: 500,
        height: 500,
        defaultNode: {
            size: 20,
            style: {
                fill: 'blue'
            }
        }
    });

    const centerX = 250; // 中心点 x 坐标
    const centerY = 250; // 中心点 y 坐标
    const radius = 150;  // 半径
    const angle = Math.PI / 180 * 36; // 每次转动的角度，36° 对应的弧度值
    graph.data({
        nodes: [
            { id: '123', x: centerX, y: centerY }
        ]
    });
    graph.render();
    let angleSum = 0; // 记录总共旋转的角度

    function animateNodes() {
        let start = 0
        graph.getNodes().forEach((node, i) => {
            const _node = node.getModel()
            // centerX + radius点半径 = z
            //  z * cosA = x | cosA =  x / z
            //  z * sinA = y | sinA =  y / z
            const targetX = centerX + radius * Math.cos(angleSum + i * angle);
            const targetY = centerY + radius * Math.sin(angleSum + i * angle);
            // console.log(Math.sin(_node.y / radius)* (180 / Math.PI));
            // console.log(angleSum + i * angle, targetX / radius, targetY / radius);       
            graph.updateItem(node, { x: targetX, y: targetY });
        });

        angleSum += angle;

        if (angleSum >= Math.PI * 2) {
            // 停止旋转，清除定时器
            clearInterval(timer);
        }
    }

    const timer = setInterval(animateNodes, 2000); // 每 2 秒执行一次旋转动画
})
</script>
<style lang='less'></style>