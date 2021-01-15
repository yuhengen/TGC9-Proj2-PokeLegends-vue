<template>
  <div
    id="pokemon-display"
    class="d-flex justify-content-center align-items-center"
  >
    <div
      id="pokemon-list"
      class="d-flex flex-column flex-wrap justify-content-between align-items-center rounded-left shadow border border-dark border-right-0"
    >
      <!-- header -->
      <div
        class="d-flex flex-column justify-content-center align-items-center mt-3"
      >
        <h4>Party Pokémon</h4>
      </div>
      <!-- list of pokemon -->
        <div
          v-for="(pokemon, i) in $store.state.userData.party_pokemon"
          :key="i"
          class="pokemon-bar d-flex align-items-center justify-content-around shadow mt-1 mb-1"
          @click="displayPkmnInfo(pokemon)"
        >
          <img
            style="height: 80%"
            :src="
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' +
              pokemon.pokemon_id +
              '.gif'
            "
          />
          <span>Lv.{{ pokemon.lvl }} {{ pokemon.pokemon_name }}</span>
        </div>
      <!-- buttons -->
      <div
        class="d-flex justify-content-around align-items-center mb-3"
        style="width: 100%"
      >
        <SelectButtons message="Use Rare Candy" @click.native="useRareCandy" />
        <SelectButtons message="Release" @click.native="releasePokemon" />
      </div>
    </div>

    <div
      id="pokemon-info"
      class="d-flex flex-column justify-content-center align-items-center rounded-right shadow border border-dark border-left-0"
    >
      <div
        style="width: 90%"
        class="d-flex flex-column justify-content-center align-items-center"
      >
        <div>
          <h4>{{ pokemonData.pokemon_name }}</h4>
        </div>
        <div class="mb-3 mt-1">
          <span
            v-for="(type, i) in pokemonData.types"
            v-bind:key="i"
            class="text-center btn-dark type-display"
            >{{ type }}</span
          >
        </div>
        <div
          class="d-flex align-items-center justify-content-center mb-2 mt-2"
          style="height: 40%; width: 100%; text-align: center"
        >
          <table class="table">
            <tr>
              <th scope="row">Lvl</th>
              <td>{{ pokemonData.lvl }}</td>
            </tr>
            <tr>
              <th scope="row">HP</th>
              <td>{{ pokemonData.stats.hp }}</td>
            </tr>
            <tr>
              <th scope="col">ATK</th>
              <td>{{ pokemonData.stats.atk }}</td>
            </tr>
            <tr>
              <th scope="col">DEF</th>
              <td>{{ pokemonData.stats.def }}</td>
            </tr>
            <tr>
              <th scope="col">SPD</th>
              <td>{{ pokemonData.stats.speed }}</td>
            </tr>
          </table>
          <img
            style="height: 80%"
            :src="
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
              pokemonData.pokemon_id +
              '.png'
            "
          />
        </div>
      </div>
    </div>

    <img
      src="https://image.flaticon.com/icons/png/512/458/458594.png"
      @click="closePokedex"
      class="cancelBtn"
    />
  </div>
</template>

<script>
import SelectButtons from "./SelectButtons";
export default {
  data: function () {
    return {
      pokemonData: this.$store.state.userData.party_pokemon[0],
    };
  },
  components: {
    SelectButtons,
  },
  methods: {
    displayPkmnInfo(pokemon) {
      this.pokemonData = pokemon;
    },
    useRareCandy() {
      console.log(this.pokemonData);
    },
    releasePokemon() {
      alert("Coming soon...");
    },
    closePokedex: function () {
      this.$store.state.gameState = "game_menu";
    },
  },
};
</script>

<style scoped>
#pokemon-display {
  background-image: url("https://i.ytimg.com/vi/jpWxbo-vbT0/maxresdefault.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
}

#pokemon-list {
  width: 48%;
  height: 90%;
  background-color: rgba(52, 58, 64, 0.9);
}

.pokemon-bar {
  width: 80%;
  height: 15%;
  background-color: lightblue;
  color: black;
  border-radius: 10px;
  border: 3px black solid;
}

.pokemon-bar:hover {
  border: 3px white solid;
}

#pokemon-info {
  width: 48%;
  height: 90%;
  background-color: rgba(252, 252, 252, 0.8);
  color: black;
}

.type-display {
  width: 80px;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
}

.btn-design {
  height: 60px;
  width: 40% !important;
}

.cancelBtn {
  position: absolute;
  top: 1%;
  right: 1%;
  height: 10%;
}

.cancelBtn:hover {
  cursor: pointer;
}
</style>