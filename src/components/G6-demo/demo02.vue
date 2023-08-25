<template>
    <svg width="1000" height="1000" style="border:1px solid steelblue;">
        <!-- <path d="M 10 10 C 20 130, 160 130, 170 20" stroke="black" fill="none"></path> -->
        <path d="M 33 450 C 234, 450, 264, 0, 462, 0" stroke="black" fill="none"></path>
        <path d="M 33 450 C 234, 450, 264, 100, 462, 100" stroke="black" fill="none"></path>
        <path d="M 33 450 C 234, 450, 264, 200, 462, 200" stroke="black" fill="none"></path>
        <path d="M 33 450 C 234, 450, 264, 300, 462, 300" stroke="black" fill="none"></path>
        <path d="M 33 450 C 234, 450, 264, 400, 462, 400" stroke="black" fill="none"></path>
        <path d="M 33 450 C 234, 450, 264, 500, 462, 500" stroke="black" fill="none"></path>
        <path d="M 33 450 C 234, 450, 264, 600, 462, 600" stroke="black" fill="none"></path>
        <path d="M 33 450 C 234, 450, 264, 700, 462, 700" stroke="black" fill="none"></path>
        <path d="M 33 450 C 234, 450, 264, 800, 462, 800" stroke="black" fill="none"></path>
        <!-- <path d="M 10 10 L 20 130 M 160 130 L 170 20" stroke="blue" fill="none" stroke-dasharray="5"></path> -->
    </svg>
    
    <!-- <div class="w-full h-full">
        <div class="box" id="box1">Box 1</div>
        <div class="box" id="box2">Box 2</div>
        <svg id="line"></svg>
    </div> -->
    <!-- 234, 253, 264, 39, 462, 38 -->
    
</template>
<script lang='ts' setup>
import { onMounted } from 'vue';


function drawCurve() {

    const box1 = document.getElementById('box1') as HTMLDivElement;
    const box2 = document.getElementById('box2') as HTMLDivElement;
    const svg = document.getElementById('line') as HTMLDivElement;

    const svgNS = "http://www.w3.org/2000/svg";
    const path = document.createElementNS(svgNS, 'path');
    const rect1 = box1.getBoundingClientRect();
    const rect2 = box2.getBoundingClientRect();

    const startX = rect1.left + rect1.width / 2;
    const startY = rect1.top + rect1.height / 2;
    const endX = rect2.left + rect2.width / 2;
    const endY = rect2.top + rect2.height / 2;

    const controlX = (startX + endX) / 2;
    const controlY = startY - 50; // Adjust this value for the curve

    path.setAttribute('d', `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'black');
    svg.appendChild(path);
}

onMounted(() => {
    // drawCurve();
})
</script>
<style lang='less' scoped>
.box {
    width: 100px;
    height: 100px;
    background-color: blue;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
}

#box1 {
    top: 100px;
    left: 50px;
}

#box2 {
    top: 250px;
    left: 300px;
}
</style>

