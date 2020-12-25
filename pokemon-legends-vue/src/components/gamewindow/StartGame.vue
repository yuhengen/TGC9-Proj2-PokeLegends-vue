<template>
  <div>
    <h1 class="startGameBtn">Welcome back {{ this.$store.state.username }}</h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* .startGameMenu {
    position: relative;
    min-height: 100%;
    min-width: 100%;
} */
.startGameBtn {
  position: absolute !important;   
  bottom: 100px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}
</style>