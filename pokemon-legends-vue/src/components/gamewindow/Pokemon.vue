<template>
  <div id="pokemon-display" class="d-flex justify-content-center align-items-center">
    <div class="pokemon-list"></div>
    <div class="pokemon-info"></div>
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

.pokemon-list {
  width: 45%;
  height: 90%;
  background-color: red;
}

.pokemon-info {
  width: 45%;
  height: 90%;
  background-color: blue;
}
</style>