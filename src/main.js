import Vue from 'vue'
import App from './App.vue'
import './permission'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入初始化样式
import axios from 'axios'
import Component from './components' // 引入全局组件
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
Vue.prototype.$axios = axios // 赋值给全局对象

Vue.config.productionTip = false
Vue.use(ElementUi)// 全局注册
Vue.use(Component)// 注册全局组件对象
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
