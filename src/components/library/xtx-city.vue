<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{active : isShow}">
      <span v-if="fullLocation">{{chooseAddress}}</span>
      <span v-else class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="isShow">
      <div class="loading" v-if="isLoading"></div>
      <template v-else>
        <span class="ellipsis" @click="changeAddress(item)" v-for="item in currentList" :key="item.code">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>

<script>

import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'

export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const isShow = ref(false)
    const isLoading = ref(false)
    const open = () => {
      isShow.value = true
      isLoading.value = true
      // 打开的时候获取数据
      useAddressData().then(data => {
        addressData.value = data
        isLoading.value = false
      })

      // 打开的时候地址回到第一级重选
      for (const key in address) {
        address[key] = ''
      }
    }
    const addressData = ref(null)
    const close = () => {
      isShow.value = false
    }
    // 控制面板收起与隐藏，通过toggle函数控制
    const toggle = () => {
      isShow.value ? close() : open()
    }
    const target = ref(null)

    onClickOutside(target, () => {
      // 当点击target外部时触发回调函数
      close()
    })
    // 记录当前选中地址，再通过计算属性获取当前展示列表
    const address = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: ''
    })
    const chooseAddress = ref(props.fullLocation)
    const currentList = computed(() => {
      let list = addressData.value
      if (address.provinceCode) {
        list = list.find(item => item.code === address.provinceCode).areaList
      }
      if (address.cityCode) {
        list = list.find(item => item.code === address.cityCode).areaList
      }
      return list
    })
    // 选择地址进行修改
    const changeAddress = (item) => {
      if (item.level === 0) {
        address.provinceName = item.name
        address.provinceCode = item.code
      } else if (item.level === 1) {
        address.cityCode = item.code
        address.cityName = item.name
      } else {
        address.countyCode = item.code
        address.countyName = item.name
        // 选完最后一个关闭
        close()
      }
      // 将数据提交给父组件
      emit('change', address)
      chooseAddress.value = address.provinceName + ' ' + address.cityName + ' ' + address.countyName
    }
    return { isShow, toggle, target, addressData, isLoading, currentList, changeAddress, chooseAddress }
  }
}
/**
 * 获取地址信息
 * @returns {Promise}
 */
const useAddressData = () => {
  // 打开选择地址列表的时候获取信息
  // 为了避免重复加载，所以将内容缓存下来，如果有，就直接拿缓存，没有再去请求
  // 根据计算属性展示具体的信息
  return new Promise((resolve, reject) => {
    if (window.addressData) {
      // 有缓存
      resolve(window.addressData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        // 无缓存
        window.addressData = res.data
        resolve(window.addressData)
      })
    }
  })
}

</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
