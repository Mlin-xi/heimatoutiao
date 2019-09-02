// 处理axios拦截器 请求拦截器 响应拦截器
import axios from 'axios'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // config是axios的默认请求配置 和传入的配置 结合出来的
  // 必须将config return 不return不行
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}` // 统一注入token
  return config
}, function () {})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  //   debugger
  return response.data ? response.data : {}
}, function () {})
export default {
  install: function (Vue) {
    Vue.prototype.$axios = axios
  }
}
