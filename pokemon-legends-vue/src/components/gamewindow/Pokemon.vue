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
        <SelectButtons message="Use R.Candy" @click.native="useRareCandy" />
        <SelectButtons message="Switch" @click.native="switchPosition" />
        <SelectButtons message="Release" @click.native="releasePokemon" />
      </div>
    </div>

    <!-- Pokemon info window -->
    <div
      id="pokemon-info"
      class="d-flex flex-column justify-content-center align-items-center rounded-right shadow border border-dark border-left-0"
    >
      <div
        style="width: 95%; height: 100%"
        class="d-flex flex-column justify-content-between align-items-center"
      >
        <!-- pokemon info title -->
        <div class="d-flex justify-content-center align-items-center mt-3">
          <h3>Pokémon Info</h3>
        </div>
        <!-- pokemon name and type -->
        <div>
          <h4>{{ pokemonData.pokemon_name }}</h4>
          <div class="d-flex justify-content-center align-items-center">
            <span
              v-for="(type, i) in pokemonData.types"
              v-bind:key="i"
              class="text-center btn-dark type-display"
              >{{ type }}</span
            >
          </div>
        </div>
        <!-- Div for stats and image -->
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
        <!-- display moves -->
        <div
          style="height: 20%; width: 100%"
          class="d-flex justify-content-around align-items-center mb-3"
        >
          <div
            class="d-flex flex-column justify-content-around align-items-center"
            style="width: 48%"
          >
            <!-- move 1 -->
            <div
              v-if="showMove0 == false"
              class="btn-dark move-info"
              @click="toggleMove0(pokemonMoves[0])"
            >
              {{ pokemonMoves && pokemonMoves[0].move }}
            </div>
            <div
              v-else
              class="btn-dark move-info d-flex flex-column"
              @click="toggleMove0(pokemonMoves[0])"
            >
              <span>Power: {{ pokemonMoves && pokemonMoves[0].power }}</span>
              <span>Type: {{ pokemonMoves && pokemonMoves[0].type }}</span>
            </div>
            <!-- move 2 -->
            <div
              v-if="showMove1 == false"
              class="btn-dark move-info"
              @click="toggleMove1(pokemonMoves[1])"
            >
              {{ pokemonMoves && pokemonMoves[1].move }}
            </div>
            <div
              v-else
              class="btn-dark move-info d-flex flex-column"
              @click="toggleMove1(pokemonMoves[1])"
            >
              <span>Power: {{ pokemonMoves && pokemonMoves[1].power }}</span>
              <span>Type: {{ pokemonMoves && pokemonMoves[1].type }}</span>
            </div>
          </div>
          <div
            class="d-flex flex-column justify-content-around align-items-center"
            style="width: 48%"
          >
            <!-- move 3 -->
            <div
              v-if="showMove2 == false"
              class="btn-dark move-info"
              @click="toggleMove2(pokemonMoves[2])"
            >
              {{ pokemonMoves && pokemonMoves[2].move }}
            </div>
            <div
              v-else
              class="btn-dark move-info d-flex flex-column"
              @click="toggleMove2(pokemonMoves[2])"
            >
              <span>Power: {{ pokemonMoves && pokemonMoves[2].power }}</span>
              <span>Type: {{ pokemonMoves && pokemonMoves[2].type }}</span>
            </div>
            <!-- move 4 -->
            <div
              v-if="showMove3 == false"
              class="btn-dark move-info"
              @click="toggleMove3(pokemonMoves[3])"
            >
              {{ pokemonMoves && pokemonMoves[3].move }}
            </div>
            <div
              v-else
              class="btn-dark move-info d-flex flex-column"
              @click="toggleMove3(pokemonMoves[3])"
            >
              <span>Power: {{ pokemonMoves && pokemonMoves[3].power }}</span>
              <span>Type: {{ pokemonMoves && pokemonMoves[3].type }}</span>
            </div>
          </div>
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
import axios from "axios";
import SelectButtons from "./SelectButtons";
export default {
  data: function () {
    return {
      pokemonData: this.$store.state.userData.party_pokemon[0],
      pokemonMoves: [],
      showMove0: false,
      showMove1: false,
      showMove2: false,
      showMove3: false,
    };
  },
  components: {
    SelectButtons,
  },
  created: async function () {
    let response = await axios.get(
      "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/movesets"
    );
    let pkmnmove = response.data;

    let pkmnmoveset = pkmnmove.find(
      (pm) => pm.pokemon_id == this.pokemonData.pokemon_id
    );
    if (pkmnmoveset !== undefined) {
      this.pokemonMoves = pkmnmoveset.moveset;
    } else {
      let pkmnmoveset = pkmnmove.find((pm) => pm.pokemon_id == 0);
      this.pokemonMoves = pkmnmoveset.moveset;
    }

    console.log(this.pokemonMoves);
  },
  methods: {
    displayPkmnInfo: async function (pokemon) {
      this.pokemonData = pokemon;
      let response = await axios.get(
        "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/movesets"
      );
      let pkmnmove = response.data;

      let pkmnmoveset = pkmnmove.find(
        (pm) => pm.pokemon_id == this.pokemonData.pokemon_id
      );
      if (pkmnmoveset !== undefined) {
        this.pokemonMoves = pkmnmoveset.moveset;
      } else {
        let pkmnmoveset = pkmnmove.find((pm) => pm.pokemon_id == 0);
        this.pokemonMoves = pkmnmoveset.moveset;
      }

      this.showMove0 = false;
      this.showMove1 = false;
      this.showMove2 = false;
      this.showMove3 = false;
    },
    toggleMove0() {
      this.showMove0 == false
        ? (this.showMove0 = true)
        : (this.showMove0 = false);
    },
    toggleMove1() {
      this.showMove1 == false
        ? (this.showMove1 = true)
        : (this.showMove1 = false);
    },
    toggleMove2() {
      this.showMove2 == false
        ? (this.showMove2 = true)
        : (this.showMove2 = false);
    },
    toggleMove3() {
      this.showMove3 == false
        ? (this.showMove3 = true)
        : (this.showMove3 = false);
    },
    useRareCandy() {
      console.log(this.pokemonData);
    },
    releasePokemon() {
      alert("Coming soon...");
    },
    switchPosition() {
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

.btn-design {
  height: 60px;
  width: 30% !important;
}

#pokemon-info {
  width: 48%;
  height: 90%;
  background-color: rgba(252, 252, 252, 0.8);
  color: black;
}

.type-display {
  width: 120px;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
}

.move-info {
  margin: 5px;
  padding: 10px;
  height: 50px;
  width: 100%;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: black solid 2px;
}

.move-info:hover {
  border: red solid 2px;
  cursor: pointer;
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