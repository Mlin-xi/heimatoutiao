<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <!-- 搜索工具栏 -->
    <el-form style="margin-left:40px">
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
        <!-- {{searchForm.channel_id}} -->
        <el-select @change="changeCondition" v-model="searchForm.channel_id">
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
    <div class="total-info">共找到{{page.total}}条符合条件的内容</div>
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
          <!-- 修改按钮添加一个事件 -->
          <span @click="modifyItem(item)">
            <i class="el-icon-edit"></i>修改
          </span>
          <span @click="delItem(item)">
            <i class="el-icon-delete"></i>删除
          </span>
        </div>
      </div>
    </div>
    <el-row type="flex" justify="center" style="margin:10px">
      <el-pagination
        @current-change="changePage"
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.page"
        :page-size="page.pageSize"
        background
      ></el-pagination>
    </el-row>
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
        channel_id: null, // 默认给一个空 因为打开页面时是没有筛选的
        dateRange: [] // 数组 [开始时间,结束时间][1,2]
      },
      channels: [],
      //   分页设置
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 修改数据
    modifyItem (item) {
      // 跳转到发布页面
      this.$router.push(`/home/publish/${item.id.toString()}`)
    },
    //   删除评论
    delItem (item) {
      this.$confirm('您是否要删除此文章?', '提示').then(() => {
        // 确定删除
        this.$axios({
          // item.id 长度超过安全限制 => bigNumber类型 => toString() 形成正确的结构
          url: `/articles/${item.id.toString()}`,
          method: 'delete'
        }).then(() => {
          // 重新拉取数据
          this.getConditionArticles() // 获取筛选的数据
        })
      })
    },
    //   页码改变
    changePage (newPage) {
      this.page.page = newPage // 赋值新页码
      this.getConditionArticles()
    },
    // 定义筛选条件改变的事件
    changeCondition () {
      this.page.page = 1
      this.getConditionArticles()
    },
    // 根据条件查询数据
    getConditionArticles () {
      // 组合条件+ 页码  状态/频道/日期区间 每页条数/页码
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate:
          this.searchForm.dateRange.length > 0
            ? this.searchForm.dateRange[0]
            : null,
        end_pubdate:
          this.searchForm.dateRange.length > 1
            ? this.searchForm.dateRange[1]
            : null,
        page: this.page.page,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    //   获取频道数据

    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 请求内容信息
    // 传params是为了在筛选条件时调用次方法
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
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
