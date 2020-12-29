<template>
  <div class="mt-5" id="gameWindow">
    <div v-if="this.$store.state.username == ''">
      <h2 class="pleaseLogin">Please login to play the game!</h2>
    </div>
    <div v-else>
      <div v-if="this.$store.state.gameState == 'logged-in'">
        <StartGame />
      </div>
      <div v-if="this.$store.state.gameState == 'game-menu'">
        <GameMenu />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StartGame from "./gamewindow/StartGame";
import GameMenu from "./gamewindow/GameMenu";

export default {
  components: {
    StartGame,
    GameMenu,
  },
  data: function () {
    return {
      userdata: [],
    };
  },
  created: async function () {
    let response = await axios.get(
      "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata/"
    );
    this.userdata = response.data;
            console.log(this.$store.state.gameState)

    if (this.$store.state.username !== "") {
      this.$store.state.gameState = "logged-in";
    }
  },
};
</script>

<style>
#gameWindow {
  background-image: url("https://24wallpapers.com/Content/Images/WallpaperImages/wi96d63dfdb9-ddcf-457f-bc94-81d9d0c62eee1.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 99%;
  background-color: black;
  height: 700px;
  text-align: center;
  position: relative;
}

.pleaseLogin {
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}
</style>