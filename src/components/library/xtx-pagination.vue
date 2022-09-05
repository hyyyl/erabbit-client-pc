<template>
  <div class="xtx-pagination">
    <a href="javascript:;" class="disabled" v-if="curPage === 1">上一页</a>
    <a v-else href="javascript:;" @click="changePage(curPage - 1)">上一页</a>
    <span v-if="pager.start > 1">...</span>

    <a href="javascript:;" :class="{active : curPage === v}" @click="changePage(v)" v-for="v in pager.bntArr" :key="v">{{v}}</a>

    <span v-if="pager.end < pages">...</span>
    <a href="javascript:;" class="disabled" v-if="curPage === pages">下一页</a>
    <a v-else href="javascript:;" @click="changePage(curPage + 1)">下一页</a>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'

export default {
  name: 'XtxPagination',
  props: {
    pages: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 2
    },
    count: {
      type: Number,
      default: 5
    }
  },
  setup (props, { emit }) {
    // 需要按钮个数，当前页面，总页数，开始页，结束页，按钮数组
    const curPage = ref(1)
    const pager = computed(() => {
      const offset = props.count >> 1
      let start = curPage.value - offset
      let end = start + props.count - 1
      if (start < 1) {
        start = 1
        end = Math.min(props.pages, start + props.count - 1)
      }
      if (end > props.pages) {
        end = props.pages
        start = Math.max(1, end - props.count + 1)
      }
      const bntArr = []
      for (let i = start; i <= end; i++) bntArr.push(i)
      return {
        start,
        end,
        bntArr
      }
    })
    // 监听props的改变
    watch(props, () => {
      curPage.value = props.page
    }, { immediate: true })
    // page改变
    const changePage = (newPage) => {
      curPage.value = newPage
      emit('changePage', newPage)
    }
    return { pager, curPage, changePage }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
