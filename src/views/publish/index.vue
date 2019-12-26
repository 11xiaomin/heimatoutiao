<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form ref="publishForm" :model='formData' :rules="publishRules" style="margin-left:50px" label-width="100px">
      <el-form-item prop='title' label="标题">
        <el-input v-model='formData.title' style="width:60%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input v-model="formData.content" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="封面">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publishArticle" type="primary">发布</el-button>
        <el-button>存入草稿</el-button>
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
        cover: {// 封面
          type: 0, // 类型
          images: [] // 图片地址
        },
        channel_id: null// 频道id
      },
      publishRules: {
        // 校验规则
        title: [{ required: true, message: '标题内容不能为空' }, { min: 5, max: 30, message: '标题长度为5-30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  methods: {
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    },
    publishArticle () {
      this.$refs.publishForm.validate(function (isOK) {
        if (isOK) {

        }
      })
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style>
</style>
