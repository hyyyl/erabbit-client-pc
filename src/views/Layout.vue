<template>
<!-- 顶部通栏 -->
  <app-navbar></app-navbar>
<!-- 头部组件 -->
  <app-header></app-header>
  <!-- 吸顶头部组件 -->
  <app-header-sticky></app-header-sticky>
<!-- 内容容器 -->
  <div class="app-body">
    <router-view></router-view>
  </div>
<!-- 底部组件 -->
  <app-footer></app-footer>
</template>

<script>
import AppNavbar from '@/components/app-navbar'
import AppHeader from '@/components/app-header'
import { useStore } from 'vuex'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky'

export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped lang="less">
.app-body{
  min-height: 900px;
}
</style>
