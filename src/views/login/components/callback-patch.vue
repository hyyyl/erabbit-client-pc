<template>
  <Form ref="target" :validation-schema="mySchema" v-slot="{errors}" class="xtx-form" autocomplete="off">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field :class="{err : errors.account}" v-model="form.account" name="account" class="input" type="text" placeholder="请输入用户名" />
      </div>
      <div v-if="errors.account" class="error">{{errors.account}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field :class="{err:errors.mobile}" v-model="form.mobile" name="mobile" class="input" type="text" placeholder="请输入手机号" />
      </div>
      <div v-if="errors.mobile" class="error">{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field class="input" :class="{err : errors.code}" name="code" type="text" placeholder="短信验证码" v-model="form.code" />
        <span class="code" @click="getCode">发送验证码</span>
      </div>
      <div v-if="errors.code" class="error">{{errors.code}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field :class="{err:errors.password}" v-model="form.password" name="password" class="input" type="password" placeholder="请输入密码" />
      </div>
      <div v-if="errors.password" class="error">{{errors.password}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field :class="{err:errors.rePassword}" v-model="form.rePassword" name="rePassword" class="input" type="password" placeholder="请确认密码" />
      </div>
      <div v-if="errors.rePassword" class="error">{{errors.rePassword}}</div>
    </div>
    <a @click="submit(unionId)" href="javascript:;" class="submit">立即提交</a>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { onMounted, ref } from 'vue'
import message from '@/components/library/message'
import { userQQPatchCode, userQQPatchLogin } from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'CallbackPatch',
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
    // 1. 表单校验
    // 2. 验证码
    // 3. 完善信息
    // 表单数据对象
    const form = ref({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null
    })
    // 表单校验规则
    const mySchema = {
      account: schema.accountAPI,
      mobile: schema.mobile,
      code: schema.code,
      password: schema.password,
      rePassword: schema.rePassword
    }
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
    const target = ref(null)
    // 获取验证码
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
        userQQPatchCode(mobile)
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

    // 提交信息
    const submit = (unionId) => {
      const valid = target.value.validate()
      if (valid) {
        // 完善信息，登录
        userQQPatchLogin({
          unionId,
          ...form
        })
          .then(data => {
            const { id, avatar, nickname, account, mobile, token } = data.result
            // 存储用户信息
            store.commit('user/setUser', { id, avatar, nickname, account, mobile, token })
            // 消息提示
            message({ type: 'success', text: '完善信息成功' })
            // 回跳来源页，默认回到首页
            router.push(store.state.user.redirectURL)
          })
          .catch(() => {
            // 没有发送出去请求，直接提示登录失败
            message({ type: 'error', text: '完善信息失败' })
          })
      }
    }
    return { form, mySchema, getCode, submit, target }
  }
}
</script>

<style scoped lang='less'>
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
}
</style>
