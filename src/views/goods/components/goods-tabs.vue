<template>
  <div class="goods-tabs">
    <nav>
      <a href="javascript:;" :class="{active : activeName === 'detail'}" @click="activeName = 'detail'">商品详情</a
      >
      <a href="javascript:;" :class="{active : activeName === 'comment'}" @click="activeName = 'comment'">商品评价</a
      >
    </nav>
    <!-- 这个位置显示对应的组件 GoodsDetail 或者 GoodsComment -->
    <keep-alive>
      <component :is="`goods-${activeName}`"></component>
    </keep-alive>
  </div>
</template>
<script>
import { ref } from 'vue'
import GoodsDetail from '@/views/goods/components/goods-detail'
import GoodsComment from '@/views/goods/components/goods-comment'

export default {
  name: 'GoodsTabs',
  components: {
    GoodsDetail,
    GoodsComment
  },
  setup () {
    // detail-->详情   comment-->评价
    const activeName = ref('detail')
    return { activeName }
  }
}
</script>

<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}

</style>
