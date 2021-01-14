<template>
      <div
        id="starter-select"
        class="d-flex flex-column align-items-center justify-content-center"
      >
        <div>
          <h2>Select Your Starter</h2>
        </div>
        <div class="d-flex flex-wrap justify-content-around">
          <b-card
            v-for="(starter, i) in starters"
            v-bind:key="i"
            :title="starter.name"
            :img-src="
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
              starter.pokemonID +
              '.png'
            "
            img-alt="Pokemon Image"
            img-top
            style="
              width: 30%;
              position: relative;
              background-color: rgba(52, 58, 64, 0);
            "
            class="mt-3"
          >
            <b-button
              variant="success"
              @click="selectStarter(starter.pokemonID)"
              >Select</b-button
            >
          </b-card>
        </div>
      </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      starters: [
        { name: "Bulbasaur", pokemonID: 1 },
        { name: "Charmander", pokemonID: 4 },
        { name: "Squirtle", pokemonID: 7 },
      ],
    };
  },
  methods: {
    selectStarter: async function (index) {
      let response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + index
      );
      let pokemondata = response.data;

      let newPokemon = {
        pokemon_name: "",
        pokemon_id: 0,
        types: [],
        lvl: 0,
        exp: 0,
        stats: {},
      };

      newPokemon.pokemon_name =
        pokemondata.name.charAt(0).toUpperCase() + pokemondata.name.slice(1);
      newPokemon.pokemon_id = parseInt(pokemondata.id);
      //   let types = pokemondata.types;
      newPokemon.types = [];
      for (let i in pokemondata.types) {
        newPokemon.types.push(pokemondata.types[i].type.name);
      }
      newPokemon.lvl = 1;
      newPokemon.exp = 0;
      newPokemon.stats = {
        hp: pokemondata.stats[0].base_stat,
        atk: pokemondata.stats[1].base_stat,
        def: pokemondata.stats[2].base_stat,
        "sp-atk": pokemondata.stats[3].base_stat,
        "sp-def": pokemondata.stats[4].base_stat,
        speed: pokemondata.stats[5].base_stat,
      };

      this.$store.state.userData.party_pokemon.push(newPokemon);
      this.$store.state.userData.tutorial += 1;

      await axios.patch(
        "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/userdata/" +
          this.$store.state.username,
        this.$store.state.userData
      );
    },
  },
};
</script>

<style scoped>
#starter-select {
  height: 90%;
  width: 100%;
  background-color: rgba(52, 58, 64, 0.9);
  color: white;
}

.card-title {
  font-size: 1.4rem;
  text-align: center;
}
</style>