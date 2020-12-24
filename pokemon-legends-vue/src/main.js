import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import VueRouter from 'vue-router';

import Home from './components/Home'
import RegisterPage from "./components/RegisterPage";
import Game from './components/Game'
import Pokedex from './components/Pokedex'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: "",
    },
    plugins: [createPersistedState()]
});

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
    },
    {
        path: '/game',
        component: Game
    },
    {
        path: '/pokedex',
        component: Pokedex
    }
]

// create router
const router = new VueRouter({ routes })

Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
