<template>
  <div class="home-banner">
  <xtx-carousel :slider="slider" auto-play ></xtx-carousel>
  </div>
</template>
<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'

export default {
  name: 'HomeBanner',
  setup () {
    // 获取轮播图数据
    const slider = ref(null)
    findBanner().then(data => {
      slider.value = data.result
    })
    return { slider }
  }
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
// 覆盖样式
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
