<template>
  <div class="xtx-checkbox" @click="change">
    <i class="iconfont icon-checked" v-if="isChecked"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>

import { useVModel } from '@vueuse/core'

export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const isChecked = useVModel(props, 'modelValue', emit)
    // v-model 双向数据绑定实现
    // const change = () => {
    //   isChecked.value = !isChecked.value
    //   emit('update:modelValue', isChecked.value)
    // }
    // watch(() => props.modelValue, () => {
    //   isChecked.value = props.modelVal
    // }, { immediate: true })

    const change = () => {
      const newVal = !isChecked.value
      isChecked.value = newVal
      emit('change', newVal)
    }

    return { isChecked, change }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
