<template>
  <div>
    <div class="d-flex flex-column align-items-center">
      <h1>Pokédex</h1>
      <input
        class="form-control shadow mt-4 mb-4 col-sm-10"
        type="text"
        placeholder="Search by Pokémon name"
        v-model="search_pkmn"
      />
    </div>
    <div class="pokedex-list">
      <div class="d-flex flex-wrap justify-content-center">
        <b-card
          v-for="(pokemon, i) in searchResult"
          v-bind:key="i"
          v-bind:title="
            pokemon &&
            pokemon.pokemon_species.name.charAt(0).toUpperCase() +
              pokemon.pokemon_species.name.slice(1)
          "
          v-bind:img-src="
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
            pokemon.entry_number +
            '.png'
          "
          img-alt="Pokemon Image"
          img-top
          style="width: 13rem"
          class="m-3 shadow"
        >
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      pokedex: [],
      search_pkmn: "",
    };
  },
  created: async function () {
    let response = await axios.get("https://pokeapi.co/api/v2/pokedex/kanto");
    this.pokedex = response.data.pokemon_entries;
  },
  computed: {
      searchResult: function() {
          let filteredResult = this.pokedex.filter((name)=>{
              return name.pokemon_species.name.toLowerCase().includes(this.search_pkmn.toLowerCase())
          })
          return filteredResult
      }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-family: pokemonsolid;
  font-size: 3rem;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}

.card {
  background-image: url("https://cdn.wccftech.com/wp-content/uploads/2016/08/Pokemon-GO-PokeBall.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-title {
  font-size: 1rem;
  color: black;
  text-align: center;
}
</style>