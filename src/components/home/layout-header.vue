<template>
  <div>
    <el-row class="layout-header" type="flex" align="middle" justify="space-between">
      <el-col :span="6" class="left">
        <i class="el-icon-s-unfold"></i>
        <span style="font-size:14px">江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="4" class="right">
        <el-row type="flex" justify="end" align="middle">
          <img :src="userInfo.photo?userInfo.photo:defaultImg" alt />
          <el-dropdown @command='handle'>
            <span>{{userInfo.name}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='gr'>个人信息</el-dropdown-item>
              <el-dropdown-item command='git'>git地址</el-dropdown-item>
              <el-dropdown-item command='tc'>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/img/header.jpg') // 先把地址转换成变量
    }
  },
  created () {
    // 获取token值（令牌信息）
    let token = window.localStorage.getItem('use-token')
    // 查询数据，首先要用axios，用this.$axios()
    this.$axios({
      url: '/user/profile',
      // headers参数
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      // console.log(result.data)
      this.userInfo = result.data.data // 获取用户个人信息
    })
  },
  methods: {
    handle (command) {
      // alert(1)
      if (command === 'tc') {
        window.localStorage.removeItem('use-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'http://baidu.com'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 16px;
    margin-left: 4px;
    color: #2c3e50;
    font-size: 16px;
  }
  .right {
    float: right;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 5px;
    }
    span {
      font-size: 12px;
    }
  }
}
</style>
