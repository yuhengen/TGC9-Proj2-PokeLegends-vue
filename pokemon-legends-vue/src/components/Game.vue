<template>
  <div class="mt-5">
    <fullscreen :fullscreen.sync="fullscreen">
      <div id="gameWindow" v-bind:style="{ height: heightSize }">
        <img
          v-if="fullscreen"
          src="https://image.freepik.com/icones-gratis/sair-para-tela-cheia_318-9824.jpg"
          class="exit-fullscreen-btn"
          @click="toggle"
        />
        <div v-if="$store.state.loginState == false">
          <h2 class="pleaseLogin">Please login to play the game!</h2>
          <img
            src="https://vignette.wikia.nocookie.net/bondlegends/images/0/00/Pkmn_Legends_Reboot.png/revision/latest/scale-to-width-down/340?cb=20150827225946"
            class="title-logo m-2"
          />
        </div>
        <div v-else>
          <div
            v-if="$store.state.gameState == 'logged_in'"
            v-bind:style="{ height: heightSize }"
          >
            <StartGame />
            <img
              src="https://vignette.wikia.nocookie.net/bondlegends/images/0/00/Pkmn_Legends_Reboot.png/revision/latest/scale-to-width-down/340?cb=20150827225946"
              class="title-logo m-2"
            />
          </div>
          <div
            v-else-if="$store.state.gameState == 'game_menu'"
            v-bind:style="{ height: heightSize }"
          >
            <GameMenu />
          </div>
          <div
            v-else-if="$store.state.gameState == 'battle_start'"
            v-bind:style="{ height: heightSize }"
          >
            <RandomBattle />
          </div>
          <div
            v-else-if="$store.state.gameState == 'open_pokedex'"
            v-bind:style="{ height: heightSize }"
          >
            <PokedexDisplay />
          </div>
        </div>
      </div>
    </fullscreen>
    <button
      type="button"
      @click="toggle"
      class="btn btn-dark btn-block fullscreen-btn d-flex justify-content-between"
    >
      <div class="ml-2">Play in Fullscreen</div>
      <div
        style="
          color: black;
          text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
          text-align: right;
        "
        class="mr-2"
      >
        ESC to exit fullscreen
      </div>
    </button>
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
  background-image: url("https://i.makeagif.com/media/5-15-2018/iCYfPA.gif");
  /* background-image: url("https://i.imgur.com/JDvCBHC.gif"); */
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
  font-size: 1.3rem;
  padding-top: 2%;
  padding-bottom: 2%;
  bottom: 1%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  background-color: rgba(52, 58, 64, 1);
}

.title-logo {
  margin: auto;
  width: 45%;
}

.fullscreen-btn {
  font-family: pixelfont;
  background-image: url("https://tcgplayerpro-www.s1.umbraco.io/media/2483/pokemon_play_pokemon_banner-02-2x.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: left;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.exit-fullscreen-btn {
  position: absolute;
  top: 0;
  left: 0;
  height: 8%;
  z-index: 20;
  border: 3px solid black !important;
}

.exit-fullscreen-btn:hover {
  cursor: pointer;
}
</style>