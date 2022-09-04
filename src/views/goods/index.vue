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
      <div class="goods-info">
        <div class="media">
          <goods-image :images="goods.mainPictures"></goods-image>
          <goods-sales></goods-sales>
        </div>
        <div class="spec">
          <!-- 配送等内容 -->
          <goods-name :goods="goods"></goods-name>
          <!-- 商品规格(sku组件) -->
          <goods-sku :goods="goods"  @change="changeSku"></goods-sku>
          <!-- 数量选择组件 -->
          <xtx-numbox label="数量" v-model="count" :max="goods.inventory"></xtx-numbox>
          <!-- 按钮 -->
          <xtx-button type="primary" style="margin-top:20px;" size="large">加入购物车</xtx-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <goods-relevant :goods-id="goods.id"></goods-relevant>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 (动态组件切换)-->
          <goods-tabs></goods-tabs>
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

import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'
import GoodsImage from '@/views/goods/components/goods-image'
import GoodsName from '@/views/goods/components/goods-name'
import GoodsSales from '@/views/goods/components/goods-sales'
import GoodsSku from '@/views/goods/components/goods-sku'
import GoodsTabs from '@/views/goods/components/goods-tabs'

export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs
  },
  setup () {
    const goods = useGoods()
    // sku改变时触发
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    // 数量选择初始化为1
    const count = ref(1)
    return { goods, changeSku, count }
  }
}

/**
 * 获取商品的详情信息
 * @returns {Object}
 */
const useGoods = () => {
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
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
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
