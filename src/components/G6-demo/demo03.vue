<template>
    <div class="w-full h-full">
        <div class="left w-[20%] h-full float-left"></div>
        <div class="center w-[60%] h-full float-left">
            <div class="flex items-center justify-center w-full h-full" id="box">
                <div class="relative a diamond bg-sky-300" id="diamond">
                    <div class="line">
                        <div class="w-point point absolute left-0 top-0 w-full h-[50px] bg-pink-50">
                        </div>
                        <div class="w-point y-point point absolute left-0 top-[calc(50%-25px)] w-full h-[50px] bg-pink-50">
                        </div>
                        <div class="w-point point absolute left-0 bottom-0 w-full h-[50px] bg-pink-50"></div>
                    </div>
                    <div class="line">
                        <div class="h-point x-point point absolute left-[calc(50%-25px)] top-0 w-[50px] h-full bg-pink-50">
                        </div>
                        <div class="h-point point absolute right-0 top-0 w-[50px] h-full bg-pink-50"></div>
                    </div>
                    <div class="line">
                        <div class="w-point y-point point absolute right-0 top-[calc(50%-25px)] w-full h-[50px] bg-pink-50">
                        </div>
                        <div class="w-point point absolute right-0 bottom-0 w-full h-[50px] bg-pink-50"></div>
                    </div>
                    <div class="line">
                        <div class="h-point point absolute top-0 right-0 w-[50px] h-full bg-pink-50"></div>
                        <div class="h-point x-point point absolute right-[calc(50%-25px)] top-0 w-[50px] h-full bg-pink-50">
                        </div>
                    </div>
                </div>
                <div id="diamond-2" class="absolute"></div>
            </div>
        </div>
        <div class="right w-[20%] h-full float-left"></div>
    </div>
</template>
<script lang='ts' setup>
import { onMounted } from 'vue'
import imgP from './images/point.png'
function renderBox() {
    const boxDom = document.getElementById('box') as HTMLDivElement
    const dom = document.getElementById('diamond') as HTMLDivElement
    const dom2 = document.getElementById('diamond-2') as HTMLDivElement
    const size = 0.0012
    dom.style.width = boxDom.clientWidth / 2 * boxDom.clientHeight * size + 'px'
    dom.style.height = boxDom.clientHeight / 2 * boxDom.clientWidth * size + 'px'

    dom2.style.width = boxDom.clientWidth / 2 * boxDom.clientHeight * size + 'px'
    dom2.style.height = boxDom.clientHeight / 2 * boxDom.clientWidth * size + 'px'

    const wPointArr = Array.from(document.getElementsByClassName('w-point'))
    wPointArr.forEach((item, index) => {
        // const pointArr[index]
        const pW = item.clientWidth
        wPointArr[index].style.height = pW + 'px'
        // if (item.classList)
        const classArr = Array.from(item.classList)
        if (classArr.includes('y-point')) wPointArr[index].style.top = `calc(50% - ${pW / 2}px)`
    });

    const hPointArr = Array.from(document.getElementsByClassName('h-point'))
    hPointArr.forEach((item, index) => {
        // const pointArr[index]
        const pH = item.clientHeight
        hPointArr[index].style.width = pH + 'px'
        const classArr = Array.from(item.classList)
        if (classArr.includes('x-point')) hPointArr[index].style.left = `calc(50% - ${pH / 2}px)`
    });
}
onMounted(() => {
    renderBox()
    window.addEventListener('resize', renderBox)
    const box = document.getElementById('diamond-2')
    const pointArr = Array.from(document.getElementsByClassName('point'))

    pointArr.forEach((point, index) => {
        const img = document.createElement('img') as HTMLImageElement
        img.src = imgP
        img.style.top = point.offsetTop + 'px'
        img.style.left = point.offsetLeft + 'px'
        box?.appendChild(img)
        console.log(point.offsetTop, point.offsetLeft);
        // pointArr[index].appendChild(img)
    })

})
</script>
<style lang='less'>
.a {
    transform: scaleY(0.5) rotate(45deg);
}
img {
    position: absolute;
}

.line:nth-of-type(1) {
    @apply ~'w-[15%] h-full' absolute bg-slate-400 top-0 left-0;
}

.line:nth-of-type(2) {
    @apply ~'w-full h-[15%]' absolute bg-slate-400 bottom-0 left-0;
}

.line:nth-of-type(3) {
    @apply ~'w-[15%] h-full' absolute bg-slate-400 top-0 right-0;
}

.line:nth-of-type(4) {
    @apply ~'w-full h-[15%]' absolute bg-slate-400 top-0 right-0;
}

.point {
    @apply z-10;
}</style>