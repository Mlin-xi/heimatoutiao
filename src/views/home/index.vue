<template>
  <!-- 最外层容器 -->
  <el-container>
    <!-- 左侧导航 -->
    <el-aside>
      <lay-out></lay-out>
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <!-- <头部 -->
      <el-header>头部</el-header>
      <!-- 主区 -->
      <el-main>主体</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layOut from '../../components/home/layout-aside'
export default {
  components: {
    'lay-out': layOut
  }
}
</script>

<style lang='less' scoped>
</style>
