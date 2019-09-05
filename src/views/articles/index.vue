<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <!-- 搜索工具栏 -->
    <el-form>
      <el-form-item label="全部图文"></el-form-item>
      <el-form-item label="文章状态:">
        <el-radio-group>
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="待审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="审核失败"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select placeholder="请选择活动区域">
          <el-option label="区域一" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <el-date-picker
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 页面结构 -->
    <div class="total-info">共找到3456条符合条件的内容</div>
    <div class="article-list">
      <!-- 循环 -->
      <div v-for="(item,index) in list" :key="index" class="article-item">
        <!-- 左侧 -->
        <div class="left">
          <img src="../../assets/img/404.png" alt />
          <div class="info">
            <span class="title">有内鬼</span>
            <el-tag style="width:60px">已发布</el-tag>
            <span class="date">2019-09-03 08:15:26</span>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="right">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span>
            <i class="el-icon-delete"></i>删除
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [1, 2, 3] // 定义一个空数组
    }
  }
}
</script>

<style lang='less' scoped>
.total-info {
  border-bottom: 1px dashed #ccc;
  padding: 15px 0;
  color: #313745;
  font-size: 14px;
}
.article-list {
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;
        .date {
          color: #999;
          font-size: 12px;
        }
        .title {
          font-size: 14px;
          color: #333;
        }
      }
    }
    .right {
      font-size: 12px;
      span {
        margin: 0 8px;
        cursor: pointer;
        color: #333;
      }
    }
  }
}
</style>
