<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-upload :http-request='uploadImg' class="head-upload" action :show-file-list="false">
      <img :src="formData.photo?formData.photo:defaultImg" alt />
    </el-upload>
    <el-form ref="myForm" :model="formData" :rules="userRules" style="margin-left:40px" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input style="width:30%" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input style="width:30%" v-model="formData.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input style="width:30%" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input disabled style="width:30%" v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      loading: false,
      // 定义一个表单数据对象
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      userRules: {
        name: [{ required: true, message: '用户名不能为空' }, { min: 1, max: 7, message: '用户名的长度在1-7个字符之间' }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '邮箱格式不正确'
        }]
      }, // 定义一个规则对象
      defaultImg: require('../../assets/img/home11.jpeg')
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true
      let data = new FormData()// 实例化对象
      data.append('photo', params.file)// 加入参数
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo// 设置头像地址
        eventBus.$emit('updateUserInfoSuccess')// 触发一个自定义事件
        this.loading = false
      })
    },
    // 获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        // console.log(result.data.name)
        this.formData = result.data
      })
    },
    // 获取用户信息
    saveUserInfo () {
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(result => {
            this.$message({
              type: 'success',
              message: '保存信息成功'
            })
            eventBus.$emit('updateUserInfoSuccess')// 触发一个自定义事件
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo() // 获取用户个人信息
  }
}
</script>

<style lang="less" scoped>
.head-upload {
  position: absolute;
  right: 200px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}
</style>
