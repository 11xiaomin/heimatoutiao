<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left:50px"
      label-width="100px"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <quill-editor style="height:300px" v-model="formData.content"></quill-editor>
      </el-form-item>
      <el-form-item prop="type" label="封面" style="margin-top:140px">
        <el-radio-group @change="changeType" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 放置一个封面组件 -->
      <cover-image :list="formData.cover.images"></cover-image>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @change="publishArticle()" type="primary">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 内容
        cover: {
          // 封面
          type: 0, // 类型
          images: [] // 图片地址
        },
        channel_id: null // 频道id
      },
      publishRules: {
        // 校验规则
        title: [
          { required: true, message: '标题内容不能为空' },
          { min: 5, max: 30, message: '标题长度为5-30字符之间' }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  // 因为发布文章和修改文章共用了一个组件，切换页面时，组件不会销毁，之所以不会销毁是因为两个路由都渲染同个组件，比起销毁在创建，复用更有效。然后用watch监听，有参数就修改，无参数就发布
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        this.getArticleById(to.params.articleId) // 重新拉取数据
      } else {
        this.formData = this.formData = {
          title: '', // 标题
          content: '', // 内容
          cover: {
            // 封面
            type: 0, // 类型
            images: [] // 图片地址
          }
        }
      }
    }
    // 监控嵌套对象中的值（1）
    //   'formData.cover.type': function () {
    //     if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //       this.formData.cover.images = []
    //     } else if (this.formData.cover.type === 1) {
    //       this.formData.cover.images = ['']
    //     } else if (this.formData.cover.type === 3) {
    //       this.formData.cover.images = ['', '', '']
    //     }
    //   }
  },
  methods: {
    // 监控嵌套对象中的值（2）
    // 切换类型时触发
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    },
    // 获取频道
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    },
    // 发布文章
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          let { articleId } = this.$route.params
          this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : '/articles',
            params: { draft },
            data: this.formData
          }).then(result => {
            // 新增成功，应该去内容列表
            this.$router.push('/home/articles')
          })
          // if (articleId) {
          //   // 修改文章
          //   this.$axios({
          //     method: 'put',
          //     url: `/articles/${articleId}`,
          //     params: { draft },
          //     data: this.formData
          //   }).then(() => {
          //     // 新增成功，应该去内容列表
          //     this.$router.push('/home/articles')
          //   })
          // } else {
          //   // 可以去进行  发布接口调用
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft },
          //     data: this.formData
          //   }).then(() => {
          //     // 新增成功，应该去内容列表
          //     this.$router.push('/home/articles')
          //   })
          // }
        }
      })
    },
    // 获取文章详情通过id
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将指定文章数据给data数据
      })
      // }
    }
  },
  created () {
    this.getChannel() // 获取频道数据
    // 获取id 判断有无id ，有id 就是修改  无id就是发布
    // 获取动态路由参数
    let { articleId } = this.$route.params
    // 如果id存在就调用接口，写一个方法
    // 这个时候articleId就是字符串，不需要在toString
    if (articleId) {
      // this.getArticleById(articleId)
      // 获取文章数据
      articleId && this.getArticleById(articleId)
    }
  }
}
</script>

<style>
</style>
