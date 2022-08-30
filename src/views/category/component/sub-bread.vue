<template>
  <xtx-bread>
    <xtx-bread-item to="/">首页</xtx-bread-item>
    <xtx-bread-item v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</xtx-bread-item>
    <transition name="fade-bread" mode="out-in">
      <xtx-bread-item v-if="category.sub" :key="category.sub.id">{{category.sub.name}}</xtx-bread-item>
    </transition>
  </xtx-bread>
</template>
<script>

import XtxBreadItem from '@/components/library/xtx-bread-item'
import { computed } from 'vue'

import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'SubBread',
  components: {
    XtxBreadItem
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const category = computed(() => {
      for (let i = 0; i < store.state.category.list.length; i++) {
        const top = store.state.category.list[i]
        let sub = null
        if (top.children) sub = top.children.find(item => item.id === route.params.id)
        if (sub) {
          return {
            top: {
              id: top.id,
              name: top.name
            },
            sub: {
              id: sub.id,
              name: sub.name
            }
          }
        }
      }
      return {}
    })

    return { category }
  }

}
</script>
<style scoped lang="less"></style>
