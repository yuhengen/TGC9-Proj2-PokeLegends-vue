<template>
  <div class="mt-5">
    <div id="gameWindow">
      <img
        src="https://24wallpapers.com/Content/Images/WallpaperImages/wi96d63dfdb9-ddcf-457f-bc94-81d9d0c62eee1.jpg"
        class="startGameImg"
      />

      <div v-if="this.$store.state.username == ''">
        <h1>Please login to play the game!</h1>
      </div>
      <div v-else>
        <h1>Welcome back {{ this.$store.state.username }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
  },
};
</script>

<style>
#gameWindow {
  width: 100%;
  background-color:black;
  height: 700px;
}

.startGameImg {
  width: 100%;
  /* position: absolute; */
}

h1 {
  position: relative;
}
</style>