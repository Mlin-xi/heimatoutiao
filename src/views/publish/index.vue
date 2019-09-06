<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 model 数据对象 rules 绑定规则 prop用来校验的 ref是校验全部的属性-->
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left:100px"
      label-width="100px"
    >
      <el-form-item label="标题" prop="title">
        <el-input style="width:400px" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" :rows="4" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <!-- label(显示值)  value(真实值) -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发表文章</el-button>
        <!-- 添加一个存入草稿事件 -->
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          // 封面类型 -1:自动，0-无图，1-1张，3-3张
          type: 0,
          images: []
        },
        channel_id: null
      },
      //   校验规则
      publishRules: {
        title: [
          {
            required: true,
            message: '标题不能为空'
          }
        ],
        content: [
          {
            required: true,
            message: '内容不能为空'
          }
        ],
        channel_id: [
          {
            required: true,
            message: '频道不能为空'
          }
        ]
      }
    }
  },
  methods: {
    // 存入草稿 :接口和数据publish都一样,只是params的draft不一样,所以公用一个方法,然后在方法上各自传上所需要的draft参数值
    //   获取数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 发布文章
    publish (draft) {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          // 校验成功后 请求接口
          // 才管是新增还是修改
          let { articleId } = this.$route.params // 获取id
          this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : '/articles',
            params: { draft }, // draft 为true时 就是草稿
            data: this.formData // 传formData数据
          }).then(() => {
            // 编程式导航
            this.$router.push('/home/articles') // 跳转到文章列表页面
          })
        }
      })
    },

    // 通过id获取文章详情(修改的时候)
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getChannels() // 获取频道
    // 用解构来接收获取文章详情成功后的id
    // this.$route.params 是取动态路由的
    let { articleId } = this.$route.params
    // 如果存在 说明是修改文章 通过id 获取当前的文章数据
    if (articleId) {
      this.getArticleById(articleId)
    }
  }
}
</script>

<style>
</style>
