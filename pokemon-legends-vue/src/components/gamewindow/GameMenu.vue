<template>
  <div id="game-menu">
      <div v-if="this.userData.tutorial"></div>
    <div id="user-info">
      <h1>Hello {{ this.userData.username }}~</h1>
    </div>
      <img
        v-if="this.userData.gender == 'Male'"
        src="https://cdn.bulbagarden.net/upload/thumb/c/c0/HeartGold_SoulSilver_Ethan.png/455px-HeartGold_SoulSilver_Ethan.png"
        class="char-image"
      />
      <img
        v-if="this.userData.gender == 'Female'" src="https://cdn.bulbagarden.net/upload/2/25/HeartGold_SoulSilver_Lyra.png"
        class="char-image"
      />
    <div class="buttons-div">
      <SelectButtons message="Battle" />
      <SelectButtons message="Pokémon" />
      <SelectButtons message="Pokédex" />
      <SelectButtons message="Bag" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SelectButtons from "./SelectButtons";

export default {
  data: function () {
    return {
      userData: {},
    };
  },
  components: {
    SelectButtons,
  },
  created: async function () {
    let response = await axios.get(
      "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata/" +
        this.$store.state.username
    );
    this.userData = response.data;
  },
};
</script>

<style scoped>
#game-menu {
  background-image: url("https://pbs.twimg.com/media/EWoQbTdU0AEuxyT.jpg");
  background-size:cover;
  background-position: center;
  background-repeat: no-repeat;
  /* background-size: 99%; */
  background-color: black;
  height: 65vh;
  text-align: center;
  position: relative;
}

h1 {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}

.char-image {
  position: absolute !important;
  bottom: 0;
  left: 10%;
  height: 90%;
}

.buttons-div {
  position: absolute !important;
  bottom: 5%;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: auto;
}
</style>