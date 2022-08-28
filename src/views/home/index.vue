<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <home-category></home-category>
      <!-- 轮播图 -->
      <home-banner></home-banner>
    </div>
  </div>
  <!-- 新鲜好物 -->
  <home-new></home-new>
  <!-- 人气推荐 -->
  <home-hot></home-hot>
</template>

<script>

import HomeCategory from '@/views/home/components/home-category'
import HomeBanner from '@/views/home/components/home-banner'
import HomeNew from '@/views/home/components/home-new'
import HomeHot from '@/views/home/components/home-hot'

export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot
  }

}
</script>

<style scoped lang="less">
.container{
  .hoverShadow();
  color: @xtxColor
}
</style>
