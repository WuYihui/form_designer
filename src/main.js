import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/reset-element-ui.css'
import 'element-ui/lib/theme-chalk/index.css'

//是否需要判断登录
const needLogin = 'false';
// import 'form-making/dist/FormMaking.css'
// import FormMaking from 'form-making'
import FormMaking from './index'
Vue.use(FormMaking)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
