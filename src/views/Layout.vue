<template>
<!-- 顶部通栏 -->
  <app-navbar>顶部通栏</app-navbar>
<!-- 头部组件 -->
  <header>头部组件</header>
<!-- 内容容器 -->
  <div class="main">
    <router-view></router-view>
  </div>
<!-- 底部组件 -->
  <footer>底部组件</footer>
</template>

<script>
import AppNavbar from '@/components/app-navbar'

export default {
  name: 'Layout',
  components: {
    AppNavbar
  }
}
</script>

<style scoped lang="less">

</style>
