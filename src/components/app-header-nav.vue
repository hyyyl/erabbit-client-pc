<template>
  <ul class="app-header-nav">
<!--    {{$store.state.category.list.length}}-->
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
<!-- 动态渲染，一级分类和后台约定好 -->
    <li v-for="item in list" :key="item.id" @mouseenter="show(item.id)" @mouseleave="hide(item.id)">
      <router-link :to="`/category/${item.id}`" >{{ item.name }}</router-link>
      <div class="layer" :class="{open : item.open}">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link :to="`/category/sub/${sub.id}`" @click="hide(item.id)">
              <img :src="sub.picture" alt="">
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    // 拿到vuex中的分类列表
    const list = computed(() => store.state.category.list)

    // 问题：跳转的时候不会关闭二级类目 通过数据控制
    const show = (id) => {
      store.commit('category/show', id)
    }
    const hide = (id) => {
      store.commit('category/hide', id)
    }
    return { list, show, hide }
  }

}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      //> .layer {
      //  height: 132px;
      //  opacity: 1;
      //}

    }
  }
}
// 二级类目弹层
.layer {
  &.open{
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
