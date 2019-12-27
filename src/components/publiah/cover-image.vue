<template>
  <div class="cover-image">
      <!-- 根据封面的images长度 进行渲染 一个或者三个或者不渲染 -->
      <div @click="openDialog" v-for="(item,index) in list" :key="index" class="cover-item">
          <img :src="item ? item : defultImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close="closeDialog">
          <select-image></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: false, // 控制弹层打开关闭的变量
      defultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true// 打开弹层
    },
    closeDialog () {
      this.dialogVisible = false// 关闭弹层
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image{
    display: flex;
    margin: 20px 0;
    margin-left:100px;
    .cover-item{
        border: 1px solid #ccc;
        width: 200px;
        height: 200px;
        img{
            width: 100%;
            height:100%;
        }
    }
}
</style>
