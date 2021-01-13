<template>
  <div id="battle-window">
    <div class="top-message-div bg-dark shadow p-2">
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
      <div class="d-flex">
        <p>{{ ally.ActivePkmn.pokemon_name }} (Lv {{ ally.ActivePkmn.lvl }})</p>
      </div>
      <div class="hp-display d-flex justify-content-center align-items-center">
        HP<b-progress
          :value="ally.PkmnHP"
          :max="ally.ActivePkmn.stats.hp"
          variant="success"
          class="hp-bar ml-1"
        ></b-progress>
      </div>
      <div>{{ ally.PkmnHP }}/{{ ally.ActivePkmn.stats.hp }}</div>
    </div>

    <!-- foe setup -->
    <div v-if="showStat == true" class="shadow foe-stat-window ml-3">
      <div>
        <p>{{ foe.ActivePkmnName }} (Lv 1)</p>
      </div>
      <div class="hp-display d-flex justify-content-center align-items-center">
        HP<b-progress
          :value="foe.PkmnHP"
          :max="foe.ActivePkmn.stats[0].base_stat"
          variant="success"
          class="hp-bar ml-1"
        ></b-progress>
      </div>
      <div>{{ foe.PkmnHP }}/{{ foe.ActivePkmn.stats[0].base_stat }}</div>
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
        availablePkmn: 0,
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
      allyTurn: () => {},
      foeTurn: () => {},
      battleState: "",
      battleMessage: "",
      showStat: false,
    };
  },
  components: {
    SelectButtons,
  },
  created: async function () {
    this.battleState = "battle_start";
    this.ally.availablePkmn = this.$store.state.userData.party_pokemon.length;
  },
  methods: {
    selectMove() {
      this.battleState = "p1_moves";
    },
    moveSelect(moves) {
      this.ally.SelMove = moves.move;
      let dmgCalc =
        parseInt(this.ally.ActivePkmn.stats.atk) *
          3.5 *
          (parseInt(moves.power) / 100) +
        Math.floor(Math.random() * 3) -
        parseInt(this.foe.ActivePkmn.stats[2].base_stat * 0.6);

      if (dmgCalc <= 0) {
        this.ally.Dmg = 1;
      } else {
        this.ally.Dmg = parseInt(dmgCalc);
      }
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
    battleState: async function () {
      // SETUP POKEMON
      if (this.battleState == "battle_start") {
        // ally pokemon
        this.ally.ActivePkmn = this.$store.state.userData.party_pokemon[0];

        // foe pokemon
        let randomEnemyID = Math.floor(Math.random() * 150) + 1;
        let response2 = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/" + randomEnemyID
        );

        this.foe.ActivePkmn = response2.data;
        this.foe.ActivePkmnName =
          this.foe.ActivePkmn.name.charAt(0).toUpperCase() +
          this.foe.ActivePkmn.name.slice(1);
        this.battleMessage = `Encountered ${this.foe.ActivePkmnName}!`;

        let response = await axios.get(
          "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/movesets"
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

        setTimeout(() => (this.battleState = "p1_select"), 3000);
      }

      //   P1 SELECT ACTION
      if (this.battleState == "p1_select") {
        this.showStat = true;
        this.battleMessage = "What will you like to do?";
      }

      //   P1 SELECT MOVES
      if (this.battleState == "p1_moves") {
        this.battleMessage = "Which move will you like to use?";
      }

      // BOT SELECTS MOVES
      if (this.battleState == "p2_moves") {
        this.battleMessage = "Await opponent selection...";
        let moveID = Math.floor(Math.random() * 3);
        this.foe.SelMove = this.foe.ActivePkmnMove[moveID].move;

        let dmgCalc =
          parseInt(this.foe.ActivePkmn.stats[1].base_stat) *
            3.5 *
            (parseInt(this.foe.ActivePkmnMove[moveID].power) / 100) +
          Math.floor(Math.random() * 3) -
          parseInt(this.ally.ActivePkmn.stats.def * 0.6);
        if (dmgCalc <= 0) {
          this.foe.Dmg = 1;
        } else {
          this.foe.Dmg = parseInt(dmgCalc);
        }

        setTimeout(() => (this.battleState = "battle_phase"), 1000);
      }

      // BATTLE PHASE, EXCHANGE BLOWS DEPENDING ON WHO IS FASTER
      if (this.battleState == "battle_phase") {
        //   ally execution function
        this.allyTurn = () => {
          this.battleMessage = `${this.ally.ActivePkmn.pokemon_name} uses ${this.ally.SelMove}!
        ${this.foe.ActivePkmnName} took ${this.ally.Dmg} damage!`;
          if (this.ally.Dmg <= this.foe.PkmnHP) {
            this.foe.PkmnHP = this.foe.PkmnHP - this.ally.Dmg;
          } else {
            this.foe.PkmnHP = 0;
          }
        };

        // foe execution function
        this.foeTurn = () => {
          this.battleMessage = `${this.foe.ActivePkmnName} uses ${this.foe.SelMove}!
        ${this.ally.ActivePkmn.pokemon_name} took ${this.foe.Dmg} damage!`;
          if (this.foe.Dmg <= this.ally.PkmnHP) {
            this.ally.PkmnHP = this.ally.PkmnHP - this.foe.Dmg;
          } else {
            this.ally.PkmnHP = 0;
          }
        };

        const checkAllyHP = () => {
          if (this.ally.PkmnHP > 0) {
            setTimeout(() => (this.battleState = "p1_select"), 3000);
          } else {
            this.ally.availablePkmn -= 1;
            if (this.ally.availablePkmn <= 0) {
              setTimeout(() => (this.battleState = "battle_end"), 3000);
            }
          }
        };

        const checkFoeHP = () => {
          if (this.foe.PkmnHP > 0) {
            setTimeout(() => (this.battleState = "p1_select"), 3000);
          } else {
            setTimeout(() => (this.battleState = "battle_end"), 3000);
          }
        };

        // battle phase execution
        if (
          parseInt(this.ally.ActivePkmn.stats.speed) >=
          parseInt(this.foe.ActivePkmn.stats[5].base_stat)
        ) {
          this.allyTurn();
          if (this.foe.PkmnHP > 0) {
            setTimeout(() => this.foeTurn(), 3000);

            setTimeout(() => checkAllyHP(), 3300);
          } else {
            setTimeout(() => (this.battleState = "battle_end"), 3000);
          }
        } else {
          this.foeTurn();
          if (this.ally.PkmnHP > 0) {
            setTimeout(() => this.allyTurn(), 3000);

            setTimeout(() => checkFoeHP(), 3300);
          } else {
            this.ally.availablePkmn -= 1;
            if (this.ally.availablePkmn <= 0) {
              setTimeout(() => (this.battleState = "battle_end"), 3000);
            }
          }
        }
      }

      // BATTLE END IF ANY POKEMON HP REACHES 0
      if (this.battleState == "battle_end") {
        this.showStat = false;
        this.battleState = "";

        if (this.ally.PkmnHP <= 0) {
          if (this.$store.state.userData.pokedollar > 1000) {
            this.$store.state.userData.pokedollar -= 1000;
          } else {
            this.$store.state.userData.pokedollar = 0;
          }
          await axios.patch(
            "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/userdata/" +
              this.$store.state.username,
            this.$store.state.userData
          );
          this.battleMessage =
            "You have lost the battle... Lost 1000 Pokédollar!";
          setTimeout(() => (this.$store.state.gameState = "game_menu"), 3000);
        } else {
          this.battleMessage =
            "You have won the battle! Obtained 500 Pokédollar and a Rare Candy!";
          this.$store.state.userData.pokedollar += 500;

          let checkRC = this.$store.state.userData.bag.find(
            (rc) => rc.item_id === 50
          );

          if (checkRC == undefined) {
            let rarecandy = {
              item_name: "Rare Candy",
              item_count: 1,
              item_id: 50,
            };
            this.$store.state.userData.bag.push(rarecandy);

            await axios.patch(
              "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/userdata/" +
                this.$store.state.username,
              this.$store.state.userData
            );
          } else {
            let rcID = this.$store.state.userData.bag.findIndex(
              (rc) => rc.item_id === 50
            );
            this.$store.state.userData.bag[rcID].item_count += 1;

            await axios.patch(
              "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/userdata/" +
                this.$store.state.username,
              this.$store.state.userData
            );
          }
          setTimeout(() => (this.$store.state.gameState = "game_menu"), 4000);
        }
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

.hp-display {
  width: 75%;
  background-color: black;
  color: white;
  border-radius: 5px;
}

.hp-bar {
  width: 85%;
}
</style>