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
      <!-- if false -->
      <img
        v-if="!toggleInfo"
        src="https://i.pinimg.com/originals/50/e1/db/50e1db4684e6f697f93590950eb832f6.png"
        class="user-info-icon"
        @click="toggleInfoWin"
      />
      <!-- if true -->
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
        <h3 class="user-info">User Info</h3>
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
        <h1 class="battle-text" @click="selectBattleT">Battle</h1>
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

    <!-- select battle type -->
    <div
      v-if="selectBattle == 'selectBattleType'"
      class="d-flex align-items-center justify-content-around flex-column select-battle-window"
    >
      <div class="mt-3">
        <h3
          style="
            text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
          "
        >
          Select Battle
        </h3>
      </div>
      <div class="d-flex justify-content-center banner-div">
        <div class="wild-banner battle-banner" @click="enterRBattle">
          <h2 class="battle-banner-text">Random Wild Battle</h2>
        </div>
      </div>
      <div class="d-flex justify-content-center mb-3 banner-div">
        <div class="gym-banner battle-banner" @click="selectGymLeader">
          <h2 class="battle-banner-text">Gym Battle</h2>
        </div>
      </div>

      <img
        src="https://image.flaticon.com/icons/png/512/458/458594.png"
        @click="closeBattleT"
        class="cancelBtn"
      />
    </div>

    <!-- select gym leader to battle -->
    <div
      v-else-if="selectBattle == 'selectGymLeader'"
      class="d-flex align-items-center justify-content-around flex-column select-battle-window"
    >
      <div>
        <h3
          style="
            text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
          "
        >
          Select Gym Leader
        </h3>
        <span>Gym leaders are tough, you have been warned!</span>
      </div>

      <div
        class="d-flex flex-wrap justify-content-center align-items-center gymleader-div"
      >
        <b-card
          v-for="(gymleader, i) in gymleaders"
          v-bind:key="i"
          :title="gymleader.name"
          :img-src="gymleader.imageurl"
          img-alt="Gym Leader Image"
          img-top
          style="
            width: 20%;
            position: relative;
            background-color: rgba(52, 58, 64, 0);
          "
          class="m-1"
          @click="selectGymBattle(gymleader)"
        >
        </b-card>
      </div>

      <div>
        <button class="btn btn-danger" @click="selectBattleT">Back</button>
      </div>

      <img
        src="https://image.flaticon.com/icons/png/512/458/458594.png"
        @click="closeBattleT"
        class="cancelBtn"
      />
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
      gymleaders: [
        { name: "Brock", imageurl: "https://tinyurl.com/brock-icon1" },
        {
          name: "?",
          imageurl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/600px-Icon-round-Question_mark.svg.png",
        },
        {
          name: "?",
          imageurl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/600px-Icon-round-Question_mark.svg.png",
        },
        {
          name: "?",
          imageurl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/600px-Icon-round-Question_mark.svg.png",
        },
        {
          name: "?",
          imageurl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/600px-Icon-round-Question_mark.svg.png",
        },
        {
          name: "?",
          imageurl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/600px-Icon-round-Question_mark.svg.png",
        },
        {
          name: "?",
          imageurl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/600px-Icon-round-Question_mark.svg.png",
        },
        {
          name: "?",
          imageurl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/600px-Icon-round-Question_mark.svg.png",
        },
      ],
      pokemonData: "",
      toggleInfo: false,
      selectBattle: "",
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
      this.$store.state.bgm.loop = true;
      this.$store.state.bgm.play();
    }

    // this.$store.state.bgm.volume = 0.5;
    this.$store.state.bgm.loop = true;
  },
  methods: {
    toggleInfoWin() {
      this.$store.state.selectSFX.play();
      this.toggleInfo == false
        ? (this.toggleInfo = true)
        : (this.toggleInfo = false);
    },
    selectBattleT() {
      this.$store.state.selectSFX.play();
      this.selectBattle = "selectBattleType";
    },
    closeBattleT() {
      this.$store.state.selectSFX.play();
      this.selectBattle = "";
    },
    enterRBattle: function () {
      this.$store.state.selectSFX.play();
      this.$store.state.bgm.pause();
      let rbattleBGM = new Audio("bgm/random-battle.mp3");
      this.$store.state.bgm = rbattleBGM;
      this.$store.state.bgmName = "battleBGM";
      //   this.$store.state.bgm.volume = 0.5;
      this.$store.state.bgm.loop = true;
      this.$store.state.bgm.play();

      this.$store.state.gameState = "battle_start";
    },
    selectGymLeader() {
      this.$store.state.selectSFX.play();
      this.selectBattle = "selectGymLeader";
    },
    selectGymBattle: async function (gymleader) {
      this.$store.state.selectSFX.play();

      let response = await axios.get(
        "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/gymleaders"
      );
      let gymleaderData = response.data;
      let gymLeaderData1 = gymleaderData.find(
        (gl) => gl.gymleader_name == gymleader.name
      );
      if (gymLeaderData1 !== undefined) {
        this.$store.state.gymLeader = gymLeaderData1;

        this.$store.state.bgm.pause();
        let gymbattleBGM = new Audio("bgm/gymbattle.mp3");
        this.$store.state.bgm = gymbattleBGM;
        this.$store.state.bgmName = "gymbattleBGM";
        this.$store.state.bgm.loop = true;
        this.$store.state.bgm.play();

        this.$store.state.gameState = "gym_battle";
      } else {
        alert("Coming soon...");
      }
    },
    openPokedex: function () {
      this.$store.state.selectSFX.play();
      this.$store.state.bgm.pause();
      let menuBGM = new Audio("bgm/menu.mp3");
      this.$store.state.bgm = menuBGM;
      this.$store.state.bgmName = "menuBGM";
      //   this.$store.state.bgm.volume = 0.5;
      this.$store.state.bgm.loop = true;
      this.$store.state.bgm.play();

      this.$store.state.gameState = "open_pokedex";
    },
    openPokemon: function () {
      this.$store.state.selectSFX.play();
      this.$store.state.bgm.pause();
      let menuBGM = new Audio("bgm/menu.mp3");
      this.$store.state.bgm = menuBGM;
      this.$store.state.bgmName = "menuBGM";
      //   this.$store.state.bgm.volume = 0.5;
      this.$store.state.bgm.loop = true;
      this.$store.state.bgm.play();

      this.$store.state.gameState = "open_pokemon";
    },
    comingSoon() {
      this.$store.state.selectSFX.play();
      alert("Coming Soon!");
    },
    add100Pkdl: async function () {
      this.$store.state.selectSFX.play();
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

.user-info {
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
  z-index: 3;
}

.battle-button-div {
  position: absolute !important;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 20%;
}

.select-battle-window {
  position: absolute;
  background-color: rgba(52, 58, 64, 0.9);
  height: 100%;
  width: 100%;
  z-index: 10;
}

.banner-div {
  height: 40%;
  width: 100%;
}

.wild-banner {
  background-image: url("https://i.pinimg.com/originals/0f/2a/c0/0f2ac01ac666c8a1ec02f763afaa1016.jpg");
  background-position: center !important;
}

.gym-banner {
  background-image: url("https://i.imgur.com/w847zWv.png");
}

.battle-banner {
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  height: 100%;
  width: 70%;
  border-radius: 10px;
  border: white solid 3px;
}

.battle-banner:hover {
  border: red solid 3px;
  cursor: pointer;
}

.battle-banner-text {
  margin-top: 3%;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}

.gymleader-div {
  height: 70%;
  width: 70%;
}

.card-title {
  font-size: 1.1rem;
  text-align: center;
}

.card-img-top {
  height: 150px;
  object-fit: cover;
  border: 2px white solid;
}

.card-img-top:hover {
  cursor: pointer;
  border: 2px red solid;
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
  z-index: 4;
}

@media only screen and (max-height: 1024px) {
  .char-image {
    z-index: 0;
  }
  .gymleader-div {
    height:50%;
  }
}

@media only screen and (max-height: 414px) {
  .battle-button {
    height: 180px;
  }
  .battle-text {
    font-size: 3.5rem;
  }
  .user-info-icon {
    width: 60px;
  }
  #user-info {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  .user-info {
    font-size: 0.9rem;
  }

  h5 {
    font-size: 0.7rem;
  }
  .party-pokemon-sprite {
    height: 120%;
  }
  .banner-div {
    height: 30%;
  }
  .battle-banner-text {
    font-size: 25px;
  }
  .gymleader-div {
    width: 100%;
    height:40%;
  }
  .card {
    width: 12% !important;
    margin:1px !important;
  }
  .card-img-top {
    height: 100px;
  }
  .card-title {
    font-size: 0.5rem;
  }
}
</style>