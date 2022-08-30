<template>
  <div class="sub-category">
    <div class="container">
    <!-- 面包屑 -->
      <sub-bread></sub-bread>
    <!-- 筛选区 -->
      <sub-filter></sub-filter>
    <!-- 面包屑 -->
    <!-- 面包屑 -->
    </div>
  </div>
</template>
<script>
import SubBread from '@/views/category/component/sub-bread'
import SubFilter from '@/views/category/component/sub-filter'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter
  }
}
</script>
<style scoped lang="less"></style>
