<template>
  <div>
    <div id="home-banner">
      <img
        src="https://images7.alphacoders.com/473/thumb-1920-473213.jpg"
        class="pokemon-banner"
      />
      <div id="pokemon-logo">
        <img
          src="https://vignette.wikia.nocookie.net/bondlegends/images/0/00/Pkmn_Legends_Reboot.png/revision/latest/scale-to-width-down/340?cb=20150827225946"
          class="pokemon-logo"
        />
      </div>
      <div id="play-button">
        <button
          class="play-button btn btn-dark d-flex align-items-center justify-content-center shadow"
        >
          <h1 class="mb-3" @click="toGame">Play Pokémon<br />Legends Now!</h1>
        </button>
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-items-center flex-column"
      style="margin-top: 93vh; font-family: pokemonsolid"
    >
      <h1 class="about mb-3">Whole New World with Pokémon Legends!</h1>
      <div class="p-5 about-desc">
        <p>
          Welcome to the world of Pokémon! Play as the protaganist, where you
          can get your very own Pokémon and train them for battles, or simply
          keep them as pets! Forge unbreakable bonds, collect all the rare
          Pokémon and show them off and do even more!
        </p>
        <p>
          A brand new journey awaits you in this fan-made Pokémon game, Pokémon
          Legends now!<br />
          NOTE*: This game is created solely for educational purposes only
        </p>
      </div>

      <h1 class="about mb-5">Game Features</h1>
      <div class="about-desc">
        <b-card-group deck>
          <b-card
            v-for="(feature, i) in features"
            v-bind:key="i"
            :title="feature.title"
            :img-src="feature.imageurl"
            img-alt="Pokemon GIF Image"
            img-top
            style="width: 25%; position: relative"
          >
            <b-card-text class="pt-2">
              {{ feature.description }}
            </b-card-text>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      features: [
        {
          title: "Exciting Battles",
          imageurl:
            "https://i.pinimg.com/originals/27/fe/3c/27fe3c94b8f7db7614e92126b873d279.gif",
          description:
            "Nostalgic yet exciting battle system, something you will definitely reminisce and love!",
        },
        {
          title: "Amazing Graphics",
          imageurl: "https://i.gifer.com/7UbA.gif",
          description:
            "Beautiful artwork from the official series! We believe that Pokémon lovers will adore and enjoy it!",
        },
        {
          title: "Collect Pokémon",
          imageurl:
            "https://i.pinimg.com/originals/ab/ee/0f/abee0fc1e685e6ecad60cd507a9cf6b5.gif",
          description:
            "Collect your favorite Pokémon from your favorite generation in the series! Gotta catch'em all~",
        },
      ],
    };
  },
  methods: {
    toGame() {
      this.$router.push("game");
    },
  },
};
</script>

<style scoped>
#home-banner {
  position: absolute;
  top: 0;
  left: 0;
}

.pokemon-banner {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

#pokemon-logo {
  position: absolute;
  bottom: 25%;
  left: 50%;
  z-index: 5;
}

.pokemon-logo {
  position: relative;
  left: -50%;
  width: 500px;
}

#play-button {
  position: absolute;
  bottom: 5%;
  left: 50%;
  z-index: 5;
}

.play-button {
  position: relative;
  left: -50%;
  font-family: pokemonsolid;
  width: 380px;
  height: 150px;
  z-index: 5;
  border: 4px white solid;
  border-radius: 15px;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.play-button:hover {
  border: 4px red solid;
}

.about {
  position: relative;
  bottom: 0;
  z-index: 2;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  text-align: center;
}

.about-desc {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.card {
  background-color: black;
}

.card-title {
  font-family: pokemonsolid;
  text-align: center;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border: 2px black solid;
}

@media only screen and (max-width: 720px) {
  .pokemon-logo {
    width: 300px;
  }
}
</style>