import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入自己的UI组件库
import UI from '@/components/library'
// 重置样式
import 'normalize.css'
import '@/assets/styles/common.less'

// mock.js
import '@/mock'
createApp(App).use(store).use(router).use(UI).mount('#app')
