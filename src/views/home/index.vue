<template>
  <!-- 最外层容器 -->
  <el-container>
    <!-- 左侧导航 -->
    <el-aside style="width:200px;background-color:#323745">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <!-- <头部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 主区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
</style>
