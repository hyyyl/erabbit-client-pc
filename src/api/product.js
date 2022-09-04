// 获取商品详情的api函数

import request from '@/utils/request'

/**
 * 获取商品详情信息
 * @param id{String}
 * @returns {Promise|*}
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

/**
 * 获取同类推荐和猜你喜欢
 * @param id {String} -传入表示同类推荐，不传表示猜你喜欢
 * @param limit {Number}
 * @returns {Promise|*}
 */
export const findRelevantGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}
