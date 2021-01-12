<template>
  <div id="battle-window">
    <div class="top-message-div bg-dark shadow p-1">
      {{ battleMessage }}
    </div>

    <!-- ally setup -->
    <img
      class="ally-pokemon-portrait"
      v-bind:src="
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/' +
        ally.ActivePkmn.pokemon_id +
        '.png'
      "
    />
    <!-- gif -->
    <!-- <img
        class="ally-pokemon-portrait"
        v-bind:src="
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/' +
          ally.ActivePkmn.pokemon_id +
          '.gif'
        "
      /> -->
    <div v-if="showStat == true" class="shadow ally-stat-window mr-3">
      <div>{{ ally.ActivePkmn.pokemon_name }}</div>
      <div>HP: {{ ally.PkmnHP }}/{{ ally.ActivePkmn.stats.hp }}</div>
    </div>

    <!-- foe setup -->
    <div v-if="showStat == true" class="shadow foe-stat-window ml-3">
      <div>
        {{
          foe.ActivePkmnName.charAt(0).toUpperCase() +
          foe.ActivePkmnName.slice(1)
        }}
      </div>
      <div>HP: {{ foe.PkmnHP }}/{{ foe.ActivePkmn.stats[0].base_stat }}</div>
    </div>
    <img
      class="foe-pokemon-portrait"
      v-bind:src="foe.ActivePkmn && foe.ActivePkmn.sprites.front_default"
    />

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
        v-if="ally.PkmnMP < 10"
        :message="ally.ActivePkmnMove[0] && ally.ActivePkmnMove[0].move"
        @click.native="moveSelect(ally.ActivePkmnMove[0])"
      />
      <SelectButtons
        v-else
        :message="ally.ActivePkmnMove[3] && ally.ActivePkmnMove[3].move"
        @click.native="moveSelect(ally.ActivePkmnMove[3])"
      />
      <SelectButtons
        :message="ally.ActivePkmnMove[1] && ally.ActivePkmnMove[1].move"
        @click.native="moveSelect(ally.ActivePkmnMove[1])"
      />
      <SelectButtons
        :message="ally.ActivePkmnMove[2] && ally.ActivePkmnMove[2].move"
        @click.native="moveSelect(ally.ActivePkmnMove[2])"
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
      ally: {
        ActivePkmn: "",
        ActivePkmnMove: [],
        PkmnHP: 0,
        PkmnMP: 0,
        SelMove: "",
        Dmg: 0,
      },
      foe: {
        ActivePkmnName: "",
        ActivePkmn: "",
        ActivePkmnMove: [],
        PkmnHP: 0,
        PkmnMP: 0,
        SelMove: "",
        Dmg: 0,
      },
      battleState: "",
      battleMessage: "",
      showStat: false,
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
    this.ally.ActivePkmn = this.$store.state.userData.party_pokemon[0];

    // foe pokemon
    let randomEnemyID = Math.floor(Math.random() * 150) + 1;
    let response2 = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + randomEnemyID
    );

    this.foe.ActivePkmn = response2.data;
    this.foe.ActivePkmnName = this.foe.ActivePkmn.name;
    this.battleMessage = `Encountered ${
      this.foe.ActivePkmnName.charAt(0).toUpperCase() +
      this.foe.ActivePkmnName.slice(1)
    }!`;

    let response = await axios.get(
      "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/movesets"
    );
    let pkmnmove = response.data;
    // foe pokemon move
    let foepkmnmoveset = pkmnmove.find(
      (pm) => pm.pokemon_id == this.foe.ActivePkmn.id
    );
    if (foepkmnmoveset !== undefined) {
      this.foe.ActivePkmnMove = foepkmnmoveset.moveset;
    } else {
      let foepkmnmoveset = pkmnmove.find((pm) => pm.pokemon_id == 0);
      this.foe.ActivePkmnMove = foepkmnmoveset.moveset;
    }

    this.foe.PkmnHP = this.foe.ActivePkmn.stats[0].base_stat;
    this.foe.PkmnMP = 0;

    setTimeout(() => (this.battleState = "p1_select"), 3000);

    // ally pokemon move
    let pkmnmoveset = pkmnmove.find(
      (pm) => pm.pokemon_id == this.ally.ActivePkmn.pokemon_id
    );
    if (pkmnmoveset !== undefined) {
      this.ally.ActivePkmnMove = pkmnmoveset.moveset;
    } else {
      let pkmnmoveset = pkmnmove.find((pm) => pm.pokemon_id == 0);
      this.ally.ActivePkmnMove = pkmnmoveset.moveset;
    }
    this.ally.PkmnHP = this.ally.ActivePkmn.stats.hp;
    this.ally.PkmnMP = 0;
  },
  methods: {
    selectMove() {
      this.battleState = "p1_moves";
    },
    moveSelect(moves) {
      this.ally.SelMove = moves.move;
      let dmgCalc =
        parseInt(this.ally.ActivePkmn.stats.atk) *
          1.5 *
          (parseInt(moves.power) / 100) +
        Math.floor(Math.random() * 3);
      this.ally.Dmg = parseInt(dmgCalc);
      this.battleState = "p2_moves";
    },
    backFunction() {
      this.battleState = "p1_select";
    },
    runFromBattle() {
      this.showStat = false;
      this.battleState = "";
      this.battleMessage = "Got away safely!";
      setTimeout(() => (this.$store.state.gameState = "game_menu"), 2000);
    },
    comingSoon() {
      alert("Coming Soon!");
    },
  },
  watch: {
    battleState: function () {
      if (this.battleState == "p1_select") {
        this.showStat = true;
        this.battleMessage = "What will you like to do?";
      }
      if (this.battleState == "p1_moves") {
        this.battleMessage = "Which move will you like to use?";
      }
      if (this.battleState == "p2_moves") {
        this.battleMessage = "Await opponent selection...";
        let moveID = Math.floor(Math.random() * 2);
        this.foe.SelMove = this.foe.ActivePkmnMove[moveID];
        // this.battleState = "battle_phase";
        setTimeout(
          () => (this.battleState = "battle_phase"),
          2000
        );
      }
    //   if (this.battleState == "battle_phase") {
    //   }
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

.ally-pokemon-portrait {
  position: absolute !important;
  height: 40%;
  left: 15%;
  bottom: 5%;
}

.ally-stat-window {
  position: absolute !important;
  right: 0;
  bottom: 15%;
  height: 20%;
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

.foe-pokemon-portrait {
  position: absolute !important;
  right: 10%;
  height: 40%;
  bottom: 35%;
}

.foe-stat-window {
  position: absolute !important;
  left: 0;
  bottom: 62%;
  height: 20%;
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