import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入ui
import Element from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
// 使用ui
Vue.use(Element)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
