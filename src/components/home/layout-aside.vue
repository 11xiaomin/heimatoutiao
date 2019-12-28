<template>
  <!--左侧导航 -->
  <div class="layout-aside" background-color="#353b4e">
    <div class="title">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <el-menu router style="width:232px" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b" classs='layout'>
      <!-- 导航组件 -->
      <el-menu-item index='/home'>首页</el-menu-item>
      <!-- 二级导航 -->
      <el-submenu index='a'>
        <span slot="title">内容管理</span>
        <el-menu-item index='/home/publish'>发布文章</el-menu-item>
        <el-menu-item index='/home/articles'>内容列表</el-menu-item>
        <el-menu-item index='/home/comment'>评论列表</el-menu-item>
        <el-menu-item index='/home/material'>素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index='b'>
        <span slot="title">粉丝管理</span>
        <el-menu-item index='/home/fans'>图文数据</el-menu-item>
        <el-menu-item index='/home/account'>粉丝概况</el-menu-item>
        <el-menu-item index='/home/fanspic'>粉丝画像</el-menu-item>
        <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index='/home/account'>账户信息</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout-aside {
  width: 229px;
  .title {
    background-color:  #2e2f32;
    text-align: center;
    padding:10px;
      img {
        height: 30px;
    }
  }
}
</style>
