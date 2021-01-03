<template>
  <div>
    <button class="startGameBtn btn btn-secondary" @click="gameStart">
      <h2>Welcome, {{ $store.state.username }}<br />Click to Start Game</h2>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    gameStart: function () {
      this.$store.state.gameState = "game_menu";
    },
  },
};
</script>

<style scoped>
.startGameBtn {
  position: absolute !important;
  bottom: 1%;
  margin-left: auto;
  margin-right: auto;
  left: 3%;
  right: 0;
  text-align: center;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  z-index:2;
}
</style>