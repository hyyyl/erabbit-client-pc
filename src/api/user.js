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

/**
 * 通过第三方登录
 * @param unionId {String} - 第三方标识
 * @param source {Number} - 注册来源 6 -> qq
 * @returns {Promise|*}
 */
export const userQQLogin = (unionId, source = 6) => {
  return request('/login/social', 'post', { unionId, source })
}

/**
 * 获取qq绑定时的短信验证码
 * @param mobile {String}
 * @returns {Promise|*}
 */
export const userQQBindCode = (mobile) => {
  return request('/login/social/code', 'get', { mobile })
}

/**
 * qq登录绑定账号
 * @param unionId {String}
 * @param mobile {String}
 * @param code {String}
 * @returns {Promise|*}
 */
export const userQQBinding = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code })
}

/**
 * 校验账号是否存在
 * @param {String} account - 账号
 * @returns Promise
 */
export const userCheckAccount = (account) => {
  return request('/register/check', 'get', { account })
}

/**
 * 获取qq登录完善信息的验证码
 * @param mobile {String}
 * @returns {Promise|*}
 */
export const userQQPatchCode = (mobile) => {
  return request('/register/code', 'get', { mobile })
}

/**
 * qq登录完善信息后的登录
 * @param account {String}
 * @param mobile {String}
 * @param code {String}
 * @param password {String}
 * @param unionId {String}
 * @returns {Promise|*}
 */
export const userQQPatchLogin = ({ account, mobile, code, password, unionId }) => {
  return request(`/login/social/${unionId}/complement`, 'post', { account, mobile, code, password })
}
