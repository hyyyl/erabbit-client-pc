<template>
  <div class="container">
   <!-- 首页入口 -->
    <div class="home-entry">
    <!-- 左侧分类 -->
      <home-category></home-category>
    <!-- 轮播图 -->
    </div>

  </div>
</template>

<script>

import HomeCategory from '@/views/home/components/home-category'

export default {
  name: 'HomePage',
  components: {
    HomeCategory
  }

}
</script>

<style scoped lang="less">
.container{
  .hoverShadow();
  color: @xtxColor
}
</style>
