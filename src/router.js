import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Home from './views/home'
import Main from './views/home/main.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '', // 默认的二级路由的地址path为空串
      component: Main
    }, {
      path: 'comment',
      component: () => import('./views/comment')
    }, {
      path: 'material',
      component: () => import('./views/material')
    }, {
      // 内容管理
      path: 'articles/',
      component: () => import('./views/articles')
    }, {
      // 发布文章
      path: 'publish',
      component: () => import('./views/publish')
    }, {
      // 修改文章
      path: 'publish/:articleId',
      component: () => import('./views/publish')
    },
    {
      // 账户信息
      path: 'account',
      component: () => import('./views/account')
    }
    ]
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
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
