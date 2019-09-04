<template>
  <el-card class="material">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材 -->
        <!-- {{list.length}} -->
        <div class="card-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
            <el-row type="flex" justify="space-around" class="operate">
              <i class="el-icon-star-on" :style="{color:item.is_collected?'red':''}"></i>
              <i @click="delImg(item)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="card-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
      <el-row type="flex" justify="center">
        <el-pagination
          @current-change="changePage"
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.page"
          :page-size="page.pageSize"
        ></el-pagination>
      </el-row>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 收藏和全部共用一个list
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 删除图片
    delImg (item) {
      this.$confirm('您确定要删除此图片吗?', '提示').then(() => {
        // 确定要删除
        // 请求数据
        this.$axios({
          method: 'delete',
          url: `/user/images/${item.id}`
        }).then(() => {
          this.getMaterial() // 重新加载页面
        })
      })
    },
    // 分页设置
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial() // 请求新的数据
    },
    // 切换标签
    changeTab () {
      // activeName是显示最新的页签
      // alert(this.activeName)
      // 加载不同类型的数据
      // all => 所有的数据
      // collect => 去加载收藏数据
      this.page.page = 1 // 当切换页面时,应让刚开始的页码显示在第1页
      this.getMaterial() // 请求数据获取最新的页签
    },
    //   获取图片素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect', // 是否收藏图片 false 不收藏 true 收藏
          page: this.page.page,
          per_page: this.page.pageSize // 默认pageSize 10条
        }
      }).then(res => {
        this.list = res.data.results // 接收数据
        this.page.total = res.data.total_count // 将图片总数返回给总页数
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scped>
.material {
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card {
      position: relative;
      width: 180px;
      height: 180px;
      margin: 26px;
      img {
        width: 100%;
        height: 100%;
      }
      .operate {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        // height: 20px;
        background-color: #f4f5f6;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>
