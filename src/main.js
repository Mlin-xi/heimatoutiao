import Vue from 'vue'
import App from './App.vue'
import router from './permission'
// 引入框架ui
import Element from 'element-ui'
// 引入全局自定义组件
import Component from './components'

// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less' // 引入初始化样式 包括 margin padding li
import axios from './utils/axios.config' // 引入axios

// Vue.prototype.$axios = axios // 给Vue对象的原型属性赋值 那么所有vue实例自动拥有$axios
Vue.config.productionTip = false
// 使用ui
Vue.use(Element)
// 使用自定义组件
Vue.use(Component)
Vue.use(axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
