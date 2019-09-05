<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <!-- 搜索工具栏 -->
    <el-form>
      <el-form-item label="全部图文"></el-form-item>
      <el-form-item label="文章状态:">
        <!-- {{searchForm.status}} -->
        <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 -->
        <el-radio-group v-model="searchForm.status" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <!-- {{searchForm.channels_id}} -->
        <el-select @change="changeCondition" v-model="searchForm.channels_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <!-- {{searchForm.dateRange}} -->
        <!-- v-model="searchForm.dateRange" 不加,不会显示出来开始时间和结束时间 -->
        <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="searchForm.dateRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- {{searchForm.status}}{{searchForm.channels_id}} {{searchForm.dateRange}} -->
    <!-- 页面结构 -->
    <div class="total-info">共找到222条符合条件的内容</div>
    <div class="article-list">
      <!-- 循环 -->
      <div v-for="(item,index) in list" :key="index" class="article-item">
        <!-- 左侧 -->
        <div class="left">
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
          <div class="info">
            <span class="title">{{item.title}}</span>
            <el-tag style="width:60px" :type="item.status | statusType">{{item.status | statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
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
      list: [], // 定义一个空数组
      defaultImg: require('../../assets/img/default-cover.jpg'),
      searchForm: {
        // 定义一个表单数据
        status: 5, // 状态
        channels_id: null, // 默认给一个空 因为打开页面时是没有筛选的
        dateRange: [] // 数组 [开始时间,结束时间][1,2]
      },
      channels: []
    }
  },
  methods: {
    // 定义筛选条件改变的事件
    changeCondition () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channels_id,
        begin_pubdate:
          this.searchForm.dateRange.length > 0
            ? this.searchForm.dateRange[0]
            : null,
        end_pubdate:
          this.searchForm.dateRange.length > 1
            ? this.searchForm.dateRange[1]
            : null
      }
      this.getArticles(params)
    },
    //   获取文章频道
    // 传params是为了在筛选条件时调用次方法
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 请求内容信息
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getArticles()
    this.getChannels() // 获取频道数据
  },
  filters: {
    //   定义一个过滤器 过滤状态
    statusText: function (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },

    // 定义过滤器类型
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
      }
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
