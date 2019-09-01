<template>
  <!-- 用el-row el-col -->
  <el-row type="flex" jusitify="space-between" class="layout-header">
    <!-- span是给col的宽度 elementUI将页面分为24份 -->
    <el-col class="left" :span="21">
      <i class="el-icon-s-unfold icon"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="3" class="right">
      <img class="head-img" src="../../assets/img/avatar.jpg" alt />
      <el-dropdown trigger="click">
        <!-- 匿名插槽 -->
        <span class="el-dropdown-link">
          姚鑫傻子
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
export default {}
</script>

<style lang='less' scoped>
.layout-header {
  //   display: flex;
  //   align-items: center;
  padding: 10px 0;
  .left {
    .icon {
      font-size: 22px;
      margin-right: 3px;
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
