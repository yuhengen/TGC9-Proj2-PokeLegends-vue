<template>
  <div class="mt-5">
    <fullscreen :fullscreen.sync="fullscreen">
      <div id="gameWindow" v-bind:style="{ height: heightSize }">
        <div v-if="$store.state.loginState == false">
          <h2 class="pleaseLogin">Please login to play the game!</h2>
          <h1 class="legendsText">Legends</h1>
        </div>
        <div v-else>
          <div
            v-if="$store.state.gameState == 'logged_in'"
            v-bind:style="{ height: heightSize }"
          >
            <h1 class="legendsText">Legends</h1>
            <StartGame />
          </div>
          <div
            v-if="$store.state.gameState == 'game_menu'"
            v-bind:style="{ height: heightSize }"
          >
            <GameMenu />
          </div>
          <div
            v-if="$store.state.gameState == 'battle_start'"
            v-bind:style="{ height: heightSize }"
          >
            <RandomBattle />
          </div>
          <div
            v-if="$store.state.gameState == 'open_pokedex'"
            v-bind:style="{ height: heightSize }"
          >
            <PokedexDisplay/>
          </div>
        </div></div
    ></fullscreen>
    <button type="button" @click="toggle" class="btn btn-dark btn-block fullscreen-btn d-flex justify-content-between">
        <div class="ml-5">Play in Fullscreen</div><div style="color:black; 
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;" class="mr-5">ESC to leave fullscreen</div></button>
  </div>
</template>

<script>
import StartGame from "./gamewindow/StartGame";
import GameMenu from "./gamewindow/GameMenu";
import RandomBattle from "./gamewindow/RandomBattle.vue";
import PokedexDisplay from "./gamewindow/PokedexDisplay.vue";

export default {
  components: {
    StartGame,
    GameMenu,
    RandomBattle,
    PokedexDisplay,
  },
  data: function () {
    return {
      userData: [],
      heightSize: "650px",
      fullscreen: false,
    };
  },
  created: function () {
    if (this.$store.state.username !== "") {
      this.$store.state.gameState = "logged_in";
    }
  },
  methods: {
    toggle() {
      this.fullscreen = !this.fullscreen;
    },
  },
  watch: {
    fullscreen: function () {
      if (this.fullscreen == true) {
        this.heightSize = "100vh";
      } else {
        this.heightSize = "650px";
      }
    },
  },
};
</script>

<style>
#gameWindow {
  /* background-image: url("https://i.pinimg.com/originals/b5/c2/b4/b5c2b47b1c4cc051995d68991e855e76.jpg"); */
  background-image: url("https://i.imgur.com/JDvCBHC.gif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* background-size: 99%; */
  background-color: black;
  text-align: center;
  position: relative;
  font-family: pixelfont;
}

.pleaseLogin {
  position: absolute !important;
  font-size:1.3rem;
  padding-top:2%;
  padding-bottom:2%;
  bottom: 1%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  background-color: rgba(52, 58, 64, 1);
}

.legendsText {
  font-family: pokemonsolid;
  font-size: 130px;
  color: #f3f0ad;
  position: absolute !important;
  bottom: 23%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  text-shadow: -5px 0 black, 0 5px black, 5px 0 black, 0 -5px black;
}

.fullscreen-btn {
    font-family:pixelfont;
    background-image: url('https://tcgplayerpro-www.s1.umbraco.io/media/2483/pokemon_play_pokemon_banner-02-2x.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    text-align:left;
    color:white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
</style>