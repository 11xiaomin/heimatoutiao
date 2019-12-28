<template>
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row type='flex' justify='end'>
      <el-upload action='' :http-request='uploadImg' :show-file-list='false'>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img :src="item.url" alt />
          <el-row class="operate" type="flex" justify="space-around" align="middle">
            <i @click='collectOrCancel(item)' :style="{color:item.is_collected?'red':''}" class="el-icon-star-on"></i>
            <i @click='delMaterial(item.id)' class="el-icon-delete-solid"></i>
          </el-row>
        </el-card>
      </div>
      <el-row type='flex' justify='center' align='middle' style='height:60px'>
        <el-pagination background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize"
        @current-change="changePage"></el-pagination>
      </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
         <el-row type='flex' justify='center' align='middle' style='height:60px'>
        <el-pagination background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize"
        @current-change="changePage"></el-pagination>
      </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    delMaterial (id) {
      this.$confirm('您确定要删除该素材吗？').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getAllMaterial()
        })
      })
    },
    collectOrCancel (row) {
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected
        }
      }).then(() => {
        this.getAllMaterial()
      })
    },
    uploadImg (params) {
      this.loading = true// 打开进度条
      let form = new FormData()
      form.append('image', params.file)// 添加文件到formData
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: form
      }).then(result => {
        // 说明已经上传成功了一张图片
        this.loading = false// 关闭进度条
        this.getAllMaterial()
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllMaterial()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getAllMaterial()
    },
    getAllMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    position: relative;
    width: 200px;
    height: 240px;
    margin: 20px 50px;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      width: 100%;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #f4f5f6;
      height: 30px;
      i{
        cursor: pointer;
      }
    }
  }
}
</style>
