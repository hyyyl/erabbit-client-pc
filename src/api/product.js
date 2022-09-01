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
