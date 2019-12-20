<template>
  <el-container>
    <el-aside style="width:230px;background-color: #323745;overflow:hidden">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header style='padding:0'></layout-header>
      </el-header>
      <el-main style="padding:10px;background-color:#f2f3f5">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    // 'layout-aside': layoutAside,
    // 'layout-header': layoutHeader
  }
}
</script>

<style>

</style>
