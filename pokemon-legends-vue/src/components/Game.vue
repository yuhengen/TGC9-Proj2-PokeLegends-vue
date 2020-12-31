<template>
  <div class="mt-5">
    <fullscreen :fullscreen.sync="fullscreen">
      <div id="gameWindow" v-bind:style="{ height: heightSize }">
        <div v-if="this.$store.state.loginState == false">
          <h2 class="pleaseLogin">Please login to play the game!</h2>
        </div>
        <div v-else>
          <div
            v-if="this.$store.state.gameState == 'logged_in'"
            v-bind:style="{ height: heightSize }"
          >
            <StartGame />
          </div>
          <div
            v-if="this.$store.state.gameState == 'game_menu'"
            v-bind:style="{ height: heightSize }"
          >
            <GameMenu />
          </div>
          <div v-if="this.$store.state.gameState == 'battle_start'"
            v-bind:style="{ height: heightSize }">
              <Battlefield/>
        </div></div></div></fullscreen>
    <button type="button" @click="toggle">Fullscreen</button>
  </div>
</template>

<script>
import StartGame from "./gamewindow/StartGame";
import GameMenu from "./gamewindow/GameMenu";
import Battlefield from "./gamewindow/Battlefield"

export default {
  components: {
    StartGame,
    GameMenu,
    Battlefield
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
  background-image: url("https://i.pinimg.com/originals/b5/c2/b4/b5c2b47b1c4cc051995d68991e855e76.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* background-size: 99%; */
  background-color: black;
  text-align: center;
  position: relative;
}

.pleaseLogin {
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}
</style>