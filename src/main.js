import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入ui
import Element from 'element-ui'

// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less' // 引入初始化样式 包括 margin padding li
import axios from 'axios' // 引入axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址
Vue.prototype.$axios = axios // 给Vue对象的原型属性赋值 那么所有vue实例自动拥有$axios
Vue.config.productionTip = false
// 使用ui
Vue.use(Element)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
