<template>
  <div class="cover-image">
      <!-- 根据封面的images长度 进行渲染 一个或者三个或者不渲染 -->
      <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
          <img :src="item ? item : defultImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close="closeDialog">
          <!-- 监听谁的事件就在谁标签上写监听 -->
          <select-image @selectOneImg='receiveImg'></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: false, // 控制弹层打开关闭的变量
      defultImg: require('../../assets/img/pic_bg.png'),
      selectIndex: -1
    }
  },
  methods: {
    //   接收方法:接收到数据之后发现list为props数据，要想修改需要再次传递
    receiveImg (img) {
      this.$emit('clickOneImg', img, this.seleceIndex)// 再次触发一个自定义事件
      this.closeDialog()// 直接关闭弹层
    },
    openDialog (index) {
      this.seleceIndex = index// 记住点击的下标
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
