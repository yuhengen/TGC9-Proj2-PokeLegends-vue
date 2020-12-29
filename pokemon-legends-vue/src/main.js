import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import './plugins/bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store'
import fullscreen from 'vue-fullscreen'

import VueRouter from 'vue-router';

import Home from './components/Home'
import RegisterPage from "./components/RegisterPage";
import Game from './components/Game'
import Pokedex from './components/Pokedex'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(fullscreen)

Vue.config.productionTip = false

// define routes
const routes = [
    {
        path: '/',
        component: Home,
        meta: { title: 'Home - Pokémon Legends' }
    },
    {
        path: '/register',
        component: RegisterPage,
        meta: { title: 'Register - Pokémon Legends' }
    },
    {
        path: '/game',
        component: Game,
        meta: { title: 'Play Pokémon Legends' }
    },
    {
        path: '/pokedex',
        component: Pokedex,
        meta: { title: 'Pokédex - Pokémon Legends' }
    }
]

// create router
const router = new VueRouter({ routes })

router.afterEach((to, from, next) => {
    Vue.nextTick(() => {
        document.title = to.meta.title ? to.meta.title : 'default title';
    });
    next;
})

Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')