// 提供一个能够显示xtx-message组件的函数

import xtxMessage from '@/components/library/xtx-message'
import { createVNode, render } from 'vue'

// dom容器
const div = document.createElement('div')
// 作为标识
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)
export default ({ type, text }) => {
  // 定时器标识
  let timer = null
  // 渲染组件
  // 1. 导入消息组件
  // 2. 把消息组件解析成vdom
  const vnode = createVNode(xtxMessage, { type, text })
  // 3. 准备一个装载消息组件dom的容器
  // 4. 将虚拟节点渲染到容器中 render(虚拟节点,容器)
  render(vnode, div)
  // 5. 消息框自动销毁
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 1500)
}
