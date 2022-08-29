
<script>
import { h } from 'vue'

export default {
  name: 'XtxBread',
  render () {
    const items = this.$slots.default()
    const dynamicItems = []
    if (items.length) dynamicItems.push(items[0])
    for (let i = 1; i < items.length; i++) {
      dynamicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      dynamicItems.push(items[i])
    }
    return h('div', { class: 'xtx-bread' }, dynamicItems)
  }
}
</script>

<style  lang='less'>
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
