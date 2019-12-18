<template>
  <div class="login">
    <!-- 登录页面 -->
    <el-card class="box-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form style="margin-top:10px" :model="loginForm" :rules="loginRules" ref="myForm">
        <el-form-item prop='mobile'>
          <el-input v-model='loginForm.mobile' placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-input placeholder="请输入您的验证码" v-model='loginForm.code' style="width:65%"></el-input>
          <el-button plain style="width:30%;float:right;text-align: center;">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop='check'>
          <el-checkbox v-model='loginForm.check'>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="sbumitButton" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入正确的手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '请输入正确的验证码' }, { pattern: /^\d{6}$/, message: '验证码错误' }],
        check: [{ validator (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('你输入的格式不正确,请重新输入'))
          }
        } } ]
      },
      methods: {
        sbumitButton () {
          this.$refs.myForm.validate(function (isOK) {
            // console.log("")
            if (isOK) {
              // alert('校验成功')
              console.log('前端校验成功,发送用户名和密码到后台去校验')
            }
          })
          // console.log("")
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  background-size: cover; /*自适应背景图片*/
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 400px;
    height: 320px;
    .title {
      text-align: center;
      img {
        height: 30px;
      }
    }
  }
}
</style>
