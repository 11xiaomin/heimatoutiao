<template>
  <div>
    <el-card class="articles">
      <bread-crumb slot="header">
        <template slot="title">文章列表</template>
      </bread-crumb>
      <el-row class="searchTool">
        <span>文章状态</span>
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio class="all" :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-row>
      <el-row class="searchTool">
        <span style="margin-right:15px">频道列表</span>
        <el-select @change="changeCondition" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-row>
      <el-row class="searchTool">
        <span style="margin-right:15px">时间选择</span>
        <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-row>
    </el-card>
    <el-card style="margin-top:10px">
      <el-row style="border-bottom: 1px dashed #ccc;padding-bottom:20px">
        <span>共找到{{page.total}}条符合条件的内容</span>
      </el-row>
      <el-row
        v-for="item in list"
        :key="item.id.toString()"
        type="flex"
        justify="space-between"
        class="article-item"
      >
        <el-col :span="10">
          <el-row type="flex">
            <img class="image" :src="item.cover.images.length?item.cover.images[0]: headerImg" alt />
            <div
              style="height:100px;display:flex;flex-direction:column;justify-content:space-between"
            >
              <span>{{item.title}}</span>
              <el-tag
                :type="item.status | filterType"
                style="width:60px"
              >{{item.status | filterStatus}}</el-tag>
              <span style="color:#999;font-size:12px">{{item.pubdate}}</span>
            </div>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row type="flex" justify="end" class="right">
            <span>
              <i class="el-icon-edit"></i>修改
            </span>
            <span  @click='delArticle(item.id)'>
              <i class="el-icon-delete"></i>删除
            </span>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" style="height:60px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
        ></el-pagination>
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
        channel_id: null,
        dateRange: []
      },
      channels: [], // 接收频道
      list: [],
      headerImg: require('../../assets/img/header.jpg'),
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    delArticle (id) {
      this.$confirm('您是否要删除这个文章？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除文章成功！'
          })
          // this.page.currentPage = 1
          this.getConditionArticles()
        })
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage// 赋值当前页
      this.getConditionArticles()
    },
    changeCondition () {
      this.page.currentPage = 1// 赋值第一页
      this.getConditionArticles()
    },
    getConditionArticles () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate:
          this.formData.dateRange.length
            ? this.formData.dateRange[0]
            : null,
        end_pubdate:
          this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null
      }
      this.getArticles(params)
    },
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    },
    // 获取文章列表数据
    getArticles (params) {
      this.$axios({
        url: '/articles', // 请求地址
        params
      }).then(result => {
        this.list = result.data.results // 接收文章列表数据
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getChannel()
    this.getArticles({ page: 1, per_page: 10 })
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
  padding-bottom: 10px;
  border-bottom: 1px solid #f2f3f5;
  .image {
    width: 180px;
    height: 100px;
    margin-right: 10px;
    border-radius: 5px;
  }
  .right {
    cursor: pointer;
    span {
      font-size: 12px;
      margin-right: 10px;
    }
  }
}
</style>
