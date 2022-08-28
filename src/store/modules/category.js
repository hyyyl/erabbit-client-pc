// 分类模块

import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'

export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合，依赖于topCategory重新设置，保证初始化有数据，
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改分类函数
  mutations: {
    // payload就是所有的分类集合
    setList (state, payload) {
      state.list = payload
    },
    // 控制当前分类下的二级分类显示与隐藏
    show (state, id) {
      const currentCategory = state.list.find(item => item.id === id)
      currentCategory.open = true
    },
    hide (state, id) {
      const currentCategory = state.list.find(item => item.id === id)
      currentCategory.open = false
    }
  },
  // 获取分类函数
  actions: {
    async getList (context) {
      // 获取分类属性
      const data = await findAllCategory()
      // 给每个分类加上控制二级分类显示与隐藏的数据
      data.result.forEach(item => {
        item.open = false
      })
      // 修改分类数据
      context.commit('setList', data.result)
    }
  }
}
