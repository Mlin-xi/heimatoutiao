<template>
  <div class="cover-image">
    <div class="item-image" v-for="(item,index) in images" :key="index">
      <img src="../../assets/img/pic_bg.png" alt />
    </div>
  </div>
</template>

<script>
// 根据images 来渲染页面
// images ['']
// images ['','','']
// images []
export default {
  props: ['images']
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
