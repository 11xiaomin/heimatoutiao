<template>
  <div class="login">
    <!-- 登录页面 -->
    <el-card class="box-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form>
        <el-form-item style="margin-top:10px">
          <el-input placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入您的验证码" style="width:65%"></el-input>
          <el-button plain style="width:30%;float:right;text-align: center;">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  // data () {}
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
