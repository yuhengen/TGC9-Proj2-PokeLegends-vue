import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: "",
        loginState: false,
        gameState: "",
        battleType: "",
        inBattle: false,
        bgm: null,
        bgmName: "",
        userData: {},
        selectSFX: new Audio("sfx/select1.mp3"),
        attackSFX: new Audio("sfx/attack.mp3"),
    },
    plugins: [createPersistedState()]
});

export default store