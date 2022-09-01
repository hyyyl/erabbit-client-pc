<template>
  <div class="goods-image">
    <!-- 大图 -->
    <div class="large" v-if="isShow" :style="[{backgroundImage:`url(${images[currIndex]})`},bgPosition]"></div>
    <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="">
      <!-- 遮罩容器 -->
      <div class="layer" v-if="isShow" :style="layerPosition"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active : i === currIndex}">
        <img @mouseenter="currIndex = i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const currIndex = ref(0)
    const { target, isShow, layerPosition, bgPosition } = useImagePreview()
    return { currIndex, target, isShow, layerPosition, bgPosition }
  }
}
/**
 * 实现放大镜功能
 * @returns {{layerPosition: Ref<UnwrapRef<{}>>, bgPosition: Ref<UnwrapRef<{}>>, target: null, isShow: Ref<UnwrapRef<boolean>>}}
 */
const useImagePreview = () => {
  const target = ref(null)
  const isShow = ref(false)
  const layerPosition = ref({})
  const bgPosition = ref({})
  // 获取鼠标基于目标容器的偏移量以及是否在容器中
  const { elementX, elementY, isOutside } = useMouseInElement(target)
  watch([elementX, elementY, isOutside], () => {
    // 监听鼠标位置的改变
    isShow.value = !isOutside.value
    const position = {
      x: elementX.value,
      y: elementY.value
    }
    if (position.x < 100) position.x = 0
    else if (position.x > 300) position.x = 200
    else position.x -= 100

    if (position.y < 100) position.y = 0
    else if (position.y > 300) position.y = 200
    else position.y -= 100
    // 设置遮罩容器的位置
    layerPosition.value.left = position.x + 'px'
    layerPosition.value.top = position.y + 'px'
    // 设置图位置
    bgPosition.value.backgroundPositionX = -2 * position.x + 'px'
    bgPosition.value.backgroundPositionY = -2 * position.y + 'px'
  })
  return { target, isShow, layerPosition, bgPosition }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
