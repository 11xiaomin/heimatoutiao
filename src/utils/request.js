// 设置token统一处理
import axios from 'axios'
// 请求拦截器
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
axios.interceptors.request.use(function (config) {
  // 成功
  // config是axios的所有配置
  // 获取token值（令牌信息）
  let token = window.localStorage.getItem('use-token')
  // headers参数
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function () {
  // 失败
})
// 相应拦截
axios.interceptors.response.use(function (response) {
  // 成功
  return response.data ? response.data : {}// 为了解决data不存在是，then中读取数据报错问题
}, function () {
  // 失败
})
export default axios
