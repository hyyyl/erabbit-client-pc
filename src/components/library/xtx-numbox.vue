<template>
  <div class="xtx-numbox">
    <div class="label" v-if="label">{{ label }}</div>
    <div class="numbox">
      <a href="javascript:;" :class="{disabled : modelValue === min}" @click="change(-1)">-</a>
      <input type="text" readonly :value="modelValue">
      <a href="javascript:;" :class="{disabled : modelValue === max}" @click="change(1)">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'

export default {
  name: 'XtxNumbox',
  props: {
    label: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 12
    },
    modelValue: {
      type: Number,
      default: 1
    }
  },
  setup (props, { emit }) {
    const count = useVModel(props, 'modelValue', emit)
    const change = (step) => {
      const newVal = props.modelValue + step
      console.log(newVal)
      if (newVal < props.min || newVal > props.max) return
      count.value = newVal
      emit('change', newVal)
    }
    return { change, count }
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right:1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left:1px solid #e4e4e4;
      }
      &.disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
