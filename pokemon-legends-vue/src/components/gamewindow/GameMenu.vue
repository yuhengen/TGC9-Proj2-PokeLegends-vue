<template>
  <div>
    <div class="info-box">
      <h1>Hello~ {{ this.userData.username }}</h1>
    </div>
    <div>
      <img
        v-if="this.userData.gender == 'Male'"
        src="https://cdn.bulbagarden.net/upload/thumb/c/c0/HeartGold_SoulSilver_Ethan.png/455px-HeartGold_SoulSilver_Ethan.png"
        class="char-image"
      />
      <img
        v-if="this.userData.gender == 'Female'" src="https://cdn.bulbagarden.net/upload/2/25/HeartGold_SoulSilver_Lyra.png"
        class="char-image"
      />
    </div>
    <div class="buttons-div">
      <SelectButtons message="Placeholder button" />
      <SelectButtons message="Placeholder button 2" />
      <SelectButtons message="Placeholder button 3" />
      <SelectButtons message="Placeholder button 4" />
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
.info-box {
  background-image: url("https://pbs.twimg.com/media/EWoQbTdU0AEuxyT.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 99%;
  background-color: black;
  height: 700px;
  text-align: center;
  position: relative;
}

h1 {
  /* position: absolute !important;
  bottom: 100px; */
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
  right: 10px;
  height: 90%;
}

.buttons-div {
  position: absolute !important;
  bottom: 50px;
  display: flex;
  justify-content: space-around;
  width: 85%;
  margin: auto;
}
</style>