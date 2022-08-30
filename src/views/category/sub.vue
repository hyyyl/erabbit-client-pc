<template>
  <div class="sub-category">
    <div class="container">
    <!-- 面包屑 -->
      <sub-bread></sub-bread>
    <!-- 筛选区 -->
      <sub-filter></sub-filter>
    <!-- 商品面板(排序+列表) -->
      <div class="goods-list">
        <sub-sort></sub-sort>
      </div>
    <!-- 面包屑 -->
    </div>
  </div>
</template>
<script>
import SubBread from '@/views/category/component/sub-bread'
import SubFilter from '@/views/category/component/sub-filter'
import { ref } from 'vue'
import SubSort from '@/views/category/component/sub-sort'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort
  },
  setup () {
    const isCheck = ref(true)

    return { isCheck }
  }
}
</script>
<style scoped lang="less"></style>
