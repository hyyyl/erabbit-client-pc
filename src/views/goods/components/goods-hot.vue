<template>
  <div class="goods-hot">
    <h3>{{ title[type] }}</h3>
    <div v-if="goodsList">
      <goods-item v-for="goods in goodsList" :goods="goods" :key="goods.id"></goods-item>
    </div>
  </div>
</template>
<script>
import GoodsItem from '@/views/category/component/goods-item'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { findHotGoods } from '@/api/product'

export default {
  name: 'GoodsHot',
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  components: {
    GoodsItem
  },
  setup (props) {
    const goodsList = ref([])
    const route = useRoute()
    const title = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    findHotGoods({ id: route.params.id, type: props.type }).then(data => {
      console.log(data.result)
      goodsList.value = data.result
    })
    return { goodsList, title }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
