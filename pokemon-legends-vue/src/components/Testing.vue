<template>
  <div>
    <h1>My Pokemon</h1>
    <div>
      <h2>{{ userdata }}</h2>
    </div>
    <div v-for="p in poke_moves" v-bind:key="p._id">
      <h2>{{ p.pokemon_name }}</h2>
      <ul>
        <li>{{ p.moveset[0].attack }}</li>
        <li>{{ p.moveset[1].move1 }}</li>
        <li>{{ p.moveset[2].move2 }}</li>
        <li>{{ p.moveset[3].ultimate }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      username: "phantomshiro",
      poke_moves: [],
      pokemon: "",
      userdata: "",
    };
  },
  created: async function () {
    let response = await axios.get(
      "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata/"
    );
    this.userdata = response.data;

    let response2 = await axios.get(
      "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/movesets/"
    );
    this.poke_moves = response2.data;
  },
  computed: {
    // party_pokemon: function () {
    //     if (this.username == this.userdata){
    //     }
    //     return this.userdata
    // }
  },
};
</script>

<style scoped>
</style>