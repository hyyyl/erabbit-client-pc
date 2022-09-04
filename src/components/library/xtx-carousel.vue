<template>
  <div class='xtx-carousel' @mouseenter="stop" @mouseleave="start">
    <!-- 轮播图图片容器 -->
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(item,i) in slider" :key="item.id" :class="{fade : index === i}">
        <routerLink to="/" v-if="item.imgUrl">
          <!-- 图片 -->
          <img :src="item.imgUrl" alt="">
        </routerLink>
        <div v-else class="slider">
          <!-- 商品列表 -->
          <router-link v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt="">
            <p class="name ellipsis">{{goods.name}}</p>
            <p class="price">&yen;{{goods.price}}</p>
          </router-link>
        </div>
      </li>
    </ul>
    <!-- 上一张/下一张 -->
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)"><i class="iconfont icon-angle-left"></i></a>
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)"><i class="iconfont icon-angle-right"></i></a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <!-- active激活显示器 -->
      <span v-for="(item,i) in slider" :key="item.id" :class="{active : index === i}" @click="index = i"></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'

export default {
  name: 'XtxCarousel',
  props: {
    // 轮播图数据
    slider: {
      type: Array,
      default: () => []
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 自动轮播间隔时长,默认3000ms
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // 显示哪一张
    const index = ref(0)

    // 自动轮播

    let timer = null
    const autoPlayFn = () => {
      // 自动播放，每隔多久切换索引
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value === props.slider.length) index.value = 0
      }, props.duration)
    }
    // 需要监听sliders的变化，有数据且autoPlay，才开启自动轮播
    watch(() => props.slider, (newVal) => {
      if (newVal && newVal.length && props.autoPlay) {
        autoPlayFn()
      }
    }, { immediate: true })

    // 鼠标进入暂时停止轮播

    const stop = () => {
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.slider.length && props.autoPlay) {
        autoPlayFn()
      }
    }

    // 点击切换
    const toggle = (step) => {
      if (props.slider.length) {
        index.value = (index.value + step + props.slider.length) % props.slider.length
      }
    }

    // 组件卸载时，清楚定时器
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { index, stop, start, toggle }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}

// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px!important;
      height: 230px!important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>
