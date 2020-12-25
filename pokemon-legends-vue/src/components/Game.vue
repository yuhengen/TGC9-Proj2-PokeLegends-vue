<template>
  <div class="mt-5" id="gameWindow">
    <div v-if="this.$store.state.username == ''">
      <h2>Please login to play the game!</h2>
    </div>
    <div v-else>
      <div v-if="gameState == 'start_game'">
        <StartGame />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StartGame from "./gamewindow/StartGame";

export default {
  components: {
    StartGame,
  },
  data: function () {
    return {
      gameState: "",
      userdata: [],
    };
  },
  created: async function () {
    let response = await axios.get(
      "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata/"
    );
    this.userdata = response.data;

    if (this.$store.state.username !== "") {
      this.gameState = "start_game";
    }
  },
};
</script>

<style>
#gameWindow {
  /* width: 100%; */
  background-image: url("https://24wallpapers.com/Content/Images/WallpaperImages/wi96d63dfdb9-ddcf-457f-bc94-81d9d0c62eee1.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: black;
  height: 650px;
  text-align: center;
  position:relative;
}
</style>