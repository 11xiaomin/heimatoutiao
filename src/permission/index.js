// 引入路由
import router from '../router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
// 阻止登录成功之后再跳转到登录页面，所以要拦截
//   alert(1)
  if (to.path.startsWith('/home')) {
  // 判断有没有token，有就放过，没有就跳转到登录页面
    let token = window.localStorage.getItem('use-token')
    if (token) {
      next()
    } else {
      next('/login')// 强制跳转到登录页
    }
  } else {
    next()
  }
})
