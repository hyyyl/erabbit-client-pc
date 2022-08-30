// 定义分类相关的API接口函数

import request from '@/utils/request'

/**
 * 获取所有分类
 * @returns {Promise}
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 * 获取顶级分类
 * @param id {String}
 * @returns {Promise|*}
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

/**
 * 获取二级分类下的筛选条件
 * @param id {String}
 * @returns {Promise|*}
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

/**
 * 获取分类下的商品,因为数据不够多，但是为了展现无限加载的效果，就没有严格按照筛选去选择数据
 * @param params {Object}
 * @returns {Promise|*}
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}
