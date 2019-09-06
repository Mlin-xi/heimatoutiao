<template>
  <!-- <div class="login"> -->
  <!-- <el-card class="box-card"> -->
  <!-- <div class="logo">
        <img src="../../assets/img/logo_index.png" alt="黑马头条" />
  </div>-->
  <!-- 表单组件 el-form表单容器 -->
  <!-- 数据校验 首先要给el-form 一个model属性 表示数据对象 -->
  <!-- res是为了选取loginForm绑定数据 -->
  <!-- <el-form style="margin-top:20px" :model="loginForm" ref="loginForm" :rules="loginRules"> -->
  <!-- 表单项  prop绑定需要校验的字段名 但是 不写loginForm.mobile只写mobile -->
  <!-- <el-form-item prop="mobile"> -->
  <!-- 放置组件内容 -->
  <!-- 绑定手机号 -->
  <!-- <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
  <el-form-item prop="code">-->
  <!-- 绑定验证码 -->
  <!-- <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
  <el-form-item prop="check">-->
  <!-- 绑定是否勾选选协议 -->
  <!-- <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>-->
  <div class="login">
    <el-card class="box-card">
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt="黑马头条" />
      </div>
      <!-- 表单验证给el-form加一个model属性 表示数据对象 -->
      <!-- res是为了选取loginForm绑定数据 -->
      <!-- rules是校验规则 -->
      <el-form style="margin-top:25px" :model="loginForm" ref="loginForm" :rules="loginRules">
        <!-- 给需要验证的表单绑定prop属性 -->
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" style="width:280px" v-model="loginForm.code"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  //   data () {
  //     let validator = function (rule, value, callBack) {
  //       if (value) {
  //         callBack() // 如果value为true直接通过
  //       } else {
  //         callBack(new Error('您必须无条件同意被坑'))
  //       }
  //     }
  //     return {
  //       loginForm: {
  //         mobile: '', // 手机号
  //         code: '', // 验证码
  //         check: false // 是否勾选协议
  //       },
  //       //   定义rules校验规则  表单是根据规则去校验  没有规则 就没有校验
  //       // key(字段名):value(数组对象=> 多个 => 一个字段 可能有一个或者多个校验规则)
  //       loginRules: {
  //         mobile: [
  //           {
  //             required: true, // 意味着必填
  //             message: '手机号不能为空' // 如果没有满足要求 就会提示message的内容
  //           },
  //           {
  //             pattern: /^1[3456789]\d{9}/, // 正则表达式
  //             message: '手机格式不正确'
  //           }
  //         ],
  //         code: [
  //           {
  //             required: true,
  //             message: '验证码不能为空'
  //           },
  //           {
  //             pattern: /^\d{6}$/,
  //             message: '验证码必须为6为数字'
  //           }
  //         ],
  //         check: [
  //           {
  //             validator
  //           }
  //         ]
  //       }
  //     }
  //   },
  //   methods: {
  //     login () {
  //       // 通过el-form组件的validata方法 校验整个表单的数据
  //       // 传入一个回调函数 isOK为true 说明所有的校验规则都成功了
  //       // 如果false 说明有错误
  //       this.$refs.loginForm.validate(isOK => {
  //         if (isOK) {
  //           // 请求
  //           // axios 中 data中放置body参数 params是放置地址参数的
  //           this.$axios({
  //             url: '/authorizations',
  //             method: 'post',
  //             data: this.loginForm
  //           })
  //             .then(result => {
  //               // console.log(result)
  //               // 放到前端的缓存中 token 是一个身份
  //               window.localStorage.setItem('user-token', result.data.data.token)
  //               // 编程式导航
  //               this.$router.push('/') // 登录成功 跳到home页
  //             })
  //             .catch(() => {
  //               this.$message({
  //                 message: '手机号或者验证码错误',
  //                 type: 'warning'
  //               })
  //             })
  //         }
  //       })
  //     }
  //   }
  data () {
    // 全验证
    let validator = function (rule, value, callBack) {
      if (value) {
        callBack()
      } else {
        callBack(new Error('您必须无条件被坑'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      // 定义一个rules校验
      loginRules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号'
          },
          {
            pattern: /^1[3456789]\d{9}/,
            message: '请输入正确手机号'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '请输入六位验证码'
          }
        ],
        check: [
          {
            validator
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 通过el-form组件的validata方法 校验整个表单的数据
      // 传入一个回调函数 isOK为true  说明所有的校验规则都成功了
      // 如果false 说明错误
      this.$refs.loginForm.validate(isOK => {
        // validate从哪来的
        if (isOK) {
          // 发请求
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          })
            .then(res => {
              console.log(res)
              // 如果成功了将身份证token存起来,下次再用就带着
              window.localStorage.setItem('user-token', res.data.token)
              // 如果成功就(编程式导航)跳转到home页
              this.$router.push('/')
            })
            // .catch(() => {
            //   this.$message({
            //     message: '手机号或者密码不正确',
            //     type: 'warning'
            //   })
            // })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
// 如果要用less/scss等预处理css语言的话 需要给一个lang属性 lang='less' lang='scss'
// lang属性 是对但css进行语言指定
// scoped 只针对当前的组件样式起作用
// 100vh 就是占据当前的屏幕的100%
// .login{
//   background-image: url("../../assets/img/login_bg.jpg");
//   width: 100%;
//   height: 100vh;
//   background-size: cover;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   .box-card{
//     width: 450px;
//     height: 350px;
//     .logo{
//       text-align: center;
//      }
//     img{
//       height: 45px;
//      }
//  }
//}
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
      height: 45px;
    }
  }
}
</style>
