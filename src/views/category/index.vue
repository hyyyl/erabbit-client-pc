<template>
  <div class="top-category">
    <div class="container">
    <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item to="/category/1">1</xtx-bread-item>
        <xtx-bread-item :to="{ path : '/category/2' }">2</xtx-bread-item>
        <xtx-bread-item>3</xtx-bread-item>
      </xtx-bread>
    <!-- 轮播图 -->
    <!-- 全部分类 -->
    <!-- 各个分类推销商品 -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopCategory',
  components: {}

}
</script>
<style scoped lang="less"></style>
