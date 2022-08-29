<template>
  <div class="home-new" ref="target">
    <home-panel title="新鲜好物" sub-title="新鲜出炉 品质可靠" >
      <template #right> <xtx-more path="/"></xtx-more> </template>
      <!-- 面板内容 -->
      <transition name="fade">
        <ul v-if="goods.length" class="goods-list" >
          <li v-for="item in goods" :key="item.id">
            <routerLink :to="`/product/${item.id}`">
              <img alt="" v-lazyLoad="item.picture">
              <p class="name ellipsis">{{item.name}}</p>
              <p class="price">&yen;{{item.price}}</p>
            </routerLink>
          </li>
        </ul>
        <home-skeleton v-else bg="#f0f9f4"></home-skeleton>
      </transition>
    </home-panel>
  </div>
</template>
<script>

import HomePanel from '@/views/home/components/home-panel'

import { findNew } from '@/api/home'
import HomeSkeleton from '@/views/home/components/home-skeleton'
import { useLazyLoad } from '@/hooks'

export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    const { result: goods, target } = useLazyLoad(findNew)

    return { goods, target }
  }
}
</script>
<style scoped lang="less">

.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
