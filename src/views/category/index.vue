<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <transition name="fade-bread" mode="out-in">
          <xtx-bread-item :key="topCategory.id">{{topCategory.name}}</xtx-bread-item>
        </transition>
      </xtx-bread>
      <!-- 轮播图 -->
      <xtx-carousel :slider="slider" style="height:500px"></xtx-carousel>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" alt="">
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">品牌信赖，品质之选</p>
          <xtx-more :path="`/category/sub/${sub.id}`"></xtx-more>
        </div>
        <div class="body">
          <goods-item v-for="item in sub.goods" :key="item.id" :goods="item"></goods-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findBanner } from '@/api/home'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import GoodsItem from '@/views/category/component/goods-item'
import { findTopCategory } from '@/api/category'

export default {
  name: 'TopCategory',
  components: {
    GoodsItem
  },
  setup () {
    const slider = ref([])
    findBanner().then(data => {
      slider.value = data.result
    })

    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      return store.state.category.list.find(item => item.id === route.params.id) ?? {}
    })
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }

    watch(() => route.params.id, (newVal) => {
      // 严谨地判断，在顶级分类下再发请求
      newVal && `/category/${newVal}` === route.path && getSubList()
    }, { immediate: true })

    return { slider, topCategory, subList }
  }
}
</script>
<style scoped lang="less">

.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
