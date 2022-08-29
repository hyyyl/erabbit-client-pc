// 扩展vue原有功能：全局组件，自定义组件，指令

import defaultImage from '@/assets/images/200.png'

const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // 在app上进行扩展
    importFn.keys().forEach(path => {
      const component = importFn(path).default
      app.component(component.name, component)
    })
    // 定义指令
    defDirective(app)
  }
}

/**
 * 封装了一个懒加载的指令
 * @param app{VueInstance}
 */
const defDirective = (app) => {
  // 图片懒加载的指令 lazyLoad
  app.directive('lazyLoad', {
    // lazyLoad原理: 先存储地址，当图片进入可视区，在将图片地址设置给图片元素
    mounted (el, binding) {
      // 创建观察对象实例
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.src = binding.value
          // 处理图片加载失败
          el.onerror = () => {
            el.src = defaultImage
          }
        }
      }, {
        threshold: 0
      })
      // callback 被观察dom进入可视区离开可视区都会触发
      // - 两个回调参数 entries , observer
      // - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
      // - observer 就是观察实例
      // options 配置参数
      // - 三个配置属性 root rootMargin threshold
      // - root 基于的滚动容器，默认是document
      // - rootMargin 容器有没有外边距
      // - threshold 交叉的比例

      // 实例提供两个方法
      // observe(dom) 观察哪个dom
      // unobserve(dom) 停止观察那个dom

      observer.observe(el)
    }

  })
}
