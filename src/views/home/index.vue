<template>
  <el-container>
    <el-aside>
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>头部</el-header>
      <el-main>内容</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layOut from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layOut
  }
}
</script>

<style>
.layout-aside {
  background-color: #323745;
  height: 100vh;
}
</style>
