<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-upload action :http-request="uploadUserImg" :show-file-list="false">
      <img class="head-image" :src="userInfo.photo || dafaultImg" art />
    </el-upload>

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
      // 进度条
      loading: false,
      // base64图片
      dafaultImg: require('../../assets/img/default-cover.jpg'),
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
    //   上传用户头像
    uploadUserImg (params) {
      // 进度条
      this.loading = true
      let data = new FormData() // 定义图片
      data.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data
      }).then(() => {
        this.loading = false
        this.getUserInfo()
        // eventBus.$emit('updateUserInfo') // 相当于打出了一个电话 电话号是updateUserInfo
      })
    },
    //   获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data
      })
    },
    // 修改用户信息
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
<style lang='less' scoped>
.head-image {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-left: 500px;
}
</style>
