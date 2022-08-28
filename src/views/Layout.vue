<template>
<!-- 顶部通栏 -->
  <app-navbar></app-navbar>
<!-- 头部组件 -->
  <app-header></app-header>
<!-- 内容容器 -->
  <div class="main">
    <router-view></router-view>
  </div>
<!-- 底部组件 -->
  <footer>底部组件</footer>
</template>

<script>
import AppNavbar from '@/components/app-navbar'
import AppHeader from '@/components/app-header'

export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader
  }
}
</script>

<style scoped lang="less">

</style>
