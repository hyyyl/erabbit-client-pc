<template>
  <div class="home-hot">
    <home-panel title="人气推荐" sub-title="人气爆款 不容错过">
      <transition name="fade">
        <ul ref="panel" v-if="goods" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <routerLink to="/">
              <img :src="item.picture" alt="">
              <p class="name">{{item.title}}</p>
              <p class="desc">{{item.alt}}</p>
            </routerLink>
          </li>
        </ul>
        <home-skeleton v-else></home-skeleton>
      </transition>
    </home-panel>
  </div>
</template>

<script>
import { ref } from 'vue'
import HomePanel from '@/views/home/components/home-panel'
import { findHot } from '@/api/home'
import HomeSkeleton from '@/views/home/components/home-skeleton'
export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    const goods = ref(null)
    findHot().then(data => {
      goods.value = data.result
    })
    return { goods }
  }
}
</script>

<style scoped lang='less'>

.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
