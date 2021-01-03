<template>
  <div id="battle-window">
    <img
      class="ally-pokemon-portrait"
      v-bind:src="
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' +
        allyActivePkmn.pokemon_id +
        '.png'
      "
    />
    <img
      class="foe-pokemon-portrait"
      v-bind:src="foeActivePkmn.sprites.front_default"
    />

    <!-- bottom buttons -->
    <div class="buttons-div">
      <SelectButtons :message="allyActivePkmnMove[0].attack" />
      <SelectButtons :message="allyActivePkmnMove[1].move1" />
      <SelectButtons :message="allyActivePkmnMove[2].move2" />
      <SelectButtons :message="allyActivePkmnMove[3].ultimate" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SelectButtons from "./SelectButtons";
export default {
  data: function () {
    return {
      allyActivePkmn: "",
      allyActivePkmnMove: [],
      foeActivePkmn: "",
    };
  },
  components: {
    SelectButtons,
  },
  created: async function () {
    this.allyActivePkmn = this.$store.state.userData.party_pokemon[0];

    let response = await axios.get(
      "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/movesets"
    );
    let pkmnmove = response.data;
    let pkmnmoveset = pkmnmove.find(
      (pm) => pm.pokemon_id == this.allyActivePkmn.pokemon_id
    );
    this.allyActivePkmnMove = pkmnmoveset.moveset;

    let randomEnemyID = Math.floor(Math.random() * 150) + 1;
    let response2 = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + randomEnemyID
    );

    this.foeActivePkmn = response2.data;
  },
};
</script>

<style scoped>
#battle-window {
  background-image: url("https://cutewallpaper.org/21/pokemon-battle-field-background/OR-AS-Battle-Background-1B-by-PhoenixOfLight92-on-DeviantArt.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: black;
  height: 100%;
  text-align: center;
  position: relative;
}

.buttons-div {
  position: absolute !important;
  bottom: 3%;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: auto;
}

.ally-pokemon-portrait {
  position: absolute !important;
  bottom: 0;
  left:5%;
  height:50%;
}

.foe-pokemon-portrait {
  position: absolute !important;
  top: 15%;
  right:5%;
  height:50%;

}
</style>