<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item :to="'/category/'+goods.categories[1].id">{{goods.categories[1].name}}</xtx-bread-item>
        <xtx-bread-item :to="'/category/sub/'+goods.categories[0].id">{{goods.categories[0].name}}</xtx-bread-item>
        <xtx-bread-item to="/">{{goods.name}}</xtx-bread-item>
      </xtx-bread>
      <!-- 商品信息 -->
      <div class="goods-info"></div>
      <!-- 商品推荐 -->
      <goods-relevant></goods-relevant>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>

import GoodsRelevant from '@/views/goods/components/goods-relevant'
import XtxBread from '@/components/library/xtx-bread'
import XtxBreadItem from '@/components/library/xtx-bread-item'
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'

export default {
  name: 'XtxGoodsPage',
  components: {
    XtxBreadItem,
    XtxBread,
    GoodsRelevant
  },
  setup () {
    const goods = getGoods()
    setTimeout(() => {
      console.log(goods.value)
    }, 3000)
    return { goods }
  }
}

const getGoods = () => {
  // id发生变化，组件不会重新渲染
  const goods = ref(null)
  const route = useRoute()

  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 让使用goods的组件可以销毁并重新渲染
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
