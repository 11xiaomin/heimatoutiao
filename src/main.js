import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入初始化样式
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUi)// 全局注册
axios.defaults.baseUrl = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
