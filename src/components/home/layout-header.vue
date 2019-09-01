<template>
  <!-- 用el-row el-col -->
  <el-row type="flex" jusitify="space-between" class="layout-header">
    <!-- span是给col的宽度 elementUI将页面分为24份 -->
    <el-col class="left" :span="20">
      <i class="el-icon-s-unfold icon"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="3" class="right">
      <img class="head-img" :src="userInfo.photo? userInfo.photo:defaultImg" alt />
      <el-dropdown trigger="click">
        <!-- 匿名插槽 -->
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg') // 转成base64 字符串
    }
  },
  methods: {
    // 获取用户数据
    getUserInfo () {
      let token = window.localStorage.getItem('user-token') // 获取token
      this.$axios({
        url: '/user/profile',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          // console.log(res)
          this.userInfo = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    // 钩子函数 一进页面就拉取数据
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  //   display: flex;
  //   align-items: center;
  padding: 10px 0;
  .left {
    .icon {
      font-size: 22px;
      margin-right: 5px;
      vertical-align: middle;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .head-img {
      border-radius: 50%;
      margin-right: 5px;
      width: 40px;
    }
  }
}
</style>
