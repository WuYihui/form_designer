import Vue from 'vue'
import Router from 'vue-router'
import { getStore, setStore } from '../util/storage';
import Home from '../demo/Home'
import login from '../demo/login'
import Price from '../demo/Price'
import formList from '../demo/FormList'
import config from  '../../static/config.js'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录 - 表单设计器 '
      },
      component: login
    },
    {
      path: '/formlist',
      name: 'formlist',
      component: formList,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/price',
      name: 'price',
      component: Price
    }
  ]
})

//跳转之前判断
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {  // 判断该路由是否需要登录权限
    let token = getStore("accessToken");
    if ((token != null && token != '')||!config.needLogin) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }

})

export default router;