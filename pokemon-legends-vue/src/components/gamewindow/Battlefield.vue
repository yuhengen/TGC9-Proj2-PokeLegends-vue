<template>
  <div id="battle-window">
    <img class="ally-pokemon-portrait" v-bind:src="
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' +
                allyActivePkmn.pokemon_id +
                '.png'
              "/>
    <img class="foe-pokemon-portrait" v-bind:src="foeActivePkmn.sprites.front_default"/>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      allyActivePkmn: "",
      foeActivePkmn: "",
    };
  },
  created: async function () {
    this.allyActivePkmn = this.$store.state.userData.party_pokemon[0];

    let randomEnemyID = Math.floor(Math.random() * 150) + 1;
    let response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + randomEnemyID
    );

    this.foeActivePkmn = response.data;
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
</style>