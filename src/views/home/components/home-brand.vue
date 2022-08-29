<template>
  <home-panel title="热门品牌" sub-title="国际经典 品质保证">
    <template #right>
      <a href="javascript:;" :class="{disabled : index === 0}" @click="toggle(-1)" class="iconfont icon-angle-left prev" ></a>
      <a href="javascript:;" :class="{disabled : index === 1}" @click="toggle(1)" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="target">
      <transition name="fade">
        <ul class="list" :style="{transform : `translateX(${-index * 1240}px)`}" v-if="brands.length">
          <li v-for="brand in brands" :key="brand.id">
            <routerLink to="/">
              <img :src="brand.picture" alt="">
            </routerLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"/>
        </div>
      </transition>
    </div>
  </home-panel>
</template>

<script>
import HomePanel from '@/views/home/components/home-panel'
import { ref } from 'vue'
import { findBrand } from '@/api/home'
import XtxSkeleton from '@/components/library/xtx-skeleton'
import { useLazyLoad } from '@/hooks'

export default {
  name: 'HomeBrand',
  components: {
    HomePanel,
    XtxSkeleton
  },
  setup () {
    const index = ref(0)
    const { result: brands, target } = useLazyLoad(() => findBrand(10))
    // 切换数据,只有2页
    const toggle = (step) => {
      const newVal = index.value + step
      if (newVal === 0 || newVal === 1) index.value = newVal
    }
    return { brands, toggle, index, target }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
