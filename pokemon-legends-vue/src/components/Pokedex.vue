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
          @click="openPkmnInfo(pokemon.entry_number)"
          v-b-modal.pokemon-info
        >
        </b-card>
      </div>
    </div>

    <b-modal id="pokemon-info" centered title="Pokémon Information" hide-footer>
      <div class="d-flex flex-wrap flex-column mb-3">
        <h2 class="text-center">
          {{
            pokemondata &&
            pokemondata.names[8].name.charAt(0).toUpperCase() +
              pokemondata.names[8].name.slice(1)
          }}
        </h2>
      </div>
      <div class="d-flex align-items-center info-align">
        <img
          class="pokemondata-image"
          v-bind:src="pokemondata2 && pokemondata2.sprites.front_default"
          alt="Pokemon Image"
        />
        <p class="my-4">
          {{ pokemondata && pokemondata.flavor_text_entries[14].flavor_text }}
        </p>
      </div>
      <div class="dropdown-divider"></div>
      <h5 class="m-3 text-center">Type:</h5>
      <div class="d-flex justify-content-center">
        <p
          class="text-center btn-dark type-display"
          v-for="(type, i) in pokemondata2.types"
          v-bind:key="i"
        >
          {{ pokemondata2.types[i] && pokemondata2.types[i].type.name }}
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      pokedex: [],
      pokemondata: "",
      pokemondata2: "",
      search_pkmn: "",
    };
  },
  created: async function () {
    let response = await axios.get("https://pokeapi.co/api/v2/pokedex/kanto");
    this.pokedex = response.data.pokemon_entries;
  },
  computed: {
    searchResult: function () {
      let filteredResult = this.pokedex.filter((name) => {
        return name.pokemon_species.name
          .toLowerCase()
          .includes(this.search_pkmn.toLowerCase());
      });
      return filteredResult;
    },
  },
  methods: {
    openPkmnInfo: async function (index) {
      let response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon-species/" + index
      );
      this.pokemondata = response.data;

      let response2 = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + index
      );
      this.pokemondata2 = response2.data;
    },
  },
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
  border: 5px solid white !important;
}

.card-title {
  font-size: 1rem;
  color: black;
  text-align: center;
}

.pokemondata-image {
  width: 400px;
}

.type-display {
  width: 80px;
  padding: 5px;
  margin: 5px;
}

.info-align {
  margin-top: -30px;
}
</style>