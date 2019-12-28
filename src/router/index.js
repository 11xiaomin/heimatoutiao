import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home1 from '../views/home/home'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      component: Home1
    }, {
      // path: '/home/comment',
      path: 'comment',
      component: () => import('../views/comment')
    }, {
      // path: '/home/material',
      path: 'material',
      component: () => import('../views/material')
    }, {
      path: 'articles',
      component: () => import('../views/articles')
    }, {
      // 匹配修改文章
      path: 'publish/:articleId', // 定义一个动态路由参数
      component: () => import('../views/publish')
    }, {
      // 匹配发布文章
      path: 'publish',
      component: () => import('../views/publish')
    }, {
      path: 'account', // 账户信息
      component: () => import('../views/account')
    }]
  },
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
