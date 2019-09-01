import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'

// 所有自定义组件的插件
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
