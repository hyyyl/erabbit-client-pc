<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="!filterLoading && filterData">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a href="javascript:;" :class="{active : brand.id === filterData.brands.SelectedBrand}" @click="filterData.brands.SelectedBrand = brand.id" v-for="brand in filterData.brands" :key="brand.id">{{ brand.name }}</a>
      </div>
    </div>

    <div class="item" v-for="sp in filterData.saleProperties" :key="sp.id">
      <div class="head">{{ sp.name}}:</div>
      <div class="body">
        <a href="javascript:;" class="ellipsis" :class="{active : item.id === sp.selectedProperty}" @click="sp.selectedProperty = item.id" v-for="item in sp.properties" :key="item.id">{{ item.name }}</a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <xtx-skeleton class="item" width="800px" height="40px"></xtx-skeleton>
    <xtx-skeleton class="item" width="800px" height="40px"></xtx-skeleton>
    <xtx-skeleton class="item" width="600px" height="40px"></xtx-skeleton>
    <xtx-skeleton class="item" width="600px" height="40px"></xtx-skeleton>
    <xtx-skeleton class="item" width="600px" height="40px"></xtx-skeleton>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
import XtxSkeleton from '@/components/library/xtx-skeleton'

export default {
  name: 'SubFilter',
  components: { XtxSkeleton },
  setup () {
    const filterData = ref(null)
    const filterLoading = ref(false)
    const route = useRoute()
    watch(() => route.params.id, (newVal) => {
      filterLoading.value = true
      if (newVal && `/category/sub/${newVal}` === route.path) {
        findSubCategoryFilter(route.params.id).then(data => {
          data.result.brands.unshift({ id: null, name: '全部' })
          data.result.brands.SelectedBrand = null
          data.result.saleProperties.forEach(item => {
            item.selectedProperty = null
            item.properties.unshift({ id: null, name: '全部' })
          })
          filterData.value = data.result
          filterLoading.value = false
        })
      }
    }, { immediate: true })

    return { filterData, filterLoading }
  }
}
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all .3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>
