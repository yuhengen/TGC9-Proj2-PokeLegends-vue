import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VueRouter from 'vue-router';

import Home from './components/Home'
import RegisterPage from "./components/RegisterPage";

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

// define routes
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/register',
        component: RegisterPage
    }
]

// create router
const router = new VueRouter({ routes })

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
