<template>
  <login-header>联合登录</login-header>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount = true" :class="{active : hasAccount}" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount = false" :class="{active : !hasAccount}" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <callback-bind :union-id="unionId"></callback-bind>
    </div>
    <div class="tab-content" v-else>
    <!-- 完善资料 -->
      <callback-patch :union-id="unionId"></callback-patch>
    </div>
  </section>
  <login-footer></login-footer>
</template>

<script>

import { ref } from 'vue'
import LoginHeader from '@/views/login/components/login-header'
import LoginFooter from '@/views/login/components/login-footer'
import CallbackBind from '@/views/login/components/callback-bind'
import CallbackPatch from '@/views/login/components/callback-patch'
import QC from 'qc'
import { userQQLogin } from '@/api/user'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import message from '@/components/library/message'

export default {
  name: 'PageCallback',
  components: {
    LoginHeader,
    LoginFooter,
    CallbackPatch,
    CallbackBind
  },
  setup () {
    const hasAccount = ref(true)

    const store = useStore()
    const router = useRouter()
    const unionId = ref(null)
    // 1.首先默认已经注册且绑定，通过qq的api获取openid进行登录
    const isBind = ref(true)
    // 登录成功，跳转到来源页
    // 登录失败，进行绑定或完善信息
    // 确保qq已经登录
    if (QC.Login.check()) {
      // 第三方登录唯一标识
      QC.Login.getMe((openId) => {
        unionId.value = openId
        // 请求后台，做qq登录
        userQQLogin(openId)
          .then(data => {
            // 登录成功
            // 1. 存储信息
            const { id, account, avatar, mobile, nickname, token } = data.result
            store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
            // 2. 跳转到来源页或首页
            router.push(store.state.user.redirectURL)
            // 3. 消息提示

            message({ type: 'success', text: '登录成功' })
          })
          .catch(() => {
            // 进行绑定或完善信息
            isBind.value = false
          })
      })
    }
    return { hasAccount, isBind, unionId }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
