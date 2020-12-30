<template>
  <div id="game-menu">
    <div v-if="this.userData.tutorial == 0">
      <h1>Begin Tutorial</h1>
    </div>
    <div v-else>
      <div
        id="user-info"
        class="d-flex flex-column justify-content-around pl-5 pr-5 pt-2"
      >
        <h3>User Info</h3>
        <div class="d-flex justify-content-between">
          <h5>Name:</h5>
          <h5>{{ this.userData.username }}</h5>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Pokédollar:</h5>
          <h5>{{ this.userData.pokedollar }}</h5>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Pokédex:</h5>
          <h5>{{ this.userData.pokedex && this.userData.pokedex.length }}</h5>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Gym Badges:</h5>
          <h5>{{ this.userData.badges && this.userData.badges.length }}</h5>
        </div>
        <div>
          <h5>
            Pokémon Party:
            {{
              this.userData.party_pokemon && this.userData.party_pokemon.length
            }}/4
          </h5>
          <div class="d-flex justify-content-around">
            <img
              v-bind:src="
                this.pokemonData.sprites &&
                this.pokemonData.sprites.front_default
              "
            />
          </div>
        </div>
      </div>
      <img
        v-if="this.userData.gender == 'Male'"
        src="https://cdn.bulbagarden.net/upload/thumb/c/c0/HeartGold_SoulSilver_Ethan.png/455px-HeartGold_SoulSilver_Ethan.png"
        class="char-image"
      />
      <img
        v-if="this.userData.gender == 'Female'"
        src="https://cdn.bulbagarden.net/upload/2/25/HeartGold_SoulSilver_Lyra.png"
        class="char-image"
      />
      <div class="buttons-div">
        <SelectButtons message="Pokédex" />
        <SelectButtons message="Pokémon" />
        <SelectButtons message="Battle" />
        <SelectButtons message="Bag" />
        <SelectButtons message="Shop" />
      </div>
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
      pokemonData: {},
      toggleInfo: false,
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

    let response2 = await axios.get("https://pokeapi.co/api/v2/pokemon/4");
    this.pokemonData = response2.data;
  },
};
</script>

<style scoped>
#game-menu {
  background-image: url("https://pbs.twimg.com/media/EWoQbTdU0AEuxyT.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: black;
  height: 100%;
  text-align: center;
  position: relative;
}

#user-info {
  position: absolute !important;
  height: 70%;
  width: 38%;
  background-color: rgba(52, 58, 64, 0.9);
  right: 10px;
  top: 10px;
  z-index: 3;
  border-radius: 10px;
  border: 3px solid white !important;
}

h3 {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  font-size: 2rem;
}

h5 {
  font-size: 1.6rem;
}

.char-image {
  position: absolute !important;
  bottom: 0;
  left: 10%;
  height: 90%;
}

.buttons-div {
  position: absolute !important;
  bottom: 3%;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: auto;
}
</style>