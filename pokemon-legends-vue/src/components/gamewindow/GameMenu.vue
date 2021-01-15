<template>
  <div id="game-menu">
    <div
      v-if="$store.state.userData.tutorial == 0"
      style="height: 100%; width: 100%"
      class="d-flex align-items-center justify-content-center"
    >
      <Tutorial />
    </div>
    <div v-else>
      <!-- User info window -->
      <img
        v-if="!toggleInfo"
        src="https://i.pinimg.com/originals/50/e1/db/50e1db4684e6f697f93590950eb832f6.png"
        class="user-info-icon"
        @click="toggleInfoWin"
      />
      <img
        v-else
        src="https://icon-library.com/images/pokeball-icon-png/pokeball-icon-png-2.jpg"
        class="user-info-icon"
        @click="toggleInfoWin"
      />
      <div v-if="!toggleInfo"></div>
      <div
        v-else
        id="user-info"
        class="d-flex flex-column justify-content-around pl-5 pr-5 pt-2 shadow"
      >
        <h3>User Info</h3>
        <div class="d-flex justify-content-between">
          <h5>Name:</h5>
          <h5>{{ $store.state.userData.username }}</h5>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Pokédollar:</h5>
          <h5>{{ $store.state.userData.pokedollar }}</h5>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Pokédex:</h5>
          <h5>
            {{
              $store.state.userData.pokedex &&
              $store.state.userData.pokedex.length
            }}
          </h5>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Gym Badges:</h5>
          <h5>
            {{
              $store.state.userData.badges &&
              $store.state.userData.badges.length
            }}
          </h5>
        </div>
        <div>
          <h5>
            Pokémon Party:
            {{
              $store.state.userData.party_pokemon &&
              $store.state.userData.party_pokemon.length
            }}/4
          </h5>
        </div>
        <div class="d-flex justify-content-center" id="party-pokemon-div">
          <div
            v-bind:key="i"
            v-for="(pokemon, i) in $store.state.userData.party_pokemon"
          >
            <img
              class="party-pokemon-sprite"
              v-bind:src="
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
                pokemon.pokemon_id +
                '.png'
              "
            />
          </div>
        </div>
      </div>

      <!-- character image -->
      <img
        v-if="$store.state.userData.gender == 'Male'"
        src="https://cdn.bulbagarden.net/upload/thumb/c/c0/HeartGold_SoulSilver_Ethan.png/455px-HeartGold_SoulSilver_Ethan.png"
        class="char-image"
        @click="toggleInfoWin"
      />
      <img
        v-if="$store.state.userData.gender == 'Female'"
        src="https://cdn.bulbagarden.net/upload/2/25/HeartGold_SoulSilver_Lyra.png"
        class="char-image"
        @click="toggleInfoWin"
      />

      <!-- Battle button -->
      <div class="battle-button-div">
        <img
          src="https://www.logolynx.com/images/logolynx/0c/0c8c0f527e118c62eefd0d7ef727e040.png"
          class="battle-button"
        />
        <h1 class="battle-text" @click="enterRBattle">Battle</h1>
      </div>

      <!-- bottom buttons -->
      <div class="buttons-div">
        <SelectButtons message="Pokédex" @click.native="openPokedex" />
        <SelectButtons message="Pokémon" @click.native="openPokemon" />
        <SelectButtons message="Bag" @click.native="comingSoon" />
        <!-- <SelectButtons message="Shop" @click.native="comingSoon" /> -->
        <SelectButtons message="+1000 Poké$" @click.native="add100Pkdl" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SelectButtons from "./SelectButtons";
import Tutorial from "./tutorial/Tutorial";

export default {
  data: function () {
    return {
      pokemonData: "",
      toggleInfo: false,
    };
  },
  components: {
    SelectButtons,
    Tutorial,
  },
  created: function () {
    this.toggleInfo = false;
    this.$store.state.inBattle = false;

    let townBGM = new Audio("bgm/town.mp3");
    if (this.$store.state.bgmName == "") {
      this.$store.state.bgmName = "townBGM";
      this.$store.state.bgm = townBGM;
      this.$store.state.bgm.play();
    } else if (this.$store.state.bgmName == "townBGM") {
      this.$store.state.bgmName == "townBGM";
    } else {
      this.$store.state.bgm.pause();
      this.$store.state.bgmName = "townBGM";
      this.$store.state.bgm = townBGM;
      this.$store.state.bgm.play();
    }

    this.$store.state.bgm.volume = 0.5;
    this.$store.state.bgm.loop = true;
  },
  methods: {
    toggleInfoWin() {
      this.toggleInfo == false
        ? (this.toggleInfo = true)
        : (this.toggleInfo = false);
    },
    enterRBattle: function () {
      this.$store.state.bgm.pause();
      let rbattleBGM = new Audio("bgm/random-battle.mp3");
      this.$store.state.bgm = rbattleBGM;
      this.$store.state.bgmName = "battleBGM";
      this.$store.state.bgm.volume = 0.5;
      this.$store.state.bgm.loop = true;
      this.$store.state.bgm.play();

      this.$store.state.gameState = "battle_start";
    },
    openPokedex: function () {
      this.$store.state.bgm.pause();
      let menuBGM = new Audio("bgm/menu.mp3");
      this.$store.state.bgm = menuBGM;
      this.$store.state.bgmName = "menuBGM";
      this.$store.state.bgm.volume = 0.5;
      this.$store.state.bgm.loop = true;
      this.$store.state.bgm.play();

      this.$store.state.gameState = "open_pokedex";
    },
    openPokemon: function () {
      this.$store.state.bgm.pause();
      let menuBGM = new Audio("bgm/menu.mp3");
      this.$store.state.bgm = menuBGM;
      this.$store.state.bgmName = "menuBGM";
      this.$store.state.bgm.volume = 0.5;
      this.$store.state.bgm.loop = true;
      this.$store.state.bgm.play();

      this.$store.state.gameState = "open_pokemon";
    },
    comingSoon() {
      alert("Coming Soon!");
    },
    add100Pkdl: async function () {
      this.$store.state.userData.pokedollar += 1000;
      await axios.patch(
        "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/userdata/" +
          this.$store.state.username,
        this.$store.state.userData
      );
      alert("Added 1000 Pokédollar to " + this.$store.state.username);
    },
  },
};
</script>

<style scoped>
#game-menu {
  background-image: url("https://pbs.twimg.com/media/EWoQbTdU0AEuxyT.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  text-align: center;
  position: relative;
}

#user-info {
  position: absolute !important;
  height: 70%;
  width: 38%;
  background-color: rgba(52, 58, 64, 0.9);
  right: 12px;
  top: 12px;
  z-index: 3;
  border-radius: 10px;
  border: 3px solid white !important;
}

.user-info-icon {
  position: absolute !important;
  width: 80px;
  right: 4px;
  top: 4px;
  cursor: pointer;
  z-index: 5;
}

h3 {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  font-size: 1.2rem;
}

h5 {
  font-size: 0.9rem;
}

#party-pokemon-div {
  margin-top: -15%;
  margin-bottom: 3%;
}

.party-pokemon-sprite {
  height: 140%;
}

.char-image {
  position: absolute !important;
  bottom: 0;
  left: 6%;
  height: 90%;
  cursor: pointer;
}

.battle-button-div {
  position: absolute !important;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 20%;
}

.battle-button {
  height: 300px;
  -webkit-animation: clockwiseSpin 5s infinite linear;
  animation: clockwiseSpin 5s infinite linear;
}

@-webkit-keyframes clockwiseSpin {
  0% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}
@keyframes clockwiseSpin {
  0% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}

.battle-text {
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: pokemonsolid;
  font-size: 5.5rem;
  cursor: pointer;
  text-shadow: -4px 0 rgb(52, 58, 64), 0 4px rgb(52, 58, 64),
    4px 0 rgb(52, 58, 64), 0 -4px rgb(52, 58, 64);
}

.buttons-div {
  position: absolute !important;
  bottom: 3%;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: auto;
}
</style>