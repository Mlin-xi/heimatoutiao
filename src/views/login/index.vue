<template>
  <div class="login">
    <el-card class="box-card">
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt="黑马头条" />
      </div>
      <el-form style="margin-top:20px">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入密码" style="width:280px"></el-input>
          <el-button style='float:right'>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style='width:100%'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  width: 100%;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 450px;
    height: 350px;
    .logo {
      text-align: center;
    }
    img {
      height: 45px;
    }
  }
}
</style>
