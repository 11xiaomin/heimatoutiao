// 设置token统一处理
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
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
}, function (error) {
  // 失败
//   1.获取状态码
// 2.根据状态码的不同来进行提示
// 如果同样的状态码，但是不同意思，需要通过请求地址来判断是哪个的响应   请求地址+状态码一起来判断怎么处理
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '手机号或者验证码不正确'
      break
    case 403:
      message = 'refresh_token未携带或已过期'
      //   window.localStorage.removeItem('use-token')
      router.push('/login')
      break
    case 401:
      message = 'token过期或未传'
      break
    case 404:
      message = '手机号不正确'
      break
    case 507:
      message = '服务器数据库异常'
      break
    default:
      break
  }
  Message({ type: 'warning', message })// 提示消息
})
export default axios
