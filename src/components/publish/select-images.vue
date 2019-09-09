<template>
  <!-- 实现素材的查询 -->
  <el-tabs v-model="activeName">
    <el-tab-pane label="全部素材" name="all">
      <div class="img-list">
        <el-card class="img-item" v-for="item in list" :key="item.id">
          <img @click="selectImg(item)" :src="item.url" alt />
        </el-card>
      </div>
      <!-- 分页设置 -->
      <el-row type="flex" justify="center">
        <el-pagination
          @current-change="changePage"
          :current-page="page.page"
          :page-size="page.pageSize"
          background
          layout="prev, pager, next"
          :total="page.total"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="uploadImg">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 全部素材的数组
      page: {
        page: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      // 定义formdata类型
      // let obj = new FormData()
      // obj.append('image', params.file)
      // this.$axios({
      //   url: '/user/images', // 同样的地址 不同的类型
      //   method: 'post',
      //   data: obj
      // }).then(() => {
      //   this.getMaterial() // 重新加载页面
      // })
      // 定义一个变量来接收图片
      let obj = new FormData()
      obj.append('image', params.file)
      this.$axios({
        url: '/user/images', // 同样的地址 不同的类型
        method: 'post',
        data: obj
      }).then(res => {
        // 成功之后获取上传成功后的地址
        this.$emit('onSelectImg', res.data.url)
      })
    },
    //   选择一张图片
    selectImg (item) {
      // 获取图片地址 item.url
      // 点击图片的时候触发onSelectImg this.$emit触发一个自定义事件
      this.$emit('onSelectImg', item.url)
    },
    // 绑定分页事件
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    // 获取素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results // list
        this.page.total = res.data.total_count // 图片总数
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-item {
    width: 160px;
    height: 130px;
    margin: 20px 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
