<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form ref="target" class="form" :validation-schema="mySchema" v-slot="{errors}" autocomplete="on">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field type="text" name="account" :class="{error : errors.account}" v-model="form.account" placeholder="请输入用户名" />
          </div>
          <div class="error" v-if="errors.account"><i class="iconfont icon-warning" />{{errors.account}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field type="password" :class="{error : errors.password}" v-model="form.password" name="password" placeholder="请输入密码"/>
          </div>
          <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{errors.password}}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field type="text" :class="{error : errors.mobile}" v-model="form.mobile" name="mobile" placeholder="请输入手机号" />
          </div>
          <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field type="text" :class="{error : errors.code}" v-model="form.code" name="code" placeholder="请输入验证码"/>
            <span class="code" @click="getCode" :class="{disabled : time > 0}">发送验证码</span>
          </div>
          <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{errors.code}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="xtx-checkbox" v-model="form.isAgree" name="isAgree"></Field>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>
    <div class="action">
      <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      </a>
<!--      <span id="qqLoginBtn"></span>-->
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, watch } from 'vue'
import { Field, Form } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import message from '@/components/library/message'
import { userAccountLogin, userGetMsgCode, userMobileLogin } from '@/api/user'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useIntervalFn } from '@vueuse/core'
// import QC from 'qc'
export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup () {
    // 是否短信登录
    const isMsgLogin = ref(false)
    // 表单信息对象
    const form = ref({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    // vee-validate 校验基本步骤
    // 1. 导入Form Field组件，将form和input进行替换，需要加上name指定校验规则函数
    // 2. Field需要进行数据绑定,最好与后台接口一致
    // 3. 定义name属性指定的校验规则函数 Form的validation-schema接收校验规则对象，当表单失去焦点就会进行规则校验
    // 4. 自定义组件校验需要支持v-model，而且使用as指明组件
    const mySchema = {
      // 校验函数规则 : 返回true就是校验成功，否则返回错误提示的字符串
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }
    const store = useStore()
    const router = useRouter()
    // 计时，发送验证码60秒后才能重新发
    const time = ref(0)
    // 三个参数 回调函数 间隔时间 是否立即开启
    const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value === 0) pause()
    }, 1000, false)
    onMounted(() => { pause() })
    // 监听 isMsgLogin，发生改变的时候清空表单且清空上次校验结果
    watch(isMsgLogin, () => {
      form.value.isAgree = true
      form.value.account = null
      form.value.password = null
      form.value.mobile = null
      form.value.code = null
      // 如果没有销毁组件，需要自己清楚校验结果
    })
    const target = ref('null')
    let isLogin = true
    // 需要在点击登录的时候对整体表单进行校验
    const login = async () => {
      // 防抖
      if (!isLogin) return
      // Form组件提供了一个validate函数作为整体表单校验，返回的是一个Promise
      isLogin = false
      const valid = await target.value.validate()
      if (valid) {
        if (isMsgLogin.value) {
          // 使用短信验证码登录
          // 获取短信验证码 + 验证码登录
          const { mobile, code } = form.value
          userMobileLogin({ mobile, code })
            .then(data => {
              const { id, avatar, nickname, account, mobile, token } = data.result
              // 存储用户信息
              store.commit('user/setUser', { id, avatar, nickname, account, mobile, token })
              // 消息提示
              message({ type: 'success', text: '登录成功' })
              // 回跳来源页，默认回到首页
              router.push(store.state.user.redirectURL)
            })
            .catch(err => {
              if (err.response.data) {
              // 验证不通过，提示用户名或密码错误
                message({ type: 'error', text: '手机号或验证码错误' })
              } else {
              // 没有发送出去请求，直接提示登录失败
                message({ type: 'error', text: '登录失败' })
              }
            })
        } else {
          // 使用账户密码登录
          // 准备一个api做账号登录
          // 成功跳转到来源页 + 消息提示 + 存储用户信息，失败弹出消息提示
          const { account, password } = form.value
          userAccountLogin({ account, password })
            .then(data => {
              const { id, avatar, nickname, account, mobile, token } = data.result
              // 存储用户信息
              store.commit('user/setUser', { id, avatar, nickname, account, mobile, token })
              // 消息提示
              message({ type: 'success', text: '登录成功' })
              // 回跳来源页，默认回到首页
              router.push(store.state.user.redirectURL)
            })
            .catch(err => {
              if (err.response.data) {
                // 验证不通过，提示用户名或密码错误
                message({ type: 'error', text: '用户名或密码错误' })
              } else {
                // 没有发送出去请求，直接提示登录失败
                message({ type: 'error', text: '登录失败' })
              }
            })
        }
      } else {
        message({ type: 'error', text: '用户名或密码不合法' })
      }
      setTimeout(() => {
        isLogin = true
      }, 1500)
    }

    const getCode = () => {
      if (time.value) {
        message({ type: 'warn', text: `请在 ${time.value} 秒后发送验证码` })
        return
      }
      // 通过表单校后再去获取验证码
      const valid = mySchema.mobile(form.value.mobile)
      console.log(valid)
      if (valid === true) {
        // 校验通过
        time.value = 10
        resume()
        // 获取短信验证码
        const { mobile } = form.value
        userGetMsgCode({ mobile })
          .then(data => {
            message({ type: 'success', text: '发送成功，短信验证码30分钟内有效' })
          })
          .catch(err => {
            if (err.response.data.code === '17001') message({ type: 'error', text: err.response.data.message })
            else if (err.response.data.code === '17008') message({ type: 'warn', text: err.response.data.message })
          })
      } else {
        target.value.setFieldError('mobile', valid)
      }
    }

    // 初始化qq登录按钮 (官方)
    // 1.准备一个有id的span
    // 2.QC.Login({ btnId: 'qqLoginBtn' })
    // onMounted(() => {
    //   QC.Login({ btnId: 'qqLoginBtn' })
    // })
    return { isMsgLogin, form, mySchema, login, target, getCode, time }
  }
}
</script>
<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
          &.disabled {
            cursor: not-allowed;
          }
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
