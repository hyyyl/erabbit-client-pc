<template>
<router-view></router-view>
</template>

<style lang="less">

</style>

<script>
import request from '@/utils/request'
export default {
  name: 'App',
  setup () {
    const fn = () => {
      request('/home/hot', 'post', { a: 10 })
    }

    return { fn }
  }
}
</script>
