<template>
  <div class="cover-image">
    <!-- 注册图片点击事件 -->
    <div @click="showDialog(index)" class="item-image" v-for="(item,index) in images" :key="index">
      <img :src="item ? item :defaultImg" alt />
    </div>
    <el-dialog @close="hideDialog" :visible="dialogVisbile">
      <!-- 弹层里要放的东西 -->
      <!-- 素材选择/上传图片 -->
      <!-- @onSelectImg="receiveImg"是监听传来的值 -->
      <select-image @onSelectImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
// 根据images 来渲染页面
// images ['']
// images ['','','']
// images []
export default {
  props: ['images'],
  data () {
    return {
      // 定义一个变量 把图片转成base64
      defaultImg: require('../../assets/img/pic_bg.png'),
      //   定义dialogVisbile属性
      dialogVisbile: false,
      selectIndex: -1
    }
  },
  methods: {
    //   接收子组件传过来的地址
    receiveImg (url) {
      // url不能在cover-image中修改 ,要在cover的父组件中修改
      this.$emit('onClickImg', url, this.selectIndex)
      this.dialogVisbile = false // 当点击图片之后关闭弹层
    },
    //   显示弹层
    showDialog (index) {
      // 点击图片的时候获取当前索引
      this.selectIndex = index // 将当前点击的索引赋值给data中一个变量
      this.dialogVisbile = true // 显示弹层
    },
    // 隐藏弹层
    hideDialog () {
      this.dialogVisbile = false // 隐藏弹层
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  .item-image {
    border: 1px solid #ccc;
    width: 200px;
    height: 200px;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
