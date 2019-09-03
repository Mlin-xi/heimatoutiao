<template>
  <!-- 最外层 用el-card卡片做页面 -->
  <el-card>
    <!-- 插槽内容 => 标题 -->
    <bread-crumb slot="header">
      <!-- 面包屑的具名插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- 表格 需要数据  :data -->
    <el-table :data="list">
      <!-- prop属性来渲染返回过来的数据 -->
      <!-- el-table-column无法显示布尔类型的数据 所以要定义formatter来显示 -->
      <el-table-column label="标题" width="700" prop="title"></el-table-column>
      <el-table-column label="评论状态" prop="comment_status" :formatter="formatter"></el-table-column>
      <el-table-column label="评论总数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作">
        <!-- 作用域插槽 slot-scope='变量' 变量 就是row column,$index.store的属性集合 obj.row -->
        <template slot-scope="obj">
          <el-button type="text" size="small">修改评论</el-button>
          <el-button
            type="text"
            size="small"
            :style="{color:obj.row.comment_status ? '#E6A23C':'#409EFF'}"
            @click="openOrClose(obj.row)"
          >{{obj.row.comment_status ? '关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:10px">
      <el-pagination
        @current-change="pageChange"
        :current-page="page.page"
        :page-size="page.pageSize"
        background
        layout="prev,pager,next"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        page: 1,
        pageSize: 10, // 每页条数
        total: 0 // 总条数
      }
    }
  },
  methods: {
    //   分页方法
    pageChange (newPage) {
      // 当前页更新最新值
      this.page.page = newPage
      //   alert(newPage)
      this.getComments()
    },
    //   打开或者关闭
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}评论`, '提示').then(() => {
        // 调用接口
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() }, // 传递articleId参数
          data: { allow_comment: !row.comment_status } // 取反 因为当前结果如果是true 只能改成false,如果false 改成true
        }).then(res => {
          //   console.log(res)
          this.getComments() // 成功之后重新调用,拉取数据的方法
        })
      })
    },
    //   定义formatter方法
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    //   获取数据
    getComments () {
      this.$axios({
        //   query参数 就相当于get 路径参数 url参数 params
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        // console.log(res)
      })
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
