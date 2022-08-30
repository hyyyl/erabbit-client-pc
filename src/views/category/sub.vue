<template>
  <div class="sub-category">
    <div class="container">
    <!-- 面包屑 -->
      <sub-bread></sub-bread>
    <!-- 筛选区 -->
      <sub-filter></sub-filter>
    <!-- 面包屑 -->
      <xtx-checkbox v-model="isCheck">全选{{isCheck}}</xtx-checkbox>
    <!-- 面包屑 -->
    </div>
  </div>
</template>
<script>
import SubBread from '@/views/category/component/sub-bread'
import SubFilter from '@/views/category/component/sub-filter'
import { ref } from 'vue'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter
  },
  setup () {
    const isCheck = ref(true)

    return { isCheck }
  }
}
</script>
<style scoped lang="less"></style>
