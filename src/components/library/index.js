// 扩展vue原有功能：全局组件，自定义组件

import XtxSkeleton from '@/components/library/xtx-skeleton'

export default {
  install (app) {
    // 在app上进行扩展
    app.component(XtxSkeleton.name, XtxSkeleton)
  }
}
