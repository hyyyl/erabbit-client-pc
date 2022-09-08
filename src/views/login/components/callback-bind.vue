<template>
  <Form class="xtx-form" v-slot="{errors}" ref="target" :validation-schema="mySchema">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field class="input" :class="{err : errors.mobile}" name="mobile" type="text" placeholder="绑定的手机号" v-model="form.mobile" />

      </div>
      <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field class="input" :class="{err : errors.code}" name="code" type="text" placeholder="短信验证码" v-model="form.code" />
        <span class="code" @click="getCode" :class="{disabled : time > 0}">发送验证码</span>
      </div>
      <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{errors.code}}</div>
    </div>
    <a href="javascript:;" class="submit" @click="binding(unionId)">立即绑定</a>
  </Form>
</template>

<script>
import { onMounted, ref } from 'vue'
import QC from 'qc'
import { Field, Form } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import message from '@/components/library/message'
import { userGetMsgCode, userQQBinding } from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'CallbackBind',
  components: {
    Form,
    Field
  },
  props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  setup () {
    const form = ref({
      mobile: null,
      code: null
    })
    const mySchema = {
      // 校验函数规则 : 返回true就是校验成功，否则返回错误提示的字符串
      mobile: schema.mobile,
      code: schema.code
    }
    const target = ref(null)
    const router = useRouter()
    const store = useStore()
    // 计时，发送验证码60秒后才能重新发
    const time = ref(0)
    // 三个参数 回调函数 间隔时间 是否立即开启
    const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value === 0) pause()
    }, 1000, false)
    onMounted(() => { pause() })
    // 1. 准备下信息：unionId(openId) qq头像 昵称
    // 2. 完成表单校验
    // 3. 发送验证吗（校验，定义api，调用，完成倒计时）
    // 4. 进行绑定（绑定成功就是登录成功）
    const nickname = ref('null')
    const avatar = ref('null')
    if (QC.Login.check()) {
      QC.api('get_user_info').success(res => {
        avatar.value = res.data.figureurl_qq_1
        nickname.value = res.data.nickname
      })
    }

    // 获取短信验证码
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

    // 立即绑定
    const binding = (unionId) => {
      const { mobile, code } = form.value
      userQQBinding({ mobile, code, unionId })
        .then(data => {
          const { id, avatar, nickname, account, mobile, token } = data.result
          // 存储用户信息
          store.commit('user/setUser', { id, avatar, nickname, account, mobile, token })
          // 消息提示
          message({ type: 'success', text: '绑定成功' })
          // 回跳来源页，默认回到首页
          router.push(store.state.user.redirectURL)
        })
        .catch(err => {
          if (err.response.data) {
            // 验证不通过，提示用户名或密码错误
            message({ type: 'error', text: '手机号或验证码错误' })
          } else {
            // 没有发送出去请求，直接提示登录失败
            message({ type: 'error', text: '绑定失败' })
          }
        })
    }
    return { nickname, avatar, form, mySchema, getCode, target, binding, time }
  }
}
</script>

<style scoped lang='less'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
  &.disabled {
    cursor: not-allowed;
  }
}
</style>
