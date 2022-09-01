<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{selected : val.selected,disabled : val.disabled}" @click="changeSpecs(item,val)" v-if="val.picture" :src="val.picture" :title="val.name" alt="">
          <span v-else :class="{selected : val.selected,disabled : val.disabled}" @click="changeSpecs(item,val)">{{val.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import bwPowerSet from '@/vender/power-set'

/**
 * 生成路径字典
 * @param skus{Object}
 * @returns {Object}
 */
const getPathMap = (skus) => {
  // 1. 拿到所有sku集合
  // 2. 筛选出有效的sku
  // 3. 使用power-set算法得到幂集
  // 4. 在路径字典中存储key-value
  const pathMap = {}
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      const values = sku.specs.map(val => val.valueName)
      // 生成子集并插入路径字典
      bwPowerSet(values).forEach(val => {
        // 转换为字符串
        const key = val.join('&&')
        // 通过一个数组记录每个路径可以找到的sku.id
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })

  return pathMap
}
/**
 * 更新禁用按钮状态
 * @param specs{Array}
 * @param pathMap{Object}
 */
const updateDisabledStatus = (specs, pathMap) => {
  // 每个按钮由自己的disabled控制
  specs.forEach((item, i) => {
    const selectedArr = getSelectedArr(specs)
    item.values.forEach(val => {
      // 已经选中的不用去判断
      if (selectedArr[i] === val.name) return false
      // 没有选中的替换对应的值
      selectedArr[i] = val.name
      // 过滤无效值
      const key = selectedArr.filter(v => v).join('&&')
      val.disabled = !pathMap[key]
    })
  })
}

/**
 * 获取当前选中的规格
 * @param specs
 * @returns {*[]}
 */
const getSelectedArr = (specs) => {
  const list = []
  specs.forEach((item, i) => {
    const selectedVal = item.values.find(val => val.selected)
    list[i] = selectedVal ? selectedVal.name : undefined
  })
  return list
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    console.log(props.goods)
    const pathMap = getPathMap(props.goods.skus)
    // 组件初始化时更新禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)

    const changeSpecs = (item, val) => {
      // 当按钮禁用的时候，直接退出
      if (val.disabled) return

      // 如果已经选中，就取消，如果未选中，就选中
      if (val.selected) {
        val.selected = !val.selected
      } else {
        item.values.forEach(v => { v.selected = false })
        val.selected = true
      }
      // 点击组件时更新按钮禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)
    }
    return { changeSpecs }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
