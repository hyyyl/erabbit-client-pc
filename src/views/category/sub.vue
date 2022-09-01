<template>
  <div class="sub-category">
    <div class="container">
    <!-- 面包屑 -->
      <sub-bread></sub-bread>
    <!-- 筛选区 -->
      <sub-filter @filterChange="filterChange"></sub-filter>
    <!-- 商品面板(排序+列表) -->
      <div class="goods-list">
        <!-- 排序 -->
        <sub-sort @sortChange="sortChange"></sub-sort>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id" >
            <goods-item :goods="goods"></goods-item>
          </li>
        </ul>
        <!-- 无限加载 -->
        <xtx-infinite-loading :loading="loading" :finished="finished" @loadData="loadData"></xtx-infinite-loading>
      </div>
    </div>
  </div>
</template>
<script>
import SubBread from '@/views/category/component/sub-bread'
import SubFilter from '@/views/category/component/sub-filter'
import { ref, watch } from 'vue'
import SubSort from '@/views/category/component/sub-sort'
import GoodsItem from '@/views/category/component/goods-item'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    const route = useRoute()
    // 请求参数
    let params = {
      page: 1,
      pageSize: 25
    }
    // 商品列表
    const goodsList = ref([])
    // 加载数据
    const loading = ref(false)
    // 已全部加载
    const finished = ref(false)
    // 获取数据
    const loadData = () => {
      params.categoryId = route.params.id
      findSubCategoryGoods(params).then(({ result }) => {
        loading.value = true
        if (result.items.length) {
          goodsList.value.push(...result.items)
          params.page++
        } else {
          finished.value = true
        }
        loading.value = false
      })
    }
    // 监听，如果二级分类id改变就重新加载数据
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub.${newVal}` === route.path) {
        finished.value = false
        params.page = 1
        // 清空列表，会回到顶部进入可视区然后会自动加载数据
        goodsList.value = []
      }
    }, { immediate: true })
    // 筛选区改变
    const filterChange = (filterParams) => {
      console.log('filterChange')
      params = { ...params, ...filterParams }
      finished.value = false
      params.page = 1
      // 清空列表，会回到顶部进入可视区然后会自动加载数据
      goodsList.value = []
    }

    // 排序区改变
    const sortChange = (sortParams) => {
      console.log('sortChange')
      params = { ...params, ...sortParams }
      finished.value = false
      params.page = 1
      // 清空列表，会回到顶部进入可视区然后会自动加载数据
      goodsList.value = []
    }
    return { finished, loading, loadData, goodsList, filterChange, sortChange }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
