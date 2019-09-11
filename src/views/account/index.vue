<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- :model="userInfo" 表示要校验这个数据 -->
    <el-form label-width="100px" ref="userForm" :model="userInfo" :rules="userRules">
      <el-form-item label="用户名:" prop="name">
        <el-input style="width:300px" v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="简介:" prop="intro">
        <el-input style="width:300px" v-model="userInfo.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input style="width:300px" v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input disabled style="width:300px" v-model="userInfo.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      userRules: {
        name: [
          {
            required: true,
            message: '用户名不能为空'
          },
          {
            min: 0,
            max: 8,
            message: '用户名长度为0-8'
          }
        ],
        email: [
          {
            pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            message: '邮箱格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data
      })
    },
    saveUserInfo () {
      // 校验
      this.$refs.userForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.userInfo
          }).then(() => {
            this.$message({ type: 'success', message: '恭喜保存用户信息成功' })
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>
<style>
</style>
