<template>
  <div>
    <div v-if="introduction === false" id="introduction">
      <img
        class="profoak"
        src="https://cdn.bulbagarden.net/upload/thumb/3/3e/Lets_Go_Pikachu_Eevee_Professor_Oak.png/180px-Lets_Go_Pikachu_Eevee_Professor_Oak.png"
      />
      <div class="intro-div bg-dark shadow p-4" @click="scrollText">
        {{ introText }}
      </div>
    </div>
    <div
      v-else
      id="starter-select"
      class="d-flex flex-column align-items-center justify-content-center p-5"
    >
      <div>
        <h3>Select Your Starter</h3>
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
            width: 25%;
            position: relative;
            background-color: rgba(52, 58, 64, 0);
          "
          class="mt-3"
        >
          <b-button variant="success" @click="selectStarter(starter.pokemonID)"
            >Select</b-button
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
      starters: [
        { name: "Bulbasaur", pokemonID: 1 },
        { name: "Charmander", pokemonID: 4 },
        { name: "Squirtle", pokemonID: 7 },
      ],
      introduction: false,
      introText: "Hello there! Welcome to the world of Pokémon!",
      introTextID: 0,
    };
  },
  created: function () {
    this.introTextID = 0;
    console.log(this.introTextID, this.introText);
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
        spatk: pokemondata.stats[3].base_stat,
        spdef: pokemondata.stats[4].base_stat,
        speed: pokemondata.stats[5].base_stat,
      };

      let newPokedexEntry = {
        pokemon_id: 0,
        pokemon_name: "",
      };

      newPokedexEntry.pokemon_id = parseInt(pokemondata.id);
      newPokedexEntry.pokemon_name =
        pokemondata.name.charAt(0).toUpperCase() + pokemondata.name.slice(1);

      this.$store.state.userData.party_pokemon.push(newPokemon);
      this.$store.state.userData.pokedex.push(newPokedexEntry);
      this.$store.state.userData.tutorial += 1;

      await axios.patch(
        "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/userdata/" +
          this.$store.state.username,
        this.$store.state.userData
      );
    },
    scrollText() {
      this.introTextID += 1;
    },
  },
  watch: {
    introTextID: function () {
      666;
      if (this.introTextID == 0) {
        this.introText =
          "Hello, there! Glad to meet you! Welcome to the world of Pokémon! My name is Oak.";
      }
      if (this.introTextID == 1) {
        this.introText =
          "People affectionately refer to me as the Pokémon Professor.";
      }
      if (this.introTextID == 2) {
        this.introText =
          "This world is inhabited far and wide by creatures called Pokémon!";
      }
      if (this.introTextID == 3) {
        this.introText =
          "For some people, Pokémon are pets. Others use them for battling.";
      }
      if (this.introTextID == 4) {
        this.introText = "As for myself… I study Pokémon as a profession.";
      }
      if (this.introTextID == 5) {
        this.introText =
          this.$store.state.userData.username +
          ", your very own Pokémon legend is about to unfold!";
      }
      if (this.introTextID == 6) {
        this.introText =
          "A world of dreams and adventures with Pokémon awaits! Let's go!";
      }
      if (this.introTextID == 7) {
        this.introduction = true;
      }
    },
  },
};
</script>

<style scoped>
#introduction {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-image: url("https://i.imgur.com/rXOvd61.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.profoak {
  position: absolute;
  bottom: 0;
  height: 90%;
}

.intro-div {
  position: absolute !important;
  bottom: 0;
  width: 100%;
  height: 22%;
  margin: auto;
  border: 3px solid white !important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  border-radius: 7px;
}

#starter-select {
  width: 100%;
  background-color: rgba(52, 58, 64, 0.9);
  color: white;
}

.card-title {
  font-size: 1.2rem;
  text-align: center;
}
</style>