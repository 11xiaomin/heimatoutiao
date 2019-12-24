<template>
  <div>
    <el-card class="articles">
      <bread-crumb slot="header">
        <template slot="title">文章列表</template>
      </bread-crumb>
      <el-row class="searchTool">
        <span>文章状态</span>
        <el-radio-group v-model="formData.status">
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
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-row>
      <el-row class="searchTool">
        <span style="margin-right:15px">时间选择</span>
        <el-date-picker
          v-model="formData.dayeRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-row>
    </el-card>
    <el-card style="margin-top:10px">
      <el-row style="border-bottom: 1px dashed #ccc;padding-bottom:20px">
        <span>共找到条符合条件的内容</span>
      </el-row>
      <el-row
        v-for="item in 100"
        :key="item"
        type="flex"
        justify="space-between"
        class="article-item"
      >
        <el-col :span="10">
          <el-row type="flex">
            <img class="image" src="../../assets/img/404.png" alt />
            <div
              style="height:100px;display:flex;flex-direction:column;justify-content:space-between"
            >
              <span>纷纷回家和公积金</span>
              <el-tag style="width:60px">标签一</el-tag>
              <span style="color:#999;font-size:12px">2019-12-24 17:55:06</span>
            </div>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row type="flex" justify="end" class="right">
            <span>
              <i class="el-icon-edit"></i>修改
            </span>
            <span>
              <i class="el-icon-delete"></i>删除
            </span>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
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
.article-item {
  margin-top: 20px;
  padding-bottom:10px;
  border-bottom: 1px solid #f2f3f5;
  .image {
    width: 180px;
    height: 100px;
    margin-right: 10px;
    border-radius: 5px;
  }
  .right {
    span {
      font-size: 12px;
      margin-right: 10px;
    }
  }
}
</style>
