<template>
  <div id="gym-battle-window">
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
        <p>{{ foe.ActivePkmnName }} (Lv {{ foe.ActivePkmn.lvl }})</p>
      </div>
      <div class="hp-display d-flex justify-content-center align-items-center">
        HP<b-progress
          :value="foe.PkmnHP"
          :max="foe.hp"
          variant="success"
          class="hp-bar ml-1"
        ></b-progress>
      </div>
      <div>{{ foe.PkmnHP }}/{{ foe.hp }}</div>
    </div>
    <img
      v-if="gymleaderPortrait == true"
      class="gymleader-portrait"
      v-bind:src="$store.state.gymLeader && $store.state.gymLeader.imageUrl"
    />
    <img
      v-else
      class="foe-pokemon-portrait"
      v-bind:src="
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
        foe.ActivePkmn.pokemon_id +
        '.png'
      "
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
        gymLeader: {},
        ActivePkmnName: "",
        ActivePkmn: "",
        PkmnLvl: 1,
        ActivePkmnMove: [],
        PkmnHP: 0,
        PkmnMP: 0,
        atk: 0,
        def: 0,
        spatk: 0,
        spdef: 0,
        speed: 0,
        SelMove: "",
        Dmg: 0,
        availablePkmn: 0,
      },
      allyTurn: () => {},
      foeTurn: () => {},
      gymleaderPortrait: true,
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
    this.$store.state.battleType = "gymbattle";
    this.$store.state.inBattle = true;
    this.ally.availablePkmn = this.$store.state.userData.party_pokemon.length;
  },
  methods: {
    selectMove() {
      this.$store.state.selectSFX.play();
      this.battleState = "p1_moves";
    },
    moveSelect(moves) {
      this.$store.state.selectSFX.play();
      this.ally.SelMove = moves.move;
      let dmgCalc =
        (((2 * this.ally.ActivePkmn.lvl) / 5 + 2) *
          parseInt(moves.power * 2) *
          parseInt(this.ally.ActivePkmn.stats.atk)) /
          parseInt(this.foe.def) /
          50 +
        2 +
        Math.floor(Math.random() * 3);

      if (dmgCalc <= 0) {
        this.ally.Dmg = 1;
      } else {
        this.ally.Dmg = parseInt(dmgCalc);
      }
      this.battleState = "p2_moves";
    },
    backFunction() {
      this.$store.state.selectSFX.play();
      this.battleState = "p1_select";
    },
    runFromBattle() {
      this.$store.state.selectSFX.play();
      this.$store.state.bgm.pause();
      let runSFX = new Audio("sfx/run.mp3");
      this.$store.state.bgm = runSFX;
      this.$store.state.bgmName = "runBGM";
      //   this.$store.state.bgm.volume = 0.5;
      this.$store.state.bgm.play();

      this.showStat = false;
      this.battleState = "";
      this.$store.state.battleType = "";
      this.$store.state.inBattle = false;
      this.battleMessage = "Got away safely!";
      setTimeout(() => (this.$store.state.gameState = "game_menu"), 2000);
    },
    comingSoon() {
      this.$store.state.selectSFX.play();
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
        this.foe.availablePkmn = this.$store.state.gymLeader.pokemon_team.length;
        this.foe.ActivePkmn = this.$store.state.gymLeader.pokemon_team[0];
        this.foe.ActivePkmnName = this.foe.ActivePkmn.pokemon_name;
        this.battleMessage = `${this.$store.state.gymLeader.gymleader_name} wants to battle!`;

        setTimeout(
          () =>
            (this.battleMessage = `${this.$store.state.gymLeader.gymleader_name} sends out ${this.foe.ActivePkmn.pokemon_name}!`),
          3000
        );

        let response = await axios.get(
          "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/movesets"
        );
        let pkmnmove = response.data;
        // foe pokemon move
        let foepkmnmoveset = pkmnmove.find(
          (pm) => pm.pokemon_id == this.foe.ActivePkmn.pokemon_id
        );
        if (foepkmnmoveset !== undefined) {
          this.foe.ActivePkmnMove = foepkmnmoveset.moveset;
        } else {
          let foepkmnmoveset = pkmnmove.find((pm) => pm.pokemon_id == 0);
          this.foe.ActivePkmnMove = foepkmnmoveset.moveset;
        }

        let foeleveldiff = this.foe.ActivePkmn.lvl - 1;
        this.foe.hp = this.foe.ActivePkmn.stats.hp + 3 * foeleveldiff;
        this.foe.atk = this.foe.ActivePkmn.stats.atk + 2 * foeleveldiff;
        this.foe.def = this.foe.ActivePkmn.stats.def + 2 * foeleveldiff;
        this.foe.spatk = this.foe.ActivePkmn.stats.spatk + 2 * foeleveldiff;
        this.foe.spdef = this.foe.ActivePkmn.stats.spdef + 2 * foeleveldiff;
        this.foe.speed = this.foe.ActivePkmn.stats.speed + 2 * foeleveldiff;
        this.foe.PkmnHP = this.foe.hp;
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

        setTimeout(() => (this.gymleaderPortrait = false), 5000);

        setTimeout(() => (this.battleState = "p1_select"), 6000);
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
          (((2 * this.foe.ActivePkmn.lvl) / 5 + 2) *
            parseInt(this.foe.ActivePkmnMove[moveID].power * 2) *
            parseInt(this.foe.atk)) /
            parseInt(this.ally.ActivePkmn.stats.def) /
            50 +
          2 +
          Math.floor(Math.random() * 3);
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
          this.$store.state.attackSFX.play();
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
          this.$store.state.attackSFX.play();
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
            setTimeout(
              () =>
                (this.battleMessage = `${this.ally.ActivePkmn.pokemon_name} fainted!`),
              2000
            );
            this.ally.availablePkmn -= 1;
            if (this.ally.availablePkmn <= 0) {
              setTimeout(() => (this.battleState = "battle_end"), 5000);
            }
          }
        };

        const checkFoeHP = () => {
          if (this.foe.PkmnHP > 0) {
            setTimeout(() => (this.battleState = "p1_select"), 3000);
          } else {
            setTimeout(
              () =>
                (this.battleMessage = `${this.foe.ActivePkmnName} fainted!`),
              2000
            );
            setTimeout(() => (this.battleState = "battle_end"), 5000);
          }
        };

        // battle phase execution
        if (
          parseInt(this.ally.ActivePkmn.stats.speed) >= parseInt(this.foe.speed)
        ) {
          this.allyTurn();
          if (this.foe.PkmnHP > 0) {
            setTimeout(() => this.foeTurn(), 3000);

            setTimeout(() => checkAllyHP(), 3300);
          } else {
            setTimeout(
              () =>
                (this.battleMessage = `${this.foe.ActivePkmnName} fainted!`),
              2000
            );
            setTimeout(() => (this.battleState = "battle_end"), 5000);
          }
        } else {
          this.foeTurn();
          if (this.ally.PkmnHP > 0) {
            setTimeout(() => this.allyTurn(), 3000);

            setTimeout(() => checkFoeHP(), 3300);
          } else {
            setTimeout(
              () =>
                (this.battleMessage = `${this.ally.ActivePkmn.pokemon_name} fainted!`),
              2000
            );
            this.ally.availablePkmn -= 1;
            if (this.ally.availablePkmn <= 0) {
              setTimeout(() => (this.battleState = "battle_end"), 5000);
            }
          }
        }
      }

      // BATTLE END IF ANY POKEMON HP REACHES 0
      if (this.battleState == "battle_end") {
        this.showStat = false;
        this.battleState = "";
        this.$store.state.battleType = "";
        this.$store.state.inBattle = false;

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
          this.gymleaderPortrait = true;
          this.battleMessage =
            "Brock: What a close battle! Try harder next time!";
          setTimeout(
            () =>
              (this.battleMessage =
                "You have lost the battle... Lost 1000 Pokédollar!"),
            3000
          );
          setTimeout(() => (this.$store.state.gameState = "game_menu"), 6000);
        } else {
          this.gymleaderPortrait = true;
          this.battleMessage = "Brock: No freakin way!";
          setTimeout(
            () =>
              (this.battleMessage =
                "You won the battle! Obtained 1500 Pokédollar and 2 Rare Candy!"),
            3000
          );

          this.$store.state.userData.pokedollar += 1500;

          let checkRC = this.$store.state.userData.bag.find(
            (rc) => rc.item_id === 50
          );

          if (checkRC == undefined) {
            let rarecandy = {
              item_name: "Rare Candy",
              item_count: 2,
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
            this.$store.state.userData.bag[rcID].item_count += 2;

            await axios.patch(
              "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/userdata/" +
                this.$store.state.username,
              this.$store.state.userData
            );
          }
          setTimeout(() => (this.$store.state.gameState = "game_menu"), 6000);
        }
      }
    },
  },
};
</script>

<style scoped>
#gym-battle-window {
  background-image: url("https://tinyurl.com/gym-battle-bg");
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

.gymleader-portrait {
  position: absolute !important;
  right: 20%;
  height: 45%;
  bottom: 35%;
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

@media only screen and (max-height: 414px) {
  .top-message-div {
    font-size: 0.7rem;
  }
  .buttons-div {
    height: 20%;
  }

  .ally-stat-window {
    bottom: 23%;
  }

  .foe-stat-window {
    bottom: 60%;
  }

  .ally-stat-window,
  .foe-stat-window {
    font-size: 0.9rem;
    height: 23%;
  }

  .ally-pokemon-portrait {
    bottom: 15%;
  }

  .foe-pokemon-portrait {
    bottom: 42%;
  }
  .hp-bar {
    width: 80%;
  }
}
</style>