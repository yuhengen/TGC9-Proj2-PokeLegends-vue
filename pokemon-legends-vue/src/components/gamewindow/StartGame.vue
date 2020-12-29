<template>
  <div>
    <button class="startGameBtn btn btn-secondary" @click="gameStart"><h1>
        Welcome, {{ this.$store.state.username }}<br />Click to Start Game
    </h1></button>
  </div>
</template>

<script>
export default {
    methods: {
        gameStart: function () {
            this.$store.state.gameState = "game-menu"
        }
    }
};
</script>

<style scoped>
.startGameBtn {
  position: absolute !important;
  bottom: 70px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}
</style>