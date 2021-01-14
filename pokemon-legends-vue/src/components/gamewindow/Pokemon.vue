<template>
  <div
    id="pokemon-display"
    class="d-flex justify-content-center align-items-center"
  >
    <div
      id="pokemon-list"
      class="d-flex flex-column flex-wrap justify-content-center align-items-center"
    >
      <div
        v-for="(pokemon, i) in $store.state.userData.party_pokemon"
        :key="i"
        class="pokemon-bar d-flex align-items-center justify-content-around shadow"
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
    </div>
    <div id="pokemon-info"></div>
  </div>
</template>

<script>
export default {};
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
  border: 2px black solid;
}

#pokemon-info {
  width: 48%;
  height: 90%;
  background-color: blue;
}
</style>