<template>
  <div id="battle-window">
    <div class="top-message-div bg-dark shadow">
      {{ battleMessage }}
    </div>

    <!-- ally setup -->
    <div class="ally-bar d-flex align-items-center justify-content-between">
      <img
        class="ally-pokemon-portrait"
        v-bind:src="
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/' +
          allyActivePkmn.pokemon_id +
          '.png'
        "
      />
      <!-- gif -->
      <!-- <img
        class="ally-pokemon-portrait"
        v-bind:src="
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/' +
          allyActivePkmn.pokemon_id +
          '.gif'
        "
      /> -->
      <div class="shadow ally-stat-window mr-3">
        <div>{{ allyActivePkmn.pokemon_name }}</div>
        <div>HP: {{ allyPkmnHP }}/{{ allyActivePkmn.stats.hp }}</div>
      </div>
    </div>

    <!-- foe setup -->
    <div class="foe-bar d-flex align-items-center justify-content-between">
      <div class="shadow foe-stat-window ml-3">
        <div>
          {{
            foeActivePkmnName.charAt(0).toUpperCase() +
            foeActivePkmnName.slice(1)
          }}
        </div>
        <div>HP: {{ foePkmnHP }}/{{ foeActivePkmn.stats[0].base_stat }}</div>
      </div>
      <img
        class="foe-pokemon-portrait"
        v-bind:src="foeActivePkmn && foeActivePkmn.sprites.front_default"
      />
    </div>

    <!-- select action -->
    <div v-if="battleState == 'p1_select'" class="buttons-div">
      <SelectButtons message="Fight" @click.native="selectMove" />
      <SelectButtons message="Pokémon" @click.native="comingSoon" />
      <SelectButtons message="Bag" @click.native="comingSoon" />
      <SelectButtons message="Run" @click.native="runFromBattle" />
    </div>

    <!-- select move -->
    <div v-if="battleState == 'p1_moves'" class="buttons-div">
      <SelectButtons
        v-if="allyPkmnMP < 10"
        :message="allyActivePkmnMove[0] && allyActivePkmnMove[0].attack"
      />
      <SelectButtons
        v-else
        :message="allyActivePkmnMove[3] && allyActivePkmnMove[3].attack"
      />
      <SelectButtons
        :message="allyActivePkmnMove[1] && allyActivePkmnMove[1].move1"
      />
      <SelectButtons
        :message="allyActivePkmnMove[2] && allyActivePkmnMove[2].move2"
      />
      <SelectButtons message="Back" @click.native="backFunction" />
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
      allyPkmnHP: 0,
      allyPkmnMP: 0,
      foeActivePkmn: "",
      foeActivePkmnName: "",
      foePkmnHP: 0,
      foePkmnMP: 0,
      battleState: "",
      battleMessage: "",
    };
  },
  components: {
    SelectButtons,
  },
  //   created: function () {
  //   },
  created: async function () {
    this.battleState = "battle_start";
    // ally pokemon
    this.allyActivePkmn = this.$store.state.userData.party_pokemon[0];

    // foe pokemon
    let randomEnemyID = Math.floor(Math.random() * 150) + 1;
    let response2 = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + randomEnemyID
    );

    this.foeActivePkmn = response2.data;
    this.foeActivePkmnName = this.foeActivePkmn.name;
    this.battleMessage = `Encountered ${
      this.foeActivePkmnName.charAt(0).toUpperCase() +
      this.foeActivePkmnName.slice(1)
    }!`;

    this.foePkmnHP = this.foeActivePkmn.stats[0].base_stat;
    this.foePkmnMP = 0;

    setTimeout(() => (this.battleState = "p1_select"), 3000);

    // ally pokemon move
    let response = await axios.get(
      "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/movesets"
    );
    let pkmnmove = response.data;
    let pkmnmoveset = pkmnmove.find(
      (pm) => pm.pokemon_id == this.allyActivePkmn.pokemon_id
    );
    if (pkmnmoveset !== undefined) {
      this.allyActivePkmnMove = pkmnmoveset.moveset;
    } else {
      let pkmnmoveset = pkmnmove.find((pm) => pm.pokemon_id == 0);
      this.allyActivePkmnMove = pkmnmoveset.moveset;
    }
    this.allyPkmnHP = this.allyActivePkmn.stats.hp;
    this.allyPkmnMP = 0;
  },
  methods: {
    runFromBattle() {
      this.battleState = "";
      this.battleMessage = "Got away safely!";
      setTimeout(() => (this.$store.state.gameState = "game_menu"), 2000);
    },
    selectMove() {
      this.battleState = "p1_moves";
    },
    backFunction() {
      this.battleState = "p1_select";
    },
    comingSoon() {
      alert("Coming Soon!");
    },
  },
  watch: {
    battleState: function () {
      if (this.battleState == "p1_select") {
        this.battleMessage = "What will you like to do?";
      }
      if (this.battleState == "p1_moves") {
        this.battleMessage = "Which move will you like to use?";
      }
    },
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

.top-message-div {
  position: absolute !important;
  top: 0;
  width: 100%;
  height: 15%;
  margin: auto;
  border: 3px solid white !important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  border-radius: 7px;
}

.buttons-div {
  position: absolute !important;
  bottom: 1%;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: auto;
}

.ally-bar {
  position: absolute !important;
  bottom: 3%;
  width: 100%;
  height: 45%;
}

.ally-pokemon-portrait {
  height: 100%;
  padding-left: 10%;
}

.ally-stat-window {
  height: 50%;
  width: 40%;
  border: 3px solid black !important;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: black;
  background-color: lightyellow;
}

.foe-bar {
  position: absolute !important;
  bottom: 40%;
  width: 100%;
  height: 45%;
}

.foe-pokemon-portrait {
  height: 100%;
  padding-right: 10%;
}

.foe-stat-window {
  margin-bottom: 5%;
  height: 50%;
  width: 40%;
  border: 3px solid black !important;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: black;
  background-color: lightyellow;
}
</style>