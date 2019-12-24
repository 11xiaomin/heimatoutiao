<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <el-row class="searchTool">
      <span>文章状态</span>
      <el-radio-group v-model='formData.status'>
        <el-radio class="all" :label="5">全部</el-radio>
        <el-radio :label="0">草稿</el-radio>
        <el-radio :label="1">待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="3">审核失败</el-radio>
      </el-radio-group>
    </el-row>
    <el-row class="searchTool">
      <span style="margin-right:15px">频道列表</span>
      <el-select v-model="formData.channels">
        <el-option v-for="item in channels" :key="item.id" :label='item.name' :value="item.id"></el-option>
      </el-select>
    </el-row>
    <el-row class="searchTool">
      <span style="margin-right:15px">时间选择</span>
      <el-date-picker v-model='formData.dayeRange' type="daterange" range-separator="-"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channels: null,
        dateRange: []
      },
      channels: [] // 接收频道
    }
  },
  methods: {
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style lang="less" scoped>
.articles {
  .searchTool {
    height: 60px;
    margin-left: 60px;
    .all {
      margin-left: 10px;
    }
  }
}
</style>
