// 用户相关的接口

import request from '@/utils/request'

/**
 * 采用用户名密码登录
 * @param account {String}
 * @param password {String}
 * @returns {Promise|*}
 */
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}
