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
