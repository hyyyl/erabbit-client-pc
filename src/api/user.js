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

/**
 * 获取短信验证码
 * @param mobile {String}
 * @returns {Promise|*}
 */
export const userGetMsgCode = ({ mobile }) => {
  return request('/login/code', 'get', { mobile })
}

/**
 * 手机验证码登录
 * @param mobile {String}
 * @param code {String}
 * @returns {Promise|*}
 */
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}
