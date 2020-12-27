import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: "",
        gameState: "",
    },
    plugins: [createPersistedState({
        storage: {
            getItem: (key) => Cookies.get(key),
            setItem: (key, value) =>
                Cookies.set(key, value, { expires: 3, secure: true }),
            removeItem: (key) => Cookies.remove(key),
        }
    })]
});

export default store