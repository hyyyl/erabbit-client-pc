// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axios实例发请求，返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
// 导出基准地址，可能不是通过axios发送请求
const instance = axios.create({
  // 写一些axios的配置
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 进行请求配置的修改
  // 如果本地有token，就在头部携带

  // 获取用户信息对象
  const profile = store.state.user.profile
  if (profile.token) {
    // 设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 取出data数据，直接拿到的就是后台数据
instance.interceptors.response.use(res => res.data, err => {
  if (err.response && err.response.status === 401) {
    // 1.清空无效信息
    // 2.跳转到登录页且登录后回到当前页面
    store.commit('user/setUser', {})
    // currentRoute 是一个ref的响应式对象
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push(`/login?redirectUrl=${fullPath}`)
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求
  return instance({
    url,
    method,
    // get请求
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
